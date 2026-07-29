from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action, api_view, permission_classes
from .models import Costureira, Servico, Cliente, Produto
from .serializers import CostureiraSerializer, ServicoSerializer, ClienteSerializer, ProdutoSerializer
import time
from django.utils import timezone


# ==================== VIEWS DE TESTE ====================

@api_view(['GET'])
@permission_classes([AllowAny])
def hello(request):
    return Response({"message": "Hello Cony Interiores!"})


@api_view(['GET'])
@permission_classes([AllowAny])
def home(request):
    return Response({"message": "Bem-vindo ao backend Cony Interiores!"})


# ==================== VIEWSET DA COSTUREIRA ====================

class CostureiraViewSet(viewsets.ModelViewSet):
    queryset = Costureira.objects.all()
    serializer_class = CostureiraSerializer
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


# ==================== VIEWSET DO SERVIÇO ====================

class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer
    permission_classes = [AllowAny]
    filterset_fields = ['cliente', 'costureira', 'data_envio', 'prazo_entrega']
    search_fields = ['cliente__nome', 'observacoes']
    ordering_fields = ['data_envio', 'prazo_entrega', 'valor', 'complexidade']


# ==================== VIEWSET DO CLIENTE ====================

class ClienteViewSet(viewsets.ModelViewSet):
    queryset = Cliente.objects.all()
    serializer_class = ClienteSerializer
    permission_classes = [AllowAny]


# ==================== VIEWSET DO PRODUTO ====================

class ProdutoViewSet(viewsets.ModelViewSet):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [AllowAny]

# ==================== VIEWSET DA METRICA DE PRODUÇÃO =========

class MetricaViewSet(viewsets.ViewSet):
    permission_classes = [AllowAny]

    @action(detail=False, methods=["get"], url_path="otif")
    def OTIF(self, request):
        OTIF_lista = []
        pesquisada = request.query_params.get('q', None) #New

        if pesquisada:
            servicos = Servico.objects.filter(costureira__nome=pesquisada)
        else:
            servicos = Servico.objects.all()

        for servico in servicos:
            nome_costureira = getattr(servico.costureira, "nome", "Sem nome")
            if servico.data_envio and servico.prazo_entrega:
                if servico.data_envio > servico.prazo_entrega:
                    atraso = (servico.data_envio - servico.prazo_entrega).days
                    mensagem = (f"Atrasado: enviado {atraso} dias após o prazo.")
                    status = "Atrasado"
                else:
                    mensagem = "Pedido dentro do prazo de entrega."
                    status = "No prazo"
            else:
                mensagem = "Dados de envio ou prazo ausentes."
                status = "Indefinido"
            OTIF_lista.append(
                {
                    "costureira": nome_costureira,
                    "status": status,
                    "detalhe": mensagem,
                    "prazo": servico.prazo_entrega,
                    "data_envio": servico.data_envio,
                }
            )
        return Response(
            {"total_pedidos": len(OTIF_lista), "Cycle": OTIF_lista}
        )
    

    @action(detail=False, methods=["get"], url_path="eficiencia")
    def eficiencia(self, request):
        pesquisada = request.query_params.get('q', None) #New
        if pesquisada:
         servicos = Servico.objects.filter(costureira__nome=pesquisada)
        else:
         servicos = Servico.objects.all()
        
        hoje = timezone.now()
        mes_atual_str = hoje.strftime("%Y-%m")
        total_mes = 0
        no_prazo_mes = 0
        for servico in servicos:
            if servico.criacao:
                mes_servico = servico.criacao.strftime("%Y-%m")
                if mes_servico == mes_atual_str:
                    total_mes += 1
                    if servico.data_envio and servico.prazo_entrega:
                        d_envio = (servico.data_envio.date()
                            if hasattr(servico.data_envio, "date")
                            else servico.data_envio)
                        d_prazo = (servico.prazo_entrega.date()
                            if hasattr(servico.prazo_entrega, "date")
                            else servico.prazo_entrega)

                        if d_envio <= d_prazo:
                            no_prazo_mes += 1
        if total_mes > 0:
            taxa_eficiencia = round((no_prazo_mes / total_mes) * 100, 2)
        else:
            taxa_eficiencia = 0.0

        return Response(
            {
                "mes_referencia": mes_atual_str,
                "total_pedidos_mes": total_mes,
                "entregas_no_prazo": no_prazo_mes,
                "taxa_eficiencia_porcentagem": f"{taxa_eficiencia}%",
            }
        )
  