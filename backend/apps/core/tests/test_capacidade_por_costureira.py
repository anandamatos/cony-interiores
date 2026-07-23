"""
Testes que comprovam: cada costureira tem capacidade PRÓPRIA e
INDEPENDENTE (capacidade_base_semanal e disponibilidade_percentual).

Isso responde a uma pergunta da gestora: "dá pra mudar a capacidade
de uma costureira sem afetar as outras?" - a resposta é SIM, e estes
testes provam isso na prática.

Como rodar (na raiz do projeto):
    python manage.py test apps.core.tests.test_capacidade_por_costureira
"""

from django.test import TestCase

from users.models import Costureira
from apps.core.services.bridge import consultar_capacidade_costureira
from apps.core.services.capacidade import calcular_dias_livres


class TestCapacidadeIndependentePorCostureira(TestCase):

    def setUp(self):
        # Duas costureiras, de propósito com capacidades BEM diferentes
        self.maria = Costureira.objects.create(
            nome="Maria",
            ativo=True,
            capacidade_base_semanal=5,
            disponibilidade_percentual=80,
        )
        self.joana = Costureira.objects.create(
            nome="Joana",
            ativo=True,
            capacidade_base_semanal=3,
            disponibilidade_percentual=100,
        )

    def test_cada_costureira_mantem_sua_propria_capacidade(self):
        """
        Prova que os valores configurados em uma costureira não vazam
        nem se misturam com os de outra.
        """
        self.assertEqual(self.maria.capacidade_base_semanal, 5)
        self.assertEqual(self.maria.disponibilidade_percentual, 80)

        self.assertEqual(self.joana.capacidade_base_semanal, 3)
        self.assertEqual(self.joana.disponibilidade_percentual, 100)

    def test_dias_livres_calculados_de_forma_independente(self):
        """
        Prova que o cálculo de dias livres de cada uma usa APENAS os
        próprios dados dela, dando resultados diferentes quando as
        configurações são diferentes.
        """
        dias_livres_maria = calcular_dias_livres(
            self.maria.capacidade_base_semanal, self.maria.disponibilidade_percentual
        )
        dias_livres_joana = calcular_dias_livres(
            self.joana.capacidade_base_semanal, self.joana.disponibilidade_percentual
        )

        self.assertEqual(dias_livres_maria, 4.0)   # 5 x 80%
        self.assertEqual(dias_livres_joana, 3.0)   # 3 x 100%
        self.assertNotEqual(dias_livres_maria, dias_livres_joana)

    def test_mudar_capacidade_de_uma_nao_afeta_a_outra(self):
        """
        Este é o teste mais direto pra pergunta da gestora: se eu mudar
        a capacidade da Maria, a Joana continua exatamente igual?
        """
        # Antes da mudança, guarda os dados da Joana pra comparar depois
        capacidade_joana_antes = self.joana.capacidade_base_semanal
        disponibilidade_joana_antes = self.joana.disponibilidade_percentual

        # Gestora muda SÓ a Maria (ela avisou que vai trabalhar menos esse mês)
        self.maria.capacidade_base_semanal = 2
        self.maria.disponibilidade_percentual = 50
        self.maria.save()

        # Recarrega a Joana do banco, pra garantir que estamos vendo o dado real
        self.joana.refresh_from_db()

        # A Joana continua EXATAMENTE como estava
        self.assertEqual(self.joana.capacidade_base_semanal, capacidade_joana_antes)
        self.assertEqual(self.joana.disponibilidade_percentual, disponibilidade_joana_antes)

        # E a Maria reflete a mudança
        self.assertEqual(self.maria.capacidade_base_semanal, 2)
        self.assertEqual(self.maria.disponibilidade_percentual, 50)

    def test_endpoint_de_consulta_respeita_capacidade_individual(self):
        """
        Prova isso também no nível do endpoint completo (não só nos
        campos do banco), simulando o que a gestora veria na tela.
        """
        dados_maria = consultar_capacidade_costureira(self.maria)
        dados_joana = consultar_capacidade_costureira(self.joana)

        self.assertEqual(dados_maria["capacidade_base_semanal"], 5)
        self.assertEqual(dados_joana["capacidade_base_semanal"], 3)
        self.assertNotEqual(
            dados_maria["dias_livres"], dados_joana["dias_livres"]
        )
