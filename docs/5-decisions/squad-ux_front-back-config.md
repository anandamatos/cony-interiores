# Backend - Cony Interiores

API do projeto Cony Interiores desenvolvida com Django e Django REST Framework.

## Tecnologias

- Python 3.11+
- Django 5.0+
- Django REST Framework
- PostgreSQL (produção) / SQLite (desenvolvimento local)

## Estrutura do Projeto

```
backend/
├── config/                 # Configurações principais do Django
│   ├── settings.py         # Configurações gerais
│   ├── settings_sqlite.py  # Configurações para SQLite (local)
│   ├── urls.py             # Rotas principais da API
│   └── wsgi.py             # Ponto de entrada WSGI
├── core/                   # Apps do projeto
│   ├── users/              # App de usuários e autenticação
│   │   ├── models.py       # Modelos de usuário
│   │   ├── views.py        # Views da API
│   │   ├── serializers.py  # Serializers
│   │   └── urls.py         # Rotas do app
│   └── services/           # App de serviços (em desenvolvimento)
├── manage.py               # Comandos de administração Django
├── requirements.txt        # Dependências do projeto
├── .env.example            # Exemplo de variáveis de ambiente
└── README.md               # Este arquivo
```

## Pré-requisitos

- Python 3.11+ instalado
- Ambiente virtual (recomendado)
- PostgreSQL (opcional, para produção)

## Instalação e Configuração

### 1. Clonar o repositório e entrar na pasta

```bash
git clone git@github.com:anandamatos/cony-interiores.git
cd cony-interiores/backend
```

### 2. Criar e ativar ambiente virtual

```bash
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows
```

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

### 4. Configurar variáveis de ambiente

```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### 5. Aplicar migrações

```bash
# Para desenvolvimento local (SQLite)
python manage.py migrate --settings=config.settings_sqlite

# Para produção (PostgreSQL)
python manage.py migrate
```

### 6. Executar o servidor

```bash
# Desenvolvimento local (SQLite)
python manage.py runserver --settings=config.settings_sqlite

# Produção (PostgreSQL)
python manage.py runserver
```

Servidor disponível em: http://127.0.0.1:8000

## Endpoints Disponíveis

| Método | Endpoint | Descrição | Status |
|--------|----------|-----------|--------|
| GET | `/api/` | Mensagem de boas-vindas | ✅ Ativo |
| GET | `/api/hello/` | Mensagem de teste | ✅ Ativo |
| GET | `/api/services/` | Lista de serviços | 🚧 Em desenvolvimento |
| POST | `/api/services/` | Criar novo serviço | 🚧 Em desenvolvimento |
| GET | `/api/seamstresses/` | Lista de costureiras | 🚧 Em desenvolvimento |
| POST | `/api/seamstresses/` | Criar nova costureira | 🚧 Em desenvolvimento |

## Testes

```bash
# Executar testes com SQLite
python manage.py test --settings=config.settings_sqlite

# Executar testes com PostgreSQL
python manage.py test
```

## Migração de Dados (SQLite → PostgreSQL)

```bash
# 1. Exportar dados do SQLite
python manage.py dumpdata --settings=config.settings_sqlite \
  --natural-foreign --natural-primary \
  -e contenttypes -e auth.permission \
  --indent 2 --output sqlite_data.json

# 2. Aplicar migrações no PostgreSQL
python manage.py migrate

# 3. Carregar os dados
python manage.py loaddata sqlite_data.json
```

## Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `DJANGO_SECRET_KEY` | Chave secreta do Django | Gerada automaticamente |
| `DJANGO_DEBUG` | Modo debug | `True` (desenvolvimento) |
| `DJANGO_DATABASE` | Banco de dados (`sqlite` ou `postgres`) | `sqlite` |
| `DB_NAME` | Nome do banco PostgreSQL | `cony_db` |
| `DB_USER` | Usuário PostgreSQL | `postgres` |
| `DB_PASSWORD` | Senha PostgreSQL | - |
| `DB_HOST` | Host PostgreSQL | `localhost` |
| `DB_PORT` | Porta PostgreSQL | `5432` |
| `DJANGO_ALLOWED_HOSTS` | Hosts permitidos | `localhost,127.0.0.1` |

## Integração com Frontend

- O frontend (React/Vite) faz requisições para `/api` que são proxyadas para `http://127.0.0.1:8000`
- CORS está configurado para aceitar requisições do frontend

## Mudanças Recentes

### Do Estado Inicial para o Atual

