# Plano Técnico: Acessibilidade WCAG 2.1 AA

**Status**: Planejamento  
**Prioridade**: Alta (compliance + UX inclusivo)  
**Esforço Estimado**: 3-4 sprints  
**Data**: 2026-07-21

---

## 1. Objetivo

Atingir conformidade **WCAG 2.1 Nível AA** na aplicação Cony, garantindo que pessoas com deficiências (visuais, auditivas, motoras, cognitivas) consigam usar o sistema com a mesma eficácia que usuários sem deficiências.

---

## 2. Audit Atual (Baseline)

### Ferramentas de Verificação
- **axe DevTools** (extensão Chrome): Verificação automática de A11y
- **WAVE** (WebAIM): Feedback visual de issues
- **Lighthouse** (Chrome DevTools): Performance + A11y score
- **NVDA Screen Reader** (Windows) ou **VoiceOver** (macOS): Teste manual

### Problemas Identificados (Pré-Audit)
- [ ] Labels ausentes em inputs
- [ ] Falta aria-label em ícones
- [ ] Contraste de cores insuficiente (footer links)
- [ ] Ordem de focagem incorreta (Tab order)
- [ ] Tabelas sem headers semânticos
- [ ] Links sem href (divs com click)
- [ ] Imagens sem alt text
- [ ] Modais sem focus trap

---

## 3. Princípios WCAG 2.1

### 1. **Perceptível** (Usuário consegue perceber conteúdo)
- ✅ **Imagens**: Todo img deve ter alt text descritivo
- ✅ **Vídeo/Áudio**: Legendas e transcrições
- ✅ **Cores**: Não apenas cor como único indicador (+ ícone, padrão)
- ✅ **Contraste**: Mínimo 4.5:1 para texto (AA), 3:1 para grandes elementos

### 2. **Operável** (Usuário consegue navegar)
- ✅ **Teclado**: Todas as funções acessíveis via teclado (sem mouse)
- ✅ **Tempo**: Sem time limits em interações (ou com aviso + extensão)
- ✅ **Convulsões**: Evitar flashes >3x por segundo
- ✅ **Navegação**: Ordem lógica de Tab, skip links

### 3. **Compreensível** (Usuário consegue entender)
- ✅ **Linguagem**: Texto claro, jargão evitado
- ✅ **Previsível**: Comportamento consistente, sem surpresas
- ✅ **Erros**: Mensagens claras, sugestões de correção
- ✅ **Entrada**: Confirmação antes de ações críticas

### 4. **Robusto** (Código compatível)
- ✅ **Semântica**: HTML válido, roles ARIA corretas
- ✅ **Nomes**: Elementos têm nomes acessíveis (accessible name)
- ✅ **Estados**: Componentes comunicam estado aos ATs (screen readers)
- ✅ **Compatibilidade**: Testa com múltiplos screen readers

---

## 4. Implementação por Componente

### Atoms (Buttons, Inputs, Cards)

#### Button
```jsx
// ❌ Antes
<button onClick={toggle}><MoreVertical size={18} /></button>

// ✅ Depois
<button 
  onClick={toggle}
  aria-label="Abrir menu de ações"
  aria-expanded={isOpen}
  aria-controls="action-menu"
>
  <MoreVertical size={18} aria-hidden="true" />
</button>
```

#### Input
```jsx
// ❌ Antes
<input type="text" placeholder="Buscar..." />

// ✅ Depois
<label htmlFor="search-field">Buscar por nome:</label>
<input 
  id="search-field"
  type="text" 
  placeholder="Ex: Maria Silva"
  aria-label="Buscar costureiras por nome"
  aria-describedby="search-help"
/>
<small id="search-help">Digite nome ou especialidade</small>
```

#### Badge (Status)
```jsx
// ❌ Antes
<span className="bg-green-100">Ativo</span>

// ✅ Depois
<span 
  className="bg-green-100 border-l-4 border-green-500" 
  role="status"
  aria-label="Status: Ativo"
>
  ✓ Ativo
</span>
```

### Molecules (Forms, Filters)

#### SearchBar + StatusFilter
```jsx
<fieldset>
  <legend>Filtros de busca</legend>
  <SearchBar aria-label="Buscar por nome ou especialidade" />
  <StatusFilter 
    aria-label="Filtrar por status"
    onChangeAnnounce={(filter) => {
      // Anunciar mudança ao screen reader
      announceToScreenReader(`Filtrando por ${filter}`);
    }}
  />
</fieldset>
```

### Pages (Listagens, Formulários)

#### Listagem com Tabela
```jsx
// ❌ Antes
<div className="grid grid-cols-4 gap-4">
  {/* Parece tabela mas é divs */}
</div>

// ✅ Depois
<table aria-label="Lista de costureiras">
  <thead>
    <tr>
      <th scope="col">Nome</th>
      <th scope="col">Especialidade</th>
      <th scope="col">Status</th>
      <th scope="col">Ações</th>
    </tr>
  </thead>
  <tbody>
    {/* rows */}
  </tbody>
</table>
```

