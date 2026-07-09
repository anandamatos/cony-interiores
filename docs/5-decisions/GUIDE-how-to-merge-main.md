# 📚 Documento 3: Guia de Merge na Main

**Título:** `GUIDE-how-to-merge-main.md`

**Localização:** `docs/2-planning/GUIDE-how-to-merge-main.md`

---

# Guia: Como Fazer Merge na Main (PR Aprovada)

**Versão:** 1.0  
**Data:** 09/07/2026  
**Responsável:** @anandamatos

---

## 🎯 Objetivo

Este guia estabelece os procedimentos para realizar o merge de uma Pull Request (PR) aprovada na `main`, garantindo integridade, rastreabilidade e mínimo risco de quebras.

---

## 📋 Pré-requisitos para Merge

### Checklist Obrigatório

| Item | Status | Verificação |
|------|--------|-------------|
| [ ] PR aprovada por pelo menos 1 reviewer | ⬜ | Verificar comentários |
| [ ] Todos os comentários resolvidos | ⬜ | Verificar threads |
| [ ] Testes automatizados passando | ⬜ | Verificar GitHub Actions |
| [ ] Sem conflitos com a main | ⬜ | Verificar status do merge |
| [ ] Branch atualizada com a main | ⬜ | `git rebase main` |
| [ ] Código testado localmente | ⬜ | Rodar localmente |

---

## 🔧 Métodos de Merge

### Opção 1: Merge via GitHub (Recomendado)

1. Acessar a PR no GitHub
2. Clicar em **"Merge pull request"**
3. Escolher:
   - **"Create a merge commit"** (Recomendado - mantém histórico)
   - **"Squash and merge"** (Histórico mais limpo)
   - **"Rebase and merge"** (Histórico linear)
4. Clicar em **"Confirm merge"**
5. Clicar em **"Delete branch"** (opcional, mas recomendado)

### Opção 2: Merge via Terminal

```bash
# 1. Entrar na branch da PR
git checkout feat@[squad]/STORY-MX-[SQUAD]-NNN

# 2. Atualizar com a main
git rebase main

# 3. Ir para a main
git checkout main

# 4. Fazer merge
git merge feat@[squad]/STORY-MX-[SQUAD]-NNN --no-ff -m "merge: [STORY-MX-[SQUAD]-NNN] [Descrição]"

# 5. Enviar para o remoto
git push origin main

# 6. Deletar a branch local
git branch -d feat@[squad]/STORY-MX-[SQUAD]-NNN

# 7. Deletar a branch remota
git push origin --delete feat@[squad]/STORY-MX-[SQUAD]-NNN
```

---

## 🔄 Fluxo Completo de Merge

### Diagrama do Fluxo

```mermaid
flowchart TD
    A[PR Aprovada] --> B{Checklist OK?}
    B -->|Não| C[Retornar para ajustes]
    B -->|Sim| D[Atualizar branch com main]
    D --> E[Resolver conflitos]
    E --> F[Testar novamente]
    F --> G[Realizar merge]
    G --> H[Deletar branch]
    H --> I[Atualizar documentação]
    I --> J[Deploy (se aplicável)]
```

### Passo a Passo Detalhado

#### 1. Atualizar a Branch

```bash
# 1. Mudar para a branch da PR
git checkout feat@[squad]/STORY-MX-[SQUAD]-NNN

# 2. Atualizar a main local
git checkout main
git pull origin main

# 3. Voltar para a branch e fazer rebase
git checkout feat@[squad]/STORY-MX-[SQUAD]-NNN
git rebase main

# 4. Resolver conflitos (se houver)
git status
# Editar arquivos com conflitos
git add .
git rebase --continue

# 5. Enviar a branch atualizada
git push origin feat@[squad]/STORY-MX-[SQUAD]-NNN --force
```

#### 2. Realizar o Merge

**Via GitHub (Recomendado):**

1. Acessar a PR
2. Clicar em **"Merge pull request"**
3. Confirmar o merge

**Via Terminal:**

```bash
# 1. Ir para a main
git checkout main

# 2. Fazer merge
git merge feat@[squad]/STORY-MX-[SQUAD]-NNN --no-ff -m "merge: [STORY-MX-[SQUAD]-NNN] [Descrição]"

# 3. Enviar para o remoto
git push origin main
```

#### 3. Limpeza Pós-Merge

```bash
# 1. Deletar branch local
git branch -d feat@[squad]/STORY-MX-[SQUAD]-NNN

# 2. Deletar branch remota (via GitHub ou terminal)
git push origin --delete feat@[squad]/STORY-MX-[SQUAD]-NNN
```

