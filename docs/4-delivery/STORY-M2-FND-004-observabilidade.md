# STORY-M2-FND-004 - Observabilidade da API Financeira

## Objetivo
Evoluir a observabilidade da API financeira com foco em segurança operacional, contrato OpenAPI consistente e robustez de monitoramento.

## Entregas
- Restricao do dashboard interno de monitoramento para usuarios staff.
- Middleware atualizado para registrar metricas e logs tambem em cenarios de excecao (status 500).
- Controle de `simulate_delay_ms` no endpoint financeiro com suporte a configuracao via ambiente.
- Rotas de OpenAPI/Swagger e autenticacao JWT Bearer expostas no roteamento principal.
- Testes de monitoramento ampliados para cobrirem acesso staff e excecoes no middleware.

## Arquivos Alterados
- `backend/.env.example`
- `backend/config/settings.py`
- `backend/config/urls.py`
- `backend/finance/views.py`
- `backend/monitoring/middleware.py`
- `backend/monitoring/tests.py`
- `backend/monitoring/views.py`

## Validacao Executada
- `manage.py check`: OK
- Testes backend: 17/17 OK
- OpenAPI com BearerAuth: OK
- Frontend lint: OK (warnings nao bloqueantes)
- Frontend build: OK

## Observacoes
- Lint do frontend apresenta warnings de acessibilidade e variaveis nao usadas sem erro bloqueante de build.
