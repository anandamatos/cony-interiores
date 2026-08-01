"""
Testes para exportação PDF (TASK-M4-CORE-005)
"""

from django.test import TestCase
from rest_framework.test import APIClient
from datetime import date

from users.models import Cliente, Costureira, Servico
from finance.models import Pagamento


class ExportacaoPDFTests(TestCase):
    """Testes da exportação PDF"""

    def setUp(self):
        self.client = APIClient()
        
        # Criar dados de teste
        self.cliente = Cliente.objects.create(nome="Cliente Teste")
        self.costureira = Costureira.objects.create(nome="Costureira Teste")
        
        self.servico = Servico.objects.create(
            cliente=self.cliente,
            costureira=self.costureira,
            quantidade=2,
            data_envio="2026-07-15",
            prazo_entrega="2026-07-25",
            valor=100.00
        )
        
        self.pagamento = Pagamento.objects.create(
            servico=self.servico,
            valor=100.00,
            data_entrega="2026-07-20",
            status="pendente"
        )

    def test_exportar_relatorio_mensal_pdf(self):
        """Testa exportação do relatório mensal em PDF"""
        response = self.client.get(
            '/api/core/relatorios/mensal/exportar/pdf/?periodo=2026-07'
        )
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'application/pdf')
        self.assertIn('attachment; filename="relatorio_mensal_2026-07.pdf"', 
                     response['Content-Disposition'])

    def test_exportar_relatorio_mensal_pdf_sem_periodo(self):
        """Testa erro quando período não é informado"""
        response = self.client.get('/api/core/relatorios/mensal/exportar/pdf/')
        self.assertEqual(response.status_code, 400)
        self.assertIn('periodo', response.json()['erro'])

    def test_exportar_atrasos_pdf(self):
        """Testa exportação do relatório de atrasos em PDF"""
        # Criar um atraso
        Pagamento.objects.create(
            servico=self.servico,
            valor=50.00,
            data_entrega=date(2026, 7, 1),
            status="atrasado"
        )
        
        response = self.client.get('/api/core/relatorios/atrasos/exportar/pdf/')
        
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response['Content-Type'], 'application/pdf')
        self.assertIn('attachment; filename="relatorio_atrasos_', 
                     response['Content-Disposition'])