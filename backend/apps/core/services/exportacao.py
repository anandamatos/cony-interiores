"""
TASK-M4-CORE-004: Exportação de dados em CSV

Serviço para exportar relatórios em formato CSV com streaming
para grandes volumes de dados.
"""

import csv
from django.http import StreamingHttpResponse
from datetime import date

from .relatorios import gerar_relatorio_mensal, listar_atrasos


class Echo:
    """Classe para streaming de dados CSV"""
    def write(self, value):
        return value


def gerar_csv_relatorio_mensal(periodo):
    """
    Gera dados para CSV do relatório mensal de produção
    
    Args:
        periodo: string no formato 'AAAA-MM'
    
    Returns:
        tuple: (headers, rows) para o CSV
    """
    relatorio = gerar_relatorio_mensal(periodo)
    
    # Cabeçalhos do CSV
    headers = [
        'Costureira',
        'Produção Total (R$)',
        'Peças Produzidas',
        'Serviços em Atraso',
        'Serviços em Aberto'
    ]
    
    # Dados
    rows = []
    for item in relatorio.detalhamento_por_costureira:
        rows.append([
            item['costureira_nome'],
            item['producao_total'],
            str(item['pecas_produzidas']),
            str(item['servicos_atraso']),
            str(item['servicos_aberto']),
        ])
    
    return headers, rows


def gerar_csv_atrasos():
    """
    Gera dados para CSV do relatório de atrasos
    
    Returns:
        tuple: (headers, rows) para o CSV
    """
    atrasos = listar_atrasos()
    
    headers = [
        'Serviço ID',
        'Cliente',
        'Costureira',
        'Valor (R$)',
        'Data Entrega',
        'Dias em Atraso'
    ]
    
    rows = []
    for item in atrasos:
        rows.append([
            str(item['servico_id']),
            item['cliente'],
            item['costureira'],
            item['valor'],
            item['data_entrega'],
            str(item['dias_atraso']),
        ])
    
    return headers, rows


def exportar_csv(headers, rows, filename):
    """
    Exporta dados para CSV com streaming
    
    Args:
        headers: lista de cabeçalhos
        rows: lista de linhas de dados
        filename: nome do arquivo para download
    
    Returns:
        StreamingHttpResponse: resposta com o CSV
    """
    pseudo_buffer = Echo()
    writer = csv.writer(pseudo_buffer)
    
    # Gerar todas as linhas (headers + rows)
    all_rows = [headers] + rows
    
    response = StreamingHttpResponse(
        (writer.writerow(row) for row in all_rows),
        content_type="text/csv"
    )
    response['Content-Disposition'] = f'attachment; filename="{filename}"'
    return response


def exportar_csv_relatorio_mensal(periodo):
    """
    Exporta relatório mensal em CSV
    
    Args:
        periodo: string no formato 'AAAA-MM'
    
    Returns:
        StreamingHttpResponse: resposta com o CSV
    """
    headers, rows = gerar_csv_relatorio_mensal(periodo)
    filename = f'relatorio_mensal_{periodo}.csv'
    return exportar_csv(headers, rows, filename)


def exportar_csv_atrasos():
    """
    Exporta relatório de atrasos em CSV
    
    Returns:
        StreamingHttpResponse: resposta com o CSV
    """
    headers, rows = gerar_csv_atrasos()
    filename = f'relatorio_atrasos_{date.today()}.csv'
    return exportar_csv(headers, rows, filename)