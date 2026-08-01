"""
Log de auditoria para ajustes manuais de complexidade.

Chamada explícita (não signal): o time prefere lógica visível e
testável a acoplar comportamento implícito no save() do model.
"""

from users.models import LogAuditoria


def registrar_ajuste_manual_complexidade(servico, usuario, valor_anterior, justificativa=""):
    """
    Registra no log quando a gestora troca manualmente a complexidade
    de um Servico. Só grava se o valor realmente mudou.

    Deve ser chamado ANTES do save que grava a nova complexidade,
    passando o valor_anterior (o que estava no banco antes da edição).
    """
    if valor_anterior == servico.complexidade:
        return None

    return LogAuditoria.objects.create(
        usuario=usuario,
        acao=LogAuditoria.Acao.ATUALIZACAO,
        modelo="Servico",
        objeto_id=str(servico.pk),
        campo_alterado="complexidade",
        valor_anterior=str(valor_anterior),
        valor_novo=str(servico.complexidade),
        justificativa=justificativa,
    )

