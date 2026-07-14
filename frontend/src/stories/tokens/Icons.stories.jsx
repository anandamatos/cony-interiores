import {
  LayoutDashboard,
  ClipboardList,
  Users,
  Gauge,
  DollarSign,
  Settings,
  Bell,
  Search,
  Plus,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  Clock3,
  CheckCircle2,
  Pin,
} from 'lucide-react';

const shellIcons = [
  { name: 'LayoutDashboard', component: LayoutDashboard, usage: 'Menu lateral: Dashboard' },
  { name: 'ClipboardList', component: ClipboardList, usage: 'Menu lateral e cards de servicos' },
  { name: 'Users', component: Users, usage: 'Menu lateral, cards e equipes' },
  { name: 'Gauge', component: Gauge, usage: 'Menu lateral: Capacidade' },
  { name: 'DollarSign', component: DollarSign, usage: 'Menu lateral e cards financeiros' },
  { name: 'Settings', component: Settings, usage: 'Configuracoes e preferencias' },
  { name: 'Bell', component: Bell, usage: 'Header: notificacoes' },
  { name: 'Search', component: Search, usage: 'Header: campo de busca' },
];

const dashboardIcons = [
  { name: 'Plus', component: Plus, usage: 'CTA: Novo Servico' },
  { name: 'BarChart3', component: BarChart3, usage: 'CTA: Relatorios' },
  { name: 'TrendingUp', component: TrendingUp, usage: 'Badges positivos nos stats cards' },
  { name: 'TrendingDown', component: TrendingDown, usage: 'Badges de queda nos stats cards' },
  { name: 'Package', component: Package, usage: 'Stats card: Entregas previstas' },
  { name: 'AlertTriangle', component: AlertTriangle, usage: 'Alerta de risco/erro' },
  { name: 'Clock3', component: Clock3, usage: 'Alerta de prazo' },
  { name: 'CheckCircle2', component: CheckCircle2, usage: 'Alerta de conclusao' },
  { name: 'Pin', component: Pin, usage: 'Alerta informativo' },
];

const IconGrid = ({ title, description, items }) => (
  <section className="space-y-3">
    <div>
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <p className="text-sm text-taupe">{description}</p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
      {items.map((item) => {
        const Icon = item.component;
        return (
          <div key={item.name} className="rounded-lg border border-border bg-white p-3">
            <div className="w-9 h-9 rounded-md bg-offWhite text-primary flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <div className="mt-2 text-sm font-semibold text-primary">{item.name}</div>
            <div className="text-xs text-taupe mt-1">{item.usage}</div>
          </div>
        );
      })}
    </div>
  </section>
);

export default {
  title: 'Tokens/Icones',
  parameters: {
    docs: {
      description: {
        component:
          'Catalogo dos icones Lucide usados no shell e no dashboard. Preferir estes icones antes de introduzir novos simbolos ou emojis.',
      },
    },
  },
};

export const LucideCatalog = {
  render: () => (
    <div className="p-6 space-y-8 bg-offWhite min-h-[480px]">
      <h2 className="text-xl font-bold text-primary">Icones Lucide do Projeto</h2>
      <IconGrid
        title="Shell"
        description="Icones usados em Sidebar e Header."
        items={shellIcons}
      />
      <IconGrid
        title="Dashboard"
        description="Icones usados em acoes, estatisticas e alertas da pagina inicial."
        items={dashboardIcons}
      />
    </div>
  ),
};
