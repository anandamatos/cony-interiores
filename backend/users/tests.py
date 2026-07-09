from datetime import date
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Cliente, Produto, Costureira, Servico


class ServicoTests(APITestCase):
   
    def setUp(self):
        self.cliente = Cliente.objects.create(
            nome="Joana",
            telefone=31999999999,
            email ="joana@email.com",
            endereco="Rua A",
            observacoes="Cliente frequente."
        )
        self.produto = Produto.objects.create(
            nome="cortina blackout2",
            descricao="Cortina com tecido blackout",
            ativo=True
        )
        self.costureira = Costureira.objects.create(
            nome="Fernanda Lima",
            contato="31999991111",
            observacoes="Especialista em cortinas blackout.",
            ativo=True,
            tipo_servico_preferido="Cortinas Blackout"
        )
        self.servico = Servico.objects.create(
            cliente=self.cliente,
            produto=self.produto,
            costureira=self.costureira,
            quantidade=2,
            complexidade=2,
     
            data_envio=date(2026, 7, 1),
            prazo_entrega=date(2026, 7, 8),
            valor=350.00,
            observacoes="Ajuste no tamanho."
        )
             
    def test_listar_servicos(self):
        response = self.client.get("/api/servico/")
       
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


    def test_criar_servico(self):


        dados = {
            "cliente": self.cliente.id,
            "produto": self.produto.id,
            "costureira": self.costureira.id,
            "quantidade": 3,
            "complexidade": 4,
            "data_envio": "2026-07-10",
            "prazo_entrega": "2026-07-20",
            "valor": "650.00",
            "observacoes": "Confecção de cortina sob medida."
        }


        response = self.client.post("/api/servico/", dados, format="json")


        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Servico.objects.count(), 2)


    def test_listar_servicos_por_cliente(self):
        cliente2 = Cliente.objects.create(
            nome="Maria",
            telefone=31988888888,
            email="maria@email.com",
            endereco="Rua B",
            observacoes=""
        )


        Servico.objects.create(
            cliente=cliente2,
            produto=self.produto,
            costureira=self.costureira,
            quantidade=1,
            complexidade=3,
            data_envio=date(2026, 7, 5),
            prazo_entrega=date(2026, 7, 12),
            valor=200.00,
            observacoes="Outro serviço."
        )


        response = self.client.get(
            f"/api/servico/?cliente={self.cliente.id}"
        )


        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["cliente"], self.cliente.id)


    def test_listar_servicos_por_produto(self):
        produto2 = Produto.objects.create(
            nome="cortina blackout marrom",
            descricao="Cortina com tecido blackout marrom",
            ativo=True
        )


        Servico.objects.create(
            cliente=self.cliente,
            produto=produto2,
            costureira=self.costureira,
            quantidade=1,
            complexidade=3,
            data_envio=date(2026, 7, 5),
            prazo_entrega=date(2026, 7, 12),
            valor=200.00,
            observacoes="Outro serviço."
           
        )


        response = self.client.get(
            f"/api/servico/?produto={self.produto.id}"
        )


        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["produto"], self.produto.id)


    def test_listar_servicos_por_costureira(self):
        costureira2 = Costureira.objects.create(
            nome="Luiza Ferreira",
            contato="31999995555",
            observacoes="Especialista em cortinas cinzas.",
            ativo=True,
            tipo_servico_preferido="Cortinas cinzas"
        )


        Servico.objects.create(
            cliente=self.cliente,
            produto=self.produto,
            costureira=costureira2,
            quantidade=1,
            complexidade=3,
            data_envio=date(2026, 7, 5),
            prazo_entrega=date(2026, 7, 12),
            valor=200.00,
            observacoes="Outro serviço."
           
        )


        response = self.client.get(
            f"/api/servico/?costureira={self.costureira.id}"
        )


        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["costureira"], self.costureira.id)


    def test_listar_servicos_por_complexidade(self):
        Servico.objects.create(
            cliente=self.cliente,
            produto=self.produto,
            costureira=self.costureira,
            quantidade=2,
            complexidade=5,
            data_envio=date(2026, 7, 1),
            prazo_entrega=date(2026, 7, 8),
            valor=350.00,
            observacoes="Ajuste no tamanho."
        )


        response = self.client.get(
            f"/api/servico/?complexidade={self.servico.complexidade}"
        )


        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["complexidade"], self.servico.complexidade)

   
    def test_listar_servicos_por_data_envio(self):
            Servico.objects.create(
                cliente=self.cliente,
                produto=self.produto,
                costureira=self.costureira,
                quantidade=2,
                complexidade=5,
                data_envio=date(2026, 8, 2),
                prazo_entrega=date(2026, 7, 8),
                valor=350.00,
                observacoes="Ajuste no tamanho."
            )


            response = self.client.get(
            f"/api/servico/?data_envio={self.servico.data_envio}"
        )


            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data), 1)
            self.assertEqual(response.data[0]["data_envio"], self.servico.data_envio.isoformat())


    def test_listar_servicos_por_prazo_entrega(self):
            Servico.objects.create(
                cliente=self.cliente,
                produto=self.produto,
                costureira=self.costureira,
                quantidade=2,
                complexidade=5,
                data_envio=date(2026, 8, 2),
                prazo_entrega=date(2026, 9, 5),
                valor=350.00,
                observacoes="Ajuste no tamanho."
            )


            response = self.client.get(
            f"/api/servico/?prazo_entrega={self.servico.prazo_entrega}"
        )


            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data), 1)
            self.assertEqual(response.data[0]["prazo_entrega"], self.servico.prazo_entrega.isoformat())


    def test_busca_servicos_por_observacoes(self):
        Servico.objects.create(
            cliente=self.cliente,
            produto=self.produto,
            costureira=self.costureira,
            quantidade=1,
            complexidade=3,
            data_envio=date(2026, 7, 5),
            prazo_entrega=date(2026, 7, 12),
            valor=200.00,
            observacoes="Instalação de cortina na sala."        
        )


        response = self.client.get(
            f"/api/servico/?search=tamanho"
        )


        print(response.data)


        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["observacoes"], self.servico.observacoes)


    def test_ordenar_servicos_por_valor_crescente(self):
        Servico.objects.create(
            cliente=self.cliente,
            produto=self.produto,
            costureira=self.costureira,
            quantidade=1,
            complexidade=3,
            data_envio=date(2026, 7, 5),
            prazo_entrega=date(2026, 7, 12),
            valor=200.00,
            observacoes="Outro serviço."
        )


        response = self.client.get("/api/servico/?ordering=valor")


        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["valor"], "200.00")
        self.assertEqual(response.data[1]["valor"], "350.00")


    def test_ordenar_servicos_por_valor_decrescente(self):
        Servico.objects.create(
            cliente=self.cliente,
            produto=self.produto,
            costureira=self.costureira,
            quantidade=1,
            complexidade=3,
            data_envio=date(2026, 7, 5),
            prazo_entrega=date(2026, 7, 12),
            valor=200.00,
            observacoes="Outro serviço."
        )


        response = self.client.get("/api/servico/?ordering=-valor")


        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["valor"], "350.00")
        self.assertEqual(response.data[1]["valor"], "200.00")


    def test_buscar_servico_por_id(self):
        response = self.client.get(f"/api/servico/{self.servico.id}/")
       
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], self.servico.id)


    def test_atualizar_servico(self):
        response = self.client.patch(
            f"/api/servico/{self.servico.id}/",
            {"valor": "999.00"},
            format="json"
        )


        self.assertEqual(response.status_code, status.HTTP_200_OK)


        self.servico.refresh_from_db() #atualiza o objeto do banco
        self.assertEqual(str(self.servico.valor), "999.00")


    def test_deletar_servico(self):
        response = self.client.delete(
            f"/api/servico/{self.servico.id}/"
        )


        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Servico.objects.count(), 0)
