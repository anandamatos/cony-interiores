# Métricas de Navegação - Cony Interiores

**Épico:** EPIC-M1-UX-001 - Interface e Jornada do Usuário  
**Story:** STORY-M1-UX-001 - Layout Base e Design System  
**Data de Criação:** 30/06/2026  
**Versão:** 1.0  
**Responsável:** @anandamatos

---

## 🎯 Objetivo deste Artefato

Este documento define as métricas de navegação do sistema da Cony Interiores, utilizando a metodologia **HEART** do Google com foco em como os usuários se movem pelo sistema. As métricas guiarão decisões de arquitetura de informação, design de navegação e otimização da experiência do usuário.

---

## 📊 Matriz CSD - Métricas de Navegação

### Certezas (C) - O que já sabemos
| # | Certeza | Fonte |
|---|---------|-------|
| C1 | A gestora precisa acessar informações rapidamente | Entrevista com gestora |
| C2 | As costureiras têm baixa proficiência tecnológica | Perfil das costureiras |
| C3 | A navegação deve ser simples e intuitiva | Perfil das usuárias |
| C4 | O sistema será usado em diferentes dispositivos | Pesquisa inicial |
| C5 | A gestora quer visualizar dados consolidados | Entrevista com gestora |

### Suposições (S) - O que acreditamos
| # | Suposição | Impacto se estiver errada |
|---|-----------|---------------------------|
| S1 | A navegação principal será por menu lateral | Pode não ser intuitiva para todos |
| S2 | As costureiras usarão o sistema no celular | Pode não ser otimizado para mobile |
| S3 | A gestora usará o sistema no computador | Pode não ser otimizado para desktop |
| S4 | Os usuários querem atalhos para ações frequentes | Pode ser ignorado |
| S5 | A navegação deve ter no máximo 3 níveis de profundidade | Pode ser muito raso ou profundo |

### Dúvidas (D) - O que precisamos validar
| # | Dúvida | Como validar |
|---|--------|--------------|
| D1 | Qual o fluxo de navegação mais comum? | Analytics |
| D2 | As costureiras preferem navegação por cards ou lista? | Teste de usabilidade |
| D3 | Qual a profundidade ideal de navegação? | Analytics + Teste de usabilidade |
| D4 | Os usuários usam busca ou navegação por menus? | Analytics |
| D5 | Qual o tempo máximo aceitável entre telas? | Teste de usabilidade |

---

## 🎯 Metodologia HEART - Navegação

### Dimensões HEART para Navegação

| Dimensão | Aplicação na Navegação | Por que é importante |
|----------|------------------------|---------------------|
| **H** - Happiness | Satisfação com a facilidade de encontrar informações | Navegação frustrante → abandono |
| **E** - Engagement | Frequência de uso da navegação (menus, busca) | Navegação engajadora → mais uso |
| **A** - Adoption | % de usuários que usam navegação avançada (filtros, busca) | Maior adoção → usuários mais eficientes |
| **R** - Retention | Retorno de usuários que encontraram o que procuravam | Navegação eficiente → retenção |
| **T** - Task Success | Taxa de sucesso em encontrar informações | Navegação clara → tarefas concluídas |

---

## 📊 Métrica 1: Profundidade de Navegação

### Definição
Número médio de telas visitadas entre a página inicial e a conclusão de uma tarefa.

### Objetivo
Garantir que os usuários encontrem as informações com o mínimo de cliques possível.

### Metas
| Perfil | Profundidade Ideal | Profundidade Máxima |
|--------|-------------------|-------------------|
| **Gestora** | 2-3 telas | ≤ 4 telas |
| **Costureira** | 1-2 telas | ≤ 3 telas |
| **Auxiliar** | 2-3 telas | ≤ 4 telas |

### Mapa de Profundidade

