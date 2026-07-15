"""
Testes do índice de complexidade (TASK-M1-CORE-012).

Como rodar (na raiz do projeto Django, onde fica o manage.py):
    python manage.py test apps.core.tests.test_complexidade
"""

from django.test import SimpleTestCase

from apps.core.services.complexidade import (
    obter_indice_complexidade,
    Tamanho,
    TipoProduto,
)


class TestIndiceComplexidade(SimpleTestCase):
    """
    Usamos SimpleTestCase (em vez de TestCase) porque esses testes não
    tocam no banco de dados — são só cálculo puro. Isso deixa a suíte
    mais rápida.
    """

    def test_retorna_valor_da_matriz(self):
        resultado = obter_indice_complexidade(TipoProduto.ILHO, Tamanho.PEQUENA)
        self.assertEqual(resultado, 1)

    def test_tamanho_especial_tem_valor_mais_alto_que_pequena(self):
        pequena = obter_indice_complexidade(TipoProduto.BLACKOUT, Tamanho.PEQUENA)
        especial = obter_indice_complexidade(TipoProduto.BLACKOUT, Tamanho.ESPECIAL)
        self.assertGreater(especial, pequena)

    def test_tipo_produto_invalido_gera_erro(self):
        with self.assertRaises(ValueError):
            obter_indice_complexidade("TIPO_QUE_NAO_EXISTE", Tamanho.PEQUENA)

    def test_tamanho_invalido_gera_erro(self):
        with self.assertRaises(ValueError):
            obter_indice_complexidade(TipoProduto.ILHO, "TAMANHO_QUE_NAO_EXISTE")
