#!/bin/bash
# scripts/reset-db.sh
# Script para resetar banco de dados completamente

set -e

RESET='\033[0m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'

echo -e "${RED}⚠️  ATENÇÃO: Este script DELETARÁ todos os dados do banco!${RESET}"
echo ""

read -p "Tem certeza? Digite 'sim' para continuar: " confirm

if [ "$confirm" != "sim" ]; then
  echo "Cancelado."
  exit 0
fi

echo ""
echo -e "${YELLOW}Resetando banco de dados...${RESET}"

# Option 1: Drop all volumes and restart
echo -e "${YELLOW}1. Parando containers...${RESET}"
docker-compose down

echo -e "${YELLOW}2. Removendo volumes...${RESET}"
docker-compose down -v

echo -e "${YELLOW}3. Iniciando novamente...${RESET}"
docker-compose up -d

echo -e "${YELLOW}4. Aguardando banco ficar pronto...${RESET}"
for i in {1..30}; do
  if docker-compose exec db pg_isready -U postgres >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Banco pronto${RESET}"
    break
  fi
  echo -n "."
  sleep 1
done

echo -e "${YELLOW}5. Aplicando migrações...${RESET}"
docker-compose exec backend python manage.py migrate

echo -e "${YELLOW}6. Criando superusuário...${RESET}"
docker-compose exec backend python manage.py createsuperuser --noinput --username admin --email admin@local.dev 2>/dev/null || true

echo ""
echo -e "${GREEN}✅ Banco resetado com sucesso!${RESET}"
echo ""
echo "Próximos passos:"
echo "1. Acesse admin: http://localhost:8000/admin/"
echo "2. Usuario: admin (defina senha em primeira login ou via: docker-compose exec backend python manage.py changepassword admin)"
