# DISCOVERY-M1-UX-007-06: Mapear contratos de API para edição

**Status**: ✅ Completado  
**Data**: 2026-07-21  
**Responsável**: @anandamatos  

---

## Objetivo

Documentar os contratos de API (endpoints, métodos HTTP, payloads, respostas) necessários para as operações de edição (GET por ID + PUT/PATCH) de Serviços e Costureiras.

---

## Serviços - Contratos de Edição

### GET /api/servicos/:id/ - Recuperar dados do serviço para prefill

**Propósito**: Carregar dados existentes do serviço para preencher o formulário de edição

**Request**:
```http
GET /api/servicos/123/ HTTP/1.1
Host: localhost:8000
Accept: application/json
```

**Response** (200 OK):
```json
{
  "id": 123,
  "cliente": 1,
  "cliente_nome": "João Silva",
  "costureira": 2,
  "costureira_nome": "Maria Santos",
  "produto": [3],
  "produto_nome": "Vestido",
  "quantidade": 5,
  "complexidade": "media",
  "data_envio": "2026-07-22",
  "prazo_entrega": "2026-07-30",
  "valor": "250.00",
  "observacoes": "Entrega urgente",
  "created_at": "2026-07-21T10:00:00Z",
  "updated_at": "2026-07-21T10:00:00Z"
}
```

**Error** (404 Not Found):
```json
{
  "detail": "Not found."
}
```

**Implementação atual**:
- ✅ Endpoint existe: `serviceService.getById(id)`
- ✅ Used in: `EditService.jsx` → useEffect ao montar
- ✅ Prefill: Passa `initialData` para `ServiceForm`

---

### PUT /api/servicos/:id/ - Atualizar serviço

**Propósito**: Persistir alterações do formulário no backend

**Request**:
```http
PUT /api/servicos/123/ HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "cliente": 1,
  "costureira": 2,
  "produto": [3],
  "quantidade": 5,
  "complexidade": "alta",
  "data_envio": "2026-07-23",
  "prazo_entrega": "2026-07-31",
  "valor": "300.00",
  "observacoes": "Alterado: prazo ajustado"
}
```

**Response** (200 OK):
```json
{
  "id": 123,
  "cliente": 1,
  "cliente_nome": "João Silva",
  "costureira": 2,
  "costureira_nome": "Maria Santos",
  "produto": [3],
  "produto_nome": "Vestido",
  "quantidade": 5,
  "complexidade": "alta",
  "data_envio": "2026-07-23",
  "prazo_entrega": "2026-07-31",
  "valor": "300.00",
  "observacoes": "Alterado: prazo ajustado",
  "created_at": "2026-07-21T10:00:00Z",
  "updated_at": "2026-07-21T11:30:00Z"
}
```

**Error** (400 Bad Request):
```json
{
  "cliente": ["This field may not be null."],
  "valor": ["Ensure this value is greater than or equal to 0.01."]
}
```

**Error** (404 Not Found):
```json
{
  "detail": "Not found."
}
```

**Implementação atual**:
- ✅ Endpoint existe: `serviceService.update(id, data)`
- ✅ Used in: `EditService.jsx` → handleSubmit
- ✅ Validação: Client-side em `ServiceForm`

---

## Costureiras - Contratos de Edição

### GET /api/costureiras/:id/ - Recuperar dados da costureira para prefill

**Propósito**: Carregar dados existentes da costureira para preencher o formulário de edição

**Request**:
```http
GET /api/costureiras/456/ HTTP/1.1
Host: localhost:8000
Accept: application/json
```

**Response** (200 OK):
```json
{
  "id": 456,
  "nome": "Ana Costa",
  "especialidade": "Calças",
  "ativa": true,
  "capacidadeBaseSemanal": 20,
  "created_at": "2026-07-20T09:00:00Z",
  "updated_at": "2026-07-21T10:00:00Z"
}
```

**Error** (404 Not Found):
```json
{
  "detail": "Not found."
}
```

**Implementação atual**:
- ✅ Endpoint existe: `getSeamstressById(id)` via `seamstressService`
- ✅ Used in: `EditSeamstress.jsx` → useEffect ao montar
- ✅ Prefill: Passa `initialData` para `CostureiraForm`

---

### PUT /api/costureiras/:id/ - Atualizar costureira

**Propósito**: Persistir alterações do formulário no backend

**Request**:
```http
PUT /api/costureiras/456/ HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "nome": "Ana Costa Silva",
  "especialidade": "Vestidos e Calças",
  "ativa": true,
  "capacidadeBaseSemanal": 25
}
```

**Response** (200 OK):
```json
{
  "id": 456,
  "nome": "Ana Costa Silva",
  "especialidade": "Vestidos e Calças",
  "ativa": true,
  "capacidadeBaseSemanal": 25,
  "created_at": "2026-07-20T09:00:00Z",
  "updated_at": "2026-07-21T11:45:00Z"
}
```

**Error** (400 Bad Request):
```json
{
  "nome": ["This field may not be blank."],
  "capacidadeBaseSemanal": ["Ensure this value is greater than 0."]
}
```

**Error** (404 Not Found):
```json
{
  "detail": "Not found."
}
```

