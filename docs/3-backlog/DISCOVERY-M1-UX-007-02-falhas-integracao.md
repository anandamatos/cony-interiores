# DISCOVERY-M1-UX-007-02: Catalogar falhas mais comuns de integração local

**Status**: ✅ Completado  
**Data**: 2026-07-21  
**Responsável**: @anandamatos  

---

## Objetivo

Documentar os problemas mais frequentes encontrados ao integrar frontend com backend em ambiente local (Docker), incluindo sintomas, causas raiz, diagnóstico e soluções.

---

## Falhas Catalogadas

### 1. ❌ Erro 500 - Migrações pendentes no backend

**Sintoma**:
```
GET http://localhost:8000/api/produtos/ → 500 Internal Server Error
Console Backend: django.db.utils.OperationalError: no such column: users_produto.tipo_produto
```

**Causa Raiz**:
- Migrações pendentes não foram executadas
- Banco SQLite em desincronização com models Django
- Geralmente ocorre após:
  - Fresh clone do repositório
  - Merge de branch com novas migrations
  - Reset do container backend

**Diagnóstico**:
```bash
# Verificar migrações pendentes
docker-compose exec -T backend python manage.py showmigrations

# Saída esperada com ❌ em frente a migration não aplicada:
users
 [X] 0001_initial
 [ ] 0002_costureira_capacidade_base_semanal_and_more  # ← Problema aqui
```

**Solução**:
```bash
# 1. Aplicar migrações faltantes
docker-compose exec -T backend python manage.py migrate

# 2. Verificar que tudo passou
docker-compose exec -T backend python manage.py showmigrations | grep -E "\[X\]"

# 3. Testar endpoint
curl -I http://localhost:8000/api/produtos/
# Esperado: 200 OK
```

**Prevenção**:
- Adicionar check de migrações ao startup local (ver `scripts/setup.sh`)
- Documentar em SETUP.md após cada merge com nova migration

---

### 2. ❌ Erro CORS - Frontend bloqueado ao chamar backend

**Sintoma**:
```
Browser Console:
Access to XMLHttpRequest at 'http://localhost:8000/api/...' from origin 
'http://localhost:5173' has been blocked by CORS policy
```

**Causa Raiz**:
- Backend Django não está configurado com CORS permitido
- Falta `django-cors-headers` instalado
- `CORS_ALLOWED_ORIGINS` não inclui `http://localhost:5173`
- Backend replicado em porta diferente da esperada

**Diagnóstico**:
```bash
# Verificar resposta de CORS do backend
curl -I -H "Origin: http://localhost:5173" http://localhost:8000/api/

# Saída esperada:
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

**Solução**:
```bash
# 1. Verificar docker-compose está rodando backend
docker-compose ps | grep backend
# Status esperado: Up

# 2. Verificar porta do backend (deve ser 8000)
docker-compose port backend 8000
# Saída esperada: 127.0.0.1:8000

# 3. Reiniciar containers com rebuild se necessário
docker-compose restart backend
# ou
docker-compose up -d --build backend
```

**Prevenção**:
- Confirmar `VITE_API_BASE_URL=http://localhost:8000` em `.env.local`
- Adicionar health check em scripts de setup

---

### 3. ❌ Erro 404 - Endpoint não existe ou rota mal configurada

**Sintoma**:
```
GET http://localhost:8000/api/clientes/ → 404 Not Found
```

**Causa Raiz**:
- Rota não registrada no `urls.py` backend
- Typo no nome da rota/viewset
- ViewSet não foi adicionado ao `router.register()`
- APP não está em `INSTALLED_APPS`

**Diagnóstico**:
```bash
# Listar rotas registradas no Django
docker-compose exec -T backend python manage.py show_urls

# Procurar por rotas esperadas
docker-compose exec -T backend python manage.py show_urls | grep -i cliente
docker-compose exec -T backend python manage.py show_urls | grep -i costureira
docker-compose exec -T backend python manage.py show_urls | grep -i produto
```

**Solução**:
1. Verificar `backend/urls.py` tem todas as rotas esperadas
2. Verificar `views.py` tem ViewSets com serializers corretos
3. Reiniciar backend:
   ```bash
   docker-compose restart backend
   ```

**Prevenção**:
- Manter lista atualizada de endpoints em docs
- Adicionar health check que valida endpoints críticos

---

### 4. ❌ Erro 400 Bad Request - Validação falha no backend

**Sintoma**:
```
POST http://localhost:8000/api/servicos/ → 400 Bad Request
Response: {"cliente": ["This field may not be null."]}
```

**Causa Raiz**:
- Campo obrigatório não foi enviado
- Tipo de dado incorreto (ex: string em vez de integer)
- Campo não exatamente como esperado no serializer

**Diagnóstico**:
```bash
# Testar POST manualmente
curl -X POST http://localhost:8000/api/servicos/ \
  -H "Content-Type: application/json" \
  -d '{"cliente": null, "costureira": 1}'

# Resposta mostrará exatamente qual campo falhou
```

**Solução**:
1. Verificar serializer `fields` em backend
2. Validar payload em frontend antes de enviar (já implementado com validação client-side)
3. Incluir campo na submissão:
   ```javascript
   await serviceService.create({
     cliente: "123",        // ← obrigatório
     costureira: "456",
     produto: "789",
     quantidade: 1,
     // ... outros campos
   })
   ```

---

### 5. ⏱️ Erro Timeout - Backend demorando ou travado

