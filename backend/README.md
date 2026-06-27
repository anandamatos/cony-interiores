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

4. O projeto usa SQLite por padrao no desenvolvimento local.
5. Para usar PostgreSQL, copie `.env.example` para `.env`, mantenha `DJANGO_DATABASE=postgres` e ajuste as credenciais do seu banco.

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

Para executar com PostgreSQL, crie um arquivo `.env` com base em `.env.example`.

## Endpoints atuais

- GET /api/
  - Resposta: {"message": "Bem-vindo ao backend Cony Interiores!"}
- GET /api/hello/
  - Resposta: {"message": "Hello Cony Interiores!"}

## Testes

Execute os testes com:

```bash
python manage.py test --settings=config.settings_sqlite
```

## Variaveis de ambiente

As variaveis sao lidas automaticamente do arquivo `.env` na raiz do backend.

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
