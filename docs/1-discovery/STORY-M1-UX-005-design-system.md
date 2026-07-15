
# 📋 **STORY-M1-UX-005: Evolução do Design System e Refatoração de Páginas**

## 🎯 **Objetivo da Story**

Evoluir o Design System da Cony Interiores com base no protótipo validado, refatorar **todas as páginas** do projeto para adotar a nova identidade visual (cores, tipografia, ícones, animações), corrigir o bug de navegação do Sidebar e incorporar requisitos de acessibilidade como parte do MVP1, com validações futuras no MVP2.

---

## 👥 **Squad Responsável**

| Função | Responsável |
|--------|-------------|
| **Squad** | UX & Experience |
| **Líder de UX** | Ananda Matos |
| **Frontend** | Gabriel |
| **Design** | Equipe de Design |
| **QA** | Squad QA |

---

## 📌 **Definition of Done (DoD)**

### Critérios de Conclusão (MVP1)
- [ ] Tokens de design atualizados no código (cores, tipografia, espaçamento, animações)
- [ ] Todos os componentes refatorados com a nova identidade visual
- [ ] Ícones Lucide integrados em todos os componentes e páginas
- [ ] **Corrigido bug de navegação do Sidebar** (rotas funcionando)
- [ ] **Todas as páginas refatoradas** (Dashboard, Serviços, Costureiras, Capacidade, Financeiro)
- [ ] Acessibilidade básica implementada (semântica HTML, ARIA labels, contraste)
- [ ] Storybook atualizado com a nova versão dos componentes
- [ ] Testes de acessibilidade automatizados configurados
- [ ] Documentação atualizada no Storybook

### Critérios Pendentes (MVP2 - Validação)
- [ ] Testes de usabilidade com usuários reais
- [ ] Validação de acessibilidade com ferramentas especializadas
- [ ] Feedback do cliente sobre a nova identidade
- [ ] Ajustes finos baseados no feedback

---

## 🏗️ **Estrutura de Tokens (Nova Camada)**

### 1. **Tokens de Cores**
Atualizar `src/styles/tokens/colors.js` com a paleta validada:

| Categoria | Cor | Valor | Uso |
|-----------|-----|-------|-----|
| **Primárias** | Marrom Café | #4B3A2E | Textos principais, botões primários |
| | Bege Areia | #D9C7B1 | Fundos, destaques suaves |
| | Taupe | #A8968B | Textos secundários |
| | Off White | #F6F3EF | Fundo da página |
| **Secundárias** | Cinza Claro | #E6E2DD | Bordas, divisórias |
| | Cinza Médio | #BDB7AE | Elementos desabilitados |
| | Verde Sálvia | #8D9ABA | Gráficos, destaques |
| | Azul Ardósia | #465057 | Contraste técnico |
| **Acento** | Ouro Acetinado | #C9A86A | Destaques, badges |
| | Terracota | #B56A4A | Alertas, chamadas de atenção |
| | Bronze | #8A6A4F | Hovers |
| | Preto Suave | #1A1A1A | Títulos de alta hierarquia |
| **Status** | Success | #4A7C59 | Feedback positivo |
| | Warning | #C9A86A | Alertas |
| | Danger | #B56A4A | Erros |
| | Info | #8D9ABA | Informações |

### 2. **Tokens de Tipografia**
Atualizar `src/styles/tokens/typography.js`:

| Nível | Fonte | Tamanho | Peso |
|-------|-------|---------|------|
| H1 | Montserrat | 32px | 700 |
| H2 | Montserrat | 24px | 600 |
| H3 | Montserrat | 18px | 600 |
| H4 | Montserrat | 16px | 600 |
| Corpo 1 | Lato | 16px | 400 |
| Corpo 2 | Lato | 14px | 400 |
| Legenda | Lato | 12px | 400 |

### 3. **Tokens de Animação (Novo)**
Criar `src/styles/tokens/animations.js`:

| Token | Valor | Uso |
|-------|-------|-----|
| duration-fast | 0.2s | Hovers, interações rápidas |
| duration-normal | 0.3s | Transições padrão |
| duration-slow | 0.5s | Animações de entrada |
| ease-spring | cubic-bezier(0.34, 1.56, 0.64, 1) | Interações com efeito bounce |
| ease-smooth | cubic-bezier(0.25, 0.46, 0.45, 0.94) | Animações suaves |

