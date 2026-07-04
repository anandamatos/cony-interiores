#from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Tarefa, Costureira
from .serializers import TarefaSerializer, CostureiraSerializer
from django.urls import reverse_lazy

@api_view(['GET']) #cria uma rota que aceita get
def listar_tarefas(request): #o request é a requisição que chegou
    tarefas = Tarefa.objects.all() #Busca os dados no banco, pega todas as linhas da tabela Tarefa
    #SELECT * FROM tarefas; ^
    serializer = TarefaSerializer(tarefas, many=True) #Transforma python em JSON. MAny para falar que vai conevrter uma lista de on=bjetos
    return Response(serializer.data)
# ----------------------------Adicoes-------------------------------
class CostureiraViewSet(viewsets.ModelViewSet):
    queryset = Costureira.objects.all()  # O SQL que ele vai rodar por trás (SELECT * FROM livro)
    serializer_class = CostureiraSerializer


