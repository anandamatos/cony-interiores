# 📚 Documento 1: Como Criar uma Story do Squad pelo VSCode

**Título:** `GUIDE-how-to-create-story.md`

**Localização:** `docs/2-planning/GUIDE-how-to-create-story.md`

---

# Guia: Como Criar uma Story do Squad pelo VSCode

**Versão:** 1.0  
**Data:** 09/07/2026  
**Responsável:** @anandamatos

---

## 🎯 Objetivo

Este guia orienta os membros dos squads sobre como criar uma nova **Story** (entrega) seguindo os padrões adotados pelo projeto, diretamente pelo VSCode.

---

## 📋 Pré-requisitos

- [ ] Ter o repositório clonado localmente
- [ ] Estar na branch `main` atualizada (`git pull origin main`)
- [ ] Ter o VSCode instalado com a extensão **GitHub Pull Requests and Issues**

---

## 🔧 Passo 1: Criar a Branch da Story

### Padrão de Nomenclatura

```
feat@[squad]/STORY-MX-[SQUAD]-NNN
```

**Squads disponíveis:**

| Squad | Código |
|-------|--------|
| Foundation | `fnd` |
| Core Business | `core` |
| UX & Experience | `ux` |

**Exemplos:**
- `feat@ux/STORY-M2-UX-001`
- `feat@core/STORY-M2-CORE-001`
- `feat@fnd/STORY-M2-FND-001`

### Comando no Terminal

```bash
# 1. Certifique-se de estar na main atualizada
git checkout main
git pull origin main

# 2. Criar a branch da story
git checkout -b feat@[squad]/STORY-MX-[SQUAD]-NNN

# Exemplo:
git checkout -b feat@ux/STORY-M2-UX-001

# 3. Enviar para o remoto
git push -u origin feat@ux/STORY-M2-UX-001
```

---

## 🔧 Passo 2: Estruturar a Documentação da Story

### Criar o Arquivo da Story

**Localização:** `docs/2-planning/STORY-MX-[SQUAD]-NNN-[titulo].md`

**Template:**

```markdown
# [STORY-MX-[SQUAD]-NNN] - [Título da Story]

**Épico:** EPIC-MX-[SQUAD]-NNN - [Nome do Épico]
**Squad:** [Foundation / Core Business / UX & Experience]
**MVP:** MVP X
**Data de Criação:** [DD/MM/YYYY]
**Responsável:** @[seu-usuario]

---

## 🎯 Objetivo da Story

[Descrever o objetivo principal da Story]

---

## 📋 Tarefas (Tasks)

| ID | Tarefa | Descrição | Responsável |
|----|--------|-----------|-------------|
| TASK-MX-[SQUAD]-NNN-001 | [Nome da Tarefa] | [Descrição] | @[usuario] |
| TASK-MX-[SQUAD]-NNN-002 | [Nome da Tarefa] | [Descrição] | @[usuario] |
| TASK-MX-[SQUAD]-NNN-003 | [Nome da Tarefa] | [Descrição] | @[usuario] |

---

## ✅ Critérios de Aceite

- [ ] Critério 1
- [ ] Critério 2
- [ ] Critério 3

---

## 📊 Tarefas de Discovery

| ID | Tarefa | Status | Responsável |
|----|--------|--------|-------------|
| DISCOVERY-MX-[SQUAD]-NNN-001 | [Descrição] | ⏳ Pendente | @[usuario] |

---

## 📊 Tarefas de Mensuração

| ID | Tarefa | Status | Responsável |
|----|--------|--------|-------------|
| MEASUREMENT-MX-[SQUAD]-NNN-001 | [Descrição] | ⏳ Pendente | @[usuario] |

---

## 🔗 Links Relacionados

- **Épico:** [EPIC-MX-[SQUAD]-NNN]
- **Pull Request:** [link]
- **Figma:** [link]
```

---

## 🔧 Passo 3: Criar a Issue no GitHub

### Via GitHub CLI (Recomendado)

```bash
# Criar a issue da story
gh issue create --title "[STORY-MX-[SQUAD]-NNN] Story: [Título da Story]" \
  --body "$(cat docs/2-planning/STORY-MX-[SQUAD]-NNN-[titulo].md)" \
  --label "story,mvpX,[squad]" \
  --milestone "MVP X - Sprint Y"
```

### Via GitHub Web

1. Acesse: https://github.com/anandamatos/cony-interiores/issues
2. Clique em **"New Issue"**
3. Título: `[STORY-MX-[SQUAD]-NNN] Story: [Título da Story]`
4. Descrição: Cole o conteúdo do arquivo .md
5. Labels: `story`, `mvpX`, `[squad]`
6. Milestone: Selecione o MVP e Sprint correspondentes
7. Assignees: Selecione os responsáveis

---

## 🔧 Passo 4: Desenvolvimento da Story

### Padrão de Commits

```
tipo@[squad]/ [STORY-MX-[SQUAD]-NNN] Descrição do commit

TASK-MX-[SQUAD]-NNN-001: Descrição da tarefa

- Detalhe 1
- Detalhe 2
```

**Exemplo:**

```
feat@ux/ [STORY-M2-UX-001] Implementa dashboard financeiro

TASK-M2-UX-001-001: Criar página de resumo financeiro
TASK-M2-UX-001-002: Implementar cards de métricas

- Adiciona gráficos com Chart.js
- Implementa filtros por período
```

### Fluxo de Trabalho

```bash
# 1. Fazer alterações
code .

# 2. Adicionar arquivos
git add .

# 3. Commitar
git commit -m "feat@[squad]/ [STORY-MX-[SQUAD]-NNN] Descrição"

# 4. Enviar para o remoto
git push origin feat@[squad]/STORY-MX-[SQUAD]-NNN
```

---

## 🔧 Passo 5: Finalizar a Story

### Criar Pull Request

```bash
gh pr create --base main --head feat@[squad]/STORY-MX-[SQUAD]-NNN \
  --title "[STORY-MX-[SQUAD]-NNN] [Título da Story]" \
  --body "## 🎯 Objetivo
[Descrição]

## 📋 Tarefas Realizadas
- [ ] TASK-MX-[SQUAD]-NNN-001: Descrição
- [ ] TASK-MX-[SQUAD]-NNN-002: Descrição

## ✅ Checklist
- [ ] Código revisado
- [ ] Testes automatizados passando
- [ ] Documentação atualizada"
```

---

## 📋 Checklist Final

| Item | Status |
|------|--------|
| Branch criada com padrão correto | ⬜ |
| Documento .md da story criado | ⬜ |
| Issue criada no GitHub | ⬜ |
| Commits seguindo o padrão | ⬜ |
| Pull Request criado | ⬜ |
| Revisão de PR concluída | ⬜ |
| Merge na main realizado | ⬜ |