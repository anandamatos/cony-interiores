# DISCOVERY-M1-UX-007-03: Revisar warnings do axe e separar quick wins

**Status**: ✅ Completado  
**Data**: 2026-07-21  
**Responsável**: @anandamatos  

---

## Objetivo

Executar auditorias de acessibilidade com a ferramenta axe DevTools em páginas críticas (formulários, listagens) e categorizar achados entre "quick wins" (fáceis de corrigir) e backlog técnico (escopo futuro).

---

## Ferramenta e Metodologia

**Ferramenta**: axe DevTools (Chrome Extension)
- Instalada via: Chrome Web Store ou firefox-addon
- Scan automático de WCAG 2.1 AA compliance
- Categorias: Violations (erros críticos), Needs Review (revisar), Best Practices

**Páginas auditadas**:
1. Dashboard (`/`)
2. Novo Serviço (`/services/new`)
3. Editar Serviço (`/services/:id/edit`)
4. Listagem de Serviços (`/services`)
5. Nova Costureira (`/seamstresses/new`)
6. Editar Costureira (`/seamstresses/:id/edit`)
7. Listagem de Costureiras (`/seamstresses`)

---

## Achados Consolidados

### Severity 1: Críticos (Violações - Corrigir Imediatamente)

Nenhum achou de severidade crítica foi encontrado em formulários principais (NewService, NewSeamstress, EditService, EditSeamstress).

### Severity 2: Avisos (Needs Review - Revisar)

#### 1. Contrast Ratio abaixo de mínimo (WCAG AA 4.5:1)

**Onde**: Múltiplos componentes (texto em `text-taupe`, badges, links footer)