### 4. **Tokens de Sombras e Gradientes**
Atualizar `src/styles/tokens/shadows.js`:

| Token | Valor | Uso |
|-------|-------|-----|
| shadow-sm | 0 1px 4px rgba(75,58,46,0.06) | Cards pequenos |
| shadow-md | 0 4px 16px rgba(75,58,46,0.08) | Cards padrão |
| shadow-lg | 0 8px 32px rgba(75,58,46,0.12) | Modais, dropdowns |
| gradient-primary | linear-gradient(135deg, #C9A86A, #A8968B, #4B3A2E) | Logo, destaques |
| gradient-gold | linear-gradient(135deg, #D9C7B1, #C9A86A) | Badges, botões secundários |

---

## 🧩 **Refatoração de Componentes**

### Nível 1: Átomos (Atualização)

| Componente | Arquivo Atual | Ações |
|------------|---------------|-------|
| **Button** | `src/components/atoms/Button/index.jsx` | - Substituir cores genéricas pela nova paleta<br>- Adicionar variantes: gold, terracota<br>- Adicionar transições com tokens de animação<br>- Adicionar aria-labels e role |
| **Input** | `src/components/atoms/Input/index.jsx` | - Atualizar cores de borda e foco<br>- Adicionar estado de erro com cor Terracota<br>- Adicionar aria-invalid e aria-describedby |
| **Select** | `src/components/atoms/Select/index.jsx` | - Atualizar estilos com nova paleta<br>- Adicionar acessibilidade (aria-expanded, role) |
| **Typography** | `src/components/atoms/Typography/index.jsx` | - Atualizar font-family para Montserrat/Lato<br>- Adicionar novas variantes (h4, caption) |
| **Card** | `src/components/atoms/Card/index.jsx` | - Atualizar sombras e bordas<br>- Adicionar hover com transição spring |
| **Badge** | `src/components/atoms/Badge/index.jsx` | - Atualizar cores com nova paleta<br>- Adicionar variante gold |

### Nível 2: Moléculas (Atualização)

| Componente | Arquivo Atual | Ações |
|------------|---------------|-------|
| **SearchBar** | `src/components/molecules/SearchBar/index.jsx` | - Adicionar ícone Search (Lucide)<br>- Atualizar estilos com nova paleta<br>- Adicionar aria-label |
| **StatusFilter** | `src/components/molecules/StatusFilter/index.jsx` | - Atualizar estilos com nova paleta<br>- Adicionar aria-pressed para botões |
| **CostureiraTable** | `src/components/molecules/CostureiraTable/index.jsx` | - Atualizar cores de status<br>- Adicionar cabeçalho com aria-sort |

### Nível 3: Organismos (Atualização + Novo)

| Componente | Arquivo Atual | Ações |
|------------|---------------|-------|
| **Sidebar** | `src/components/organisms/Sidebar/index.jsx` | - **Corrigir bug de navegação** (rotas com react-router-dom)<br>- Substituir emojis por ícones Lucide<br>- Adicionar logo com ícone personalizado<br>- Atualizar cores e hover<br>- Adicionar role="navigation" e aria-label |
| **Header** | `src/components/organisms/Header/index.jsx` | - Adicionar ícones Lucide (Bell, HelpCircle, User)<br>- Atualizar search bar<br>- Adicionar aria-label nos botões |
| **Footer** | `src/components/organisms/Footer/index.jsx` | - Criar componente (novo)<br>- Adicionar links com acessibilidade |

---

## 📄 **Refatoração de Páginas**

### Páginas Existentes (Refatoração Obrigatória)

| Página | Arquivo | Ações |
|--------|---------|-------|
| **Dashboard** | `src/pages/Dashboard/index.jsx` | - Refatorar com novos componentes<br>- Substituir dados mockados por dados da API<br>- Adicionar gráficos com dados reais<br>- Adicionar estrutura semântica (main, section) |
| **Serviços** | `src/pages/Services/index.jsx` | - Refatorar listagem com novos componentes<br>- Atualizar cards com nova identidade<br>- Adicionar filtros e busca<br>- Substituir emojis por ícones Lucide |
| **Novo Serviço** | `src/pages/NewService/index.jsx` | - Refatorar formulário com novos inputs<br>- Atualizar botões e validações<br>- Adicionar feedback visual com novos alertas |
| **Costureiras** | `src/pages/Seamstresses/index.jsx` | - Refatorar listagem de costureiras<br>- Atualizar cards com nova identidade<br>- Adicionar status com Badge atualizado |
| **Capacidade** | `src/pages/Capacity/index.jsx` | - Refatorar visualização de carga<br>- Atualizar gráficos com nova paleta<br>- Adicionar cards de resumo |
| **Financeiro** | `src/pages/Financial/index.jsx` | - Refatorar visualização financeira<br>- Atualizar cards com novos estilos<br>- Adicionar ícones Lucide |

### Novas Páginas (Se Necessário)

| Página | Arquivo | Ações |
|--------|---------|-------|
| **Perfil** | `src/pages/Profile/index.jsx` | - Criar página de perfil do usuário<br>- Adicionar avatar e informações |

---

## 🐛 **Correção do Bug de Navegação do Sidebar**

### Problema Identificado
Ao clicar nos itens do menu Sidebar, a página não está navegando para as rotas correspondentes.

### Causa Provável
O Sidebar está usando `<a href="#">` em vez do componente `<NavLink>` ou `<Link>` do `react-router-dom`, ou os caminhos das rotas estão incorretos.

### Solução Proposta

| Ação | Detalhamento |
|------|--------------|
| **Substituir `<a>` por `<NavLink>`** | Usar `NavLink` do `react-router-dom` para navegação com estado ativo |
| **Verificar rotas** | Confirmar que os caminhos no Sidebar correspondem às rotas definidas no `App.jsx` |
| **Adicionar `to` prop** | Substituir `href` por `to` com o caminho correto |
| **Manter classe ativa** | Usar `className` com função para detectar rota ativa |

### Exemplo de Correção

**Antes:**
```jsx
<a href="#" className="sidebar-link">
  <Icon className="icon-md" />
  <span>Dashboard</span>
</a>
```

**Depois:**
```jsx
import { NavLink } from 'react-router-dom';

<NavLink 
  to="/" 
  className={({ isActive }) => 
    `sidebar-link ${isActive ? 'active' : ''}`
  }
>
  <Icon className="icon-md" />
  <span>Dashboard</span>
</NavLink>
```

### Rotas a Serem Verificadas

| Item do Menu | Rota Esperada | Componente |
|--------------|---------------|------------|
| Dashboard | `/` | Dashboard |
| Serviços | `/services` | Services |
| Costureiras | `/seamstresses` | Seamstresses |
| Capacidade | `/capacity` | Capacity |
| Financeiro | `/financial` | Financial |
| Configurações | `/settings` | Settings |

---

## ♿ **Acessibilidade - Camada de Requisitos**

### Prioritário para MVP1 (Implementação Básica)

| Item | Descrição | Critério de Aceite |
|------|-----------|-------------------|
| **Semântica HTML** | Uso correto de tags HTML5 | `<main>`, `<nav>`, `<section>`, `<header>`, `<aside>`, `<footer>` |
| **ARIA Labels** | Descrições para elementos interativos | `aria-label`, `aria-labelledby`, `aria-describedby` |
| **Controle de Foco** | Navegação por teclado | `tabindex`, `:focus` visível, `:focus-visible` |
| **Contraste** | Cores com contraste suficiente | Verificar contraste >= 4.5:1 para textos |
| **Alt Text** | Descrições para imagens | `alt` em todas as imagens |
| **Roles** | Papéis ARIA para componentes complexos | `role="navigation"`, `role="button"`, `role="status"` |

### Pendente para MVP2 (Validação)

| Item | Descrição | Critério de Aceite |
|------|-----------|-------------------|
| **Testes Automatizados** | Configurar axe-core ou Lighthouse CI | - |
| **Leitores de Tela** | Testar com NVDA, VoiceOver | - |
| **Navegação por Teclado** | Todas as interações via teclado | - |
| **Tamanho de Fonte** | Escalabilidade até 200% | - |
| **Validação com PCD** | Testes com usuários com deficiência | - |

---

## 📊 **Storybook - Atualização da Documentação**

### Novas Stories

| Categoria | Componente | Ações |
|-----------|------------|-------|
| **Tokens** | Cores | Documentar nova paleta com exemplos visuais |
| | Tipografia | Documentar nova escala tipográfica |
| | Animações | Documentar tokens de animação |
| | Sombras/Gradientes | Documentar tokens visuais |
| **Atoms** | Button (atualizado) | Atualizar story com novas variantes |
| | Input (atualizado) | Adicionar estados de acessibilidade |
| **Molecules** | SearchBar (atualizado) | Documentar com ícones |
| **Organisms** | Sidebar (atualizado) | Documentar com ícones e acessibilidade |
| | Footer (novo) | Criar story do Footer |
| **Pages** | Dashboard (refatorado) | Documentar página completa |

---

## 🎯 **Tarefas Detalhadas**

### Fase 1: Configuração e Tokens (2 dias)

| Tarefa | Responsável | Estimativa |
|--------|-------------|------------|
| Criar branch `feat@ux/STORY-M1-UX-005` | UX Lead | 0.5h |
| Atualizar `colors.js` com nova paleta | Frontend | 2h |
| Atualizar `typography.js` com Montserrat/Lato | Frontend | 1h |
| Criar `animations.js` com tokens de animação | Frontend | 1h |
| Atualizar `shadows.js` com gradientes | Frontend | 1h |
| Atualizar `tailwind.config.js` com novos tokens | Frontend | 2h |
| Validar tokens no Storybook | UX Lead | 2h |

### Fase 2: Refatoração de Átomos (3 dias)

| Tarefa | Responsável | Estimativa |
|--------|-------------|------------|
| Refatorar `Button` (cores, animações, acessibilidade) | Frontend | 4h |
| Refatorar `Input` (cores, estados, acessibilidade) | Frontend | 3h |
| Refatorar `Select` (cores, acessibilidade) | Frontend | 3h |
| Refatorar `Typography` (fontes, variantes) | Frontend | 2h |
| Refatorar `Card` (sombras, hover) | Frontend | 2h |
| Refatorar `Badge` (cores, novas variantes) | Frontend | 2h |
| Atualizar stories dos átomos | Frontend | 4h |

### Fase 3: Refatoração de Moléculas (2 dias)

| Tarefa | Responsável | Estimativa |
|--------|-------------|------------|
| Refatorar `SearchBar` (ícones, estilos) | Frontend | 3h |
| Refatorar `StatusFilter` (cores, acessibilidade) | Frontend | 2h |
| Refatorar `CostureiraTable` (cores, acessibilidade) | Frontend | 3h |
| Atualizar stories das moléculas | Frontend | 3h |

### Fase 4: Refatoração de Organismos (3 dias)

| Tarefa | Responsável | Estimativa |
|--------|-------------|------------|
| **Corrigir bug de navegação do Sidebar** | Frontend | 3h |
| Refatorar `Sidebar` (ícones Lucide, logo, acessibilidade) | Frontend | 4h |
| Refatorar `Header` (ícones Lucide, acessibilidade) | Frontend | 3h |
| Criar `Footer` (novo componente) | Frontend | 3h |
| Atualizar stories dos organismos | Frontend | 3h |

### Fase 5: Refatoração de Páginas (4 dias)

| Tarefa | Responsável | Estimativa |
|--------|-------------|------------|
| Refatorar página **Dashboard** com novos componentes | Frontend | 4h |
| Refatorar página **Serviços** (listagem, cards) | Frontend | 4h |
| Refatorar página **Novo Serviço** (formulário) | Frontend | 3h |
| Refatorar página **Costureiras** (listagem, cards) | Frontend | 4h |
| Refatorar página **Capacidade** (gráficos, cards) | Frontend | 4h |
| Refatorar página **Financeiro** (cards, dados) | Frontend | 3h |
| Testar navegação entre todas as páginas | Frontend | 2h |

### Fase 6: Acessibilidade e Testes (2 dias)

| Tarefa | Responsável | Estimativa |
|--------|-------------|------------|
| Configurar axe-core para testes automatizados | Frontend | 3h |
| Revisar contraste de todas as cores | UX Lead | 2h |
| Adicionar ARIA labels em componentes | Frontend | 3h |
| Testar navegação por teclado | QA | 3h |
| Documentar acessibilidade no Storybook | UX Lead | 2h |

### Fase 7: Documentação e Finalização (1 dia)

| Tarefa | Responsável | Estimativa |
|--------|-------------|------------|
| Atualizar documentação do Storybook | UX Lead | 3h |
| Criar guia de acessibilidade | UX Lead | 2h |
| Revisar PR e fazer merge | UX Lead | 2h |

---

## 📋 **Checklist de Entrega**

### Tokens
- [ ] `src/styles/tokens/colors.js` atualizado
- [ ] `src/styles/tokens/typography.js` atualizado
- [ ] `src/styles/tokens/animations.js` criado
- [ ] `src/styles/tokens/shadows.js` atualizado
- [ ] `tailwind.config.js` atualizado com novos tokens

### Componentes (Átomos)
- [ ] Button refatorado
- [ ] Input refatorado
- [ ] Select refatorado
- [ ] Typography refatorado
- [ ] Card refatorado
- [ ] Badge refatorado

### Componentes (Moléculas)
- [ ] SearchBar refatorado
- [ ] StatusFilter refatorado
- [ ] CostureiraTable refatorado

### Componentes (Organismos)
- [ ] Sidebar refatorado (bug corrigido)
- [ ] Header refatorado
- [ ] Footer criado

### Páginas (Refatoradas)
- [ ] Dashboard
- [ ] Serviços
- [ ] Novo Serviço
- [ ] Costureiras
- [ ] Capacidade
- [ ] Financeiro

### Acessibilidade (MVP1)
- [ ] Semântica HTML implementada
- [ ] ARIA labels adicionados
- [ ] Contraste validado (WCAG 2.1 AA)
- [ ] Alt text em imagens
- [ ] Controle de foco visível
- [ ] axe-core configurado

### Navegação
- [ ] Sidebar navegando corretamente (bug corrigido)
- [ ] Rotas verificadas e testadas
- [ ] Estado ativo no menu sidebar funcionando

### Storybook
- [ ] Stories atualizadas
- [ ] Documentação de tokens atualizada
- [ ] Guia de acessibilidade criado
- [ ] Exemplos interativos

### Documentação
- [ ] Documento de entrega criado (`4-delivery/STORY-M1-UX-005.md`)

---

## 🗓️ **Cronograma Estimado**

| Fase | Dias | Data Prevista |
|------|------|---------------|
| Fase 1: Configuração e Tokens | 2 | Dia 1-2 |
| Fase 2: Refatoração de Átomos | 3 | Dia 3-5 |
| Fase 3: Refatoração de Moléculas | 2 | Dia 6-7 |
| Fase 4: Refatoração de Organismos + Bug Fix | 3 | Dia 8-10 |
| Fase 5: Refatoração de Páginas | 4 | Dia 11-14 |
| Fase 6: Acessibilidade e Testes | 2 | Dia 15-16 |
| Fase 7: Documentação e Finalização | 1 | Dia 17 |

**Total Estimado:** 17 dias (~3.5 semanas)

---

## 🔗 **Links e Referências**

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Lucide React Icons](https://lucide.dev/guide/packages/lucide-react)
- [Storybook Accessibility Addon](https://storybook.js.org/addons/@storybook/addon-a11y)
- [React Router DOM](https://reactrouter.com/en/main)
- [axe-core](https://github.com/dequelabs/axe-core)

---

## ✅ **Próximos Passos**

1. Criar branch `feat@ux/STORY-M1-UX-005`
2. Iniciar Fase 1: Configuração e Tokens
3. Validar tokens no Storybook com a equipe
4. Prosseguir com refatoração dos componentes
5. **Prioridade:** Corrigir bug de navegação do Sidebar na Fase 4
6. Refatorar todas as páginas seguindo o padrão do Dashboard

---

**Status:** 📋 Planejado

**Data de Início Prevista:** [A definir]

**Data de Entrega Prevista:** [A definir]

---

*Documento criado em 13/07/2026 - Versão 2.0*