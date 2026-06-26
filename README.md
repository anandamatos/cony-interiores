# Cony Interiores

Aplicacao full stack com frontend em React (Vite) e backend em Django + Django REST Framework.

## Estrutura

- backend: API Django
- frontend: interface React

## Requisitos

- Python 3.11+
- Node.js 18+
- npm 9+

## Como rodar o backend

1. Entre na pasta backend.
2. Ative seu ambiente virtual.
3. Instale as dependencias:

   pip install django djangorestframework

4. Rode as migracoes:

   python manage.py migrate

5. Inicie o servidor:

   python manage.py runserver

Backend em: http://127.0.0.1:8000

## Como rodar o frontend

1. Entre na pasta frontend.
2. Instale as dependencias:

   npm install

3. Inicie o servidor de desenvolvimento:

   npm run dev

Frontend em: http://127.0.0.1:5173

## Integracao front e back

O frontend chama /api/hello/. Em desenvolvimento, o proxy do Vite redireciona /api para o backend em http://127.0.0.1:8000.

## Endpoints atuais

- GET /api/
- GET /api/hello/

## Scripts uteis (frontend)

- npm run dev: sobe ambiente de desenvolvimento
- npm run build: gera build de producao
- npm run preview: testa build localmente

## Publicacao no GitHub

Depois de clonar ou criar o repositorio remoto, use:

git add .
git commit -m "docs: atualiza README do projeto"
git push
