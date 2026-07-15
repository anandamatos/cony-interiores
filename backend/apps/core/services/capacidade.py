"""
TASK-M1-CORE-011: Cálculo de carga.

Usa o índice de complexidade (complexidade.py) pra calcular:
- a carga de um pedido (soma da complexidade de cada peça)
- a disponibilidade da costureira (quantos dias ela tem livres)
- se ela comporta ou não um pedido novo

Depende de complexidade.py, mas NÃO depende do Django ORM diretamente,
o que facilita os testes (TASK-015).
"""

from dataclasses import dataclass
from typing import List

from .complexidade import obter_indice_complexidade


@dataclass
class Peca:
    """Representa uma peça dentro de um pedido/serviço."""
    tipo_produto: str
    tamanho: str


def calcular_carga_pedido(pecas: List[Peca]) -> float:
    """
    Calcula a carga total (em dias) de um pedido, somando o índice de
    complexidade de cada peça que o compõe.

    Se, por enquanto, todas as peças do pedido tiverem o mesmo tamanho,
    é só passar uma Peca repetida `quantidade_pecas` vezes:

        pecas = [Peca(tipo_produto="BLACKOUT", tamanho="M")] * quantidade_pecas
    """
    return sum(
        obter_indice_complexidade(peca.tipo_produto, peca.tamanho)
        for peca in pecas
    )


def calcular_dias_livres(capacidade_base_semanal: float, disponibilidade_percentual: float) -> float:
    """
    capacidade_base_semanal: quantos dias úteis de trabalho a costureira
                              tem numa semana cheia (ex: 5).
    disponibilidade_percentual: 0 a 100, o quão livre ela está agora.
    """
    if not 0 <= disponibilidade_percentual <= 100:
        raise ValueError("disponibilidade_percentual deve estar entre 0 e 100")

    return capacidade_base_semanal * (disponibilidade_percentual / 100)


def costureira_comporta_pedido(
    capacidade_base_semanal: float,
    disponibilidade_percentual: float,
    carga_pedido: float,
) -> bool:
    """Diz se a costureira tem folga suficiente pra pegar esse pedido."""
    dias_livres = calcular_dias_livres(capacidade_base_semanal, disponibilidade_percentual)
    return carga_pedido <= dias_livres
