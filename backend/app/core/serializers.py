from rest_framework import serializers
from .models import Costureira

# ----------------------------Adicoes-------------------------------

class CostureiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Costureira 
        fields = '__all__'