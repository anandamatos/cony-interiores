# STORY-M1-UX-MEAS-001 - Ferramentas de Coleta de Dados

**Data de Criação:** 19/07/2026
**Versão:** 1.0
**Responsável:** @anandamatos
**Status:** ⚠️ Aguardando Validação Técnica

---

## 🎯 Objetivo

Definir as ferramentas e métodos para coleta de dados de usabilidade e eficiência dos formulários do MVP1.

---

## 🔍 Status Atual

**Nenhuma ferramenta de analytics está integrada ao código atualmente.**

Ferramentas citadas em documentos existentes (`STORY-M1-UX-001-kpis-usabilidade.md`, `STORY-M1-UX-001-metricas-navegacao.md`):
- Google Analytics
- Hotjar

**Status:** Apenas planejadas, sem implementação real.

---

## 📊 Ferramentas Selecionadas

### Para MVP1 (Imediato)

| Ferramenta | Finalidade | Motivo |
|------------|------------|--------|
| **Observação Manual** | Tempo de preenchimento | Sem custo, não requer implementação |
| **Planilha / Spreadsheet** | Registro de observações | Fácil de usar e compartilhar |
| **Console do Navegador** | Validação de erros | Já disponível, sem configuração |

### Para MVP2 (Futuro)

| Ferramenta | Finalidade | Motivo |
|------------|------------|--------|
| **PostHog** | Analytics e eventos | Open source, self-hosted possível |
| **Google Analytics 4** | Métricas de abandono | Gratuito, amplamente utilizado |

---

## 📋 Plano de Implementação

### Fase 1: MVP1 (Manual)

| Etapa | Descrição | Responsável | Prazo |
|-------|-----------|-------------|-------|
| 1 | Criar template de observação (planilha) | @anandamatos | 20/07/2026 |
| 2 | Realizar teste de usabilidade | @anandamatos | 25/07/2026 |
| 3 | Coletar dados de 5-8 usuários | @anandamatos | 25/07/2026 |
| 4 | Analisar dados e gerar relatório | @anandamatos | 28/07/2026 |

### Fase 2: MVP2 (Automatizado)

| Etapa | Descrição | Responsável | Prazo |
|-------|-----------|-------------|-------|
| 1 | Avaliar e selecionar ferramenta | Time de Core | MVP2 |
| 2 | Configurar integração no frontend | Time de Core | MVP2 |
| 3 | Definir eventos a serem rastreados | @anandamatos | MVP2 |
| 4 | Validar coleta de dados | Time de Core + UX | MVP2 |

---

## 📌 Pendências

| Item | Status | Responsável | Prazo |
|------|--------|-------------|-------|
| Validar ferramentas com time de Core | ⏳ Pendente | @anandamatos | 22/07/2026 |
| Definir eventos para rastreamento | ⏳ Pendente | @anandamatos | MVP2 |
| Implementar integração | ⏳ Pendente | Time de Core | MVP2 |

---

## 🔗 Referências

- `docs/3-measurement/STORY-M1-UX-001-kpis-usabilidade.md`
- `docs/3-measurement/STORY-M1-UX-001-metricas-navegacao.md`
- `frontend/package.json` (sem ferramentas de analytics)