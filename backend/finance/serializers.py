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

    def validate(self, data):
        numero_parcela = data.get("numero_parcela", getattr(self.instance, "numero_parcela", 1))
        total_parcelas = data.get("total_parcelas", getattr(self.instance, "total_parcelas", 1))
        if numero_parcela > total_parcelas:
            raise serializers.ValidationError(
                "numero_parcela não pode ser maior que total_parcelas."
            )
        return data
