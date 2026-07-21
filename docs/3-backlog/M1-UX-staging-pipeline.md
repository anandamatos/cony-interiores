# Plano: Pipeline de Homologação - Deploy Efêmero

**Status**: Planejamento  
**Prioridade**: Alta (para testes UX com stakeholders)  
**Esforço Estimado**: 1-2 sprints (DevOps + Frontend)  
**Data**: 2026-07-21

---

## 1. Objetivo

Estabelecer um pipeline de homologação que permita:
- Deploy efêmero (temporário, auto-cleanup)
- Acesso compartilhado para testes de usabilidade
- Session recording para análise de comportamento
- Feedback estruturado de usuários
- Métricas de sucesso (SUS score, task completion)

---

## 2. Arquitetura

```
┌──────────────────────────────────────────────────────┐
│ GitHub Branch: staging                               │
│ (ou PR merge automático)                             │
└──────────────────────────────────────────────────────┘
                          │
                    ┌─────▼─────┐
                    │  CI/CD     │
                    │ (GitHub    │
                    │ Actions)   │
                    └─────┬─────┘
                          │
          ┌───────────────┼───────────────┐
          │               │               │
     ┌────▼─────┐  ┌─────▼───────┐  ┌────▼─────┐
     │ Test     │  │ Build       │  │ Lint    │
     │ Suite    │  │ Docker      │  │ Check   │
     └────┬─────┘  └─────┬───────┘  └────┬─────┘
          │               │               │
          └───────────────┼───────────────┘
                    ┌─────▼─────┐
                    │  Deploy   │
                    │ (Heroku/  │
                    │ Railway)  │
                    └─────┬─────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
   ┌────▼──────┐    ┌────▼──────┐    ┌────▼──────┐
   │ Database  │    │ Frontend  │    │ Backend   │
   │ (Reset)   │    │ (Vite Dev)│    │ (Django)  │
   └─────┬─────┘    └─────┬─────┘    └─────┬─────┘
         │                │                │
         └────────────────┼────────────────┘
                    ┌─────▼──────────┐
                    │ Staging URL    │
                    │ staging-        │
                    │ [BUILD_ID].     │
                    │ herokuapp.com   │
                    └─────┬──────────┘
                          │
                ┌─────────┼─────────┐
                │         │         │
          ┌─────▼──┐ ┌───▼────┐ ┌─▼───────┐
          │  Slack │ │  Email │ │  Teams  │
          │ Notify │ │ Notify │ │ Notify  │
          └────────┘ └────────┘ └─────────┘
                          │
                    ┌─────▼──────┐
                    │  Tester    │
                    │  Access    │
                    │  +Session  │
                    │  Recording │
                    └────────────┘
```

---

## 3. Componentes

### 3.1 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/staging-deploy.yml
name: Deploy to Staging

on:
  push:
    branches:
      - staging
  workflow_dispatch:

env:
  HEROKU_APP_NAME: cony-staging

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Heroku
        run: heroku auth:login
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
      
      - name: Create Heroku app
        run: |
          heroku apps:create $HEROKU_APP_NAME || true
      
      - name: Deploy Docker
        run: |
          heroku container:push web -a $HEROKU_APP_NAME
          heroku container:release web -a $HEROKU_APP_NAME
      
      - name: Run migrations
        run: |
          heroku run "python manage.py migrate" -a $HEROKU_APP_NAME
      
      - name: Seed database (optional)
        run: |
          heroku run "python manage.py loaddata fixtures/staging.json" -a $HEROKU_APP_NAME
      
      - name: Notify Slack
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
            -H 'Content-Type: application/json' \
            -d '{
              "text": "✅ Staging deployed!",
              "blocks": [{
                "type": "section",
                "text": {
                  "type": "mrkdwn",
                  "text": "*Staging URL*: https://${{ env.HEROKU_APP_NAME }}.herokuapp.com"
                }
              }]
            }'
      
      - name: Schedule deletion (7 dias)
        run: |
          # Usar GitHub Actions schedule para deletar após 7 dias
          # ou via Heroku scheduler
```

### 3.2 Database Strategy

**Opção 1: Reset entre deploys (Recomendado)**
```bash
# Ao cada deploy, banco limpo + seed
heroku run "python manage.py migrate --clear"
heroku run "python manage.py seed_staging_data"
```

**Opção 2: Snapshot database**
```bash
# Manter snapshot limpo para RollBack rápido
pg_dump production > snapshots/clean_schema.sql
# Ao teste: restaurar snapshot
```

### 3.3 Guest Access (Sem Login)

Para stakeholders testarem sem criar conta:

```python
# backend/middleware.py
class GuestUserMiddleware:
    def __call__(self, request):
        if request.path.startswith('/api/guest/'):
            # Criar user guest anônimo
            guest_user = User.objects.get_or_create(
                username=f'guest_{request.session.session_key}'
            )[0]
            request.user = guest_user
        return self.get_response(request)

# Endpoints guest
GET /api/guest/seamstresses/
GET /api/guest/services/
POST /api/guest/services/  # Usa dados de teste
```

### 3.4 Session Recording (LogRocket)

```javascript
// frontend/src/main.jsx
import LogRocket from 'logrocket';

