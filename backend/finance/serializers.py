from rest_framework import serializers

from .models import Pagamento


class PagamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pagamento
        fields = "__all__"
        read_only_fields = ["criado_em", "atualizado_em"]

    def validate_valor(self, value):
        if value <= 0:
            raise serializers.ValidationError("O valor do pagamento deve ser maior que zero.")
        return value