"""
Testes do log de auditoria para ajustes manuais de complexidade.

Cobre:
- registrar_ajuste_manual_complexidade (service, apps/core/services/auditoria.py)
- integração via ServicoViewSet.perform_update (só loga quando complexidade_manual=True)

Como rodar (na raiz do projeto):
    python manage.py test apps.core.tests.test_log_auditoria
"""

from rest_framework.test import APIRequestFactory, force_authenticate
from django.contrib.auth import get_user_model
from django.test import TestCase

from apps.core.services.auditoria import registrar_ajuste_manual_complexidade
from users.models import Cliente, Costureira, LogAuditoria, Produto, Servico
from users.views import ServicoViewSet

Usuario = get_user_model()


class TestRegistrarAjusteManualComplexidade(TestCase):
    """Testa o service isoladamente, sem passar pela view."""

    def setUp(self):
        self.cliente = Cliente.objects.create(nome="Cliente Teste")
        self.costureira = Costureira.objects.create(nome="Costureira Teste")
        self.produto = Produto.objects.create(
            nome="Cortina Blackout", valor_base=100, tipo_produto="BLACKOUT"
        )
        self.usuario = Usuario.objects.create_user(username="gestora", password="senha123")

    def _criar_servico(self, complexidade=10, complexidade_manual=True):
        servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=2,
            tamanho="G",
            complexidade=complexidade,
            complexidade_manual=complexidade_manual,
            data_envio="2026-07-01",
            prazo_entrega="10 dias",
            valor=100.00,
        )
        servico.produto.add(self.produto)
        return servico

    def test_registra_log_quando_valor_muda(self):
        servico = self._criar_servico(complexidade=10)
        servico.complexidade = 15
        servico.save(update_fields=["complexidade"])

        log = registrar_ajuste_manual_complexidade(
            servico=servico,
            usuario=self.usuario,
            valor_anterior=10,
            justificativa="Peça mais elaborada que o normal",
        )

        self.assertIsNotNone(log)
        self.assertEqual(LogAuditoria.objects.count(), 1)
        self.assertEqual(log.valor_anterior, "10")
        self.assertEqual(log.valor_novo, "15")
        self.assertEqual(log.campo_alterado, "complexidade")
        self.assertEqual(log.modelo, "Servico")
        self.assertEqual(log.objeto_id, str(servico.pk))
        self.assertEqual(log.usuario, self.usuario)
        self.assertEqual(log.justificativa, "Peça mais elaborada que o normal")

    def test_nao_registra_log_quando_valor_nao_muda(self):
        servico = self._criar_servico(complexidade=10)

        log = registrar_ajuste_manual_complexidade(
            servico=servico,
            usuario=self.usuario,
            valor_anterior=10,  # igual ao valor atual
        )

        self.assertIsNone(log)
        self.assertEqual(LogAuditoria.objects.count(), 0)

    def test_justificativa_e_opcional(self):
        servico = self._criar_servico(complexidade=8)
        servico.complexidade = 13
        servico.save(update_fields=["complexidade"])

        log = registrar_ajuste_manual_complexidade(
            servico=servico, usuario=self.usuario, valor_anterior=8
        )

        self.assertEqual(log.justificativa, "")

    def test_usuario_pode_ser_none(self):
        """
        Caso o endpoint não exija autenticação (AllowAny), usuario pode
        vir None — o log ainda deve ser criado, só sem rastrear quem fez.
        """
        servico = self._criar_servico(complexidade=5)
        servico.complexidade = 20
        servico.save(update_fields=["complexidade"])

        log = registrar_ajuste_manual_complexidade(
            servico=servico, usuario=None, valor_anterior=5
        )

        self.assertIsNotNone(log)
        self.assertIsNone(log.usuario)

    def test_log_registra_multiplas_alteracoes_em_ordem(self):
        servico = self._criar_servico(complexidade=5)

        servico.complexidade = 8
        servico.save(update_fields=["complexidade"])
        registrar_ajuste_manual_complexidade(servico, self.usuario, valor_anterior=5)

        servico.complexidade = 13
        servico.save(update_fields=["complexidade"])
        registrar_ajuste_manual_complexidade(servico, self.usuario, valor_anterior=8)

        logs = list(LogAuditoria.objects.order_by("criado_em"))
        self.assertEqual(len(logs), 2)
        self.assertEqual(logs[0].valor_anterior, "5")
        self.assertEqual(logs[0].valor_novo, "8")
        self.assertEqual(logs[1].valor_anterior, "8")
        self.assertEqual(logs[1].valor_novo, "13")


