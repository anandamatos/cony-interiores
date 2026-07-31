from django.db import models
from django.db.models import Count, Sum, Avg, Q, F, Value, Case, When, ExpressionWrapper
from django.db.models.functions import Coalesce
from django.utils import timezone
from datetime import timedelta


class ServicoQuerySet(models.QuerySet):
    """QuerySet otimizado para consultas de serviços financeiros"""

    def with_related_data(self):
        """Elimina N+1 com select_related e prefetch_related"""
        return self.select_related(
            'cliente',
            'costureira',
        ).prefetch_related(
            'produto',
            'pagamentos',
        )

    def with_pagamentos_count(self):
        """Adiciona contagem de pagamentos por serviço"""
        return self.annotate(
            pagamentos_count=Count('pagamentos'),
            total_pago=Coalesce(Sum('pagamentos__valor'), Value(0)),
            valor_restante=F('valor') - Coalesce(Sum('pagamentos__valor'), Value(0))
        )

    def by_periodo(self, inicio, fim):
        """Filtra serviços por período"""
        return self.filter(
            data_envio__gte=inicio,
            data_envio__lte=fim
        )

    def by_costureira(self, costureira_id):
        """Filtra serviços por costureira"""
        return self.filter(costureira_id=costureira_id)

    def by_status_pagamento(self, status):
        """Filtra serviços pelo status do pagamento"""
        if status == 'pendente':
            return self.filter(pagamentos__status='pendente')
        elif status == 'pago':
            return self.filter(pagamentos__status='pago')
        return self

    def ativos(self):
        """Apenas serviços com pagamentos pendentes ou em andamento"""
        return self.filter(
            pagamentos__status__in=['pendente', 'pago'],
            pagamentos__isnull=False
        ).distinct()

    def com_pagamentos_atrasados(self):
        """Serviços com pagamentos atrasados"""
        return self.filter(
            pagamentos__status='pendente',
            pagamentos__data_entrega__lt=timezone.now().date()
        ).distinct()

    def total_por_costureira(self):
        """Agregação: total por costureira"""
        return self.values('costureira__nome').annotate(
            total_servicos=Count('id'),
            total_valor=Sum('valor'),
            media_valor=Avg('valor')
        )

    def resumo_mensal(self, ano, mes):
        """Resumo mensal de serviços"""
        return self.filter(
            data_envio__year=ano,
            data_envio__month=mes
        ).aggregate(
            total=Coalesce(Count('id'), Value(0)),
            total_valor=Coalesce(Sum('valor'), Value(0)),
            media_valor=Coalesce(Avg('valor'), Value(0)),
            total_pagamentos=Coalesce(Sum('pagamentos__valor'), Value(0))
        )

    def otimizado_para_dashboard(self):
        """Query otimizada específica para o dashboard"""
        hoje = timezone.now().date()
        semana_passada = hoje - timedelta(days=7)

        return self.with_related_data().filter(
            data_envio__gte=semana_passada
        )

    def com_metricas_desempenho(self):
        """Adiciona métricas de desempenho para análise"""
        return self.annotate(
            dias_entrega=ExpressionWrapper(
                F('prazo_entrega') - F('data_envio'),
                output_field=models.DurationField()
            ),
            esta_no_prazo=Case(
                When(
                    prazo_entrega__gte=F('data_envio'),
                    then=Value(True)
                ),
                default=Value(False),
                output_field=models.BooleanField()
            )
        )


class PagamentoQuerySet(models.QuerySet):
    """QuerySet otimizado para consultas de pagamentos"""

    def with_servico_data(self):
        """Elimina N+1 em pagamentos"""
        return self.select_related('servico', 'servico__cliente', 'servico__costureira')

    def pendentes(self):
        """Pagamentos pendentes"""
        return self.filter(status='pendente')

    def vencidos(self):
        """Pagamentos vencidos"""
        return self.filter(
            status='pendente',
            data_entrega__lt=timezone.now().date()
        )

    def a_vencer(self, dias=7):
        """Pagamentos a vencer nos próximos X dias"""
        hoje = timezone.now().date()
        limite = hoje + timedelta(days=dias)
        return self.filter(
            status='pendente',
            data_entrega__gte=hoje,
            data_entrega__lte=limite
        )

    def total_por_status(self):
        """Agregação: total por status"""
        return self.values('status').annotate(
            total=Count('id'),
            total_valor=Sum('valor')
        )

    def total_geral(self):
        """Agregação: total geral"""
        return self.aggregate(
            total=Coalesce(Count('id'), Value(0)),
            total_valor=Coalesce(Sum('valor'), Value(0)),
            media_valor=Coalesce(Avg('valor'), Value(0))
        )

    def por_costureira(self):
        """Pagamentos agrupados por costureira"""
        return self.select_related('servico__costureira').values(
            'servico__costureira__nome'
        ).annotate(
            total_pagamentos=Count('id'),
            total_valor=Sum('valor')
        )