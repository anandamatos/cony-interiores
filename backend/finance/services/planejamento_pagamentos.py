"""
TASK-M2-CORE-007:
Planejamento semanal e mensal de pagamentos.

TASK-M2-CORE-008:
Previsão de pagamentos futuros.

TASK-M2-CORE-009:
Integração com status de serviços.
"""

from collections import defaultdict
from decimal import Decimal

from django.utils import timezone

from finance.models import Pagamento


STATUS_VALIDOS = [
    "pendente",
    "atrasado",
]


def obter_pagamentos_planejados():
    """
    Retorna todos os pagamentos cadastrados
    para planejamento financeiro.

    O status é mantido apenas como informação,
    pois o planejamento deve considerar todos
    os pagamentos registrados.
    """
    return Pagamento.objects.all().select_related("servico")


def planejamento_semanal():
    """
    Agrupa pagamentos previstos por semana.
    """

    pagamentos = obter_pagamentos_planejados()

    semanas = defaultdict(lambda: Decimal("0.00"))

    for pagamento in pagamentos:
        data = pagamento.data_entrega

        semana = data.isocalendar().week
        ano = data.year

        chave = f"{ano}-semana-{semana}"

        semanas[chave] += pagamento.valor

    return [
        {
            "periodo": periodo,
            "valor_total": str(valor.quantize(Decimal("0.01"))),
        }
        for periodo, valor in semanas.items()
    ]


def planejamento_mensal():
    """
    Agrupa pagamentos previstos por mês.
    """

    pagamentos = obter_pagamentos_planejados()

    meses = defaultdict(lambda: Decimal("0.00"))

    for pagamento in pagamentos:
        data = pagamento.data_entrega

        chave = f"{data.year}-{data.month:02d}"

        meses[chave] += pagamento.valor

    return [
        {
            "periodo": periodo,
            "valor_total": str(valor.quantize(Decimal("0.01"))),
        }
        for periodo, valor in meses.items()
    ]


def previsao_pagamentos():
    """
    Retorna próximos pagamentos previstos.
    """

    hoje = timezone.now().date()

    pagamentos = obter_pagamentos_planejados().filter(
        data_entrega__gte=hoje
    ).order_by(
        "data_entrega"
    )

    return [
        {
            "pagamento_id": pagamento.id,
            "servico_id": pagamento.servico.id,
            "data_entrega": pagamento.data_entrega,
            "valor": str(pagamento.valor),
            "status": pagamento.status,
        }
        for pagamento in pagamentos
    ]