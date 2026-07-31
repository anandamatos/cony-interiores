# STORY-M1-UX-MEAS-001 - Ferramentas de Coleta de Dados

**Data de Criação:** 22/07/2026
**Versão:** 1.0
**Responsável:** @anandamatos
**Status:** ⚠️ Aguardando Validação Técnica

---

## 🎯 Objetivo

Definir as ferramentas e métodos para coleta de dados de usabilidade e eficiência dos formulários do MVP1.

---

## 🔍 Status Atual

**Nenhuma ferramenta de analytics está integrada ao código atualmente.**

Ferramentas citadas em documentos existentes:
- Google Analytics (planejado)
- Hotjar (planejado)

---

## 📊 Ferramentas Recomendadas

### Para MVP1 (Fase de Validação)

| Ferramenta | Finalidade | Motivo |
|------------|------------|--------|
| **Hotjar** | Heatmaps, gravações de sessão | Facilidade de configuração, insights visuais |
| **Observação Manual** | Tempo de preenchimento | Sem custo, não requer implementação |
| **Google Forms** | Pesquisas de satisfação | Gratuito, fácil de compartilhar |

### Para MVP2 (Implementação)

| Ferramenta | Finalidade | Motivo |
|------------|------------|--------|
| **PostHog** | Analytics e eventos | Open source, self-hosted possível |
| **Google Analytics 4** | Métricas de abandono | Gratuito, amplamente utilizado |

---

## 📋 Plano de Implementação

### Fase 1: MVP1 (Manual + Hotjar)

| Etapa | Descrição | Responsável | Prazo |
|-------|-----------|-------------|-------|
| 1 | Configurar Hotjar no frontend | @anandamatos | 24/07/2026 |
| 2 | Definir eventos a serem rastreados | @anandamatos | 24/07/2026 |
| 3 | Realizar testes de usabilidade | @anandamatos | 25/07/2026 |
| 4 | Analisar dados e gerar relatório | @anandamatos | 28/07/2026 |

### Fase 2: MVP2 (Automatizado)

| Etapa | Descrição | Responsável | Prazo |
|-------|-----------|-------------|-------|
| 1 | Avaliar e selecionar ferramenta | Time de Core | MVP2 |
| 2 | Configurar integração no frontend | Time de Core | MVP2 |
| 3 | Validar coleta de dados | Time de Core + UX | MVP2 |

---

## 🔗 Referências

- `docs/3-measurement/STORY-M1-UX-001-kpis-usabilidade.md`
- `docs/3-measurement/STORY-M1-UX-001-metricas-navegacao.md`
