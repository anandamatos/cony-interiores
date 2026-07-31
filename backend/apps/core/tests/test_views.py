"""
Testes de integração do endpoint de consulta de carga (TASK-M1-CORE-013).

Diferente de test_capacidade.py e test_complexidade.py (que testam só a
lógica pura, sem banco), estes aqui testam o fluxo completo:
banco de dados -> bridge.py -> view -> resposta HTTP.

Usam TestCase (não SimpleTestCase) porque mexem no banco. O Django cria
um banco temporário só pra rodar esses testes e apaga tudo depois -
não polui o banco real que você usa no `runserver`.

Como rodar (na raiz do projeto, onde fica o manage.py):
    python manage.py test apps.core.tests.test_views
"""

from django.test import TestCase
from rest_framework.test import APIClient

from users.models import Costureira, Cliente, Produto, Servico


class TestEndpointListarCargas(TestCase):

    def setUp(self):
        self.client = APIClient()

        # Costureira sem nenhum serviço ainda -> carga deve ser 0
        self.costureira_livre = Costureira.objects.create(
            nome="Maria Teste",
            tipo_servico_preferido="Blackout",
            ativo=True,
            capacidade_base_semanal=5,
            disponibilidade_percentual=80,
        )

        # Costureira com um serviço -> carga deve ser > 0
        self.costureira_ocupada = Costureira.objects.create(
            nome="Joana Teste",
            tipo_servico_preferido="Ilhó",
            ativo=True,
            capacidade_base_semanal=5,
            disponibilidade_percentual=100,
        )
        self.cliente = Cliente.objects.create(nome="Cliente Teste")
        self.produto = Produto.objects.create(
            nome="Cortina Blackout",
            valor_base=100,
            tipo_produto="BLACKOUT",
        )
        self.servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira_ocupada,
            quantidade=2,
            tamanho="G",
            data_envio="2026-07-01",
            prazo_entrega="15 dias",
            valor=300,
        )
        self.servico.produto.add(self.produto)

        # Costureira inativa -> NÃO deve aparecer na listagem
        Costureira.objects.create(
            nome="Inativa Teste",
            ativo=False,
            capacidade_base_semanal=5,
            disponibilidade_percentual=100,
        )

    def test_retorna_200(self):
        response = self.client.get('/api/core/costureiras/carga/')
        self.assertEqual(response.status_code, 200)

    def test_retorna_apenas_costureiras_ativas(self):
        response = self.client.get('/api/core/costureiras/carga/')
        nomes = [item['nome'] for item in response.data]
        self.assertIn("Maria Teste", nomes)
        self.assertIn("Joana Teste", nomes)
        self.assertNotIn("Inativa Teste", nomes)

    def test_costureira_sem_servico_tem_carga_zero(self):
        response = self.client.get('/api/core/costureiras/carga/')
        item = next(i for i in response.data if i['nome'] == "Maria Teste")
        self.assertEqual(item['carga_atual'], 0)
        self.assertEqual(item['dias_livres'], 4.0)  # 5 * 80%

    def test_costureira_com_servico_tem_carga_maior_que_zero(self):
        response = self.client.get('/api/core/costureiras/carga/')
        item = next(i for i in response.data if i['nome'] == "Joana Teste")
        # 2 peças de blackout tamanho G = 2 x 5 dias = 10
        self.assertEqual(item['carga_atual'], 10)
        self.assertEqual(item['dias_livres'], 5.0)  # 5 * 100%


class TestEndpointConsultarCargaUnica(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.costureira = Costureira.objects.create(
            nome="Ana Teste",
            ativo=True,
            capacidade_base_semanal=5,
            disponibilidade_percentual=100,
        )

    def test_retorna_200_para_costureira_existente(self):
        response = self.client.get(
            f'/api/core/costureiras/{self.costureira.id}/carga/'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['nome'], "Ana Teste")

    def test_retorna_404_para_costureira_inexistente(self):
        response = self.client.get('/api/core/costureiras/99999/carga/')
        self.assertEqual(response.status_code, 404)