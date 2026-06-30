# Fluxos de Navegação - Cony Interiores

**Épico:** EPIC-M1-UX-001 - Interface e Jornada do Usuário  
**Story:** STORY-M1-UX-001 - Layout Base e Design System  
**Data de Criação:** 30/06/2026  
**Versão:** 1.0  
**Responsável:** @anandamatos

---

## 🎯 Objetivo deste Artefato

Este documento define os fluxos de navegação do sistema da Cony Interiores, mapeando como as usuárias irão interagir com o sistema para realizar suas tarefas principais. Os fluxos guiarão as decisões de design de interface e a arquitetura de navegação.

---

## 📊 Matriz CSD - Fluxos de Navegação

### Certezas (C) - O que já sabemos sobre os fluxos
| # | Certeza | Fonte |
|---|---------|-------|
| C1 | A gestora precisa acessar rapidamente a carga de trabalho | Entrevista com gestora |
| C2 | A gestora precisa cadastrar novos serviços | Entrevista com gestora |
| C3 | A costureira precisa visualizar sua carga de trabalho | Relato das costureiras |
| C4 | A auxiliar precisa cadastrar e manter dados | Entrevista com auxiliar |
| C5 | O sistema deve ser simples e intuitivo | Perfil das usuárias |

### Suposições (S) - O que acreditamos sobre os fluxos
| # | Suposição | Impacto se estiver errada |
|---|-----------|---------------------------|
| S1 | A gestora quer um dashboard como primeira tela | Pode preferir acesso direto a outras funcionalidades |
| S2 | As costureiras querem uma visão simplificada da carga | Pode ser muito simplificada ou complexa |
| S3 | O cadastro de serviços deve ser rápido | Pode faltar informações importantes |
| S4 | A navegação deve ser por menus laterais | Pode não ser intuitiva para todos |
| S5 | As costureiras usarão o sistema no celular | Pode não ser otimizado para mobile |

### Dúvidas (D) - O que precisamos validar
| # | Dúvida | Como validar |
|---|--------|--------------|
| D1 | A gestora prefere dashboard ou acesso direto às funcionalidades? | Protótipo e teste de usabilidade |
| D2 | As costureiras querem ver apenas a carga ou também detalhes dos serviços? | Pesquisa com costureiras |
| D3 | Qual a profundidade ideal da navegação (telas até a informação)? | Teste de usabilidade |
| D4 | As costureiras vão acessar o sistema pelo celular ou computador? | Pesquisa com costureiras |
| D5 | A gestora quer aprovar os pagamentos antes de gerar o resumo? | Entrevista com gestora |

---

## 🗺️ Mapa de Navegação Geral

```mermaid
flowchart TD
    HOME[🏠 Página Inicial / Dashboard]
    
    HOME --> S1[📋 Serviços]
    HOME --> S2[👩‍🔧 Costureiras]
    HOME --> S3[💰 Financeiro]
    HOME --> S4[📊 Relatórios]
    
    S1 --> S1_1[➕ Novo Serviço]
    S1 --> S1_2[📋 Listar Serviços]
    S1 --> S1_3[🔍 Buscar Serviço]
    
    S1_1 --> S1_1_1[📝 Cadastrar Serviço]
    S1_1_1 --> S1_1_2[✅ Confirmar Cadastro]
    
    S1_2 --> S1_2_1[📋 Detalhes do Serviço]
    S1_2_1 --> S1_2_2[✏️ Editar Serviço]
    S1_2_1 --> S1_2_3[📊 Atualizar Status]
    S1_2_1 --> S1_2_4[🗑️ Excluir Serviço]
    
    S2 --> S2_1[➕ Nova Costureira]
    S2 --> S2_2[👩‍🔧 Listar Costureiras]
    
    S2_1 --> S2_1_1[📝 Cadastrar Costureira]
    S2_1_1 --> S2_1_2[✅ Confirmar Cadastro]
    
    S2_2 --> S2_2_1[👤 Perfil da Costureira]
    S2_2_1 --> S2_2_2[📋 Serviços da Costureira]
    S2_2_1 --> S2_2_3[💰 Pagamentos da Costureira]
    
    S3 --> S3_1[📊 Resumo Financeiro]
    S3 --> S3_2[💰 Pagamentos Pendentes]
    S3 --> S3_3[📈 Planejamento Financeiro]
    
    S4 --> S4_1[📋 Relatório de Produção]
    S4 --> S4_2[📋 Relatório de Pagamentos]
    S4 --> S4_3[📊 Relatório de Atrasos]
    
    style HOME fill:#c8e6c9
    style S1 fill:#e3f2fd
    style S2 fill:#e3f2fd
    style S3 fill:#fff3e0
    style S4 fill:#f3e5f5
```

