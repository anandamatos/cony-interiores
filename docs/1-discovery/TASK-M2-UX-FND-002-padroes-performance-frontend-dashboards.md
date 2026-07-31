# TASK-M2-UX-FND-002 - Padroes de performance frontend para dashboards

## Objetivo
Definir padroes objetivos de performance para dashboards e formalizar boas praticas para manter consistencia em novas entregas de frontend.

## Padroes definidos

### 1. Budget de bundle (gzip)
- Main entry JS: <= 90 KB
- Charts chunk JS: <= 120 KB
- Total JS: <= 260 KB
- Total CSS: <= 30 KB

### 2. Metas de carregamento (referencia)
- Primeira tela interativa em rede padrao: <= 2.5s
- Mudanca para rota lazy carregada: <= 1.5s apos clique
- Tempo de resposta visual durante carregamento: imediato com fallback de Suspense

### 3. Estrategias obrigatorias
- Lazy loading em rotas secundarias e modulos de dashboards.
- Split de vendor chunks para evitar um unico bundle grande.
- Evitar import de bibliotecas pesadas fora do escopo da rota.
- Manter fallback visual de carregamento para boa UX.

## Guia de boas praticas
1. Roteamento
- Usar `lazy(() => import(...))` para paginas nao iniciais.
- Usar `Suspense` no layout para fallback global de rota.

2. Graficos e dashboards
- Centralizar libs pesadas em chunk dedicado (`charts-vendor`).
- Evitar carregar graficos em telas que nao usam visualizacao de dados.

3. Codigo
- Remover imports nao utilizados para reduzir bundle.
- Revisar dependencias periodicamente para evitar aumento acidental de peso.

4. CI/Validacao local
- Rodar `npm run perf:check` antes de abrir PR de frontend.
- Falha em budget deve bloquear merge ate ajuste ou revisao explicita dos limites.

## Implementacao realizada no projeto
- Configuracao de split de chunks em `frontend/vite.config.js`.
- Script de budget em `frontend/scripts/performance-budget.mjs`.
- Scripts de execucao adicionados em `frontend/package.json`:
  - `perf:budget`
  - `perf:check`

## Ferramentas de monitoramento e medicao
- Vite build output (tamanho de chunks gerados)
- Script de budget local com gzip real (`performance-budget.mjs`)
- DevTools/Lighthouse para metricas de carregamento em ambiente de homologacao

## Validacao tecnica executada
Comando:
- `npm --prefix frontend run perf:check`

Resultado esperado:
- Build concluido
- Relatorio de budget com todos os checks em PASS

## Alinhamento com UX
- Fallback visual de carregamento padronizado para manter percepcao de responsividade.
- Metas de tempo de carregamento definidas para orientar discussoes de UX/performance em novas telas.

## Criterios de aceite
- [x] Padroes de performance definidos
- [x] Guia de boas praticas criado
- [x] Validado tecnicamente com baseline e pronto para revisao com UX
- [x] Documentacao atualizada
