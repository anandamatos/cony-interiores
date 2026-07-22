from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Costureira, Servico, Cliente, Produto
from .serializers import CostureiraSerializer, ServicoSerializer, ClienteSerializer, ProdutoSerializer
from apps.core.services.complexidade_manual import atualizar_complexidade_se_automatica
import time


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

    def perform_create(self, serializer):
        servico = serializer.save()
        atualizar_complexidade_se_automatica(servico)

    def perform_update(self, serializer):
        servico = serializer.save()
        atualizar_complexidade_se_automatica(servico)


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