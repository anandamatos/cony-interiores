# Plano Técnico: Telemetria UX (Event Tracking)

**Status**: Planejamento  
**Prioridade**: Alta (compreender uso, otimizar UX)  
**Esforço Estimado**: 1-2 sprints  
**Data**: 2026-07-21

---

## 1. Objetivo

Coletar dados de como usuários interagem com a aplicação para:
- Identificar drops em formulários
- Medir tempo de conclusão de tarefas
- Detectar features não usadas
- Validar impacto de mudanças UX
- Otimizar fluxos críticos

---

## 2. Arquitetura de Telemetria

```
┌─────────────────────────┐
│ Eventos UX              │
│ - Page views            │
│ - Form submissions      │
│ - Button clicks         │
│ - Errors                │
└────────────┬────────────┘
             │
      ┌──────▼──────┐
      │ Event Queue │
      │ (Local)     │
      └──────┬──────┘
             │
    ┌────────▼────────┐
    │ Analytics API   │
    │ (Batch + Real   │
    │  time)          │
    └────────┬────────┘
             │
    ┌────────▼────────────────┐
    │ Posthog / Segment       │
    │ (ou custom backend)     │
    └────────┬─────────────────┘
             │
    ┌────────▼────────┐
    │ Dashboard       │
    │ - Funnels       │
    │ - Heatmaps      │
    │ - Cohorts       │
    └─────────────────┘
```

---

## 3. Eventos Principais

### Navegação
```javascript
// Evento: Page View
{
  event: 'page_view',
  page_name: 'Seamstresses',
  url: '/seamstresses',
  referrer: '/dashboard',
  timestamp: '2026-07-21T10:30:00Z',
  session_id: 'sess_abc123',
  user_id: 'user_123',
}

// Evento: Page Exit (quando user sai da página)
{
  event: 'page_exit',
  page_name: 'NewSeamstress',
  time_on_page_ms: 45000, // 45 segundos
  action: 'navigate_back', // back | navigation | refresh | close
  timestamp: '2026-07-21T10:35:00Z',
}
```

### Formulários
```javascript
// Evento: Form View
{
  event: 'form_view',
  form_name: 'NewSeamstress',
  timestamp: '2026-07-21T10:30:15Z',
}

// Evento: Form Field Focus
{
  event: 'form_field_focus',
  form_name: 'NewSeamstress',
  field_name: 'nome',
  timestamp: '2026-07-21T10:30:20Z',
}

// Evento: Form Field Change
{
  event: 'form_field_change',
  form_name: 'NewSeamstress',
  field_name: 'especialidade',
  value_type: 'string', // input type, não valor
  timestamp: '2026-07-21T10:30:22Z',
}

// Evento: Form Error
{
  event: 'form_error',
  form_name: 'NewSeamstress',
  field_name: 'nome',
  error_message: 'Nome é obrigatório',
  timestamp: '2026-07-21T10:30:25Z',
}

// Evento: Form Submission (antes de validação server)
{
  event: 'form_submit_start',
  form_name: 'NewSeamstress',
  fields_completed: 3, // de 4 campos
  timestamp: '2026-07-21T10:30:30Z',
}

// Evento: Form Submission Success
{
  event: 'form_submit_success',
  form_name: 'NewSeamstress',
  form_duration_ms: 240000, // tempo total preenchimento + envio
  api_response_ms: 1200, // tempo resposta servidor
  timestamp: '2026-07-21T10:35:00Z',
}

// Evento: Form Submission Error
{
  event: 'form_submit_error',
  form_name: 'NewSeamstress',
  error_type: 'network', // network | validation | server | timeout
  error_message: 'Erro ao conectar com servidor',
  timestamp: '2026-07-21T10:35:05Z',
}
```

### Listagens
```javascript
// Evento: List View
{
  event: 'list_view',
  list_name: 'Seamstresses',
  filter_applied: { status: 'active' }, // filtros
  search_query: 'Maria', // se houver busca
  items_count: 12,
  timestamp: '2026-07-21T10:30:00Z',
}

// Evento: List Item Click
{
  event: 'list_item_click',
  list_name: 'Seamstresses',
  action: 'edit', // edit | view | delete | toggle_status
  item_id: 'seamstress_456',
  timestamp: '2026-07-21T10:30:10Z',
}

// Evento: List Filter Change
{
  event: 'list_filter_change',
  list_name: 'Seamstresses',
  filter_name: 'status',
  filter_value: 'inactive',
  items_count: 3, // quantos itens resultaram
  timestamp: '2026-07-21T10:30:15Z',
}

// Evento: List Search
{
  event: 'list_search',
  list_name: 'Seamstresses',
  search_query: 'Maria',
  results_count: 2,
  timestamp: '2026-07-21T10:30:20Z',
}
```

