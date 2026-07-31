"""
Views do app core
"""
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from users.models import Costureira, Servico, Relatorio
from .services.bridge import (
    consultar_capacidade_costureira,
    listar_capacidade_todas_costureiras,
)
from .services.bridge_alocacao import sugerir_costureira_para_servico
from .services.agendamento import executar_relatorios_agendados
from .services.relatorios import gerar_relatorio_mensal, listar_atrasos
from users.serializers import RelatorioSerializer


# ==================== CAPACIDADE ====================
@api_view(['GET'])
@permission_classes([AllowAny])
def consultar_carga(request, costureira_id):
    """GET /api/core/costureiras/<id>/carga/"""
    costureira = get_object_or_404(Costureira, id=costureira_id)
    dados = consultar_capacidade_costureira(costureira)
    return Response(dados)


@api_view(['GET'])
@permission_classes([AllowAny])
def listar_cargas(request):
    """GET /api/core/costureiras/carga/"""
    costureiras = Costureira.objects.filter(ativo=True)
    dados = listar_capacidade_todas_costureiras(costureiras)
    return Response(dados)


# ==================== ALOCAÇÃO ====================
@api_view(['GET'])
@permission_classes([AllowAny])
def sugerir_alocacao(request, servico_id):
    """GET /api/core/servicos/<id>/sugestao-costureira/"""
    servico = get_object_or_404(Servico, id=servico_id)
    sugestao = sugerir_costureira_para_servico(servico)
    if sugestao is None:
        return Response(
            {"mensagem": "Nenhuma costureira ativa com capacidade suficiente."},
            status=200,
        )
    return Response(sugestao)


# ==================== RELATÓRIOS ====================
@api_view(['POST'])
@permission_classes([AllowAny])
def gerar_relatorio_mensal_view(request):
    """POST /api/core/relatorios/mensal/gerar/"""
    periodo = request.data.get('periodo')
    if not periodo:
        return Response(
            {"erro": "Informe 'periodo' no formato AAAA-MM."},
            status=400,
        )
    try:
        relatorio = gerar_relatorio_mensal(periodo)
    except ValueError:
        return Response(
            {"erro": "Periodo inválido. Use o formato AAAA-MM."},
            status=400,
        )
    serializer = RelatorioSerializer(relatorio)
    return Response(serializer.data, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def listar_relatorios_mensais(request):
    """GET /api/core/relatorios/mensal/"""
    relatorios = Relatorio.objects.all().order_by('-periodo')
    serializer = RelatorioSerializer(relatorios, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def listar_atrasos_view(request):
    """GET /api/core/relatorios/atrasos/"""
    return Response(listar_atrasos())


@api_view(['POST'])
@permission_classes([AllowAny])
def executar_agendamento_view(request):
    """POST /api/core/relatorios/agendamento/"""
    relatorio = executar_relatorios_agendados()
    return Response({"mensagem": "Relatório gerado com sucesso.", "periodo": relatorio.periodo})


# ==================== EXPORTAÇÃO CSV ====================
# TASK-M4-CORE-004

from .services.exportacao import (
    exportar_csv_relatorio_mensal,
    exportar_csv_atrasos
)


@api_view(['GET'])
@permission_classes([AllowAny])
def exportar_relatorio_mensal_csv(request):
    """GET /api/core/relatorios/mensal/exportar/csv/?periodo=2026-07"""
    periodo = request.query_params.get('periodo')
    if not periodo:
        return Response(
            {"erro": "Informe 'periodo' no formato AAAA-MM."},
            status=400
        )
    return exportar_csv_relatorio_mensal(periodo)


@api_view(['GET'])
@permission_classes([AllowAny])
def exportar_atrasos_csv(request):
    """GET /api/core/relatorios/atrasos/exportar/csv/"""
    return exportar_csv_atrasos()


# ==================== EXPORTAÇÃO PDF ====================
# TASK-M4-CORE-005

from .services.exportacao_pdf import (
    exportar_pdf_relatorio_mensal,
    exportar_pdf_atrasos
)


@api_view(['GET'])
@permission_classes([AllowAny])
def exportar_relatorio_mensal_pdf(request):
    """GET /api/core/relatorios/mensal/exportar/pdf/?periodo=2026-07"""
    periodo = request.query_params.get('periodo')
    if not periodo:
        return Response(
            {"erro": "Informe 'periodo' no formato AAAA-MM."},
            status=400
        )
    return exportar_pdf_relatorio_mensal(periodo)


@api_view(['GET'])
@permission_classes([AllowAny])
def exportar_atrasos_pdf(request):
    """GET /api/core/relatorios/atrasos/exportar/pdf/"""
    return exportar_pdf_atrasos()


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
    """GET /api/core/servicos/filtrados/"""
    from users.serializers import ServicoSerializer
    
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
    
    serializer = ServicoSerializer(queryset, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def listar_pagamentos_com_filtros(request):
    """GET /api/core/pagamentos/filtrados/"""
    from finance.models import Pagamento
    from finance.serializers import PagamentoSerializer
    
    allowed_filters = [
        'status', 'data_inicio', 'data_fim',
        'costureira_id', 'valor_min', 'valor_max'
    ]
    
    is_valid, errors = validar_filtros(request.query_params, allowed_filters)
    if not is_valid:
        return Response({'erros': errors}, status=400)
    
    queryset = Pagamento.objects.select_related('servico', 'servico__cliente', 'servico__costureira')
    queryset = aplicar_filtros_pagamentos(queryset, request.query_params)
    
    serializer = PagamentoSerializer(queryset, many=True)
    return Response(serializer.data)