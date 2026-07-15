"""
Testes da sugestão de alocação (TASK-M1-CORE-014).

Como rodar (na raiz do projeto, onde fica o manage.py):
    python manage.py test apps.core.tests.test_alocacao
"""

from django.test import SimpleTestCase

from apps.core.services.alocacao import sugerir_costureira


class TestSugerirCostureira(SimpleTestCase):

    def setUp(self):
        self.candidatas = [
            {"nome": "Ana", "capacidade_base_semanal": 5, "disponibilidade_percentual": 100},   # 5 dias livres
            {"nome": "Bia", "capacidade_base_semanal": 5, "disponibilidade_percentual": 40},     # 2 dias livres
            {"nome": "Carla", "capacidade_base_semanal": 5, "disponibilidade_percentual": 60},   # 3 dias livres
        ]

    def test_sugere_quem_tem_mais_dias_livres_entre_as_aptas(self):
        sugestao = sugerir_costureira(self.candidatas, carga_pedido=3)
        self.assertEqual(sugestao["nome"], "Ana")

    def test_retorna_none_se_ninguem_comporta(self):
        sugestao = sugerir_costureira(self.candidatas, carga_pedido=10)
        self.assertIsNone(sugestao)

    def test_retorna_none_para_lista_vazia(self):
        sugestao = sugerir_costureira([], carga_pedido=1)
        self.assertIsNone(sugestao)

    def test_ignora_quem_nao_comporta_mesmo_tendo_folga_relativa(self):
        # Bia tem só 2 dias livres, não comporta um pedido de carga 3
        candidatas = [
            {"nome": "Bia", "capacidade_base_semanal": 5, "disponibilidade_percentual": 40},
        ]
        sugestao = sugerir_costureira(candidatas, carga_pedido=3)
        self.assertIsNone(sugestao)

    def test_funciona_no_limite_exato(self):
        candidatas = [
            {"nome": "Bia", "capacidade_base_semanal": 5, "disponibilidade_percentual": 40},  # 2 dias livres
        ]
        sugestao = sugerir_costureira(candidatas, carga_pedido=2)
        self.assertEqual(sugestao["nome"], "Bia")
