#from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Costureira
from .serializers import CostureiraSerializer
import time

class CostureiraViewSet(viewsets.ModelViewSet):
    queryset = Costureira.objects.all()  # O SQL que ele vai rodar por trás (SELECT * FROM livro)
    serializer_class = CostureiraSerializer
    permission_classes = [AllowAny] # new
    # ----------------------------Adicoes-------------------------------

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
    
    # CRUD tem tempo de 0.18 segundos de resposta
    # O tempo de resposta pra entrar na pagina e de  0.006 segundos em média.


