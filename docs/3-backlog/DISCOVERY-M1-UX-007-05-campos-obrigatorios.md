# DISCOVERY-M1-UX-007-05: Mapear campos obrigatórios para edição por perfil

**Status**: ✅ Completado  
**Data**: 2026-07-21  
**Responsável**: @anandamatos  

---

## Objetivo

Documentar quais campos são obrigatórios em cada contexto de edição (criar vs editar) e definir possíveis regras de acesso futuro por perfil de usuário (admin, gerente, costureira).

---

## Campos de Serviço - Matriz de Obrigatoriedade

### Contextos Atuais (MVP1)

| Campo | Novo | Editar | Por Quê |
|-------|------|--------|---------|
| cliente | ✅ Obrigatório | ✅ Obrigatório | Sempre necessário identificar cliente |
| costureira | ✅ Obrigatório | ✅ Obrigatório | Sempre necessário atribuir |
| produto | ✅ Obrigatório | ✅ Obrigatório | Especifica o trabalho |
| quantidade | ✅ Obrigatório | ✅ Obrigatório | Define volume |
| complexidade | ⚠️ Opcional* | ⚠️ Opcional* | Default: "media" |
| data_envio | ✅ Obrigatório | ✅ Obrigatório | Marca início |
| prazo_entrega | ✅ Obrigatório | ✅ Obrigatório | Marca deadline |
| valor | ✅ Obrigatório | ✅ Obrigatório | Essencial para orçamento |
| observacoes | ⚠️ Opcional | ⚠️ Opcional | Notas adicionais |

*Opcional: Tem default, mas pode ser alterado pelo usuário

### Validação Client-Side

**Arquivo**: `frontend/src/components/molecules/ServiceForm/index.jsx`

```javascript
const validateField = (name, value) => {
  switch (name) {
    case 'cliente':
      if (!value) return 'Selecione um cliente';  // ← Obrigatório
      break;
    case 'costureira':
      if (!value) return 'Selecione uma costureira';  // ← Obrigatório
      break;
    case 'produto':
      if (!value) return 'Selecione um produto';  // ← Obrigatório
      break;
    case 'valor':
      if (!value || Number(value) <= 0) return 'Valor deve ser maior que zero';  // ← Obrigatório + Validação
      break;
    case 'dataEnvio':
      if (!value) return 'Data de envio é obrigatória';  // ← Obrigatório
      break;
    case 'prazoEntrega':
      if (!value) return 'Prazo de entrega é obrigatório';  // ← Obrigatório
      if (value && formData.dataEnvio && new Date(value) < new Date(formData.dataEnvio)) {
        return 'Prazo deve ser após data de envio';  // ← Validação lógica
      }
      break;
    case 'quantidade':
      if (!value || Number(value) < 1) return 'Quantidade deve ser pelo menos 1';  // ← Obrigatório + Validação
      break;
  }
};
```

### Validação Server-Side

**Arquivo**: `backend/users/serializers.py`

```python
class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = ['cliente', 'costureira', 'produto', 'quantidade', ...]
        extra_kwargs = {
            'cliente': {'required': True},
            'costureira': {'required': True},
            'produto': {'required': True},
            'quantidade': {'required': True, 'min_value': 1},
            'complexidade': {'required': False, 'default': 'media'},
            'data_envio': {'required': True},
            'prazo_entrega': {'required': True},
            'valor': {'required': True, 'decimal_places': 2, 'min_value': 0.01},
            'observacoes': {'required': False, 'allow_blank': True},
        }
```

---

## Campos de Costureira - Matriz de Obrigatoriedade

### Contextos Atuais (MVP1)

| Campo | Novo | Editar | Por Quê |
|-------|------|--------|---------|
| nome | ✅ Obrigatório | ✅ Obrigatório | Identificação essencial |
| especialidade | ✅ Obrigatório | ✅ Obrigatório | Categoriza habilidade |
| ativa | ⚠️ Opcional | ⚠️ Opcional | Default: true |
| capacidadeBaseSemanal | ⚠️ Opcional | ⚠️ Opcional | Para planejamento futuro |

### Validação Client-Side

**Arquivo**: `frontend/src/components/molecules/CostureiraForm/index.jsx`

```javascript
const validateField = (name, value) => {
  switch (name) {
    case 'nome':
      if (!value || value.trim() === '') return 'Nome é obrigatório';  // ← Obrigatório
      if (value.length > 255) return 'Nome não pode ter mais de 255 caracteres';
      break;
    case 'especialidade':
      if (!value || value.trim() === '') return 'Especialidade é obrigatória';  // ← Obrigatório
      if (value.length > 255) return 'Especialidade não pode ter mais de 255 caracteres';
      break;
    case 'capacidadeBaseSemanal':
      if (value && isNaN(Number(value))) return 'Capacidade deve ser um número';
      if (value && Number(value) < 0) return 'Capacidade não pode ser negativa';
      break;
  }
};
```

---

## Extensão Futura - Por Perfil de Usuário

### Cenário: Perfis no MVP2+

