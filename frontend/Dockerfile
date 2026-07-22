FROM node:22-alpine

WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências com permissões para Alpine
RUN npm install --legacy-peer-deps

# Copiar o resto do código
COPY . .

# Expor a porta do frontend
EXPOSE 5173

# Comando para rodar o frontend
CMD ["npm", "run", "dev"]