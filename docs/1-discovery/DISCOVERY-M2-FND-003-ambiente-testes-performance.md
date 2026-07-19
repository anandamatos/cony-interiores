# DISCOVERY-M2-FND-003 - Ambiente de testes de performance

## Objetivo
Configurar e validar um ambiente de testes de performance para medir escalabilidade dos fluxos financeiros e operacionais do MVP 2.

## Critérios de aceite atendidos
- [x] Ambiente de testes configurado
- [x] Scripts de carga criados
- [x] Métricas de performance coletadas
- [x] Relatório de performance gerado

## Ferramentas avaliadas

| Ferramenta | Uso no projeto | Decisao |
|---|---|---|
| Locust | Carga concorrente e cenarios headless/UI | Adotada |
| Django APIClient + script smoke | Baseline rapido reproduzivel no CI/local | Adotada |
| Dashboard interno de monitoramento | Correlacao de alertas de latencia | Mantido |

## Ambiente configurado
- Pasta de carga dedicada: `backend/loadtests/`
- Script de carga principal: `backend/loadtests/locustfile.py`
- Script de coleta automatica: `backend/loadtests/collect_smoke_metrics.py`
- Guia de execucao: `backend/loadtests/README.md`
- Saida de relatorios: `backend/loadtests/reports/`

## Cenarios de teste definidos
1. `GET /api/financial/health/`
2. `POST /api/financial/payments/simulate/`
3. `GET /api/internal/monitoring/dashboard/` (JWT)
4. `GET /api/servicos/?ordering=-data_envio&search=<term>`

## Metricas coletadas
- Success rate
- Tempo medio de resposta (avg)
- P95
- P99
- Tempo maximo
- Distribuicao de status HTTP por cenario

## Resultado baseline (smoke)
Fonte: `backend/loadtests/reports/perf-smoke-latest.md`

- Total requests: 120
- Success rate global: 100.00%
- Latencia media global: 2.27 ms
- P95 global: 3.26 ms
- P99 global: 37.61 ms

## Analise resumida
- Fluxos criticos responderam com 100% de sucesso no baseline.
- P95 baixo indica boa estabilidade para carga leve/moderada no ambiente local.
- P99 mais alto nos cenarios de dashboard/listagem sugere pontos de variancia que devem ser monitorados sob concorrencia maior.

## Plano de execucao continuo
1. Rodar smoke a cada mudanca de infraestrutura/performance.
2. Rodar Locust headless em homologacao com usuarios concorrentes progressivos.
3. Capturar series de p95/p99 e throughput por release.
4. Reavaliar limites de alerta (`FINANCIAL_API_ALERT_THRESHOLD_MS`) com dados de homologacao.

## Evidencias
- `backend/loadtests/locustfile.py`
- `backend/loadtests/collect_smoke_metrics.py`
- `backend/loadtests/README.md`
- `backend/loadtests/reports/perf-smoke-latest.md`
- `backend/loadtests/reports/perf-smoke-latest.json`
