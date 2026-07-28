from django.db.models import Q
from django.db import models

from users.models import Servico


class Pagamento(models.Model):
    """
    Representa o pagamento (ou parcela de pagamento) de um Servico.

    """

    STATUS_CHOICES = [
        ("pendente", "Pendente"),
        ("pago", "Pago"),
        ("atrasado", "Atrasado"),
        ("cancelado", "Cancelado"),
    ]

    # Atualizado de CASCADE para PROTECT para evitar que um pagamento seja deletado se o serviço for deletado
    # data_vencimento atualizada para data_entrega, criado_em para enviado_em, observacoes e atualizado_em removidos
    servico = models.ForeignKey(
        Servico,
        on_delete=models.PROTECT,
        related_name="pagamentos",
    )
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data_entrega = models.DateField()
    data_pagamento = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pendente",
    )

    enviado_em = models.DateTimeField(auto_now_add=True)

    class Meta:
        # TASK-M2-CORE-003: índices para as consultas mais comuns
        # (filtrar por status, e listar pagamentos vencendo em uma data)
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["data_entrega"]),
            models.Index(fields=["servico", "status"]),
        ]
        ordering = ["data_entrega"]

        constraints = [
            models.CheckConstraint(
                check=Q(valor__gt=0),
                name="pagamento_valor_maior_que_zero",
            ),
        ]


    def __str__(self):
        return f"Pagamento - {self.servico} - R$ {self.valor} ({self.status})"
