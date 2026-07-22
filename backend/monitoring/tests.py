from django.contrib.auth import get_user_model
from django.core.cache import caches
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
        self.assertIn('query_kpis', data)
        self.assertIn('alerts', data['query_kpis'])
        self.assertIn('dashboard_response_kpis', data)
        self.assertIn('alerts', data['dashboard_response_kpis'])

    @override_settings(
        FINANCIAL_DASHBOARD_TARGET_LOAD_MS=0,
        FINANCIAL_DASHBOARD_TARGET_CHART_MS=0,
        FINANCIAL_DASHBOARD_TARGET_FILTER_MS=0,
        FINANCIAL_DASHBOARD_TARGET_EXPORT_MS=0,
    )
    def test_dashboard_exposes_response_time_kpi_alerts(self):
        self.client.post(
            '/api/financial/payments/simulate/?simulate_delay_ms=5',
            {'amount': 100},
            content_type='application/json',
        )
        self.client.get('/api/servicos/?ordering=-data_envio&search=urgente')

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
        response_kpis = dashboard.json()['dashboard_response_kpis']
        alerts = {item['kpi']: item['status'] for item in response_kpis['alerts']}
        self.assertEqual(alerts['dashboard_load_ms'], 'breach')
        self.assertEqual(alerts['chart_response_ms'], 'breach')
        self.assertEqual(alerts['filter_apply_ms'], 'breach')

    @override_settings(
        FINANCIAL_QUERY_SLOW_THRESHOLD_MS=1,
        FINANCIAL_QUERY_TARGET_SLOW_PERCENT=0,
        FINANCIAL_QUERY_TARGET_AVG_MS=1,
        FINANCIAL_QUERY_TARGET_P95_MS=1,
    )
    def test_dashboard_exposes_query_kpi_alert_status(self):
        self.client.post(
            '/api/financial/payments/simulate/?simulate_delay_ms=5',
            {'amount': 100},
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
        payload = dashboard.json()
        kpis = payload['query_kpis']
        self.assertGreaterEqual(kpis['query_requests_total'], 1)
        self.assertGreaterEqual(kpis['slow_queries_total'], 1)
        self.assertGreater(kpis['slow_query_percent'], 0)

        alert_statuses = {item['kpi']: item['status'] for item in kpis['alerts']}
        self.assertEqual(alert_statuses['slow_query_percent'], 'breach')

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

    @override_settings(
        FINANCIAL_DASHBOARD_CACHE_ENABLED=True,
        FINANCIAL_DASHBOARD_CACHE_TTL_SECONDS=60,
        FINANCIAL_DASHBOARD_CACHE_INVALIDATE_ON_WRITE=True,
    )
    def test_monitoring_dashboard_uses_cache_between_requests(self):
        caches['financial_dashboard'].clear()

        login = self.client.post(
            '/api/auth/token/',
            {'username': self.user.username, 'password': self.password},
            content_type='application/json',
        )
        token = login.json()['access']

        with patch('monitoring.views.metrics_registry.snapshot') as snapshot_mock:
            snapshot_mock.return_value = {
                'uptime_seconds': 1,
                'requests_total': 10,
                'financial_requests_total': 8,
                'performance_alerts_total': 0,
                'latency_average_ms': 20.0,
                'latency_samples_window_size': 10,
                'recent_performance_alerts': [],
                'query_kpis': {
                    'avg_response_ms': 12.0,
                    'p95_response_ms': 18.0,
                    'p99_response_ms': 25.0,
                    'slow_query_percent': 0.0,
                    'slow_queries_total': 0,
                    'query_requests_total': 8,
                    'index_usage_percent': 90.0,
                    'resource_cpu_percent': 0.0,
                    'resource_memory_mb': 0.0,
                    'targets': {
                        'avg_response_ms': 150,
                        'slow_query_percent': 5,
                        'p95_response_ms': 300,
                        'index_usage_percent': 90,
                        'resource_cpu_percent': 80,
                        'resource_memory_mb': 1024,
                    },
                    'alerts': [],
                },
                'dashboard_response_kpis': {
                    'dashboard_load_ms': 10.0,
                    'dashboard_load_p95_ms': 15.0,
                    'chart_response_ms': 12.0,
                    'chart_response_p95_ms': 18.0,
                    'filter_apply_ms': 9.0,
                    'filter_apply_p95_ms': 13.0,
                    'export_response_ms': 0.0,
                    'export_response_p95_ms': 0.0,
                    'targets': {
                        'dashboard_load_ms': 400,
                        'chart_response_ms': 500,
                        'filter_apply_ms': 350,
                        'export_response_ms': 1200,
                    },
                    'alerts': [],
                },
            }

            first_response = self.client.get(
                '/api/internal/monitoring/dashboard/',
                HTTP_AUTHORIZATION=f'Bearer {token}',
            )
            second_response = self.client.get(
                '/api/internal/monitoring/dashboard/',
                HTTP_AUTHORIZATION=f'Bearer {token}',
            )

        self.assertEqual(first_response.status_code, 200)
        self.assertEqual(second_response.status_code, 200)
        self.assertEqual(snapshot_mock.call_count, 1)
        self.assertEqual(first_response.json()['cache']['source'], 'miss')
        self.assertEqual(second_response.json()['cache']['source'], 'hit')


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

    @override_settings(FINANCIAL_DASHBOARD_CACHE_ENABLED=True, FINANCIAL_DASHBOARD_CACHE_INVALIDATE_ON_WRITE=True)
    def test_middleware_invalidates_cache_on_financial_write(self):
        request = self.factory.post('/api/financial/payments/simulate/')

        def ok_response(_request):
            class _Response(dict):
                status_code = 200

            return _Response()

        middleware = FinancialApiObservabilityMiddleware(ok_response)

        with patch('monitoring.middleware.invalidate_dashboard_snapshot_cache') as invalidate_cache:
            middleware(request)

        invalidate_cache.assert_called_once()
