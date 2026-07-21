# STORY-M1-UX-MEAS-001 - KPIs de Eficiência - Formulários MVP1

**Data de Criação:** 19/07/2026
**Versão:** 1.0
**Responsável:** @anandamatos
**Status:** ⚠️ Aguardando Validação com Time e Cliente

---

## 🎯 Objetivo

Definir métricas objetivas de eficiência para os formulários do MVP1, permitindo medir a qualidade da experiência do usuário e identificar pontos de melhoria.

---

## 📋 Formulários Mapeados

Com base na análise do código fonte do MVP1, **apenas 2 formulários reais e funcionais** foram identificados:

| Formulário | Local no Código | Campos Obrigatórios |
|------------|-----------------|---------------------|
| **Cadastro de Serviço** | `frontend/src/pages/NewService/index.jsx` | cliente, costureira, produto, quantidade, valor, dataEnvio, prazoEntrega |
| **Cadastro de Costureira** | `frontend/src/pages/Seamstresses/NewSeamstress.jsx` | nome, contato |

---

## 📊 KPIs Propostos

### 1. Cadastro de Serviço

| Métrica | Valor Alvo (Hipotético) | Tolerância | Fonte |
|---------|-------------------------|------------|-------|
| **Tempo de Preenchimento** | ≤ 5 minutos | ± 1 min | `STORY-M1-UX-001-kpis-usabilidade.md` |
| **Taxa de Erro** | ≤ 10% | ± 3% | `STORY-M1-UX-001-kpis-usabilidade.md` |
| **Taxa de Abandono** | ≤ 20% | ± 5% | `STORY-M1-UX-001-metricas-navegacao.md` |

**Campos Críticos para Erro:**
- `cliente` (seleção obrigatória)
- `costureira` (seleção obrigatória)
- `produto` (seleção obrigatória)
- `valor` (formato numérico válido)
- `dataEnvio` e `prazoEntrega` (formato de data válido)

---

### 2. Cadastro de Costureira

| Métrica | Valor Alvo (Hipotético) | Tolerância | Fonte |
|---------|-------------------------|------------|-------|
| **Tempo de Preenchimento** | ≤ 3 minutos | ± 30s | `STORY-M1-UX-001-kpis-usabilidade.md` |
| **Taxa de Erro** | ≤ 5% | ± 2% | `STORY-M1-UX-001-kpis-usabilidade.md` |
| **Taxa de Abandono** | ≤ 10% | ± 3% | `STORY-M1-UX-001-metricas-navegacao.md` |

**Campos Críticos para Erro:**
- `nome` (campo obrigatório)
- `contato` (formato de e-mail/telefone válido)

---

## 🔍 Metodologia de Coleta

| Métrica | Método de Coleta | Ferramenta Sugerida |
|---------|------------------|---------------------|
| **Tempo de Preenchimento** | Teste de usabilidade moderado (cronometrado) | Planilha / Observação manual (MVP1) |
| **Taxa de Erro** | Teste de usabilidade + Validação client-side | Console/Log do navegador |
| **Taxa de Abandono** | Analítica de eventos (futuro) | PostHog / Google Analytics (a implementar) |

---

## 📌 Pendências e Próximos Passos

| Item | Status | Responsável | Prazo |
|------|--------|-------------|-------|
| Validar KPIs com time (Design Review) | ⏳ Pendente | @anandamatos | 21/07/2026 |
| Validar KPIs com cliente | ⏳ Pendente | @anandamatos | 23/07/2026 |
| Implementar coleta de dados | ⏳ Pendente | Time de Core | MVP2 |
| Refinar metas após coleta inicial | ⏳ Pendente | @anandamatos | Pós-MVP1 |

---

## 🔗 Referências

- `docs/3-measurement/STORY-M1-UX-001-kpis-usabilidade.md`
- `docs/3-measurement/STORY-M1-UX-001-metricas-navegacao.md`
- `docs/3-measurement/STORY-M1-UX-001-plano-testes-ux.md`
- `frontend/src/pages/NewService/index.jsx`
- `frontend/src/pages/Seamstresses/NewSeamstress.jsx`