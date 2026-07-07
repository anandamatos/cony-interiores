from rest_framework import serializers
from .models import Costureira
from rest_framework.validators import UniqueValidator

# ----------------------------Adicoes-------------------------------

class CostureiraSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(
        validators=[UniqueValidator(
            queryset=Costureira.objects.all(),
            message="Esta costureira já está cadastrada." #HTTP 400
        )]
    )
    class Meta:
        model = Costureira 
        fields = '__all__'