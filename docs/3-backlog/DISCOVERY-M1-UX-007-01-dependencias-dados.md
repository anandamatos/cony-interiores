# DISCOVERY-M1-UX-007-01: Mapear dependências de dados dos formulários

**Status**: ✅ Completado  
**Data**: 2026-07-21  
**Responsável**: @anandamatos  

---

## Objetivo

Documentar todas as dependências de dados externas (endpoints de API) necessárias para renderizar os formulários de cadastro de Serviço e Costureira, incluindo ordem de carregamento, fallbacks e tratamento de falhas.

---

## Mapeamento de Dependências

### 1. Formulário: Novo Serviço (NewService → ServiceForm)

**Componente**: `frontend/src/components/molecules/ServiceForm/index.jsx`

#### Dropdowns que dependem de API:

| Campo | Endpoint | Método | Resposta Esperada | Obrigatório | Fallback |
|-------|----------|--------|-------------------|-------------|----------|
| Cliente | `GET /api/clientes/` | GET | `[{id, nome}]` | Sim ⚠️ | [] (desabilitado) |
| Costureira | `GET /api/costureiras/` | GET | `[{id, nome}]` | Sim ⚠️ | [] (desabilitado) |
| Produto | `GET /api/produtos/` | GET | `[{id, nome}]` | Sim ⚠️ | [] (desabilitado) |

#### Carregamento:

- **Ordem**: Paralelo (Promise.all)
- **Trigger**: useEffect ao montar componente
- **Retry**: 2 tentativas com 1s delay entre elas
- **Timeout**: Sem timeout explícito (integrado com retry)

#### Estados por endpoint:

```javascript
// Clientes
[loadingClientes, errorClientes] = [boolean, string|null]

// Costureiras
[loadingCostureiras, errorCostureiras] = [boolean, string|null]

// Produtos
[loadingProdutos, errorProdutos] = [boolean, string|null]
```

#### Comportamento em falha:

- Exibir card de erro por endpoint (vermelho) com mensagem específica
- Botão "Tentar novamente" dispara `handleRetry()` que recarrega apenas endpoints com erro
- Formulário fica desabilitado até carregamento bem-sucedido
- Feedback visual com `Alert` (não bloqueante)

#### Validação de payload:

```javascript
// Validação esperada por campo
clientes: [
  { id: number, nome: string },
  { id: number, cliente_nome: string }, // fallback
]

costureiras: [
  { id: number, nome: string },
]

produtos: [
  { id: number, nome: string },
]
```

---

### 2. Formulário: Novo Serviço - Submissão (NewService → serviceService.create)

**Componente**: `frontend/src/pages/NewService/index.jsx`

#### Submissão POST:

| Campo | Endpoint | Método | Payload | Resposta Esperada |
|-------|----------|--------|---------|-------------------|
| Criar Serviço | `POST /api/servicos/` | POST | FormData (cliente, costureira, produto, quantidade, complexidade, dataEnvio, prazoEntrega, valor, observacoes) | `{id, ...}` |

#### Tratamento de erro:

- Capturado em `handleFormSubmit` → `onSubmit(formData)`
- Exibir erro via `Alert` com mensagem específica
- Retry manual (botão "Salvar" fica habilitado após erro)

---

### 3. Formulário: Editar Serviço (EditService → ServiceForm)

**Componente**: `frontend/src/pages/EditService/index.jsx`

#### Dependências:

| Dependência | Endpoint | Método | Resposta | Obrigatório |
|-------------|----------|--------|----------|-------------|
| Prefill dados | `GET /api/servicos/:id/` | GET | `{id, cliente, costureira, produto, ...}` | Sim ⚠️ |

#### Carregamento:

- **Trigger**: useEffect ao montar com `id` do URL params
- **Retry**: Automático 2x com 1s delay em caso de erro
- **Timeout**: Sem timeout explícito
- **Fallback**: Mostrar erro e redirecionar para listagem após 2s

#### Estados:

```javascript
[isLoading, initialData, loadError] = [boolean, object|null, string|null]
```

#### Submissão PUT/PATCH:

| Campo | Endpoint | Método | Payload |
|-------|----------|--------|---------|
| Salvar alterações | `PUT /api/servicos/:id/` | PUT | FormData (cliente, costureira, produto, ...) |

---

### 4. Formulário: Nova Costureira (NewSeamstress → CostureiraForm)

