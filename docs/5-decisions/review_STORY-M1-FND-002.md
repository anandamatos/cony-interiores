## 📋 Orientação para os Squads Core e UX

### ✅ Antes do Merge da PR do Foundation

A PR do Foundation contém **mudanças estruturais importantes** (Docker, DRF, CORS, Prettier, ESLint, Husky) que afetam **todos os squads**. Seguem as orientações:

---

## 🚨 1. O que Mudou?

| Mudança | Impacto | Squad(s) Afetados |
|---------|---------|-------------------|
| **Docker + docker-compose** | Ambiente agora é containerizado | **Todos** |
| **DRF** (djangorestframework) | Backend agora tem API REST | **Core + UX** |
| **CORS** | Frontend pode consumir API | **Core + UX** |
| **Prettier + ESLint** | Padronização de código | **Todos** |
| **Husky** | Pre-commit hooks | **Todos** |
| **Proxy do Vite** | `/api` redireciona para backend | **UX** |

---

## 🛠️ 2. O que Cada Squad Deve Fazer Antes do Merge

### 📌 Squad Core Business

**Ação:** Atualizar a branch com a `main` após o merge.

```bash
# 1. Atualizar a main
git checkout main
git pull origin main

# 2. Atualizar sua branch
git checkout feat@core/STORY-M1-CORE-001  # ou sua branch atual
git merge main

# 3. Verificar se as dependências foram instaladas
cd backend
source .venv/bin/activate
pip install -r requirements.txt

# 4. Rodar as migrações
python manage.py migrate --settings=config.settings_sqlite

# 5. Testar os endpoints
python manage.py runserver --settings=config.settings_sqlite
curl http://127.0.0.1:8000/api/hello/
```

---

### 📌 Squad UX & Experience

**Ação:** Atualizar a branch e garantir que o proxy está funcionando.

```bash
# 1. Atualizar a main
git checkout main
git pull origin main

# 2. Atualizar sua branch
git checkout feat@ux/STORY-M1-UX-001  # ou sua branch atual
git merge main

# 3. Verificar o proxy
cat frontend/vite.config.js
# Deve ter: target: "http://127.0.0.1:8000"

# 4. Instalar dependências
cd frontend
npm install

# 5. Rodar o frontend
npm run dev
# Acesse http://localhost:5173/ e veja se a mensagem do backend aparece
```

---

### 📌 Squad Foundation

**Ação:** Garantir que o merge não quebra o ambiente.

```bash
# 1. Subir a stack com Docker
docker compose up --build -d

# 2. Verificar os containers
docker compose ps

# 3. Verificar os logs
docker compose logs backend --tail=20
docker compose logs frontend --tail=20

# 4. Testar a API
curl http://localhost:8000/api/hello/
```

---

## 📋 3. Checklist Pós-Merge

### Para Todos os Squads

| Item | Comando | Status |
|------|---------|--------|
| **Atualizar a main** | `git checkout main && git pull origin main` | ⬜ |
| **Merge na sua branch** | `git merge main` | ⬜ |
| **Instalar dependências (backend)** | `pip install -r requirements.txt` | ⬜ |
| **Instalar dependências (frontend)** | `npm install` | ⬜ |
| **Migrar banco** | `python manage.py migrate` | ⬜ |
| **Rodar backend** | `python manage.py runserver` | ⬜ |
| **Rodar frontend** | `npm run dev` | ⬜ |

---

## 🔧 4. Problemas Comuns e Soluções

| Problema | Solução |
|----------|---------|
| **Proxy não funciona** | Verificar `vite.config.js` com `target: "http://127.0.0.1:8000"` |
| **CORS bloqueia** | Verificar `settings.py` com `CORS_ALLOW_ALL_ORIGINS = True` |
| **Dependências faltando** | Rodar `pip install -r requirements.txt` |
| **Porta em uso** | Matar processo: `kill -9 $(lsof -t -i :8000)` |

---

## 📝 5. Comunicação Oficial

Sugiro enviar esta mensagem para os canais dos squads:

---

📢 **ATENÇÃO SQUADS CORE E UX** 🚨

A PR do Foundation (STORY-M1-FND-002) foi aprovada e será mergeada na `main`. Ela contém mudanças importantes:

- **Docker + docker-compose** para padronizar o ambiente
- **DRF** (Django REST Framework) para API
- **CORS** para integração frontend-backend
- **Prettier + ESLint** para padronização de código
- **Husky** para pre-commit hooks

**O que você precisa fazer após o merge:**

```bash
# 1. Atualizar a main
git checkout main && git pull origin main

# 2. Merge na sua branch
git checkout sua-branch && git merge main

# 3. Atualizar dependências
cd backend && pip install -r requirements.txt
cd frontend && npm install

# 4. Rodar migrações
python manage.py migrate --settings=config.settings_sqlite

# 5. Testar
python manage.py runserver
npm run dev
```

⚠️ **Se tiver problemas com o proxy**, verifique se o `vite.config.js` está apontando para `http://127.0.0.1:8000`.
