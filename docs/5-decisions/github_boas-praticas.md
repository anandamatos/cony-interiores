## 📋 Orientações para os Membros do Time

Com a nova estrutura de branches padronizada, aqui estão as orientações para todos os membros do time:

---

### 1. 🏗️ Estrutura de Branches

```text
main (branch principal)
├── feat@[squad]/[STORY-XX-XXX]
├── fix@[squad]/[STORY-XX-XXX]
└── chore@[squad]/[STORY-XX-XXX]
```

**Squads:**
- `fnd` = Foundation
- `core` = Core Business
- `ux` = UX & Experience

**Exemplos:**
- `feat@ux/STORY-M1-UX-001`
- `feat@core/STORY-M1-CORE-001`
- `fix@fnd/STORY-M1-FND-003`

---

### 2. 📥 Clonar o Repositório

```bash
# Clonar o repositório
git clone git@github.com:anandamatos/cony-interiores.git

# Entrar na pasta
cd cony-interiores

# Verificar todas as branches disponíveis
git fetch --all
git branch -a
```

---

### 3. 🔄 Trabalhar em uma Branch de Feature

```bash
# 1. Criar uma nova branch a partir da main
git checkout main
git pull origin main
git checkout -b feat@[squad]/[STORY-XX-XXX]

# Exemplo:
git checkout -b feat@ux/STORY-M1-UX-003

# 2. Trabalhar normalmente
# ... fazer alterações ...

# 3. Commitar seguindo o padrão
git add .
git commit -m "feat@[squad]/ [STORY-XX-XXX] Descrição do que foi feito

TASK-XX-XXX-001: Descrição da tarefa
TASK-XX-XXX-002: Descrição da tarefa

- Detalhe 1
- Detalhe 2
"

# Exemplo:
git commit -m "feat@ux/ [STORY-M1-UX-003] Implementa visualização de carga

TASK-M1-UX-011: Criar página de visualização de capacidade
TASK-M1-UX-012: Implementar cards de carga

- Adiciona gráficos com Chart.js
- Implementa filtros por período
"

# 4. Enviar para o remoto
git push -u origin feat@[squad]/[STORY-XX-XXX]
```

---

### 4. 📋 Padrão de Commits

| Tipo | Formato | Exemplo |
|------|---------|---------|
| **Feature** | `feat@[squad]/ [STORY-XX-XXX]` | `feat@ux/ [STORY-M1-UX-001]` |
| **Fix** | `fix@[squad]/ [STORY-XX-XXX]` | `fix@core/ [STORY-M1-CORE-001]` |
| **Chore** | `chore@[squad]/ [STORY-XX-XXX]` | `chore@fnd/ [STORY-M1-FND-001]` |

**Corpo do commit deve incluir:**
- Tarefas realizadas (TASK-XX-XXX-00X)
- Lista de alterações (bullet points)

---

### 5. 🔄 Atualizar a Branch com a Main

```bash
# 1. Garantir que a main está atualizada
git checkout main
git pull origin main

# 2. Voltar para sua branch
git checkout feat@[squad]/[STORY-XX-XXX]

# 3. Fazer rebase com a main
git rebase main

# 4. Resolver conflitos (se houver)
# ... editar arquivos com conflitos ...
git add .
git rebase --continue

# 5. Enviar as alterações
git push --force origin feat@[squad]/[STORY-XX-XXX]
```

---

### 6. 🔀 Criar Pull Request

1. Acesse o GitHub: https://github.com/anandamatos/cony-interiores
2. Clique em **"Pull Requests"** → **"New Pull Request"**
3. Selecione sua branch (`feat@[squad]/[STORY-XX-XXX]`) → `main`
4. Preencha o template:
   ```markdown
   ## 🎯 Objetivo
   [Descreva o que esta PR faz]

   ## 📋 Tarefas Realizadas
   - [ ] TASK-XX-XXX-001: Descrição
   - [ ] TASK-XX-XXX-002: Descrição

   ## ✅ Checklist
   - [ ] Código revisado
   - [ ] Testes automatizados passando
   - [ ] Documentação atualizada

   ## 🔗 Issues Relacionadas
   - [STORY-XX-XXX]
   ```
5. Clique em **"Create Pull Request"**

---

### 7. 📊 Branches Disponíveis

| Branch | Squad | Story | Status |
|--------|-------|-------|--------|
| `feat@ux/STORY-M1-UX-001` | UX | Layout Base e Design System | 🟢 Em desenvolvimento |
| `feat@core/STORY-M1-CORE-001` | Core | Cadastro de Costureiras | 🟡 Pendente |
| `feat@core/STORY-M1-CORE-002` | Core | CRUD de Serviços | 🟡 Pendente |
| `feat@core/STORY-M1-CORE-003` | Core | Cálculo de Capacidade | 🟡 Pendente |
| `feat@ux/STORY-M1-UX-002` | UX | Formulários e Integração API | 🟡 Pendente |
| `feat@ux/STORY-M1-UX-003` | UX | Visualização de Carga | 🟡 Pendente |

---

### 8. 📌 Regras Importantes

| Regra | Descrição |
|-------|-----------|
| **Nunca commitar na `main`** | Use sempre branches de feature |
| **Commits atômicos** | Um commit por tarefa concluída |
| **Pull Request obrigatório** | Todo código deve passar por revisão |
| **Rebase antes do PR** | Mantenha sua branch atualizada com a main |
| **Padrão de commits** | Siga o formato `tipo@[squad]/ [STORY-XX-XXX]` |

---

### 9. 🆘 Dicas Rápidas

```bash
# Verificar em qual branch você está
git branch

# Listar todas as branches (locais e remotas)
git branch -a

# Baixar atualizações do remoto
git fetch --all

# Deletar branch local (após merge)
git branch -d feat@[squad]/[STORY-XX-XXX]

# Deletar branch remota (após merge)
git push origin --delete feat@[squad]/[STORY-XX-XXX]
```

---

### 10. 📚 Referência Rápida

```text
Padrão de Nomenclatura de Branches:
feat@[squad]/[STORY-XX-XXX]

Squads:
- fnd = Foundation
- core = Core Business
- ux = UX & Experience

Exemplo de Branch:
feat@ux/STORY-M1-UX-001

Exemplo de Commit:
feat@ux/ [STORY-M1-UX-001] Implementa layout base

Exemplo de PR:
[STORY-M1-UX-001] Layout Base e Design System
```

---

## ✅ Resumo para os Membros

1. **Sempre** criar uma branch a partir da `main`
2. **Usar** o padrão `feat@[squad]/[STORY-XX-XXX]`
3. **Commits** com o padrão `feat@[squad]/ [STORY-XX-XXX]`
4. **Sempre** abrir Pull Request para revisão
5. **Nunca** commitar diretamente na `main`
