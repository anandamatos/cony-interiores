# [STORY-M1-UX-007] - Estabilizacao de Cadastros e Integracao com API

**Epico:** EPIC-M1-UX-001 - Interface e Jornada do Usuario
**Squad:** UX & Experience
**MVP:** MVP1
**Data de Criacao:** 19/07/2026
**Responsavel:** @anandamatos

---

## Contexto e Diagnostico

Durante a validacao dos fluxos de cadastro no frontend, foi identificado erro 500 no endpoint `GET /api/produtos/`, impedindo o carregamento do formulario de Novo Servico.

Causa raiz identificada no backend:
- `django.db.utils.OperationalError: no such column: users_produto.tipo_produto`
- Banco em uso no container backend: SQLite
- Migracao pendente na app `users`: `0002_costureira_capacidade_base_semanal_and_more`

Acao corretiva aplicada para destravar o ambiente:
- Execucao de `python manage.py migrate` no container backend
- Validacao de endpoints apos migracao:
  - `GET /api/produtos/` -> 200
  - `GET /api/clientes/` -> 200
  - `GET /api/costureiras/` -> 200

Problema adicional reportado na UX-007:
- Cadastro de nova costureira concluia sem erro no console, mas o item nao aparecia na listagem
- Causa funcional: formulario e listagem consumiam fontes diferentes (mock/local), sem roundtrip real com API

Nova demanda funcional reportada:
- Remover o menu de tres pontos das listagens de Servicos e Costureiras
- Exibir apenas um icone de edicao por item (ex.: lapis)
- Ao clicar no icone, abrir a pagina de cadastro correspondente em modo edicao, com campos pre-preenchidos
- Exibir CTA de salvamento no modo edicao (ex.: "Salvar alteracoes")
- Evoluir menu Equipe para concentrar operacoes de add/edicao/exclusao em etapa posterior da mesma story

---

## Objetivo da Story

Garantir que os dois fluxos de cadastro do MVP1 (Novo Servico e Nova Costureira) funcionem de ponta a ponta com backend operacional, tratamento de falhas e experiencia de uso consistente.

Objetivo expandido:
- Corrigir consistencia entre cadastro e listagem de costureiras
- Disponibilizar operacoes CRUD essenciais por item em Servicos e Costureiras
- Estruturar base para futura centralizacao das operacoes na tela Equipe

---

## Escopo Funcional

Formularios alvo desta Story:
- Cadastro de Servico (frontend: NewService)
- Cadastro de Costureira (frontend: NewSeamstress/CostureiraForm)

Fluxos de manutencao incluidos:
- Listagem de Costureiras com dados reais da API
- Edicao de Costureira por rota dedicada
- Edicao por item em Servicos e Costureiras via icone unico de edicao (sem menu contextual)

Fora de escopo imediato (planejado para proximas features):
- Melhorias amplas de acessibilidade global (axe warnings de contraste/heading/roles)
- Dashboard de metricas de usabilidade
- CRUD completo de Equipe com papeis e permissoes
- Edicao completa de Servicos (todos os campos de formulario)

---

## Tarefas (Tasks)

