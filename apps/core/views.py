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