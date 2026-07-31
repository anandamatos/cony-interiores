"""
Testes de carga para validação de performance (TASK-M2-FND-003)
"""

from locust import HttpUser, task, between
import json
import random


class FinancialUser(HttpUser):
    """Usuário simulando operações financeiras"""

    wait_time = between(1, 3)

    def on_start(self):
        """Setup inicial"""
        self.token = None

    @task(3)
    def listar_servicos(self):
        """Listar serviços com filtros"""
        params = {
            'periodo_inicio': '2026-07-01',
            'periodo_fim': '2026-07-31'
        }
        self.client.get('/api/servicos/', params=params)

    @task(2)
    def listar_pagamentos_costureiras(self):
        """Listar pagamentos por costureira"""
        self.client.get('/api/financial/pagamentos-costureiras/')

    @task(2)
    def planejamento_semanal(self):
        """Planejamento semanal de pagamentos"""
        self.client.get('/api/financial/payments/planejamento/semanal/')

    @task(1)
    def planejamento_mensal(self):
        """Planejamento mensal de pagamentos"""
        self.client.get('/api/financial/payments/planejamento/mensal/')

    @task(1)
    def previsao_pagamentos(self):
        """Previsão de pagamentos"""
        self.client.get('/api/financial/payments/previsao/')