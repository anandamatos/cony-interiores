# DISCOVERY-M2-FND-002 - Estrategia de otimizacao de queries financeiras

## Objetivo
Definir uma estrategia de otimizacao para consultas financeiras e operacionais com foco em escalabilidade, baixo tempo de resposta e previsibilidade de custo.

## Escopo avaliado
- Endpoint de listagem de servicos: `/api/servicos/`
- Filtros e ordenacao usados por telas de planejamento/financeiro
- Dashboard interno de monitoramento: `/api/internal/monitoring/dashboard/`
- Persistencia relacional no app `users` (modelo `Servico`)

## Queries criticas identificadas
1. Listagem de servicos com join em cliente/costureira e relacao many-to-many com produto.
2. Filtros por `cliente`, `costureira`, `data_envio` e `prazo_entrega`.
3. Ordenacao por `data_envio`, `valor` e `complexidade`.
4. Busca textual por `cliente__nome` e `observacoes`.

## Estrategia definida
1. Eliminar N+1 na serializacao de servicos:
   - `select_related('cliente', 'costureira')`
   - `prefetch_related('produto')`
2. Aplicar indices para o padrao real de consulta:
   - `Servico(costureira, data_envio)`
   - `Servico(cliente, data_envio)`
   - `Servico(prazo_entrega)`
   - `Servico(valor)`
   - `Servico(complexidade)`
   - `Costureira(ativo)`
   - `Costureira(tipo_servico_preferido)`
3. Validar limite de consultas com teste automatizado no endpoint.
4. Validar comportamento sob carga com Locust.

## Indices sugeridos e validados
- Indices implementados via migration:
  - `idx_serv_cost_data`
  - `idx_serv_cli_data`
  - `idx_serv_prazo`
  - `idx_serv_valor`
  - `idx_serv_complex`
  - `idx_costureira_ativo`
  - `idx_costureira_tipo`

## Plano de execucao
1. Aplicar migration de indices no banco de homologacao.
2. Executar suite de testes (`users.tests` e `monitoring.tests`).
3. Rodar Locust com cenario de listagem de servicos e monitorar latencia p95.
4. Comparar baseline pre e pos-migration.

## Estrategia de monitoramento
- KPI 1: latencia p95 de `GET /api/servicos/`
- KPI 2: numero medio de queries por request no endpoint de listagem
- KPI 3: hit rate de cache do dashboard interno
- KPI 4: tempo de resposta de consultas filtradas por costureira e periodo

## Testes de performance realizados
- Teste automatizado de limite de queries no endpoint de servicos.
- Cenario de carga Locust atualizado com task de listagem de servicos.
- Observabilidade de API financeira e dashboard mantida para correlacao de latencia.

## Recomendacoes de infraestrutura
1. Producoes com maior volume: PostgreSQL com analise periodica de `EXPLAIN ANALYZE`.
2. Revisar bloat e estatisticas com `VACUUM ANALYZE` recorrente.
3. Para crescimento de historico, avaliar particionamento por periodo (`data_envio`).
4. Definir alarmes para p95 > meta e queda de throughput.

## Evidencias de implementacao
- `backend/users/views.py`
- `backend/users/models.py`
- `backend/users/migrations/0003_financial_query_indexes.py`
- `backend/users/tests.py`
- `backend/loadtests/locustfile.py`