---

## 📋 Fluxo 1: Cadastro de Serviço

### Persona: Gestora (Ana) e Auxiliar (Carla)

### Fluxograma

```mermaid
flowchart TD
    A[📋 Acessar página de Serviços] --> B[➕ Clique em 'Novo Serviço']
    B --> C[📝 Preencher formulário]
    C --> D[👤 Selecionar costureira]
    D --> E[📅 Definir prazo de entrega]
    E --> F[💰 Definir valor do serviço]
    F --> G[✅ Clicar em 'Cadastrar']
    G --> H[📋 Visualizar serviço na lista]
    H --> I[📱 Notificação enviada à costureira]
    
    style A fill:#e3f2fd
    style B fill:#e3f2fd
    style C fill:#fff3e0
    style D fill:#fff3e0
    style E fill:#fff3e0
    style F fill:#fff3e0
    style G fill:#c8e6c9
    style H fill:#e8f5e9
    style I fill:#f3e5f5
```

### Decisões de UX

| Decisão | Justificativa |
|---------|---------------|
| **Formulário em etapas** | Reduz a sobrecarga cognitiva, facilita o preenchimento |
| **Seleção de costureira com indicador de carga** | Ajuda a gestora a escolher a costureira com menor carga |
| **Campos obrigatórios destacados** | Reduz erros de preenchimento |
| **Feedback visual ao cadastrar** | Confirmação imediata para o usuário |

### Protótipo do Formulário (Esboço)

```text
+--------------------------------------------------+
|  📋 NOVO SERVIÇO                                 |
+--------------------------------------------------+
|  Cliente: [_____________________________]          |
|  Produto: [Dropdown ▼]                            |
|  Quantidade: [____]                               |
|  Complexidade: [Pequena ▼]                        |
|  Data de Envio: [📅 DD/MM/YYYY]                   |
|  Prazo de Entrega: [📅 DD/MM/YYYY]                |
|  Valor: [R$ ______]                              |
|  Costureira: [Selecionar ▼]                      |
|  Observações: [_____________________________]     |
|                                                    |
|  [  ❌ Cancelar  ]  [  ✅ Cadastrar  ]            |
+--------------------------------------------------+
```

---

## 📋 Fluxo 2: Acompanhamento da Produção

### Persona: Gestora (Ana)

### Fluxograma

```mermaid
flowchart TD
    A[🏠 Acessar Dashboard] --> B[📊 Visualizar indicadores]
    B --> C[📋 Ver lista de serviços em andamento]
    C --> D[🔍 Filtrar por costureira ou status]
    D --> E[📋 Clicar em um serviço para ver detalhes]
    E --> F[📊 Ver progresso do serviço]
    F --> G[📱 Notificar costureira sobre atraso?]
    G --> H[✅ Ação tomada]
    
    style A fill:#c8e6c9
    style B fill:#e3f2fd
    style C fill:#e3f2fd
    style D fill:#e3f2fd
    style E fill:#fff3e0
    style F fill:#fff3e0
    style G fill:#f3e5f5
    style H fill:#c8e6c9
```

### Decisões de UX

| Decisão | Justificativa |
|---------|---------------|
| **Dashboard como primeira tela** | Gestora precisa de visão geral imediata |
| **Cards com carga de trabalho** | Visualização rápida da situação de cada costureira |
| **Alertas visuais para serviços atrasados** | Chama a atenção para problemas críticos |
| **Filtros rápidos** | Permite focar em informações específicas |

### Protótipo do Dashboard (Esboço)

```text
+--------------------------------------------------+
|  🏠 CONY INTERIORES - DASHBOARD                   |
+--------------------------------------------------+
|  🔍 Buscar...                        | 👤 Ana    |
+--------------------------------------------------+
|  📊 VISÃO GERAL                                   |
|  +------------+  +------------+  +------------+   |
|  | 📋 Serviços |  | 👩‍🔧 Costureiras|  | 💰 Pagamentos|   |
|  | Ativos: 12  |  | Ativas: 4  |  | Pendentes: 3|   |
|  +------------+  +------------+  +------------+   |
|                                                    |
|  👩‍🔧 CARGA DE TRABALHO                             |
|  +----------+  +----------+  +----------+         |
|  | Sirlene  |  | Maria    |  | Joana    |         |
|  | ████████  |  | ██████   |  | ████     |         |
|  | 8/10     |  | 6/10     |  | 4/10     |         |
|  +----------+  +----------+  +----------+         |
|                                                    |
|  ⚠️ SERVIÇOS EM ATRASO                             |
|  • Cliente: João - Prazo: 25/06 - Atraso: 2d     |
|  • Cliente: Maria - Prazo: 26/06 - Atraso: 1d    |
+--------------------------------------------------+
```

