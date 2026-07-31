# TASK-M2-UX-FND-010 - Metricas de carregamento de dashboards financeiros

## Objetivo
Definir metricas de carregamento para dashboards financeiros com metas, monitoramento continuo e alertas automaticos.

## Metricas definidas
1. `chart_load_ms`
- Definicao: tempo de carregamento dos graficos financeiros apos requisicao de dados.
- Meta: <= 500 ms.

2. `filter_apply_ms`
- Definicao: tempo de aplicacao de filtros na visao de dashboard.
- Meta: <= 350 ms.

3. `render_ms`
- Definicao: tempo de renderizacao de componentes principais do dashboard apos receber os dados.
- Meta: <= 900 ms.

4. `mobile_performance_score`
- Definicao: score de performance em perfil mobile.
- Meta: >= 80.

## Metas estabelecidas
As metas podem ser sobrescritas por variaveis de ambiente:
- `KPI_TARGET_CHART_LOAD_MS`
- `KPI_TARGET_FILTER_APPLY_MS`
- `KPI_TARGET_RENDER_MS`
- `KPI_TARGET_MOBILE_SCORE`

## Monitoramento configurado
Script implementado:
- `frontend/scripts/loading-metrics-monitor.mjs`

Fonte de dados:
- `frontend/build/loading-metrics-source.json`

Relatorios gerados automaticamente:
- `frontend/build/loading-metrics-report.json`
- `frontend/build/loading-metrics-report.md`

## Alertas configurados
Status por metrica:
- `ok`: metrica dentro da meta.
- `breach`: metrica fora da meta (retorna exit code 1).
- `missing`: dado ausente na fonte (mantem alerta visivel no relatorio).

Regras:
- qualquer `breach` deve bloquear validacao de qualidade.
- `missing` exige completar coleta para fechar baseline de medicao.

## Execucao
1. Rodar monitor de metricas de carregamento:
- `npm run perf:loading`

2. Rodar checagem consolidada de performance:
- `npm run perf:check`

## Dashboard de metricas
O dashboard de metricas e representado no relatorio Markdown gerado automaticamente em:
- `frontend/build/loading-metrics-report.md`

Esse artefato consolida valor atual, meta e status de cada metrica para revisao tecnica e UX.

## Criterios de aceite
- [x] Metricas de carregamento definidas
- [x] Metas estabelecidas
- [x] Monitoramento configurado
- [x] Alertas configurados
