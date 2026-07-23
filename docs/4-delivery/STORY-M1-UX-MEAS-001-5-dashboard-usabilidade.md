# STORY-M1-UX-MEAS-001 - Dashboard de Usabilidade

**Data de Criação:** 22/07/2026  
**Versão:** 1.0  
**Responsável:** @anandamatos  
**Status:** ⚠️ Aguardando Validação com Time e Cliente  

---

## 🎯 Objetivo

Definir a especificação do dashboard de monitoramento de usabilidade, que permitirá acompanhar em tempo real as métricas de eficiência, satisfação e navegação do sistema MVP1.

---

## 📊 Indicadores Visuais

### 1. Tempo Médio de Preenchimento

| Indicador | Descrição | Formato de Exibição |
| :--- | :--- | :--- |
| **Título** | Tempo Médio de Preenchimento | "Tempo Médio: X min" |
| **Cadastro de Serviço** | Tempo médio para preencher formulário | Valor + indicador de tendência |
| **Cadastro de Costureira** | Tempo médio para preencher formulário | Valor + indicador de tendência |
| **Meta** | ≤ 5 min (Serviço) / ≤ 3 min (Costureira) | Linha de meta no gráfico |
| **Status** | 🟢 No alvo / 🟡 Próximo / 🔴 Acima da meta | Indicador de cor |

### 2. Taxa de Erro por Formulário

| Indicador | Descrição | Formato de Exibição |
| :--- | :--- | :--- |
| **Título** | Taxa de Erro | "Taxa de Erro: X%" |
| **Cadastro de Serviço** | % de erros no preenchimento | Valor + indicador de tendência |
| **Cadastro de Costureira** | % de erros no preenchimento | Valor + indicador de tendência |
| **Meta** | ≤ 10% (Serviço) / ≤ 5% (Costureira) | Linha de meta no gráfico |
| **Status** | 🟢 No alvo / 🟡 Próximo / 🔴 Acima da meta | Indicador de cor |

### 3. Taxa de Abandono por Formulário

| Indicador | Descrição | Formato de Exibição |
| :--- | :--- | :--- |
| **Título** | Taxa de Abandono | "Taxa de Abandono: X%" |
| **Cadastro de Serviço** | % de usuários que abandonam | Valor + indicador de tendência |
| **Cadastro de Costureira** | % de usuários que abandonam | Valor + indicador de tendência |
| **Meta** | ≤ 20% (Serviço) / ≤ 10% (Costureira) | Linha de meta no gráfico |
| **Status** | 🟢 No alvo / 🟡 Próximo / 🔴 Acima da meta | Indicador de cor |

### 4. Satisfação do Usuário (NPS/CSAT)

| Indicador | Descrição | Formato de Exibição |
| :--- | :--- | :--- |
| **Título** | Satisfação do Usuário | "NPS: X" |
| **NPS** | Net Promoter Score | Valor numérico (0-100) |
| **CSAT** | Satisfação por funcionalidade | Média (1-5) |
| **Meta** | NPS ≥ 70 / CSAT ≥ 4.0 | Linha de meta |
| **Status** | 🟢 No alvo / 🟡 Próximo / 🔴 Abaixo da meta | Indicador de cor |

### 5. Usuários Ativos

| Indicador | Descrição | Formato de Exibição |
| :--- | :--- | :--- |
| **Título** | Usuários Ativos | "X usuários ativos" |
| **Diários** | Usuários que acessaram hoje | Contador |
| **Semanais** | Usuários que acessaram na semana | Contador |
| **Mensais** | Usuários que acessaram no mês | Contador |
| **Meta** | 100% das costureiras e gestora | Percentual de adoção |

---

## 📊 Layout do Dashboard

### Esboço do Layout

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📊 Dashboard de Usabilidade - Cony Interiores                               │
│ Última atualização: 22/07/2026 14:30                                        │
├──────────────┬──────────────┬──────────────┬────────────────────────────────┤
│ Tempo Médio  │ Taxa de      │ Taxa de      │ Satisfação do Usuário          │
│ de Preench.  │ Erro         │ Abandono     │                                │
│              │              │              │                                │
│ Serviço:     │ Serviço:     │ Serviço:     │ NPS: 72                        │
│ 4.5 min      │ 8%           │ 15%          │ CSAT: 4.2                      │
│ 🟢 Meta: 5   │ 🟢 Meta: 10  │ 🟢 Meta: 20  │ 🟢 Meta: 70/4.0                │
│              │              │              │                                │
│ Costureira:  │ Costureira:  │ Costureira:  │                                │
│ 2.8 min      │ 4%           │ 8%           │                                │
│ 🟢 Meta: 3   │ 🟢 Meta: 5   │ 🟢 Meta: 10  │                                │
├──────────────┴──────────────┴──────────────┴────────────────────────────────┤
│ 📈 Tendência de Tempo de Preenchimento (Últimos 7 days)                     │
│ ┌────────────────────────────────────────────────────────────────────────┐  │
│ │ 7 │ ████████████████                                                   │  │
│ │ 6 │ ████████████████████████                                             │  │
│ │ 5 │ ████████████████████████████████                                     │  │
│ │ 4 │ ████████████████████████████████████████                             │  │
│ │ 3 │ ████████████████████████████████████████████████                     │  │
│ │ 2 │ ████████████████████████████████████████████████████████             │  │
│ │ 1 │ ██████████████████████████████████████████████████████████████       │  │
│ │   └──────────────────────────────────────────────────────────────────┘  │
│ │     Seg Ter Qua Qui Sex Sáb Dom                                        │  │
│ └────────────────────────────────────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 🔔 Alertas e Notificações                                                   │
│ ┌────────────────────────────────────────────────────────────────────────┐  │
│ │ 🟡 Alerta: Tempo médio de Serviço subiu para 6.2 min                   │  │
│ │ 🟢 OK: Taxa de erro de Costureira está dentro do esperado              │  │
│ │ 🔴 Crítico: Taxa de abandono de Serviço em 25%                         │  │
│ └────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘

```

📅 Periodicidade de Atualização
-------------------------------

| **Indicador** | **Frequência de Atualização** | **Fonte de Dados** |
| --- |  --- |  --- |
| **Tempo Médio de Preenchimento** | Diário (agregado semanal) | Hotjar + Testes manuais |
| --- |  --- |  --- |
| **Taxa de Erro** | Diário (agregado semanal) | Hotjar + Logs |
| **Taxa de Abandono** | Diário | Hotjar + Analytics |
| **NPS** | Mensal | Pesquisa pós-uso |
| **CSAT** | Contínuo (agregado semanal) | Pesquisa por funcionalidade |
| **Usuários Ativos** | Diário | Hotjar + Analytics |

🔔 Alertas e Notificações
-------------------------

### Níveis de Alerta

| **Nível** | **Cor** | **Critério** | **Ação** |
| --- |  --- |  --- |  --- |
| **Crítico** | 🔴 | Meta excedida em > 50% | Notificar time imediatamente |
| --- |  --- |  --- |  --- |
| **Alerta** | 🟡 | Meta excedida em 20-50% | Notificar time em 24h |
| **OK** | 🟢 | Dentro da meta | Monitorar apenas |

### Alertas por Indicador

| **Indicador** | **Condição de Alerta** | **Nível** |
| --- |  --- |  --- |
| **Tempo de Serviço** | \> 7.5 min | 🔴 Crítico |
| --- |  --- |  --- |
| **Tempo de Serviço** | 6-7.5 min | 🟡 Alerta |
| **Tempo de Costureira** | \> 4.5 min | 🔴 Crítico |
| **Tempo de Costureira** | 3.5-4.5 min | 🟡 Alerta |
| **Taxa de Erro (Serviço)** | \> 15% | 🔴 Crítico |
| **Taxa de Erro (Serviço)** | 10-15% | 🟡 Alerta |
| **Taxa de Erro (Costureira)** | \> 8% | 🔴 Crítico |
| **Taxa de Erro (Costureira)** | 5-8% | 🟡 Alerta |
| **Taxa de Abandono (Serviço)** | \> 30% | 🔴 Crítico |
| **Taxa de Abandono (Serviço)** | 20-30% | 🟡 Alerta |
| **NPS** | < 50 | 🔴 Crítico |
| **NPS** | 50-70 | 🟡 Alerta |

### Canais de Notificação

| **Canal** | **Uso** |
| --- |  --- |
| **E-mail** | Alertas diários e semanais |
| --- |  --- |
| **Slack/Discord** | Alertas críticos em tempo real |
| **Dashboard** | Todos os indicadores e alertas |

🛠️ Ferramentas de Implementação
--------------------------------

### MVP1 (Manual + Hotjar)

| **Ferramenta** | **Finalidade** |
| --- |  --- |
| **Hotjar** | Coleta de dados de navegação |
| --- |  --- |
| **Google Forms** | Pesquisas de satisfação |
| **Planilha/Sheet** | Consolidação manual de dados |
| **Relatório PDF** | Apresentação de resultados |

### MVP2 (Automatizado)

| **Ferramenta** | **Finalidade** |
| --- |  --- |
| **PostHog/GA4** | Coleta automatizada de dados |
| --- |  --- |
| **Grafana/Metabase** | Dashboard em tempo real |
| **API de Webhook** | Notificações automáticas |

📋 Validação com Time e Cliente
-------------------------------

### Sessão de Validação

| **Item** | **Detalhe** |
| --- |  --- |
| **Data** | [A Definir\] |
| --- |  --- |
| **Participantes** | @anandamatos, time UX, representante do cliente |
| **Pauta** | Validar indicadores, layout, alertas e periodicidade |

### Checklist de Validação

-   [ \] Indicadores visuais são claros e relevantes

-   [ \] Layout do dashboard é intuitivo

-   [ \] Periodicidade de atualização é adequada

-   [ \] Alertas são acionáveis e com níveis adequados

-   [ \] Canais de notificação são apropriados

📌 Pendências e Próximos Passos
-------------------------------

| **Item** | **Status** | **Responsável** | **Prazo** |
| --- |  --- |  --- |  --- |
| Validar dashboard com time | ⏳ Pendente | @anandamatos | 24/07/2026 |
| --- |  --- |  --- |  --- |
| Validar dashboard com cliente | ⏳ Pendente | @anandamatos | 24/07/2026 |
| Definir ferramenta de implementação | ⏳ Pendente | Time de Core | MVP2 |
| Desenvolver dashboard | ⏳ Pendente | Time de Core | MVP2 |

🔗 Referências
--------------

-   `docs/4-delivery/STORY-M1-UX-MEAS-001-1-kpis-eficiencia-formularios.md`

-   `docs/4-delivery/STORY-M1-UX-MEAS-001-2-ferramentas-coleta-dados.md`

-   `docs/4-delivery/STORY-M1-UX-MEAS-001-4-metricas-tempo-preencimento.md`

-   `docs/3-measurement/STORY-M1-UX-001-kpis-usabilidade.md`

-   `docs/3-measurement/STORY-M1-UX-001-plano-testes-ux.md`