---

## ✅ Checklist Pós-Merge

| Item | Status | Verificação |
|------|--------|-------------|
| [ ] Merge realizado com sucesso | ⬜ | `git status` |
| [ ] Branch deletada (local) | ⬜ | `git branch` |
| [ ] Branch deletada (remota) | ⬜ | `git branch -r` |
| [ ] Código funciona em produção | ⬜ | Testar aplicação |
| [ ] Documentação atualizada | ⬜ | Verificar docs |
| [ ] Issue fechada | ⬜ | Verificar GitHub |

---

## 🚨 Resolução de Problemas no Merge

### Problema 1: Conflitos

```bash
# Ver conflitos
git status

# Resolver manualmente
code [arquivo]

# Adicionar resolvidos
git add [arquivo]

# Continuar merge/rebase
git merge --continue
# ou
git rebase --continue
```

### Problema 2: Merge Bloqueado

```bash
# Verificar status
git status

# Abortar merge
git merge --abort

# Resolver e tentar novamente
git pull origin main
git merge feat@[squad]/STORY-MX-[SQUAD]-NNN
```

### Problema 3: Push Rejeitado

```bash
# Verificar divergências
git fetch origin
git log origin/main..main

# Fazer push force (com cuidado)
git push origin main --force-with-lease
```

---

## 📊 Matriz de Rastreabilidade Pós-Merge

### O que Documentar após o Merge

| Documento | Onde | Status |
|-----------|------|--------|
| **PR Mergeado** | GitHub | ⬜ |
| **Branch Deletada** | GitHub | ⬜ |
| **Issue Fechada** | GitHub | ⬜ |
| **Changelog Atualizado** | `CHANGELOG.md` | ⬜ |
| **Documentação Atualizada** | `docs/` | ⬜ |

### Modelo de Mensagem de Merge

```text
merge: [STORY-MX-[SQUAD]-NNN] [Título da Story]

## O que foi entregue
- [Descrição 1]
- [Descrição 2]

## Tarefas realizadas
- TASK-MX-[SQUAD]-NNN-001: Descrição
- TASK-MX-[SQUAD]-NNN-002: Descrição

## PRs relacionados
- Closes #N
```

---

## 🔒 Boas Práticas de Merge

| Prática | Descrição |
|---------|-----------|
| **Nunca force push na main** | Use `--force-with-lease` se necessário |
| **Sempre teste após merge** | Verificar se a aplicação funciona |
| **Documente o merge** | Atualizar changelog e documentação |
| **Mantenha histórico limpo** | Usar `--no-ff` para manter contexto |
| **Comunique o time** | Avisar no Discord sobre o merge |

---

## 📋 Template de Comunicação

### Mensagem de Merge no Discord

```text
🚀 **MERGE REALIZADO COM SUCESSO!**

**PR:** #N - [STORY-MX-[SQUAD]-NNN] [Título]
**Branch:** feat@[squad]/STORY-MX-[SQUAD]-NNN
**Autor:** @[autor]
**Reviewers:** @[reviewer1], @[reviewer2]
**Data:** [DD/MM/YYYY]

**O que foi entregue:**
- [Descrição 1]
- [Descrição 2]

**Próximos Passos:**
- [ ] Deploy em produção
- [ ] Testes de validação

🔗 **Link da PR:** [URL]
```

---

**Dúvidas?** Consulte o time no canal do Discord.

---

## 📁 Resumo dos Documentos Criados

| Documento | Localização | Propósito |
|-----------|-------------|-----------|
| **Como Criar uma Story** | `docs/2-planning/GUIDE-how-to-create-story.md` | Orientar criação de stories pelo VSCode |
| **Como Revisar PR** | `docs/5-decisions/GUIDE-how-to-review-pr.md` | Procedimentos de revisão de PR |
| **Como Fazer Merge** | `docs/2-planning/GUIDE-how-to-merge-main.md` | Procedimentos de merge na main |

---

## ✅ Estrutura Corrigida

O documento agora está:
- ✅ Sem blocos de código ``` desnecessários
- ✅ Com formatação Markdown correta
- ✅ Com tabelas estruturadas
- ✅ Com hierarquia de títulos (h1, h2, h3)
- ✅ Com listas e checkboxes
- ✅ Com blocos de código para comandos
- ✅ Com diagrama Mermaid
- ✅ Com templates de comunicação