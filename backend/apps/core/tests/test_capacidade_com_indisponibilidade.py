"""
Testes do ajuste no CORE-002: consultar_capacidade_costureira deve
zerar dias_livres quando a costureira está em um período de
indisponibilidade ativo hoje, e continuar calculando normalmente
quando não está.

Como rodar (na raiz do projeto):
    python manage.py test apps.core.tests.test_capacidade_com_indisponibilidade
"""

from datetime import date, timedelta

from django.test import TestCase

from apps.core.services.bridge import consultar_capacidade_costureira
from apps.core.services.capacidade import calcular_dias_livres
from users.models import Costureira, PeriodoIndisponibilidade


class TestCapacidadeComIndisponibilidade(TestCase):
    def setUp(self):
        self.costureira = Costureira.objects.create(
            nome="Maria",
            ativo=True,
            capacidade_base_semanal=5,
            disponibilidade_percentual=80,
        )

    def test_dias_livres_normal_sem_periodo_cadastrado(self):
        dados = consultar_capacidade_costureira(self.costureira)
        esperado = calcular_dias_livres(
            self.costureira.capacidade_base_semanal,
            self.costureira.disponibilidade_percentual,
        )
        self.assertEqual(dados["dias_livres"], esperado)

    def test_dias_livres_zerado_quando_periodo_ativo_hoje(self):
        hoje = date.today()
        PeriodoIndisponibilidade.objects.create(
            costureira=self.costureira,
            tipo=PeriodoIndisponibilidade.Tipo.FERIAS,
            data_inicio=hoje - timedelta(days=1),
            data_fim=hoje + timedelta(days=5),
        )

        dados = consultar_capacidade_costureira(self.costureira)

        self.assertEqual(dados["dias_livres"], 0)

    def test_dias_livres_normal_quando_periodo_e_futuro(self):
        hoje = date.today()
        PeriodoIndisponibilidade.objects.create(
            costureira=self.costureira,
            tipo=PeriodoIndisponibilidade.Tipo.FERIAS,
            data_inicio=hoje + timedelta(days=10),
            data_fim=hoje + timedelta(days=15),
        )

        dados = consultar_capacidade_costureira(self.costureira)
        esperado = calcular_dias_livres(
            self.costureira.capacidade_base_semanal,
            self.costureira.disponibilidade_percentual,
        )
        self.assertEqual(dados["dias_livres"], esperado)

    def test_dias_livres_normal_quando_periodo_ja_passou(self):
        hoje = date.today()
        PeriodoIndisponibilidade.objects.create(
            costureira=self.costureira,
            tipo=PeriodoIndisponibilidade.Tipo.LICENCA,
            data_inicio=hoje - timedelta(days=20),
            data_fim=hoje - timedelta(days=10),
        )

        dados = consultar_capacidade_costureira(self.costureira)
        esperado = calcular_dias_livres(
            self.costureira.capacidade_base_semanal,
            self.costureira.disponibilidade_percentual,
        )
        self.assertEqual(dados["dias_livres"], esperado)

    def test_indisponibilidade_de_uma_costureira_nao_afeta_outra(self):
        outra = Costureira.objects.create(
            nome="Joana",
            ativo=True,
            capacidade_base_semanal=3,
            disponibilidade_percentual=100,
        )
        hoje = date.today()
        PeriodoIndisponibilidade.objects.create(
            costureira=self.costureira,
            tipo=PeriodoIndisponibilidade.Tipo.FERIAS,
            data_inicio=hoje,
            data_fim=hoje + timedelta(days=3),
        )

        dados_maria = consultar_capacidade_costureira(self.costureira)
        dados_joana = consultar_capacidade_costureira(outra)

        self.assertEqual(dados_maria["dias_livres"], 0)
        self.assertEqual(
            dados_joana["dias_livres"],
            calcular_dias_livres(
                outra.capacidade_base_semanal, outra.disponibilidade_percentual
            ),
        )

    def test_carga_atual_nao_e_afetada_pela_indisponibilidade(self):
        """
        A indisponibilidade zera os DIAS LIVRES (capacidade futura), mas
        não deve mexer na carga já registrada da costureira.
        """
        hoje = date.today()
        PeriodoIndisponibilidade.objects.create(
            costureira=self.costureira,
            tipo=PeriodoIndisponibilidade.Tipo.AFASTAMENTO_MEDICO,
            data_inicio=hoje,
            data_fim=hoje + timedelta(days=2),
        )

        dados = consultar_capacidade_costureira(self.costureira)

        self.assertEqual(dados["carga_atual"], 0)  # sem serviços cadastrados no setUp
