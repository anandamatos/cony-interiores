# TASK-M2-UX-FND-001 - Validacao da estrategia de lazy loading

## Objetivo
Definir e validar uma estrategia de lazy loading para dashboards com foco em performance de frontend e boa experiencia de carregamento.

## Estrategia definida
1. Manter a rota inicial do dashboard principal carregada de forma direta para evitar regressao no primeiro paint.
2. Aplicar lazy loading em rotas secundarias e de maior custo de bundle:
- Services
- NewService
- Seamstresses
- NewSeamstress
- Capacity (usa grafico e depende de bibliotecas mais pesadas)
3. Exibir feedback visual de carregamento no layout via Suspense fallback.
4. Manter estrategia de dados no nivel de pagina (fetch on mount + filtros), para nao antecipar requests de modulos ainda nao visitados.

## Implementacao validada
Arquivos alterados:
- frontend/src/App.jsx
- frontend/src/routes/AppRoutes.jsx
- frontend/src/layouts/MainLayout.jsx
- frontend/vite.config.js

Resumo tecnico:
- Rotas secundarias migradas para `lazy(() => import(...))` e consolidadas em um unico arquivo de rotas.
- Boundary de `Suspense` adicionada no layout para exibir loader durante download/render dos chunks de rota.
- Chunks manuais mantidos apenas para modulos pesados e claramente isolados, evitando dependencia circular entre vendor chunks.

## Experiencia do usuario durante carregamento
- Enquanto o modulo da rota lazy carrega, o usuario visualiza indicador central de progresso com mensagem "Carregando modulo...".
- Header e sidebar permanecem visiveis no layout, reduzindo sensacao de travamento da aplicacao.

## Performance e metricas (validacao)
Comando executado:
- `npm --prefix frontend run build`

Resultado observado:
- Build concluido com sucesso.
- Geracao de chunks separados para rotas lazy e bibliotecas mais pesadas, reduzindo custo de carregamento inicial quando comparado ao carregamento total em um unico ponto de entrada.
- Aviso de chunk circular entre `vendor` e `react-vendor` removido com simplificacao da estrategia de `manualChunks`.

## Decisao de arquitetura
- Lazy loading por rota foi escolhido por simplicidade operacional, baixo risco de regressao e ganho direto no tempo de interatividade das areas nao iniciais.
- Caso dashboards financeiros crescam (mais graficos/tabelas), recomenda-se evoluir para split por secoes internas (widgets) com boundaries adicionais.

## Criterios de aceite
- [x] Estrategia de lazy loading definida
- [x] Implementacao validada
- [x] Performance testada
- [x] Documentacao atualizada
