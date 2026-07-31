# 📊 Matriz CSD – Cálculo e controle de Capacidade

**Projeto**: Cony Interiores
**Squad**: Core Business
**Épico**: EPIC-M1-CORE-001
**Versão**: 1.1
**Data**: 21/07/2026
**Responsável:** @karinakaduda19-cyber
**Atualização**: Feedback do cliente incorporado - respostas às dúvidas D1-D11

## 🎯 Objetivo

Esta Matriz CSD reúne os conhecimentos atuais da equipe sobre o sistema de distribuição de serviços entre costureiras.

Ela tem como objetivo identificar:

•fatos já confirmados (Certezas);
•hipóteses que ainda precisam ser validadas (Suposições);
•questões em aberto que deverão ser respondidas junto à gestora (Dúvidas).

## 📊 Matriz CSD

### Certezas (C) - O que já sabemos
| # | Certeza | Fonte |
|---|---------|-------|
| C1 | O sistema deve considerar não apenas a quantidade de serviços, mas também um índice de complexidade para distribuir a carga de trabalho. | Requisito levantado. |
| C2 |	A carga de trabalho das costureiras deve ser calculada semanalmente. |	Requisito levantado. |
| C3 |	O sistema deve prever quais costureiras estão disponíveis para receber novos serviços. |	Necessidade da gestora. |
| C4 |	A gestora precisa de informações confiáveis para apoiar a distribuição dos serviços. |	Entrevista. |
| C5 |	Os níveis atuais de complexidade são: Pequena, Média, Grande e Especial/Pé-direito duplo. |	Requisito levantado. |
| C6 |	O sistema deve impedir que uma costureira receba mais serviços do que sua capacidade semanal. |	Regra de negócio. |
| C7 |	A distribuição dos serviços deve considerar a carga atual de cada costureira. |	Regra de negócio. |
| C8 | O tipo de produto influencia a complexidade do serviço. | Feedback do cliente (D1). |
| C9 | A especialização da costureira em determinados serviços deve ser considerada na distribuição. | Feedback do cliente (D3). |
| C10 | O limite máximo de carga semanal deve ser personalizado por costureira, não igual para todas. | Feedback do cliente (D4). |
| C11 | A capacidade semanal de cada costureira pode mudar em períodos de férias, afastamentos ou folgas. | Feedback do cliente (D7). |
| C12 | A gestora poderá alterar manualmente a complexidade de um serviço quando necessário. | Feedback do cliente (D8). |
| C13 | O sistema não deve recalcular automaticamente a disponibilidade quando um serviço for concluído. | Feedback do cliente (D9). |
| C14 | A previsão de disponibilidade deve considerar também serviços já agendados, não apenas os em andamento. | Feedback do cliente (D10). |
| C15 | A distribuição dos serviços será manual (sem sistema automático de prioridade/urgência), respeitando os prazos definidos. | Feedback do cliente (D11). |
| C16 | Uma costureira não pode recusar um serviço após ser designada, pois há comunicação prévia de consentimento antes do envio. | Feedback do cliente (D6). |

### Suposições (S) - O que acreditamos
| # | Suposição | Impacto se estiver errada |
|---|-----------|---------------------------|
| S1 |	O tipo de produto influencia o nível de complexidade do serviço. |	O cálculo da carga pode ficar impreciso. |
| S3 |	A experiência da costureira em determinados tipos de serviço influencia sua produtividade. | A distribuição pode não aproveitar corretamente as habilidades de cada costureira. |
| S5 |	Os pesos de complexidade podem ser: Pequena = 1, Média = 2, Grande = 4 e Especial = 6. |	O índice de carga pode não refletir o esforço real. |
| S6 |	Costureiras mais experientes conseguem executar serviços complexos em menos tempo. |	A distribuição pode deixar de aproveitar a experiência da equipe. |
| S7 |	Um serviço classificado como Especial sempre demanda mais tempo que um serviço Grande. | O cálculo da carga pode ficar incorreto. |
| S8 |	A produtividade semanal das costureiras é relativamente estável. | A previsão de disponibilidade pode ficar imprecisa.|

### Dúvidas (D) - O que precisamos validar
| # | Dúvida | Como validar | Resposta do Cliente |
|---|--------|--------------|-------------------|
| D5 |	Quais pesos representam melhor cada nível de complexidade? |	Validar com a gestora e realizar testes. | ⏳ Ainda em definição através de testes. |

**Status das dúvidas:**
- **✅ D1** - O tipo de produto deve influenciar a complexidade? → **SIM** - Confirmado como C8
- **✅ D2** - O tipo de tecido deve influenciar a complexidade? → **NÃO** - Removido de Suposições
- **✅ D3** - A especialização da costureira deve ser considerada? → **SIM** - Confirmado como C9
- **✅ D4** - O limite máximo de carga deve ser personalizado? → **SIM, PERSONALIZADO** - Confirmado como C10
- **✅ D6** - Uma costureira pode recusar um serviço? → **NÃO** - Confirmado como C16
- **✅ D7** - A capacidade semanal pode mudar em férias/afastamentos? → **SIM** - Confirmado como C11
- **✅ D8** - A gestora pode alterar manualmente a complexidade? → **SIM** - Confirmado como C12
- **✅ D9** - Recalcular automaticamente ao concluir serviço? → **NÃO** - Confirmado como C13
- **✅ D10** - Considerar apenas em andamento ou também agendados? → **TAMBÉM AGENDADOS** - Confirmado como C14
- **✅ D11** - Sistema de prioridade automático ou manual? → **MANUAL** - Confirmado como C15

## 🎯 Próximos Passos
| Prioridade |	Ação |
|------------|-------|
| **Alta** | **CONCLUÍDA**: Validar todas as dúvidas com a gestora - 10 de 11 dúvidas respondidas. |
| **Alta** |	Definir os pesos de complexidade através de testes com a gestora (D5). |
| **Alta** | Implementar suporte a capacidades personalizadas por costureira (C10). |
| **Média** | Implementar sistema de consideração de especialização/experiência (C9). |
| **Média** | Configurar gestão de capacidade com suporte a férias e afastamentos (C11). |
| **Média** | Implementar alteração manual de complexidade pela gestora (C12). |
| **Baixa** | Monitorar estabilidade da produtividade para validar S8. |

## 📌 Observações
• A matriz deverá ser atualizada conforme novos requisitos forem sendo levantados.
• As suposições confirmadas passarão a compor a seção de Certezas.
• As dúvidas respondidas deverão ser removidas ou transformadas em novos requisitos.