**Sintoma**:
```
GET http://localhost:8000/api/costureiras/ → Timeout após 30s
(ou no navegador: ERR_CONNECTION_TIMED_OUT)
```

**Causa Raiz**:
- Backend container não iniciou completamente
- Query N+1 ou query muito pesada
- Banco de dados travado (SQLite lock)
- Backend consumindo 100% CPU

**Diagnóstico**:
```bash
# Verificar status do backend
docker-compose ps backend

# Ver logs em tempo real
docker-compose logs -f backend

# Procurar por erro de lock SQLite
docker-compose logs backend | grep -i "database locked"

# Ver CPU/memória
docker stats backend
```

**Solução**:
```bash
# 1. Reiniciar backend
docker-compose restart backend
docker-compose logs -f backend  # esperar por "Starting development server"

# 2. Se SQLite estiver locked:
docker-compose exec -T backend python manage.py shell
>>> import sqlite3
>>> conn = sqlite3.connect('/app/db.sqlite3')
>>> conn.close()
# ou simplesmente deletar lock file:
rm /Users/am/projects/cony/db/db.sqlite3-wal
rm /Users/am/projects/cony/db/db.sqlite3-shm

# 3. Rebuild container se problema persistir
docker-compose down
docker-compose up -d --build backend
```

---

### 6. ❌ Erro 401/403 - Autenticação falha

**Sintoma**:
```
GET http://localhost:8000/api/costureiras/ → 401 Unauthorized
Response: {"detail": "Authentication credentials were not provided."}
```

**Causa Raiz**:
- Backend requer token JWT/sessão
- Frontend não está enviando Authorization header
- Token expirou
- Tipo de autenticação esperada mudou

**Diagnóstico**:
```bash
# Testar com curl sem auth
curl http://localhost:8000/api/costureiras/

# Testar com token (se necessário)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:8000/api/costureiras/
```

**Solução**:
1. Verificar se backend realmente requer autenticação (checar `permission_classes`)
2. Se não requer, verificar `settings.py`:
   ```python
   REST_FRAMEWORK = {
       'DEFAULT_PERMISSION_CLASSES': [
           'rest_framework.permissions.AllowAny',  # ← desenvolvimento
       ]
   }
   ```
3. Reiniciar backend após alterar settings

---

### 7. ❌ Erro de Database Lock - SQLite travado

**Sintoma**:
```
Backend error: database is locked
Frontend: Timeout após vários segundos
```

**Causa Raiz**:
- Múltiplas transações simultâneas em SQLite
- Script de seed rodando e bloqueando
- Conexão aberta de outro container

**Diagnóstico**:
```bash
# Procurar por locks
ls -la /Users/am/projects/cony/db/db.sqlite3*

# Se houver arquivos com -wal ou -shm, há lock ativo
```

**Solução**:
```bash
# 1. Parar todos containers
docker-compose down

# 2. Remover arquivos de lock
rm /Users/am/projects/cony/db/db.sqlite3-wal
rm /Users/am/projects/cony/db/db.sqlite3-shm

# 3. Reiniciar
docker-compose up -d
```

---

### 8. ❌ Erro 500 - Serializer ou View quebrado

**Sintoma**:
```
GET http://localhost:8000/api/servicos/ → 500 Internal Server Error
Backend logs: AttributeError: 'dict' object has no attribute 'cliente_nome'
```

**Causa Raiz**:
- Bug no serializer (field ausente ou mal nomeado)
- Lógica de view quebrada após refactor
- Relacionamento em cascade quebrado

**Diagnóstico**:
```bash
# Ver erro detalhado nos logs
docker-compose logs backend | tail -50

# Testar endpoint interativo
docker-compose exec -T backend python manage.py shell
>>> from users.models import Servico
>>> Servico.objects.first()  # vai lançar erro se houver
```

**Solução**:
1. Corrigir serializer ou view baseado em erro dos logs
2. Adicionar campo faltante ou corrigir nome
3. Testar localmente:
   ```bash
   docker-compose restart backend
   docker-compose logs -f backend
   ```

---

## Checklist de Diagnóstico Rápido

Quando algo não funciona, seguir em ordem:

- [ ] **Containers rodando?** `docker-compose ps`
- [ ] **Migrações aplicadas?** `docker-compose exec -T backend python manage.py showmigrations`
- [ ] **Endpoint existe?** `curl -I http://localhost:8000/api/...`
- [ ] **CORS ok?** Check browser console (Network tab)
- [ ] **Backend logs?** `docker-compose logs backend | tail -50`
- [ ] **Frontend logs?** Check browser console (Console tab)
- [ ] **SQLite lock?** `ls -la db/db.sqlite3*`
- [ ] **Porta correta?** `docker-compose port backend 8000`

---

## Script de Recovery Automático

Disponível em `scripts/troubleshoot.sh`:

```bash
# Executar troubleshoot completo
bash scripts/troubleshoot.sh

# Ou fazer reset limpo:
bash scripts/reset-db.sh
docker-compose up -d --build
```

---

## Próximas Ações

1. ✅ Documentar falhas comuns
2. Automatizar health check em setup (SETUP.md)
3. Criar logs estruturados para diagnóstico mais fácil
4. Adicionar telemetria para capturar falhas em produção

---

## Referências

- SETUP.md: Procedimento de setup local
- troubleshoot.sh: Script de diagnóstico automático
- Backend logs: `docker-compose logs backend`
- Frontend logs: Browser DevTools Console