---

## 📋 Fluxo 3: Visualização de Carga pela Costureira

### Persona: Costureira (Sirlene)

### Fluxograma

```mermaid
flowchart TD
    A[📱 Acessar sistema pelo celular] --> B[🔐 Login simplificado]
    B --> C[🏠 Visualizar dashboard pessoal]
    C --> D[📋 Ver minha carga de trabalho]
    D --> E[📋 Ver detalhes de cada serviço]
    E --> F[📊 Atualizar status do serviço]
    F --> G[✅ Confirmar atualização]
    
    style A fill:#e3f2fd
    style B fill:#e3f2fd
    style C fill:#c8e6c9
    style D fill:#e3f2fd
    style E fill:#fff3e0
    style F fill:#fff3e0
    style G fill:#c8e6c9
```

### Decisões de UX

| Decisão | Justificativa |
|---------|---------------|
| **Interface otimizada para mobile** | Costureiras usam principalmente o celular |
| **Login simplificado** | Reduz barreiras de acesso |
| **Cards com carga de trabalho** | Visualização clara e rápida |
| **Status com ícones** | Facilita a compreensão |

### Protótipo Mobile (Esboço)

```text
+------------------+
|  👩‍🔧 Olá, Sirlene  |
+------------------+
|  📋 MINHA CARGA   |
|  ██████████░░░░░  |
|  6/10 serviços    |
+------------------+
|  📋 SERVIÇOS      |
|  +----------------+ |
|  | 📦 Cliente: João | |
|  | Cortina Ilhós   | |
|  | ⏳ Em produção  | |
|  | 📅 Entrega: 30/06| |
|  +----------------+ |
|  +----------------+ |
|  | 📦 Cliente: Ana  | |
|  | Forro           | |
|  | 🔄 Aguardando   | |
|  | 📅 Entrega: 02/07| |
|  +----------------+ |
|                    |
|  [  ➕ Atualizar Status  ] |
+------------------+
```

---

## 📋 Fluxo 4: Cadastro de Costureira

### Persona: Auxiliar (Carla) e Gestora (Ana)

### Fluxograma

```mermaid
flowchart TD
    A[📋 Acessar página de Costureiras] --> B[➕ Clique em 'Nova Costureira']
    B --> C[📝 Preencher formulário]
    C --> D[👤 Nome e contato]
    D --> E[📝 Observações e especialidade]
    E --> F[✅ Clicar em 'Cadastrar']
    F --> G[👩‍🔧 Visualizar costureira na lista]
    
    style A fill:#e3f2fd
    style B fill:#e3f2fd
    style C fill:#fff3e0
    style D fill:#fff3e0
    style E fill:#fff3e0
    style F fill:#c8e6c9
    style G fill:#e8f5e9
```

### Decisões de UX

| Decisão | Justificativa |
|---------|---------------|
| **Campos mínimos obrigatórios** | Agiliza o cadastro |
| **Campo de observações** | Flexibilidade para informações adicionais |
| **Validação de dados** | Garante a integridade dos dados |

---

## 📋 Fluxo 5: Controle Financeiro (MVP 2)

### Persona: Gestora (Ana)

### Fluxograma

```mermaid
flowchart TD
    A[💰 Acessar página Financeiro] --> B[📊 Visualizar resumo financeiro]
    B --> C[📋 Ver pagamentos pendentes]
    C --> D[👩‍🔧 Filtrar por costureira]
    D --> E[💰 Ver detalhes de cada pagamento]
    E --> F[✅ Marcar como 'Pago']
    F --> G[📋 Gerar resumo de pagamentos]
    
    style A fill:#fff3e0
    style B fill:#fff3e0
    style C fill:#fff3e0
    style D fill:#fff3e0
    style E fill:#fff3e0
    style F fill:#c8e6c9
    style G fill:#e8f5e9
```

### Decisões de UX

| Decisão | Justificativa |
|---------|---------------|
| **Resumo financeiro como primeira tela** | Gestora precisa de visão rápida dos valores |
| **Filtros por costureira** | Facilita a gestão individual |
| **Indicadores visuais** | Facilita a identificação de pendências |

