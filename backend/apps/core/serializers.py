from rest_framework import serializers
from .models import Tarefa

#Transforma dados do banco em JSON e vice-versa
class TarefaSerializer(serializers.ModelSerializer):
    class Meta:#regras do tradutor:
        model = Tarefa #esse serializer trabalha com a tabela Tarefa
        fields = '__all__' #pega todos os campos da tabela