# TASK-M2-UX-FND-009 - KPIs de performance de frontend para dashboards

## Objetivo
Definir KPIs de performance de frontend para dashboards financeiros, com metas, monitoramento automatizado e alertas de desvio.

## KPIs definidos
1. `initial_load_ms`
- Definicao: tempo de carregamento inicial da pagina de dashboard (medido por Lighthouse em ambiente de medicao).
- Fonte: `frontend/build/lighthouse-summary.json`.

2. `interaction_ms`
- Definicao: tempo para interacao apos carregamento inicial.
- Fonte: `frontend/build/lighthouse-summary.json`.

3. `bundle_size_gzip_kb`
- Definicao: tamanho total em gzip dos arquivos JavaScript gerados no build.
- Fonte: `frontend/dist/assets`.

4. `performance_score`
- Definicao: score de performance (0-100) da medicao Lighthouse.
- Fonte: `frontend/build/lighthouse-summary.json`.

## Metas estabelecidas
- `initial_load_ms <= 2500`
- `interaction_ms <= 1500`
- `bundle_size_gzip_kb <= 260`
- `performance_score >= 85`

As metas podem ser sobrescritas por variaveis de ambiente:
- `KPI_TARGET_INITIAL_LOAD_MS`
- `KPI_TARGET_INTERACTION_MS`
- `KPI_TARGET_BUNDLE_SIZE_KB`
- `KPI_TARGET_PERFORMANCE_SCORE`

## Monitoramento configurado
Script implementado:
- `frontend/scripts/performance-kpi.mjs`

Responsabilidades do script:
- ler artefatos do build (`dist/assets`);
- ler baseline de Lighthouse (`build/lighthouse-summary.json`) quando disponivel;
- avaliar os quatro KPIs contra metas;
- gerar relatorio em:
  - `frontend/build/performance-kpi-report.json`
  - `frontend/build/performance-kpi-report.md`

## Alertas configurados
Status por KPI:
- `ok`: dentro da meta.
- `breach`: fora da meta (falha o processo com exit code 1).
- `missing`: dado de fonte nao encontrado (alerta no relatorio para completar coleta).

Regras de alerta:
- qualquer `breach` deve bloquear merge ate ajuste de performance ou revisao explicita da meta.
- `missing` deve abrir acao para coleta de Lighthouse no ciclo de medicao.

## Como executar
1. Build + monitoramento de KPI:
- `npm run perf:kpi`

2. Modo completo de checagem:
- `npm run perf:check`

## Criterios de aceite
- [x] KPIs de performance definidos
- [x] Metas estabelecidas
- [x] Monitoramento configurado
- [x] Alertas configurados