### Erros e Performance
```javascript
// Evento: API Error
{
  event: 'api_error',
  endpoint: 'POST /api/costureiras/',
  status_code: 500,
  error_type: 'server_error',
  duration_ms: 3000, // timeout
  timestamp: '2026-07-21T10:30:00Z',
}

// Evento: Slow API
{
  event: 'api_slow',
  endpoint: 'GET /api/servicos/',
  duration_ms: 2500, // acima do threshold (>1s)
  timestamp: '2026-07-21T10:30:00Z',
}

// Evento: Component Error
{
  event: 'component_error',
  component_name: 'ServiceForm',
  error_message: 'Cannot read property "map" of undefined',
  error_stack: '...',
  timestamp: '2026-07-21T10:30:00Z',
}

// Evento: Page Performance
{
  event: 'page_performance',
  page_name: 'Seamstresses',
  time_to_first_paint_ms: 500,
  time_to_interactive_ms: 1200,
  first_contentful_paint_ms: 600,
  timestamp: '2026-07-21T10:30:00Z',
}
```

---

## 4. Implementação Frontend

### Service de Telemetria
```javascript
// src/services/telemetry.js
class TelemetryService {
  constructor() {
    this.queue = [];
    this.batchSize = 10;
    this.flushInterval = 30000; // 30s
    this.sessionId = this.generateSessionId();
    this.userId = localStorage.getItem('user_id');
    
    // Auto-flush a cada X ms
    setInterval(() => this.flush(), this.flushInterval);
    
    // Flush ao descarregar página
    window.addEventListener('beforeunload', () => this.flush());
  }
  
  track(event, properties = {}) {
    const payload = {
      event,
      properties: {
        ...properties,
        session_id: this.sessionId,
        user_id: this.userId,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        user_agent: navigator.userAgent,
      },
    };
    
    this.queue.push(payload);
    
    // Flush se atingiu tamanho
    if (this.queue.length >= this.batchSize) {
      this.flush();
    }
  }
  
  async flush() {
    if (this.queue.length === 0) return;
    
    const events = [...this.queue];
    this.queue = [];
    
    try {
      await fetch('/api/telemetry/events/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events }),
      });
    } catch (error) {
      // Falha não deve quebrar app, requeue
      this.queue.unshift(...events);
      console.error('Telemetry flush failed', error);
    }
  }
  
  generateSessionId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

export const telemetry = new TelemetryService();
```

### Integração em Componentes
```javascript
// src/hooks/useTelemetry.js
export const useTelemetry = (pageName) => {
  const { telemetry } = useContext(TelemetryContext);
  
  useEffect(() => {
    telemetry.track('page_view', {
      page_name: pageName,
    });
    
    return () => {
      const startTime = performance.now();
      return () => {
        telemetry.track('page_exit', {
          page_name: pageName,
          time_on_page_ms: Math.round(performance.now() - startTime),
        });
      };
    };
  }, [pageName]);
};

// Uso
const Seamstresses = () => {
  useTelemetry('Seamstresses');
  // ...
};
```

