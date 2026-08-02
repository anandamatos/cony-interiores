# [EPIC-M5-ALL-001] Sprint 7 (W31) - Relatorio Consolidado e Planejamento Integrado

## 1. Objetivo deste documento

Consolidar, em um unico artefato, o estado atual e o planejamento de execucao da sprint do epico **EPIC-M5-ALL-001 (Otimizacao e Ajustes Finais)**, cobrindo:

- Discovery (lideranca)
- Mensuracao (lideranca)
- Delivery (plano detalhado das 3 stories)

Escopo desta sprint: usabilidade, performance, acessibilidade (WCAG 2.1 AA), correcao de bugs, documentacao e testes de carga.

---

## 2. Fontes utilizadas (estado atual)

### Planejamento macro
- `docs/2-planning/planing-global.md` (Sprint 7 / MVP 5)

### Discovery e measurement ja produzidos (base tecnica)
- `docs/1-discovery/DISCOVERY-M2-FND-003-ambiente-testes-performance.md`
- `docs/1-discovery/TASK-M2-UX-FND-002-padroes-performance-frontend-dashboards.md`
- `docs/3-measurement/MEASUREMENT-M2-FND-001-performance.md`
- `docs/3-measurement/MEASUREMENT-M2-FND-003-performance-baseline.md`
- `docs/3-measurement/MEASUREMENT-M2-FND-009-kpis-performance-queries-financeiras.md`
- `docs/3-measurement/MEASUREMENT-M2-FND-010-kpis-tempo-resposta-dashboard-financeiro.md`
- `backend/docs/TASK-M2-FND-006-010-observability.md`

### Base de acessibilidade e UX
- `docs/3-backlog/M1-UX-accessibility-plan.md`
- `docs/3-backlog/DISCOVERY-M1-UX-007-03-audit-acessibilidade.md`

### Story de referencia operacional
- `docs/4-delivery/STORY-M2-FND-004-observabilidade.md`

### Insumo recente (nao sera mergeado agora)
- PR #311: `feat@all: [EPIC-M5-ALL-001] - Acessibilidade WCAG 2.1 AA, correcoes de bugs e usabilidade`

---

## 3. Relatorio situacional (as-is) para o DoD do epico

| DoD do Epico | Situacao Atual | Evidencias atuais | Gap para fechamento M5 |
|---|---|---|---|
| Melhorias de usabilidade | Parcial | PR #311 cobre parte importante (404 acessivel, feedbacks de login, loading states melhores) | Falta consolidar UX de fluxos criticos e validacao com usuaria final |
| Otimizacao de performance | Parcial/Boa base | Baselines e KPIs de backend/frontend ja documentados; scripts de perf disponiveis | Falta amarrar gates automaticos no fluxo de PR e consolidar comparativo por release |
| Acessibilidade (WCAG 2.1 AA) | Parcial | Auditoria anterior + plano tecnico + PR #311 com quick wins concretos | Falta validacao formal (axe/Lighthouse/teclado/screen reader) em todos os fluxos prioritarios |
| Correcao de bugs | Parcial | PR #311 remove credenciais hardcoded no Login e melhora tratamento de erro | Falta priorizacao final (severidade/impacto) e lote de correcao completo do sprint |
| Documentacao atualizada | Parcial | Documentacao tecnica de observabilidade/performance existe e esta forte | Falta consolidacao final M5 com evidencias de aceite por story |
| Testes de carga realizados | Parcial/Boa base | Locust + smoke metrics configurados e com relatorios | Falta rodada oficial da sprint com comparativo baseline x pos-ajuste |

### Observacao sobre o codigo atual
No estado atual do workspace (branch local), parte dos itens de UX/A11y da PR #311 ainda **nao esta aplicada** (ex.: `frontend/index.html` ainda com titulo "React App" e `frontend/src/pages/Login/index.jsx` ainda com credenciais preenchidas por padrao).

---

## 4. Discovery M5 (lideranca) - relatorio + planejamento

### DISCOVERY-M5-ALL-001: Identificar pontos de melhoria de performance

**Status:** Em grande parte mapeado, com consolidacao pendente para M5.

**Ja existe:**
- Baselines backend (smoke e KPIs) e budgets/metas frontend.
- Cenarios de dashboard/financeiro/servicos ja definidos.

**Lacuna:**
- Falta consolidar ranking unico de gargalos priorizados para Sprint 7.