**Componente**: `frontend/src/components/molecules/CostureiraForm/index.jsx`

#### Dependências:

| Campo | Endpoint | Método | Resposta Esperada | Obrigatório | Fallback |
|-------|----------|--------|-------------------|-------------|----------|
| Nenhuma | - | - | - | Não ✓ | N/A |

**Observação**: CostureiraForm não tem dependências de API externas, todos os campos são preenchidos diretamente pelo usuário.

#### Submissão POST:

| Campo | Endpoint | Método | Payload |
|-------|----------|--------|---------|
| Criar Costureira | `POST /api/costureiras/` | POST | FormData (nome, especialidade, capacidadeBaseSemanal) |

---

### 5. Formulário: Editar Costureira (EditSeamstress → CostureiraForm)

**Componente**: `frontend/src/pages/Seamstresses/EditSeamstress.jsx`

#### Dependências:

| Dependência | Endpoint | Método | Resposta | Obrigatório |
|-------------|----------|--------|----------|-------------|
| Prefill dados | `GET /api/costureiras/:id/` | GET | `{id, nome, especialidade, capacidadeBaseSemanal, ...}` | Sim ⚠️ |

#### Carregamento:

- **Trigger**: useEffect ao montar com `id` do URL params
- **Retry**: Automático 2x com 1s delay
- **Fallback**: Erro → redirecionar para listagem após 2s

#### Submissão PUT/PATCH:

| Campo | Endpoint | Método | Payload |
|-------|----------|--------|---------|
| Salvar alterações | `PUT /api/costureiras/:id/` | PUT | FormData (nome, especialidade, capacidadeBaseSemanal) |

---

## Dependências Transversais (Listagens)

### Services Listagem

| Endpoint | Método | Resposta |
|----------|--------|----------|
| `GET /api/servicos/` | GET | `[{id, cliente_id, costureira_id, produto_id, quantidade, ...}]` |

### Seamstresses Listagem

| Endpoint | Método | Resposta |
|----------|--------|----------|
| `GET /api/costureiras/` | GET | `[{id, nome, especialidade, ativa, capacidadeBaseSemanal, ...}]` |

---

## Matriz de Dependências Críticas

```
Novo Serviço:
  ├─ /api/clientes/ ⚠️ (crítica - sem fallback)
  ├─ /api/costureiras/ ⚠️ (crítica)
  ├─ /api/produtos/ ⚠️ (crítica)
  └─ POST /api/servicos/ (crítica para salvar)

Editar Serviço:
  ├─ GET /api/servicos/:id/ ⚠️ (crítica - prefill)
  └─ PUT /api/servicos/:id/ (crítica para salvar)

Nova Costureira:
  └─ POST /api/costureiras/ (crítica para salvar)

Editar Costureira:
  ├─ GET /api/costureiras/:id/ ⚠️ (crítica - prefill)
  └─ PUT /api/costureiras/:id/ (crítica para salvar)
```

---

## Ordem de Carregamento Recomendada

### Inicialização (Frontend)

1. **Paralelo** ao montar:
   - `ServiceForm`: Carregar clientes + costureiras + produtos
   - `EditService`: Carregar dados do serviço específico
   - `EditSeamstress`: Carregar dados da costureira específica

2. **Sequencial** após sucesso:
   - Renderizar formulário com dados preenchidos
   - Liberar inputs para edição
   - Habilitar botão submit

### Submissão (Frontend → Backend)

1. Validação client-side (sem chamada de API)
2. POST/PUT com dados do formulário
3. Sucesso → navegação + mensagem de sucesso
4. Erro → mostrar mensagem de erro + manter formulário

---

## Observações

- ⚠️ Campos críticos sem fallback: Se qualquer endpoint falha, formulário fica desabilitado com opção de retry
- 🔄 Retry automático: 2 tentativas com 1s de delay entre elas (implementado em ServiceForm via `fetchWithRetry`)
- 📊 Carregamento paralelo: Promise.all acelera exibição do formulário
- ✅ Tratamento de erro por endpoint: Erro em um endpoint não bloqueia os outros

---

## Próximas Ações

1. ✅ Implementar o padrão de `fetchWithRetry` em `CostureiraForm` (similar a ServiceForm)
2. Validar contratos de API no backend (DISCOVERY-M1-UX-007-06)
3. Documentar falhas mais comuns (DISCOVERY-M1-UX-007-02)
