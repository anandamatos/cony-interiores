# Measurement — EPIC-M1-FND-001: Infraestrutura e Base Técnica

**Data:** 2026-07-08  
**Responsável:** @lobaque29  
**Épico:** EPIC-M1-FND-001  

---

## MEASUREMENT-M1-FND-001: KPIs de Infraestrutura

| KPI | Meta | Ferramenta |
|-----|------|-----------|
| Uptime do ambiente Docker | ≥ 99% em desenvolvimento | Docker Health Check |
| Tempo de build do container | < 3 minutos | GitHub Actions logs |
| Containers saudáveis no startup | 100% (backend + frontend + db) | docker-compose ps |

---

## MEASUREMENT-M1-FND-002: Baseline de Performance

| Métrica | Baseline Atual | Meta |
|---------|---------------|------|
| Tempo de resposta `GET /api/` | < 100ms | < 50ms |
| Tempo de resposta `POST /api/auth/token/` | < 300ms | < 200ms |
| Tempo de startup do Django | < 5s | < 3s |

---

## MEASUREMENT-M1-FND-003: Métricas de Tempo de Setup

| Etapa | Tempo esperado |
|-------|---------------|
| Clone + `docker-compose up` | < 10 minutos |
| Setup manual (sem Docker) | < 20 minutos |
| Onboarding de novo dev | < 30 minutos |

---

## MEASUREMENT-M1-FND-004: Cobertura Mínima de Testes

| Camada | Cobertura Mínima |
|--------|-----------------|
| Models | 80% |
| Views / API endpoints | 70% |
| Autenticação (JWT) | 90% |
| Geral | ≥ 70% |

Ferramenta: `coverage.py` + `pytest-django`

---

## MEASUREMENT-M1-FND-005: KPIs de Performance Frontend

| KPI | Meta |
|-----|------|
| Largest Contentful Paint (LCP) | < 2.5s |
| First Input Delay (FID) | < 100ms |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Time to Interactive (TTI) | < 3.8s |

Ferramenta: Lighthouse CI

---

## MEASUREMENT-M1-FND-006: Baseline de Carregamento

| Página | Meta de carregamento |
|--------|---------------------|
| Dashboard | < 1.5s |
| Lista de Serviços | < 1s |
| Formulário de Cadastro | < 1s |

---

## MEASUREMENT-M1-FND-007: Métricas de Bundle Size

| Bundle | Tamanho máximo |
|--------|---------------|
| Bundle inicial (JS) | < 300 KB (gzipped) |
| Bundle inicial (CSS) | < 50 KB (gzipped) |
| Vendor chunk | < 200 KB (gzipped) |

Ferramenta: `vite build --report` + `rollup-plugin-visualizer`

---

## MEASUREMENT-M1-FND-008: Padrões de Acessibilidade

| Padrão | Meta |
|--------|------|
| WCAG AA | Conformidade total |
| Score Lighthouse Acessibilidade | ≥ 90 |
| Navegação por teclado | 100% das páginas |
| Contraste de cores | ≥ 4.5:1 |

---

## MEASUREMENT-M1-FND-009: KPIs de Segurança

| KPI | Meta |
|-----|------|
| Vulnerabilidades críticas (npm audit) | 0 |
| Vulnerabilidades críticas (pip audit) | 0 |
| Endpoints públicos expostos sem intenção | 0 |
| Headers de segurança presentes | 100% |

---

## MEASUREMENT-M1-FND-010: Tempo de Resposta com JWT

| Operação | Meta |
|---------|------|
| Obter token (`POST /api/auth/token/`) | < 300ms |
| Refresh token (`POST /api/auth/token/refresh/`) | < 150ms |
| Requisição autenticada com JWT | overhead < 10ms |

---

## MEASUREMENT-M1-FND-011: Métricas de Tentativas de Acesso

| Métrica | Ação |
|---------|------|
| > 5 tentativas de login falhas por IP/min | Log de alerta |
| Token expirado | Refresh automático, log de evento |
| Refresh token inválido | Logout + log de segurança |

Ferramenta: Django logging estruturado (já configurado)

---

## MEASUREMENT-M1-FND-012: Cobertura de Testes de Segurança

| Cenário | Status |
|---------|--------|
| Login com credenciais válidas | ✅ Coberto |
| Login com credenciais inválidas | ✅ Coberto |
| Refresh token válido | ✅ Coberto |
| Logout (blacklist) | ✅ Coberto |
| Endpoint público sem token | ✅ Coberto |
| Acesso protegido sem token | ✅ Coberto |
| Refresh token expirado | A implementar |
| Acesso com token manipulado | A implementar |

Cobertura atual: **75%** → Meta: **≥ 90%**