| Ordem | ID | Tarefa | Descricao | Squad | Responsavel |
|------|----|--------|-----------|-------|-------------|
| 1 | TASK-M1-UX-007-01 | Validar baseline tecnico de integracao | Confirmar containers, migracoes e endpoints necessarios para os dois formularios | Foundation | @anandamatos |
| 2 | TASK-M1-UX-007-05 | Documentar operacao local | Consolidar checklist de subida do ambiente e recuperacao de schema | Foundation | @anandamatos |
| 3 | TASK-M1-UX-007-02 | Endurecer carregamento do formulario de servico | Tratar falhas de API por endpoint, exibir estados de loading/erro e permitir retry | Core UX | @anandamatos |
| 4 | TASK-M1-UX-007-03 | Padronizar feedbacks de validacao | Substituir alertas genericos por feedback visual consistente no formulario | Core UX | @anandamatos |
| 5 | TASK-M1-UX-007-07 | Corrigir listagem pos-cadastro de costureiras | Garantir que criacao, listagem e atualizacao usem API real e mesma fonte de dados | Core UX | @anandamatos |
| 6 | TASK-M1-UX-007-04 | Validar fluxo de submissao E2E | Testar criar servico e criar costureira com retorno de sucesso e erros esperados | Core UX + Foundation | @anandamatos |
| 7 | TASK-M1-UX-007-08 | Substituir menu de tres pontos por icone de edicao em Servicos | Remover menu contextual da listagem e exibir icone unico de edicao por item, com navegacao para a tela de cadastro em modo edicao | Core UX | @anandamatos |
| 8 | TASK-M1-UX-007-09 | Substituir menu de tres pontos por icone de edicao em Costureiras | Remover menu contextual da listagem e exibir icone unico de edicao por item, com navegacao para a tela de cadastro em modo edicao | Core UX | @anandamatos |
| 9 | TASK-M1-UX-007-10 | Habilitar prefill e salvamento em modo edicao | Garantir que paginas de cadastro de Servicos e Costureiras carreguem campos preenchidos no modo edicao e exibam CTA de "Salvar alteracoes" | Core UX + Foundation | @anandamatos |
| 10 | TASK-M1-UX-007-11 | Planejar extensao para tela Equipe | Definir abordagem para add/edicao/exclusao centralizados em Equipe | Core UX | @anandamatos |
| 11 | TASK-M1-UX-007-06 | Planejar features subsequentes | Registrar backlog tecnico para acessibilidade, observabilidade e telemetria UX | Core UX | @anandamatos |
| 12 | TASK-M1-UX-007-12 | Planejar pipeline de homologacao para testes de usabilidade | Desenhar fluxo de deploy efemero via CLI com link compartilhavel e Hotjar/analytics restritos ao ambiente | Foundation + Core UX | @anandamatos |

### Distribuicao por Squads e Ordem de Implementacao (baixo impacto)

1. Fase 1 - Fundacao tecnica (Foundation)
   - Executar TASK-01 e TASK-05 primeiro para estabilizar ambiente, migracoes e checklist de recovery.
   - Objetivo: reduzir risco de bloqueio para Core UX e evitar retrabalho em feature de interface.

2. Fase 2 - Estabilizacao dos fluxos principais (Core UX)
   - Executar TASK-02, TASK-03 e TASK-07 com foco em integracao real API + feedbacks de erro.
   - Objetivo: garantir funcionamento E2E dos cadastros antes de expandir escopo para menus e edicao.

3. Fase 3 - Validacao integrada (Core UX + Foundation)
   - Executar TASK-04 com apoio de Foundation para infraestrutura e Core UX para cenarios funcionais.
   - Objetivo: confirmar baseline estavel antes das features incrementais de manutencao.

4. Fase 4 - Incrementos de operacao na UI (Core UX)
   - Executar TASK-08, TASK-09 e TASK-10 nessa ordem (Servicos -> Costureiras -> prefill + salvar alteracoes).
   - Objetivo: liberar valor por partes, minimizando impacto em outros times e reduzindo regressao em lote.

5. Fase 5 - Planejamento de evolucao e homologacao (Core UX + Foundation)
   - Executar TASK-11, TASK-06 e TASK-12 ao final do ciclo funcional.
   - Objetivo: preparar proxima iteracao com pipeline de homologacao, link para cliente e Hotjar/analytics via flag apenas em homolog (`VITE_ENV=homolog`), sem risco para dev/producao.

---

## Criterios de Aceite

- [ ] Pagina de Novo Servico carrega sem erro 500 quando backend esta com migracoes aplicadas
- [ ] Dropdowns de cliente, costureira e produto carregam com tratamento de erro por endpoint
- [ ] Cadastro de Costureira conclui com sucesso e atualiza listagem
- [ ] Mensagens de erro/sucesso seguem padrao visual (sem dependencia de `alert` bloqueante)
- [ ] Fluxos principais foram validados manualmente em ambiente Docker
- [ ] Procedimento de recuperacao do ambiente esta documentado
- [ ] Listagem de Servicos nao exibe menu de tres pontos e apresenta icone de edicao por item
- [ ] Listagem de Costureiras nao exibe menu de tres pontos e apresenta icone de edicao por item
- [ ] Clique no icone de edicao abre tela de cadastro correspondente em modo edicao, com campos pre-preenchidos
- [ ] Acao de "Salvar alteracoes" persiste atualizacao no backend para Servicos e Costureiras
- [ ] Escopo de extensao para Equipe documentado para proxima iteracao

---

## Descoberta (Discovery)