class TestServicoViewSetRegistraAuditoria(TestCase):
    """
    Testa a integração real: chamar o ViewSet (perform_update) só deve
    gerar log quando complexidade_manual=True.
    """

    def setUp(self):
        self.factory = APIRequestFactory()
        self.cliente = Cliente.objects.create(nome="Cliente Teste")
        self.costureira = Costureira.objects.create(nome="Costureira Teste")
        self.produto = Produto.objects.create(
            nome="Cortina Blackout", valor_base=100, tipo_produto="BLACKOUT"
        )
        self.usuario = Usuario.objects.create_user(username="gestora", password="senha123")

    def _criar_servico(self, complexidade=10, complexidade_manual=False):
        servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=2,
            tamanho="G",
            complexidade=complexidade,
            complexidade_manual=complexidade_manual,
            data_envio="2026-07-01",
            prazo_entrega="10 dias",
            valor=100.00,
        )
        servico.produto.add(self.produto)
        return servico

    def _chamar_update(self, servico, dados):
        view = ServicoViewSet.as_view({"patch": "partial_update"})
        request = self.factory.patch(f"/api/servicos/{servico.pk}/", dados, format="json")
        force_authenticate(request, user=self.usuario)
        response = view(request, pk=servico.pk)
        response.render()
        return response

    def test_update_com_complexidade_manual_gera_log(self):
        servico = self._criar_servico(complexidade=10, complexidade_manual=True)

        response = self._chamar_update(servico, {"complexidade": 20})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(LogAuditoria.objects.count(), 1)
        log = LogAuditoria.objects.first()
        self.assertEqual(log.valor_anterior, "10")
        self.assertEqual(log.valor_novo, "20")
        self.assertEqual(log.usuario, self.usuario)

    def test_update_sem_complexidade_manual_nao_gera_log(self):
        servico = self._criar_servico(complexidade=10, complexidade_manual=False)

        response = self._chamar_update(servico, {"complexidade": 20})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(LogAuditoria.objects.count(), 0)

    def test_update_sem_mudar_complexidade_nao_gera_log(self):
        servico = self._criar_servico(complexidade=10, complexidade_manual=True)

        response = self._chamar_update(servico, {"observacoes": "só um comentário"})

        self.assertEqual(response.status_code, 200)
        self.assertEqual(LogAuditoria.objects.count(), 0)


class TestServicoViewSetRecalculaComplexidadeAutomatica(TestCase):
    """
    Prova que atualizar um Servico via API, com complexidade_manual=False,
    recalcula a complexidade automaticamente (comportamento esperado
    da TASK-M1-CORE-003).
    """

    def setUp(self):
        self.factory = APIRequestFactory()
        self.cliente = Cliente.objects.create(nome="Cliente Teste")
        self.costureira = Costureira.objects.create(nome="Costureira Teste")
        self.produto = Produto.objects.create(
            nome="Cortina Blackout", valor_base=100, tipo_produto="BLACKOUT"
        )
        self.usuario = Usuario.objects.create_user(username="gestora", password="senha123")

    def _criar_servico(self, quantidade=2, tamanho="G", complexidade=0):
        servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=quantidade,
            tamanho=tamanho,
            complexidade=complexidade,
            complexidade_manual=False,
            data_envio="2026-07-01",
            prazo_entrega="10 dias",
            valor=100.00,
        )
        servico.produto.add(self.produto)
        return servico

    def test_update_via_api_recalcula_complexidade_automaticamente(self):
        # 2 peças de blackout tamanho G = 2 x 5 = 10 (mesmo cálculo do test_complexidade_manual.py)
        servico = self._criar_servico(quantidade=2, complexidade=0)

        view = ServicoViewSet.as_view({"patch": "partial_update"})
        request = self.factory.patch(
            f"/api/servicos/{servico.pk}/", {"quantidade": 2}, format="json"
        )
        force_authenticate(request, user=self.usuario)
        response = view(request, pk=servico.pk)
        response.render()

        servico.refresh_from_db()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(servico.complexidade, 10)  # deve ter recalculado sozinho