```mermaid
flowchart TD
    subgraph "Profundidade 1"
        A[🏠 Dashboard]
    end
    
    subgraph "Profundidade 2"
        B[📋 Lista de Serviços]
        C[👩‍🔧 Lista de Costureiras]
    end
    
    subgraph "Profundidade 3"
        D[📝 Cadastro de Serviço]
        E[👤 Perfil da Costureira]
        F[💰 Resumo Financeiro]
    end
    
    subgraph "Profundidade 4"
        G[📋 Detalhes do Serviço]
        H[📊 Relatório de Produção]
    end
    
    A --> B
    A --> C
    B --> D
    B --> G
    C --> E
    D --> G
    C --> F
    F --> H
```

---

## 📊 Métrica 2: Caminhos Mais Comuns

### Definição
Sequência mais frequente de telas visitadas durante uma sessão.

### Objetivo
Identificar os fluxos mais utilizados para otimizá-los e criar atalhos.

### Caminhos Esperados

| Perfil | Caminho Mais Comum | Frequência Esperada |
|--------|-------------------|---------------------|
| **Gestora** | Dashboard → Lista de Serviços → Detalhes do Serviço | 60% |
| **Costureira** | Dashboard → Minha Carga → Detalhes do Serviço | 80% |
| **Auxiliar** | Dashboard → Lista de Serviços → Cadastro de Serviço | 50% |

### Mapa de Caminhos

```mermaid
flowchart LR
    subgraph "Gestora"
        G1[Dashboard] --> G2[Lista de Serviços]
        G2 --> G3[Detalhes do Serviço]
        G1 --> G4[Lista de Costureiras]
        G4 --> G5[Perfil da Costureira]
    end
    
    subgraph "Costureira"
        C1[Dashboard] --> C2[Minha Carga]
        C2 --> C3[Detalhes do Serviço]
    end
    
    subgraph "Auxiliar"
        A1[Dashboard] --> A2[Lista de Serviços]
        A2 --> A3[Cadastro de Serviço]
        A1 --> A4[Lista de Costureiras]
        A4 --> A5[Cadastro de Costureira]
    end
```

---

## 📊 Métrica 3: Taxa de Abandono de Navegação

### Definição
% de usuários que iniciam um fluxo de navegação mas não o concluem.

### Objetivo
Identificar pontos de atrito onde os usuários desistem.

### Metas
| Fluxo | Taxa de Abandono Ideal | Taxa de Abandono Máxima |
|-------|----------------------|------------------------|
| **Cadastro de Serviço** | ≤ 10% | ≤ 20% |
| **Visualização de Carga** | ≤ 5% | ≤ 10% |
| **Cadastro de Costureira** | ≤ 10% | ≤ 20% |
| **Gerar Relatório** | ≤ 15% | ≤ 25% |

### Mapa de Abandono

```mermaid
flowchart TD
    subgraph "Fluxo de Cadastro de Serviço"
        A[Início do Cadastro] --> B[Preencher Formulário]
        B --> C[Selecionar Costureira]
        C --> D[Confirmar Cadastro]
    end
    
    subgraph "Pontos de Abandono"
        P1[❌ Abandono: 8%]
        P2[❌ Abandono: 5%]
        P3[❌ Abandono: 2%]
    end
    
    A -.->|15%| P1
    B -.->|8%| P2
    C -.->|5%| P3
```

---

## 📊 Métrica 4: Uso de Filtros e Busca

### Definição
% de usuários que utilizam filtros ou busca para encontrar informações.

### Objetivo
Entender se a navegação por menu é suficiente ou se os usuários precisam de ferramentas adicionais.

### Metas
| Funcionalidade | % de Uso Esperado | % de Uso Ideal |
|----------------|-------------------|----------------|
| **Filtros** | 40% | 60% |
| **Busca** | 20% | 30% |
| **Navegação por Menu** | 80% | 90% |
| **Atalhos** | 30% | 50% |

### Mapa de Uso

```mermaid
quadrantChart
    title Uso de Navegação
    x-axis "Baixa Frequência" --> "Alta Frequência"
    y-axis "Baixa Eficiência" --> "Alta Eficiência"
    quadrant-1 "Alta Performance"
    quadrant-2 "Melhorar"
    quadrant-3 "Baixa Prioridade"
    quadrant-4 "Otimizar"
    
    Menu: [0.8, 0.6]
    Filtros: [0.5, 0.8]
    Busca: [0.3, 0.7]
    Atalhos: [0.4, 0.5]
```

