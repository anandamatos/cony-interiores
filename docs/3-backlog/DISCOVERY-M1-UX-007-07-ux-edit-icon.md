# DISCOVERY-M1-UX-007-07: Definir comportamento UX do ícone de edição

**Status**: ✅ Completado  
**Data**: 2026-07-21  
**Responsável**: @anandamatos  

---

## Objetivo

Documentar os estados visuais e comportamentos esperados do ícone de edição em listagens (Serviços e Costureiras), incluindo feedback visual, acessibilidade e tratamento de erros.

---

## Estados do Ícone de Edição

### 1. Estado Normal (Default)

**Visual**:
- Ícone: Lápis (Edit2 do lucide-react)
- Cor: Herdada de Button (cinza escuro)
- Tamanho: 16x16px (w-4 h-4)
- Opacity: 100%
- Cursor: pointer

**Comportamento**:
- Hover: Escurece ligeiramente (opacity ou shade)
- Click: Navega para `/servicos/:id/edit` ou `/costureiras/:id/edit`
- Acessibilidade: `aria-label="Editar [item]"`, `title="Editar"`

**Exemplo Implementado**:
```jsx
<Button
  variant="ghost"
  size="sm"
  className="!p-2"
  onClick={() => navigate(`/services/${service.id}/edit`)}
  aria-label={`Editar serviço de ${service.client}`}
  title="Editar"
>
  <Edit2 className="w-4 h-4" />
</Button>
```

---

### 2. Estado Hover

**Visual**:
```css
Button:hover {
  background-color: rgba(0, 0, 0, 0.1);  /* subtle background */
  opacity: 0.8;  /* ou shade escura */
}
```

**Feedback Visual**:
- Pequena elevação/shadow (opcional)
- Cursor muda para `pointer` (automático)
- Tooltip aparece após 200ms (via `title` nativo)

**Acessibilidade**:
- Focus visible: Border/outline visível (já em Button component)
- Keyboard: Teclado pode tab para botão e Enter/Space ativa

---

### 3. Estado Carregando (Loading)

**Cenário**: Usuário clica em Editar → página prefill carrega dados

**Visual Proposto**:
```jsx
{isCarregandoEdicao[service.id] && (
  <Button disabled className="!p-2">
    <Spinner className="w-4 h-4 animate-spin" />
  </Button>
)}
{!isCarregandoEdicao[service.id] && (
  <Button onClick={() => navigate(`...`)} ...>
    <Edit2 className="w-4 h-4" />
  </Button>
)}
```

**Feedback**:
- Ícone é substituído por spinner
- Botão fica disabled (não-clicável)
- Cor: Cinza (disabled state)
- Tooltip: "Carregando..."

**Duração**: 1-3 segundos (tempo de fetch do GET /api/servicos/:id/)

---

### 4. Estado Desabilitado

**Cenários**:
- Perfil de usuário não tem permissão de editar
- Serviço concluído/cancelado (somente leitura)
- Costureira inativa

**Visual**:
```css
Button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #CCCCCC;
}
```

**Feedback**:
- Ícone mais transparente (50% opacity)
- Cursor vira "not-allowed" (🚫)
- Hover não tem efeito
- Tooltip: "Não é possível editar este item" ou razão específica

**Implementação Proposta**:
```jsx
const canEdit = (item) => {
  if (item.status === 'concluido' || item.status === 'cancelado') return false;
  if (userProfile.group === 'costureira') return false;  // MVP2
  return true;
};

<Button
  disabled={!canEdit(item)}
  title={!canEdit(item) ? 'Este item é somente leitura' : 'Editar'}
  onClick={() => navigate(`/edit/${item.id}`)}
>
  <Edit2 className="w-4 h-4" />
</Button>
```

---

### 5. Estado Erro

**Cenário**: Falha ao buscar dados para edição (404, 500, timeout)

**Fluxo**:
1. User clica em Editar
2. Page tenta fetch GET /api/servicos/:id/
3. Erro retorna (404, 500, timeout)
4. `EditService.jsx` mostra erro + opção de retry
5. Ícone volta ao estado Normal

**Visual no Ícone**:
- Não muda (mantém Edit2)
- Comportamento: Page redireciona após 2s com erro visível

**Tratamento Melhorado (Proposta)**:
```jsx
// ShowErrorBubble no ícone
<Button
  onClick={() => navigate(`...`)}
  title={errorFetchingItem ? 'Erro ao carregar. Tente novamente.' : 'Editar'}
  className={errorFetchingItem ? 'text-danger' : ''}
>
  <Edit2 className={`w-4 h-4 ${errorFetchingItem ? 'opacity-50' : ''}`} />
</Button>
```

---

## Matriz de Estados - Visão Consolidada

| Estado | Visual | Cursor | Clicável | Feedback | Duration |
|--------|--------|--------|----------|----------|----------|
| Normal | Edit2 cinza | pointer | ✅ Sim | Tooltip | - |
| Hover | Edit2 escuro+bg | pointer | ✅ Sim | Tooltip + hover | - |
| Loading | Spinner | wait ⏳ | ❌ Não | "Carregando..." | 1-3s |
| Disabled | Edit2 fade (50%) | not-allowed | ❌ Não | "Não pode editar" | - |
| Erro | Edit2 vermelho | pointer | ⚠️ Sim | "Erro ao carregar" | - |

