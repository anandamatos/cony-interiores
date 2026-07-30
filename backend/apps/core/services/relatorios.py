"""
TASK-M4-CORE-001: relatório mensal de produção (geral, consolidando todas
as costureiras).

O relatório soma o que foi produzido no mês (valor e quantidade de peças
dos Serviços cujo `data_envio` cai no período) e usa o status do
Pagamento associado para contar o que está em atraso ou ainda em aberto:

- "atraso"  -> pagamentos com status "atrasado"
- "aberto"  -> pagamentos com status "pendente" (ainda não vencido/pago)

Um Serviço pode ter mais de um Pagamento; cada Pagamento em atraso/aberto
conta uma vez (é o pagamento que está atrasado ou em aberto, não o
serviço em si).
"""

import calendar
from datetime import date
from decimal import Decimal

from django.db.models import Count, Q, Sum

from finance.models import Pagamento
from users.models import Relatorio, Servico


def _periodo_para_intervalo(periodo):
    """Recebe 'AAAA-MM' e devolve (primeiro_dia, ultimo_dia) do mês."""
    ano, mes = (int(parte) for parte in periodo.split("-"))
    primeiro_dia = date(ano, mes, 1)
    ultimo_dia = date(ano, mes, calendar.monthrange(ano, mes)[1])
    return primeiro_dia, ultimo_dia


def _detalhamento_por_costureira(servicos_do_mes, pagamentos_do_mes):
    """Produção, atrasos e abertos de cada costureira que teve serviço no mês."""
    producao_por_costureira = {
        linha["costureira_id"]: linha
        for linha in servicos_do_mes.values("costureira_id", "costureira__nome").annotate(
            producao_total=Sum("valor"),
            pecas_produzidas=Sum("quantidade"),
        )
    }

    pagamentos_por_costureira = {
        linha["servico__costureira_id"]: linha
        for linha in pagamentos_do_mes.values("servico__costureira_id").annotate(
            servicos_atraso=Count("id", filter=Q(status="atrasado")),
            servicos_aberto=Count("id", filter=Q(status="pendente")),
        )
    }

    detalhamento = []
    for costureira_id, producao in producao_por_costureira.items():
        pagamentos = pagamentos_por_costureira.get(costureira_id, {})
        detalhamento.append({
            "costureira_id": costureira_id,
            "costureira_nome": producao["costureira__nome"],
            "producao_total": str(Decimal(producao["producao_total"] or 0).quantize(Decimal("0.01"))),
            "pecas_produzidas": producao["pecas_produzidas"] or 0,
            "servicos_atraso": pagamentos.get("servicos_atraso", 0),
            "servicos_aberto": pagamentos.get("servicos_aberto", 0),
        })

    detalhamento.sort(key=lambda linha: linha["costureira_nome"])
    return detalhamento


def gerar_relatorio_mensal(periodo):
    """
    Gera (ou atualiza) o relatório GERAL de produção do período informado,
    com os totais da empresa e o detalhamento por costureira.

    `periodo` no formato 'AAAA-MM', ex: '2026-07'.
    """
    primeiro_dia, ultimo_dia = _periodo_para_intervalo(periodo)

    servicos_do_mes = Servico.objects.filter(
        data_envio__gte=primeiro_dia,
        data_envio__lte=ultimo_dia,
    )

    agregados = servicos_do_mes.aggregate(
        producao_total=Sum("valor"),
        pecas_produzidas=Sum("quantidade"),
    )

    pagamentos_do_mes = Pagamento.objects.filter(
        servico__in=servicos_do_mes,
    )
    servicos_atraso = pagamentos_do_mes.filter(status="atrasado").count()
    servicos_aberto = pagamentos_do_mes.filter(status="pendente").count()

    detalhamento = _detalhamento_por_costureira(servicos_do_mes, pagamentos_do_mes)

    relatorio, _criado = Relatorio.objects.update_or_create(
        costureira=None,
        periodo=periodo,
        defaults={
            "producao_total": agregados["producao_total"] or 0,
            "pecas_produzidas": agregados["pecas_produzidas"] or 0,
            "servicos_atraso": servicos_atraso,
            "servicos_aberto": servicos_aberto,
            "detalhamento_por_costureira": detalhamento,
        },
    )
    return relatorio
