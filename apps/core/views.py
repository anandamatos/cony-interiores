# ==================== EXPORTAÇÃO CSV ====================
# TASK-M4-CORE-004

from .services.exportacao import (
    exportar_csv_relatorio_mensal,
    exportar_csv_atrasos
)


@api_view(['GET'])
@permission_classes([AllowAny])
def exportar_relatorio_mensal_csv(request):
    """
    GET /api/core/relatorios/mensal/exportar/csv/
    Query params: ?periodo=2026-07
    
    Exporta o relatório mensal de produção em formato CSV.
    """
    periodo = request.query_params.get('periodo')
    if not periodo:
        return Response(
            {"erro": "Informe 'periodo' no formato AAAA-MM, ex: '2026-07'."},
            status=400
        )
    
    try:
        return exportar_csv_relatorio_mensal(periodo)
    except Exception as e:
        return Response(
            {"erro": f"Erro ao gerar CSV: {str(e)}"},
            status=500
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def exportar_atrasos_csv(request):
    """
    GET /api/core/relatorios/atrasos/exportar/csv/
    
    Exporta o relatório de atrasos em formato CSV.
    """
    try:
        return exportar_csv_atrasos()
    except Exception as e:
        return Response(
            {"erro": f"Erro ao gerar CSV: {str(e)}"},
            status=500
        )
# ==================== EXPORTAÇÃO CSV ====================
# TASK-M4-CORE-004

from .services.exportacao import (
    exportar_csv_relatorio_mensal,
    exportar_csv_atrasos
)


@api_view(['GET'])
@permission_classes([AllowAny])
def exportar_relatorio_mensal_csv(request):
    """
    GET /api/core/relatorios/mensal/exportar/csv/
    Query params: ?periodo=2026-07
    
    Exporta o relatório mensal de produção em formato CSV.
    """
    periodo = request.query_params.get('periodo')
    if not periodo:
        return Response(
            {"erro": "Informe 'periodo' no formato AAAA-MM, ex: '2026-07'."},
            status=400
        )
    
    try:
        return exportar_csv_relatorio_mensal(periodo)
    except Exception as e:
        return Response(
            {"erro": f"Erro ao gerar CSV: {str(e)}"},
            status=500
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def exportar_atrasos_csv(request):
    """
    GET /api/core/relatorios/atrasos/exportar/csv/
    
    Exporta o relatório de atrasos em formato CSV.
    """
    try:
        return exportar_csv_atrasos()
    except Exception as e:
        return Response(
            {"erro": f"Erro ao gerar CSV: {str(e)}"},
            status=500
        )    
# ==================== EXPORTAÇÃO PDF ====================
# TASK-M4-CORE-005

from .services.exportacao_pdf import (
    exportar_pdf_relatorio_mensal,
    exportar_pdf_atrasos
)


@api_view(['GET'])
@permission_classes([AllowAny])
def exportar_relatorio_mensal_pdf(request):
    """
    GET /api/core/relatorios/mensal/exportar/pdf/?periodo=2026-07
    
    Exporta o relatório mensal de produção em formato PDF.
    """
    periodo = request.query_params.get('periodo')
    if not periodo:
        return Response(
            {"erro": "Informe 'periodo' no formato AAAA-MM, ex: '2026-07'."},
            status=400
        )
    
    try:
        return exportar_pdf_relatorio_mensal(periodo)
    except Exception as e:
        return Response(
            {"erro": f"Erro ao gerar PDF: {str(e)}"},
            status=500
        )


@api_view(['GET'])
@permission_classes([AllowAny])
def exportar_atrasos_pdf(request):
    """
    GET /api/core/relatorios/atrasos/exportar/pdf/
    
    Exporta o relatório de atrasos em formato PDF.
    """
    try:
        return exportar_pdf_atrasos()
    except Exception as e:
        return Response(
            {"erro": f"Erro ao gerar PDF: {str(e)}"},
            status=500
        )    
# ==================== FILTROS AVANÇADOS ====================
# TASK-M4-CORE-006

from .services.filtros import (
    aplicar_filtros_avancados,
    aplicar_filtros_pagamentos,
    validar_filtros
)


@api_view(['GET'])
@permission_classes([AllowAny])
def listar_servicos_com_filtros(request):
    """
    GET /api/core/servicos/filtrados/
    
    Lista serviços com filtros avançados.
    """
    from users.models import Servico
    
    allowed_filters = [
        'periodo_inicio', 'periodo_fim', 'costureira_id',
        'cliente_id', 'status', 'tipo_servico',
        'valor_min', 'valor_max', 'search'
    ]
    
    is_valid, errors = validar_filtros(request.query_params, allowed_filters)
    if not is_valid:
        return Response({'erros': errors}, status=400)
    
    queryset = Servico.objects.select_related('cliente', 'costureira')
    queryset = aplicar_filtros_avancados(queryset, request.query_params)
    
    from users.serializers import ServicoSerializer
    serializer = ServicoSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def listar_pagamentos_com_filtros(request):
    """
    GET /api/core/pagamentos/filtrados/
    
    Lista pagamentos com filtros avançados.
    """
    from finance.models import Pagamento
    
    allowed_filters = [
        'status', 'data_inicio', 'data_fim',
        'costureira_id', 'valor_min', 'valor_max'
    ]
    
    is_valid, errors = validar_filtros(request.query_params, allowed_filters)
    if not is_valid:
        return Response({'erros': errors}, status=400)
    
    queryset = Pagamento.objects.select_related('servico', 'servico__cliente', 'servico__costureira')
    queryset = aplicar_filtros_pagamentos(queryset, request.query_params)
    
    from finance.serializers import PagamentoSerializer
    serializer = PagamentoSerializer(queryset, many=True)
    return Response(serializer.data)    