### Tracking de Formulários
```javascript
// src/components/molecules/CostureiraForm/index.jsx
export const CostureiraForm = ({ initialData, onSubmit }) => {
  const { telemetry } = useContext(TelemetryContext);
  const formStartTime = useRef(Date.now());
  
  useEffect(() => {
    telemetry.track('form_view', {
      form_name: 'CostureiraForm',
    });
  }, []);
  
  const handleFieldChange = (field, value) => {
    telemetry.track('form_field_change', {
      form_name: 'CostureiraForm',
      field_name: field,
      value_type: typeof value,
    });
    // ... atualizar form
  };
  
  const handleFieldError = (field, error) => {
    telemetry.track('form_error', {
      form_name: 'CostureiraForm',
      field_name: field,
      error_message: error,
    });
  };
  
  const handleSubmit = async (data) => {
    telemetry.track('form_submit_start', {
      form_name: 'CostureiraForm',
      fields_completed: Object.keys(data).length,
    });
    
    const submitStartTime = Date.now();
    
    try {
      const apiStartTime = Date.now();
      const result = await onSubmit(data);
      const apiDuration = Date.now() - apiStartTime;
      
      telemetry.track('form_submit_success', {
        form_name: 'CostureiraForm',
        form_duration_ms: Date.now() - formStartTime.current,
        api_response_ms: apiDuration,
      });
      
      return result;
    } catch (error) {
      telemetry.track('form_submit_error', {
        form_name: 'CostureiraForm',
        error_type: error.type || 'unknown',
        error_message: error.message,
      });
      throw error;
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

---

## 5. Backend: Coletar e Processar Eventos

```python
# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
import logging

logger = logging.getLogger(__name__)

class TelemetryEventView(APIView):
    def post(self, request):
        events = request.data.get('events', [])
        
        for event in events:
            # Estruturar log
            logger.info(
                f"UX_EVENT:{event['event']}",
                extra={
                    'event': event['event'],
                    'properties': event['properties'],
                    'user_id': event['properties'].get('user_id'),
                    'session_id': event['properties'].get('session_id'),
                }
            )
            
            # Opcionalmente, armazenar em DB para análise posterior
            # EventLog.objects.create(
            #     event=event['event'],
            #     properties=event['properties'],
            #     user=request.user,
            # )
        
        return Response({'status': 'ok'}, status=201)

# urls.py
urlpatterns = [
    path('api/telemetry/events/', TelemetryEventView.as_view()),
]
```

---

## 6. Dashboard e Análise

### Posthog Setup (Recomendado)
```javascript
// src/main.jsx
import posthog from 'posthog-js'

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST,
  session_recording: {
    sampleRate: 0.1, // 10% de sessions
  }
})

// Rastrear eventos
posthog.capture('form_submit_success', {
  form_name: 'NewSeamstress',
  duration_ms: 1200,
})
```

### Métricas Recomendadas
1. **Funnel**: View page → Complete form → Submit → Success
2. **Retention**: Usuários que retornam por semana
3. **Cohorts**: Usuários por data de primeira criação de costureira
4. **Heatmap**: Cliques em formulários (onde users clicam mais)
5. **Session Recording**: Gravação de 10% das sessões

---

## 7. Privacidade e Conformidade

### GDPR/LGPD Compliance
```javascript
// Pedir consentimento antes de rastrear
const telemetry = {
  track: (event, props) => {
    const consent = localStorage.getItem('telemetry_consent');
    if (consent === 'true') {
      // enviar evento
    }
  }
};

// Cookie banner
<CookieBanner
  onAccept={() => localStorage.setItem('telemetry_consent', 'true')}
  onReject={() => localStorage.setItem('telemetry_consent', 'false')}
/>
```

### Dados Não Coletados
- ❌ Senhas ou tokens
- ❌ Dados sensíveis (endereço, CPF)
- ❌ Conteúdo de formulários (apenas campo + tipo)
- ❌ URLs com parâmetros sensíveis

---

## 8. Checklist de Implementação

- [ ] Criar service de telemetria
- [ ] Integrar page views
- [ ] Integrar form tracking
- [ ] Integrar list tracking
- [ ] Integrar error tracking
- [ ] Setup Posthog (ou alternativa)
- [ ] Dashboard com funnels
- [ ] Cookie banner GDPR
- [ ] Documentação de eventos
- [ ] A/B testing framework

---

## 9. KPIs Principais

| KPI | Target | Ação |
|-----|--------|------|
| Form Completion Rate | >80% | Otimizar UX se <70% |
| Average Form Duration | <2 min | Investigar se >5 min |
| Error Recovery Rate | >85% | Melhorar validação se <75% |
| Page Load Time (TTI) | <2s | Otimizar se >3s |
| Session Duration | >5 min | Analisar se <2 min |
| Bounce Rate | <30% | Investigar se >40% |

---

**Próxima Tarefa**: Setup inicial de Posthog ou alternativa  
**Responsável**: Frontend + Analytics  
**Data Alvo**: Sprint 1-2 (Agosto 2026)