#### Formulário com Validação
```jsx
<form aria-label="Criar nova costureira">
  <div>
    <label htmlFor="nome">
      Nome <span aria-label="obrigatório">*</span>
    </label>
    <input 
      id="nome"
      type="text"
      required
      aria-required="true"
      aria-invalid={errors.nome ? "true" : "false"}
      aria-describedby={errors.nome ? "nome-error" : undefined}
    />
    {errors.nome && (
      <span id="nome-error" role="alert" className="text-red-500">
        {errors.nome}
      </span>
    )}
  </div>
  <button type="submit">Salvar</button>
</form>
```

#### Modais com Focus Trap
```jsx
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  className="fixed inset-0 bg-black/50 flex items-center justify-center"
  ref={dialogRef}
  onKeyDown={handleKeyDown} // ESC fecha, Tab fica dentro
>
  <div className="bg-white p-6 rounded max-w-md">
    <h2 id="dialog-title">Confirmar exclusão?</h2>
    <p>Esta ação não pode ser desfeita.</p>
    <div className="flex gap-2">
      <button onClick={onConfirm} autoFocus>
        Excluir
      </button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  </div>
</div>
```

---

## 5. Checklist de Implementação

### Fase 1: Fundação (Sprint 1)
- [ ] Adicionar ARIA roles basics (button, dialog, status, alert)
- [ ] Aria-labels em todos os ícones
- [ ] Labels corretamente associados a inputs (htmlFor + id)
- [ ] Validação com aria-invalid e aria-describedby
- [ ] Testar com axe DevTools em todos os pages

### Fase 2: Navegação (Sprint 2)
- [ ] Skip links ("Pular para conteúdo principal")
- [ ] Tab order correto (tabindex -1 para não-focáveis)
- [ ] Focus visible em todos os elementos focáveis
- [ ] Keyboard navigation: Arrow keys em dropdowns/menus
- [ ] ESC fecha modais e menus

### Fase 3: Semântica (Sprint 2-3)
- [ ] HTML semântico: <section>, <article>, <aside>, <header>, <footer>
- [ ] Headings em ordem (h1, h2, h3, não pular níveis)
- [ ] Tabelas com <thead>, <th scope>
- [ ] Listas com <ul>/<ol>/<li>
- [ ] Landmarks: <main>, <nav>, <form> com aria-label

### Fase 4: Validação (Sprint 3-4)
- [ ] Testes com NVDA (Windows) ou VoiceOver (macOS)
- [ ] Teste com navegação apenas teclado (Tab + Enter/Space)
- [ ] Audit com axe DevTools e WAVE (0 erros, <5 warnings)
- [ ] Lighthouse A11y score ≥90
- [ ] Teste de contraste com WAVE (4.5:1 mínimo)

---

## 6. Ferramentas e Recursos

### Testes Automáticos
```bash
# Instalar axe-core
npm install --save-dev @axe-core/react

# Em testes
import { axe, toHaveNoViolations } from 'jest-axe';

test('componente sem violações a11y', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Screen Readers
- **NVDA**: Free, Windows (nvaccess.org)
- **JAWS**: Pago, Windows (freedomscientific.com)
- **VoiceOver**: Built-in, macOS/iOS
- **Narrator**: Built-in, Windows 10+

### Validadores
- **W3C Validator**: validator.w3.org
- **WAVE Browser Extension**: wave.webaim.org
- **axe DevTools**: deque.com/axe/devtools/
- **Lighthouse**: chrome://inspect ou DevTools

### Documentação
- WCAG 2.1: www.w3.org/WAI/WCAG21/quickref/
- ARIA Authoring Practices: www.w3.org/WAI/ARIA/apg/
- WebAIM: webaim.org

---

## 7. Estimativa de Esforço

| Fase | Tarefa | Horas | Sprint |
|------|--------|-------|--------|
| 1 | ARIA basics, aria-labels | 8 | 1 |
| 1 | Teste com axe DevTools | 4 | 1 |
| 2 | Skip links, Tab order | 6 | 2 |
| 2 | Keyboard navigation | 8 | 2 |
| 3 | HTML semântica | 8 | 3 |
| 3 | Headings, tabelas, landmarks | 6 | 3 |
| 4 | Screen reader testing | 10 | 4 |
| 4 | Ajustes finais, audit | 8 | 4 |
| **Total** | | **58h** | **4 sprints** |

---

## 8. Critérios de Aceitação

- [ ] 0 erros WCAG 2.1 AA (axe DevTools)
- [ ] <5 warnings (não-críticos)
- [ ] Lighthouse A11y score: ≥90
- [ ] Navegação 100% por teclado
- [ ] Screen reader: Compreensível e operável
- [ ] Todos os inputs com labels
- [ ] Contraste: ≥4.5:1 para texto normal, ≥3:1 para grande
- [ ] Documentação A11y em README

---

**Próxima Tarefa**: Criar Kanban board com issues por componente  
**Responsável**: Design System + Frontend  
**Data Alvo**: Sprint 2-5 (Outubro-Novembro 2026)