| Aspecto | Antes | Agora |
|---------|-------|-------|
| **Configuração** | Apenas SQLite | SQLite (dev) e PostgreSQL (prod) |
| **Settings** | Arquivo único | Settings separados (`settings.py` e `settings_sqlite.py`) |
| **Endpoints** | Apenas `/api/` e `/api/hello/` | Estrutura preparada para novos endpoints |
| **Models** | Apenas User | Preparado para Services e Seamstresses |
| **Migrações** | Iniciais | Atualizadas para suportar novos modelos |
| **Documentação** | Básica | Completa com instruções de setup |

### Próximos Passos (Backend)

1. Implementar modelos de `Service` e `Seamstress`
2. Criar serializers e views para CRUD completo
3. Adicionar autenticação JWT
4. Implementar testes unitários e de integração

---

## Problemas Comuns e Soluções

### Erro: `ModuleNotFoundError: No module named 'config.settings'`

**Solução:** Certifique-se de estar usando o settings correto:
```bash
python manage.py runserver --settings=config.settings_sqlite
```

### Erro: `django.db.utils.OperationalError: no such table`

**Solução:** Execute as migrações:
```bash
python manage.py migrate --settings=config.settings_sqlite
```

### Erro de CORS

**Solução:** Verifique se o frontend está configurado com o proxy correto no `vite.config.js`.

---

## 🔗 Links Úteis

- **Repositório:** https://github.com/anandamatos/cony-interiores
- **Issues:** https://github.com/anandamatos/cony-interiores/issues
- **Projeto:** https://github.com/users/anandamatos/projects/7
- **Documentação Django:** https://docs.djangoproject.com/
- **Django REST Framework:** https://www.django-rest-framework.org/

---

**Última atualização:** 01/07/2026
**Status:** Em desenvolvimento (Fase 2 - Formação Avançada)

---

# Frontend - Cony Interiores

Frontend em React com Vite para o sistema de controle de produção da Cony Interiores.

## Tecnologias

- React 18+
- Vite 5+
- React Router DOM 6+
- Tailwind CSS 3+
- Lucide React (Ícones)
- Axios (HTTP Client)
- classnames (Classes condicionais)

## Estrutura do Projeto

```
frontend/
├── public/                 # Assets estáticos
├── src/
│   ├── components/
│   │   ├── atoms/          # Componentes básicos (Button, Input, Card, etc.)
│   │   ├── molecules/      # Combinações de átomos (SearchBar, etc.)
│   │   ├── organisms/      # Componentes complexos (Header, Sidebar)
│   │   └── templates/      # Layouts de páginas
│   ├── layouts/
│   │   └── MainLayout.jsx  # Layout principal com sidebar
│   ├── pages/
│   │   ├── Dashboard/      # Página inicial com métricas
│   │   ├── Services/       # Lista de serviços
│   │   ├── NewService/     # Formulário de cadastro
│   │   └── Seamstresses/   # Lista de costureiras
│   ├── services/
│   │   └── api.js          # Configuração do Axios
│   ├── styles/
│   │   └── index.css       # Estilos globais com Tailwind
│   ├── App.jsx             # Rotas principais
│   └── main.jsx            # Ponto de entrada
├── index.html              # HTML principal
├── package.json            # Dependências
├── vite.config.js          # Configuração do Vite
├── tailwind.config.js      # Configuração do Tailwind
├── postcss.config.js       # Configuração do PostCSS
└── README.md               # Este arquivo
```

## Design System

O projeto utiliza um Design System baseado em **Atomic Design** com os seguintes componentes:

### Átomos
- `Typography` - Textos com variantes (h1, h2, body, caption)
- `Button` - Botões com variantes (primary, secondary, danger)
- `Input` - Campos de texto com validação
- `Select` - Dropdowns com opções
- `Card` - Containers com sombra e borda
- `Badge` - Tags com cores (success, warning, error, info)

### Organismos
- `Header` - Cabeçalho com busca e perfil
- `Sidebar` - Menu lateral com navegação (padrão Gemini/Discord)

### Layouts
- `MainLayout` - Layout principal com sidebar fixa

### Páginas
- `Dashboard` - Visão geral com métricas e alertas
- `Services` - Lista de serviços com filtros
- `NewService` - Formulário de cadastro de serviços
- `Seamstresses` - Lista de costureiras

## Pré-requisitos

- Node.js 18+
- npm 9+

## Instalação

### 1. Clonar o repositório e entrar na pasta

```bash
git clone git@github.com:anandamatos/cony-interiores.git
cd cony-interiores/frontend
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente (opcional)

```bash
cp .env.example .env
# Edite o arquivo .env se necessário
```

## Desenvolvimento

### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

Aplicação disponível em: http://127.0.0.1:5173

### Build de produção

```bash
npm run build
```

### Visualizar build local

```bash
npm run preview
```

## Integração com Backend

O frontend se comunica com o backend Django através de um proxy configurado no `vite.config.js`:

```js
server: {
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
    }
  }
}
```

**Fluxo:**
1. Frontend faz requisição para `/api/hello/`
2. Vite redireciona para `http://127.0.0.1:8000/api/hello/`
3. Backend processa e retorna a resposta

