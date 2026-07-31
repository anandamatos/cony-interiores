"""
Testes do model PeriodoIndisponibilidade (C11).

Cobre:
- criação e representação básica
- esta_ativo_em() (checagem pontual de uma data)
- costureira_indisponivel() (checagem usada pelo motor de cálculo)
- constraint que impede data_fim anterior a data_inicio

Como rodar (na raiz do projeto):
    python manage.py test apps.core.tests.test_periodo_indisponibilidade
"""

from datetime import date, timedelta

from django.db import IntegrityError, transaction
from django.test import TestCase

from users.models import Costureira, PeriodoIndisponibilidade


class TestPeriodoIndisponibilidade(TestCase):
    def setUp(self):
        self.costureira = Costureira.objects.create(
            nome="Ana",
            ativo=True,
            capacidade_base_semanal=5,
            disponibilidade_percentual=100,
        )

    def _criar_periodo(self, tipo=PeriodoIndisponibilidade.Tipo.FERIAS, dias_inicio=0, dias_fim=5):
        hoje = date.today()
        return PeriodoIndisponibilidade.objects.create(
            costureira=self.costureira,
            tipo=tipo,
            data_inicio=hoje + timedelta(days=dias_inicio),
            data_fim=hoje + timedelta(days=dias_fim),
        )

    def test_cria_periodo_corretamente(self):
        periodo = self._criar_periodo()
        self.assertEqual(periodo.costureira, self.costureira)
        self.assertEqual(periodo.tipo, PeriodoIndisponibilidade.Tipo.FERIAS)

    def test_str_traz_costureira_tipo_e_datas(self):
        periodo = self._criar_periodo()
        texto = str(periodo)
        self.assertIn(self.costureira.nome, texto)
        self.assertIn(periodo.get_tipo_display(), texto)

    def test_esta_ativo_em_dentro_do_periodo(self):
        periodo = self._criar_periodo(dias_inicio=-2, dias_fim=2)
        self.assertTrue(periodo.esta_ativo_em(date.today()))

    def test_esta_ativo_em_fora_do_periodo(self):
        periodo = self._criar_periodo(dias_inicio=10, dias_fim=15)
        self.assertFalse(periodo.esta_ativo_em(date.today()))

    def test_costureira_indisponivel_true_quando_ha_periodo_ativo(self):
        self._criar_periodo(dias_inicio=-1, dias_fim=1)
        self.assertTrue(
            PeriodoIndisponibilidade.costureira_indisponivel(self.costureira, date.today())
        )

    def test_costureira_indisponivel_false_sem_periodo_ativo(self):
        self._criar_periodo(dias_inicio=10, dias_fim=15)  # período futuro, não afeta hoje
        self.assertFalse(
            PeriodoIndisponibilidade.costureira_indisponivel(self.costureira, date.today())
        )

    def test_costureira_indisponivel_false_sem_nenhum_periodo_cadastrado(self):
        self.assertFalse(
            PeriodoIndisponibilidade.costureira_indisponivel(self.costureira, date.today())
        )

    def test_indisponibilidade_de_uma_costureira_nao_afeta_outra(self):
        outra_costureira = Costureira.objects.create(
            nome="Bia",
            ativo=True,
            capacidade_base_semanal=5,
            disponibilidade_percentual=100,
        )
        self._criar_periodo(dias_inicio=-1, dias_fim=1)  # período é da self.costureira

        self.assertTrue(
            PeriodoIndisponibilidade.costureira_indisponivel(self.costureira, date.today())
        )
        self.assertFalse(
            PeriodoIndisponibilidade.costureira_indisponivel(outra_costureira, date.today())
        )

    def test_constraint_impede_data_fim_anterior_a_data_inicio(self):
        hoje = date.today()
        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                PeriodoIndisponibilidade.objects.create(
                    costureira=self.costureira,
                    tipo=PeriodoIndisponibilidade.Tipo.FERIAS,
                    data_inicio=hoje,
                    data_fim=hoje - timedelta(days=1),
                )

    def test_periodo_com_data_inicio_igual_data_fim_e_valido(self):
        hoje = date.today()
        periodo = PeriodoIndisponibilidade.objects.create(
            costureira=self.costureira,
            tipo=PeriodoIndisponibilidade.Tipo.OUTRO,
            data_inicio=hoje,
            data_fim=hoje,
        )
        self.assertTrue(periodo.esta_ativo_em(hoje))
