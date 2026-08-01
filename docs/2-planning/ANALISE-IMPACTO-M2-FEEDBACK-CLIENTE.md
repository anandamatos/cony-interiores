# 📊 Análise de Impacto: Feedback do Cliente MVP2/3/4

## 📊 **Análise de Impacto Atualizada — Reunião 23/07/2026**

**Data:** 23/07/2026  
**Autor:** Ananda Matos  
**Épicos Afetados:** EPIC-M2-CORE-001, EPIC-M2-UX-001  
**Fonte:** Reunião de status com cliente Erika

---

## 🎯 **Resumo Executivo**

**Impacto Geral:** 🔴 **ALTO** - Mudanças significativas de escopo e direcionamento  
**Recomendação:** Readequar completamente as sprints do MVP2, removendo features complexas e focando em simplicidade e visualização manual  
**Esforço de Ajuste:** -40% (redução significativa de escopo)

---

## 📌 **Principais Mudanças Identificadas**

### 🔴 **Remoção de Features (Escopo Reduzido)**

| Feature | Decisão | Motivo |
|---------|---------|--------|
| **Cálculo Automático de Capacidade** | ❌ Remover completamente | Cliente não vê valor; distribuição é manual e depende de conversa |
| **Sistema de Complexidade (pesos)** | ❌ Remover completamente | Cliente prefere lançar itens complexos como múltiplas unidades |
| **Automação de Distribuição** | ❌ Remover completamente | Distribuição é 100% manual, com base em conversa com costureiras |
| **Cálculo de Capacidade Personalizada** | ❌ Remover completamente | Não há necessidade de calcular; cliente usa conversa para definir |
| **Períodos de Indisponibilidade** | ❌ Remover completamente | Não é necessário para o MVP2 |
| **Especialização como peso** | ❌ Remover completamente | Não é necessário para o MVP2 |

### ✅ **Features Mantidas (Simplificadas)**

| Feature | Mudança |
|---------|---------|
| **Visualização Semanal** | ✅ **Prioridade Máxima** — cliente quer ver o que cada costureira tem por semana |
| **Cadastro de Serviços** | ✅ Manter — com campo de largura (metros) e valor por metro |
| **Cadastro de Itens** | ✅ Manter — com opção de cadastrar novos itens e preços |
| **Valor por Metro/Peça** | ✅ Manter — com edição manual de valores |
| **Pagamento Semanal** | ✅ Manter — agrupar por semana, não por serviço |
| **Resumo Financeiro** | ✅ Manter — mas simplificado, apenas visualização básica |

---

## 📋 **Novo Escopo do MVP2 (Simplificado)**

### O que o MVP2 vai entregar

| Entregável | Descrição | Prioridade |
|------------|-----------|------------|
| **Visão Semanal por Costureira** | Tela que mostra os serviços agendados por semana para cada costureira | 🔴 Máxima |
| **Cadastro de Serviço com Largura** | Formulário com campos: cliente, produto, largura (metros), valor por metro, data de entrega, costureira | 🔴 Máxima |
| **Cadastro de Produtos** | Tabela de produtos com nome, tipo (metro/peça) e valor padrão | 🟡 Importante |
| **Resumo Financeiro Simplificado** | Visualização básica de valores a pagar por semana | 🟡 Importante |
| **Edição Manual de Valores** | Permitir ajuste de valores antes do pagamento | 🟡 Importante |

### O que NÃO está no MVP2

- ❌ Cálculo automático de capacidade
- ❌ Sistema de complexidade
- ❌ Sugestões de distribuição
- ❌ Períodos de indisponibilidade
- ❌ Automação de qualquer tipo
- ❌ Dashboard de produtividade (M3)
- ❌ Comparativo entre costureiras (M3)
- ❌ Métricas de ROI (M3)

---

## 📊 **Readequação do Planejamento — Sprint Atual**

### Antes (Planejamento Anterior)

