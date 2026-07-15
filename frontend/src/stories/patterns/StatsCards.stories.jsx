import {
  ClipboardList,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';

const statCards = [
  {
    key: 'activeServices',
    label: 'Serviços Ativos',
    value: 12,
    icon: ClipboardList,
    accent: 'gold',
    trendIcon: TrendingUp,
    trendText: '3 novos esta semana',
    trend: 'up',
  },
  {
    key: 'seamstresses',
    label: 'Costureiras',
    value: 4,
    icon: Users,
    accent: 'sage',
    trendIcon: TrendingUp,
    trendText: '1 nova contratada',
    trend: 'up',
  },
  {
    key: 'pendingPayments',
    label: 'Pagamentos Pendentes',
    value: 3,
    icon: DollarSign,
    accent: 'gold',
    trendIcon: TrendingDown,
    trendText: '2 em atraso',
    trend: 'down',
  },
  {
    key: 'upcomingDeliveries',
    label: 'Entregas Previstas',
    value: 8,
    icon: Package,
    accent: 'terracota',
    trendIcon: TrendingUp,
    trendText: 'Esta semana',
    trend: 'up',
  },
];

const accentMap = {
  gold: 'before:bg-gradient-gold',
  sage: 'before:bg-sage',
  terracota: 'before:bg-terracota',
};

export default {
  title: 'Patterns/Stats Cards',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Replica dos stats cards do dashboard com composicao visual do HTML de referencia (borda, barra lateral, icone, tipografia e chip de variacao).',
      },
    },
  },
};

export const PixelReference = {
  render: () => (
    <div className="p-6 sm:p-8 bg-offWhite min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.trendIcon;
          const accentClass = accentMap[card.accent] || 'before:bg-gradient-gold';

          return (
            <article
              key={card.key}
              className={`group relative overflow-hidden cursor-pointer rounded-md border border-border bg-white/80 backdrop-blur-sm px-6 py-5 transition-all duration-normal ease-spring hover:-translate-y-1 hover:scale-[1.01] hover:border-gold hover:shadow-md before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:transition-all before:duration-normal before:ease-spring hover:before:w-1.5 hover:before:bg-gradient-primary ${accentClass}`}
            >
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-sm bg-offWhite text-taupe transition-all duration-normal ease-spring group-hover:scale-105 group-hover:-rotate-[4deg] group-hover:bg-secondary group-hover:text-primary">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-[13px] font-secondary font-normal uppercase tracking-[0.5px] text-taupe">
                {card.label}
              </div>
              <div className="mt-1 text-[32px] leading-none font-primary font-bold tracking-[-0.5px] text-primary">
                {card.value}
              </div>
              <span
                className={`mt-2 inline-flex items-center gap-1 rounded-[12px] px-2.5 py-[2px] text-[12px] font-secondary font-semibold ${
                  card.trend === 'up' ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
                }`}
              >
                <TrendIcon className="w-3.5 h-3.5" />
                {card.trendText}
              </span>
            </article>
          );
        })}
      </div>
    </div>
  ),
};
