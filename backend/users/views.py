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

class ServicoViewSet(ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer