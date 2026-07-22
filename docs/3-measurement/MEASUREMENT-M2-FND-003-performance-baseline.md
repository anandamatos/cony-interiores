# MEASUREMENT-M2-FND-003 - Performance Baseline

## Contexto
Metrica inicial gerada para TASK-M2-CORE-FND-003 com foco nos endpoints financeiros e operacionais do MVP 2.

## Configuracao de execucao
- Settings: `config.settings_sqlite`
- Warmup por cenario: 5
- Iteracoes medidas por cenario: 30
- Ferramenta: `backend/loadtests/collect_smoke_metrics.py`

## Resultado por cenario

| Cenario | Requests | Success % | Avg (ms) | P95 (ms) | P99 (ms) | Max (ms) |
|---|---:|---:|---:|---:|---:|---:|
| financial_health | 30 | 100.00 | 1.64 | 4.79 | 4.95 | 4.95 |
| simulate_payment | 30 | 100.00 | 1.55 | 3.20 | 3.33 | 3.33 |
| monitoring_dashboard | 30 | 100.00 | 2.11 | 2.68 | 3.07 | 3.07 |
| list_servicos | 30 | 100.00 | 2.28 | 4.05 | 6.46 | 6.46 |

## Consolidado
- Total requests: 120
- Overall success rate: 100.00%
- Overall average latency: 1.89 ms
- Overall p95 latency: 3.33 ms
- Overall p99 latency: 4.95 ms

## Analise
1. Baseline indica boa saude geral para carga de smoke.
2. Cenarios de dashboard/listagem exibem variancia maior no p99, devendo ser monitorados em testes concorrentes.
3. Recomendado escalar para Locust headless com perfis 20/50/100 usuarios para validar saturacao.

## Artefatos de origem
- `backend/loadtests/reports/perf-smoke-latest.md`
- `backend/loadtests/reports/perf-smoke-latest.json`
