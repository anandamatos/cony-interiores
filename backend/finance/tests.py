from django.test import TestCase


class FinancialApiTests(TestCase):
    def test_financial_health_endpoint_returns_ok(self):
        response = self.client.get('/api/financial/health/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'ok')

    def test_simulate_payment_returns_calculated_values(self):
        response = self.client.post(
            '/api/financial/payments/simulate/',
            {'amount': 100, 'fee_rate': 0.1, 'currency': 'BRL'},
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload['amount'], '100.00')
        self.assertEqual(payload['fee_amount'], '10.00')
        self.assertEqual(payload['net_amount'], '90.00')

    def test_simulate_payment_rejects_invalid_amount(self):
        response = self.client.post(
            '/api/financial/payments/simulate/',
            {'amount': 0},
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 400)