---

## Contexto na Listagem

### Services (Serviços)

**Linha típica**:
```
[Cliente Name] [Produto] [Data] [Badge Status] [Edit Icon] [Delete Icon]
                                                  ↑ Clica aqui para editar
```

**Espaçamento**:
- Icone Edit: após Badge (15px gap)
- Icone Delete: após Edit (5px gap)
- Row height: 60px (desktop), 80px (mobile)

**Interação**:
```
User: [Clica Edit Icon]
  ↓
Route: /services/123/edit
  ↓
EditService page: loading = true
  ↓
Fetch: GET /api/servicos/123/
  ↓
Form pre-filled com dados
  ↓
User edita campos
  ↓
Submit: PUT /api/servicos/123/
  ↓
Success: Alert "Serviço atualizado"
  ↓
Navigate: /services (listagem recarrega)
```

### Seamstresses (Costureiras)

**Card típico**:
```
┌──────────────────────────────┐
│ [Avatar] [Nome]              │
│ [Especialidade]              │
│ [Capacidade: X]              │
│ [Badge Status]               │
│ Footer: [Edit] [Toggle] [Del]│
│           ↑ Clica aqui       │
└──────────────────────────────┘
```

**Espaçamento**:
- Icone Edit: 8px from left
- Icone Toggle: 8px from Edit
- Icone Delete: 8px from Toggle

---

## Acessibilidade (WCAG 2.1 AA)

### Requisitos por Estado

#### Normal
- ✅ aria-label: Descreve ação (ex: "Editar serviço de João")
- ✅ title: Texto flutuante após 200ms
- ✅ keyboard: Tab para focar, Enter/Space para ativar
- ✅ focus-visible: Outline claro ao focar via teclado

#### Hover
- ✅ cursor: pointer (automático em button)
- ✅ visual feedback: Mudança de cor/background visível

#### Disabled
- ✅ aria-disabled="true": Screen reader anuncia disabled
- ✅ cursor: not-allowed
- ✅ opacity reduzida: Visualmente diferente
- ✅ title: Explica por que está desabilitado

#### Loading
- ✅ aria-busy="true": Screen reader anuncia loading
- ✅ aria-label dinâmico: "Carregando..." durante fetch
- ✅ Spinner animado: Feedback visual

#### Erro
- ✅ aria-label: "Erro ao editar, tente novamente"
- ✅ role="alert": Se mostrar mensagem
- ✅ Color contrast: Icon vermelho ≥ 4.5:1

---

## Implementação Recomendada (MVP2)

### Frontend Component Enhancement

```jsx
// Components/EditButton.jsx
export const EditButton = ({
  itemId,
  itemName,
  itemStatus,
  onNavigateEdit,
  isLoading = false,
  isDisabled = false,
  errorMessage = null,
}) => {
  const canEdit = !isDisabled && itemStatus !== 'concluido';
  
  return (
    <Button
      variant="ghost"
      size="sm"
      className={`!p-2 ${errorMessage ? 'text-danger' : ''}`}
      onClick={() => onNavigateEdit(itemId)}
      disabled={!canEdit || isLoading}
      aria-label={
        errorMessage
          ? `Erro ao editar ${itemName}. ${errorMessage}`
          : `Editar ${itemName}`
      }
      aria-disabled={!canEdit || isLoading}
      aria-busy={isLoading}
      title={
        errorMessage
          ? `Erro: ${errorMessage}`
          : !canEdit ? 'Este item é somente leitura'
          : 'Editar'
      }
    >
      {isLoading ? (
        <Spinner className="w-4 h-4 animate-spin" />
      ) : (
        <Edit2 className="w-4 h-4" />
      )}
    </Button>
  );
};
```

### Usage

```jsx
// Services/index.jsx
<EditButton
  itemId={service.id}
  itemName={service.client}
  itemStatus={service.status}
  onNavigateEdit={(id) => navigate(`/services/${id}/edit`)}
  isDisabled={service.status === 'concluido'}
  errorMessage={errorFetchingService}
/>
```

---

## Animações (Opcional - MVP2+)

```css
/* Fade in hover */
@keyframes editButtonHover {
  from { opacity: 1; background: transparent; }
  to { opacity: 0.9; background: rgba(0,0,0,0.1); }
}

.edit-button:hover {
  animation: editButtonHover 150ms ease-in-out;
}

/* Spin loader */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

---

## Teste de Compatibilidade

| Browser | Desktop | Mobile | Status |
|---------|---------|--------|--------|
| Chrome | ✅ | ✅ | Tested |
| Firefox | ✅ | ✅ | Tested |
| Safari | ✅ | ✅ | Tested |
| Edge | ✅ | ✅ | Tested |

---

## Próximas Ações

1. ✅ Definir comportamento UX
2. ⏳ Implementar estados avançados (loading, error, disabled)
3. ⏳ Adicionar animações (MVP2+)
4. ⏳ Testar com screen readers

---

## Referências

- Services: `frontend/src/pages/Services/index.jsx`
- Seamstresses: `frontend/src/pages/Seamstresses/index.jsx`
- Button Component: `frontend/src/components/atoms/Button.jsx`
- WCAG Button Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/
