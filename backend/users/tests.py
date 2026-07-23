from django.test import TestCase
from rest_framework.test import APIClient
from django.db.utils import IntegrityError
from .models import Costureira, Servico, Cliente, Produto
from datetime import date


# ==================== TESTES DA COSTUREIRA ====================

class TestCostureira(TestCase):
    def test_blank_costureira(self):
        Costureira.objects.create(
            nome="Alixw",
            contato="Numero 3198888888",
            observacoes="",
            ativo=False,
            tipo_servico_preferido=""
        )
        costureira = Costureira.objects.get(nome="Alixw")
        self.assertEqual(costureira.observacoes, "")
        
    def test_duplica_costureira(self):
        Costureira.objects.create(
            nome="Alice",
            contato="Numero 3198888888",
            observacoes="ALI",
            ativo=False,
            tipo_servico_preferido="Voltar"
        )
        with self.assertRaises(IntegrityError):
            Costureira.objects.create(
                nome="Alice",
                contato="Numero 318888",
                observacoes="AI",
                ativo=True,
                tipo_servico_preferido="tar"
            )


# ==================== TESTES DO SERVIÇO ====================

class ServicoModelTest(TestCase):
    def setUp(self):
        # Criar dados de teste
        self.cliente = Cliente.objects.create(
            nome="João Silva",
            contato="(71) 99999-9999",
            email="joao@email.com"
        )
        self.costureira = Costureira.objects.create(
            nome="Maria Souza",
            contato="(71) 88888-8888",
            ativo=True
        )
        self.produto = Produto.objects.create(
            nome="Cortina",
            descricao="Cortina de ilhós",
            valor_base=150.00
        )

    def test_create_servico(self):
        """Testa a criação de um serviço"""
        servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=2,
            complexidade=3,
            data_envio="2026-07-01",
            prazo_entrega="2026-07-15",
            valor=300.00,
            observacoes="Urgente"
        )
        servico.produto.add(self.produto)
        self.assertEqual(servico.cliente.nome, "João Silva")
        self.assertEqual(servico.valor, 300.00)
        self.assertEqual(servico.produto.count(), 1)

    def test_servico_str_method(self):
        """Testa o método __str__ do Servico"""
        servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=1,
            data_envio="2026-07-01",
            prazo_entrega="2026-07-15",
            valor=150.00
        )
        self.assertIn("João Silva", str(servico))
        self.assertIn("Maria Souza", str(servico))

    def test_servico_relationship(self):
        """Testa o relacionamento do Servico com outros modelos"""
        servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=1,
            data_envio="2026-07-01",
            prazo_entrega="2026-07-15",
            valor=150.00
        )
        servico.produto.add(self.produto)
        self.assertEqual(self.cliente.servicos.count(), 1)
        self.assertEqual(self.costureira.servicos.count(), 1)
        self.assertEqual(self.produto.servicos.count(), 1)


class ServicoAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.cliente = Cliente.objects.create(
            nome="Cliente Teste",
            contato="(71) 77777-7777"
        )
        self.costureira = Costureira.objects.create(
            nome="Costureira Teste"
        )
        self.produto = Produto.objects.create(
            nome="Cortina", 
            valor_base=150.00
        )

    def test_create_servico_api(self):
        """Testa a criação de um serviço via API"""
        servico_data = {
            "cliente": self.cliente.id,
            "costureira": self.costureira.id,
            "produto": [self.produto.id],
            "quantidade": 2,
            "complexidade": 2,
            "data_envio": "2026-07-01",
            "prazo_entrega": "2026-07-15",
            "valor": 200.00,
            "observacoes": "Teste"
        }
        response = self.client.post(
            '/api/servicos/',
            servico_data,
            format='json'
        )
        self.assertEqual(response.status_code, 201)

    def test_list_servicos_api(self):
        """Testa a listagem de serviços via API"""
        Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=1,
            data_envio="2026-07-01",
            prazo_entrega="2026-07-15",
            valor=100.00
        )
        response = self.client.get('/api/servicos/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_retrieve_servico_api(self):
        """Testa a busca de um serviço via API"""
        servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=1,
            data_envio="2026-07-01",
            prazo_entrega="2026-07-15",
            valor=100.00
        )
        response = self.client.get(f'/api/servicos/{servico.id}/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['id'], servico.id)

    def test_update_servico_api(self):
        """Testa a atualização de um serviço via API"""
        servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=1,
            data_envio="2026-07-01",
            prazo_entrega="2026-07-15",
            valor=100.00
        )
        data = {"valor": 150.00}
        response = self.client.patch(
            f'/api/servicos/{servico.id}/',
            data,
            format='json'
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['valor'], "150.00")

    def test_delete_servico_api(self):
        """Testa a exclusão de um serviço via API"""
        servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=1,
            data_envio="2026-07-01",
            prazo_entrega="2026-07-15",
            valor=100.00
        )
        response = self.client.delete(f'/api/servicos/{servico.id}/')
        self.assertEqual(response.status_code, 204)
        self.assertEqual(Servico.objects.count(), 0)

# ==================== TESTES DA METRICA (novo)====================

class Test_Metrica(TestCase):
    def set_up(self):
        self.cliente = Cliente.objects.create(
            nome="João Silva",
            contato="(71) 99999-9999",
            email="joao@email.com")
        self.costureira = Costureira.objects.create(
            nome="Maria Souza",
            contato="(71) 88888-8888",
            ativo=True)
        self.produto = Produto.objects.create(
            nome="Cortina",
            descricao="Cortina de ilhós",
            valor_base=150.00)
        self.servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=5,
            complexidade=10,
            data_envio="2026-07-07",
            prazo_entrega="2026-07-22",
            valor=700.00,
            observacoes="Urgente")
        self.servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=1,
            complexidade=2,
            data_envio="2026-07-23",
            prazo_entrega="2026-07-15",
            valor=70.00,
            observacoes="Urgente")
        self.servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=2,
            complexidade=3,
            data_envio="2026-07-20",
            prazo_entrega="2026-07-20",
            valor=300.00,
            observacoes="Urgente")
    def Test_otif(self):
        Otif_obj = Servico.objects.all()
        for servico in Otif_obj:
          print(f"{servico.costureia.nome}")
          if self.servico.data_envio >= self.servico.prazo_entrega:
           today = date.today()
           print(f'atrasado, o pedido foi enviado {today-self.servico.prazo_entrega} dias atrasado')
          else:
            print("Pedido ainda está dentro do periodo para entrega.")