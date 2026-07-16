# STORY-M1-CORE-003 - Calculo de Capacidade Produtiva

## Objetivo
Validar e concluir a implementacao do calculo de capacidade com indice de complexidade e sugestao de alocacao entre costureiras.

## Escopo Validado
- Calculo de carga por pedido implementado em servicos puros.
- Indice de complexidade por tamanho e tipo de produto implementado em matriz.
- Sugestao de alocacao implementada priorizando candidatas aptas com maior folga.
- Endpoints de consulta de carga e sugestao de alocacao publicados no app core.

## Correcao Aplicada Durante a Validacao
- Compatibilidade com Python 3.9 corrigida em `backend/apps/core/services/bridge_alocacao.py`.
- Troca de anotacao de tipo `dict | None` para `Optional[dict]`.
- Impacto: remove erro em import do Django e permite executar check/testes no ambiente atual.

## Evidencias de Validacao
- Ambiente Python configurado em venv 3.9.6 com dependencias do backend instaladas.
- `manage.py check`: OK.
- Testes executados:
  - `apps.core.tests.test_capacidade`: OK
  - `apps.core.tests.test_complexidade`: OK
  - `apps.core.tests.test_alocacao`: OK
- Resultado agregado: 20 testes, todos passando.

## Analise de Regra de Negocio
- Formula de carga: soma de complexidade por peca (validada pelos testes de capacidade).
- Complexidade P/M/G/ESP: implementada por matriz por tipo de produto.
- Observacao importante: no documento de descoberta, os pesos 1/2/4/6 estao como suposicao (nao como regra fechada).
- Distribuicao/alocacao: regra atual sugere a costureira com maior dias livres entre as aptas para a carga do pedido.

## Pontos de Atencao para Merge
- Branch alvo `feat@core/STORY-M1-CORE-003` nao foi encontrada local/remoto neste repositorio.
- Existe historico de integracao na main com referencia a calculo de capacidade (TASK-M1-CORE-011 a 015).
- Recomenda-se confirmar se a story foi integrada via outra branch (ex: STORY-M2-CORE-003) antes de abrir novo merge.

## Checklist de Status
- [x] Revisar alteracoes nos arquivos
- [x] Verificar testes
- [x] Validar formula de calculo de carga
- [x] Validar cenarios de distribuicao
- [x] Validar sugestao de alocacao
- [x] Corrigir problema identificado
- [ ] Confirmar branch oficial da PR STORY-M1-CORE-003
- [ ] Executar backup da branch oficial
- [ ] Concluir merge no fluxo remoto
