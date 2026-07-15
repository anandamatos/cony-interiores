import {
  BookOpen,
  Component,
  Layers,
  Palette,
  PenSquare,
  Ruler,
  Sparkles,
} from 'lucide-react';

export default {
  title: "Introdução",
  parameters: {
    docs: {
      description: {
        component:
          'Guia de entrada do Design System da Cony Interiores com princípios, navegação de tokens e biblioteca de componentes.',
      },
    },
  },
};

export const BemVindo = () => (
  <div className="p-8 max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold text-primary mb-4 inline-flex items-center gap-3">
      <BookOpen className="w-8 h-8" />
      Design System Cony Interiores
    </h1>
    <p className="text-lg text-gray-600 mb-8">
      Referência visual e técnica para construir interfaces consistentes, acessíveis e alinhadas com o produto.
    </p>

    <hr className="my-8 border-gray-200" />

    <h2 className="text-2xl font-bold mb-4 inline-flex items-center gap-2">
      <Sparkles className="w-6 h-6" />
      Sobre o Projeto
    </h2>
    <p className="text-gray-600 mb-4">
      Este Design System organiza decisões de UI para reduzir retrabalho, acelerar entrega e manter previsibilidade entre páginas e componentes.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="mb-2 text-primary">
          <Component className="w-7 h-7" />
        </div>
        <h3 className="font-bold">React</h3>
        <p className="text-sm text-gray-600">Base de componentes da interface.</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="mb-2 text-primary">
          <Palette className="w-7 h-7" />
        </div>
        <h3 className="font-bold">Tailwind CSS</h3>
        <p className="text-sm text-gray-600">Camada utilitária orientada a tokens.</p>
      </div>
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="mb-2 text-primary">
          <Layers className="w-7 h-7" />
        </div>
        <h3 className="font-bold">Storybook</h3>
        <p className="text-sm text-gray-600">Ambiente de documentação e validação visual.</p>
      </div>
    </div>

    <hr className="my-8 border-gray-200" />

    <h2 className="text-2xl font-bold mb-4 inline-flex items-center gap-2">
      <Palette className="w-6 h-6" />
      Tokens de Design
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-bold text-green-700 inline-flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Cores
        </h3>
        <p className="text-sm text-gray-600">Paleta de cores da Cony Interiores</p>
        <a href="?path=/story/tokens-cores" className="text-sm text-primary hover:underline">
          Ver cores →
        </a>
      </div>
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="font-bold text-blue-700 inline-flex items-center gap-2">
          <PenSquare className="w-4 h-4" />
          Tipografia
        </h3>
        <p className="text-sm text-gray-600">Sistema tipográfico com Inter e Playfair Display</p>
        <a href="?path=/story/tokens-tipografia" className="text-sm text-primary hover:underline">
          Ver tipografia →
        </a>
      </div>
      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
        <h3 className="font-bold text-purple-700 inline-flex items-center gap-2">
          <Ruler className="w-4 h-4" />
          Espaçamento
        </h3>
        <p className="text-sm text-gray-600">Escala baseada em múltiplos de 4px</p>
        <a
          href="?path=/story/tokens-espa%C3%A7amento"
          className="text-sm text-primary hover:underline"
        >
          Ver espaçamento →
        </a>
      </div>
    </div>

    <hr className="my-8 border-gray-200" />

    <h2 className="text-2xl font-bold mb-4 inline-flex items-center gap-2">
      <Component className="w-6 h-6" />
      Componentes
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Átomos</h3>
        <p className="text-sm text-gray-600 mb-2">Componentes básicos e reutilizáveis</p>
        <ul className="space-y-1 text-sm">
          <li>
            <a href="?path=/story/atoms-button" className="text-primary hover:underline">
              Button
            </a>
          </li>
          <li>
            <a href="?path=/story/atoms-input" className="text-primary hover:underline">
              Input
            </a>
          </li>
          <li>
            <a href="?path=/story/atoms-select" className="text-primary hover:underline">
              Select
            </a>
          </li>
          <li>
            <a href="?path=/story/atoms-card" className="text-primary hover:underline">
              Card
            </a>
          </li>
          <li>
            <a href="?path=/story/atoms-badge" className="text-primary hover:underline">
              Badge
            </a>
          </li>
          <li>
            <a href="?path=/story/atoms-typography" className="text-primary hover:underline">
              Typography
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Moléculas</h3>
        <p className="text-sm text-gray-600 mb-2">Combinações de átomos</p>
        <ul className="space-y-1 text-sm">
          <li>
            <a href="?path=/story/molecules-searchbar" className="text-primary hover:underline">
              SearchBar
            </a>
          </li>
          <li>
            <a href="?path=/story/molecules-statusfilter" className="text-primary hover:underline">
              StatusFilter
            </a>
          </li>
          <li>
            <a
              href="?path=/story/molecules-costureiratable"
              className="text-primary hover:underline"
            >
              CostureiraTable
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Organismos</h3>
        <p className="text-sm text-gray-600 mb-2">Componentes complexos</p>
        <ul className="space-y-1 text-sm">
          <li>
            <a href="?path=/story/organisms-header" className="text-primary hover:underline">
              Header
            </a>
          </li>
          <li>
            <a href="?path=/story/organisms-sidebar" className="text-primary hover:underline">
              Sidebar
            </a>
          </li>
          <li>
            <a href="?path=/story/organisms-footer" className="text-primary hover:underline">
              Footer
            </a>
          </li>
        </ul>
      </div>
    </div>

    <hr className="my-8 border-gray-200" />

    <h2 className="text-2xl font-bold mb-4 inline-flex items-center gap-2">
      <BookOpen className="w-6 h-6" />
      Como Usar
    </h2>
    <div className="bg-gray-900 text-white p-4 rounded-lg mb-4 overflow-x-auto">
      <pre className="text-sm">
        {`import Button from '@/components/atoms/Button';

function MyComponent() {
  return (
    <Button variant="primary" size="md">
      Clique aqui
    </Button>
  );
}`}
      </pre>
    </div>

    <hr className="my-8 border-gray-200" />

    <div className="text-center text-gray-500">
      <p>
        <strong>Cony Interiores Design System</strong>
      </p>
      <p className="text-sm">Versão 1.0.0 - Julho 2026</p>
    </div>
  </div>
);

BemVindo.storyName = "Bem-vindo";