```
┌─────────────────────────────────────────────────────┐
│ PERFIL | PERMISSÕES                                  │
├─────────────────────────────────────────────────────┤
│ Admin  | ✅ Criar, Editar, Deletar tudo             │
│        | ✅ Alterar responsável (costureira)         │
│        | ✅ Alterar prazo e valor                    │
│        | ✅ Ver histórico de alterações              │
│        | ✅ Cancelar/Reabrir serviço                 │
├─────────────────────────────────────────────────────┤
│ Gerente| ✅ Criar, Editar serviços atribuídos       │
│        | ✅ Alterar prazo (dentro de limites)        │
│        | ✅ Cancelar serviço (com motivo)            │
│        | ❌ Alterar cliente                          │
│        | ❌ Alterar responsável principal            │
│        | ❌ Deletar serviço                          │
├─────────────────────────────────────────────────────┤
│Costureira|✅ Ver serviços atribuídos (read-only)    │
│        | ✅ Marcar como concluído                   │
│        | ⚠️  Solicitar alteração de prazo           │
│        | ❌ Criar novo serviço                       │
│        | ❌ Alterar dados de outro serviço           │
└─────────────────────────────────────────────────────┘
```

### Campos por Perfil (Proposta)

#### Serviço - Campos Editáveis

| Campo | Admin | Gerente | Costureira |
|-------|-------|---------|-----------|
| cliente | ✅ | ❌ | ❌ |
| costureira | ✅ | ❌ | ❌ |
| produto | ✅ | ⚠️ (view) | ❌ |
| quantidade | ✅ | ⚠️ (view) | ❌ |
| complexidade | ✅ | ✅ | ❌ |
| data_envio | ✅ | ⚠️ (view) | ❌ |
| prazo_entrega | ✅ | ✅* | ⚠️ (solicitar) |
| valor | ✅ | ❌ | ❌ |
| observacoes | ✅ | ✅ | ✅ (adicionar) |

*Gerente: Pode alterar dentro de limites (ex: +7 dias max)

#### Costureira - Campos Editáveis

| Campo | Admin | Gerente | Costureira |
|-------|-------|---------|-----------|
| nome | ✅ | ✅ | ❌ |
| especialidade | ✅ | ✅ | ❌ |
| ativa | ✅ | ✅ | ❌ |
| capacidadeBaseSemanal | ✅ | ✅ | ❌ |

---

## Implementação Proposta (MVP2+)

### Backend - Mixins de Permissão

```python
from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='admin').exists()

class IsGerente(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='gerente').exists()

class IsCostureira(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name='costureira').exists()

class IsAdminOrGerente(BasePermission):
    def has_permission(self, request, view):
        return (request.user.groups.filter(name__in=['admin', 'gerente']).exists())
```

### Backend - Serializer com Campos Condicionais

```python
class ServicoSerializer(serializers.ModelSerializer):
    def get_fields(self):
        fields = super().get_fields()
        user = self.context['request'].user
        
        # Costureira não pode editar cliente, costureira, produto, quantidade
        if not user.groups.filter(name__in=['admin', 'gerente']).exists():
            for field in ['cliente', 'costureira', 'produto', 'quantidade', 'valor']:
                fields[field].read_only = True
        
        # Gerente não pode editar valor
        if not user.groups.filter(name='admin').exists():
            fields['valor'].read_only = True
        
        return fields
```

### Frontend - Disable Campos por Perfil

```jsx
// ServiceForm.jsx
const canEditCliente = isAdminOrGerente(userProfile);
const canEditCostureira = isAdminOrGerente(userProfile);
const canEditValor = isAdmin(userProfile);

<select
  name="cliente"
  disabled={!canEditCliente || isSubmitting}
/>
```

---

## Matriz de Validação Consolidada

### MVP1 (Atual)

Todos os usuários têm permissão completa. Validações apenas client + server-side.

### MVP2 (Proposto)

Validações expandem com regras por perfil:

```
┌─ Autenticação
│  └─ Usuario logado?
└─ Autorização
   └─ Qual grupo? (admin, gerente, costureira)
      └─ Pode criar? Editar? Deletar?
         └─ Quais campos?
            └─ Validação por campo
```

---

## Checklist de Campos Críticos para MVP1

- [x] Cliente - obrigatório
- [x] Costureira - obrigatório
- [x] Produto - obrigatório
- [x] Quantidade - obrigatório (≥ 1)
- [x] Data Envio - obrigatório
- [x] Prazo Entrega - obrigatório (≥ data_envio)
- [x] Valor - obrigatório (> 0.01)
- [x] Complexidade - opcional (default: media)
- [x] Observações - opcional
- [x] Nome Costureira - obrigatório
- [x] Especialidade - obrigatório

---

## Próximas Ações

1. ✅ Mapear campos críticos e validações
2. ⏳ Implementar grupos de usuários (MVP2)
3. ⏳ Adicionar permissões por grupo
4. ⏳ Testar fluxos de edição restrita

---

## Referências

- ServiceForm: `frontend/src/components/molecules/ServiceForm/index.jsx`
- CostureiraForm: `frontend/src/components/molecules/CostureiraForm/index.jsx`
- ServicoSerializer: `backend/users/serializers.py`
- Django Groups: https://docs.djangoproject.com/en/stable/topics/auth/default/#groups-and-permissions
