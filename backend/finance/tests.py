from django.test import TestCase, override_settings
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken


class FinancialApiTests(TestCase):
    def setUp(self):
        self.password = 'S3nh@Segura123'
        self.user = get_user_model().objects.create_user(
            username='finance_user',
            email='finance@example.com',
            password=self.password,
        )

    def _auth_headers(self):
        token = str(RefreshToken.for_user(self.user).access_token)
        return {'HTTP_AUTHORIZATION': f'Bearer {token}'}

    def test_financial_health_endpoint_returns_ok(self):
        response = self.client.get('/api/financial/health/')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'ok')

    def test_simulate_payment_returns_calculated_values(self):
        headers = self._auth_headers()
        response = self.client.post(
            '/api/financial/payments/simulate/',
            {'amount': 100, 'fee_rate': 0.1, 'currency': 'BRL'},
            content_type='application/json',
            **headers,
        )

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertEqual(payload['amount'], '100.00')
        self.assertEqual(payload['fee_amount'], '10.00')
        self.assertEqual(payload['net_amount'], '90.00')

    def test_simulate_payment_rejects_invalid_amount(self):
        headers = self._auth_headers()
        response = self.client.post(
            '/api/financial/payments/simulate/',
            {'amount': 0},
            content_type='application/json',
            **headers,
        )

        self.assertEqual(response.status_code, 400)

    def test_simulate_payment_requires_authentication(self):
        response = self.client.post(
            '/api/financial/payments/simulate/',
            {'amount': 100},
            content_type='application/json',
        )

        self.assertEqual(response.status_code, 401)

    @override_settings(FINANCIAL_API_ENABLE_SIMULATED_DELAY=False)
    def test_simulate_payment_rejects_delay_when_disabled(self):
        headers = self._auth_headers()
        response = self.client.post(
            '/api/financial/payments/simulate/?simulate_delay_ms=5',
            {'amount': 100},
            content_type='application/json',
            **headers,
        )

        self.assertEqual(response.status_code, 400)

    @override_settings(FINANCIAL_API_ENABLE_SIMULATED_DELAY=True, FINANCIAL_API_MAX_SIMULATED_DELAY_MS=10)
    def test_simulate_payment_rejects_delay_above_configured_limit(self):
        headers = self._auth_headers()
        response = self.client.post(
            '/api/financial/payments/simulate/?simulate_delay_ms=20',
            {'amount': 100},
            content_type='application/json',
            **headers,
        )

        self.assertEqual(response.status_code, 400)
