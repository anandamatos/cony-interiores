# 📋 **STORY-M1-UX-004: Design System com Storybook**

**Título do Documento:** `STORY-M1-UX-004-storybook-design-system.md`

**Status:** ✅ Concluído

**Data de Criação:** 12/07/2026

**Última Atualização:** 12/07/2026

**Versão:** 1.0

---

## 🎯 Objetivo da Story

Criar e documentar o Design System da Cony Interiores usando Storybook, com componentes alinhados à identidade visual da marca, servindo como fonte única de verdade para todo o time.

---

## 👥 Squad Responsável

**UX & Experience Squad**
- **Líder de UX:** Ananda Matos
- **Frontend:** Gabriel (STORY-M1-UX-002)
- **Design:** Equipe de Design

---

## 📌 Definition of Done (DoD)

### Critérios de Conclusão
- [x] Storybook instalado e configurado (v8.6.18)
- [x] Tokens de design criados (cores, tipografia, espaçamento, sombras)
- [x] Integração com Tailwind CSS estabelecida
- [x] 6 Átomos documentados e interativos
- [x] 3 Moléculas documentadas e interativas
- [x] 3 Organismos documentados e interativos
- [x] Página de introdução criada
- [x] Documentação completa no Storybook
- [x] Merge na branch main

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| Storybook | 8.6.18 | Documentação de componentes |
| React | 18.3.1 | Biblioteca de UI |
| Vite | 6.4.3 | Build tool e dev server |
| Tailwind CSS | 3.4.4 | Framework de estilos |
| PostCSS | 8.4.38 | Processador CSS |
| Lucide React | 0.400.0 | Ícones |

---

## 📁 Estrutura do Projeto

```
frontend/
├── .storybook/
│   ├── main.js              # Configuração principal do Storybook
│   └── preview.js           # Configuração de preview e decorators
├── src/
│   ├── components/
│   │   ├── atoms/           # 6 componentes atômicos
│   │   │   ├── Badge/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Input/
│   │   │   ├── Select/
│   │   │   └── Typography/
│   │   ├── molecules/       # 3 componentes moleculares
│   │   │   ├── CostureiraTable/
│   │   │   ├── SearchBar/
│   │   │   └── StatusFilter/
│   │   └── organisms/       # 3 componentes orgânicos
│   │       ├── Footer/
│   │       ├── Header/
│   │       └── Sidebar/
│   ├── stories/
│   │   ├── atoms/           # Stories dos átomos
│   │   ├── molecules/       # Stories das moléculas
│   │   ├── organisms/       # Stories dos organismos
│   │   ├── tokens/          # Documentação dos tokens
│   │   └── Introduction.stories.jsx
│   └── styles/
│       └── tokens/          # Tokens de design em JS
│           ├── colors.js
│           ├── shadows.js
│           ├── spacing.js
│           └── typography.js
├── tailwind.config.js       # Configuração do Tailwind
└── package.json
```

---

## 🧩 Componentes Criados

### 🔘 Átomos (6)

| Componente | Descrição | Variantes |
|------------|-----------|-----------|
| **Button** | Botões interativos | primary, secondary, danger, ghost |
| **Input** | Campos de entrada | text, email, password, number, date |
| **Select** | Menu de seleção | Com/sem label, com erro |
| **Card** | Container de conteúdo | Com hover, com imagem |
| **Badge** | Etiquetas de status | primary, secondary, success, warning, danger, neutral |
| **Typography** | Elementos tipográficos | h1-h6, body, caption |

### 🧬 Moléculas (3)

| Componente | Descrição |
|------------|-----------|
| **SearchBar** | Barra de pesquisa com ícone e estados |
| **StatusFilter** | Filtro de status com botões interativos |
| **CostureiraTable** | Tabela de dados com status e ordenação |

### 🧠 Organismos (3)

| Componente | Descrição |
|------------|-----------|
| **Header** | Cabeçalho da aplicação com navegação |
| **Sidebar** | Menu lateral com navegação |
| **Footer** | Rodapé com links e informações |

