# Backend - Cony Interiores

API do projeto Cony Interiores desenvolvida com Django e Django REST Framework.

## Tecnologias

- Python 3.11+
- Django 6
- Django REST Framework
- PostgreSQL

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
pip install -r requirements.txt
```

4. Configure as variaveis de ambiente do banco:

```powershell
$env:POSTGRES_DB="projeto1"
$env:POSTGRES_USER="postgres"
$env:POSTGRES_PASSWORD="postgres"
$env:POSTGRES_HOST="127.0.0.1"
$env:POSTGRES_PORT="5432"
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
- POSTGRES_DB
- POSTGRES_USER
- POSTGRES_PASSWORD
- POSTGRES_HOST
- POSTGRES_PORT
- POSTGRES_CONN_MAX_AGE

Exemplo no PowerShell:

```powershell
$env:DJANGO_DEBUG="True"
$env:DJANGO_ALLOWED_HOSTS="localhost,127.0.0.1"
$env:POSTGRES_DB="projeto1"
$env:POSTGRES_USER="postgres"
$env:POSTGRES_PASSWORD="postgres"
$env:POSTGRES_HOST="127.0.0.1"
$env:POSTGRES_PORT="5432"
```

## Integracao com frontend

No desenvolvimento, o frontend (Vite) encaminha chamadas para /api ao backend em http://127.0.0.1:8000.

## Migracao de dados (SQLite -> PostgreSQL)

Se voce precisa migrar dados existentes do SQLite para o PostgreSQL:

1. Exporte dados do SQLite para fixture JSON:

```bash
python manage.py dumpdata --settings=config.settings_sqlite --natural-foreign --natural-primary -e contenttypes -e auth.permission --indent 2 --output sqlite_data.json
```

2. Aplique migracoes no PostgreSQL:

```bash
python manage.py migrate
```

3. Carregue os dados no PostgreSQL:

```bash
python manage.py loaddata sqlite_data.json
```
