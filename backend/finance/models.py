from django.db import models

from users.models import Servico


class Pagamento(models.Model):
    """
    Representa o pagamento (ou parcela de pagamento) de um Servico.

    LIMITAÇÃO/DECISÃO A CONFIRMAR COM O TIME: os campos numero_parcela e
    total_parcelas foram incluídos como um "extra". Se o time decidir que não precisa de parcelamento
    por enquanto, é só remover esses dois campos e rodar makemigrations
    de novo — não afeta o resto do model.
    """

    STATUS_CHOICES = [
        ("pendente", "Pendente"),
        ("pago", "Pago"),
        ("atrasado", "Atrasado"),
        ("cancelado", "Cancelado"),
    ]

    servico = models.ForeignKey(
        Servico,
        on_delete=models.CASCADE,
        related_name="pagamentos",
    )
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    data_vencimento = models.DateField()
    data_pagamento = models.DateField(null=True, blank=True)
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pendente",
    )

    # Campos de parcelamento (a confirmar com o time)
    numero_parcela = models.PositiveIntegerField(default=1)
    total_parcelas = models.PositiveIntegerField(default=1)

    observacoes = models.TextField(blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)

    class Meta:
        # TASK-M2-CORE-003: índices para as consultas mais comuns
        # (filtrar por status, e listar pagamentos vencendo em uma data)
        indexes = [
            models.Index(fields=["status"]),
            models.Index(fields=["data_vencimento"]),
            models.Index(fields=["servico", "status"]),
        ]
        ordering = ["data_vencimento"]

    def __str__(self):
        return (
            f"Pagamento {self.numero_parcela}/{self.total_parcelas} "
            f"- {self.servico} - R$ {self.valor} ({self.status})"
        )
