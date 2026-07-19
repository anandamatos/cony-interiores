from __future__ import annotations

import argparse
import json
import os
import sys
import statistics
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from time import perf_counter

import django
from django.core.management import call_command
from django.contrib.auth import get_user_model
from django.conf import settings


@dataclass
class Scenario:
    name: str
    method: str
    path: str
    auth: bool = False
    payload: dict | None = None


def percentile(values: list[float], p: float) -> float:
    if not values:
        return 0.0
    ordered = sorted(values)
    idx = int(round((p / 100) * (len(ordered) - 1)))
    return ordered[idx]


def build_markdown_report(result: dict) -> str:
    lines = [
        "# Performance Report - TASK-M2-CORE-FND-003",
        "",
        f"- Generated at: {result['generated_at']}",
        f"- Settings: {result['settings_module']}",
        f"- Warmup requests per scenario: {result['warmup']}",
        f"- Measured requests per scenario: {result['iterations']}",
        "",
        "## Scenario Metrics",
        "",
        "| Scenario | Requests | Success % | Avg (ms) | P95 (ms) | P99 (ms) | Max (ms) |",
        "|---|---:|---:|---:|---:|---:|---:|",
    ]

    for scenario in result['scenarios']:
        lines.append(
            "| {name} | {requests} | {success_rate:.2f}% | {avg_ms:.2f} | {p95_ms:.2f} | {p99_ms:.2f} | {max_ms:.2f} |".format(
                name=scenario['name'],
                requests=scenario['requests'],
                success_rate=scenario['success_rate'],
                avg_ms=scenario['avg_ms'],
                p95_ms=scenario['p95_ms'],
                p99_ms=scenario['p99_ms'],
                max_ms=scenario['max_ms'],
            )
        )

    lines.extend(
        [
            "",
            "## Consolidated",
            "",
            f"- Total requests: {result['summary']['total_requests']}",
            f"- Overall success rate: {result['summary']['overall_success_rate']:.2f}%",
            f"- Overall average latency: {result['summary']['overall_avg_ms']:.2f} ms",
            f"- Overall p95 latency: {result['summary']['overall_p95_ms']:.2f} ms",
            f"- Overall p99 latency: {result['summary']['overall_p99_ms']:.2f} ms",
        ]
    )

    return "\n".join(lines) + "\n"


def ensure_staff_user(username: str, password: str) -> None:
    user_model = get_user_model()
    user, created = user_model.objects.get_or_create(
        username=username,
        defaults={
            'email': f'{username}@example.com',
            'is_staff': True,
            'is_superuser': False,
        },
    )

    changed = False
    if created:
        changed = True

    if not user.is_staff:
        user.is_staff = True
        changed = True

    if changed or not user.check_password(password):
        user.set_password(password)
        user.save()