## Convenções de Código

### Componentes
- Componentes em **PascalCase**: `Button`, `Header`, `Dashboard`
- Arquivos: `index.jsx` dentro da pasta do componente
- Props com nomes descritivos

### Estilos
- Tailwind CSS com classes utilitárias
- Cores definidas no `tailwind.config.js`

### Commits
- Padrão: `tipo@[squad]/ [STORY-XX-XXX]`
- Exemplo: `feat@ux/ [STORY-M1-UX-001] Implementa layout base`

## Mudanças Recentes

### Do Estado Inicial para o Atual

| Aspecto | Antes | Agora |
|---------|-------|-------|
| **Setup** | Apenas React + Vite | React + Vite + Tailwind + React Router |
| **Estilização** | CSS puro | Tailwind CSS com Design System |
| **Componentes** | Nenhum | 6 átomos + 2 organismos + 1 layout + 4 páginas |
| **Navegação** | Nenhuma | React Router com 4 rotas |
| **Menu** | Nenhum | Sidebar com navegação (padrão Gemini/Discord) |
| **Integração com API** | Nenhuma | Axios configurado com proxy |
| **Responsividade** | Nenhuma | Em desenvolvimento (TASK-M1-UX-005) |

### Próximos Passos (Frontend)

1. **TASK-M1-UX-005:** Garantir responsividade (mobile-first)
2. **TASK-M1-UX-006:** Criar página de listagem de costureiras (integrada com API)
3. **TASK-M1-UX-007:** Implementar formulário de cadastro/edição
4. **TASK-M1-UX-008:** Integrar com API do backend

## Problemas Comuns e Soluções

### Erro: `Failed to resolve import`

**Solução:** Verifique se o caminho do import está correto e se o arquivo existe.

### Erro: `Port 5173 is in use`

**Solução:** O Vite usará a próxima porta disponível (ex: 5174) ou você pode parar o outro processo.

### Erro: `API request failed`

**Solução:** Verifique se o backend está rodando em `http://127.0.0.1:8000`.

### Tailwind não está funcionando

**Solução:** Verifique se o `tailwind.config.js` e o `postcss.config.js` estão configurados corretamente.

---

## 🔗 Links Úteis

- **Repositório:** https://github.com/anandamatos/cony-interiores
- **Issues:** https://github.com/anandamatos/cony-interiores/issues
- **Projeto:** https://github.com/users/anandamatos/projects/7
- **Documentação React:** https://react.dev/
- **Documentação Vite:** https://vitejs.dev/
- **Documentação Tailwind:** https://tailwindcss.com/

---

**Última atualização:** 01/07/2026
**Status:** Em desenvolvimento (Fase 2 - Formação Avançada)

## 📋 Resumo das Mudanças (Backend)

| Aspecto | Antes (Início) | Agora (Atual) |
|---------|----------------|---------------|
| **Configuração** | Apenas SQLite | SQLite (dev) + PostgreSQL (prod) |
| **Settings** | `settings.py` único | `settings.py` + `settings_sqlite.py` |
| **Endpoints** | `/api/`, `/api/hello/` | Preparado para `/api/services/`, `/api/seamstresses/` |
| **Models** | Apenas User | Estrutura para Services e Seamstresses |
| **Migrações** | Iniciais | Atualizadas |
| **Documentação** | Básica | Completa |

---

## 📋 Resumo das Mudanças (Frontend)

| Aspecto | Antes (Início) | Agora (Atual) |
|---------|----------------|---------------|
| **Setup** | React + Vite | React + Vite + Tailwind + React Router |
| **Estilização** | CSS puro | Tailwind CSS com Design System |
| **Componentes** | Nenhum | 6 átomos + 2 organismos |
| **Páginas** | Nenhuma | 4 páginas (Dashboard, Services, NewService, Seamstresses) |
| **Navegação** | Nenhuma | Sidebar com 5 itens |
| **API** | Nenhuma | Axios com proxy configurado |

---

## 🚀 Ambiente de Desenvolvimento Atual

### Backend
```bash
# Rodar com SQLite (local)
cd backend
source .venv/bin/activate
python manage.py runserver --settings=config.settings_sqlite
```

### Frontend
```bash
# Rodar com Vite
cd frontend
npm run dev
```

### Acessos
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API Proxy: http://localhost:5173/api → http://localhost:8000/api