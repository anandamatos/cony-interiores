import {
  CheckCircle2,
  Circle,
  Eye,
  Keyboard,
  Link as LinkIcon,
  ShieldCheck,
  TestTube2,
} from 'lucide-react';

const doneIcon = <CheckCircle2 className="w-4 h-4 text-success" />;
const pendingIcon = <Circle className="w-4 h-4 text-warning" />;

export default {
  title: 'Guia/Acessibilidade',
  parameters: {
    docs: {
      description: {
        component:
          'Guia de referência para decisões de acessibilidade no Design System da Cony Interiores, com foco em WCAG 2.1 e práticas de implementação.',
      },
    },
  },
};

export const Acessibilidade = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-primary mb-6 inline-flex items-center gap-2">
      <ShieldCheck className="w-7 h-7" />
      Guia de Acessibilidade
    </h1>
    <p className="text-lg text-taupe mb-8">
      Regras práticas para manter componentes e páginas inclusivos, legíveis e operáveis em diferentes contextos de uso.
    </p>

    <hr className="my-8 border-gray" />

    <h2 className="text-2xl font-bold text-primary mb-4">WCAG 2.1 - Níveis de Conformidade</h2>
    <p className="text-gray-600 mb-4">
      O projeto adota a <strong>WCAG 2.1</strong> como base para critérios de contraste, navegação, semântica e uso de tecnologias assistivas.
    </p>

    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-offWhite">
            <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-gray">Nível</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-gray">Descrição</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-gray">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray/50">
            <td className="px-4 py-3 text-sm"><strong>A</strong></td>
            <td className="px-4 py-3 text-sm">Requisitos essenciais de acessibilidade</td>
            <td className="px-4 py-3 text-sm inline-flex items-center gap-2">{doneIcon} Concluído</td>
          </tr>
          <tr className="border-b border-gray/50">
            <td className="px-4 py-3 text-sm"><strong>AA</strong></td>
            <td className="px-4 py-3 text-sm">Requisitos recomendados para produção</td>
            <td className="px-4 py-3 text-sm inline-flex items-center gap-2">{doneIcon} Concluído (MVP1)</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm"><strong>AAA</strong></td>
            <td className="px-4 py-3 text-sm">Critérios avançados e evolutivos</td>
            <td className="px-4 py-3 text-sm inline-flex items-center gap-2">{pendingIcon} Planejado (MVP2)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr className="my-8 border-gray" />

    <h2 className="text-2xl font-bold text-primary mb-4">Princípios de Acessibilidade</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="p-4 bg-offWhite rounded-lg border border-gray">
        <h3 className="font-bold text-primary mb-2 inline-flex items-center gap-2"><Eye className="w-4 h-4" /> Perceptível</h3>
        <p className="text-sm text-gray-600">Conteúdo e interface devem ser percebidos por diferentes perfis de usuário.</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li className="inline-flex items-center gap-2">{doneIcon} Contraste WCAG AA</li>
          <li className="inline-flex items-center gap-2">{doneIcon} Textos alternativos</li>
          <li className="inline-flex items-center gap-2">{doneIcon} Legendas em gráficos</li>
        </ul>
      </div>
      <div className="p-4 bg-offWhite rounded-lg border border-gray">
        <h3 className="font-bold text-primary mb-2 inline-flex items-center gap-2"><Keyboard className="w-4 h-4" /> Operável</h3>
        <p className="text-sm text-gray-600">Fluxos devem funcionar com teclado, foco visível e tempo de interação adequado.</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li className="inline-flex items-center gap-2">{doneIcon} Navegação por teclado</li>
          <li className="inline-flex items-center gap-2">{doneIcon} Foco visível</li>
          <li className="inline-flex items-center gap-2">{doneIcon} Interações com tempo adequado</li>
        </ul>
      </div>
      <div className="p-4 bg-offWhite rounded-lg border border-gray">
        <h3 className="font-bold text-primary mb-2">Compreensível</h3>
        <p className="text-sm text-gray-600">Textos, labels e feedbacks devem ser claros para reduzir ambiguidade.</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li className="inline-flex items-center gap-2">{doneIcon} Linguagem direta</li>
          <li className="inline-flex items-center gap-2">{doneIcon} Labels descritivos</li>
          <li className="inline-flex items-center gap-2">{doneIcon} Feedback contextual</li>
        </ul>
      </div>
      <div className="p-4 bg-offWhite rounded-lg border border-gray">
        <h3 className="font-bold text-primary mb-2">Robusto</h3>
        <p className="text-sm text-gray-600">Componentes devem ser compatíveis com leitores de tela e padrões semânticos.</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li className="inline-flex items-center gap-2">{doneIcon} Semântica HTML</li>
          <li className="inline-flex items-center gap-2">{doneIcon} ARIA roles e labels</li>
          <li className="inline-flex items-center gap-2">{doneIcon} Compatibilidade assistiva</li>
        </ul>
      </div>
    </div>

    <hr className="my-8 border-gray" />

    <h2 className="text-2xl font-bold text-primary mb-4">Boas Práticas de Implementação</h2>

    <h3 className="text-lg font-semibold text-primary mb-2">Semântica HTML</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
        <p className="text-sm font-semibold text-success mb-2 inline-flex items-center gap-2">{doneIcon} Correto</p>
        <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
{`<main role="main">
  <section aria-label="Estatísticas">
    <h1>Título da Página</h1>
  </section>
</main>`}
        </pre>
      </div>
      <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
        <p className="text-sm font-semibold text-danger mb-2 inline-flex items-center gap-2"><Circle className="w-4 h-4 text-danger" /> Evitar</p>
        <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
{`<div class="main">
  <div class="section">
    <div class="title">Título da Página</div>
  </div>
</div>`}
        </pre>
      </div>
    </div>

    <h3 className="text-lg font-semibold text-primary mb-2">ARIA Labels</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
        <p className="text-sm font-semibold text-success mb-2 inline-flex items-center gap-2">{doneIcon} Correto</p>
        <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
{`<button aria-label="Fechar menu" onClick={closeMenu}>
  <X />
</button>`}
        </pre>
      </div>
      <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
        <p className="text-sm font-semibold text-danger mb-2 inline-flex items-center gap-2"><Circle className="w-4 h-4 text-danger" /> Evitar</p>
        <pre className="text-xs bg-white p-2 rounded overflow-x-auto">
{`<button onClick={closeMenu}>
  <X />
</button>`}
        </pre>
      </div>
    </div>

    <hr className="my-8 border-gray" />

    <h2 className="text-2xl font-bold text-primary mb-4 inline-flex items-center gap-2">
      <TestTube2 className="w-6 h-6" />
      Ferramentas de Teste
    </h2>
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-offWhite">
            <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-gray">Ferramenta</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-gray">Uso</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-primary border-b border-gray">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray/50">
            <td className="px-4 py-3 text-sm"><strong>axe-core</strong></td>
            <td className="px-4 py-3 text-sm">Testes automatizados</td>
            <td className="px-4 py-3 text-sm inline-flex items-center gap-2">{doneIcon} Configurado</td>
          </tr>
          <tr className="border-b border-gray/50">
            <td className="px-4 py-3 text-sm"><strong>Storybook a11y</strong></td>
            <td className="px-4 py-3 text-sm">Validação de componentes</td>
            <td className="px-4 py-3 text-sm inline-flex items-center gap-2">{doneIcon} Configurado</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm"><strong>Lighthouse / VoiceOver</strong></td>
            <td className="px-4 py-3 text-sm">Validação de páginas e tecnologias assistivas</td>
            <td className="px-4 py-3 text-sm inline-flex items-center gap-2">{pendingIcon} MVP2</td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr className="my-8 border-gray" />

    <h2 className="text-2xl font-bold text-primary mb-4">Checklist de Prioridade</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
        <h3 className="font-bold text-success mb-2">MVP1 Concluído</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li className="inline-flex items-center gap-2">{doneIcon} Semântica HTML</li>
          <li className="inline-flex items-center gap-2">{doneIcon} ARIA labels e roles</li>
          <li className="inline-flex items-center gap-2">{doneIcon} Contraste WCAG AA</li>
          <li className="inline-flex items-center gap-2">{doneIcon} Navegação por teclado</li>
        </ul>
      </div>
      <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
        <h3 className="font-bold text-warning mb-2">MVP2 Planejado</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li className="inline-flex items-center gap-2">{pendingIcon} Testes com leitores de tela</li>
          <li className="inline-flex items-center gap-2">{pendingIcon} Testes com usuários</li>
          <li className="inline-flex items-center gap-2">{pendingIcon} Escalabilidade de fonte em 200%</li>
          <li className="inline-flex items-center gap-2">{pendingIcon} Validação AAA</li>
        </ul>
      </div>
    </div>

    <hr className="my-8 border-gray" />

    <h2 className="text-2xl font-bold text-primary mb-4 inline-flex items-center gap-2">
      <LinkIcon className="w-6 h-6" />
      Referências
    </h2>
    <ul className="space-y-2 text-sm text-gray-600">
      <li><a href="https://www.w3.org/WAI/WCAG21/quickref/" className="text-primary hover:underline">WCAG 2.1 Quick Reference</a></li>
      <li><a href="https://github.com/dequelabs/axe-core" className="text-primary hover:underline">axe-core Documentation</a></li>
      <li><a href="https://storybook.js.org/addons/@storybook/addon-a11y" className="text-primary hover:underline">Storybook Accessibility Addon</a></li>
      <li><a href="https://www.w3.org/WAI/ARIA/apg/" className="text-primary hover:underline">WAI-ARIA Authoring Practices</a></li>
    </ul>

    <hr className="my-8 border-gray" />

    <div className="text-center text-taupe">
      <p><strong>Status:</strong> Documentado e parcialmente implementado (MVP1).</p>
      <p className="text-sm">Próximo ciclo: validação prática com ferramentas e usuários (MVP2).</p>
    </div>
  </div>
);

Acessibilidade.storyName = 'Guia de Acessibilidade';