**Problemas**:
- `.text-taupe` (cor #9CA3AF) em fundo branco: ~3.5:1 (abaixo de 4.5:1)
- `.text-gray-400` em badges: ~2.0:1 (crítico)
- Links em footer: ~3.2:1 (abaixo do mínimo)

**Componentes afetados**:
- `Typography` com `className="text-taupe"`
- `Badge` com background neutro
- `Footer` com links

**Quick Win**: 
- [ ] Aumentar saturação de `text-taupe` para ≥ 4.5:1 (ex: #6B7280 em vez de #9CA3AF)
- [ ] Ajustar cores de badges para contraste mínimo
- [ ] Revisar palette Tailwind: `gray-500` em vez de `gray-400`

**Esforço**: Baixo (1-2 horas)

**Arquivo**: `tailwind.config.js` ou classe de utilidades CSS

---

#### 2. Heading Hierarchy descontinuada

**Onde**: Dashboard, Listagens, Formulários

**Problemas**:
- Jump de `<h1>` para `<h3>` (pula `<h2>`)
- Múltiplos `<h1>` na mesma página
- Headings no Footer não seguem hierarquia

**Exemplo problemático**:
```jsx
<h1>Dashboard</h1>
<h3>Serviços Recentes</h3>  // ← Pulou h2!
```

**Quick Win**:
- [ ] Revisar componentes de página: `<h1>` apenas no topo
- [ ] Usar `<h2>` para seções principais
- [ ] Usar `<h3>` para subsecções
- [ ] Remover headings do Footer (usar `<strong>` em vez disso)

**Esforço**: Baixo (2-3 horas)

**Arquivos afetados**:
- `Dashboard/index.jsx`
- `Services/index.jsx`
- `Seamstresses/index.jsx`
- `organisms/Footer/index.jsx`

---

#### 3. ARIA Labels faltando em elementos interativos

**Onde**: Botões de ícone, inputs, botões de toggle

**Problemas**:
- Botões com ícone único: `<Button><Edit2 /></Button>` sem label
- Checkboxes sem `<label>` associada
- Inputs de busca sem `aria-label`

**Exemplo problemático**:
```jsx
<Button className="!p-2">
  <Edit2 className="w-4 h-4" />  // ← Sem aria-label
</Button>
```

**Quick Win**:
- [ ] Adicionar `aria-label` em botões de ícone (ex: "Editar serviço")
- [ ] Associar labels com `htmlFor` em checkboxes e inputs
- [ ] Testar com screen reader (NVDA/JAWS simulado)

**Esforço**: Baixo (2-4 horas)

**Arquivos afetados**:
- `Services/index.jsx` (Edit, Delete buttons)
- `Seamstresses/index.jsx` (Edit, Toggle, Delete buttons)
- `molecules/SearchBar/index.jsx`
- `molecules/CostureiraForm/index.jsx`

---

#### 4. Color used as only means of conveyance

**Onde**: Status badges (Active/Inactive/Pending)

**Problemas**:
- Badge "Ativo" em verde: usuários daltônicos podem não distinguir
- Sem icone ou texto adicional

**Quick Win**:
- [ ] Adicionar ícone ao badge (✓ para ativo, ◯ para inativo)
- [ ] Considerar padronizar com text-label ("Ativo", "Inativo")
- [ ] Nunca usar cor como único indicador

**Esforço**: Muito Baixo (30 min - 1 hora)

**Arquivos afetados**:
- `Services/index.jsx` (linhas com status badge)
- `Seamstresses/index.jsx` (badges)

---

#### 5. Links sem href válida ou função

**Onde**: Footer

**Problemas**:
```jsx
<a href="#">Link</a>  // ← href vazio
```

**Quick Win**:
- [ ] Converter `<a href="#">` em `<button>` com `onClick`
- [ ] Ou adicionar `href` válida
- [ ] Adicionar `aria-label` e `role="button"` se precisar que funcione como botão

**Esforço**: Muito Baixo (30 min)

**Arquivo**: `organisms/Footer/index.jsx`

---

### Severity 3: Best Practices (Recomendações - Backlog)

#### 1. Use of HTML5 `<form>` para formulários

**Recomendação**: Estruturado (já implementado em ServiceForm e CostureiraForm)

**Status**: ✅ OK - Formulários usam `<form>` corretamente

---

#### 2. Usar `<button type="submit">` em vez de divs com onClick

**Status**: ✅ OK - Formulários usam `<button type="submit">`

---

#### 3. Keyboard Navigation (Tab order, Enter to submit)

**Recomendação**: Melhorar comportamento com teclado

**Achados**:
- Modal de confirmação (window.confirm) não acessível
- Alguns inputs não ficam focados corretamente

**Backlog**: Substituir `window.confirm()` por Modal acessível

---

#### 4. Error messages associadas a inputs

**Status**: ⚠️ Parcial

**Achados**:
- ServiceForm: Error messages renderizam abaixo do input, mas não associadas via `aria-describedby`
- CostureiraForm: Sem `aria-describedby`

**Quick Win**:
- [ ] Adicionar `aria-describedby="error-{fieldName}"` no input
- [ ] Associar span de erro com `id="error-{fieldName}"`

**Esforço**: Baixo (1-2 horas)

---

## Resumo de Quick Wins (Implementar Agora)

| # | Achado | Componentes | Esforço | Status |
|---|--------|-------------|---------|--------|
| 1 | Contrast ratio | Typography, Badge, Footer | 1-2h | Pendente |
| 2 | Heading hierarchy | Dashboard, Listagens, Footer | 2-3h | Pendente |
| 3 | ARIA labels | Botões, Inputs, Checkboxes | 2-4h | Pendente |
| 4 | Color conveyance | Badges Status | 30m-1h | Pendente |
| 5 | Links sem href | Footer | 30m | Pendente |
| 6 | aria-describedby | Formulários | 1-2h | Pendente |

**Total de Quick Wins**: ~8-12 horas (1-2 dias)

---

## Backlog de Acessibilidade (Escopo Futuro)

| # | Achado | Prioridade | Esforço |
|---|--------|-----------|---------|
| 1 | Substituir window.confirm por Modal acessível | Média | 3-4h |
| 2 | Melhorar tab order e keyboard nav | Média | 2-3h |
| 3 | Focus indicators mais visíveis | Baixa | 1h |
| 4 | Screen reader testing (NVDA/JAWS) | Média | 2-3h |
| 5 | Mobile accessibility (touch targets ≥ 48px) | Baixa | 2-3h |
| 6 | Traduzir aria-labels para PT-BR | Muito Baixa | 1h |

---

## Plano de Implementação - Quick Wins

### Sprint Atual (Semana 29)

**Prioridade 1** (Antes de deploy staging):
1. Corrigir contrast ratio (↑ 2 horas)
2. Corrigir heading hierarchy (↑ 3 horas)
3. Adicionar aria-labels em botões críticos (↑ 2 horas)

**Prioridade 2** (Nice to have):
4. Adicionar icons a badges
5. Corrigir footer links

### Sprint Seguinte

**Implementar**:
- Modal acessível para confirmação
- Melhorar keyboard navigation
- aria-describedby em todos os inputs

---

## Recursos e Ferramentas

**Verificação**:
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org/
- Lighthouse (Chrome DevTools): Audit > Accessibility

**Referências**:
- WCAG 2.1 AA Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
- MDN ARIA Guide: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA
- WebAIM Color Contrast: https://webaim.org/articles/contrast/

**Screen Readers** (Teste Manual):
- NVDA (Windows): https://www.nvaccess.org/
- JAWS (Windows/Mac): https://www.freedomscientific.com/products/software/jaws/
- VoiceOver (Mac): Built-in

---

## Próximas Ações

1. ✅ Catalogar violations e quick wins
2. ⏳ Implementar quick wins na próxima sprint
3. ⏳ Planejar backlog técnico
4. ⏳ Treinar squad em WCAG 2.1 AA

---

## Referências

- Audit results: Screenshots em `docs/4-delivery/accessibility-audit-2026-07.pdf`
- Tailwind config: `frontend/tailwind.config.js`
- Components: `frontend/src/components/`
