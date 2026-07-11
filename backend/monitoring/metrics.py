from __future__ import annotations

from collections import deque
from threading import Lock
from time import time


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
            self._request_count += 1
            if is_financial:
                self._financial_request_count += 1
            self._latency_samples_ms.append(duration_ms)

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

            uptime_seconds = int(time() - self._started_at)
            return {
                'uptime_seconds': uptime_seconds,
                'requests_total': self._request_count,
                'financial_requests_total': self._financial_request_count,
                'performance_alerts_total': self._performance_alert_count,
                'latency_average_ms': round(avg_latency, 2),
                'latency_samples_window_size': len(self._latency_samples_ms),
                'recent_performance_alerts': list(self._last_alerts),
            }


metrics_registry = MonitoringMetrics()
