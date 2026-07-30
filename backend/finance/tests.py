"""
Testes do model Pagamento e do PagamentoSerializer
(TASK-M2-CORE-001, 002 e 003).

Testes do cálculo de pagamento das costureiras
(TASK-M2-CORE-004, 005 e 006).

Como rodar só esses:
    python manage.py test finance.tests.TestCalculoPagamentoCostureira
    python manage.py test finance.tests.TestEndpointListarPagamentosCostureiras

Como rodar tudo do finance:
    python manage.py test finance
"""

from decimal import Decimal

from django.db import IntegrityError
from django.test import TestCase
from rest_framework.test import APIClient

from users.models import Cliente, Costureira, Servico

from .models import Pagamento
from .serializers import PagamentoSerializer
from .services.calculo_pagamento_costureira import (
    calculo_de_pagamento,
    consultar_pagamento_costureira,
    listar_pagamento_todas_costureiras,
)


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
            data_entrega="2026-08-01",
        )
        self.assertEqual(pagamento.status, "pendente")
        self.assertIsNone(pagamento.data_pagamento)

    def test_str_formata_corretamente(self):
        pagamento = Pagamento.objects.create(
            servico=self.servico,
            valor=150.00,
            data_entrega="2026-08-01",
        )
        texto = str(pagamento)
        self.assertIn("150", texto)
        self.assertIn("pendente", texto)

    def test_servico_e_obrigatorio(self):
        with self.assertRaises(IntegrityError):
            Pagamento.objects.create(
                servico=None,
                valor=150.00,
                data_entrega="2026-08-01",
            )

    def test_relacionamento_com_servico(self):
        Pagamento.objects.create(
            servico=self.servico, valor=50.00, data_entrega="2026-08-01"
        )
        Pagamento.objects.create(
            servico=self.servico, valor=50.00, data_entrega="2026-09-01"
        )
        self.assertEqual(self.servico.pagamentos.count(), 2)

    def test_ordena_por_data_entrega(self):
        p_depois = Pagamento.objects.create(
            servico=self.servico, valor=50.00, data_entrega="2026-12-01"
        )
        p_antes = Pagamento.objects.create(
            servico=self.servico, valor=50.00, data_entrega="2026-08-01"
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
            servico=self.servico, valor=150.00, data_entrega="2026-08-01"
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
            "data_entrega": "2026-08-01",
        }
        serializer = PagamentoSerializer(data=dados)
        self.assertTrue(serializer.is_valid(), serializer.errors)


class ServicoFakeParaTeste:
    """Objeto simples só com o campo .valor, pra testar a lógica pura
    sem precisar criar Cliente/Costureira/Servico completos no banco."""
    def __init__(self, valor):
        self.valor = Decimal(str(valor))


class TestCalculoDePagamento(TestCase):

    def test_soma_e_aplica_percentual(self):
        servicos = [
            ServicoFakeParaTeste(100),
            ServicoFakeParaTeste(250),
            ServicoFakeParaTeste(50),
        ]
        resultado = calculo_de_pagamento(servicos, Decimal("0.60"))
        self.assertEqual(resultado, Decimal("240.00"))

    def test_lista_vazia_da_zero(self):
        resultado = calculo_de_pagamento([], Decimal("0.60"))
        self.assertEqual(resultado, Decimal("0"))

    def test_aceita_percentual_como_float_sem_quebrar(self):
        # Garante que não volta o bug de Decimal x float
        servicos = [ServicoFakeParaTeste(100)]
        resultado = calculo_de_pagamento(servicos, 0.60)
        self.assertEqual(resultado, Decimal("60.0"))

    def test_percentual_diferente_muda_resultado(self):
        servicos = [ServicoFakeParaTeste(1000)]
        resultado_50 = calculo_de_pagamento(servicos, Decimal("0.50"))
        resultado_90 = calculo_de_pagamento(servicos, Decimal("0.90"))
        self.assertEqual(resultado_50, Decimal("500.00"))
        self.assertEqual(resultado_90, Decimal("900.00"))


class TestConsultaEListaPagamentoCostureiras(TestCase):
    """
    Estes testes usam o banco de dados de verdade (Cliente, Costureira,
    Servico), pra confirmar que a integração com os models reais funciona.
    """

    def setUp(self):
        self.cliente = Cliente.objects.create(nome="Cliente Pagamento")

        self.maria = Costureira.objects.create(nome="Maria Pagamento", ativo=True)
        self.joana = Costureira.objects.create(nome="Joana Pagamento", ativo=True)

        Servico.objects.create(
            cliente=self.cliente, costureira=self.maria, quantidade=1,
            data_envio="2026-07-01", prazo_entrega="10 dias", valor=100,
        )
        Servico.objects.create(
            cliente=self.cliente, costureira=self.maria, quantidade=1,
            data_envio="2026-07-05", prazo_entrega="10 dias", valor=250,
        )
        Servico.objects.create(
            cliente=self.cliente, costureira=self.joana, quantidade=1,
            data_envio="2026-07-02", prazo_entrega="10 dias", valor=1000,
        )

        # Costureira inativa, não deve aparecer nos resultados
        Costureira.objects.create(nome="Inativa Pagamento", ativo=False)

    def test_consulta_pagamento_de_uma_costureira(self):
        dados = consultar_pagamento_costureira(self.maria)
        self.assertEqual(dados["nome"], "Maria Pagamento")
        # (100 + 250) * 0.60 = 210
        self.assertEqual(dados["valor_a_pagar"], Decimal("210.00"))

    def test_cada_costureira_calculada_separadamente(self):
        dados_maria = consultar_pagamento_costureira(self.maria)
        dados_joana = consultar_pagamento_costureira(self.joana)

        self.assertEqual(dados_maria["valor_a_pagar"], Decimal("210.00"))
        self.assertEqual(dados_joana["valor_a_pagar"], Decimal("600.00"))  # 1000 * 0.60

    def test_lista_todas_costureiras_ativas(self):
        costureiras_ativas = Costureira.objects.filter(ativo=True)
        dados = listar_pagamento_todas_costureiras(costureiras_ativas)

        nomes = [item["nome"] for item in dados]
        self.assertIn("Maria Pagamento", nomes)
        self.assertIn("Joana Pagamento", nomes)
        self.assertEqual(len(dados), 2)  # não inclui a inativa


class TestEndpointListarPagamentosCostureiras(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.cliente = Cliente.objects.create(nome="Cliente Endpoint")
        self.costureira = Costureira.objects.create(nome="Costureira Endpoint", ativo=True)
        Servico.objects.create(
            cliente=self.cliente, costureira=self.costureira, quantidade=1,
            data_envio="2026-07-01", prazo_entrega="10 dias", valor=500,
        )

    def test_endpoint_retorna_200(self):
        response = self.client.get('/api/financial/pagamentos-costureiras/')
        self.assertEqual(response.status_code, 200)

    def test_endpoint_retorna_valor_calculado(self):
        response = self.client.get('/api/financial/pagamentos-costureiras/')
        item = next(i for i in response.data if i["nome"] == "Costureira Endpoint")
        self.assertEqual(Decimal(str(item["valor_a_pagar"])), Decimal("300.00"))  # 500 * 0.60