**Plano de entrega desta discovery:**
1. Consolidar top 10 gargalos (frontend e backend) por impacto no usuario.
2. Classificar por custo x impacto (alto, medio, baixo esforco).
3. Definir "must-fix da sprint" (escopo fechado).

**Artefato esperado:** `docs/1-discovery/DISCOVERY-M5-ALL-001-performance-hotspots.md`

---

### DISCOVERY-M5-ALL-002: Validar requisitos de acessibilidade

**Status:** Parcialmente pronto (base robusta anterior + PR #311).

**Ja existe:**
- Auditoria com quick wins e backlog.
- Plano tecnico WCAG 2.1 AA.
- PR #311 com ajustes relevantes em Alert, Button, tabela, modal, fallbacks e login.

**Lacuna:**
- Falta fechamento formal por checklist de conformidade em fluxos criticos.

**Plano de entrega desta discovery:**
1. Fechar matriz por pagina/fluxo: login, dashboard, servicos, costureiras, financeiro.
2. Definir requisitos obrigatorios por componente (nome acessivel, foco, teclado, announcements).
3. Publicar checklist de aceite A11y para PRs da sprint.

**Artefato esperado:** `docs/1-discovery/DISCOVERY-M5-ALL-002-a11y-wcag-validation-matrix.md`

---

### DISCOVERY-M5-ALL-003: Mapear gargalos de CI/CD

**Status:** Pendente (alto risco operacional).

**Diagnostico atual:**
- Workflows atuais focam auto-approve/auto-merge de docs.
- Nao ha evidencias de gate obrigatorio de testes backend/frontend/performance/a11y para PRs de codigo desta sprint.

**Plano de entrega desta discovery:**
1. Mapear pipeline atual e pontos sem cobertura.
2. Definir fluxo minimo de qualidade para codigo (lint, testes, build, perf check, a11y check basico).
3. Definir politica de bloqueio de merge para regressao.

**Artefato esperado:** `docs/1-discovery/DISCOVERY-M5-ALL-003-ci-cd-bottlenecks.md`

---

### DISCOVERY-M5-ALL-004: Definir cenarios de teste de carga

**Status:** Ja ha base pronta; precisa versao oficial da sprint M5.

**Ja existe:**
- Cenarios Locust e smoke para endpoints financeiros, monitoramento e listagem.

**Lacuna:**
- Falta matriz de volume/concorrencia por nivel (smoke, normal, stress) para aceite de M5.

**Plano de entrega desta discovery:**
1. Definir perfis de carga 20/50/100 usuarios.
2. Definir SLO por endpoint critico e criterios de stop.
3. Definir roteiro de execucao no fechamento da sprint.

**Artefato esperado:** `docs/1-discovery/DISCOVERY-M5-ALL-004-load-test-scenarios.md`

---

### DISCOVERY-M5-ALL-005: Priorizar bugs e melhorias

**Status:** Parcial.

**Ja existe:**
- Itens concretos em PR #311 (a11y + login + 404).
- Historico de achados em auditoria A11y.

**Lacuna:**
- Falta backlog priorizado unico com severidade e dono.

**Plano de entrega desta discovery:**
1. Consolidar backlog de bugs e melhorias (frontend/backend).
2. Priorizar por impacto no negocio e risco de regressao.
3. Trancar escopo final das 3 stories de delivery.

**Artefato esperado:** `docs/1-discovery/DISCOVERY-M5-ALL-005-priorizacao-bugs-melhorias.md`

---

## 5. Mensuracao M5 (lideranca) - relatorio + planejamento

### MEASUREMENT-M5-ALL-001: Definir KPIs de performance

**Base existente aproveitavel:**
- KPIs de query e dashboard financeiro ja definidos (avg, p95, p99, etc.).
- Budgets frontend e metas de carregamento.

**Plano M5:**
- Unificar painel com KPIs cross-stack:
  - Frontend: bundle, TTI, tempo de troca de rota
  - Backend: avg/p95/p99 por endpoint critico
  - Operacional: taxa de erro e throughput

---

### MEASUREMENT-M5-ALL-002: Estabelecer baseline de melhoria

**Base existente aproveitavel:**
- `perf-smoke-latest.md` e baseline M2.

**Plano M5:**
1. Congelar baseline inicial da sprint (D0).
2. Rodar medicao final (D+N).
3. Publicar delta percentual por KPI (antes x depois).

---

### MEASUREMENT-M5-ALL-003: Criar metricas de acessibilidade

**Plano M5:**
- Metricas objetivas por fluxo:
  - Erros axe: alvo 0 criticos
  - Lighthouse A11y: alvo >= 90 nas telas criticas
  - Cobertura de navegacao por teclado: 100% nos fluxos de login/cadastro/listagem
  - Componentes com nome acessivel: 100%

---

### MEASUREMENT-M5-ALL-004: Definir criterios de aceite de otimizacao

**Plano M5 (criterios de aceite tecnicos):**
- Sem regressao de p95 em endpoints criticos.
- Perf check frontend sem violacao de budget.
- Build, lint e testes essenciais verdes.
- Sem bug P0/P1 aberto no escopo das stories.

---

### MEASUREMENT-M5-ALL-005: Estabelecer taxa de reducao de bugs

**Plano M5:**
- Baseline inicial: total de bugs priorizados (P0/P1/P2).
- Meta de sprint:
  - P0: 100% resolvidos
  - P1: >= 80% resolvidos
  - P2: >= 40% resolvidos ou planejados para proxima sprint

---

## 6. Delivery M5 - planejamento detalhado por story

## STORY-M5-ALL-001: Otimizacao Geral

### Escopo da story
Concentrar hardening tecnico transversal (frontend + backend + qualidade de entrega), com foco em estabilidade e performance percebida.

### O que ja existe
- Instrumentacao e observabilidade backend (monitoring + KPIs + alertas).
- Base de testes de carga (Locust + smoke).
- Padroes de performance frontend (scripts e budgets documentados).

### O que precisa ser feito
1. Consolidar checklist tecnico unico de performance por PR.
2. Fechar ajustes de performance de alto impacto levantados na discovery.
3. Padronizar validacao de regressao (baseline x pos-ajuste).
4. Publicar relatorio final com delta dos indicadores.

### Plano de execucao (detalhado)
1. **Pacote A - Baseline da sprint**
   - Gerar snapshot inicial (frontend perf + backend smoke/locust curto).
   - Registrar no documento de measurement M5.
2. **Pacote B - Otimizacoes prioritarias**
   - Aplicar correcoes de alto impacto (consulta, renderizacao, carregamento).
   - Revisar pontos de latencia p95/p99 mais variaveis.
3. **Pacote C - Gates de qualidade**
   - Definir workflow minimo para PR de codigo (lint, testes, build, perf check).
4. **Pacote D - Fechamento**
   - Reexecutar suite de medicao e publicar comparativo.

### Criterios de aceite da story
- KPIs de performance comparados (antes/depois) publicados.
- Sem regressao em endpoints/fluxos criticos.
- Evidencias tecnicas anexadas em docs.

### Riscos
- Falta de gate CI para codigo pode permitir regressao oculta.
- Divergencia entre ambiente local e ambiente de execucao da medicao.

---

## STORY-M5-CORE-001: Ajustes de Negocio

### Escopo da story
Refino de regras e robustez de fluxos de negocio (principalmente financeiro/operacional), com foco em previsibilidade, seguranca e clareza de comportamento.

### O que ja existe
- Endpoints financeiros e monitoramento com boa base de observabilidade.
- Simulacao de pagamento, dashboard interno e alertas configuraveis.
- Baseline de performance de consultas ja documentado.

### O que precisa ser feito
1. Revisar regras de negocio com maior risco de inconsistencias (status, calculos, simulacoes).
2. Endurecer tratamento de erro e respostas de API para cenarios de borda.
3. Garantir rastreabilidade operacional (logs estruturados + request id).
4. Validar impacto de ajustes em testes automatizados e carga.

### Plano de execucao (detalhado)
1. **Levantamento funcional**
   - Validar com PO matriz de regras criticas para fechamento da sprint.
2. **Hardening backend**
   - Ajustar validacoes, mensagens e contratos de resposta.
   - Revisar limites e defaults sensiveis de variaveis de ambiente.
3. **Confiabilidade operacional**
   - Garantir cobertura de logs/metricas para excecoes e fluxos de erro.
4. **Validacao e aceite**
   - Rodar testes de regressao e testes de carga alvo.

### Criterios de aceite da story
- Regras de negocio criticas validadas e documentadas.
- Erros de API padronizados em cenarios-chave.
- Sem regressao em performance para os endpoints financeiros centrais.

### Riscos
- Mudancas em regra de negocio sem matriz formal de decisao com negocio.
- Falhas de migracao/dados mascarando comportamento funcional.

---

## STORY-M5-UX-001: Refinamentos de UX

### Escopo da story
Finalizar melhorias de usabilidade e acessibilidade com foco nos fluxos mais usados do produto, aproveitando os insumos da PR #311 sem merge imediato.

### O que ja existe
- Base de auditoria A11y e plano WCAG.
- PR #311 com pacote concreto de melhorias:
  - Titulo e `noscript` em PT-BR
  - `aria-live`/`aria-busy` em estados de loading
  - Alert com roles e announcements adequados
  - Button com `forwardRef` e spinner acessivel
  - Tabela com teclado + semantica de colunas
  - Modal com `aria-labelledby` e foco inicial
  - Login sem credenciais hardcoded e com erros diferenciados
  - Fallback 404 acessivel

### O que precisa ser feito
1. Revisar tecnicamente os diffs da PR #311 e decidir incorporacao por etapas (sem merge direto agora).
2. Completar lacunas de acessibilidade ainda pendentes no fluxo principal.
3. Validar navegacao por teclado e mensagens para leitores de tela.
4. Executar checklist de usabilidade com feedback rapido do time de produto.

### Plano de execucao (detalhado)
1. **Pacote UX-1 (quick wins da PR #311)**
   - Aplicar localmente as mudancas de baixo risco e alto impacto.
2. **Pacote UX-2 (validacao formal A11y)**
   - Rodar axe + Lighthouse + testes manuais de teclado.
3. **Pacote UX-3 (polimento de experiencia)**
   - Ajustar textos, feedbacks de erro e estados vazios.
4. **Pacote UX-4 (aceite com produto)**
   - Demo dos fluxos principais e coleta de aprovacao.

### Criterios de aceite da story
- Fluxos criticos com navegacao por teclado funcional.
- Sem credenciais expostas em UI/codigo.
- Alertas/estados de carregamento anunciados corretamente.
- Tela de rota inexistente com orientacao clara de retorno.

### Riscos
- Merge tardio da PR #311 sem consolidacao pode gerar conflito de branch.
- Ajustes de UX sem check de regressao podem quebrar interacoes existentes.

---

## 7. Tratamento da PR #311 (aberta recentemente)

**Diretriz desta sprint:** usar a PR #311 como **insumo tecnico**, sem executar merge agora.

### Como usar sem merge imediato
1. Extrair checklist de alteracoes por arquivo.
2. Reaplicar de forma controlada nos pacotes da STORY-M5-UX-001.
3. Validar com criterios de aceite e testes da sprint.
4. Somente depois decidir entre:
   - merge da PR original (se ainda aderente), ou
   - nova PR consolidada da sprint M5.

---

## 8. Cronograma proposto da Sprint 7 (W31)

| Bloco | Foco | Entrega |
|---|---|---|
| D1 | Discovery + baseline | D001-D005 consolidados + baseline congelado |
| D2-D3 | Delivery tecnico (ALL/CORE/UX) | Pacotes prioritarios implementados |
| D4 | Validacao integrada | Testes, carga, KPIs, acessibilidade |
| D5 | Fechamento | Relatorio final, pendencias, recomendacoes |

---

## 9. Checklist final de aceite do epico na sprint

- [ ] Melhorias de usabilidade comprovadas em fluxos criticos
- [ ] Otimizacao de performance com comparativo antes/depois
- [ ] Acessibilidade WCAG 2.1 AA validada (escopo da sprint)
- [ ] Bugs prioritarios tratados (P0/P1)
- [ ] Documentacao consolidada da sprint publicada
- [ ] Testes de carga executados com evidencias

---

## 10. Resumo executivo

A sprint M5 parte de uma base tecnica ja madura em performance/observabilidade e de um pacote recente de UX/A11y na PR #311. O foco agora e transformar esses ativos em entrega controlada com validacao formal, gates de qualidade e comparativo de resultados. O maior risco atual esta no fluxo de CI/CD para PRs de codigo (baixo nivel de automacao de qualidade), por isso essa frente deve ser tratada como prioridade de descoberta e sustentacao da entrega.
