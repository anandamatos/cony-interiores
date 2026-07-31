# DISCOVERY-M1-FND-003 - Mapear necessidades de seguranca e variaveis de ambiente

## Objetivo

Mapear as necessidades de seguranca do backend/frontend e consolidar as variaveis de ambiente necessarias para operacao local, containers, CI e producao.

## Escopo desta analise

- Backend Django/DRF (configuracao, endpoints e container)
- Frontend Vite (proxy para API)
- Orquestracao local com Docker Compose
- Estrategia de segredos e configuracao por ambiente

## Fontes analisadas

- `backend/config/settings.py`
- `backend/.env.example`
- `backend/.env.docker.example`
- `backend/entrypoint.sh`
- `backend/Dockerfile`
- `infra/docker-compose.yml`
- `frontend/vite.config.js`
- `frontend/README.md`

## Inventario de variaveis de ambiente

| Variavel | Onde e usada | Obrigatoria | Sensibilidade | Default atual | Observacoes |
|---|---|---|---|---|---|
| `DJANGO_SECRET_KEY` | `backend/config/settings.py` | Sim (prod) | Alta (segredo) | Chave insegura hardcoded como fallback | Em producao, nao pode usar fallback. |
| `DJANGO_DEBUG` | `backend/config/settings.py` | Sim | Media | `True` | Deve ser `False` fora de dev. |
| `DJANGO_ALLOWED_HOSTS` | `backend/config/settings.py` | Sim (prod) | Baixa | `localhost,127.0.0.1` | Precisa incluir dominios oficiais no deploy. |
| `DJANGO_DATABASE` | `backend/config/settings.py` | Sim | Baixa | `sqlite` | Em container/producao deve ser `postgres`. |
| `POSTGRES_DB` | `backend/config/settings.py`, `infra/docker-compose.yml` | Sim (postgres) | Media | `projeto1` | Padrao aceitavel para dev. |
| `POSTGRES_USER` | `backend/config/settings.py`, `infra/docker-compose.yml` | Sim (postgres) | Media | `postgres` | Trocar em producao. |
| `POSTGRES_PASSWORD` | `backend/config/settings.py`, `infra/docker-compose.yml` | Sim (postgres) | Alta (segredo) | `postgres` | Nao usar default em producao. |
| `POSTGRES_HOST` | `backend/config/settings.py`, `infra/docker-compose.yml`, `backend/entrypoint.sh` | Sim (postgres) | Baixa | `127.0.0.1` (host) / `db` (compose) | Correto para cada contexto. |
| `POSTGRES_PORT` | `backend/config/settings.py`, `infra/docker-compose.yml`, `backend/entrypoint.sh` | Sim (postgres) | Baixa | `5432` | Sem risco relevante. |
| `POSTGRES_CONN_MAX_AGE` | `backend/config/settings.py` | Nao | Baixa | `60` | Ajustar por carga em producao. |
| `VITE_API_PROXY` | `frontend/vite.config.js` | Nao | Baixa | `http://127.0.0.1:8000` | Variavel de build/dev, nao guardar segredos. |

## Necessidades de seguranca mapeadas

1. Gestao de segredos
- Nao versionar `.env` real (ja coberto por `.gitignore` e `.dockerignore`).
- Eliminar fallback inseguro para `DJANGO_SECRET_KEY` em runtime de producao.
- Eliminar defaults fracos de `POSTGRES_PASSWORD` em runtime de producao.

2. Hardening de configuracao Django
- Garantir `DJANGO_DEBUG=False` em producao.
- Declarar hosts permitidos explicitamente via `DJANGO_ALLOWED_HOSTS`.
- Incluir configuracoes de cookie/HTTPS por ambiente:
  - `SESSION_COOKIE_SECURE=True`
  - `CSRF_COOKIE_SECURE=True`
  - `SECURE_SSL_REDIRECT=True` (quando houver TLS no proxy)
  - `SECURE_HSTS_SECONDS`, `SECURE_HSTS_INCLUDE_SUBDOMAINS`, `SECURE_HSTS_PRELOAD`
  - `CSRF_TRUSTED_ORIGINS` para dominio(s) oficiais

3. Superficie de ataque da API
- Endpoints atuais sao publicos (`/`, `/api/`, `/api/hello/`) e sem autenticacao.
- Definir estrategia de autenticacao/autorizacao antes de endpoints de negocio.
- Definir throttling/rate limit para reduzir abuso (DRF throttling).

4. Seguranca de container
- Container `api` roda como root no estado atual (`backend/Dockerfile`).
- Recomendado adicionar usuario nao-root e permissao minima.
- Em producao, evitar `runserver`; usar Gunicorn/Uvicorn com parametros de operacao.

5. Banco de dados e rede
- Porta 5432 exposta localmente no Compose e aceitavel para dev.
- Em producao, restringir exposicao de porta e acesso de rede.
- Definir politica de backup/restore para volume `postgres_data`.

## Lacunas atuais e risco

| Item | Nivel de risco | Estado atual | Acao recomendada |
|---|---|---|---|
| Fallback de `DJANGO_SECRET_KEY` inseguro | Alto | Presente em `settings.py` | Falhar startup em prod se ausente e remover fallback inseguro. |
| Defaults fracos de credencial Postgres | Alto | `postgres/postgres` como fallback | Exigir segredo forte em prod e validar no startup. |
| `DJANGO_DEBUG=True` nos exemplos | Medio | Presente em exemplos | Manter somente para dev e documentar explicitamente para prod. |
| Sem hardening HTTPS/cookies | Medio | Nao configurado | Introduzir flags de seguranca por ambiente. |
| API sem auth/throttling | Medio | Endpoints publicos | Definir baseline de auth e rate limit para proximos modulos. |
| Container API como root | Medio | Presente | Criar usuario nao-root no Dockerfile. |

## Matriz por ambiente

| Variavel | Dev local | Docker local | CI | Producao |
|---|---|---|---|---|
| `DJANGO_SECRET_KEY` | Pode usar valor local | Obrigatoria via `.env` | Obrigatoria via secret do pipeline | Obrigatoria via secret manager |
| `DJANGO_DEBUG` | `True` | `True`/`False` conforme teste | `False` preferencial | `False` obrigatorio |
| `DJANGO_ALLOWED_HOSTS` | localhost | localhost + host de teste | host de job/teste | dominio(s) oficiais |
| `DJANGO_DATABASE` | sqlite/postgres | postgres | sqlite ou postgres | postgres |
| `POSTGRES_*` | Opcional em sqlite | Obrigatorias | Obrigatorias quando usar postgres | Obrigatorias |
| `VITE_API_PROXY` | Opcional | Opcional | Opcional | Nao aplicavel (build especifico) |

## Recomendacoes de implementacao (proximos cards)

1. Criar `backend/.env.production.example` sem defaults inseguros.
2. Adicionar validacao de startup no Django para recusar configuracao insegura em producao.
3. Introduzir bloco de seguranca no `settings.py` controlado por env (SSL, cookies, HSTS, CSRF trusted origins).
4. Atualizar `backend/Dockerfile` para usuario nao-root.
5. Definir baseline DRF de autenticacao e throttling antes dos endpoints de negocio.
6. Adicionar checklist de seguranca no pipeline (lint de env + `manage.py check --deploy`).

## Criterios de aceite para encerrar o discovery

1. Variaveis de ambiente inventariadas com origem, sensibilidade e uso por ambiente.
2. Riscos de seguranca priorizados por severidade.
3. Plano de mitigacao com itens acionaveis para o proximo ciclo de delivery.
