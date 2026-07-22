# Plano Técnico: Observabilidade (Logs + Tracing)

**Status**: Planejamento  
**Prioridade**: Alta (debugging + compliance)  
**Esforço Estimado**: 2-3 sprints  
**Data**: 2026-07-21

---

## 1. Objetivo

Implementar observabilidade robusta (logs estruturados, rastreamento de transações, health checks) para facilitar debugging em produção, cumprimento de auditoria, e compreender fluxos de aplicação.

---

## 2. Arquitetura de Observabilidade

```
┌─────────────────────────────────────┐
│ Frontend (React)                    │
│ - Console logs estruturados         │
│ - Error boundary                    │
│ - Performance metrics               │
└──────────────┬──────────────────────┘
               │
      ┌────────▼────────┐
      │ Correlação ID   │
      │ (header)        │
      └────────┬────────┘
               │
┌──────────────▼──────────────────────┐
│ Backend (Django)                    │
│ - Structured logs (Winston/Loguru)  │
│ - Request/Response logging          │
│ - Database query logs               │
└──────────────┬──────────────────────┘
               │
      ┌────────▼────────┐
      │ ELK Stack       │
      │ ou similar      │
      │ (logs)          │
      └────────┬────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼──────┐      ┌──────▼───┐
│ Dashboard│      │  Alerts  │
│(Kibana)  │      │(Grafana) │
└──────────┘      └──────────┘
```

---

## 3. Logs Estruturados

### Backend (Django)

#### Instalação e Configuração
```bash
# Via pipenv/pip
pip install python-json-logger loguru structlog

# settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'json': {
            '()': 'pythonjsonlogger.jsonlogger.JsonFormatter',
            'format': '%(asctime)s %(name)s %(levelname)s %(message)s'
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'json',
        },
        'file': {
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/var/log/cony/app.log',
            'maxBytes': 10485760,  # 10MB
            'backupCount': 5,
            'formatter': 'json',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'cony.api': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
            'propagate': False,
        },
    },
}
```

#### Correlação ID (Middleware)
```python
# middleware.py
import uuid
import logging

class CorrelationIdMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Pegar ou gerar ID
        correlation_id = request.headers.get(
            'X-Correlation-ID', 
            str(uuid.uuid4())
        )
        
        # Armazenar em contexto
        request.correlation_id = correlation_id
        
        # Adicionar ao logger
        logging.LoggerAdapter(
            logging.getLogger(),
            {'correlation_id': correlation_id}
        )
        
        response = self.get_response(request)
        response['X-Correlation-ID'] = correlation_id
        return response

# settings.py
MIDDLEWARE = [
    # ...
    'cony.middleware.CorrelationIdMiddleware',
]
```

#### Logging de Requests
```python
# api/views.py
import logging

logger = logging.getLogger(__name__)

class SeamstressViewSet(viewsets.ModelViewSet):
    def create(self, request):
        logger.info(
            'Creating seamstress',
            extra={
                'correlation_id': request.correlation_id,
                'user_id': request.user.id,
                'payload_size': len(request.body),
                'ip': get_client_ip(request),
            }
        )
        
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            
            logger.info(
                'Seamstress created successfully',
                extra={
                    'correlation_id': request.correlation_id,
                    'seamstress_id': serializer.data['id'],
                    'duration_ms': 125,
                }
            )
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        except Exception as e:
            logger.error(
                'Failed to create seamstress',
                exc_info=True,
                extra={
                    'correlation_id': request.correlation_id,
                    'error_type': type(e).__name__,
                    'error_message': str(e),
                }
            )
            raise
```

#### Logging de Banco de Dados
```python
# settings.py - SQL Query Logging
LOGGING['loggers']['django.db.backends'] = {
    'handlers': ['console', 'file'],
    'level': 'DEBUG',  # Apenas dev
    'propagate': False,
}

# Para produção, usar django-debug-toolbar ou APM (New Relic, DataDog)
```

### Frontend (React)

#### Configuração de Logger Estruturado
```javascript
// src/services/logger.js
const createLogger = (correlationId) => {
  const log = (level, message, context = {}) => {
    const payload = {
      timestamp: new Date().toISOString(),
      level,
      message,
      correlationId,
      userAgent: navigator.userAgent,
      url: window.location.href,
      ...context,
    };
    
    // Enviar para backend
    if (level === 'error' || level === 'warn') {
      fetch('/api/logs/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Correlation-ID': correlationId,
        },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Falha ao enviar não deve quebrar app
        console.error('Failed to send log', payload);
      });
    }
    
    // Também logar no console (dev)
    console[level](`[${correlationId}]`, message, context);
  };
  
  return {
    info: (msg, ctx) => log('info', msg, ctx),
    warn: (msg, ctx) => log('warn', msg, ctx),
    error: (msg, ctx) => log('error', msg, ctx),
    debug: (msg, ctx) => log('debug', msg, ctx),
  };
};

// src/App.jsx
export const loggerContext = React.createContext(null);

const correlationId = sessionStorage.getItem('correlationId') ||
                      `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
sessionStorage.setItem('correlationId', correlationId);

const logger = createLogger(correlationId);

<loggerContext.Provider value={{ logger, correlationId }}>
  {/* App */}
</loggerContext.Provider>
```

#### Error Boundary com Logging
```javascript
// src/components/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    const { logger, correlationId } = this.context;
    
    logger.error('React Error', {
      errorMessage: error.message,
      errorStack: error.stack,
      componentStack: errorInfo.componentStack,
      severity: 'critical',
    });
    
    // Enviar para Sentry se configurado
    Sentry.captureException(error, {
      contexts: {
        react: {
          componentStack: errorInfo.componentStack,
        },
      },
      tags: {
        correlationId,
      },
    });
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <Alert 
          type="error" 
          message="Algo deu errado. Nossa equipe foi notificada."
        />
      );
    }
    
    return this.props.children;
  }
}