**Implementação atual**:
- ✅ Endpoint existe: `updateSeamstress(id, data)`
- ✅ Used in: `EditSeamstress.jsx` → handleSubmit
- ✅ Validação: Client-side em `CostureiraForm`

---

## Matriz de Compatibilidade Frontend ↔ Backend

| Operação | Frontend | Backend | Status | Validação |
|----------|----------|---------|--------|-----------|
| GET /api/servicos/:id/ | `serviceService.getById(id)` | ViewSet.retrieve() | ✅ Working | Nome campos OK |
| PUT /api/servicos/:id/ | `serviceService.update(id, data)` | ViewSet.update() | ✅ Working | Tipos OK |
| GET /api/costureiras/:id/ | `getSeamstressById(id)` | ViewSet.retrieve() | ✅ Working | Nome campos OK |
| PUT /api/costureiras/:id/ | `updateSeamstress(id, data)` | ViewSet.update() | ✅ Working | Tipos OK |

---

## Campos Mapeados - Serviços

### Input (Frontend → Backend)

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| cliente | integer (ID) | Sim | > 0 |
| costureira | integer (ID) | Sim | > 0 |
| produto | integer array (IDs) | Sim | length ≥ 1 |
| quantidade | integer | Sim | ≥ 1 |
| complexidade | string enum | Não | baixa\|media\|alta |
| data_envio | date (YYYY-MM-DD) | Sim | valid date |
| prazo_entrega | date (YYYY-MM-DD) | Sim | valid date, ≥ data_envio |
| valor | decimal | Sim | > 0.01 |
| observacoes | string | Não | max 500 chars |

### Output (Backend → Frontend)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | integer | ID único |
| cliente | integer | ID do cliente |
| cliente_nome | string | Nome do cliente (denormalized) |
| costureira | integer | ID da costureira |
| costureira_nome | string | Nome da costureira (denormalized) |
| produto | integer array | IDs dos produtos |
| produto_nome | string | Nome do produto (denormalized) |
| quantidade | integer | Quantidade |
| complexidade | string | Nível de complexidade |
| data_envio | date | Data de envio |
| prazo_entrega | date | Prazo de entrega |
| valor | decimal | Valor (R$) |
| observacoes | string | Observações |
| created_at | datetime | Timestamp de criação |
| updated_at | datetime | Timestamp de atualização |

---

## Campos Mapeados - Costureiras

### Input (Frontend → Backend)

| Campo | Tipo | Obrigatório | Validação |
|-------|------|-------------|-----------|
| nome | string | Sim | 1-255 chars |
| especialidade | string | Sim | 1-255 chars |
| ativa | boolean | Não | true\|false |
| capacidadeBaseSemanal | integer | Não | ≥ 0 |

### Output (Backend → Frontend)

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | integer | ID único |
| nome | string | Nome da costureira |
| especialidade | string | Especialidade (ex: Vestidos, Camisas) |
| ativa | boolean | Status ativo/inativo |
| capacidadeBaseSemanal | integer | Capacidade de horas por semana |
| created_at | datetime | Timestamp de criação |
| updated_at | datetime | Timestamp de atualização |

---

## Fluxo de Edição - Sequência Esperada

```
1. User clica em Edit Icon na listagem
   ↓
2. Frontend navega para /servicos/:id/edit (ou /costureiras/:id/edit)
   ↓
3. useEffect monta → chama GET /api/servicos/:id/
   ↓
4. Backend retorna dados completos
   ↓
5. Frontend renderiza Form com initialData preenchida
   ↓
6. User altera campos
   ↓
7. User clica "Salvar alterações"
   ↓
8. Frontend valida client-side
   ↓
9. PUT /api/servicos/:id/ (ou /api/costureiras/:id/)
   ↓
10. Backend valida + salva
   ↓
11. Response 200 OK com dados atualizados
   ↓
12. Frontend mostra sucesso via Alert
   ↓
13. Navigate back to listagem (/servicos ou /costureiras)
   ↓
14. Listagem recarrega via location.key refetch
```

---

## Possíveis Melhorias Futuras

1. **PATCH em vez de PUT**: Apenas enviar campos alterados (bandwidth menor)
2. **Validação assíncrona**: Validar campos no backend durante digitação (debounce)
3. **Otimismo Update**: Atualizar UI imediatamente, sincronizar com backend em background
4. **Conflict Resolution**: Detectar edições simultâneas (last-write-wins vs merge)
5. **Auditoria**: Adicionar `changed_by` e `change_reason` nos updates

---

## Próximas Ações

1. ✅ Mapear contratos de API
2. Testar cenários de erro (404, 400, 500)
3. Implementar retry para falhas transitórias
4. Adicionar logging estruturado para diagnóstico

---

## Referências

- EditService: `frontend/src/pages/EditService/index.jsx`
- EditSeamstress: `frontend/src/pages/Seamstresses/EditSeamstress.jsx`
- ServiceForm: `frontend/src/components/molecules/ServiceForm/index.jsx`
- CostureiraForm: `frontend/src/components/molecules/CostureiraForm/index.jsx`
- Services: `backend/users/serializers.py` + `backend/users/views.py`
