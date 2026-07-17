import { useMemo, useState } from 'react';
import {
  CreditCard,
  DollarSign,
  Download,
  FileText,
  Plus,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Badge from '../../components/atoms/Badge';
import Button from '../../components/atoms/Button';

const Financial = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const mockData = {
    totalRevenue: 28500,
    pendingPayments: 4200,
    completedPayments: 24300,
    monthlyGrowth: 12.5,
    targetCollectionRate: 90,
    collectionRate: 85,
    planning: [
      {
        id: 'this-week',
        title: 'Esta Semana',
        subtitle: 'Previsão de pagamentos',
        total: 3200,
        seamstresses: 4,
        services: 8,
        variant: 'gold',
      },
      {
        id: 'next-week',
        title: 'Próxima Semana',
        subtitle: 'Previsão de pagamentos',
        total: 4500,
        seamstresses: 5,
        services: 10,
        variant: 'default',
      },
    ],
    recentTransactions: [
      { id: 1, client: 'João Silva', amount: 1500, status: 'paid', date: '25/06/2026' },
      { id: 2, client: 'Maria Oliveira', amount: 850, status: 'pending', date: '28/06/2026' },
      { id: 3, client: 'Ana Costa', amount: 2200, status: 'paid', date: '20/06/2026' },
      { id: 4, client: 'Pedro Santos', amount: 1200, status: 'overdue', date: '15/06/2026' },
      { id: 5, client: 'Carla Souza', amount: 950, status: 'paid', date: '18/06/2026' },
    ],
  };

  const financialData = mockData;
  const filterOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'paid', label: 'Pago' },
    { value: 'pending', label: 'Pendente' },
    { value: 'overdue', label: 'Atrasado' },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStatusBadge = (status) => {
    const variants = {
      paid: { label: 'Pago', variant: 'success' },
      pending: { label: 'Pendente', variant: 'warning' },
      overdue: { label: 'Atrasado', variant: 'danger' },
    };
    return variants[status] || { label: status, variant: 'neutral' };
  };

  const filteredTransactions = useMemo(() => {
    if (selectedFilter === 'all') {
      return financialData.recentTransactions;
    }

    return financialData.recentTransactions.filter(
      (transaction) => transaction.status === selectedFilter
    );
  }, [financialData.recentTransactions, selectedFilter]);

  const statCards = [
    {
      title: 'Receita Total',
      value: formatCurrency(financialData.totalRevenue),
      icon: DollarSign,
      iconClassName: 'bg-success/10 text-success',
      badge: {
        variant: 'success',
        icon: TrendingUp,
        text: `${financialData.monthlyGrowth}% este mês`,
      },
    },
    {
      title: 'Pagamentos Pendentes',
      value: formatCurrency(financialData.pendingPayments),
      icon: CreditCard,
      iconClassName: 'bg-warning/10 text-warning',
      badge: {
        variant: 'warning',
        icon: TrendingDown,
        text: '2 em atraso',
      },
    },
    {
      title: 'Pagamentos Realizados',
      value: formatCurrency(financialData.completedPayments),
      icon: Wallet,
      iconClassName: 'bg-info/10 text-info',
      badge: {
        variant: 'success',
        icon: TrendingUp,
        text: 'Recebidos',
      },
    },
    {
      title: 'Taxa de Recebimento',
      value: `${financialData.collectionRate}%`,
      icon: TrendingUp,
      iconClassName: 'bg-offWhite text-taupe',
      progress: `${financialData.targetCollectionRate}%`,
      badge: {
        variant: 'success',
        icon: TrendingUp,
        text: `Meta: ${financialData.targetCollectionRate}%`,
      },
    },
  ];

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="info" size="sm">MVP 2</Badge>
            <Badge variant="warning" size="sm">Discovery</Badge>
          </div>
          <Typography variant="h1">Financeiro</Typography>
          <Typography variant="body1" className="mt-1 text-taupe">
            Acompanhe a saude financeira da sua operacao e valide os fluxos previstos.
          </Typography>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4" />
            Novo Pagamento
          </Button>
          <Button variant="secondary" size="sm">
            <FileText className="w-4 h-4" />
            Relatorio Detalhado
          </Button>
          <Button variant="gold" size="sm">
            <Download className="w-4 h-4" />
            Exportar Dados
          </Button>
        </div>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title} hover className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <Typography variant="caption" className="uppercase text-taupe">
                    {card.title}
                  </Typography>
                  <Typography variant="h1" className="text-[30px] mt-1">
                    {card.value}
                  </Typography>
                </div>
                <div className={`w-11 h-11 rounded-md flex items-center justify-center ${card.iconClassName}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {card.progress ? (
                <>
                  <div className="w-full h-2 bg-gray-200 rounded-md mt-4 overflow-hidden">
                    <div
                      className="h-full rounded-md bg-success"
                      style={{ width: `${financialData.collectionRate}%` }}
                    />
                  </div>
                  <Badge variant={card.badge.variant} size="sm" className="mt-3">
                    <card.badge.icon className="w-3 h-3 mr-1" />
                    {card.badge.text}
                  </Badge>
                </>
              ) : (
                <Badge variant={card.badge.variant} size="sm" className="mt-3">
                  <card.badge.icon className="w-3 h-3 mr-1" />
                  {card.badge.text}
                </Badge>
              )}
            </Card>
          );
        })}
      </section>

      <section className="mb-8">
        <div className="mb-4">
          <Typography variant="h2">Pagamentos</Typography>
          <Typography variant="body2" className="mt-1 text-taupe">
            Lista validada com base no prototipo para acompanhamento de recebimentos.
          </Typography>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={selectedFilter === option.value ? 'primary' : 'secondary'}
              size="sm"
              className={selectedFilter === option.value ? '' : '!border-gray/60'}
              onClick={() => setSelectedFilter(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6 gap-3">
            <Typography variant="h3">Transacoes Recentes</Typography>
            <Badge variant="neutral" size="sm">
              {filteredTransactions.length} registro{filteredTransactions.length === 1 ? '' : 's'}
            </Badge>
          </div>

          <div className="space-y-2">
          {filteredTransactions.map((transaction) => {
            const status = getStatusBadge(transaction.status);
            return (
              <div
                key={transaction.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-md hover:bg-offWhite transition-colors border-b border-gray/50 last:border-b-0"
              >
                <div>
                  <Typography variant="h4" className="text-[15px]">
                    {transaction.client}
                  </Typography>
                  <Typography variant="caption" className="text-taupe block mt-1">
                    {transaction.date}
                  </Typography>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="h4" className="text-[15px] font-semibold">
                    {formatCurrency(transaction.amount)}
                  </Typography>
                  <Badge variant={status.variant} size="sm">
                    {status.label}
                  </Badge>
                </div>
              </div>
            );
          })}

          {filteredTransactions.length === 0 && (
            <div className="py-8 text-center">
              <Typography variant="body1" className="text-taupe">
                Nenhum pagamento encontrado para o filtro selecionado.
              </Typography>
            </div>
          )}
          </div>
        </Card>
      </section>

      <section className="mb-8">
        <div className="mb-4">
          <Typography variant="h2">Planejamento Financeiro</Typography>
          <Typography variant="body2" className="mt-1 text-taupe">
            Previsao de pagamentos para as proximas semanas.
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {financialData.planning.map((item) => (
            <Card
              key={item.id}
              variant={item.variant}
              className={item.variant === 'gold' ? 'border-primary/10' : ''}
            >
              <Typography variant="h3">{item.title}</Typography>
              <Typography variant="body2" className="mt-1 text-taupe">
                {item.subtitle}
              </Typography>

              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <Typography variant="body2" className="text-taupe">
                    Total a pagar
                  </Typography>
                  <Typography variant="h3">{formatCurrency(item.total)}</Typography>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Typography variant="body2" className="text-taupe">
                    Costureiras
                  </Typography>
                  <Typography variant="body2">{item.seamstresses}</Typography>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <Typography variant="body2" className="text-taupe">
                    Servicos
                  </Typography>
                  <Typography variant="body2">{item.services}</Typography>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Financial;