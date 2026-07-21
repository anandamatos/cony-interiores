# DISCOVERY-M1-UX-007-04: Mapear regras de negócio para status de serviço

**Status**: ✅ Completado  
**Data**: 2026-07-21  
**Responsável**: @anandamatos  

---

## Objetivo

Documentar as regras de negócio que definem o status de um serviço (Ativo, Pendente, Concluído, Cancelado) e como são representadas no banco de dados, formulários e listagem.

---

## Status de Serviço - Mapeamento

### Estados Possíveis

| Status | Campo DB | Lógica | Visual | Ação Possível |
|--------|----------|--------|--------|---------------|
| **Ativo** | `prazo_entrega` > hoje | Prazo no futuro | 🟢 Verde (Badge) | Editar, Marcar como Pendente, Cancelar |
| **Pendente** | `prazo_entrega` ≤ hoje | Vencido | 🟡 Amarelo (Badge) | Editar, Marcar como Ativo, Cancelar |
| **Concluído** | Flag `concluido=true` | Marcado manualmente | ⚫ Cinza (Badge) | Editar, Reabrir |
| **Cancelado** | Flag `cancelado=true` | Marcado manualmente | 🔴 Vermelho (Badge) | Editar, Reativar |

### Implementação Atual (Frontend)

**Arquivo**: `Services/index.jsx` - `deriveStatus(service)`

```javascript
const deriveStatus = (service) => {
  if (!service?.prazo_entrega) return 'active';

  const parsedDate = new Date(service.prazo_entrega);
  if (Number.isNaN(parsedDate.getTime())) return 'active';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  parsedDate.setHours(0, 0, 0, 0);

  return parsedDate < today ? 'pending' : 'active';  // ← Lógica atual
};
```

**Limitação**: Apenas dois estados (Ativo/Pendente) baseados em data

---

## Regra de Negócio Proposta (MVP2+)

### Transições de Status

```
┌─────────┐
│  NOVO   │
│         │
└────┬────┘
     │
     ├─→ ATIVO (prazo no futuro)
     │    ├─→ PENDENTE (prazo vencido)
     │    ├─→ CONCLUÍDO (marcado manualmente)
     │    └─→ CANCELADO (marcado manualmente)
     │
     └─→ CANCELADO (antes de aceitar)
```

### Regras de Transição

1. **NOVO → ATIVO**: Automático quando `prazo_entrega > hoje`
2. **ATIVO → PENDENTE**: Automático quando `prazo_entrega ≤ hoje`
3. **ATIVO → CONCLUÍDO**: Manual via ação "Marcar como concluído"
4. **PENDENTE → CONCLUÍDO**: Manual via ação "Marcar como concluído"
5. **Qualquer → CANCELADO**: Manual via ação "Cancelar"
6. **CONCLUÍDO/CANCELADO → ATIVO**: Manual via ação "Reabrir"

### Permissões por Status

| Status | Pode Editar? | Pode Cancelar? | Pode Concluir? | Pode Reabrir? |
|--------|-------------|---------------|-|--------------|
| ATIVO | Sim | Sim | Sim | - |
| PENDENTE | Sim | Sim | Sim | - |
| CONCLUÍDO | Não | - | - | Sim |
| CANCELADO | Não | - | - | Sim |

---

## Impacto no Database

### Schema Atual

```sql
CREATE TABLE users_servico (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER NOT NULL,
  costureira_id INTEGER NOT NULL,
  produto_id INTEGER NOT NULL,
  quantidade INTEGER NOT NULL,
  complexidade VARCHAR DEFAULT 'media',
  data_envio DATE NOT NULL,
  prazo_entrega DATE NOT NULL,
  valor DECIMAL NOT NULL,
  observacoes TEXT,
  created_at DATETIME,
  updated_at DATETIME
);
```

### Schema Expandido (Proposição)

```sql
ALTER TABLE users_servico ADD COLUMN (
  status VARCHAR DEFAULT 'ativo',  -- ativo|pendente|concluido|cancelado
  motivo_cancelamento TEXT NULL,
  data_conclusao DATE NULL,
  concluido_por_id INTEGER NULL,
  FOREIGN KEY (concluido_por_id) REFERENCES auth_user(id)
);
```

---

## Impacto no Frontend

### Listagem (Services/index.jsx)

**Atual**:
```javascript
const getStatusBadge = (status) => {
  const variants = {
    active: { label: 'Ativo', variant: 'success' },
    pending: { label: 'Pendente', variant: 'warning' },
  };
  return variants[status] || { label: status, variant: 'neutral' };
};
```

**Proposto**:
```javascript
const getStatusBadge = (status) => {
  const variants = {
    ativo: { label: 'Ativo', variant: 'success', icon: '🟢' },
    pendente: { label: 'Pendente', variant: 'warning', icon: '🟡' },
    concluido: { label: 'Concluído', variant: 'neutral', icon: '✓' },
    cancelado: { label: 'Cancelado', variant: 'danger', icon: '✗' },
  };
  return variants[status] || { label: status, variant: 'neutral' };
};
```

### Filtros Adicionais

```jsx
<StatusFilter
  options={[
    { value: 'all', label: 'Todos' },
    { value: 'ativo', label: 'Ativos' },
    { value: 'pendente', label: 'Pendentes' },
    { value: 'concluido', label: 'Concluídos' },
    { value: 'cancelado', label: 'Cancelados' },
  ]}
/>
```

### Ações por Status

