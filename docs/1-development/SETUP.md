# Guia de Operação Local - Cony

Documentação consolidada para subida, operação e recuperação do ambiente local.

## 📋 Pré-Requisitos

- **Node.js**: 18+ (recomendado 20 LTS)
- **Docker**: 20.10+ e Docker Compose 2.0+
- **Python**: 3.10+ (para migrations manual se necessário)
- **Git**: Qualquer versão recente
- **Espaço em Disco**: ~3GB (containers + dependências)
- **RAM**: Mínimo 4GB disponível

**Verificar Instalações**:
```bash
node --version    # v20.x.x
docker --version  # Docker version 20.10.x
docker-compose --version  # Docker Compose version 2.x.x
```

---

## 🚀 Subida do Ambiente (Primeira Vez)

### Passo 1: Clonar Repositório e Preparar

```bash
# Clonar
git clone https://github.com/seu-org/cony.git
cd cony

# Copiar arquivo de ambiente (backend)
cp .env.example .env

# Verificar .env contém (ajustar conforme necessário):
# DATABASE_URL=postgresql://user:password@db:5432/cony
# DJANGO_SECRET_KEY=your-secret-key
# DEBUG=False
```

### Passo 2: Iniciar Containers

```bash
# Subir todos os containers
docker-compose up -d

# Verificar status
docker-compose ps
# Esperado:
# NAME         STATE
# cony-db      Up (healthy)
# cony-backend Up (healthy)
# cony-frontend Up

# Verificar logs (se houver erro)
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Passo 3: Rodas Migrações

```bash
# Aplicar migrações do Django
docker-compose exec backend python manage.py migrate

# Criar superusuário (admin)
docker-compose exec backend python manage.py createsuperuser
# Seguir prompts: username, email, password

# Seed dados opcionais (se existir fixture)
docker-compose exec backend python manage.py loaddata seed_data.json
# Ou manual:
docker-compose exec backend python manage.py shell << 'EOF'
from django.contrib.auth.models import User
User.objects.create_user(username='demo', password='demo123')
EOF
```

### Passo 4: Verificar Acesso

```bash
# Frontend
open http://localhost:5173
# Esperado: Tela de login ou dashboard

# Backend API
curl http://localhost:8000/api/health/
# Esperado: { "status": "ok" }

# Admin Django
open http://localhost:8000/admin/
# Login com superusuário criado acima
```

### Passo 5: Instalar Dependências Frontend (Opcional)

Se fizer desenvolvimento local (sem Docker para frontend):

```bash
cd frontend
npm install
npm run dev

# Acessar em http://localhost:5173
```

---

## 🔄 Operação Diária

### Subir Ambiente

```bash
docker-compose up -d

# Aguardar ~30s para healthchecks passarem
docker-compose ps
```

### Parar Ambiente

```bash
docker-compose down

# Sem remover volumes (dados persistem)
# Remover volumes (limpar dados):
# docker-compose down -v
```

### Logs em Tempo Real

```bash
# Todo ambiente
docker-compose logs -f

# Apenas backend
docker-compose logs -f backend

# Apenas frontend
docker-compose logs -f frontend

# Apenas banco
docker-compose logs -f db
```

### Executar Migrations Novas

```bash
# Quando arquivos migration*.py são adicionados
docker-compose exec backend python manage.py migrate

# Ver status
docker-compose exec backend python manage.py showmigrations
```

### Shell Interativo Backend

```bash
docker-compose exec backend python manage.py shell

# Exemplos:
>>> from accounts.models import User
>>> User.objects.all()
>>> User.objects.create_user(username='teste', password='123')
```

---

## 🆘 Troubleshooting

### ❌ Erro: "Port already in use"

```bash
# Descobrir processo na porta
lsof -i :5173  # Frontend
lsof -i :8000  # Backend
lsof -i :5432  # Database

# Matar processo
kill -9 <PID>

# Ou usar portas diferentes em docker-compose.yml
```

### ❌ Erro: "Cannot connect to Docker daemon"

```bash
# Iniciar Docker Desktop ou daemon
# macOS: open /Applications/Docker.app
# Linux: sudo systemctl start docker
```

### ❌ Erro: "Database connection refused"

```bash
# Verificar container DB está rodando
docker-compose logs db

# Se problema de permissões:
docker-compose exec db psql -U postgres -c "SELECT 1;"