---

## 🗺️ Mapa de Navegação por Persona

### Gestora (Ana)
```mermaid
flowchart LR
    A[Dashboard] --> B[Serviços]
    A --> C[Costureiras]
    A --> D[Financeiro]
    A --> E[Relatórios]
    
    B --> F[Cadastrar Serviço]
    B --> G[Listar Serviços]
    B --> H[Buscar Serviço]
    
    D --> I[Resumo Financeiro]
    D --> J[Pagamentos Pendentes]
    D --> K[Planejamento Financeiro]
```

### Costureira (Sirlene)
```mermaid
flowchart LR
    A[Dashboard Pessoal] --> B[Minha Carga]
    A --> C[Meus Serviços]
    A --> D[Meus Pagamentos]
    
    B --> E[Visualizar Carga]
    C --> F[Detalhes do Serviço]
    C --> G[Atualizar Status]
    D --> H[Valores a Receber]
```

### Auxiliar (Carla)
```mermaid
flowchart LR
    A[Dashboard] --> B[Serviços]
    A --> C[Costureiras]
    A --> D[Relatórios]
    
    B --> E[Cadastrar Serviço]
    B --> F[Listar Serviços]
    B --> G[Buscar Serviço]
    
    C --> H[Cadastrar Costureira]
    C --> I[Listar Costureiras]
```

---

## 📊 Matriz de Priorização dos Fluxos

```mermaid
quadrantChart
    title Priorização dos Fluxos de Navegação
    x-axis "Baixa Frequência" --> "Alta Frequência"
    y-axis "Baixo Impacto" --> "Alto Impacto"
    quadrant-1 "Crítico"
    quadrant-2 "Importante"
    quadrant-3 "Oportunidade"
    quadrant-4 "Baixa Prioridade"
    
    Cadastro de Serviço: [0.9, 0.9]
    Acompanhamento da Produção: [0.8, 0.9]
    Visualização de Carga: [0.8, 0.8]
    Cadastro de Costureira: [0.6, 0.7]
    Controle Financeiro: [0.5, 0.6]
```

**Legenda:**
- **🟢 Crítico:** Cadastro de Serviço, Acompanhamento da Produção, Visualização de Carga
- **🟡 Importante:** Cadastro de Costureira
- **🔵 Oportunidade:** Controle Financeiro (MVP 2)

---

## 📋 Matriz de Rastreabilidade (Fluxo ↔ Story)

| Fluxo | Story Relacionada | MVP |
|-------|-------------------|-----|
| Cadastro de Serviço | STORY-M1-CORE-002 | MVP 1 |
| Acompanhamento da Produção | STORY-M1-UX-001 | MVP 1 |
| Visualização de Carga | STORY-M1-UX-003 | MVP 1 |
| Cadastro de Costureira | STORY-M1-CORE-001 | MVP 1 |
| Controle Financeiro | STORY-M2-CORE-001, STORY-M2-UX-001 | MVP 2 |

---

## ✅ Próximos Passos

| Ordem | Atividade | Responsável | Data |
|-------|-----------|-------------|------|
| 1 | Validar Fluxos de Navegação com o cliente | @anandamatos | 30/06 |
| 2 | Refinar com base no feedback | @anandamatos | 01/07 |
| 3 | Criar protótipos de baixa fidelidade | @anandamatos | 02/07 |
| 4 | Iniciar prototipação de alta fidelidade | @anandamatos | 03/07 |

---

## 📎 Anexos

- **Entrevistas realizadas:** [link para notas]
- **Benchmark de sistemas:** [link para benchmark]
- **Protótipos iniciais:** [link para Figma]

---

**Status:** Aguardando validação com o cliente  
**Próxima Reunião:** 30/06/2026 - 14h

---

## 🎯 Resumo Executivo

| Fluxo | Persona | Prioridade | Story |
|-------|---------|------------|-------|
| **Cadastro de Serviço** | Gestora/Auxiliar | 🔴 Crítico | STORY-M1-CORE-002 |
| **Acompanhamento da Produção** | Gestora | 🔴 Crítico | STORY-M1-UX-001 |
| **Visualização de Carga** | Costureira | 🔴 Crítico | STORY-M1-UX-003 |
| **Cadastro de Costureira** | Auxiliar | 🟡 Importante | STORY-M1-CORE-001 |
| **Controle Financeiro** | Gestora | 🔵 Oportunidade | STORY-M2-CORE-001 |
