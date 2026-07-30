from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from .models import Costureira, Servico, Cliente, Produto
from .serializers import CostureiraSerializer, ServicoSerializer, ClienteSerializer, ProdutoSerializer
from datetime import datetime
import logging

logger = logging.getLogger(__name__)


class CostureiraViewSet(viewsets.ModelViewSet):
    queryset = Costureira.objects.all()
    serializer_class = CostureiraSerializer
    permission_classes = [AllowAny]


class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        
        # Filtros avançados
        periodo_inicio = self.request.query_params.get('periodo_inicio')
        periodo_fim = self.request.query_params.get('periodo_fim')
        costureira_id = self.request.query_params.get('costureira_id')
        tipo_servico = self.request.query_params.get('tipo_servico')

        if periodo_inicio:
            queryset = queryset.filter(data_envio__gte=periodo_inicio)
        if periodo_fim:
            queryset = queryset.filter(data_envio__lte=periodo_fim)
        if costureira_id:
            queryset = queryset.filter(costureira_id=costureira_id)
        if tipo_servico:
            queryset = queryset.filter(tipo_servico=tipo_servico)

        return queryset


class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [AllowAny]


class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [AllowAny]


# ===== MÉTRICAS =====

@api_view(['GET'])
@permission_classes([AllowAny])
def metrica_otif(request):
    """OTIF - On Time In Full"""
    costureira_id = request.query_params.get('costureira_id')
    periodo_inicio = request.query_params.get('periodo_inicio')
    periodo_fim = request.query_params.get('periodo_fim')
    tipo_servico = request.query_params.get('tipo_servico')

    queryset = Servico.objects.all()

    if costureira_id:
        queryset = queryset.filter(costureira_id=costureira_id)
    if periodo_inicio:
        queryset = queryset.filter(data_envio__gte=periodo_inicio)
    if periodo_fim:
        queryset = queryset.filter(data_envio__lte=periodo_fim)
    if tipo_servico:
        queryset = queryset.filter(tipo_servico=tipo_servico)

    results = []
    for servico in queryset:
        status = "No prazo" if servico.data_envio <= servico.prazo_entrega else "Atrasado"
        results.append({
            "costureira": servico.costureira.nome if servico.costureira else "N/A",
            "status": status,
            "detalhe": f"Pedido {'dentro' if status == 'No prazo' else 'fora'} do prazo de entrega.",
            "prazo": servico.prazo_entrega,
            "data_envio": servico.data_envio,
        })

    return Response({
        "total_pedidos": queryset.count(),
        "Cycle": results
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def metrica_eficiencia(request):
    """Eficiência de entregas no mês"""
    from datetime import datetime, timedelta
    
    hoje = datetime.now().date()
    inicio_mes = hoje.replace(day=1)
    fim_mes = (inicio_mes.replace(month=inicio_mes.month % 12 + 1, day=1) - timedelta(days=1)) if inicio_mes.month != 12 else inicio_mes.replace(month=12, day=31)

    queryset = Servico.objects.filter(
        data_envio__gte=inicio_mes,
        data_envio__lte=fim_mes
    )

    total = queryset.count()
    no_prazo = queryset.filter(data_envio__lte=models.F('prazo_entrega')).count()

    taxa = (no_prazo / total * 100) if total > 0 else 0

    return Response({
        "mes_referencia": hoje.strftime("%Y-%m"),
        "total_pedidos_mes": total,
        "entregas_no_prazo": no_prazo,
        "taxa_eficiencia_porcentagem": f"{taxa:.1f}%"
    })