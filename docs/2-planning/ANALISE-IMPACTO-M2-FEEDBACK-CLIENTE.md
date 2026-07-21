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
