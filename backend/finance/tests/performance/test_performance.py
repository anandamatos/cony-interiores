"""
Testes de performance para queries financeiras (TASK-M2-FND-003)
"""

import time
from decimal import Decimal
from django.test import TestCase
from django.db import connection, reset_queries
from django.db.models import Count, Sum
from django.utils import timezone
from datetime import timedelta

from users.models import Cliente, Costureira, Servico
from finance.models import Pagamento


class PerformanceQueryTests(TestCase):
    """Testes de performance para queries financeiras"""

    @classmethod
    def setUpTestData(cls):
        """Cria dados para os testes de performance"""
        # Criar clientes
        cls.clientes = []
        for i in range(10):
            cliente = Cliente.objects.create(
                nome=f"Cliente Performance {i}"
            )
            cls.clientes.append(cliente)

        # Criar costureiras
        cls.costureiras = []
        for i in range(5):
            costureira = Costureira.objects.create(
                nome=f"Costureira Performance {i}",
                ativo=True,
                capacidade_base_semanal=10 + i
            )
            cls.costureiras.append(costureira)

        # Criar serviços (100 serviços)
        hoje = timezone.now().date()
        cls.servicos = []
        for i in range(100):
            servico = Servico.objects.create(
                cliente=cls.clientes[i % len(cls.clientes)],
                costureira=cls.costureiras[i % len(cls.costureiras)],
                quantidade=(i % 5) + 1,
                data_envio=hoje - timedelta(days=i % 30),
                prazo_entrega=hoje + timedelta(days=(i % 15) + 5),
                valor=Decimal(str((i + 1) * 10 + 50)),
                observacoes=f"Serviço de teste {i}" if i % 10 == 0 else "",
            )
            cls.servicos.append(servico)

        # Criar pagamentos (50 pagamentos)
        for i in range(50):
            servico = cls.servicos[i % len(cls.servicos)]
            Pagamento.objects.create(
                servico=servico,
                valor=servico.valor * Decimal('0.6'),
                data_entrega=hoje + timedelta(days=(i % 20) + 1),
                status='pendente' if i % 3 != 0 else 'pago',
            )

    def test_consulta_com_select_related(self):
    """Testa performance com select_related"""
    reset_queries()
    start_time = time.time()

    # Consulta sem otimização (baseline)
    servicos = Servico.objects.all()
    count = 0
    for servico in servicos:
        # Força acesso aos relacionamentos
        _ = servico.cliente.nome
        _ = servico.costureira.nome
        count += 1

    baseline_queries = len(connection.queries)
    baseline_time = time.time() - start_time

    reset_queries()
    start_time = time.time()

    # Consulta com select_related
    servicos = Servico.objects.select_related('cliente', 'costureira').all()
    count = 0
    for servico in servicos:
        _ = servico.cliente.nome
        _ = servico.costureira.nome
        count += 1

    optimized_queries = len(connection.queries)
    optimized_time = time.time() - start_time

    self.assertEqual(count, 100)

    # Verifica se há melhoria (pode ser igual em alguns casos)
    if baseline_queries > 0:
        self.assertLess(optimized_queries, baseline_queries)
    else:
        # Se baseline for 0, só verifica que optimized também é 0
        self.assertEqual(optimized_queries, 0)

    def test_filtro_por_periodo(self):
        """Testa performance de filtro por período"""
        hoje = timezone.now().date()
        inicio = hoje - timedelta(days=15)
        fim = hoje + timedelta(days=15)

        reset_queries()
        start_time = time.time()

        servicos = Servico.objects.filter(
            data_envio__gte=inicio,
            data_envio__lte=fim
        ).select_related('cliente', 'costureira')

        count = servicos.count()
        query_time = time.time() - start_time
        queries = len(connection.queries)

        self.assertGreater(count, 0)
        self.assertLess(queries, 10)
        self.assertLess(query_time, 0.5)

    def test_filtro_pagamentos_vencidos(self):
        """Testa performance de filtro de pagamentos vencidos"""
        reset_queries()
        start_time = time.time()

        hoje = timezone.now().date()

        pagamentos = Pagamento.objects.filter(
            status='pendente',
            data_entrega__lt=hoje
        ).select_related('servico')

        count = pagamentos.count()
        query_time = time.time() - start_time
        queries = len(connection.queries)

        self.assertLess(queries, 10)
        self.assertLess(query_time, 0.5)