from django.contrib.auth import get_user_model
from django.test import TestCase, override_settings
from django.test.client import RequestFactory
from unittest.mock import patch

from .middleware import FinancialApiObservabilityMiddleware


class MonitoringApiTests(TestCase):
    def setUp(self):
        self.password = 'S3nh@Segura123'
        self.user = get_user_model().objects.create_user(
            username='monitor_user',
            email='monitor@example.com',
            password=self.password,
            is_staff=True,
        )

    @override_settings(FINANCIAL_API_ALERT_THRESHOLD_MS=1)
    def test_dashboard_tracks_financial_performance_alerts(self):
        self.client.post(
            '/api/financial/payments/simulate/?simulate_delay_ms=5',
            {'amount': 200},
            content_type='application/json',
        )

        login = self.client.post(
            '/api/auth/token/',
            {'username': self.user.username, 'password': self.password},
            content_type='application/json',
        )
        token = login.json()['access']

        dashboard = self.client.get(
            '/api/internal/monitoring/dashboard/',
            HTTP_AUTHORIZATION=f'Bearer {token}',
        )

        self.assertEqual(dashboard.status_code, 200)
        data = dashboard.json()
        self.assertGreaterEqual(data['financial_requests_total'], 1)
        self.assertGreaterEqual(data['performance_alerts_total'], 1)

    def test_dashboard_rejects_non_staff_user(self):
        non_staff = get_user_model().objects.create_user(
            username='common_user',
            email='common@example.com',
            password=self.password,
            is_staff=False,
        )

        login = self.client.post(
            '/api/auth/token/',
            {'username': non_staff.username, 'password': self.password},
            content_type='application/json',
        )
        token = login.json()['access']

        dashboard = self.client.get(
            '/api/internal/monitoring/dashboard/',
            HTTP_AUTHORIZATION=f'Bearer {token}',
        )

        self.assertEqual(dashboard.status_code, 403)

    def test_openapi_and_swagger_endpoints_are_available(self):
        openapi_response = self.client.get('/api/docs/openapi.json')
        swagger_response = self.client.get('/api/docs/swagger/')

        self.assertEqual(openapi_response.status_code, 200)
        self.assertEqual(swagger_response.status_code, 200)
        self.assertIn('openapi', openapi_response.json())


class MonitoringMiddlewareTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    @override_settings(FINANCIAL_API_ALERT_THRESHOLD_MS=1)
    def test_middleware_tracks_metrics_on_exception(self):
        request = self.factory.get('/api/financial/boom/')

        def raise_error(_request):
            raise RuntimeError('boom')

        middleware = FinancialApiObservabilityMiddleware(raise_error)

        with patch('monitoring.middleware.metrics_registry.observe_request') as observe_request:
            with self.assertRaises(RuntimeError):
                middleware(request)

        observe_request.assert_called_once()
        kwargs = observe_request.call_args.kwargs
        self.assertEqual(kwargs['status_code'], 500)
        self.assertTrue(kwargs['is_financial'])
