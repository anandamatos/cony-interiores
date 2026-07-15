"""
Bridge entre os models reais do app `users` (Costureira, Servico, Produto)
e os services puros do app `core` (complexidade.py, capacidade.py, percentual.py).

Fica tudo aqui, e não direto na view, pra manter a view fininha e essa
lógica testável sem precisar simular uma request HTTP.
"""

from statistics import mean

from .complexidade import obter_indice_complexidade
from .capacidade import calcular_dias_livres
from .percentual import calcular_percentual_carga

CAPACIDADE_MENSAL_PADRAO = 30  # dias, conforme o exemplo do time


def _complexidade_media_servico(servico) -> float:
    """
    LIMITAÇÃO ATUAL: um Servico pode ter vários Produtos vinculados (M2M),
    mas hoje só existe UMA quantidade total e UM tamanho por Servico
    (não por produto individual).

    Como aproximação, usamos a complexidade MÉDIA entre os produtos
    vinculados ao serviço, aplicada sobre a quantidade total.

    TODO: o time confirmou que o certo é SOMAR a complexidade de cada
    peça (não fazer média). Isso só é possível de verdade com uma
    estrutura tipo ItemServico (produto + quantidade + tamanho por item).
    Essa mudança depende de decisão em conjunto com o time, porque mexe
    no cadastro de serviços já pronto.
    """
    produtos = list(servico.produto.all())
    if not produtos or not servico.tamanho:
        return 0

    complexidades = [
        obter_indice_complexidade(produto.tipo_produto, servico.tamanho)
        for produto in produtos
        if produto.tipo_produto
    ]

    if not complexidades:
        return 0

    return mean(complexidades)


def calcular_carga_servico(servico) -> float:
    """Carga (em dias) de um único Servico."""
    complexidade_media = _complexidade_media_servico(servico)
    return servico.quantidade * complexidade_media


def calcular_carga_atual_costureira(costureira) -> float:
    """
    Soma a carga de todos os serviços da costureira.

    TODO: filtrar só os serviços NÃO finalizados assim que existir um
    campo de status no Servico. Por enquanto soma TODOS os serviços dela.
    """
    servicos = costureira.servicos.all()
    return sum(calcular_carga_servico(s) for s in servicos)


def consultar_capacidade_costureira(costureira) -> dict:
    """
    Monta o resumo completo de capacidade de uma costureira:
    quanto ela já tem de carga (em dias e em %, semanal e mensal),
    e quanto ela ainda tem de folga.
    """
    carga_atual = calcular_carga_atual_costureira(costureira)
    dias_livres = calcular_dias_livres(
        costureira.capacidade_base_semanal,
        costureira.disponibilidade_percentual,
    )

    return {
        "costureira_id": costureira.id,
        "nome": costureira.nome,
        "capacidade_base_semanal": costureira.capacidade_base_semanal,
        "disponibilidade_percentual": costureira.disponibilidade_percentual,
        "dias_livres": dias_livres,
        "carga_atual": carga_atual,
        "carga_percentual_semanal": calcular_percentual_carga(
            carga_atual, costureira.capacidade_base_semanal
        ),
        "carga_percentual_mensal": calcular_percentual_carga(
            carga_atual, CAPACIDADE_MENSAL_PADRAO
        ),
    }


def listar_capacidade_todas_costureiras(queryset_costureiras) -> list:
    """Monta o resumo de capacidade para uma lista/queryset de costureiras."""
    return [
        consultar_capacidade_costureira(costureira)
        for costureira in queryset_costureiras
    ]