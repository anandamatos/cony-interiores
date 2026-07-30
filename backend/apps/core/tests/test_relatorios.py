"""
Testes do relatório mensal de produção (TASK-M4-CORE-001).

Como rodar (na raiz do projeto, onde fica o manage.py):
    python manage.py test apps.core.tests.test_relatorios
"""

from django.test import TestCase
from rest_framework.test import APIClient

from users.models import Cliente, Costureira, Produto, Servico, Relatorio
from finance.models import Pagamento
from apps.core.services.relatorios import gerar_relatorio_mensal


def _criar_servico(cliente, costureira, data_envio, valor, quantidade=1):
    return Servico.objects.create(
        cliente=cliente,
        costureira=costureira,
        quantidade=quantidade,
        complexidade=1,
        data_envio=data_envio,
        prazo_entrega="10 dias",
        valor=valor,
    )


class TestGerarRelatorioMensal(TestCase):
    """Testa só a lógica de agregação, sem passar pela view."""

    def setUp(self):
        self.cliente = Cliente.objects.create(nome="Cliente Teste")
        self.costureira_a = Costureira.objects.create(nome="Costureira A")
        self.costureira_b = Costureira.objects.create(nome="Costureira B")

        # Dois serviços em julho/2026 (dentro do período)
        self.servico_julho_1 = _criar_servico(
            self.cliente, self.costureira_a, "2026-07-05", valor=100, quantidade=2
        )
        self.servico_julho_2 = _criar_servico(
            self.cliente, self.costureira_b, "2026-07-20", valor=250, quantidade=3
        )
        # Um serviço em junho/2026 (fora do período) - não deve entrar na soma
        self.servico_junho = _criar_servico(
            self.cliente, self.costureira_a, "2026-06-15", valor=999, quantidade=9
        )

        # Pagamentos: um atrasado e um pendente dentro de julho
        Pagamento.objects.create(
            servico=self.servico_julho_1,
            valor=100,
            data_entrega="2026-07-10",
            status="atrasado",
        )
        Pagamento.objects.create(
            servico=self.servico_julho_2,
            valor=250,
            data_entrega="2026-07-25",
            status="pendente",
        )
        # Pagamento pago não deve contar como atraso nem como aberto
        Pagamento.objects.create(
            servico=self.servico_julho_1,
            valor=50,
            data_entrega="2026-07-12",
            data_pagamento="2026-07-11",
            status="pago",
        )
        # Pagamento do serviço de junho não deve entrar no relatório de julho
        Pagamento.objects.create(
            servico=self.servico_junho,
            valor=999,
            data_entrega="2026-06-20",
            status="atrasado",
        )

    def test_agrega_producao_apenas_do_periodo_informado(self):
        relatorio = gerar_relatorio_mensal("2026-07")

        self.assertEqual(relatorio.periodo, "2026-07")
        self.assertIsNone(relatorio.costureira)
        self.assertEqual(relatorio.producao_total, 350)  # 100 + 250, sem o serviço de junho
        self.assertEqual(relatorio.pecas_produzidas, 5)  # 2 + 3

    def test_detalha_producao_por_costureira(self):
        relatorio = gerar_relatorio_mensal("2026-07")

        detalhamento = {
            linha["costureira_nome"]: linha for linha in relatorio.detalhamento_por_costureira
        }
        self.assertEqual(set(detalhamento.keys()), {"Costureira A", "Costureira B"})

        linha_a = detalhamento["Costureira A"]
        self.assertEqual(linha_a["producao_total"], "100.00")
        self.assertEqual(linha_a["pecas_produzidas"], 2)
        self.assertEqual(linha_a["servicos_atraso"], 1)
        self.assertEqual(linha_a["servicos_aberto"], 0)

        linha_b = detalhamento["Costureira B"]
        self.assertEqual(linha_b["producao_total"], "250.00")
        self.assertEqual(linha_b["pecas_produzidas"], 3)
        self.assertEqual(linha_b["servicos_atraso"], 0)
        self.assertEqual(linha_b["servicos_aberto"], 1)

    def test_costureira_sem_servico_no_periodo_nao_aparece_no_detalhamento(self):
        relatorio = gerar_relatorio_mensal("2025-01")
        self.assertEqual(relatorio.detalhamento_por_costureira, [])

    def test_conta_atrasos_e_abertos_pelo_status_do_pagamento(self):
        relatorio = gerar_relatorio_mensal("2026-07")

        self.assertEqual(relatorio.servicos_atraso, 1)
        self.assertEqual(relatorio.servicos_aberto, 1)

    def test_mes_sem_servicos_gera_relatorio_zerado(self):
        relatorio = gerar_relatorio_mensal("2025-01")

        self.assertEqual(relatorio.producao_total, 0)
        self.assertEqual(relatorio.pecas_produzidas, 0)
        self.assertEqual(relatorio.servicos_atraso, 0)
        self.assertEqual(relatorio.servicos_aberto, 0)

    def test_gerar_de_novo_no_mesmo_periodo_atualiza_em_vez_de_duplicar(self):
        gerar_relatorio_mensal("2026-07")
        _criar_servico(self.cliente, self.costureira_a, "2026-07-28", valor=50, quantidade=1)

        gerar_relatorio_mensal("2026-07")

        self.assertEqual(Relatorio.objects.filter(periodo="2026-07").count(), 1)
        relatorio = Relatorio.objects.get(periodo="2026-07")
        self.assertEqual(relatorio.producao_total, 400)  # 350 + 50


class TestEndpointRelatorioMensal(TestCase):
    """Testa o fluxo completo: banco -> service -> view -> resposta HTTP."""

    def setUp(self):
        self.client = APIClient()
        self.cliente = Cliente.objects.create(nome="Cliente Teste")
        self.costureira = Costureira.objects.create(nome="Costureira Teste")
        _criar_servico(self.cliente, self.costureira, "2026-07-05", valor=180, quantidade=4)

    def test_gerar_relatorio_mensal_via_post(self):
        response = self.client.post(
            '/api/core/relatorios/mensal/gerar/', {"periodo": "2026-07"}
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["periodo"], "2026-07")
        self.assertEqual(response.data["producao_total"], "180.00")
        self.assertEqual(response.data["pecas_produzidas"], 4)

    def test_gerar_relatorio_sem_periodo_retorna_erro(self):
        response = self.client.post('/api/core/relatorios/mensal/gerar/', {})
        self.assertEqual(response.status_code, 400)

    def test_gerar_relatorio_com_periodo_invalido_retorna_erro(self):
        response = self.client.post(
            '/api/core/relatorios/mensal/gerar/', {"periodo": "julho de 2026"}
        )
        self.assertEqual(response.status_code, 400)

    def test_listar_relatorios_mensais(self):
        self.client.post('/api/core/relatorios/mensal/gerar/', {"periodo": "2026-07"})

        response = self.client.get('/api/core/relatorios/mensal/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["periodo"], "2026-07")
