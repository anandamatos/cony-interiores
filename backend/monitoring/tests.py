from django.contrib.auth import get_user_model
from django.http import HttpResponse
from django.test import RequestFactory
from django.test import TestCase, override_settings

from monitoring.metrics import metrics_registry
from monitoring.middleware import FinancialApiObservabilityMiddleware
from rest_framework_simplejwt.tokens import RefreshToken


class MonitoringApiTests(TestCase):
    def setUp(self):
        metrics_registry.reset()
        self.password = 'S3nh@Segura123'
        self.user = get_user_model().objects.create_user(
            username='monitor_user',
            email='monitor@example.com',
            password=self.password,
        )
        self.admin_user = get_user_model().objects.create_user(
            username='monitor_admin',
            email='admin@example.com',
            password=self.password,
            is_staff=True,
        )

    def _auth_header_for(self, user):
        token = str(RefreshToken.for_user(user).access_token)
        return {'HTTP_AUTHORIZATION': f'Bearer {token}'}

    @override_settings(FINANCIAL_API_ALERT_THRESHOLD_MS=1)
    def test_dashboard_tracks_financial_performance_alerts(self):
        headers = self._auth_header_for(self.admin_user)

        self.client.post(
            '/api/financial/payments/simulate/?simulate_delay_ms=5',
            {'amount': 200},
            content_type='application/json',
            **headers,
        )

        dashboard = self.client.get(
            '/api/internal/monitoring/dashboard/',
            **headers,
        )

        self.assertEqual(dashboard.status_code, 200)
        data = dashboard.json()
        self.assertGreaterEqual(data['financial_requests_total'], 1)
        self.assertGreaterEqual(data['performance_alerts_total'], 1)

    def test_dashboard_requires_staff_user(self):
        headers = self._auth_header_for(self.user)

        response = self.client.get(
            '/api/internal/monitoring/dashboard/',
            **headers,
        )

        self.assertEqual(response.status_code, 403)

    def test_middleware_observes_requests_even_when_view_raises_exception(self):
        factory = RequestFactory()
        request = factory.get('/api/financial/explode/')

        def boom(_request):
            raise RuntimeError('boom')

        middleware = FinancialApiObservabilityMiddleware(boom)

        with self.assertRaises(RuntimeError):
            middleware(request)

        snapshot = metrics_registry.snapshot()
        self.assertEqual(snapshot['requests_total'], 1)
        self.assertEqual(snapshot['financial_requests_total'], 1)
        self.assertEqual(snapshot['recent_performance_alerts'], [])

    def test_middleware_sets_request_id_header_on_successful_response(self):
        factory = RequestFactory()
        request = factory.get('/api/financial/health/')

        middleware = FinancialApiObservabilityMiddleware(lambda _request: HttpResponse('ok'))
        response = middleware(request)

        self.assertIn('X-Request-ID', response)

    def test_openapi_and_swagger_endpoints_are_available(self):
        openapi_response = self.client.get('/api/docs/openapi.json')
        swagger_response = self.client.get('/api/docs/swagger/')

        self.assertEqual(openapi_response.status_code, 200)
        self.assertEqual(swagger_response.status_code, 200)
        self.assertIn('openapi', openapi_response.json())
        simulate_payment = openapi_response.json()['paths']['/api/financial/payments/simulate/']['post']
        self.assertEqual(simulate_payment['security'], [{'BearerAuth': []}])
