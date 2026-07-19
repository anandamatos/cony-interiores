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
        self._dashboard_load_samples_ms = deque(maxlen=max_samples)
        self._chart_response_samples_ms = deque(maxlen=max_samples)
        self._filter_apply_samples_ms = deque(maxlen=max_samples)
        self._export_response_samples_ms = deque(maxlen=max_samples)

    @staticmethod
    def _is_query_kpi_path(path: str) -> bool:
        return path.startswith('/api/financial/') or path.startswith('/api/servicos/')

    @staticmethod
    def _is_dashboard_load_path(path: str) -> bool:
        return path.startswith('/api/internal/monitoring/dashboard/')

    @staticmethod
    def _is_chart_response_path(path: str) -> bool:
        return path.startswith('/api/financial/')

    @staticmethod
    def _is_filter_apply_path(path: str) -> bool:
        if not path.startswith('/api/servicos/'):
            return False
        return any(token in path for token in ('search=', 'ordering=', 'cliente=', 'costureira='))

    @staticmethod
    def _is_export_path(path: str) -> bool:
        return 'export' in path

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

            if self._is_dashboard_load_path(path):
                self._dashboard_load_samples_ms.append(duration_ms)

            if self._is_chart_response_path(path):
                self._chart_response_samples_ms.append(duration_ms)

            if self._is_filter_apply_path(path):
                self._filter_apply_samples_ms.append(duration_ms)

            if self._is_export_path(path):
                self._export_response_samples_ms.append(duration_ms)

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

            dashboard_load_avg = sum(self._dashboard_load_samples_ms) / len(self._dashboard_load_samples_ms) if self._dashboard_load_samples_ms else 0.0
            dashboard_load_p95 = self._percentile(self._dashboard_load_samples_ms, 95)

            chart_response_avg = sum(self._chart_response_samples_ms) / len(self._chart_response_samples_ms) if self._chart_response_samples_ms else 0.0
            chart_response_p95 = self._percentile(self._chart_response_samples_ms, 95)

            filter_apply_avg = sum(self._filter_apply_samples_ms) / len(self._filter_apply_samples_ms) if self._filter_apply_samples_ms else 0.0
            filter_apply_p95 = self._percentile(self._filter_apply_samples_ms, 95)

            export_response_avg = sum(self._export_response_samples_ms) / len(self._export_response_samples_ms) if self._export_response_samples_ms else 0.0
            export_response_p95 = self._percentile(self._export_response_samples_ms, 95)

            target_avg_ms = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_AVG_MS', 150))
            target_slow_pct = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_SLOW_PERCENT', 5))
            target_p95_ms = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_P95_MS', 300))
            index_usage_pct = float(getattr(settings, 'FINANCIAL_QUERY_INDEX_USAGE_PERCENT', 90))
            target_index_usage_pct = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_INDEX_USAGE_PERCENT', 90))
            cpu_pct = float(getattr(settings, 'FINANCIAL_QUERY_RESOURCE_CPU_PERCENT', 0))
            memory_mb = float(getattr(settings, 'FINANCIAL_QUERY_RESOURCE_MEMORY_MB', 0))
            target_cpu_pct = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_CPU_PERCENT', 80))
            target_memory_mb = float(getattr(settings, 'FINANCIAL_QUERY_TARGET_MEMORY_MB', 1024))

            dashboard_target_load_ms = float(getattr(settings, 'FINANCIAL_DASHBOARD_TARGET_LOAD_MS', 400))
            dashboard_target_chart_ms = float(getattr(settings, 'FINANCIAL_DASHBOARD_TARGET_CHART_MS', 500))
            dashboard_target_filter_ms = float(getattr(settings, 'FINANCIAL_DASHBOARD_TARGET_FILTER_MS', 350))
            dashboard_target_export_ms = float(getattr(settings, 'FINANCIAL_DASHBOARD_TARGET_EXPORT_MS', 1200))

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

            dashboard_response_alerts = [
                {
                    'kpi': 'dashboard_load_ms',
                    'current': round(dashboard_load_avg, 2),
                    'target': dashboard_target_load_ms,
                    'status': 'ok' if dashboard_load_avg <= dashboard_target_load_ms else 'breach',
                },
                {
                    'kpi': 'chart_response_ms',
                    'current': round(chart_response_avg, 2),
                    'target': dashboard_target_chart_ms,
                    'status': 'ok' if chart_response_avg <= dashboard_target_chart_ms else 'breach',
                },
                {
                    'kpi': 'filter_apply_ms',
                    'current': round(filter_apply_avg, 2),
                    'target': dashboard_target_filter_ms,
                    'status': 'ok' if filter_apply_avg <= dashboard_target_filter_ms else 'breach',
                },
                {
                    'kpi': 'export_response_ms',
                    'current': round(export_response_avg, 2),
                    'target': dashboard_target_export_ms,
                    'status': 'ok' if export_response_avg <= dashboard_target_export_ms else 'breach',
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
                'dashboard_response_kpis': {
                    'dashboard_load_ms': round(dashboard_load_avg, 2),
                    'dashboard_load_p95_ms': round(dashboard_load_p95, 2),
                    'chart_response_ms': round(chart_response_avg, 2),
                    'chart_response_p95_ms': round(chart_response_p95, 2),
                    'filter_apply_ms': round(filter_apply_avg, 2),
                    'filter_apply_p95_ms': round(filter_apply_p95, 2),
                    'export_response_ms': round(export_response_avg, 2),
                    'export_response_p95_ms': round(export_response_p95, 2),
                    'targets': {
                        'dashboard_load_ms': dashboard_target_load_ms,
                        'chart_response_ms': dashboard_target_chart_ms,
                        'filter_apply_ms': dashboard_target_filter_ms,
                        'export_response_ms': dashboard_target_export_ms,
                    },
                    'alerts': dashboard_response_alerts,
                },
            }


metrics_registry = MonitoringMetrics()