# Reconstruir DB:
docker-compose down -v
docker-compose up db -d
docker-compose exec db psql -U postgres -c "CREATE DATABASE cony;"
```

### ❌ Frontend: "Cannot find module"

```bash
# Limpar cache e reinstalar
rm -rf frontend/node_modules frontend/package-lock.json
docker-compose exec frontend npm install
docker-compose restart frontend
```

### ❌ Migrações falhando

```bash
# Ver erro completo
docker-compose exec backend python manage.py migrate --verbosity=3

# Se migration corrompida, reverter última:
docker-compose exec backend python manage.py migrate <app> <previous_migration_number>
```

---

## 🔧 Recuperação de Schema

### Cenário 1: Reset Completo do Banco

⚠️ **Uso**: Quando esquema está corrompido ou você quer começar do zero

```bash
# CUIDADO: Isso deleta TODOS os dados

# Opção A: Via Docker Compose
docker-compose down -v
docker-compose up db -d
docker-compose exec backend python manage.py migrate
docker-compose exec backend python manage.py createsuperuser

# Opção B: Via Management Command (se existir)
docker-compose exec backend python manage.py reset_db --noinput
```

### Cenário 2: Reverter Última Migração

```bash
# Ver migrações aplicadas
docker-compose exec backend python manage.py showmigrations

# Reverter última
docker-compose exec backend python manage.py migrate <app_name> <target_migration>
# Exemplo:
# docker-compose exec backend python manage.py migrate accounts 0002_previous
```

### Cenário 3: Dropar Table Específica

```bash
docker-compose exec db psql -U postgres -d cony << 'EOF'
DROP TABLE app_name_tablename CASCADE;
EOF

# Depois rodar migrations novamente
docker-compose exec backend python manage.py migrate
```

### Cenário 4: Backup Database

```bash
# Fazer backup
docker-compose exec db pg_dump -U postgres cony > backup_$(date +%Y%m%d_%H%M%S).sql

# Restaurar backup
docker-compose exec db psql -U postgres cony < backup_20260721_120000.sql
```

---

## ✅ Checklist de Verificação

Use este checklist para validar que tudo está funcionando:

```bash
#!/bin/bash
# Script: verify-setup.sh

echo "🔍 Verificando Setup do Cony..."
echo ""

# 1. Docker Compose
echo "1. Docker Compose..."
docker-compose ps > /dev/null && echo "   ✅ Docker Compose OK" || echo "   ❌ Docker Compose FALHOU"

# 2. Frontend Acesso
echo "2. Frontend acesso..."
curl -s http://localhost:5173 | grep -q "html" && echo "   ✅ Frontend OK" || echo "   ❌ Frontend FALHOU"

# 3. Backend API Health
echo "3. Backend API..."
curl -s http://localhost:8000/api/health/ | grep -q "ok" && echo "   ✅ Backend OK" || echo "   ❌ Backend FALHOU"

# 4. Database
echo "4. Database..."
docker-compose exec db psql -U postgres -d cony -c "SELECT 1;" > /dev/null 2>&1 && echo "   ✅ Database OK" || echo "   ❌ Database FALHOU"

# 5. Migrações
echo "5. Migrações..."
docker-compose exec backend python manage.py migrate --check > /dev/null 2>&1 && echo "   ✅ Migrações OK" || echo "   ❌ Migrações FALHOU"

echo ""
echo "✅ Verificação concluída!"
```

**Executar**:
```bash
chmod +x scripts/verify-setup.sh
./scripts/verify-setup.sh
```

---

## 📊 Estrutura Docker Compose

```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: cony
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/cony
      DEBUG: "False"
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - ./backend:/app
    command: python manage.py runserver 0.0.0.0:8000

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
    command: npm run dev

volumes:
  postgres_data:
```

---

## 🔐 Variáveis de Ambiente

### Backend (.env)

```bash
# Database
DATABASE_URL=postgresql://user:password@db:5432/cony

# Django
DEBUG=False
DJANGO_SECRET_KEY=your-very-secret-key-here-change-in-production
ALLOWED_HOSTS=localhost,127.0.0.1,backend

# Email (opcional)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend

# CORS (para frontend)
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend (.env.local)

```bash
# API
VITE_API_URL=http://localhost:8000/api

# Ambiente
VITE_ENV=development
```

---

## 📚 Referências

- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Django Management Commands](https://docs.djangoproject.com/en/4.2/ref/django-admin/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
- [React Vite](https://vitejs.dev/)

---

**Última atualização**: 2026-07-21  
**Versão**: 1.0  
**Mantenedor**: Equipe Cony
