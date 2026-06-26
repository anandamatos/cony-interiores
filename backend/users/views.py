from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def hello(request):
    return Response({"message": "Hello Cony Interiores!"})

@api_view(['GET'])
def home(request):
    return Response({"message": "Bem-vindo ao backend Cony Interiores!"})
