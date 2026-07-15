"""
Testes do cálculo de percentual de carga.

Como rodar:
    python manage.py test apps.core.tests.test_percentual
"""

from django.test import SimpleTestCase

from apps.core.services.percentual import calcular_percentual_carga


class TestCalcularPercentualCarga(SimpleTestCase):

    def test_exemplo_do_time_mensal(self):
        # cortina 2 + blackout 3 + almofada 1 + blackout 3 = 9 dias
        # 9 / 30 dias (mês) = 30%
        self.assertEqual(calcular_percentual_carga(9, 30), 30.0)

    def test_mesmo_exemplo_semanal(self):
        # 9 dias de carga numa semana de 5 dias = sobrecarga (mais de 100%)
        self.assertEqual(calcular_percentual_carga(9, 5), 180.0)

    def test_carga_zero_da_zero_por_cento(self):
        self.assertEqual(calcular_percentual_carga(0, 30), 0.0)

    def test_carga_igual_a_capacidade_da_100_por_cento(self):
        self.assertEqual(calcular_percentual_carga(5, 5), 100.0)

    def test_capacidade_zero_ou_negativa_gera_erro(self):
        with self.assertRaises(ValueError):
            calcular_percentual_carga(9, 0)
        with self.assertRaises(ValueError):
            calcular_percentual_carga(9, -5)
