"""
TASK-M2-CORE-004: cálculo automático de valores a pagar às costureiras.
TASK-M2-CORE-005: sumarização por costureira (lista com todas de uma vez).

<<<<<<< HEAD
# TODO: confirmar valor real com a gestora
=======
Fica em finance/services/ pra manter a mesma organização usada em
apps/core/services/ (lógica separada da view, mais fácil de testar).

TODO: o percentual (hoje 0.60 como exemplo) ainda precisa ser confirmado
com a gestora - é só um valor de exemplo por enquanto.
>>>>>>> 7d946ee1a275fb0fefe490266e19e76c6e0c7807

IMPORTANTE: Servico.valor é um DecimalField (não float). Por isso o
percentual também precisa ser Decimal - Python não deixa multiplicar
Decimal por float diretamente (dá TypeError). Usamos Decimal(str(...))
em vez de Decimal(0.60) direto, porque números float tipo 0.60 não são
exatos na memória do computador (viram algo como 0.5999999999...), e
Decimal(str(...)) evita herdar essa imprecisão.
"""

from decimal import Decimal

PERCENTUAL_PADRAO = Decimal("0.60")  # TODO: confirmar valor real com a gestora


def calculo_de_pagamento(servicos, percentual):
    """
    Soma o valor de todos os serviços e aplica o percentual que a
    costureira recebe sobre esse total.

    percentual deve ser Decimal (ex: Decimal("0.60")), não float,
    pra ser compatível com o valor (também Decimal) de cada serviço.
    """
    if not isinstance(percentual, Decimal):
        percentual = Decimal(str(percentual))

<<<<<<< HEAD
    if percentual < 0:
        raise ValueError("Percentual não pode ser negativo")

=======
>>>>>>> 7d946ee1a275fb0fefe490266e19e76c6e0c7807
    total = Decimal("0")
    for servico in servicos:
        total = total + servico.valor

<<<<<<< HEAD
    valor_a_pagar = (total * percentual).quantize(Decimal("0.01"))
=======
    valor_a_pagar = total * percentual
>>>>>>> 7d946ee1a275fb0fefe490266e19e76c6e0c7807
    return valor_a_pagar


def consultar_pagamento_costureira(costureira) -> dict:
    """
    Monta o resumo de pagamento de uma costureira: quanto ela deve
    receber, baseado nos serviços que ela teve.
    """
    valor_pago = calculo_de_pagamento(costureira.servicos.all(), PERCENTUAL_PADRAO)

    return {
        "costureira_id": costureira.id,
        "nome": costureira.nome,
        "valor_a_pagar": valor_pago,
    }


def listar_pagamento_todas_costureiras(costureiras):
    """Monta o resumo de pagamento pra uma lista/queryset de costureiras."""
    return [
        consultar_pagamento_costureira(costureira)
        for costureira in costureiras
    ]
