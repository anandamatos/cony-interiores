"""
TASK-M1-CORE-014: lógica de sugestão de alocação.

Regra: entre as costureiras que TÊM folga suficiente pro pedido,
sugere a que tiver mais dias livres.

Função pura (não toca no banco), pra facilitar os testes.
"""

from typing import List, Optional, TypedDict

from .capacidade import calcular_dias_livres, costureira_comporta_pedido


class DadosCostureira(TypedDict, total=False):
    capacidade_base_semanal: float
    disponibilidade_percentual: float
    # outras chaves (nome, id, etc.) podem vir junto, não atrapalham


def sugerir_costureira(
    candidatas: List[DadosCostureira],
    carga_pedido: float,
) -> Optional[DadosCostureira]:
    """
    candidatas: lista de dicts, cada um com pelo menos
        'capacidade_base_semanal' e 'disponibilidade_percentual'.
    carga_pedido: carga (em dias) do pedido a ser alocado.

    Retorna a candidata sugerida (o dict original, sem modificar),
    ou None se nenhuma tiver folga suficiente.
    """
    candidatas_aptas = [
        c for c in candidatas
        if costureira_comporta_pedido(
            c["capacidade_base_semanal"],
            c["disponibilidade_percentual"],
            carga_pedido,
        )
    ]

    if not candidatas_aptas:
        return None

    return max(
        candidatas_aptas,
        key=lambda c: calcular_dias_livres(
            c["capacidade_base_semanal"],
            c["disponibilidade_percentual"],
        ),
    )
