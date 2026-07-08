## Tecnologias

Frontend

- React
- JavaScript
- React Router
- Axios

Backend

- Django
- Django REST Framework
- PostgreSQL

Infraestrutura

- Docker
- Docker Compose

---

## Pré-requisitos

- Git
- Docker Desktop

Não é necessário instalar Python, Node.js ou PostgreSQL localmente.

---

## Clonando o projeto

```bash
git clone https://github.com/ORGANIZACAO/cony-interiores.git

cd cony-interiores
```

---

## Criando o arquivo .env

Na raiz do projeto.

Copie:

```bash
cp .env.example .env
```

```env
POSTGRES_DB=cony
POSTGRES_USER=cony
POSTGRES_PASSWORD=cony123
```

Depois entre na pasta backend.

Copie:

```bash
cp .env.example .env
```

Edite as variáveis.

Exemplo:

```env
SECRET_KEY=sua_secret_key

DEBUG=True

DB_NAME=cony

DB_USER=cony

DB_PASSWORD=cony123

DB_HOST=db

DB_PORT=5432
```

---

## Executando

Abra o docker desktop, espere até aparecer “Engine running” no canto inferior esquerdo

Na raiz do projeto:

```bash
docker compose up --build
```

---

## Executando as migrações

```bash
docker compose exec backend python manage.py migrate
```

---

## Criando um superusuário

```bash
docker compose exec backend python manage.py createsuperuser
```

---

## Acessando

Frontend

http://localhost:5173

Backend

http://localhost:8000

Autenticação (JWT)

http://localhost:8000/api/auth/token/

http://localhost:8000/api/auth/token/refresh/

http://localhost:8000/api/auth/me/

Admin Django

http://localhost:8000/admin

---

## Endpoints de autenticação

- `POST /api/auth/token/` retorna `access` e `refresh`
- `POST /api/auth/token/refresh/` retorna novo `access`
- `GET /api/auth/me/` requer header `Authorization: Bearer <token>`

---

## Encerrando

```bash
docker compose down
```

---

## Estrutura

```
cony-interiores/

backend/

frontend/

docs/

docker-compose.yml

```
