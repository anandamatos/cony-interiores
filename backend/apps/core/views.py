"""
TASK-M1-CORE-013: endpoint de consulta de carga.
"""

from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from users.models import Costureira

from .services.bridge import (
    consultar_capacidade_costureira,
    listar_capacidade_todas_costureiras,
)


@api_view(['GET'])
@permission_classes([AllowAny])
def consultar_carga(request, costureira_id):
    """
    GET /api/core/costureiras/<id>/carga/
    Retorna a carga de UMA costureira específica.
    """
    costureira = get_object_or_404(Costureira, id=costureira_id)
    dados = consultar_capacidade_costureira(costureira)
    return Response(dados)


@api_view(['GET'])
@permission_classes([AllowAny])
def listar_cargas(request):
    """
    GET /api/core/costureiras/carga/
    Retorna a carga de TODAS as costureiras de uma vez.
    """
    costureiras = Costureira.objects.filter(ativo=True)
    dados = listar_capacidade_todas_costureiras(costureiras)
    return Response(dados)

from users.models import Servico
from .services.bridge_alocacao import sugerir_costureira_para_servico


@api_view(['GET'])
@permission_classes([AllowAny])
def sugerir_alocacao(request, servico_id):
    """
    GET /api/core/servicos/<id>/sugestao-costureira/
    Sugere qual costureira ativa deveria pegar esse serviço.
    """
    servico = get_object_or_404(Servico, id=servico_id)
    sugestao = sugerir_costureira_para_servico(servico)

    if sugestao is None:
        return Response(
            {"mensagem": "Nenhuma costureira ativa com capacidade suficiente no momento."},
            status=200,
        )
    return Response(sugestao)