| Ordem | ID | Tarefa | Status | Squad | Responsavel |
|------|----|--------|--------|-------|-------------|
| 1 | DISCOVERY-M1-UX-007-01 | Mapear dependencias de dados dos formularios (clientes/produtos/costureiras) | ⏳ Pendente | Foundation | @anandamatos |
| 2 | DISCOVERY-M1-UX-007-02 | Catalogar falhas mais comuns de integracao local (migracao, endpoint, CORS/proxy) | ⏳ Pendente | Foundation | @anandamatos |
| 3 | DISCOVERY-M1-UX-007-06 | Mapear contratos de API para edicao de Servicos e Costureiras (GET por id + PUT/PATCH) | ⏳ Pendente | Foundation | @anandamatos |
| 4 | DISCOVERY-M1-UX-007-03 | Revisar warnings do axe e separar quick wins de acessibilidade | ⏳ Pendente | Core UX | @anandamatos |
| 5 | DISCOVERY-M1-UX-007-04 | Mapear regras de negocio para status de servico | ⏳ Pendente | Core UX | @anandamatos |
| 6 | DISCOVERY-M1-UX-007-05 | Mapear campos obrigatorios para edicao de costureiras por perfil | ⏳ Pendente | Core UX | @anandamatos |
| 7 | DISCOVERY-M1-UX-007-07 | Definir comportamento UX do icone de edicao (estado, tooltip, disabled, loading) | ⏳ Pendente | Core UX | @anandamatos |

### Ordem de Discovery por baixo impacto

1. Foundation primeiro: validar contrato e estabilidade tecnica para evitar redesenho de fluxo.
2. Core UX depois: desenhar interacao do icone de edicao com base em API ja validada.
3. Fechamento conjunto: checklist de acessibilidade e estados de erro antes da implementacao.

---

## Mensuracao (Measurement)

| Ordem | ID | Tarefa | Status | Squad | Responsavel |
|------|----|--------|--------|-------|-------------|
| 1 | MEASUREMENT-M1-UX-007-04 | Propor stack de coleta (instrumentacao frontend + logs backend) | ⏳ Pendente | Foundation + Core UX | @anandamatos |
| 2 | MEASUREMENT-M1-UX-007-01 | Definir taxa de sucesso dos dois cadastros (servico/costureira) | ⏳ Pendente | Core UX | @anandamatos |
| 3 | MEASUREMENT-M1-UX-007-02 | Definir tempo medio de preenchimento por formulario | ⏳ Pendente | Core UX | @anandamatos |
| 4 | MEASUREMENT-M1-UX-007-03 | Definir taxa de erro por campo/endpoint | ⏳ Pendente | Foundation + Core UX | @anandamatos |
| 5 | MEASUREMENT-M1-UX-007-05 | Medir taxa de sucesso da edicao por icone (Servicos/Costureiras) | ⏳ Pendente | Core UX | @anandamatos |
| 6 | MEASUREMENT-M1-UX-007-06 | Medir tempo medio para editar item a partir da listagem | ⏳ Pendente | Core UX | @anandamatos |
| 7 | MEASUREMENT-M1-UX-007-07 | Medir conversao do fluxo clicar editar -> salvar alteracoes | ⏳ Pendente | Core UX | @anandamatos |

### Ordem de Measurement por baixo impacto

1. Definir stack de coleta antes dos eventos para evitar retrabalho de instrumentacao.
2. Priorizar metricas de fluxo principal (cadastro/edicao) antes de metricas avancadas.
3. Consolidar funil da edicao por icone (clique -> carregamento prefill -> salvar) para validar decisao de remover o menu de tres pontos.

## Especificacao Funcional - Edicao direta por icone

Objetivo:
- Simplificar manutencao de itens em listagens, removendo menu de tres pontos e mantendo somente a acao de edicao.

Comportamento esperado:
1. Servicos
   - Cada item da listagem exibe apenas um icone de edicao (lapis).
   - Clique no icone navega para a tela de cadastro de Servico em modo edicao.
   - Tela abre com campos preenchidos pelo item selecionado.
   - CTA principal muda para "Salvar alteracoes".

2. Costureiras
   - Cada item da listagem exibe apenas um icone de edicao (lapis).
   - Clique no icone navega para a tela de cadastro de Costureira em modo edicao.
   - Tela abre com campos preenchidos pelo item selecionado.
   - CTA principal muda para "Salvar alteracoes".

Requisitos transversais:
- Sem execucao tecnica nesta etapa: item documentado para planejamento detalhado e fatiamento de implementacao.
- Estado de loading durante prefill e estado de erro com opcao de retry.
- Preservar navegacao de retorno para a listagem apos salvar/cancelar.
- Instrumentar eventos minimos para homologacao/analytics: `edit_icon_clicked`, `edit_form_loaded`, `edit_saved`.