---

## 🎨 Tokens de Design

### Cores (colors.js)

```javascript
export const colors = {
  primary: {
    50: '#e8f5e9', 100: '#c8e6c9', 200: '#a5d6a7',
    300: '#81c784', 400: '#66bb6a', 500: '#4caf50',
    600: '#43a047', 700: '#388e3c', 800: '#2e7d32',
    900: '#1b5e20'
  },
  secondary: {
    50: '#fff3e0', 100: '#ffe0b2', 200: '#ffcc80',
    300: '#ffb74d', 400: '#ffa726', 500: '#ff9800',
    600: '#fb8c00', 700: '#f57c00', 800: '#ef6c00',
    900: '#e65100'
  },
  neutral: {
    50: '#fafafa', 100: '#f5f5f5', 200: '#eeeeee',
    300: '#e0e0e0', 400: '#bdbdbd', 500: '#9e9e9e',
    600: '#757575', 700: '#616161', 800: '#424242',
    900: '#212121'
  },
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#2196f3'
};
```

### Tipografia (typography.js)

```javascript
export const typography = {
  fonts: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    secondary: '"Playfair Display", Georgia, serif'
  },
  sizes: {
    xs: '0.75rem', sm: '0.875rem', base: '1rem',
    lg: '1.125rem', xl: '1.25rem', '2xl': '1.5rem',
    '3xl': '1.875rem', '4xl': '2.25rem', '5xl': '3rem'
  },
  weights: {
    thin: '100', light: '300', normal: '400',
    medium: '500', semibold: '600', bold: '700',
    extrabold: '800'
  }
};
```

### Espaçamento (spacing.js)

```javascript
export const spacing = {
  0: '0px', 1: '4px', 2: '8px', 3: '12px',
  4: '16px', 5: '20px', 6: '24px', 8: '32px',
  10: '40px', 12: '48px', 16: '64px', 20: '80px',
  24: '96px', 32: '128px', 40: '160px', 48: '192px',
  56: '224px', 64: '256px'
};
```

### Sombras (shadows.js)

```javascript
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)'
};
```

---

## 🚀 Como Executar

### 1. Instalar dependências
```bash
cd frontend
npm install
```

### 2. Rodar o Storybook
```bash
npm run storybook
```

### 3. Acessar no navegador
```
http://localhost:6006/
```

### 4. Build para produção
```bash
npm run build-storybook
```

---

## 📝 Como Usar os Componentes

### Exemplo: Button

```jsx
import Button from '@/components/atoms/Button';

function MyComponent() {
  return (
    <Button variant="primary" size="md">
      Clique aqui
    </Button>
  );
}
```

### Exemplo: Importando Tokens

```jsx
import { colors } from '@/styles/tokens/colors';
import { typography } from '@/styles/tokens/typography';

const MyComponent = () => (
  <div style={{ color: colors.primary[500], fontSize: typography.sizes.lg }}>
    Texto com cor primária e tamanho grande
  </div>
);
```

---

## 🎯 Padrões e Boas Práticas

### Estrutura de Componentes

```
ComponentName/
├── index.jsx          # Componente principal
└── index.stories.jsx  # Documentação Storybook
```

### Nomenclatura

- **Atoms**: Nomes simples (Button, Input, Card)
- **Molecules**: Nomes compostos (SearchBar, StatusFilter)
- **Organisms**: Nomes de estrutura (Header, Sidebar, Footer)

### Props Padrão

```jsx
Component.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
```

---

## 📚 Documentação no Storybook

### Páginas Disponíveis

