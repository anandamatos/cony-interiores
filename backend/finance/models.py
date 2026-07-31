from django.db.models import Q
from django.db import models
from .querysets import ServicoQuerySet, PagamentoQuerySet
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

    objects = PagamentoQuerySet.as_manager()

    class Meta:
        indexes = [
            # Índices existentes
            models.Index(fields=["status"], name="idx_pagamento_status"),
            models.Index(fields=["data_entrega"], name="idx_pagamento_data_entrega"),
            models.Index(fields=["servico", "status"], name="idx_pagamento_servico_status"),
            # NOVOS ÍNDICES
            models.Index(fields=["servico_id"], name="idx_pagamento_servico"),
            models.Index(fields=["status", "data_entrega"], name="idx_pagamento_status_data"),
            models.Index(fields=["data_pagamento"], name="idx_pagamento_data_pagamento"),
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