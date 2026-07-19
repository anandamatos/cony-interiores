from __future__ import annotations

from collections import deque
from threading import Lock
from time import time

from django.conf import settings


class MonitoringMetrics:
    """In-memory metrics registry for lightweight internal monitoring."""

    def __init__(self, max_samples: int = 200):
        self._lock = Lock()
        self._max_samples = max_samples
        self._started_at = time()
        self._request_count = 0
        self._financial_request_count = 0
        self._performance_alert_count = 0
        self._last_alerts = deque(maxlen=50)
        self._latency_samples_ms = deque(maxlen=max_samples)
        self._query_latency_samples_ms = deque(maxlen=max_samples)
        self._query_request_count = 0
        self._slow_query_count = 0

    @staticmethod
    def _is_query_kpi_path(path: str) -> bool:
        return path.startswith('/api/financial/') or path.startswith('/api/servicos/')

    @staticmethod
    def _percentile(values: deque[float], p: float) -> float:
        if not values:
            return 0.0
        ordered = sorted(values)
        idx = int(round((p / 100) * (len(ordered) - 1)))
        return ordered[idx]

    def observe_request(
        self,
        *,
        method: str,
        path: str,
        status_code: int,
        duration_ms: float,
        is_financial: bool,
        performance_alert: bool,
    ) -> None:
        with self._lock:
            slow_threshold_ms = float(getattr(settings, 'FINANCIAL_QUERY_SLOW_THRESHOLD_MS', 120))
            self._request_count += 1
            if is_financial:
                self._financial_request_count += 1
            self._latency_samples_ms.append(duration_ms)

            if self._is_query_kpi_path(path):
                self._query_request_count += 1
                self._query_latency_samples_ms.append(duration_ms)
                if duration_ms >= slow_threshold_ms:
                    self._slow_query_count += 1

            if performance_alert:
                self._performance_alert_count += 1
                self._last_alerts.appendleft(
                    {
                        'timestamp_unix': int(time()),
                        'method': method,
                        'path': path,
                        'status_code': status_code,
                        'duration_ms': round(duration_ms, 2),
                    }
                )

    def snapshot(self) -> dict:
        with self._lock:
            avg_latency = 0.0
            if self._latency_samples_ms:
                avg_latency = sum(self._latency_samples_ms) / len(self._latency_samples_ms)

            avg_query_latency = 0.0
            if self._query_latency_samples_ms:
                avg_query_latency = sum(self._query_latency_samples_ms) / len(self._query_latency_samples_ms)

            slow_query_percent = 0.0
            if self._query_request_count:
                slow_query_percent = (self._slow_query_count / self._query_request_count) * 100

            query_p95 = self._percentile(self._query_latency_samples_ms, 95)
            query_p99 = self._percentile(self._query_latency_samples_ms, 99)

            target_avg_ms = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_AVG_MS', 150))
            target_slow_pct = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_SLOW_PERCENT', 5))
            target_p95_ms = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_P95_MS', 300))
            index_usage_pct = float(getattr(settings, 'FINANCIAL_QUERY_INDEX_USAGE_PERCENT', 90))
            target_index_usage_pct = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_INDEX_USAGE_PERCENT', 90))
            cpu_pct = float(getattr(settings, 'FINANCIAL_QUERY_RESOURCE_CPU_PERCENT', 0))
            memory_mb = float(getattr(settings, 'FINANCIAL_QUERY_RESOURCE_MEMORY_MB', 0))
            target_cpu_pct = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_CPU_PERCENT', 80))
            target_memory_mb = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_MEMORY_MB', 1024))

            kpi_alerts = [
                {
                    'kpi': 'avg_response_ms',
                    'current': round(avg_query_latency, 2),
                    'target': target_avg_ms,
                    'status': 'ok' if avg_query_latency <= target_avg_ms else 'breach',
                },
                {
                    'kpi': 'slow_query_percent',
                    'current': round(slow_query_percent, 2),
                    'target': target_slow_pct,
                    'status': 'ok' if slow_query_percent <= target_slow_pct else 'breach',
                },
                {
                    'kpi': 'p95_response_ms',
                    'current': round(query_p95, 2),
                    'target': target_p95_ms,
                    'status': 'ok' if query_p95 <= target_p95_ms else 'breach',
                },
                {
                    'kpi': 'index_usage_percent',
                    'current': round(index_usage_pct, 2),
                    'target': target_index_usage_pct,
                    'status': 'ok' if index_usage_pct >= target_index_usage_pct else 'breach',
                },
                {
                    'kpi': 'resource_cpu_percent',
                    'current': round(cpu_pct, 2),
                    'target': target_cpu_pct,
                    'status': 'ok' if cpu_pct <= target_cpu_pct else 'breach',
                },
                {
                    'kpi': 'resource_memory_mb',
                    'current': round(memory_mb, 2),
                    'target': target_memory_mb,
                    'status': 'ok' if memory_mb <= target_memory_mb else 'breach',
                },
            ]

            uptime_seconds = int(time() - self._started_at)
            return {
                'uptime_seconds': uptime_seconds,
                'requests_total': self._request_count,
                'financial_requests_total': self._financial_request_count,
                'performance_alerts_total': self._performance_alert_count,
                'latency_average_ms': round(avg_latency, 2),
                'latency_samples_window_size': len(self._latency_samples_ms),
                'recent_performance_alerts': list(self._last_alerts),
                'query_kpis': {
                    'avg_response_ms': round(avg_query_latency, 2),
                    'p95_response_ms': round(query_p95, 2),
                    'p99_response_ms': round(query_p99, 2),
                    'slow_query_percent': round(slow_query_percent, 2),
                    'slow_queries_total': self._slow_query_count,
                    'query_requests_total': self._query_request_count,
                    'index_usage_percent': round(index_usage_pct, 2),
                    'resource_cpu_percent': round(cpu_pct, 2),
                    'resource_memory_mb': round(memory_mb, 2),
                    'targets': {
                        'avg_response_ms': target_avg_ms,
                        'slow_query_percent': target_slow_pct,
                        'p95_response_ms': target_p95_ms,
                        'index_usage_percent': target_index_usage_pct,
                        'resource_cpu_percent': target_cpu_pct,
                        'resource_memory_mb': target_memory_mb,
                    },
                    'alerts': kpi_alerts,
                },
            }


metrics_registry = MonitoringMetrics()