| Story | SP | Descrição |
|-------|----|-----------|
| STORY-M2-CORE-001 | 10 | Modelo de Dados Financeiro (com campos complexos) |
| STORY-M2-CORE-002 | 5 | Cálculo de Pagamentos (com regras complexas) |
| STORY-M2-CORE-003 | 5 | Planejamento Financeiro |
| STORY-M2-UX-001 | 7 | Página de Resumo Financeiro |
| STORY-M2-UX-002 | 2 | Visualização de Pagamentos |
| STORY-M2-UX-003 | 3 | Planejamento Financeiro |
| **TOTAL** | **32 SP** | |

### Depois (Escopo Simplificado)

| Story | SP | Descrição | Mudança |
|-------|----|-----------|---------|
| **STORY-M2-CORE-001** | 3 | Modelo simplificado: serviços, produtos, costureiras | Removido: capacidade, indisponibilidade, N:N complexo |
| **STORY-M2-CORE-002** | 2 | Cálculo simples: valor = largura × valor_por_metro | Removido: regras de complexidade, especialização |
| **STORY-M2-CORE-003** | 3 | Planejamento: agrupamento semanal de serviços | Mantido, mas simplificado |
| **STORY-M2-UX-001** | 5 | Resumo Financeiro: visualização semanal | Reduzido: sem dashboards complexos |
| **STORY-M2-UX-002** | 5 | **Visão Semanal por Costureira** (NOVA PRIORIDADE) | Substitui visualização de pagamentos |
| **STORY-M2-UX-003** | 3 | Cadastro de Itens e Produtos | Mantido |
| **TOTAL** | **21 SP** | **Redução de 34%** | |

---

## 📋 **Novas Tarefas Detalhadas**

### STORY-M2-UX-002: Visão Semanal por Costureira (Nova Prioridade)

| Task | Descrição | SP |
|------|-----------|----|
| TASK-M2-UX-002-01 | Criar tela de visão semanal com filtro por costureira | 2 |
| TASK-M2-UX-002-02 | Implementar visualização de serviços agrupados por semana (segunda a sábado) | 2 |
| TASK-M2-UX-002-03 | Adicionar indicador visual de quantidade de serviços por semana | 1 |

### STORY-M2-CORE-001: Modelo Simplificado

| Task | Descrição | SP |
|------|-----------|----|
| TASK-M2-CORE-001-01 | Criar modelo Serviço com: cliente, produto, largura, valor_por_metro, data_entrega, costureira | 1 |
| TASK-M2-CORE-001-02 | Criar modelo Produto com: nome, tipo (metro/peça), valor_padrao | 1 |
| TASK-M2-CORE-001-03 | Criar modelo Costureira com: nome, contato (sem capacidade) | 1 |

### STORY-M2-CORE-002: Cálculo Simplificado

| Task | Descrição | SP |
|------|-----------|----|
| TASK-M2-CORE-002-01 | Implementar cálculo: valor = largura × valor_por_metro (para itens por metro) | 1 |
| TASK-M2-CORE-002-02 | Implementar cálculo: valor = valor_padrao (para itens por peça) | 0.5 |
| TASK-M2-CORE-002-03 | Permitir edição manual do valor final | 0.5 |

### STORY-M2-CORE-003: Planejamento Semanal

| Task | Descrição | SP |
|------|-----------|----|
| TASK-M2-CORE-003-01 | Agrupar serviços por semana (segunda a domingo) | 1 |
| TASK-M2-CORE-003-02 | Calcular total de serviços e valor por costureira por semana | 1 |
| TASK-M2-CORE-003-03 | API para consulta de planejamento semanal | 1 |

### STORY-M2-UX-001: Resumo Financeiro Simplificado

| Task | Descrição | SP |
|------|-----------|----|
| TASK-M2-UX-001-01 | Criar resumo financeiro com total por semana | 2 |
| TASK-M2-UX-001-02 | Mostrar valores por costureira agrupados por semana | 2 |
| TASK-M2-UX-001-03 | Adicionar filtro de período (semana/mês) | 1 |

### STORY-M2-UX-003: Cadastro de Itens

| Task | Descrição | SP |
|------|-----------|----|
| TASK-M2-UX-003-01 | Criar formulário para cadastro de novos produtos | 1.5 |
| TASK-M2-UX-003-02 | Adicionar campo de tipo (metro/peça) no cadastro | 0.5 |
| TASK-M2-UX-003-03 | Listar produtos cadastrados com opção de edição | 1 |

---

## 📊 **Resumo de Esforço Atualizado**

| Story | Antes | Depois | Delta |
|-------|-------|--------|-------|
| STORY-M2-CORE-001 | 10 SP | 3 SP | -7 SP |
| STORY-M2-CORE-002 | 5 SP | 2 SP | -3 SP |
| STORY-M2-CORE-003 | 5 SP | 3 SP | -2 SP |
| STORY-M2-UX-001 | 7 SP | 5 SP | -2 SP |
| STORY-M2-UX-002 | 2 SP | 5 SP | +3 SP |
| STORY-M2-UX-003 | 3 SP | 3 SP | 0 SP |
| **TOTAL** | **32 SP** | **21 SP** | **-11 SP (-34%)** |

---

## 🎯 **Próximos Passos**

| Ordem | Ação | Responsável | Prazo |
|-------|------|-------------|-------|
| 1 | Atualizar task boards no GitHub | @anandamatos | 23/07/2026 |
| 2 | Remover tasks relacionadas a capacidade e complexidade | @anandamatos | 23/07/2026 |
| 3 | Criar tasks da nova Visão Semanal por Costureira | @anandamatos | 23/07/2026 |
| 4 | Simplificar modelo de dados (remover campos desnecessários) | Core | 24/07/2026 |
| 5 | Implementar cadastro de produtos com tipo (metro/peça) | Core | 24/07/2026 |
| 6 | Implementar Visão Semanal por Costureira (UI) | UX | 25/07/2026 |
| 7 | Validar com cliente a nova interface | UX | 28/07/2026 |

---

## ✅ **Checklist de Ajustes**

### Remover do Backlog (Não é mais necessário)
- [ ] Capacidade personalizada por costureira
- [ ] Períodos de indisponibilidade
- [ ] Pesos de complexidade
- [ ] Automação de distribuição
- [ ] Dashboard de produtividade (M3)
- [ ] Comparativo entre costureiras (M3)
- [ ] Métricas de ROI (M3)

### Manter e Priorizar
- [ ] Visão semanal por costureira — **PRIORIDADE MÁXIMA**
- [ ] Cadastro de serviços com largura e valor por metro
- [ ] Cadastro de produtos com tipo (metro/peça)
- [ ] Resumo financeiro simplificado
- [ ] Edição manual de valores
- [ ] Agrupamento semanal de pagamentos

---

## 📌 **Decisões Registradas**

| Decisão | Status | Observação |
|---------|--------|------------|
| Capacidade não será calculada | ✅ Confirmado | Distribuição é manual, baseada em conversa |
| Complexidade removida | ✅ Confirmado | Itens complexos são lançados como múltiplas unidades |
| Valor por metro é a base | ✅ Confirmado | Tabela de preços por metro/peça |
| Pagamento é semanal | ✅ Confirmado | Não por serviço individual |
| Edição manual de valores | ✅ Confirmado | Cliente pode alterar preços |
| Interface visual aprovada | ✅ Confirmado | "Visual tá maravilhoso" |

---

**Status:** ✅ **Planejamento readequado e pronto para execução**  
**Próxima Revisão:** 28/07/2026 (após validação com cliente)  
**Documento Criado por:** Ananda Matos  
**Data:** 23/07/2026

--------
Com base na transcrição fornecida, organizei e formatei o conteúdo da reunião de hoje, separando claramente as falas entre você (Ananda) e a cliente (Erika).

---

# 📋 **Trasncrição da Reunião de Status - MVP2 (23/07/2026)**

**Participantes:** Ananda (UX Lead), Erika (Cliente), Felipe, Matheus e outros membros do time.
**Objetivo da Reunião:** Recapitu lar entregas, alinhar dúvidas sobre regras de negócio e ajustar o planejamento do MVP2 com base no feedback da cliente.

---

### 🗣️ **Ananda (Abertura e Contexto)**

> *"Boa tarde todo mundo. A nossa reunião de hoje é mais alinhada para recapitular o que a gente se comprometeu a fazer e alinhar o que foi feito desde a última reunião. Também vamos analisar alguns pontos com as demandas e dúvidas importantes para o desenvolvimento. O objetivo é ver o que faz sentido, fazer reajustes e seguir com o desenvolvimento da maneira mais precisa possível."*

**Apresentação do Recap:**
- Contexto inicial e divisão do time (Foundation, Core, UX).
- Entregas do MVP1: fluxo operacional, responsividade, formulários, navegação fluida e Design System aplicado.
- Desafio da carga de trabalho: cálculo baseado em complexidade (dias para execução).
- Objetivo: controle de status (envio → entrega), gráficos de carga e produção mensal, e detalhamento de observações e complexidade.
- Metodologia: matriz CSD (Certezas, Suposições, Dúvidas) para alinhamento com o cliente.
- Fase atual: validação visual, aprovação de cores, testes de usabilidade e ajustes finos para produção.

**Sobre o Design System:**
> *"A gente fez ajustes em relação ao manual da marca da Cony. Agora temos bases tipográficas e um estilo que reflete a estética de elegância e conforto que a empresa transmite. Repensamos cores, tipografia, espaçamento e animações. Aplicamos isso na tela inicial e em outros elementos."*

**Sobre os Próximos Passos:**
> *"Agora estamos preparando para colocar o sistema na mão de pessoas externas para validar a usabilidade e fazer ajustes finos antes de mandar para produção."*

**Apresentação das Telas:**
- **Capacidade de Carga:** detalhamento do que já está no Dashboard, com cálculos e indicadores visuais.
- **Financeiro:** protótipo com filtros e visão de pagamentos futuros (ainda sem a nova marca aplicada).

**Pergunta para Erika:**
> *"Em relação a esses dois pontos na interface, queria saber se faz sentido e depois repassar alguns pontos para ver se o que a gente pontuou é o que a gente entendeu mesmo."*

---

### 🗣️ **Erika (Cliente) — Feedback e Novos Direcionamentos**

#### **1. Sobre a Capacidade de Carga e Complexidade (Não é Prioridade)**

> *"Essa parte da capacidade é uma coisa que não precisa ser considerada. O que é importante pra gente é que a gente consiga lançar o nome das costureiras e os serviços (ex: cortinas) com as datas. Porque a capacidade não dá pra saber exatamente — tem semana que ela vai receber a filha que vem de fora, então não dá pra ter uma noção exata."*

> *"A complexidade também não precisa ser classificada. Se o item for mais complexo, a gente lança como duas cortinas e pronto, porque a gente já sabe que ela vai gastar mais tempo. A gente já consegue fazer essa distribuição de forma manual."*

#### **2. O que Realmente Importa: Visualização Semanal**

> *"O que a gente mais precisa é ver, por exemplo, o nome da costureira e conseguir lançar por semana o que ela tem pra fazer. Exemplo: semana do dia 27 ao dia 1 de agosto, a costureira Mercês tem 10 cortinas. Já na semana do dia 3 ao dia 8, ela tem só duas. Assim, eu consigo saber se ainda posso mandar mais cortinas para ela."*

> *"Não precisa ser um sistema automatizado. A gente faz isso de forma manual, conversando com a costureira. O importante é ter uma visão clara do que está agendado para cada semana."*

#### **3. Sobre o Financeiro e Pagamentos**

> *"A parte financeira é legal, mas não precisa ser muito elaborada. O que é importante é conseguir ver, por exemplo, na semana, o que está agendado e quanto vou ter que pagar."*

> *"A gente já tem uma tabela de preços por metro. Quando lanço um serviço, já sei quanto ela vai cobrar. Por exemplo, cortina de 3 metros a R$30 o metro = R$90. O sistema pode vir com um valor preenchido (ex: R$10), e a gente vai mudar conforme necessidade."*

> *"É importante conseguir visualizar o que está pendente e o que já foi pago, mas também não é uma coisa exata porque tem semana que elas costuram mais ou menos."*

#### **4. Sobre Itens e Cadastros**

> *"Se for um item que não está na lista, seria interessante ter uma opção de cadastrar um novo item. A maioria dos itens é por metro, mas alguns são por peça, tipo almofada. Se tiver jeito de fazer dessa forma, é bom."*

#### **5. Sobre a Interface Visual**

> *"Visual tá maravilhoso, ficou muito legal."*

---

### 🗣️ **Ananda (Encaminhamento)**

> *"Entendi. Então a gente vai fazer os ajustes aqui. Basicamente, a gente vai precisar saber dessas peças e deixar o campo preenchido com um valor padrão para vocês alterarem depois."*

> *"A gente vai ajustar para focar na visualização semanal, com lançamento manual de serviços e datas, sem automação de capacidade ou complexidade. E a parte financeira vai ter um resumo com valores por metro e por peça."*

> *"Muito obrigado. Vamos alinhar as dúvidas no grupo e seguir com os ajustes na interface para entregar o mais alinhado possível."*

---

## ✅ **Resumo dos Principais Pontos**

| Tópico | Feedback da Cliente | Impacto no Planejamento |
|--------|---------------------|-------------------------|
| **Capacidade de Carga** | ❌ Não é prioridade — distribuição é manual e depende de conversa com costureiras | Remover automação de cálculo de capacidade; manter apenas registro manual de serviços por semana |
| **Complexidade** | ❌ Não precisa classificar — itens complexos são lançados como múltiplas unidades (ex: 2 cortinas) | Remover campo de complexidade e peso; simplificar o cadastro |
| **Visualização Semanal** | ✅ Prioridade máxima — ver o que cada costureira tem por semana | Criar visão semanal com serviços agendados por costureira |
| **Financeiro** | ✅ Importante, mas simples — valores por metro/peça com edição manual | Manter cálculo por metro/peça; permitir edição manual de valores |
| **Cadastro de Itens** | ✅ Necessário — poder cadastrar novos itens e preços | Adicionar funcionalidade de cadastro de novos itens |
| **Interface Visual** | ✅ Aprovada — "visual tá maravilhoso" | Manter Design System atual |
| **Pagamento** | ✅ Semanal — não por serviço individual | Agrupar pagamentos por semana |
| **Edição Manual de Valores** | ✅ Necessário — preços podem ser alterados | Permitir edição manual de valores por serviço |

---


# 📊 Análise de Impacto: Feedback do Cliente nos Épicos M2

**Data:** 21/07/2026  
**Autor:** Ananda Matos  
**Épicos Afetados:** EPIC-M2-CORE-001, EPIC-M2-UX-001  
**Documentos Fonte:**
- STORY-M1-CORE-003-Matriz-CSD-Capacidade-Produtiva.md (respostas D1-D11)
- STORY-M1-UX-001-problem-statements.md (respostas D1-D5)

---

## 🎯 Resumo Executivo

**Impacto Geral:** ⚠️ **MÉDIO-ALTO** - Mudanças estratégicas que afetam design e arquitetura  
**Recomendação:** Incorporar mudanças no desenvolvimento atual (Sprint 4) para evitar refactoring futuro  
**Sprint Afetada:** Sprint 4 (06/07 a 12/07/2026)  
**Esforço de Ajuste:** +15-20% (6-9 SP adicionais estimados)

---

## 📌 Notas Importantes

- **Design System:** Não estamos usando Figma no momento. Prototipação é em código.
- **Escopo Aberto:** Features adicionais (automação, especialização) serão avaliadas conforme progresso da Sprint 4. Decisão será tomada com base em entrega real.
- **Costureiras ≠ Usuárias do Sistema:** Toda interação é via gestora. Sem features para costureiras na plataforma.

---

### EPIC-M2-CORE-001 - Lógica Financeira

#### 🔴 Impactos Críticos (Arquitetura)

| Mudança | Impacto | Esforço | Prioridade |
|---------|---------|---------|-----------|
| **C10: Capacidade personalizada por costureira** | Modelo de dados precisa de campo `capacidade_maxima_semanal` por costureira (não global) | +3 SP | 🔴 Crítico |
| **C11: Capacidade varia em férias/afastamentos** | Adicionar sistema de período de indisponibilidade | +5 SP | 🔴 Crítico |
| **C7: Distribuição manual** | Remover ou marcar como "futura" a automação inteligente de distribuição | -2 SP | 🟡 Importante |

#### 🟡 Impactos Importantes (Lógica)

| Mudança | Impacto | Esforço | Prioridade |
|---------|---------|---------|-----------|
| **C12: Gestora altera manualmente complexidade** | Adicionar endpoint de edição manual de complexidade com auditoria | +2 SP | 🟡 Importante |
| **C8: Tipo de produto influencia complexidade** | Validar se já está implementado em CORE-003; se não, adicionar | ±0 SP | 🟡 Importante |
| **C9: Considerar especialização** | Validar se é MVP2 ou MVP3; se M2, adicionar peso de especialização | +3-5 SP | 🟡 Importante |

#### 🟢 Impactos Menores (Cálculos)

| Mudança | Impacto | Esforço | Prioridade |
|---------|---------|---------|-----------|
| **C9: Atualização diária (de D1)** | Batch job diário é suficiente (vs real-time) | -1 SP | 🟢 Menor |
| **C14: Considerar agendados** | Validar se já está em CORE-003 | ±0 SP | 🟢 Menor |

---

### EPIC-M2-UX-001 - Interface Financeira

#### 🟢 Impactos Positivos (Redução de Escopo)

| Mudança | Impacto | Esforço | Prioridade |
|---------|---------|---------|-----------|
| **C2, D2: Sem notificações para costureiras** | Remover feature de notificações mobile | **-3 SP** | 🟢 Redução |
| **D5: Costureiras não usam app** | Interface mobile é opcional/backlog (foco desktop para gestora) | **-5 SP** | 🟢 Redução |
| **C15: Distribuição manual** | Não precisa de dashboard de sugestões automáticas | **-2 SP** | 🟢 Redução |

#### 🔴 Impactos Críticos (Design)

| Mudança | Impacto | Esforço | Prioridade |
|---------|---------|---------|-----------|
| **D3: Gráfico de colunas obrigatório** | Alterar STORY-M2-UX-002 para priorizar gráfico de colunas (vs outros tipos) | +1 SP | 🔴 Crítico |
| **Interface focada na gestora** | Todos os dashboards financeiros devem ser desktop-first (não mobile-first) | +2 SP | 🔴 Crítico |

#### 🟡 Impactos Importantes (Requisitos)

| Mudança | Impacto | Esforço | Prioridade |
|---------|---------|---------|-----------|
| **C11: Variação de capacidade** | STORY-M2-UX-001 (Resumo) precisa mostrar período de ausência | +2 SP | 🟡 Importante |
| **C10: Capacidade personalizada** | Visualização de pagamentos precisa mostrar limite individual por costureira | +1 SP | 🟡 Importante |

---

## 📊 Resumo de Esforço

### Alterações Necessárias vs Planejado

| Squad | Story | Planejado | Adições | Remoções | Nova Estimativa |
|-------|-------|-----------|---------|----------|-----------------|
| **Core** | STORY-M2-CORE-001 (Modelo) | 5 SP | +3 | — | **8 SP** |
| **Core** | STORY-M2-CORE-002 (Cálculo) | 3 SP | +2 | -1 | **4 SP** |
| **Core** | STORY-M2-CORE-003 (Planejamento) | 5 SP | — | -1 | **4 SP** |
| **UX** | STORY-M2-UX-001 (Resumo) | 5 SP | +2 | — | **7 SP** |
| **UX** | STORY-M2-UX-002 (Visualização) | 5 SP | +3 | -5 | **3 SP** |
| **UX** | STORY-M2-UX-003 (Planejamento) | 3 SP | — | — | **3 SP** |
| **TOTAL** | | **26 SP** | **+10 SP** | **-7 SP** | **29 SP** |

**Delta:** +3 SP (+11% da sprint)  
**Viável?** ✅ Sim, dentro da margem de segurança (20%)

---

## 🔧 Recomendações por História

### ✅ Incorporar no Desenvolvimento Atual (Sprint 4)

#### **STORY-M2-CORE-001: Modelo de Dados Financeiro**
- ✅ **Adicionar:** Campo `capacidade_maxima_semanal` por costureira (não global)
- ✅ **Adicionar:** Modelo `PeriodoIndisponibilidade` (férias, afastamentos)
- ✅ **Adicionar:** Campo `especialidades` na relação costureira-serviço
- ✅ **Adicionar:** Log de auditoria para alterações de complexidade
- **Estimativa:** 8 SP (vs 5 SP planejado)
- **Criticidade:** 🔴 Crítico

#### **STORY-M2-CORE-002: Cálculo de Pagamentos**
- ✅ **Ajustar:** Considerar capacidade personalizada por costureira
- ✅ **Ajustar:** Excluir períodos de indisponibilidade do cálculo
- ⏳ **Postergar:** Automação inteligente de distribuição (apenas distribuição manual em M2)
- **Estimativa:** 4 SP (vs 3 SP planejado)
- **Criticidade:** 🟡 Importante

#### **STORY-M2-UX-002: Visualização de Pagamentos**
- ✅ **Priorizar:** Gráfico de colunas como formato principal
- ✅ **Adicionar:** Indicador de limite individual de capacidade
- ✅ **Remover:** Mobile responsiveness (será mobile-unaware, desktop-first)
- ✅ **Remover:** Notificações push/mobile alerts
- **Estimativa:** 3 SP (vs 5 SP planejado - economia de 2 SP!)
- **Criticidade:** 🔴 Crítico

### ⏳ Fora do Escopo (Não está no Roadmap)

| Feature | Motivo | Status |
|---------|--------|--------|
| **Notificações SMS/WhatsApp** | Costureiras não interagem com sistema | ❌ Não aplica |
| **Mobile-first para costureiras** | Foco é web/desktop para gestora | ❌ Não aplica |
| **Automação inteligente distribuição** | Distribuição é manual (C15) | ⏳ Avaliar M3+ |
| **Especialização como peso** | Validar se realmente é M2 com cliente | ⏳ Avaliar M3+ |

---

## 🎯 Decisões por Feature

### Feature: Capacidade Personalizada (C10)

**Decisão:** ✅ **Incorporar em M2**

```
ANTES (M1):
- Limite global: 40 horas/semana para todas

AGORA (M2):
- Limite individual: Ana = 40h/sem, Sirlene = 35h/sem, etc
- Campo: Costureira.capacidade_maxima_semanal (int)
- Impacto CORE: +3 SP
- Impacto UX: +1 SP
```

### Feature: Períodos de Indisponibilidade (C11)

**Decisão:** ✅ **Incorporar em M2**

```
NECESSÁRIO para:
- Excluir costureiras em férias do cálculo de carga
- Mostrar "indisponível de 01/08 a 15/08" na UI
- Impacto CORE: +5 SP
- Impacto UX: +2 SP
```

### Feature: Distribuição Manual (C15)

**Decisão:** ✅ **Simplificar em M2**

```
REMOVER de M2:
- Sugestões automáticas de distribuição
- Score de afinidade com especialização
- Sistema de prioridade por urgência

MANTER em M2:
- UI para gestora fazer distribuição manual
- Validação de limite de capacidade
```

### Feature: Notificações (D2)

**Decisão:** ❌ **Não está no Escopo**

```
RAZÃO: Costureiras não acessam o sistema
- Comunicação é exclusivamente WhatsApp
- Sem necessidade de notificações de qualquer tipo (SMS, push, etc)
- Economia de 3 SP em UX remanejada para features críticas de M2
- Definitivo: Não está na roadmap do produto
```

### Feature: Mobile para Costureiras (D5)

**Decisão:** ❌ **Não é prioridade - Foco Desktop Permanente**

```
RAZÃO: Costureiras não têm interação com o sistema
- Comunicação continua sendo WhatsApp
- Interface será responsiva, mas foco é desktop/web
- Economia anterior: -5 SP mantida
- M2+: Desktop-first é padrão, não mobile-first

Abordagem:
- Responsividade básica (não quebra, mas não otimizada)
- Foco: Computador para gestora
- Futuro: Avaliar conforme progresso da sprint
```

---

## 📅 Timeline de Implementação

### Sprint 4 (06/07 - 12/07) - COM AJUSTES

```
SEGUNDA (06/07)
- Kick-off com ajustes incorporados
- Atualizar task boards

TERÇA-SEXTA (07/07 - 10/07)
- CORE-001: +3 SP (capacidade personalizada + indisponibilidade)
- CORE-002: +2 SP (considerar novos campos)
- UX-001: +2 SP (novo campo de indisponibilidade)
- UX-002: -2 SP (sem mobile responsiveness)

SEGUNDA (13/07)
- Sprint Review com entregas ajustadas
- 29 SP entregues (vs 26 SP planejado)
```

### Sprint 5+ (M3 em diante) - BACKLOG PARA AVALIAÇÃO

```
BACKLOG FUTURO (Avaliar conforme progresso):
- Automação inteligente com especialização (se viável)
- Sugestões de distribuição baseadas em histórico (se viável)
- Melhorias de UX adicionais (a definir)

❌ NÃO ESTÁ NO ESCOPO:
- Notificações SMS/WhatsApp (costureiras não interagem com sistema)
- Desenvolvimento mobile-first (foco permanece desktop/web)
```

---

## ⚠️ Riscos Mitigados com Essas Mudanças

| Risco | Antes | Depois | Mitigation |
|-------|-------|--------|-----------|
| Refactoring de modelo de dados em M3 | Alto | Baixo | ✅ Incorporar capacidade personalizada agora |
| Confusão entre capacidade global/individual | Alto | Baixo | ✅ Deixar claro no modelo em M2 |
| Features não usadas (mobile costureiras) | Médio | Baixo | ✅ Postergar até validação com usuários |
| Distribuição manual não funcionar | Médio | Baixo | ✅ Simplificar escopo, testar com gestora |

---

## 🚀 Recomendação Final

### ✅ **INCORPORAR NO DESENVOLVIMENTO ATUAL (Sprint 4)**

**Justificativa:**
1. **Impacto controlável:** +3 SP extra, dentro da margem de segurança
2. **Evita refactoring:** Mudanças são estruturais (modelo de dados)
3. **Alinha com cliente:** Feedback já foi coletado, melhor implementar certo agora
4. **Economia em features:** Remoção de mobile/notificações compensa adições
5. **Timeline viável:** Sprint 4 começa 06/07, feedback recebido 21/07 (planejamento +3 dias é possível)

### 📊 Quadro Decisório

```
┌─────────────────────────────────────────────┐
│ CRITÉRIO              │ WEIGHT │ SCORE      │
├─────────────────────────────────────────────┤
│ Impacto Arquitetura   │ 30%    │ 9.0 (Alto) │
│ Esforço Necessário    │ 25%    │ 7.0 (Médio)│
│ Urgência              │ 20%    │ 8.0 (Alto) │
│ Risco de Refactor     │ 15%    │ 8.5 (Alto) │
│ Feedback Cliente      │ 10%    │ 9.5 (Alto) │
├─────────────────────────────────────────────┤
│ SCORE TOTAL           │ 100%   │ 8.2 ✅    │
└─────────────────────────────────────────────┘

RECOMENDAÇÃO: INCORPORAR AGORA
```

---

## 📝 Ações Imediatas (Próximas 24h)

- [ ] Comunicar ajustes ao time (Core + UX)
- [ ] Atualizar task boards do GitHub
- [ ] Revisar estimativas com Matheus-G-R (Core) e isabarrs (UX)
- [ ] Criar tasks detalhadas dos novos campos de BD
- [ ] Atualizar Figma com novo layout (sem mobile)
- [ ] Agendar refinement com cliente para dúvidas (se houver)

---

**Status:** ⚠️ **Recomendação Aguardando Aprovação**  
**Próxima Revisão:** 22/07/2026 (após alinhamento com time)  
**Documento Criado por:** Ananda Matos  
**Data:** 21/07/2026