---

## 📊 Métrica 5: Tempo de Navegação por Tarefa

### Definição
Tempo médio gasto em cada etapa do fluxo de navegação.

### Objetivo
Identificar etapas que consomem mais tempo do que o esperado.

### Metas
| Tarefa | Tempo Esperado | Tempo Ideal | Ação se Exceder |
|--------|----------------|-------------|-----------------|
| **Dashboard → Lista de Serviços** | 5s | ≤ 3s | Otimizar carregamento |
| **Lista de Serviços → Detalhes** | 5s | ≤ 3s | Melhorar links |
| **Cadastro de Serviço** | 3min | ≤ 2min | Simplificar formulário |
| **Visualização de Carga** | 30s | ≤ 20s | Otimizar layout |

### Mapa de Tempo

```mermaid
flowchart TD
    subgraph "Tempo de Navegação"
        T1[Dashboard → Lista] --> T2[3s]
        T2[Lista → Detalhes] --> T3[5s]
        T3[Detalhes → Editar] --> T4[10s]
        T1[Dashboard → Cadastro] --> T5[2min]
    end
    
    subgraph "Meta"
        M1[Dashboard → Lista] --> M2[≤ 3s]
        M2[Lista → Detalhes] --> M3[≤ 3s]
        M3[Detalhes → Editar] --> M4[≤ 5s]
        M1[Dashboard → Cadastro] --> M5[≤ 1min]
    end
```

---

## 📊 Métrica 6: Retorno à Navegação (Bounce Rate)

### Definição
% de usuários que saem do sistema após visualizar apenas a primeira tela.

### Objetivo
Entender se a página inicial é atraente e direciona os usuários para as próximas etapas.

### Meta
- **Bounce Rate Ideal:** ≤ 20%
- **Bounce Rate Máximo:** ≤ 35%

### Mapa de Bounce Rate

```mermaid
flowchart TD
    subgraph "Usuários"
        U1[100% dos Usuários] --> U2[80% Continuam]
        U1 --> U3[20% Saem - Bounce]
    end
    
    subgraph "Motivos de Bounce"
        M1[Confusão sobre o que fazer]
        M2[Não encontrou o que procurava]
        M3[Interface confusa]
        M4[Carregamento lento]
    end
    
    U3 --> M1
    U3 --> M2
    U3 --> M3
    U3 --> M4
```

---

## 📊 Métrica 7: Adoção de Navegação Avançada

### Definição
% de usuários que utilizam recursos avançados de navegação.

### Objetivo
Entender se os usuários estão explorando todo o potencial do sistema.

### Metas
| Recurso Avançado | % de Adoção Esperada | % de Adoção Ideal |
|------------------|---------------------|-------------------|
| **Atalhos do Teclado** | 10% | 25% |
| **Filtros Salvos** | 15% | 30% |
| **Exportação de Dados** | 20% | 40% |
| **Navegação por Tags** | 25% | 40% |

### Mapa de Adoção

```mermaid
flowchart LR
    subgraph "Usuários que usam Navegação Avançada"
        A[Atalhos] --> A1[10%]
        B[Filtros Salvos] --> B1[15%]
        C[Exportação] --> C1[20%]
        D[Tags] --> D1[25%]
    end
    
    subgraph "Meta"
        A2[Atalhos] --> A3[25%]
        B2[Filtros Salvos] --> B3[30%]
        C2[Exportação] --> C3[40%]
        D2[Tags] --> D3[40%]
    end
```

---

## 📊 Matriz de Priorização das Métricas

