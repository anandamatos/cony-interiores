"""
TASK-M4-CORE-003

Serviço responsável por executar os relatórios agendados.

A execução pode ser chamada por qualquer scheduler externo
(cron, Celery Beat, GitHub Actions etc.).
"""

from datetime import date

from .relatorios import gerar_relatorio_mensal


def executar_relatorios_agendados():
    """
    Executa a geração automática dos relatórios do mês atual.
    """

    periodo = date.today().strftime("%Y-%m")

    return gerar_relatorio_mensal(periodo)