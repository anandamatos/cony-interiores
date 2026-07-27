# TASK-M2-FND-006 ate TASK-M2-FND-010

## Escopo implementado

- Logging estruturado para APIs financeiras via JSON (`financial_api` logger).
- Alertas de performance com threshold configuravel por variavel de ambiente.
- Dashboard interno de monitoramento com metricas em memoria.
- Documentacao da API financeira em OpenAPI + Swagger UI.
- Teste de carga para endpoints financeiros via Locust.

## Variaveis de ambiente

- `FINANCIAL_API_ALERT_THRESHOLD_MS` (padrao: `800`): latencia minima para gerar alerta.
- `DJANGO_LOG_LEVEL` (padrao: `INFO`): nivel global de logs.
- `FINANCIAL_API_LOG_LEVEL` (padrao: `INFO`): nivel de logs financeiros.
- `MONITORING_LOG_LEVEL` (padrao: `INFO`): nivel de logs de monitoramento.

## Endpoints novos

- `GET /api/financial/health/`
- `POST /api/financial/payments/simulate/`
- `GET /api/internal/monitoring/dashboard/` (JWT obrigatorio)
- `GET /api/docs/openapi.json`
- `GET /api/docs/swagger/`

## Como validar rapidamente

1. Rodar backend:

```bash
python manage.py runserver
```

2. Simular pagamento:

```bash
curl -X POST http://localhost:8000/api/financial/payments/simulate/ \
  -H "Content-Type: application/json" \
  -d '{"amount": 120.50, "fee_rate": 0.03, "currency": "BRL"}'
```

3. Acessar Swagger:

- `http://localhost:8000/api/docs/swagger/`

4. Teste de carga com Locust:

```bash
locust -f loadtests/locustfile.py --host http://localhost:8000
```

5. Dashboard interno:

- Obter token em `/api/auth/token/`
- Chamar `/api/internal/monitoring/dashboard/` com `Authorization: Bearer <token>`

## Observacoes

- As metricas estao em memoria de processo e reiniciam quando o backend reinicia.
- O middleware adiciona `X-Request-ID` em todas as respostas para rastreabilidade.