```mermaid
quadrantChart
    title Priorização das Métricas de Navegação
    x-axis "Baixa Importância" --> "Alta Importância"
    y-axis "Baixa Urgência" --> "Alta Urgência"
    quadrant-1 "Alta Prioridade"
    quadrant-2 "Planejar"
    quadrant-3 "Monitorar"
    quadrant-4 "Baixa Prioridade"
    
    Profundidade: [0.9, 0.9]
    Caminhos Comuns: [0.8, 0.8]
    Taxa de Abandono: [0.9, 0.8]
    Uso de Filtros: [0.6, 0.6]
    Tempo de Navegação: [0.7, 0.7]
    Bounce Rate: [0.8, 0.7]
    Adoção Avançada: [0.5, 0.4]
```

---

## 📊 Matriz de Rastreabilidade (Métrica ↔ Story)

| Métrica | Story Relacionada | Como a Story Impacta a Métrica |
|---------|-------------------|-------------------------------|
| **Profundidade de Navegação** | STORY-M1-UX-001 | Layout e estrutura de navegação |
| **Caminhos Comuns** | STORY-M1-UX-002 | Formulários e integração |
| **Taxa de Abandono** | STORY-M1-UX-002 | Simplificação de formulários |
| **Uso de Filtros** | STORY-M1-UX-003 | Visualização de dados |
| **Tempo de Navegação** | STORY-M1-UX-001 | Performance e usabilidade |
| **Bounce Rate** | STORY-M1-UX-001 | Primeira impressão |
| **Adoção Avançada** | STORY-M1-UX-003 | Ferramentas avançadas |

---

## 📊 Dashboard de Métricas de Navegação

```mermaid
graph TD
    subgraph Dash ["Dashboard de Navegação - Cony Interiores"]
        direction TB
        P["Profundidade Média: 2.5"]
        C["Caminhos Comuns: 0.8"]
        A["Taxa de Abandono: 0.85"]
        F["Uso de Filtros: 0.6"]
        T["Tempo de Navegação: 0.7"]
        B["Bounce Rate: 0.75"]
    end

    style Dash fill:#f9f9f9,stroke:#333,stroke-width:2px
    style P fill:#e1f5fe
    style A fill:#ffebee
```

---

## 📋 Plano de Coleta de Dados

| Métrica | Fonte de Dados | Frequência | Ferramenta |
|---------|----------------|------------|------------|
| **Profundidade de Navegação** | Analytics | Diário | Google Analytics / Hotjar |
| **Caminhos Comuns** | Analytics | Diário | Google Analytics / Hotjar |
| **Taxa de Abandono** | Analytics + Testes | Semanal | Google Analytics / Hotjar |
| **Uso de Filtros** | Analytics | Diário | Google Analytics / Hotjar |
| **Tempo de Navegação** | Analytics + Testes | Diário | Google Analytics / Hotjar |
| **Bounce Rate** | Analytics | Diário | Google Analytics / Hotjar |
| **Adoção Avançada** | Analytics | Semanal | Google Analytics / Hotjar |

---

## ✅ Próximos Passos

| Ordem | Atividade | Responsável | Data |
|-------|-----------|-------------|------|
| 1 | Validar métricas com o cliente | @anandamatos | 30/06 |
| 2 | Refinar com base no feedback | @anandamatos | 01/07 |
| 3 | Definir baseline de navegação atual | @anandamatos | 02/07 |
| 4 | Planejar otimizações de navegação | @anandamatos | 03/07 |

---

## 📎 Anexos

- **Mapa de navegação completo:** [link]
- **Benchmark de navegação:** [link]
- **Testes de usabilidade realizados:** [link]

---

**Status:** Aguardando validação com o cliente  
**Próxima Reunião:** 30/06/2026 - 14h

---

## 🎯 Resumo Executivo

| Métrica | Meta | Status | Próximo Passo |
|---------|------|--------|---------------|
| **Profundidade de Navegação** | 2-3 telas | A definir | Validar com cliente |
| **Caminhos Mais Comuns** | 60% nos fluxos principais | A definir | Validar com cliente |
| **Taxa de Abandono** | ≤ 10% | A definir | Validar com cliente |
| **Uso de Filtros** | 40-60% | A definir | Validar com cliente |
| **Tempo de Navegação** | ≤ 3s por etapa | A definir | Validar com cliente |
| **Bounce Rate** | ≤ 20% | A definir | Validar com cliente |