## Melhorias sugeridas para proximas iteracoes do documento

1. Adicionar matriz RACI por tarefa (quem executa, aprova, consulta e acompanha).
2. Definir Definition of Ready por fase (entrada minima para iniciar cada bloco).
3. Definir Definition of Done por tipo de task (UI, API, observabilidade, testes).
4. Incluir plano de rollback para alteracoes de fluxo de listagem.
5. Incluir checklist de QA para fluxo de edicao por icone (desktop/mobile, latencia alta, erro 4xx/5xx).

---

## Planejamento de Proximas Features (Backlog da Story)

1. Melhorar resiliencia de integracao:
   - Retry com feedback amigavel quando um endpoint falhar
   - Fallback parcial para campos nao criticos

2. Evoluir UX de validacao:
   - Validacao em tempo real por campo
   - Mensagens acionaveis com orientacao de correcao

3. Observabilidade de formulario:
   - Eventos de inicio, abandono, erro e sucesso por fluxo
   - Correlacao frontend/backend para diagnostico rapido

4. Acessibilidade incremental:
   - Corrigir contraste minimo
   - Ajustar hierarquia de headings
   - Revisar roles ARIA incompativeis

5. Evolucao Equipe (fase seguinte):
   - Consolidar add/editar/excluir costureiras no menu Equipe
   - Compartilhar o mesmo componente de formulario entre Costureiras e Equipe
   - Definir regras de permissao por perfil para cada acao

6. Pipeline de homologacao para testes de usabilidade (proposta, sugerida em sessao anterior):
   - Ambiente efemero disparado via CLI (ex.: `gh workflow run` ou script `deploy-homolog.sh`) a partir de uma branch/story, reaproveitando os Dockerfiles/docker-compose existentes
   - Build + migrate + seed de dados de demonstracao, com URL unica e temporaria para envio direto ao cliente
   - Ativar Hotjar (gravacao de sessao + heatmap) e/ou analytics (GA4/PostHog) somente nesse ambiente via flag (`VITE_ENV=homolog`), sem impactar producao/dev
   - Dados alimentam os KPIs ja previstos em `docs/3-measurement/STORY-M1-UX-001-kpis-usabilidade.md` e substituem a coleta manual do MVP1
   - Encerramento automatico do ambiente apos a janela de teste (controle de custo/exposicao)

---

## Dependencias

- Backend com migracoes atualizadas
- Servicos Docker (`db`, `backend`, `frontend`) ativos
- Endpoints de apoio funcionais:
  - `/api/produtos/`
  - `/api/clientes/`
  - `/api/costureiras/`

---

## Riscos e Mitigacoes

| Risco | Impacto | Mitigacao |
|-------|---------|-----------|
| Schema desatualizado no banco local | Alto | Check de migracao no start local e guia de recovery |
| Falha de um endpoint bloquear formulario inteiro | Alto | Tratamento isolado por fonte de dados + retry |
| Regressao UX com feedback inconsistente | Medio | Padrao unico de mensagens de erro/sucesso |
| Acessibilidade degradada em novos ajustes | Medio | Checklist minimo com axe em fluxo critico |
| Ambiente de homologacao exposto publicamente sem controle | Medio | Link com expiracao curta e/ou autenticacao basica; nunca usar dados reais de cliente |

---

## Links Relacionados

- Documento de diagnostico Docker: `docs/1-discovery/STORY-M1-UX-006_docker-diagnostico.md`
- Planejamento MVP1: `docs/2-planning/planing-mvp1.md`
- Guia de criacao de story: `docs/5-decisions/GUIDE-how-to-create-story.md`
- Ferramentas de coleta de dados (Hotjar/GA4/PostHog): `docs/4-delivery/STORY-M1-UX-MEAS-001-ferramentas-coleta-dados.md`

---

## Checklist Rapido de Execucao Tecnica

```bash
# 1) subir stack
 docker-compose up -d

# 2) garantir migracoes
 docker-compose exec -T backend python manage.py migrate

# 3) validar endpoints usados no formulario
 curl -I http://localhost:8000/api/produtos/
 curl -I http://localhost:8000/api/clientes/
 curl -I http://localhost:8000/api/costureiras/
```

---

**Status Inicial:** Em planejamento
**Proxima Acao:** Quebrar tasks em issue/PR e iniciar implementacao tecnica da TASK-M1-UX-007-02