if (import.meta.env.VITE_ENV === 'staging') {
  LogRocket.init(import.meta.env.VITE_LOGROCKET_ID, {
    console: {
      shouldAggregateConsoleErrors: true
    },
    network: {
      requestSanitizer: req => req,
      responseSanitizer: res => res
    }
  });
  
  // Capture user interactions
  LogRocket.identify(userId, {
    email: userEmail,
    role: 'tester'
  });
}
```

### 3.5 Feedback Form (Inline)

```jsx
// src/components/StagingFeedback.jsx
export const StagingFeedback = () => {
  const [open, setOpen] = useState(false);
  
  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-3 shadow-lg"
        onClick={() => setOpen(true)}
      >
        💬
      </button>
      
      {open && (
        <Modal onClose={() => setOpen(false)}>
          <form onSubmit={handleSubmit}>
            <h3>Feedback de Usabilidade</h3>
            
            <div>
              <label>Como você classifica esta funcionalidade?</label>
              <SUSScale onChange={setSUS} />
            </div>
            
            <div>
              <label>Qual tarefa você estava tentando fazer?</label>
              <select value={task} onChange={setTask}>
                <option>Criar serviço</option>
                <option>Listar costureiras</option>
                <option>Editar dados</option>
              </select>
            </div>
            
            <div>
              <label>Conseguiu completar?</label>
              <radio>Sim</radio>
              <radio>Não</radio>
              <radio>Parcialmente</radio>
            </div>
            
            <textarea placeholder="Observações..." value={feedback} />
            
            <button type="submit">Enviar</button>
          </form>
        </Modal>
      )}
    </>
  );
};

// Renderizar em Staging
{import.meta.env.VITE_ENV === 'staging' && <StagingFeedback />}
```

---

## 4. Processo de Teste

### Fase 1: Preparação
1. Criar branch `staging` com commit desejado
2. GitHub Actions dispara deploy automaticamente
3. Backend + Frontend + DB rodando em 5min
4. URL enviada via Slack/Email para stakeholders

### Fase 2: Teste (45-60min)
- [ ] Testers recebem task list (5-7 tarefas principais)
- [ ] Executam tarefas enquanto LogRocket grava
- [ ] Preenchem SUS form após cada tarefa
- [ ] Deixam feedback livre no final

### Fase 3: Análise
- [ ] Download session recordings do LogRocket
- [ ] Compilar respostas de SUS (média + distribution)
- [ ] Identificar pain points (cliques frustrados, etc)
- [ ] Compilar feedback em insights

### Fase 4: Cleanup (Automático)
- [ ] Após 7 dias, Heroku app deletado automaticamente
- [ ] Database removido
- [ ] Logs arquivados

---

## 5. Métricas de Sucesso

### SUS (System Usability Scale)
```
1-20: Unacceptable (F)
21-50: Poor (D)
51-70: Acceptable (C/B)
71-100: Excellent (A)

Target: ≥70 (Acceptable)
```

### Task Completion Rate
```
Target: ≥85% (users conseguem completar tarefas)
```

### Error Recovery Rate
```
Target: ≥80% (quando erram, conseguem se recuperar)
```

### Time to Task
```
- Criar serviço: < 2 min
- Listar costureiras: < 30s
- Editar dados: < 1.5 min
```

### Qualitative Feedback
```
Top 3 pain points (clustering)
Features mais apreciadas
Sugestões de melhoria (agrupadas)
```

---

## 6. Stack Recomendado

**Hosting**:
- [Heroku](https://heroku.com) (simplest, built-in)
- [Railway](https://railway.app) (cheaper)
- [Render](https://render.com) (good balance)

**Session Recording**:
- [LogRocket](https://logrocket.com) (recommended - free tier)
- [Hotjar](https://hotjar.com) (heatmaps + recording)
- [Fullstory](https://www.fullstory.com/) (enterprise)

**Database**:
- Managed: Heroku Postgres ou Railway Postgres
- Seeding: Django fixtures ou management commands

**Feedback**:
- Email: formulário embarcado
- Typeform: popup externo
- Slack: slash commands

---

## 7. Checklist de Implementação

- [ ] Setup Heroku app e CI/CD pipeline
- [ ] Docker build passing
- [ ] Database migrations rodando
- [ ] Staging URL acessível
- [ ] Guest access funciona
- [ ] LogRocket integrado
- [ ] Feedback form funcional
- [ ] Slack notifications enviando
- [ ] 7-day auto cleanup configurado
- [ ] Documentação para testers
- [ ] SUS form criado
- [ ] Primeira rodada de testes executada

---

## 8. Template de Comunicação

```
Subject: 🚀 [STAGING] Cony v1.0 - Teste de Usabilidade

Olá pessoal!

Preparamos uma versão para teste de usabilidade. Vocês têm 7 dias para explorar!

🔗 **URL**: https://cony-staging-abc123.herokuapp.com
📝 **Login**: email: tester@test.com | senha: test123
  (Ou cliquem "Entrar como Visitante")

**Tarefas**:
1. Criar um serviço novo
2. Listar e filtrar costureiras
3. Editar dados de uma costureira
4. Deletar um serviço

**Feedback**:
- Cliquem no botão 💬 no canto inferior direito
- Preencham o formulário de SUS (1-5 escala)
- Compartilhem observações livres

Qualquer dúvida, é só chamar!
```

---

**Próxima Tarefa**: Setup Heroku account e primeiras configs  
**Responsável**: DevOps + Frontend  
**Data Alvo**: Sprint 3-4 (Setembro 2026)
