"""
Cálculo de carga em PORCENTAGEM, relativa a um período (semanal ou mensal).

Isso é adicional ao cálculo em "dias" que já existe em capacidade.py.
Enquanto lá a gente mede em dias absolutos (ex: "essa costureira tem
8 dias de carga"), aqui a gente expressa isso como % de um período
de referência (ex: "8 dias de carga = 160% da capacidade semanal dela").
"""


def calcular_percentual_carga(carga_atual: float, capacidade_periodo: float) -> float:
    """
    carga_atual: soma dos dias de carga (dos pedidos dela).
    capacidade_periodo: quantos dias de capacidade existem nesse período
                         de referência (ex: 5 pra semana, 30 pra mês).

    Retorna a porcentagem da capacidade do período que está ocupada.
    Pode passar de 100% se ela estiver sobrecarregada.
    """
    if capacidade_periodo <= 0:
        raise ValueError("capacidade_periodo deve ser maior que zero")

    return (carga_atual / capacidade_periodo) * 100
