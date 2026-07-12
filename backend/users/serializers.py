from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import Costureira, Servico, Cliente, Produto


# ==================== SERIALIZER DA COSTUREIRA ====================

class CostureiraSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(
        validators=[
            UniqueValidator(
                queryset=Costureira.objects.all(),
                message="Esta costureira já está cadastrada."
            )
        ]
    )

    class Meta:
        model = Costureira
        fields = '__all__'


# ==================== SERIALIZER DO SERVIÇO ====================

class ServicoSerializer(serializers.ModelSerializer):
    cliente_nome = serializers.CharField(source='cliente.nome', read_only=True)
    costureira_nome = serializers.CharField(source='costureira.nome', read_only=True)

    class Meta:
        model = Servico
        fields = '__all__'


# ==================== SERIALIZER DO CLIENTE ====================

class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'


# ==================== SERIALIZER DO PRODUTO ====================

class ProdutoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Produto
        fields = '__all__'
        