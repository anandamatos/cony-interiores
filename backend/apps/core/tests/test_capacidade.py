"""
Testes do cálculo de carga (TASK-M1-CORE-011).

Como rodar (na raiz do projeto Django, onde fica o manage.py):
    python manage.py test apps.core.tests.test_capacidade
"""

from django.test import SimpleTestCase

from apps.core.services.capacidade import (
    Peca,
    calcular_carga_pedido,
    calcular_dias_livres,
    costureira_comporta_pedido,
)
from apps.core.services.complexidade import Tamanho, TipoProduto


class TestCalculoCargaPedido(SimpleTestCase):

    def test_pedido_com_uma_peca(self):
        pecas = [Peca(tipo_produto=TipoProduto.ALMOFADA, tamanho=Tamanho.PEQUENA)]
        self.assertEqual(calcular_carga_pedido(pecas), 1)

    def test_pedido_com_varias_pecas_iguais(self):
        pecas = [Peca(tipo_produto=TipoProduto.BLACKOUT, tamanho=Tamanho.GRANDE)] * 3
        self.assertEqual(calcular_carga_pedido(pecas), 15)

    def test_pedido_com_pecas_de_tamanhos_diferentes(self):
        pecas = [
            Peca(tipo_produto=TipoProduto.ILHO, tamanho=Tamanho.PEQUENA),
            Peca(tipo_produto=TipoProduto.ILHO, tamanho=Tamanho.ESPECIAL),
        ]
        self.assertEqual(calcular_carga_pedido(pecas), 6)

    def test_pedido_vazio_tem_carga_zero(self):
        self.assertEqual(calcular_carga_pedido([]), 0)


class TestDisponibilidade(SimpleTestCase):

    def test_dias_livres_com_disponibilidade_total(self):
        self.assertEqual(calcular_dias_livres(5, 100), 5)

    def test_dias_livres_com_disponibilidade_parcial(self):
        self.assertEqual(calcular_dias_livres(5, 60), 3.0)

    def test_dias_livres_com_disponibilidade_zero(self):
        self.assertEqual(calcular_dias_livres(5, 0), 0)

    def test_percentual_fora_do_intervalo_gera_erro(self):
        with self.assertRaises(ValueError):
            calcular_dias_livres(5, 150)
        with self.assertRaises(ValueError):
            calcular_dias_livres(5, -10)


class TestCostureiraComportaPedido(SimpleTestCase):

    def test_costureira_com_folga_suficiente(self):
        self.assertTrue(costureira_comporta_pedido(5, 100, 3))

    def test_costureira_sem_folga_suficiente(self):
        self.assertFalse(costureira_comporta_pedido(5, 60, 15))

    def test_limite_exato_comporta(self):
        self.assertTrue(costureira_comporta_pedido(5, 100, 5))