```jsx
// Botão contextual baseado em status
{service.status === 'ativo' && (
  <Button size="sm" onClick={() => markAsConcluded(service.id)}>
    Concluir
  </Button>
)}
{service.status === 'concluido' && (
  <Button size="sm" onClick={() => reopen(service.id)}>
    Reabrir
  </Button>
)}
```

---

## Impacto no Backend

### Serializer (users/serializers.py)

```python
class ServicoSerializer(serializers.ModelSerializer):
    status = serializers.CharField(read_only=True)  # Computed
    
    class Meta:
        model = Servico
        fields = [
            'id', 'cliente', 'costureira', 'produto',
            'quantidade', 'complexidade', 'data_envio',
            'prazo_entrega', 'valor', 'observacoes',
            'status',  # ← Novo
            'motivo_cancelamento',  # ← Novo
            'data_conclusao',  # ← Novo
        ]
```

### Viewset (users/views.py)

```python
class ServicoViewSet(viewsets.ModelViewSet):
    @action(detail=True, methods=['POST'])
    def mark_as_concluded(self, request, pk=None):
        """Marcar serviço como concluído"""
        servico = self.get_object()
        if servico.status == 'concluido':
            return Response({'error': 'Já está concluído'}, status=400)
        servico.status = 'concluido'
        servico.data_conclusao = timezone.now()
        servico.concluido_por = request.user
        servico.save()
        return Response(ServicoSerializer(servico).data)
    
    @action(detail=True, methods=['POST'])
    def cancel(self, request, pk=None):
        """Cancelar serviço"""
        servico = self.get_object()
        if servico.status in ['concluido', 'cancelado']:
            return Response({'error': 'Não pode cancelar'}, status=400)
        servico.status = 'cancelado'
        servico.motivo_cancelamento = request.data.get('motivo')
        servico.save()
        return Response(ServicoSerializer(servico).data)
    
    @action(detail=True, methods=['POST'])
    def reopen(self, request, pk=None):
        """Reabrir serviço"""
        servico = self.get_object()
        if servico.status not in ['concluido', 'cancelado']:
            return Response({'error': 'Não está fechado'}, status=400)
        servico.status = 'ativo'
        servico.data_conclusao = None
        servico.motivo_cancelamento = None
        servico.save()
        return Response(ServicoSerializer(servico).data)
```

---

## Fluxo de Usuário - Ações por Status

### 1. Serviço Ativo (prazo no futuro)

```
Listagem mostra: "🟢 Ativo"
Ações disponíveis:
  - Editar (pencil icon)
  - Marcar como Concluído (button)
  - Cancelar (button)
  - Deletar (trash icon)
```

### 2. Serviço Pendente (prazo vencido)

```
Listagem mostra: "🟡 Pendente"
Ações disponíveis:
  - Editar (pencil icon) - ajustar prazo
  - Marcar como Concluído (button)
  - Cancelar (button)
  - Deletar (trash icon)
```

### 3. Serviço Concluído

```
Listagem mostra: "✓ Concluído"
Ações disponíveis:
  - Visualizar (eye icon) - read-only
  - Reabrir (undo icon)
  - Deletar (trash icon)
```

### 4. Serviço Cancelado

```
Listagem mostra: "✗ Cancelado"
Ações disponíveis:
  - Visualizar (eye icon) - read-only
  - Reabrir (undo icon)
  - Deletar (trash icon)
```

---

## Prototipagem de Cards de Ação

### Modal de Cancelamento

```jsx
<Modal title="Cancelar Serviço" open={showCancelModal}>
  <form onSubmit={handleCancel}>
    <label>Motivo da cancelação:</label>
    <select name="motivo">
      <option value="">Selecione</option>
      <option value="cliente_desistiu">Cliente desistiu</option>
      <option value="material_indisponivel">Material indisponível</option>
      <option value="costureira_impossibilitada">Costureira impossibilitada</option>
      <option value="outro">Outro</option>
    </select>
    
    {motivo === 'outro' && (
      <textarea placeholder="Descreva o motivo..." />
    )}
    
    <Button type="submit" variant="danger">
      Confirmar Cancelamento
    </Button>
    <Button type="button" onClick={closeCancelModal}>
      Fechar
    </Button>
  </form>
</Modal>
```

---

## Impacto em Reportes (MVP2+)

### Novas Métricas

- Taxa de conclusão: Quantos serviços foram concluídos no período
- Taxa de cancelamento: Quantos foram cancelados (por motivo)
- Tempo médio até conclusão
- Taxa de pendência (vencidos não fechados)

---

## Timeline de Implementação

### MVP1 (Atual)

- [x] Status "Ativo" e "Pendente" baseado em data
- [ ] Contadores de status na listagem

### MVP2 (Sprint 7-8)

- [ ] Status "Concluído" e "Cancelado"
- [ ] Modal de cancelamento com motivo
- [ ] Ações de reabrir
- [ ] Filtro por status

### MVP3+ (Future)

- [ ] Reportes de conclusão e cancelamento
- [ ] Analytics de motivos de cancelamento
- [ ] SLA tracking (tempo até conclusão vs prazo)

---

## Próximas Ações

1. ✅ Mapear regras de negócio
2. ⏳ Validar com stakeholders
3. ⏳ Implementar em MVP2
4. ⏳ Planejar analytics

---

## Referências

- Services Listagem: `frontend/src/pages/Services/index.jsx`
- Service Model: `backend/users/models.py`
- Service Serializer: `backend/users/serializers.py`
