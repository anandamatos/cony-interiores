"""
Bridge da TASK-M1-CORE-014: conecta os models reais (Servico, Costureira)
com a lógica pura de sugestão de alocação (alocacao.py).
"""

from typing import Optional
from users.models import Costureira

from .alocacao import sugerir_costureira
from .bridge import calcular_carga_servico, consultar_capacidade_costureira


def sugerir_costureira_para_servico(servico) -> Optional[dict]:
    """
    Dado um Servico (já salvo no banco, com produtos e tamanho definidos,
    mas ainda sem costureira "confirmada"), sugere qual costureira ativa
    deveria pegá-lo.

    Retorna o dict de capacidade da costureira sugerida, ou None se
    nenhuma costureira ativa tiver folga suficiente agora.
    """
    carga_pedido = calcular_carga_servico(servico)

    costureiras_ativas = Costureira.objects.filter(ativo=True)
    candidatas = [
        consultar_capacidade_costureira(costureira)
        for costureira in costureiras_ativas
    ]

    return sugerir_costureira(candidatas, carga_pedido)
