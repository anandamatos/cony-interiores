from __future__ import annotations

import os

from locust import HttpUser, between, task


class FinancialApiUser(HttpUser):
    wait_time = between(0.1, 0.8)

    def on_start(self):
        self.amount = os.getenv('LOCUST_FIN_AMOUNT', '199.90')
        self.fee_rate = os.getenv('LOCUST_FIN_FEE_RATE', '0.025')
        self.simulate_delay_ms = os.getenv('LOCUST_SIMULATE_DELAY_MS', '0')
        self.username = os.getenv('LOCUST_AUTH_USERNAME', 'monitor_user')
        self.password = os.getenv('LOCUST_AUTH_PASSWORD', 'monitor123')
        self.token = None
        self._authenticate()

    def _authenticate(self):
        response = self.client.post(
            '/api/auth/token/',
            json={
                'username': self.username,
                'password': self.password,
            },
            name='/api/auth/token/',
        )

        if response.status_code == 200:
            payload = response.json()
            self.token = payload.get('access')

    def _auth_headers(self):
        if self.token:
            return {'Authorization': f'Bearer {self.token}'}
        return {}

    @task(1)
    def healthcheck(self):
        self.client.get('/api/financial/health/')

    @task(4)
    def simulate_payment(self):
        self.client.post(
            f'/api/financial/payments/simulate/?simulate_delay_ms={self.simulate_delay_ms}',
            json={
                'amount': self.amount,
                'fee_rate': self.fee_rate,
                'currency': 'BRL',
                'provider': 'locust',
            },
        )

    @task(2)
    def monitoring_dashboard(self):
        if not self.token:
            self._authenticate()

        self.client.get(
            '/api/internal/monitoring/dashboard/',
            headers=self._auth_headers(),
            name='/api/internal/monitoring/dashboard/',
        )

    @task(2)
    def list_servicos(self):
        # Query shape used by financial and planning screens.
        self.client.get(
            '/api/servicos/?ordering=-data_envio&search=urgente',
            name='/api/servicos/?ordering=-data_envio&search=<term>',
        )
