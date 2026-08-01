"""
TASK-M4-CORE-005: Exportação de dados em PDF

Serviço para exportar relatórios em formato PDF usando ReportLab.
"""

from io import BytesIO
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from django.http import HttpResponse
from datetime import date

from .relatorios import gerar_relatorio_mensal, listar_atrasos


def gerar_pdf_relatorio_mensal(periodo):
    """
    Gera PDF do relatório mensal de produção
    
    Args:
        periodo: string no formato 'AAAA-MM'
    
    Returns:
        bytes: conteúdo do PDF
    """
    relatorio = gerar_relatorio_mensal(periodo)
    
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        topMargin=2*cm,
        bottomMargin=2*cm,
        leftMargin=2*cm,
        rightMargin=2*cm
    )
    
    styles = getSampleStyleSheet()
    
    # Estilo do título
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Heading1'],
        fontSize=16,
        alignment=TA_CENTER,
        spaceAfter=20,
        textColor=colors.HexColor('#703824')
    )
    
    # Estilo do subtítulo
    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        parent=styles['Heading2'],
        fontSize=12,
        alignment=TA_CENTER,
        spaceAfter=15,
        textColor=colors.HexColor('#8C7568')
    )
    
    # Estilo do resumo
    summary_style = ParagraphStyle(
        'SummaryStyle',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=6
    )
    
    # Estilo do rodapé
    footer_style = ParagraphStyle(
        'FooterStyle',
        parent=styles['Normal'],
        fontSize=8,
        alignment=TA_RIGHT,
        textColor=colors.HexColor('#A8968B')
    )
    
    elements = []
    
    # Título
    elements.append(Paragraph(f'Relatório Mensal de Produção', title_style))
    elements.append(Paragraph(f'Período: {periodo}', subtitle_style))
    elements.append(Spacer(1, 15))
    
    # Resumo
    elements.append(Paragraph(f'<b>Produção Total:</b> R$ {relatorio.producao_total}', summary_style))
    elements.append(Paragraph(f'<b>Peças Produzidas:</b> {relatorio.pecas_produzidas}', summary_style))
    elements.append(Paragraph(f'<b>Serviços em Atraso:</b> {relatorio.servicos_atraso}', summary_style))
    elements.append(Paragraph(f'<b>Serviços em Aberto:</b> {relatorio.servicos_aberto}', summary_style))
    elements.append(Spacer(1, 20))
    
    # Tabela de detalhamento
    data = [['Costureira', 'Produção (R$)', 'Peças', 'Atrasos', 'Abertos']]
    for item in relatorio.detalhamento_por_costureira:
        data.append([
            item['costureira_nome'],
            f"R$ {item['producao_total']}",
            str(item['pecas_produzidas']),
            str(item['servicos_atraso']),
            str(item['servicos_aberto']),
        ])
    
    # Calcular larguras das colunas
    col_widths = [4*cm, 3.2*cm, 2.8*cm, 2.5*cm, 2.5*cm]
    
    table = Table(data, colWidths=col_widths)
    table.setStyle(TableStyle([
        # Cabeçalho
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#703824')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, 0), 11),
        ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
        # Linhas de dados
        ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#F8F5F0')),
        ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#E8E3D9')),
        ('FONTSIZE', (0, 1), (-1, -1), 10),
        ('TOPPADDING', (0, 1), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
        # Alternar cores das linhas
        ('BACKGROUND', (0, 2), (-1, 2), colors.HexColor('#FDFDFD')),
        ('BACKGROUND', (0, 4), (-1, 4), colors.HexColor('#FDFDFD')),
    ]))
    
    elements.append(table)
    elements.append(Spacer(1, 20))
    
    # Rodapé
    elements.append(Paragraph(
        f'Relatório gerado automaticamente em {date.today().strftime("%d/%m/%Y às %H:%M")}',
        footer_style
    ))
    
    # Construir o PDF
    doc.build(elements)
    pdf = buffer.getvalue()
    buffer.close()
    
    return pdf


def gerar_pdf_atrasos():
    """
    Gera PDF do relatório de atrasos
    
    Returns:
        bytes: conteúdo do PDF
    """
    atrasos = listar_atrasos()
    
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=A4,
        topMargin=2*cm,
        bottomMargin=2*cm,
        leftMargin=2*cm,
        rightMargin=2*cm
    )
    
    styles = getSampleStyleSheet()
    
    title_style = ParagraphStyle(
        'TitleStyle',
        parent=styles['Heading1'],
        fontSize=16,
        alignment=TA_CENTER,
        spaceAfter=20,
        textColor=colors.HexColor('#903839')
    )
    
    subtitle_style = ParagraphStyle(
        'SubtitleStyle',
        parent=styles['Heading2'],
        fontSize=12,
        alignment=TA_CENTER,
        spaceAfter=15,
        textColor=colors.HexColor('#8C7568')
    )
    
    footer_style = ParagraphStyle(
        'FooterStyle',
        parent=styles['Normal'],
        fontSize=8,
        alignment=TA_RIGHT,
        textColor=colors.HexColor('#A8968B')
    )
    
    elements = []
    
    # Título
    elements.append(Paragraph(f'Relatório de Atrasos', title_style))
    elements.append(Paragraph(f'Total de atrasos: {len(atrasos)}', subtitle_style))
    elements.append(Spacer(1, 15))
    
    if atrasos:
        # Tabela de atrasos
        data = [['Serviço', 'Cliente', 'Costureira', 'Valor (R$)', 'Dias']]
        for item in atrasos:
            data.append([
                f"#{item['servico_id']}",
                item['cliente'],
                item['costureira'],
                item['valor'],
                str(item['dias_atraso']),
            ])
        
        col_widths = [2.5*cm, 3.5*cm, 3.5*cm, 2.5*cm, 2*cm]
        
        table = Table(data, colWidths=col_widths)
        table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#903839')),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 11),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 10),
            ('BACKGROUND', (0, 1), (-1, -1), colors.HexColor('#F8F5F0')),
            ('GRID', (0, 0), (-1, -1), 1, colors.HexColor('#E8E3D9')),
            ('FONTSIZE', (0, 1), (-1, -1), 10),
            ('TOPPADDING', (0, 1), (-1, -1), 8),
            ('BOTTOMPADDING', (0, 1), (-1, -1), 8),
            ('BACKGROUND', (0, 2), (-1, 2), colors.HexColor('#FDFDFD')),
            ('BACKGROUND', (0, 4), (-1, 4), colors.HexColor('#FDFDFD')),
        ]))
        
        elements.append(table)
        elements.append(Spacer(1, 20))
    else:
        elements.append(Paragraph('Nenhum atraso encontrado.', styles['Normal']))
        elements.append(Spacer(1, 20))
    
    # Rodapé
    elements.append(Paragraph(
        f'Relatório gerado automaticamente em {date.today().strftime("%d/%m/%Y às %H:%M")}',
        footer_style
    ))
    
    doc.build(elements)
    pdf = buffer.getvalue()
    buffer.close()
    
    return pdf


def exportar_pdf_relatorio_mensal(periodo):
    """
    Exporta relatório mensal em PDF
    
    Args:
        periodo: string no formato 'AAAA-MM'
    
    Returns:
        HttpResponse: resposta com o PDF
    """
    pdf = gerar_pdf_relatorio_mensal(periodo)
    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="relatorio_mensal_{periodo}.pdf"'
    return response


def exportar_pdf_atrasos():
    """
    Exporta relatório de atrasos em PDF
    
    Returns:
        HttpResponse: resposta com o PDF
    """
    pdf = gerar_pdf_atrasos()
    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename="relatorio_atrasos_{date.today()}.pdf"'
    return response