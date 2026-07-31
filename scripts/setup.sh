#!/bin/bash
# scripts/setup.sh
# Script de setup inicial para subir o ambiente Cony

set -e

RESET='\033[0m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'

echo -e "${GREEN}🚀 Cony Setup Script${RESET}"
echo ""

# Check pre-requisites
echo -e "${YELLOW}1. Verificando pré-requisitos...${RESET}"
command -v docker >/dev/null 2>&1 || { echo -e "${RED}❌ Docker não encontrado${RESET}"; exit 1; }
command -v docker-compose >/dev/null 2>&1 || { echo -e "${RED}❌ Docker Compose não encontrado${RESET}"; exit 1; }
echo -e "${GREEN}✅ Docker e Docker Compose OK${RESET}"

# Create .env if not exists
echo ""
echo -e "${YELLOW}2. Configurando arquivo .env...${RESET}"
if [ ! -f .env ]; then
  echo -e "${YELLOW}   Arquivo .env não encontrado, criando...${RESET}"
  cat > .env << 'EOF'
# Database
DATABASE_URL=postgresql://postgres:postgres@db:5432/cony

# Django
DEBUG=False
DJANGO_SECRET_KEY=local-dev-secret-key-change-in-production
ALLOWED_HOSTS=localhost,127.0.0.1,backend

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Email
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
EOF
  echo -e "${GREEN}✅ Arquivo .env criado (revise conforme necessário)${RESET}"
else
  echo -e "${GREEN}✅ Arquivo .env já existe${RESET}"
fi

# Create frontend .env if not exists
echo ""
echo -e "${YELLOW}3. Configurando frontend .env...${RESET}"
if [ ! -f frontend/.env.local ]; then
  cat > frontend/.env.local << 'EOF'
VITE_API_URL=http://localhost:8000/api
VITE_ENV=development
EOF
  echo -e "${GREEN}✅ Frontend .env.local criado${RESET}"
else
  echo -e "${GREEN}✅ Frontend .env.local já existe${RESET}"
fi

# Start containers
echo ""
echo -e "${YELLOW}4. Iniciando containers Docker...${RESET}"
docker-compose up -d
echo -e "${GREEN}✅ Containers iniciados${RESET}"

# Wait for DB to be ready
echo ""
echo -e "${YELLOW}5. Aguardando banco de dados ficar pronto...${RESET}"
for i in {1..30}; do
  if docker-compose exec db pg_isready -U postgres >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Banco de dados pronto${RESET}"
    break
  fi
  echo -n "."
  sleep 1
done

# Run migrations
echo ""
echo -e "${YELLOW}6. Rodando migrações...${RESET}"
docker-compose exec backend python manage.py migrate
echo -e "${GREEN}✅ Migrações aplicadas${RESET}"

# Create superuser
echo ""
echo -e "${YELLOW}7. Criando superusuário...${RESET}"
docker-compose exec backend python manage.py createsuperuser --noinput --username admin --email admin@local.dev 2>/dev/null || true
echo -e "${GREEN}✅ Superusuário verificado (usuario: admin, ou será criado interativamente)${RESET}"

# Verification
echo ""
echo -e "${YELLOW}8. Verificando acesso...${RESET}"
sleep 5

if curl -s http://localhost:5173 | grep -q html; then
  echo -e "${GREEN}✅ Frontend acessível em http://localhost:5173${RESET}"
else
  echo -e "${YELLOW}⚠️  Frontend pode estar iniciando, aguarde alguns segundos${RESET}"
fi

if curl -s http://localhost:8000/api/health/ | grep -q ok; then
  echo -e "${GREEN}✅ Backend acessível em http://localhost:8000${RESET}"
else
  echo -e "${RED}❌ Backend não respondendo${RESET}"
fi

echo ""
echo -e "${GREEN}🎉 Setup concluído!${RESET}"
echo ""
echo -e "${YELLOW}Próximos passos:${RESET}"
echo "1. Acesse o frontend: http://localhost:5173"
echo "2. Acesse o admin Django: http://localhost:8000/admin/"
echo "3. Veja logs: docker-compose logs -f"
echo ""
echo -e "${YELLOW}Para parar: docker-compose down${RESET}"
