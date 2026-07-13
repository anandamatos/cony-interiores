from __future__ import annotations

import logging
import time
import uuid

from django.conf import settings

from .metrics import metrics_registry

financial_logger = logging.getLogger('financial_api')
api_logger = logging.getLogger('monitoring')


class FinancialApiObservabilityMiddleware:
    """Adds structured logs, latency tracking and alerting for financial APIs."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        started_at = time.perf_counter()
        request_id = request.headers.get('X-Request-ID') or str(uuid.uuid4())
        request.request_id = request_id
        response = None

        try:
            response = self.get_response(request)
            return response
        finally:
            duration_ms = (time.perf_counter() - started_at) * 1000
            path = request.path
            method = request.method
            status_code = response.status_code if response is not None else 500
            is_financial = path.startswith('/api/financial/')

            threshold_ms = getattr(settings, 'FINANCIAL_API_ALERT_THRESHOLD_MS', 800)
            performance_alert = is_financial and duration_ms >= threshold_ms

            extra_payload = {
                'event': 'api_request_completed',
                'request_id': request_id,
                'method': method,
                'path': path,
                'status_code': status_code,
                'duration_ms': round(duration_ms, 2),
                'is_financial': is_financial,
                'performance_alert': performance_alert,
                'alert_threshold_ms': threshold_ms,
            }

            user = getattr(request, 'user', None)
            if user and user.is_authenticated:
                extra_payload['user_id'] = user.id
                extra_payload['username'] = user.get_username()

            if is_financial:
                if performance_alert:
                    financial_logger.warning('Financial API latency threshold exceeded', extra=extra_payload)
                else:
                    financial_logger.info('Financial API request processed', extra=extra_payload)
            else:
                api_logger.info('API request processed', extra=extra_payload)

            metrics_registry.observe_request(
                method=method,
                path=path,
                status_code=status_code,
                duration_ms=duration_ms,
                is_financial=is_financial,
                performance_alert=performance_alert,
            )

            if response is not None:
                response['X-Request-ID'] = request_id
