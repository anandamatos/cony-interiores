"""
Lógica de complexidade "automática vs manual" do Servico.

A gestora pediu: o sistema calcula sozinho por padrão, mas ela pode
sobrescrever manualmente quando quiser — e depois disso o sistema não
deve mexer mais naquele número sozinho.

Isso depende do campo `complexidade_manual` (booleano) no Servico:
- False (padrão) -> sistema recalcula sozinho sempre que o serviço é salvo
- True -> sistema nunca mais recalcula sozinho, só a gestora edita

Reaproveita a lógica de cálculo que já existe em capacidade.py/bridge.py,
não duplica a conta.
"""

from .bridge import calcular_carga_servico


def calcular_complexidade_automatica(servico) -> int:
    """
    Calcula a complexidade "automática" de um serviço, reaproveitando a
    mesma conta de carga que já usamos pra capacidade (quantidade x
    complexidade média dos produtos vinculados). Arredonda pra inteiro,
    já que o campo complexidade do Servico é um IntegerField.
    """
    carga = calcular_carga_servico(servico)
    return round(carga)


def atualizar_complexidade_se_automatica(servico) -> bool:
    """
    Recalcula e salva a complexidade do serviço, MAS só se ela não tiver
    sido marcada como manual pela gestora.

    Retorna True se o valor foi recalculado/atualizado, False se não
    mexeu em nada (porque está em modo manual, ou o valor já estava
    correto).
    """
    if servico.complexidade_manual:
        return False

    valor_calculado = calcular_complexidade_automatica(servico)

    if servico.complexidade == valor_calculado:
        return False

    servico.complexidade = valor_calculado
    servico.save(update_fields=["complexidade"])
    return True
