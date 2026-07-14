export default {
  title: 'Guia/Acessibilidade',
  parameters: {
    docs: {
      description: {
        component: 'Diretrizes e boas práticas para garantir que o Design System seja inclusivo e acessível para todos os usuários.',
      },
    },
  },
};

export const Acessibilidade = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-primary mb-6">♿ Guia de Acessibilidade</h1>
    <p className="text-lg text-taupe mb-8">
      Diretrizes e boas práticas para garantir que o Design System seja inclusivo e acessível para todos os usuários.
    </p>

    <hr className="my-8 border-gray" />

    <h2 className="text-2xl font-bold text-primary mb-4">📋 WCAG 2.1 - Níveis de Conformidade</h2>
    <p className="text-gray-600 mb-4">
      O Design System da Cony Interiores segue as diretrizes da <strong>WCAG 2.1</strong> (Web Content Accessibility Guidelines) para garantir acessibilidade digital.
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
            <td className="px-4 py-3 text-sm">Requisitos básicos de acessibilidade</td>
            <td className="px-4 py-3 text-sm"><span className="text-success">✅ Concluído</span></td>
          </tr>
          <tr className="border-b border-gray/50">
            <td className="px-4 py-3 text-sm"><strong>AA</strong></td>
            <td className="px-4 py-3 text-sm">Requisitos intermediários</td>
            <td className="px-4 py-3 text-sm"><span className="text-success">✅ Concluído (MVP1)</span></td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-sm"><strong>AAA</strong></td>
            <td className="px-4 py-3 text-sm">Requisitos avançados</td>
            <td className="px-4 py-3 text-sm"><span className="text-warning">⬜ Pendente (MVP2)</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <hr className="my-8 border-gray" />

    <h2 className="text-2xl font-bold text-primary mb-4">🎯 Princípios da Acessibilidade</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="p-4 bg-offWhite rounded-lg border border-gray">
        <h3 className="font-bold text-primary mb-2">1. Perceptível</h3>
        <p className="text-sm text-gray-600">Informações e componentes da interface devem ser apresentados de forma que todos possam perceber.</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li>✅ Contraste de cores (WCAG AA)</li>
          <li>✅ Textos alternativos para imagens</li>
          <li>✅ Legendas para gráficos</li>
        </ul>
      </div>
      <div className="p-4 bg-offWhite rounded-lg border border-gray">
        <h3 className="font-bold text-primary mb-2">2. Operável</h3>
        <p className="text-sm text-gray-600">A interface deve ser navegável e utilizável por todos.</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li>✅ Navegação por teclado</li>
          <li>✅ Foco visível</li>
          <li>✅ Tempo suficiente para interações</li>
        </ul>
      </div>
      <div className="p-4 bg-offWhite rounded-lg border border-gray">
        <h3 className="font-bold text-primary mb-2">3. Compreensível</h3>
        <p className="text-sm text-gray-600">A informação e a operação da interface devem ser compreensíveis.</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li>✅ Linguagem clara e simples</li>
          <li>✅ Labels descritivos</li>
          <li>✅ Feedback claro para ações</li>
        </ul>
      </div>
      <div className="p-4 bg-offWhite rounded-lg border border-gray">
        <h3 className="font-bold text-primary mb-2">4. Robusto</h3>
        <p className="text-sm text-gray-600">A interface deve funcionar com diferentes tecnologias assistivas.</p>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li>✅ Semântica HTML</li>
          <li>✅ ARIA roles e labels</li>
          <li>✅ Compatível com leitores de tela</li>
        </ul>
      </div>
    </div>

    <hr className="my-8 border-gray" />

    <h2 className="text-2xl font-bold text-primary mb-4">📝 Checklist de Acessibilidade</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
        <h3 className="font-bold text-success mb-2">Prioridade MVP1 (✅ Concluído)</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>✅ Semântica HTML (main, nav, section, header, footer, aside)</li>
          <li>✅ ARIA labels em elementos interativos</li>
          <li>✅ ARIA roles para navegação (role="navigation")</li>
          <li>✅ Contraste de cores WCAG 2.1 AA</li>
          <li>✅ Alt text em imagens</li>
          <li>✅ Foco visível (:focus, :focus-visible)</li>
          <li>✅ Navegação por teclado</li>
          <li>✅ axe-core configurado</li>
          <li>✅ Storybook a11y addon</li>
        </ul>
      </div>
      <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
        <h3 className="font-bold text-warning mb-2">Prioridade MVP2 (⬜ Pendente)</h3>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>⬜ Testes com leitores de tela (NVDA, VoiceOver)</li>
          <li>⬜ Testes com usuários com deficiência</li>
          <li>⬜ Escalabilidade de fonte até 200%</li>
          <li>⬜ Lighthouse CI configurado</li>
          <li>⬜ Validação WCAG 2.1 AAA</li>
          <li>⬜ Certificação de acessibilidade</li>
        </ul>
      </div>
    </div>

    <hr className="my-8 border-gray" />

    <div className="text-center text-taupe">
      <p><strong>Status:</strong> ✅ Documentado e Parcialmente Implementado (MVP1)</p>
      <p className="text-sm">Próximos Passos: Validação com usuários e ferramentas especializadas (MVP2)</p>
    </div>
  </div>
);

Acessibilidade.storyName = 'Guia de Acessibilidade';