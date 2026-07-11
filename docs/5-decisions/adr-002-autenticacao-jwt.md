# ADR-002: Decisões de Discovery — Frontend React e Autenticação JWT

**Data:** 2026-07-08  
**Status:** Aprovado  
**Responsável:** @lobaque29  
**Épico:** EPIC-M1-FND-001  

---

## DISCOVERY-M1-FND-007: Estrutura de Componentes

**Decisão:** Adotar Atomic Design com 4 níveis: átomos, moléculas, organismos e templates.  
**Estrutura:**
```
src/components/
├── atoms/       # Button, Input, Badge, Card, Typography, Select
├── molecules/   # SearchBar, FormField, AlertCard
├── organisms/   # Header, Sidebar, DataTable
└── templates/   # PageLayout, AuthLayout
```
**Justificativa:** Facilita reuso, manutenção e escalabilidade do design system.

---

## DISCOVERY-M1-FND-008: Performance (Lazy Loading)

**Decisão:** Usar `React.lazy()` + `Suspense` para carregamento sob demanda de páginas.  
**Implementação:** Todas as páginas em `src/pages/` devem ser importadas com `lazy()` no `App.jsx`.  
**Justificativa:** Reduz bundle inicial e melhora tempo de carregamento.

---

## DISCOVERY-M1-FND-009: Configuração de API (Axios)

**Decisão:** Instância centralizada em `src/services/api.js` com:
- `baseURL: '/api'` (proxiado pelo Vite para o backend)
- Interceptor de request: injeta JWT no header `Authorization` a partir do `localStorage`
- Interceptor de response: tenta refresh automático em respostas 401  
**Justificativa:** Centraliza lógica de autenticação e evita duplicação.

---

## DISCOVERY-M1-FND-010: Padrões de Código (ESLint)

**Decisão:** ESLint 9 + Prettier + Husky (pre-commit hook via lint-staged).  
**Regras:** Configuração padrão para React + React Hooks (eslint.config.mjs já existente).  
**Husky:** Executa `lint-staged` antes de cada commit, bloqueando commits com erros de lint.

---

## DISCOVERY-M1-FND-011: Estratégia de Autenticação (JWT)

**Decisão:** JWT com `djangorestframework-simplejwt`.  
**Configuração:**
- Access token: 60 minutos de validade
- Refresh token: 7 dias de validade
- Rotação de refresh tokens habilitada (`ROTATE_REFRESH_TOKENS=True`)
- Blacklist após rotação habilitada (`BLACKLIST_AFTER_ROTATION=True`)  
**Justificativa:** Stateless, escalável, sem necessidade de sessão no servidor.

---

## DISCOVERY-M1-FND-012: Permissões por Perfil

**Decisão:** Usar `DEFAULT_PERMISSION_CLASSES = IsAuthenticated` globalmente.  
**Exceções públicas:** Endpoints de health-check (`/api/`, `/api/hello/`) usam `@permission_classes([AllowAny])`.  
**Perfis futuros:** Usar `ModelPermissions` ou permissões customizadas quando houver múltiplos perfis.

---

## DISCOVERY-M1-FND-013: Endpoints que Precisam de Proteção

**Protegidos (requerem JWT):**
- `POST /api/auth/token/logout/`
- Todos os endpoints de CRUD (serviços, costureiras) — a serem implementados

**Públicos (AllowAny):**
- `GET /api/` — health check
- `GET /api/hello/` — health check
- `POST /api/auth/token/` — obter token
- `POST /api/auth/token/refresh/` — renovar token

---

## DISCOVERY-M1-FND-014: Política de Refresh Token

**Decisão:**
- Frontend tenta refresh automático via interceptor Axios na primeira resposta 401
- Refresh token rotativo: a cada refresh, um novo refresh token é emitido e o antigo é invalidado
- Refresh expirado ou inválido → redirect para `/login` e limpeza do `localStorage`

---

## DISCOVERY-M1-FND-015: Estratégia de Logout

**Decisão:**
- Chamar `POST /api/auth/token/logout/` com o refresh token atual para adicioná-lo à blacklist
- Remover `token` e `refreshToken` do `localStorage`
- Redirecionar para `/login`  
**Implementação:** `frontend/src/services/authService.js` → função `logout()`
