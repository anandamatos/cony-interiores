"""
Teste de integração da TASK-M1-CORE-014 (endpoint de sugestão de alocação).

Como rodar:
    python manage.py test apps.core.tests.test_sugestao
"""

from django.test import TestCase
from rest_framework.test import APIClient

from users.models import Costureira, Cliente, Produto, Servico


class TestEndpointSugestaoAlocacao(TestCase):

    def setUp(self):
        self.client = APIClient()

        # Costureira com bastante folga -> deve ser a sugerida
        self.costureira_livre = Costureira.objects.create(
            nome="Ana Livre",
            ativo=True,
            capacidade_base_semanal=5,
            disponibilidade_percentual=100,  # 5 dias livres
        )

        # Costureira quase sem folga -> não deve ser sugerida pra pedido grande
        self.costureira_ocupada = Costureira.objects.create(
            nome="Bia Ocupada",
            ativo=True,
            capacidade_base_semanal=5,
            disponibilidade_percentual=20,  # 1 dia livre
        )

        self.cliente = Cliente.objects.create(nome="Cliente Teste")
        self.produto = Produto.objects.create(
            nome="Cortina Ilhó",
            valor_base=100,
            tipo_produto="ILHO",
        )

        # Pedido novo, ainda sem costureira "confirmada" de verdade
        # (aqui atribuímos a própria costureira_livre só pra o model aceitar
        # salvar, já que `costureira` é obrigatório no model atual;
        # a sugestão é sobre QUEM DEVERIA pegar, não sobre o campo salvo)
        self.servico_novo = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira_livre,
            quantidade=1,
            tamanho="P",  # ilhó pequena = 1 dia de complexidade
            data_envio="2026-07-01",
            prazo_entrega="10 dias",
            valor=100,
        )
        self.servico_novo.produto.add(self.produto)

    def test_retorna_200_e_sugere_a_costureira_com_mais_folga(self):
        response = self.client.get(
            f'/api/core/servicos/{self.servico_novo.id}/sugestao-costureira/'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['nome'], "Ana Livre")

    def test_retorna_404_para_servico_inexistente(self):
        response = self.client.get(
            '/api/core/servicos/99999/sugestao-costureira/'
        )
        self.assertEqual(response.status_code, 404)
