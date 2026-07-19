# DISCOVERY-M2-FND-001 - Arquitetura de cache para dashboards financeiros

## Objetivo
Validar e definir uma arquitetura de cache para reduzir latencia dos dashboards financeiros sem comprometer consistencia operacional.

## Escopo validado
- Endpoint alvo: /api/internal/monitoring/dashboard/
- Fonte de dados: metricas de observabilidade da API financeira
- Ambiente: local (LocMem), homolog/producao (Redis recomendado)

## Opcoes avaliadas

| Opcao | Vantagens | Riscos | Veredito |
|---|---|---|---|
| Redis | Baixa latencia, TTL nativo, compartilhado entre instancias, boa observabilidade | Exige servico dedicado e monitoramento | Recomendado para producao |
| Memcached | Muito rapido para leitura e simples para cache de objetos | Menos recursos de observabilidade/persistencia | Opcional para workloads simples |
| LocMem | Zero dependencia externa e setup imediato | Nao compartilha cache entre replicas/processos | Recomendado apenas para desenvolvimento |

## Decisao arquitetural
1. Cachear snapshot agregado do dashboard financeiro em uma chave unica.
2. TTL padrao de 30 segundos para equilibrar frescor x desempenho.
3. Invalidação ativa em operacoes de escrita financeira (POST/PUT/PATCH/DELETE).
4. Backend de cache configuravel por variavel de ambiente:
   - FINANCIAL_DASHBOARD_CACHE_BACKEND=locmem|redis|memcached
   - FINANCIAL_DASHBOARD_CACHE_LOCATION=<url ou host:porta>

## O que sera cacheado
- Snapshot consolidado retornado por /api/internal/monitoring/dashboard/
- Campos de contexto por usuario (generated_for_user) sao adicionados apos leitura do cache.

## Estrategia de expiracao e invalidacao
- Expiracao por tempo: FINANCIAL_DASHBOARD_CACHE_TTL_SECONDS (default: 30)
- Invalidação por evento: escrita em endpoints /api/financial/* invalida chave do dashboard
- Controle por feature flags:
  - FINANCIAL_DASHBOARD_CACHE_ENABLED
  - FINANCIAL_DASHBOARD_CACHE_INVALIDATE_ON_WRITE

## Validacao tecnica entregue
- Teste automatizado de hit/miss do cache na API de dashboard.
- Teste automatizado de invalidação no middleware para escrita financeira.
- Cenarios de carga Locust atualizados para incluir leitura autenticada do dashboard:
  - /api/auth/token/
  - /api/internal/monitoring/dashboard/
  - /api/financial/payments/simulate/

## Recomendacoes de infraestrutura
1. Producao: Redis dedicado para cache financeiro com isolamento por DB/logical namespace.
2. Monitorar hit rate, latencia p95 e taxa de invalidação.
3. Iniciar com TTL 30s e ajustar entre 15s-60s conforme comportamento real.
4. Definir alertas para indisponibilidade do cache e fallback seguro para leitura direta.

## Riscos e mitigacoes
- Risco: stale data curta janela -> mitigado por TTL curto + invalidação em escrita.
- Risco: dependencia externa (Redis) -> mitigado por fallback de backend locmem configuravel.
- Risco: sobreinvalidação -> monitorar hit rate e ajustar regra por endpoint.

## Evidencias de implementacao
- backend/config/settings.py
- backend/monitoring/cache.py
- backend/monitoring/views.py
- backend/monitoring/middleware.py
- backend/monitoring/tests.py
- backend/loadtests/locustfile.py
- backend/.env.example
