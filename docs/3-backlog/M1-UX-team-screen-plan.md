# Plano: Extensão Tela Equipe - Operações Centralizadas

**Status**: Planejamento  
**Prioridade**: Média (pós-MVP)  
**Esforço Estimado**: 2-3 sprints  
**Data**: 2026-07-21

---

## 1. Objetivo

Estender a tela "Equipe" (Team) para ser um hub centralizado de operações de costureiras, permitindo:
- Visualizar consolidada toda a equipe com métricas
- Operações bulk (ativar/desativar múltiplas, ajustar capacidades)
- Análise visual de capacidade (histogramas, previsões)
- Filtros avançados por especialidade, disponibilidade, carga

---

## 2. Estrutura Proposta

### Layout Geral
```
┌─────────────────────────────────────────┐
│ EQUIPE                                  │
├─────────────────────────────────────────┤
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ Dashboard (Métricas)             │  │
│  │ - Total: 12 costureiras          │  │
│  │ - Ativos: 10 (83%)               │  │
│  │ - Capacidade Utilizada: 65%      │  │
│  └──────────────────────────────────┘  │
│                                         │
│  Filtros: [Status ▼] [Especialidade ▼] │
│           [Capacidade Min ▼]            │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ [☐] Todos  [Ativar] [Desativar] │  │
│  ├──────────────────────────────────┤  │
│  │ [☐] Maria Silva   | Vestidos | ▓▓▓ │
│  │ [☐] João Santos   | Camisas  | ░░░ │
│  │ [☐] Ana Costa     | Calças   | ▓▓  │
│  │ ...                                 │
│  └──────────────────────────────────┘  │
│                                         │
│  [Visualizar Capacidade] [Exportar CSV] │
└─────────────────────────────────────────┘
```

### Seções

#### 2.1 Dashboard de Métricas
```jsx
<div className="grid grid-cols-4 gap-4 mb-6">
  <MetricCard title="Total Costureiras" value="12" trend="↑ 2" />
  <MetricCard title="Ativas" value="10" subtext="83%" color="green" />
  <MetricCard title="Capacidade Utilizada" value="65%" trend="↑ 5%" />
  <MetricCard title="Horas Livres" value="42h" trend="↓ 3h" />
</div>
```

#### 2.2 Filtros Avançados
```jsx
<div className="flex gap-4 mb-4">
  <SelectFilter label="Status" options={["Ativas", "Inativas", "Todas"]} />
  <SelectFilter label="Especialidade" options={["Vestidos", "Camisas", ...]} />
  <RangeFilter label="Capacidade %" min={0} max={100} />
  <DateRangeFilter label="Última Atividade" />
</div>
```

#### 2.3 Seleção Múltipla + Bulk Actions
```jsx
<div className="bg-blue-50 p-3 mb-4 flex items-center justify-between">
  <span>3 selecionados</span>
  <div className="flex gap-2">
    <Button>Ativar</Button>
    <Button>Desativar</Button>
    <Button>Ajustar Capacidade</Button>
    <Button variant="danger">Excluir</Button>
  </div>
</div>
```

#### 2.4 Tabela/Grid de Costureiras
```jsx
<table>
  <thead>
    <tr>
      <th><input type="checkbox" /></th>
      <th>Nome</th>
      <th>Especialidade</th>
      <th>Capacidade</th>
      <th>Utilização</th>
      <th>Status</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    {costureiras.map(c => (
      <tr key={c.id}>
        <td><input type="checkbox" onChange={() => toggleSelect(c.id)} /></td>
        <td>{c.nome}</td>
        <td>{c.especialidade}</td>
        <td>{c.capacidadeBaseSemanal}h</td>
        <td><ProgressBar value={c.utilizacao} /></td>
        <td><Badge>{c.ativa ? 'Ativa' : 'Inativa'}</Badge></td>
        <td>
          <Button icon={Edit} onClick={() => navigate(`edit/${c.id}`)} />
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

---

## 3. Features por Fase

### Fase 1: Consolidação (Sprint 1)
- [x] Migrar listagem existente para Team page
- [x] Adicionar dashboard com 4 métricas básicas
- [x] Manter filtros status + busca existentes

### Fase 2: Seleção Múltipla (Sprint 2)
- [ ] Implementar checkboxes para seleção
- [ ] Bulk actions: ativar, desativar, excluir
- [ ] Modal de confirmação para ações bulk
- [ ] Feedback de sucesso/erro

### Fase 3: Filtros Avançados (Sprint 2-3)
- [ ] Filtro por especialidade (multi-select)
- [ ] Filtro por faixa de capacidade
- [ ] Filtro por última atividade (data range)
- [ ] Salvar filtros favoritos

### Fase 4: Visualizações (Sprint 3)
- [ ] Modal "Visualizar Capacidade":
  - Histograma: Distribuição de horas por dia
  - Gráfico: Previsão de demanda vs capacidade
  - Tabela: Detalhes por costureira
- [ ] Exportar dados (CSV/Excel)

### Fase 5: Analytics (Sprint 4 - Backlog)
- [ ] Gráficos de tendência (Tempo)
- [ ] Matriz de habilidades
- [ ] Recomendações de contratação

---

## 4. Componentes Novos

```
pages/Team/
├── index.jsx (componente principal)
├── Metrics/
│   ├── MetricCard.jsx
│   └── Dashboard.jsx
├── Filters/
│   ├── StatusFilter.jsx
│   ├── SpecialtyFilter.jsx
│   └── CapacityFilter.jsx
├── Table/
│   ├── SeamstressTable.jsx
│   └── BulkActionBar.jsx
└── Modals/
    ├── CapacityVisualization.jsx
    └── BulkActionConfirm.jsx
```

---

## 5. Integrações Backend

**Endpoints Necessários**:
- `GET /api/costureiras/?status=active&especialidade=vestidos` (filtros)
- `PATCH /api/costureiras/bulk/` (bulk update)
- `DELETE /api/costureiras/bulk/` (bulk delete)
- `GET /api/costureiras/metrics/` (dashboard)
- `GET /api/costureiras/capacity-forecast/` (previsões)

---

## 6. Critérios de Aceição

### Fase 1
- [ ] Team page exibe todas costureiras
- [ ] Dashboard mostra 4 métricas corretas
- [ ] Filtros funcionam (status, busca)

### Fase 2
- [ ] Checkbox seleciona/deseleciona
- [ ] Bulk ativar/desativar funciona
- [ ] Confirmação impede ações acidentais

### Fase 3
- [ ] Filtros avançados funcionam
- [ ] Combinação de filtros funciona (AND)
- [ ] Performance < 500ms com 100+ costureiras

### Fase 4
- [ ] Modal de capacidade carrega dados
- [ ] Histograma renderiza corretamente
- [ ] CSV export inclui dados filtrados

---

## 7. Stack Recomendado

- **Gráficos**: Chart.js ou Recharts
- **Tabelas**: TanStack Table (React Table v8)
- **Select Multi**: React Select ou Headless UI
- **CSV Export**: papaparse ou similar

---

**Próxima Tarefa**: Criar issue no backlog para Fase 1  
**Responsável**: Frontend  
**Data Alvo**: Sprint 6-7 (Novembro-Dezembro 2026)