1. **Introdução** - Visão geral do Design System
2. **Tokens/Cores** - Paleta de cores da Cony
3. **Tokens/Tipografia** - Sistema tipográfico
4. **Tokens/Espaçamento** - Escala de espaçamento
5. **Atoms/** - Todos os átomos documentados
6. **Molecules/** - Todas as moléculas documentadas
7. **Organisms/** - Todos os organismos documentados

### Recursos do Storybook

- **Controles**: Altere props em tempo real
- **Actions**: Veja eventos disparados
- **Docs**: Documentação automática
- **Interações**: Teste componentes interativamente

---

## 🔧 Manutenção e Contribuição

### Adicionando um Novo Componente

1. Criar componente na pasta correta (`atoms/`, `molecules/`, `organisms/`)
2. Criar story em `src/stories/[categoria]/Nome.stories.jsx`
3. Documentar com `argTypes` e variações
4. Testar interatividade no Storybook

### Atualizando Tokens

1. Modificar arquivos em `src/styles/tokens/`
2. As mudanças são refletidas automaticamente
3. Atualizar documentação no Storybook

### Style Guide

- Use **Tailwind CSS** para estilização
- Siga o **Atomic Design** para organização
- Documente todas as **props** com `argTypes`
- Mantenha **stories interativas**

---

## 🐛 Solução de Problemas

### Erro: Cannot find module @rollup/rollup-darwin-x64
```bash
npm install -D @rollup/rollup-darwin-x64 --force
rm -rf node_modules/.vite node_modules/.cache
npm run storybook
```

### Erro: ESLint no commit
```bash
git commit -m "mensagem" --no-verify
```

### Erro: Tailwind não carregando
```bash
npm install -D tailwindcss@3.4.4 postcss@8.4.38 autoprefixer@10.4.19
```

---

## 📊 Métricas e Status

| Métrica | Valor |
|---------|-------|
| Componentes criados | 12 |
| Tokens de design | 4 |
| Stories documentadas | 15+ |
| Cobertura de componentes | 100% |
| Tempo de desenvolvimento | ~2 semanas |
| Merges na main | 1 |

---
```bash
# Atualizar a documentação com o novo tópico
code /Users/am/projects/cony/docs/4-delivery/STORY-M1-UX-004-storybook-design-system.md
```

Adicione o seguinte tópico **antes** de "Links Úteis" (ou no final do documento):

---

## 📖 **Glossário e Referências para Novos Membros**

Bem-vindo ao time! Se esta é a primeira vez que você entra em contato com alguns dos conceitos apresentados nesta entrega, não se preocupe. Abaixo você encontra uma lista de termos, definições e referências para acelerar seu aprendizado.

---

### 🧠 **Conceitos Fundamentais**

#### **1. Design System**
Um **Design System** é um conjunto de padrões, componentes e diretrizes que garantem consistência visual e funcional em toda a interface de um produto. Ele funciona como a "fonte única de verdade" para designers e desenvolvedores.

- **Objetivo**: Reduzir retrabalho, garantir consistência e acelerar o desenvolvimento.
- **Componentes**: Inclui tokens (cores, tipografia), componentes (botões, inputs) e padrões de uso.

📚 **Referência**: [Design Systems 101 (Figma)](https://www.figma.com/resource-library/what-is-a-design-system/)

---

#### **2. Atomic Design**
Metodologia criada por Brad Frost que organiza a interface em 5 níveis hierárquicos, inspirados na química:

| Nível | Descrição | Exemplo |
|-------|-----------|---------|
| **Átomos** | Componentes básicos e indivisíveis | Button, Input, Label |
| **Moléculas** | Combinações de átomos | SearchBar (Input + Button) |
| **Organismos** | Grupos de moléculas formando seções | Header, Sidebar, Footer |
| **Templates** | Estruturas de página sem conteúdo | Layout da página de listagem |
| **Páginas** | Templates com conteúdo real | Página de Dashboard |

📚 **Referência**: [Atomic Design (Brad Frost)](https://bradfrost.com/blog/post/atomic-web-design/)

---

#### **3. Storybook**
**Storybook** é uma ferramenta open-source para desenvolvimento e documentação de componentes UI de forma isolada. Ele permite:

- Visualizar componentes em diferentes estados
- Testar interações e variações
- Documentar automaticamente
- Compartilhar com a equipe

📚 **Referência**: [Storybook Official Docs](https://storybook.js.org/docs)

---

#### **4. Tokens de Design**
**Tokens** são as variáveis que armazenam decisões de design em código (cores, tipografia, espaçamento). Eles garantem consistência e facilitam manutenção.

```javascript
// Exemplo de token
colors.primary[500] = '#4caf50'  // Verde Cony
typography.sizes.lg = '1.125rem'
spacing[4] = '16px'
```

📚 **Referência**: [Design Tokens (W3C)](https://design-tokens.github.io/community-group/format/)

---

#### **5. Tailwind CSS**
**Tailwind** é um framework CSS utilitário que permite estilizar componentes diretamente no HTML usando classes pré-definidas.

```jsx
// Exemplo Tailwind
<button className="bg-primary text-white px-4 py-2 rounded-lg">
  Clique aqui
</button>
```

📚 **Referência**: [Tailwind CSS Docs](https://tailwindcss.com/docs)

---

#### **6. Hot Module Replacement (HMR)**
O **HMR** é uma funcionalidade que permite atualizar módulos em tempo real sem recarregar a página inteira. No Storybook, quando você salva um arquivo, as mudanças aparecem instantaneamente no navegador.

📚 **Referência**: [Vite HMR Guide](https://vitejs.dev/guide/api-hmr.html)

---

#### **7. Componente Interativo**
Um componente é considerado **interativo** quando o usuário pode:

- Alterar suas propriedades em tempo real (via controles do Storybook)
- Ver feedback visual (hover, click, disabled)
- Testar diferentes estados (loading, error, success)

---

### 🔗 **Links e Referências Recomendadas**

#### **Documentação Oficial**
| Recurso | Link | Descrição |
|---------|------|-----------|
| **Storybook** | [storybook.js.org](https://storybook.js.org) | Documentação completa do Storybook |
| **React** | [react.dev](https://react.dev) | Documentação oficial do React |
| **Tailwind CSS** | [tailwindcss.com](https://tailwindcss.com) | Guia de estilos e utilitários |
| **Vite** | [vitejs.dev](https://vitejs.dev) | Build tool e dev server |
| **Atomic Design** | [bradfrost.com](https://bradfrost.com/blog/post/atomic-web-design/) | Artigo original do Brad Frost |

#### **Cursos e Tutoriais**
| Recurso | Descrição |
|---------|-----------|
| [Storybook Tutorial](https://storybook.js.org/tutorials/) | Tutorial interativo do Storybook |
| [Tailwind CSS Playground](https://play.tailwindcss.com/) | Teste classes em tempo real |
| [React Crash Course](https://react.dev/learn) | Aprenda React do zero |

#### **Ferramentas Utilizadas no Projeto**
| Ferramenta | Versão | Descrição |
|------------|--------|-----------|
| **Storybook** | 8.6.18 | Documentação de componentes |
| **React** | 18.3.1 | Biblioteca de UI |
| **Vite** | 6.4.3 | Build tool e dev server |
| **Tailwind CSS** | 3.4.4 | Framework de estilos |
| **PostCSS** | 8.4.38 | Processador CSS |
| **Lucide React** | 0.400.0 | Ícones |
| **ESLint** | 8.57.0 | Linter de código |

---

### 🛠️ **Como Começar no Projeto**

Se você é novo no time e quer começar a contribuir com o Design System:

#### **Passo 1: Configurar o ambiente**
```bash
# Clonar o repositório
git clone https://github.com/anandamatos/cony-interiores.git
cd cony-interiores/frontend

# Instalar dependências
npm install

# Rodar o Storybook
npm run storybook
```

#### **Passo 2: Explorar o Storybook**
Acesse `http://localhost:6006/` e navegue pelos componentes:
1. **Introdução** - Visão geral
2. **Tokens/** - Cores, tipografia, espaçamento
3. **Atoms/** - Componentes básicos
4. **Molecules/** - Combinações de átomos
5. **Organisms/** - Componentes complexos

#### **Passo 3: Criar seu primeiro componente**
Siga o guia em [Manutenção e Contribuição](#-manutenção-e-contribuição) para adicionar um novo componente.

#### **Passo 4: Dúvidas?**
- Verifique o [Glossário](#-conceitos-fundamentais)
- Consulte os [Links Úteis](#-links-úteis)
- Pergunte no canal do time no Discord/Slack

---

### 📚 **Leitura Recomendada para Aprofundamento**

| Tópico | Link | Tempo estimado |
|--------|------|----------------|
| Design Systems | [Design Systems Handbook](https://www.designbetter.co/design-systems-handbook) | 2h |
| Atomic Design | [Atomic Design Book](https://atomicdesign.bradfrost.com/) | 4h |
| Storybook | [Storybook Docs](https://storybook.js.org/docs) | 1h |
| React Patterns | [React Patterns](https://reactpatterns.com/) | 1h |
| Tailwind CSS | [Tailwind Docs](https://tailwindcss.com/docs) | 2h |

---

### 🆘 **Perguntas Frequentes**

**Q: O que é um Token de Design?**
A: São variáveis que armazenam decisões de design como cores, tamanhos e espaçamentos. Eles são a base do Design System.

**Q: Por que usar Storybook em vez de apenas código?**
A: O Storybook permite visualizar, testar e documentar componentes de forma isolada, facilitando o desenvolvimento e a comunicação com a equipe.

**Q: O que significa HMR no Storybook?**
A: Hot Module Replacement - quando você salva um arquivo, o Storybook atualiza automaticamente no navegador sem recarregar a página.

**Q: Como sei onde colocar um novo componente?**
A: Use o Atomic Design como guia:
- **Átomo**: Se é um componente básico e independente
- **Molécula**: Se combina 2+ átomos
- **Organismo**: Se é uma seção complexa da interface

**Q: Posso usar os componentes do Storybook no projeto principal?**
A: Sim! Os componentes estão na pasta `src/components/` e podem ser importados em qualquer lugar do frontend.

---

### 💡 **Dica para Novos Membros**

1. **Comece pelo Storybook**: Explore todos os componentes antes de codificar
2. **Pratique com os controles**: Altere props para entender o comportamento
3. **Leia os tokens**: Entenda as cores e tipografia da marca
4. **Pergunte**: Não tenha medo de perguntar no time!

---

**🎯 Resumo:** O Design System da Cony Interiores está pronto para ser usado e expandido. Todos os componentes estão documentados no Storybook e seguem os padrões de Atomic Design. A documentação está sempre disponível e atualizada.

---

> 💡 **Nota:** Este glossário será atualizado conforme novos conceitos forem introduzidos no projeto. Sugestões são bem-vindas!
----
## 📎 Links Úteis

- **Storybook**: http://localhost:6006/
- **GitHub**: https://github.com/anandamatos/cony-interiores
- **Documentação Storybook**: https://storybook.js.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Pull Request**: #196

---

## ✅ Checklist de Conclusão

- [x] Storybook instalado e configurado
- [x] Tokens de design criados
- [x] 6 Átomos documentados
- [x] 3 Moléculas documentadas
- [x] 3 Organismos documentados
- [x] Página de introdução criada
- [x] Integração com Tailwind CSS
- [x] Componentes interativos
- [x] Documentação completa
- [x] Merge na main

---

## 📋 Próximos Passos

1. Validar com o cliente (MVP2)
2. Adicionar novos componentes conforme necessidade
3. Manter documentação atualizada
4. Realizar testes de usabilidade

---

**Status:** ✅ **Concluído**

**Data de Entrega:** 12/07/2026

**Versão:** 1.0

**Responsável:** UX & Experience Squad

---

*Documentação criada em Julho 2026 - Versão 1.0*