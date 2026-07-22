# Performance Test Environment

This folder contains the baseline load and smoke performance setup for TASK-M2-CORE-FND-003.

## Tools

- Locust (`locustfile.py`) for load profile and concurrency scenarios.
- `collect_smoke_metrics.py` for repeatable endpoint latency collection inside Django test environment.

## Scenarios Covered

- `GET /api/financial/health/`
- `POST /api/financial/payments/simulate/`
- `GET /api/internal/monitoring/dashboard/` (JWT)
- `GET /api/servicos/?ordering=-data_envio&search=<term>`

## How To Run (Smoke Metrics)

From `backend/`:

```bash
python loadtests/collect_smoke_metrics.py --settings config.settings_sqlite --iterations 40 --warmup 5
```

Output files:

- `loadtests/reports/perf-smoke-latest.json`
- `loadtests/reports/perf-smoke-latest.md`
- timestamped report files under the same folder

## How To Run (Locust)

Interactive UI:

```bash
locust -f loadtests/locustfile.py --host http://localhost:8000
```

Headless example:

```bash
locust -f loadtests/locustfile.py --headless --users 40 --spawn-rate 5 --run-time 2m --host http://localhost:8000 --csv loadtests/reports/locust-financial --only-summary
```

## Metrics To Track

- Success rate
- Requests per second
- Average latency
- P95 latency
- P99 latency
- Error rate by endpoint

## Suggested Baselines (MVP2)

- Success rate >= 99.0%
- P95 <= 300 ms for health/service list
- P95 <= 500 ms for simulate payment
- P99 <= 900 ms for protected dashboard