def main() -> None:
    parser = argparse.ArgumentParser(description='Collect smoke performance metrics for core financial endpoints.')
    parser.add_argument('--settings', default='config.settings_sqlite', help='Django settings module')
    parser.add_argument('--iterations', type=int, default=40, help='Measured requests per scenario')
    parser.add_argument('--warmup', type=int, default=5, help='Warmup requests per scenario')
    parser.add_argument('--output-dir', default='loadtests/reports', help='Output directory for reports')
    parser.add_argument('--keep-history', action='store_true', help='Also write timestamped report files')
    args = parser.parse_args()

    backend_root = Path(__file__).resolve().parents[1]
    if str(backend_root) not in sys.path:
        sys.path.insert(0, str(backend_root))

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', args.settings)
    django.setup()

    from rest_framework.test import APIClient

    call_command('migrate', run_syncdb=True, verbosity=0)

    if 'testserver' not in settings.ALLOWED_HOSTS:
        settings.ALLOWED_HOSTS = list(settings.ALLOWED_HOSTS) + ['testserver']

    username = os.getenv('LOCUST_AUTH_USERNAME', 'monitor_user')
    password = os.getenv('LOCUST_AUTH_PASSWORD', 'monitor123')
    ensure_staff_user(username, password)

    client = APIClient()
    token_response = client.post(
        '/api/auth/token/',
        {'username': username, 'password': password},
        format='json',
    )
    if token_response.status_code != 200:
        raise RuntimeError(f'Unable to obtain token. status={token_response.status_code} body={token_response.content!r}')

    token = token_response.json()['access']
    auth_header = {'HTTP_AUTHORIZATION': f'Bearer {token}'}

    scenarios = [
        Scenario(name='financial_health', method='GET', path='/api/financial/health/'),
        Scenario(
            name='simulate_payment',
            method='POST',
            path='/api/financial/payments/simulate/?simulate_delay_ms=0',
            payload={'amount': 250.55, 'fee_rate': 0.03, 'currency': 'BRL', 'provider': 'perf-smoke'},
        ),
        Scenario(name='monitoring_dashboard', method='GET', path='/api/internal/monitoring/dashboard/', auth=True),
        Scenario(name='list_servicos', method='GET', path='/api/servicos/?ordering=-data_envio&search=urgente'),
    ]

    scenario_results: list[dict] = []
    all_latencies: list[float] = []
    total_success = 0
    total_requests = 0

    for scenario in scenarios:
        latencies_ms: list[float] = []
        success_count = 0
        status_counts: dict[str, int] = {}

        for _ in range(args.warmup):
            kwargs = auth_header if scenario.auth else {}
            if scenario.method == 'GET':
                client.get(scenario.path, **kwargs)
            else:
                client.post(scenario.path, scenario.payload or {}, format='json', **kwargs)

        for _ in range(args.iterations):
            kwargs = auth_header if scenario.auth else {}
            started = perf_counter()
            if scenario.method == 'GET':
                response = client.get(scenario.path, **kwargs)
            else:
                response = client.post(scenario.path, scenario.payload or {}, format='json', **kwargs)
            elapsed_ms = (perf_counter() - started) * 1000

            status_key = str(response.status_code)
            status_counts[status_key] = status_counts.get(status_key, 0) + 1
            latencies_ms.append(elapsed_ms)
            all_latencies.append(elapsed_ms)

            if 200 <= response.status_code < 400:
                success_count += 1

        total_success += success_count
        total_requests += len(latencies_ms)

        scenario_results.append(
            {
                'name': scenario.name,
                'requests': len(latencies_ms),
                'success_rate': (success_count / len(latencies_ms)) * 100 if latencies_ms else 0,
                'avg_ms': statistics.mean(latencies_ms) if latencies_ms else 0,
                'p95_ms': percentile(latencies_ms, 95),
                'p99_ms': percentile(latencies_ms, 99),
                'max_ms': max(latencies_ms) if latencies_ms else 0,
                'status_counts': status_counts,
            }
        )

    summary = {
        'total_requests': total_requests,
        'overall_success_rate': (total_success / total_requests) * 100 if total_requests else 0,
        'overall_avg_ms': statistics.mean(all_latencies) if all_latencies else 0,
        'overall_p95_ms': percentile(all_latencies, 95),
        'overall_p99_ms': percentile(all_latencies, 99),
    }

    result = {
        'generated_at': datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'),
        'settings_module': args.settings,
        'iterations': args.iterations,
        'warmup': args.warmup,
        'scenarios': scenario_results,
        'summary': summary,
    }

    output_dir = Path(args.output_dir)
    if not output_dir.is_absolute():
        output_dir = Path(__file__).resolve().parents[1] / output_dir
    output_dir.mkdir(parents=True, exist_ok=True)

    if args.keep_history:
        timestamp = datetime.now(timezone.utc).strftime('%Y%m%d-%H%M%S')
        json_path = output_dir / f'perf-smoke-{timestamp}.json'
        md_path = output_dir / f'perf-smoke-{timestamp}.md'
        json_path.write_text(json.dumps(result, indent=2), encoding='utf-8')
        md_path.write_text(build_markdown_report(result), encoding='utf-8')

    latest_json = output_dir / 'perf-smoke-latest.json'
    latest_md = output_dir / 'perf-smoke-latest.md'
    latest_json.write_text(json.dumps(result, indent=2), encoding='utf-8')
    latest_md.write_text(build_markdown_report(result), encoding='utf-8')

    print(f'Performance smoke report generated: {latest_md}')


if __name__ == '__main__':
    main()
