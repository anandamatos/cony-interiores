# Backend - Cony Interiores

API do projeto Cony Interiores desenvolvida com Django e Django REST Framework.

## Tecnologias

- Python 3.11+
- Django 6
- Django REST Framework
- SQLite (desenvolvimento)

## Estrutura

- config: configuracoes principais do projeto Django
- users: app com endpoints iniciais da API
- manage.py: comandos de administracao Django

## Pre-requisitos

- Python instalado
- Ambiente virtual recomendado

## Instalacao

1. Entre na pasta backend.
2. Crie e ative um ambiente virtual.
3. Instale as dependencias:

```bash
pip install django djangorestframework
```

## Executar em desenvolvimento

1. Aplique migracoes:

```bash
python manage.py migrate
```

2. Suba o servidor:

```bash
python manage.py runserver
```

Servidor local: http://127.0.0.1:8000

## Endpoints atuais

- GET /api/
  - Resposta: {"message": "Bem-vindo ao backend Cony Interiores!"}
- GET /api/hello/
  - Resposta: {"message": "Hello Cony Interiores!"}

## Testes

Execute os testes com:

```bash
python manage.py test
```

## Variaveis de ambiente

As seguintes variaveis sao lidas em config/settings.py:

- DJANGO_SECRET_KEY
- DJANGO_DEBUG
- DJANGO_ALLOWED_HOSTS

Exemplo no PowerShell:

```powershell
$env:DJANGO_DEBUG="True"
$env:DJANGO_ALLOWED_HOSTS="localhost,127.0.0.1"
```

## Integracao com frontend

No desenvolvimento, o frontend (Vite) encaminha chamadas para /api ao backend em http://127.0.0.1:8000.
