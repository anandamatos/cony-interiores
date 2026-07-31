# TASK-M2-UX-FND-003 - Integracao com APIs de UX para dashboards financeiros

## Objetivo
Validar e padronizar a integracao das APIs usadas pelos dashboards financeiros, com foco em fluxo de dados, tratamento de erros e consistencia de consumo no frontend.

## Endpoints necessarios mapeados
- `GET /api/financial/health/`
  - Uso UX: status rapido de disponibilidade da API financeira.
  - Autenticacao: publica.
- `POST /api/financial/payments/simulate/`
  - Uso UX: simulacao de pagamento e exibicao de valores liquidos/taxa.
  - Autenticacao: JWT obrigatorio.
- `GET /api/internal/monitoring/dashboard/`
  - Uso UX: indicadores operacionais para dashboards internos.
  - Autenticacao: usuario admin.

## Formato de dados validado
### Health
Entrada: sem payload.
Saida esperada:
- `service` (string)
- `status` (string)

View model frontend:
- `service`
- `status`
- `isHealthy` (boolean)

### Payment simulation
Entrada esperada:
- `amount` (number)
- `fee_rate` (number, opcional)
- `currency` (string, opcional)
- `provider` (string, opcional)

Saida esperada:
- `amount` (string decimal)
- `fee_rate` (string decimal)
- `fee_amount` (string decimal)
- `net_amount` (string decimal)
- `currency` (string)
- `provider` (string)

View model frontend:
- normalizacao para `number` em campos numericos
- defaults defensivos para `currency` e `provider`

### Monitoring dashboard
Saida esperada (resumo):
- `total_requests`
- `financial_requests`
- `financial_error_requests`
- `p95_latency_ms`
- `financial_alert_threshold_ms`
- `generated_for_user`

View model frontend:
- normalizacao para camelCase
- defaults numericos em `0` para evitar quebra de render

## Tratamento de erros definido
Padrao centralizado na camada de servico frontend:
- timeout (`ECONNABORTED`) -> mensagem clara de tempo limite
- 400 -> detalhamento de payload invalido
- 401 -> autenticacao necessaria
- 403 -> permissao insuficiente
- 5xx -> indisponibilidade temporaria
- falha de rede -> indisponibilidade de conexao

## Fluxo de dados definido
1. Pagina chama funcao do servico UX financeiro.
2. Servico usa cliente HTTP padrao (`api.js`) com JWT no interceptor.
3. Resposta bruta da API e convertida para view model estavel.
4. Erros sao normalizados para mensagens de UX previsiveis.
5. Componente renderiza estado de sucesso, loading ou erro sem fallback silencioso.

## Implementacao validada
Arquivos alterados:
- `frontend/src/services/financialUxService.js`
- `frontend/src/pages/Dashboard/index.jsx`

Resumo:
- criada camada dedicada para integracao financeira com normalizacao de dados;
- dashboard principal passou a validar health da API financeira e exibir estado;
- tratamento de erros padronizado para cenarios de auth, validacao, timeout e rede.

## Performance da integracao
- endpoint de health e leve e adequado para verificacao inicial do frontend;
- chamadas protegidas permanecem sob demanda (nao disparadas no bootstrap sem necessidade);
- timeout herdado do cliente global evita requests pendentes por tempo indefinido.

## Criterios de aceite
- [x] Integracao com APIs validada
- [x] Fluxo de dados definido
- [x] Tratamento de erros definido
- [x] Documentacao atualizada
