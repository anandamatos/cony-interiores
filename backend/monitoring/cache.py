from __future__ import annotations

from copy import deepcopy

from django.conf import settings
from django.core.cache import caches


def _cache_key() -> str:
    return getattr(settings, 'FINANCIAL_DASHBOARD_CACHE_KEY', 'snapshot')


def get_dashboard_snapshot_from_cache() -> dict | None:
    if not getattr(settings, 'FINANCIAL_DASHBOARD_CACHE_ENABLED', True):
        return None

    payload = caches['financial_dashboard'].get(_cache_key())
    if payload is None:
        return None

    # Prevent accidental mutations to cached objects.
    return deepcopy(payload)


def set_dashboard_snapshot_cache(payload: dict) -> None:
    if not getattr(settings, 'FINANCIAL_DASHBOARD_CACHE_ENABLED', True):
        return

    timeout = getattr(settings, 'FINANCIAL_DASHBOARD_CACHE_TTL_SECONDS', 30)
    caches['financial_dashboard'].set(_cache_key(), deepcopy(payload), timeout=timeout)


def invalidate_dashboard_snapshot_cache() -> None:
    if not getattr(settings, 'FINANCIAL_DASHBOARD_CACHE_ENABLED', True):
        return

    if not getattr(settings, 'FINANCIAL_DASHBOARD_CACHE_INVALIDATE_ON_WRITE', True):
        return

    caches['financial_dashboard'].delete(_cache_key())
