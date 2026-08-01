from django.core.management.base import BaseCommand

from apps.core.services.agendamento import executar_relatorios_agendados


class Command(BaseCommand):
    help = "Gera automaticamente os relatórios do mês atual."

    def handle(self, *args, **options):
        relatorio = executar_relatorios_agendados()

        self.stdout.write(
            self.style.SUCCESS(
                f"Relatório do período {relatorio.periodo} gerado com sucesso."
            )
        )