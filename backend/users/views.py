from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from .models import Costureira, Servico, Cliente, Produto
from .serializers import CostureiraSerializer, ServicoSerializer, ClienteSerializer, ProdutoSerializer
from datetime import datetime
from django.db import models
from django.utils import timezone
import logging
import time

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


# ===== VIEWS DE TESTE =====

@api_view(['GET'])
@permission_classes([AllowAny])
def hello(request):
    return Response({"message": "Hello Cony Interiores!"})


@api_view(['GET'])
@permission_classes([AllowAny])
def home(request):
    return Response({"message": "Bem-vindo ao backend Cony Interiores!"})


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
    
    if inicio_mes.month == 12:
        fim_mes = inicio_mes.replace(month=12, day=31)
    else:
        fim_mes = inicio_mes.replace(month=inicio_mes.month + 1, day=1) - timedelta(days=1)

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


class MetricaViewSet(viewsets.ViewSet):
    """
    ViewSet para métricas de produção.
    Registrado em users/urls.py com o router.
    """
    permission_classes = [AllowAny]

    # NOTA --- O dispatch abaixo serve apenas para calcular o tempo de resposta.
    # Pode ser removido.

    def dispatch(self, request, *args, **kwargs):
        inicio = time.perf_counter()
        response = super().dispatch(request, *args, **kwargs)
        fim = time.perf_counter()
        tempo_gasto = fim - inicio
        action = getattr(self, 'action', request.method)

        print(f"KPI - Ação [{action}] levou {tempo_gasto:.4f} segundos.")
        if action == 'destroy':
            print(f"Um registro foi deletado e o processo levou {tempo_gasto:.4f}s.")
        elif action in ['update', 'partial_update']:
            print(f"Um registro foi atualizado e o processo levou {tempo_gasto:.4f}s.")
        return response

    @action(detail=False, methods=["get"], url_path="otif")
    def OTIF(self, request):
        """Endpoint: /api/metricas/otif/"""
        OTIF_lista = []
        pesquisada = request.query_params.get('q', None)

        if pesquisada:
            servicos = Servico.objects.filter(costureira__nome=pesquisada)
        else:
            servicos = Servico.objects.all()

        for servico in servicos:
            nome_costureira = getattr(servico.costureira, "nome", "Sem nome")
            if servico.data_envio and servico.prazo_entrega:
                if servico.data_envio > servico.prazo_entrega:
                    atraso = (servico.data_envio - servico.prazo_entrega).days
                    mensagem = f"Atrasado: enviado {atraso} dias após o prazo."
                    status = "Atrasado"
                else:
                    mensagem = "Pedido dentro do prazo de entrega."
                    status = "No prazo"
            else:
                mensagem = "Dados de envio ou prazo ausentes."
                status = "Indefinido"
            OTIF_lista.append({
                "costureira": nome_costureira,
                "status": status,
                "detalhe": mensagem,
                "prazo": servico.prazo_entrega,
                "data_envio": servico.data_envio,
            })
        return Response({
            "total_pedidos": len(OTIF_lista),
            "Cycle": OTIF_lista
        })

    @action(detail=False, methods=["get"], url_path="eficiencia")
    def eficiencia(self, request):
        """Endpoint: /api/metricas/eficiencia/"""
        pesquisada = request.query_params.get('q', None)
        if pesquisada:
            servicos = Servico.objects.filter(costureira__nome=pesquisada)
        else:
            servicos = Servico.objects.all()
        
        hoje = timezone.now()
        mes_atual_str = hoje.strftime("%Y-%m")
        total_mes = 0
        no_prazo_mes = 0
        for servico in servicos:
            if servico.data_envio:
                mes_servico = servico.data_envio.strftime("%Y-%m")
                if mes_servico == mes_atual_str:
                    total_mes += 1
                    if servico.data_envio and servico.prazo_entrega:
                        d_envio = servico.data_envio
                        d_prazo = servico.prazo_entrega
                        if isinstance(d_prazo, str):
                            from datetime import datetime
                            d_prazo = datetime.strptime(d_prazo, "%Y-%m-%d").date()
                        if d_envio <= d_prazo:
                            no_prazo_mes += 1
        if total_mes > 0:
            taxa_eficiencia = round((no_prazo_mes / total_mes) * 100, 2)
        else:
            taxa_eficiencia = 0.0

        return Response({
            "mes_referencia": mes_atual_str,
            "total_pedidos_mes": total_mes,
            "entregas_no_prazo": no_prazo_mes,
            "taxa_eficiencia_porcentagem": f"{taxa_eficiencia}%",
        })