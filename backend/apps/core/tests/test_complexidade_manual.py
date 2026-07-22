"""
Testes da lógica de complexidade automática vs manual.

Como rodar (na raiz do projeto):
    python manage.py test apps.core.tests.test_complexidade_manual
"""

from django.test import TestCase

from users.models import Cliente, Costureira, Produto, Servico

from apps.core.services.complexidade_manual import (
    calcular_complexidade_automatica,
    atualizar_complexidade_se_automatica,
)


class TestComplexidadeManual(TestCase):

    def setUp(self):
        self.cliente = Cliente.objects.create(nome="Cliente Teste")
        self.costureira = Costureira.objects.create(nome="Costureira Teste")
        self.produto = Produto.objects.create(
            nome="Cortina Blackout",
            valor_base=100,
            tipo_produto="BLACKOUT",
        )

    def _criar_servico(self, quantidade=2, tamanho="G", complexidade=0, complexidade_manual=False):
        servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=quantidade,
            tamanho=tamanho,
            complexidade=complexidade,
            complexidade_manual=complexidade_manual,
            data_envio="2026-07-01",
            prazo_entrega="10 dias",
            valor=100.00,
        )
        servico.produto.add(self.produto)
        return servico

    def test_modo_automatico_calcula_e_salva(self):
        servico = self._criar_servico()
        mudou = atualizar_complexidade_se_automatica(servico)

        self.assertTrue(mudou)
        # 2 peças de blackout tamanho G = 2 x 5 dias = 10
        self.assertEqual(servico.complexidade, 10)

    def test_modo_manual_nao_sobrescreve(self):
        servico = self._criar_servico(complexidade=99, complexidade_manual=True)
        mudou = atualizar_complexidade_se_automatica(servico)

        self.assertFalse(mudou)
        self.assertEqual(servico.complexidade, 99)  # continua o valor da gestora

    def test_nao_salva_de_novo_se_valor_ja_esta_correto(self):
        servico = self._criar_servico(complexidade=10)  # já é o valor "certo"
        mudou = atualizar_complexidade_se_automatica(servico)

        self.assertFalse(mudou)  # não precisou mexer

    def test_calcular_complexidade_automatica_direto(self):
        servico = self._criar_servico()
        valor = calcular_complexidade_automatica(servico)
        self.assertEqual(valor, 10)

    def test_volta_a_recalcular_se_manual_for_desmarcado(self):
        # Gestora tinha travado em 99, mas decide voltar pro automático
        servico = self._criar_servico(complexidade=99, complexidade_manual=True)
        servico.complexidade_manual = False
        servico.save()

        mudou = atualizar_complexidade_se_automatica(servico)
        self.assertTrue(mudou)
        self.assertEqual(servico.complexidade, 10)
