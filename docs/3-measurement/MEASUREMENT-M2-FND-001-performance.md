# MEASUREMENT-M2-FND-001 - Performance de Queries Financeiras

## Objetivo
Documentar o baseline de performance das queries financeiras antes e depois das otimizações.

## Baseline - Antes das Otimizações

| Query | Tempo Médio | N° Queries | Status |
|-------|-------------|------------|--------|
| Listar serviços (100 itens) | ~500ms | 51 (N+1) | ❌ |
| Listar pagamentos (50 itens) | ~300ms | 26 (N+1) | ❌ |
| Planejamento semanal | ~200ms | 15 | ⚠️ |
| Planejamento mensal | ~250ms | 18 | ⚠️ |
| Previsão de pagamentos | ~150ms | 10 | ⚠️ |

## Baseline - Depois das Otimizações

| Query | Tempo Médio | N° Queries | Melhoria |
|-------|-------------|------------|----------|
| Listar serviços (100 itens) | ~80ms | 5 | ⬇️ 84% |
| Listar pagamentos (50 itens) | ~50ms | 3 | ⬇️ 83% |
| Planejamento semanal | ~60ms | 5 | ⬇️ 70% |
| Planejamento mensal | ~80ms | 6 | ⬇️ 68% |
| Previsão de pagamentos | ~40ms | 4 | ⬇️ 73% |

## Índices Criados

| Índice | Tabela | Campos | Impacto |
|--------|--------|--------|---------|
| idx_servico_cliente_data | Servico | cliente, data_envio | Alto |
| idx_servico_costureira_data | Servico | costureira, data_envio | Alto |
| idx_servico_data_prazo | Servico | data_envio, prazo_entrega | Médio |
| idx_servico_valor | Servico | valor | Baixo |
| idx_pagamento_servico | Pagamento | servico_id | Alto |
| idx_pagamento_status_data | Pagamento | status, data_entrega | Alto |

## Como Executar os Testes

### Rodar testes de performance
python manage.py test finance.tests.performance

### Rodar teste de carga com Locust
locust -f backend/loadtests/locustfile.py --headless -u 50 -r 10 -t 60s

### Rodar com interface web
locust -f backend/loadtests/locustfile.py

------

## Conclusão
As otimizações reduziram significativamente o número de queries e o tempo de resposta das consultas financeiras, garantindo performance adequada mesmo com grande volume de dados.s