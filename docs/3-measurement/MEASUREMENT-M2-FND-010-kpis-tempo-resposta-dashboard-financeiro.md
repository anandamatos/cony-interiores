# MEASUREMENT-M2-FND-010 - KPIs de Tempo de Resposta de Dashboards Financeiros

## Objetivo
Definir KPIs de tempo de resposta para os dashboards financeiros, com metas e alertas para proteger a experiencia do usuario.

## Monitoramento configurado
- Endpoint interno: `/api/internal/monitoring/dashboard/`
- Bloco de KPIs: `dashboard_response_kpis`
- Alertas por KPI: `dashboard_response_kpis.alerts`

## KPIs definidos e metas

| KPI | Definicao | Meta |
|---|---|---|
| `dashboard_load_ms` | Tempo medio para carregar dados do dashboard financeiro | <= 400 ms |
| `chart_response_ms` | Tempo medio de resposta para dados de graficos financeiros | <= 500 ms |
| `filter_apply_ms` | Tempo medio de aplicacao de filtros em listas/visoes financeiras | <= 350 ms |
| `export_response_ms` | Tempo medio para exportacao de dados financeiros | <= 1200 ms |

## Metas de p95 monitoradas
- `dashboard_load_p95_ms`
- `chart_response_p95_ms`
- `filter_apply_p95_ms`
- `export_response_p95_ms`

## Configuracao de alertas
- `FINANCIAL_DASHBOARD_TARGET_LOAD_MS=400`
- `FINANCIAL_DASHBOARD_TARGET_CHART_MS=500`
- `FINANCIAL_DASHBOARD_TARGET_FILTER_MS=350`
- `FINANCIAL_DASHBOARD_TARGET_EXPORT_MS=1200`

Status no dashboard:
- `ok`: KPI dentro da meta.
- `breach`: KPI fora da meta.

## Validacao executada
1. Teste automatizado valida presenca de `dashboard_response_kpis` e `alerts`.
2. Teste automatizado valida cenarios `breach` ao reduzir metas para 0 ms.
3. Suite de `monitoring.tests` executada com sucesso.

## Evidencias
- `backend/monitoring/metrics.py`
- `backend/monitoring/tests.py`
- `backend/config/settings.py`
- `backend/.env.example`
- `backend/monitoring/views.py`
