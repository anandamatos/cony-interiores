from __future__ import annotations

import os

from locust import HttpUser, between, task


class FinancialApiUser(HttpUser):
    wait_time = between(0.1, 0.8)

    def on_start(self):
        self.amount = os.getenv('LOCUST_FIN_AMOUNT', '199.90')
        self.fee_rate = os.getenv('LOCUST_FIN_FEE_RATE', '0.025')
        self.simulate_delay_ms = os.getenv('LOCUST_SIMULATE_DELAY_MS', '0')

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
