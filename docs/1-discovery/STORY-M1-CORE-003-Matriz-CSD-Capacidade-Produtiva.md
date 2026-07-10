# 📊 Matriz CSD – Cálculo e controle de Capacidade

**Projeto**: Cony Interiores
**Squad**: Core Business
**Épico**: EPIC-M1-CORE-001
**Versão**: 1.0
**Data**: 09/07/2026
**Responsável:** @karinakaduda19-cyber

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

### Suposições (S) - O que acreditamos
| # | Suposição | Impacto se estiver errada |
|---|-----------|---------------------------|
| S1 |	O tipo de produto influencia o nível de complexidade do serviço. |	O cálculo da carga pode ficar impreciso. |
| S2 |	O tipo de tecido influencia a complexidade do serviço. |	A distribuição pode não representar o esforço real. |
| S3 |	A experiência da costureira em determinados tipos de serviço influencia sua produtividade. | A distribuição pode não aproveitar corretamente as habilidades de cada costureira. |
| S4 |	Todas as costureiras possuem o mesmo limite máximo de carga semanal. | O cálculo da disponibilidade pode ser injusto. |
| S5 |	Os pesos de complexidade podem ser: Pequena = 1, Média = 2, Grande = 4 e Especial = 6. |	O índice de carga pode não refletir o esforço real. |
| S6 |	Costureiras mais experientes conseguem executar serviços complexos em menos tempo. |	A distribuição pode deixar de aproveitar a experiência da equipe. |
| S7 |	Um serviço classificado como Especial sempre demanda mais tempo que um serviço Grande. | O cálculo da carga pode ficar incorreto. |
| S8 |	A produtividade semanal das costureiras é relativamente estável. | A previsão de disponibilidade pode ficar imprecisa.|

### Dúvidas (D) - O que precisamos validar
| # | Dúvida | Como validar |
|---|--------|--------------|
| D1 |	O tipo de produto deve influenciar a complexidade do serviço? |	Validar com a gestora. |
| D2 |	O tipo de tecido deve influenciar a complexidade? |	Validar com a gestora. |
| D3 |	A especialização da costureira em determinados serviços deve ser considerada? |	Validar com a gestora. |
| D4 |	O limite máximo de carga deve ser igual para todas as costureiras ou personalizado?	Validar com a gestora. |
| D5 |	Quais pesos representam melhor cada nível de complexidade? |	Validar com a gestora e realizar testes. |
| D6 |	Uma costureira pode recusar um serviço? |	Validar com a gestora. |
| D7 |	A capacidade semanal pode mudar em períodos de férias, afastamentos ou folgas? | Validar com a gestora. |
| D8 |	A gestora poderá alterar manualmente a complexidade de um serviço? |	Validar com a gestora. |
| D9 |	O sistema deve recalcular automaticamente a disponibilidade quando um serviço for concluído? |	Validar com a gestora. |
| D10 |	A previsão deve considerar apenas serviços em andamento ou também os já agendados? |	Validar com a gestora. |
| D11 |	O prazo de entrega deve influenciar a distribuição dos serviços por meio de um sistema de prioridade ou urgência? |	Validar com a gestora e definir as regras de negócio. |

## 🎯 Próximos Passos
| Prioridade |	Ação |
|------------|-------|
| Alta | Validar todas as dúvidas com a gestora. |
| Alta |	Definir os pesos de complexidade. |
| Média |	Definir se haverá personalização da capacidade por costureira. |
| Média |	Avaliar se o sistema deverá considerar experiência das costureiras. |
| Baixa	| Estudar a implementação futura de um sistema de prioridade baseado nos prazos de entrega. |

## 📌 Observações
• A matriz deverá ser atualizada conforme novos requisitos forem sendo levantados.
• As suposições confirmadas passarão a compor a seção de Certezas.
• As dúvidas respondidas deverão ser removidas ou transformadas em novos requisitos.