ErrorBoundary.contextType = loggerContext;
```

---

## 4. Health Checks

### Backend
```python
# api/views.py
from django.http import JsonResponse
from django.db import connection
import redis

class HealthCheckView(APIView):
    def get(self, request):
        health = {
            'status': 'ok',
            'timestamp': timezone.now().isoformat(),
            'version': '1.0.0',
            'checks': {}
        }
        
        # Database check
        try:
            with connection.cursor() as cursor:
                cursor.execute('SELECT 1')
            health['checks']['database'] = 'ok'
        except Exception as e:
            health['checks']['database'] = f'error: {str(e)}'
            health['status'] = 'degraded'
        
        # Cache (Redis) check
        try:
            r = redis.Redis(host='localhost', port=6379)
            r.ping()
            health['checks']['cache'] = 'ok'
        except Exception as e:
            health['checks']['cache'] = f'error: {str(e)}'
            health['status'] = 'degraded'
        
        # External services check
        try:
            response = requests.get('https://api.external.com/health', timeout=2)
            health['checks']['external_api'] = 'ok' if response.status_code == 200 else 'error'
        except Exception as e:
            health['checks']['external_api'] = f'error: {str(e)}'
        
        status_code = 200 if health['status'] == 'ok' else 503
        return JsonResponse(health, status=status_code)
```

### Frontend
```javascript
// src/services/health.js
export const checkHealth = async () => {
  try {
    const response = await fetch('/api/health/');
    return await response.json();
  } catch (error) {
    return { status: 'error', message: error.message };
  }
};

// Monitorar periodicamente
setInterval(async () => {
  const health = await checkHealth();
  if (health.status !== 'ok') {
    logger.warn('Backend health degraded', health);
  }
}, 60000); // A cada minuto
```

---

## 5. Performance Metrics

### Frontend
```javascript
// src/services/performance.js
export const recordMetric = (name, value, unit = 'ms') => {
  const metric = {
    name,
    value,
    unit,
    timestamp: performance.now(),
  };
  
  // Enviar para backend
  navigator.sendBeacon('/api/metrics/', JSON.stringify(metric));
};

// Hook para medir tempo de componente
export const useMeasurePerformance = (componentName) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const duration = performance.now() - startTime;
      recordMetric(`component_render_${componentName}`, duration);
    };
  }, [componentName]);
};

// Uso em componente
const Services = () => {
  useMeasurePerformance('Services');
  
  useEffect(() => {
    const start = performance.now();
    loadServices().then(() => {
      recordMetric('services_load_time', performance.now() - start);
    });
  }, []);
};
```

---

## 6. Rastreamento de Transações (APM)

### Opção 1: Sentry (Recomendado para MVP)
```javascript
// src/main.jsx
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENV,
  integrations: [
    new BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 0.1, // 10% de requisições
  replaysSessionSampleRate: 0.1,
});

export const SentryRoutes = Sentry.withSentryRouting(BrowserRouter);
```

### Opção 2: OpenTelemetry (Mais flexível)
```python
# backend
from opentelemetry import trace, metrics
from opentelemetry.exporter.jaeger.thrift import JaegerExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.instrumentation.django import DjangoInstrumentor

jaeger_exporter = JaegerExporter(
    agent_host_name="localhost",
    agent_port=6831,
)
trace.set_tracer_provider(TracerProvider(jaeger_exporter))
DjangoInstrumentor().instrument()
```

---

## 7. Infraestrutura de Logs

### Local (Desenvolvimento)
- Logs em stdout (JSON format)
- Tail com: `docker-compose logs -f backend | jq`

### Staging/Produção
- **ELK Stack** (Elasticsearch, Logstash, Kibana):
  - Elasticsearch: Armazenar logs
  - Logstash: Processar e normalizar
  - Kibana: Visualizar e alertar
  
  Ou **Alternativa Simples**:
  - **Papertrail** (SaaS): Auto-scaling, alertas
  - **LogRocket** (SaaS): Session replay + logs

---

## 8. Checklist de Implementação

### Fase 1: Logs Estruturados (Sprint 1)
- [ ] Setup JSON logger backend
- [ ] Middleware de CorrelationID
- [ ] Logging de requests/responses (API)
- [ ] Error logging com stack trace
- [ ] Frontend logger com correlationId

### Fase 2: Health Checks (Sprint 1-2)
- [ ] /api/health/ endpoint
- [ ] DB check
- [ ] Cache check (Redis)
- [ ] Monitoring health check periodicamente

### Fase 3: Performance Metrics (Sprint 2)
- [ ] Medir render time de componentes
- [ ] Medir API response times
- [ ] Medir page load time
- [ ] Dashboardde métricas

### Fase 4: APM (Sprint 2-3)
- [ ] Setup Sentry ou OpenTelemetry
- [ ] Rastrear transações de ponta a ponta
- [ ] Alertas para erros

---

## 9. Métricas Principais

| Métrica | Alvo | Ação |
|---------|------|------|
| Error Rate | <0.1% | Alert se >0.5% |
| API Response Time | <500ms | Alerta se >1s |
| Component Render | <100ms | Otimizar se >300ms |
| Backend Health | Ok | Alerta se degraded |
| Log Volume | <10GB/dia | Compactar/arquivo se >50GB |

---

**Próxima Tarefa**: Setup inicial de Sentry ou ELK  
**Responsável**: DevOps + Backend  
**Data Alvo**: Sprint 2-3 (Setembro 2026)
