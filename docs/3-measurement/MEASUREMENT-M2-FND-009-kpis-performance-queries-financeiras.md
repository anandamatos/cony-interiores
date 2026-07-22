# MEASUREMENT-M2-FND-009 - KPIs de Performance de Queries Financeiras

## Objetivo
Definir KPIs, metas e alertas para monitorar performance de consultas financeiras e operacionais do MVP 2.

## Dashboard configurado
Fonte de monitoramento interno:
- Endpoint: `/api/internal/monitoring/dashboard/`
- Bloco de KPI: `query_kpis`
- Alertas por KPI: `query_kpis.alerts`

## KPIs definidos e metas

| KPI | Definicao | Meta |
|---|---|---|
| `avg_response_ms` | Tempo medio de resposta de consultas financeiras/servicos | <= 150 ms |
| `p95_response_ms` | Percentil 95 de latencia das consultas monitoradas | <= 300 ms |
| `slow_query_percent` | Percentual de consultas acima do limiar de lentidao | <= 5% |
| `index_usage_percent` | Cobertura de uso de indice planejada para queries criticas | >= 90% |
| `resource_cpu_percent` | Uso de CPU para workload monitorado | <= 80% |
| `resource_memory_mb` | Memoria consumida no workload monitorado | <= 1024 MB |

## Parametros de alerta configurados
- `FINANCIAL_QUERY_SLOW_THRESHOLD_MS=120`
- `FINANCIAL_QUERY_TARGET_AVG_MS=150`
- `FINANCIAL_QUERY_TARGET_P95_MS=300`
- `FINANCIAL_QUERY_TARGET_SLOW_PERCENT=5`
- `FINANCIAL_QUERY_TARGET_INDEX_USAGE_PERCENT=90`
- `FINANCIAL_QUERY_TARGET_CPU_PERCENT=80`
- `FINANCIAL_QUERY_TARGET_MEMORY_MB=1024`

## Regras de status no dashboard
- `ok`: KPI dentro da meta.
- `breach`: KPI fora da meta.

## Validacao executada
1. Teste automatizado confirma presenca de `query_kpis` e `alerts` no dashboard.
2. Teste automatizado valida `breach` para `slow_query_percent` em cenario com lentidao forçada.
3. Teste de regressao de monitoramento passou com os KPIs novos.

## Evidencias
- `backend/monitoring/metrics.py`
- `backend/monitoring/tests.py`
- `backend/config/settings.py`
- `backend/.env.example`
- `backend/monitoring/views.py`
