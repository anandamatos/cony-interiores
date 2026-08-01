from datetime import timedelta
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone

from finance.models import Pagamento
from users.models import Cliente, Costureira, Produto, Servico


SEED_PREFIX = "[SEED-DASH]"


class Command(BaseCommand):
    help = (
        "Cria dados minimos para os 4 cards da primeira linha do Dashboard "
        "(costureiras, servicos, pagamentos pendentes, entregas previstas)."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--exact",
            action="store_true",
            help=(
                "Zera dados de Pagamento/Servico/Produto/Cliente/Costureira "
                "antes de popular para bater contagens exatas no dashboard."
            ),
        )

    @transaction.atomic
    def handle(self, *args, **options):
        exact = options["exact"]

        if exact:
            self.stdout.write(self.style.WARNING("Executando reset exato dos dados de base..."))
            Pagamento.objects.all().delete()
            Servico.objects.all().delete()
            Produto.objects.all().delete()
            Cliente.objects.all().delete()
            Costureira.objects.all().delete()
        else:
            self.stdout.write("Limpando seeds antigos sem afetar dados reais...")
            Pagamento.objects.filter(servico__cliente__nome__startswith=SEED_PREFIX).delete()
            Servico.objects.filter(cliente__nome__startswith=SEED_PREFIX).delete()
            Produto.objects.filter(nome__startswith=SEED_PREFIX).delete()
            Cliente.objects.filter(nome__startswith=SEED_PREFIX).delete()
            Costureira.objects.filter(nome__startswith=SEED_PREFIX).delete()

        today = timezone.localdate()

        costureiras = [
            Costureira.objects.create(nome=f"{SEED_PREFIX} Sirlene", ativo=True),
            Costureira.objects.create(nome=f"{SEED_PREFIX} Mariana", ativo=True),
            Costureira.objects.create(nome=f"{SEED_PREFIX} Joana", ativo=True),
            Costureira.objects.create(nome=f"{SEED_PREFIX} Ana Paula", ativo=True),
        ]

        clientes = [
            Cliente.objects.create(nome=f"{SEED_PREFIX} Cliente A"),
            Cliente.objects.create(nome=f"{SEED_PREFIX} Cliente B"),
            Cliente.objects.create(nome=f"{SEED_PREFIX} Cliente C"),
        ]

        produtos = [
            Produto.objects.create(nome=f"{SEED_PREFIX} Cortina", valor_base=Decimal("120.00")),
            Produto.objects.create(nome=f"{SEED_PREFIX} Almofada", valor_base=Decimal("60.00")),
            Produto.objects.create(nome=f"{SEED_PREFIX} Forro", valor_base=Decimal("80.00")),
        ]

        servicos = []
        for i in range(12):
            # 8 entregas na proxima semana, 4 fora da janela
            prazo = today + timedelta(days=i if i < 8 else 10 + i)
            servico = Servico.objects.create(
                cliente=clientes[i % len(clientes)],
                costureira=costureiras[i % len(costureiras)],
                quantidade=(i % 3) + 1,
                complexidade=(i % 5),
                data_envio=today - timedelta(days=1),
                prazo_entrega=prazo,
                valor=Decimal("150.00") + Decimal(i * 10),
                observacoes="Seed dashboard cards",
                tamanho="M",
            )
            servico.produto.add(produtos[i % len(produtos)])
            servicos.append(servico)

        pagamentos_seed = [
            (servicos[0], "pendente", 2),
            (servicos[1], "atrasado", 3),
            (servicos[2], "pendente", 4),
            (servicos[3], "pago", 5),
            (servicos[4], "pago", 6),
        ]

        for servico, status, due_days in pagamentos_seed:
            Pagamento.objects.create(
                servico=servico,
                valor=servico.valor,
                status=status,
                data_entrega=today + timedelta(days=due_days),
                data_pagamento=today if status == "pago" else None,
            )

        total_costureiras = Costureira.objects.filter(ativo=True).count()
        total_servicos = Servico.objects.count()
        total_pagamentos_pendentes = Pagamento.objects.filter(
            status__in=["pendente", "atrasado"],
            data_entrega__gte=today,
        ).count()
        total_entregas_previstas = Servico.objects.filter(
            prazo_entrega__gte=today,
            prazo_entrega__lte=today + timedelta(days=7),
        ).count()

        self.stdout.write(self.style.SUCCESS("Seed do dashboard concluido."))
        self.stdout.write(f"Costureiras ativas: {total_costureiras}")
        self.stdout.write(f"Servicos: {total_servicos}")
        self.stdout.write(f"Pagamentos pendentes/atrasados: {total_pagamentos_pendentes}")
        self.stdout.write(f"Entregas previstas (7 dias): {total_entregas_previstas}")
