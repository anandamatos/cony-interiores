import Sidebar from '../../src/components/organisms/Sidebar';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  render: () => (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <h1 className="text-2xl font-bold">Conteúdo Principal</h1>
        <p className="text-gray-600">O sidebar está visível à esquerda.</p>
      </div>
    </div>
  ),
};