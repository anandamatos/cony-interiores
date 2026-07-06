# from rest_framework.response import Response
# from rest_framework.decorators import api_view

# @api_view(['GET'])
# def hello(request):
#     return Response({"message": "Hello Cony Interiores!"})

# @api_view(['GET'])
# def home(request):
#     return Response({"message": "Bem-vindo ao backend Cony Interiores!"})
from .models import Servico
from .serializers import ServicoSerializer
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

class ServicoViewSet(ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter
        ]

    filterset_fields = [
        'cliente',
        'produto',
        'costureira',
        'complexidade',
        'data_envio',
        'prazo_entrega',
    ]

    search_fields = [
        "observacoes",
    ]

    ordering_fields = [
        'data_envio',
        'prazo_entrega',
        'valor',
        'complexidade',
    ]