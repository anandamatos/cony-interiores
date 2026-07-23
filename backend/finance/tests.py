from django.test import TestCase


class FinancialApiTests(TestCase):
    def test_financial_health_endpoint_returns_ok(self):
        response = self.client.get('/api/financial/health/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'ok')

    def test_simulate_payment_returns_calculated_values(self):
        response = self.client.post(
            '/api/financial/payments/simulate/',
            {'amount': 100, 'fee_rate': 0.1, 'currency': 'BRL'},
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload['amount'], '100.00')
        self.assertEqual(payload['fee_amount'], '10.00')
        self.assertEqual(payload['net_amount'], '90.00')

    def test_simulate_payment_rejects_invalid_amount(self):
        response = self.client.post(
            '/api/financial/payments/simulate/',
            {'amount': 0},
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 400)

"""
Testes do model Pagamento e do PagamentoSerializer
(TASK-M2-CORE-001, 002 e 003).

"""

from decimal import Decimal

from django.db import IntegrityError
from django.test import TestCase

from users.models import Cliente, Costureira, Servico

from .models import Pagamento
from .serializers import PagamentoSerializer


class TestPagamentoModel(TestCase):

    def setUp(self):
        self.cliente = Cliente.objects.create(nome="Cliente Pagamento Teste")
        self.costureira = Costureira.objects.create(nome="Costureira Pagamento Teste")
        self.servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=1,
            data_envio="2026-07-01",
            prazo_entrega="10 dias",
            valor=100.00,
        )

    def test_cria_pagamento_com_valores_padrao(self):
        pagamento = Pagamento.objects.create(
            servico=self.servico,
            valor=150.00,
            data_vencimento="2026-08-01",
        )
        self.assertEqual(pagamento.status, "pendente")
        self.assertIsNone(pagamento.data_pagamento)

    def test_str_formata_corretamente(self):
        pagamento = Pagamento.objects.create(
            servico=self.servico,
            valor=150.00,
            data_vencimento="2026-08-01",
        )
        texto = str(pagamento)
        self.assertIn("150", texto)
        self.assertIn("pendente", texto)

    def test_servico_e_obrigatorio(self):
        with self.assertRaises(IntegrityError):
            Pagamento.objects.create(
                servico=None,
                valor=150.00,
                data_vencimento="2026-08-01",
            )

    def test_relacionamento_com_servico(self):
        Pagamento.objects.create(
            servico=self.servico, valor=50.00, data_vencimento="2026-08-01"
        )
        Pagamento.objects.create(
            servico=self.servico, valor=50.00, data_vencimento="2026-09-01"
        )
        self.assertEqual(self.servico.pagamentos.count(), 2)

    def test_ordena_por_data_vencimento(self):
        p_depois = Pagamento.objects.create(
            servico=self.servico, valor=50.00, data_vencimento="2026-12-01"
        )
        p_antes = Pagamento.objects.create(
            servico=self.servico, valor=50.00, data_vencimento="2026-08-01"
        )
        pagamentos = list(Pagamento.objects.all())
        self.assertEqual(pagamentos[0], p_antes)
        self.assertEqual(pagamentos[1], p_depois)


class TestPagamentoSerializer(TestCase):

    def setUp(self):
        self.cliente = Cliente.objects.create(nome="Cliente Serializer Teste")
        self.costureira = Costureira.objects.create(nome="Costureira Serializer Teste")
        self.servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=1,
            data_envio="2026-07-01",
            prazo_entrega="10 dias",
            valor=100.00,
        )

    def test_serializa_pagamento_existente(self):
        pagamento = Pagamento.objects.create(
            servico=self.servico, valor=150.00, data_vencimento="2026-08-01"
        )
        serializer = PagamentoSerializer(pagamento)
        self.assertEqual(Decimal(serializer.data["valor"]), Decimal("150.00"))
        self.assertEqual(serializer.data["status"], "pendente")

    def test_rejeita_valor_zero_ou_negativo(self):
        dados = {
            "servico": self.servico.id,
            "valor": 0,
            "data_vencimento": "2026-08-01",
        }
        serializer = PagamentoSerializer(data=dados)
        self.assertFalse(serializer.is_valid())
        self.assertIn("valor", serializer.errors)

    def test_aceita_dados_validos(self):
        dados = {
            "servico": self.servico.id,
            "valor": 100,
            "data_vencimento": "2026-08-01",
        }
        serializer = PagamentoSerializer(data=dados)
        self.assertTrue(serializer.is_valid(), serializer.errors)
