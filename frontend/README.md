# Frontend - Cony Interiores

Frontend em React com Vite.

## Requisitos

- Node.js 18+
- npm 9+

## Instalar dependencias

```bash
npm install
```

## Rodar local (sem Docker)

```bash
npm run dev
```

Aplicacao disponivel em http://127.0.0.1:5173.

## Rodar com Docker (stack completa)

Na raiz do projeto:

```bash
docker compose -f infra/docker-compose.yml up --build
```

## Scripts uteis

```bash
npm run build
npm run preview
npm test
```

## Integracao com backend

O proxy de /api pode ser configurado com a variavel `VITE_API_PROXY`.

Tambem e possivel configurar timeout de requisicao via `VITE_API_TIMEOUT_MS`.

- Padrao (sem variavel): `http://127.0.0.1:8000`
- Exemplo para Docker: `http://api:8000`
- Timeout padrao: `10000` ms

Exemplo no Windows PowerShell:

```powershell
$env:VITE_API_PROXY="http://api:8000"
npm run dev
```

Exemplo em bash:

```bash
VITE_API_PROXY=http://api:8000 npm run dev
```

## Seguranca no frontend

- O cliente de API valida o path para evitar chamadas fora do prefixo `/api`.
- As requisicoes usam timeout configuravel para reduzir conexoes penduradas.
- O `index.html` inclui politicas basicas de CSP, referrer e permissions policy.
