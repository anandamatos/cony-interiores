import { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Wallet } from 'lucide-react';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Badge from '../../components/atoms/Badge';

const Financial = () => {
  const [financialData, setFinancialData] = useState(null);

  // Mock data
  const mockData = {
    totalRevenue: 28500,
    pendingPayments: 4200,
    completedPayments: 24300,
    monthlyGrowth: 12.5,
    recentTransactions: [
      { id: 1, client: 'João Silva', amount: 1500, status: 'paid', date: '25/06/2026' },
      { id: 2, client: 'Maria Oliveira', amount: 850, status: 'pending', date: '28/06/2026' },
      { id: 3, client: 'Ana Costa', amount: 2200, status: 'paid', date: '20/06/2026' },
      { id: 4, client: 'Pedro Santos', amount: 1200, status: 'overdue', date: '15/06/2026' },
      { id: 5, client: 'Carla Souza', amount: 950, status: 'paid', date: '18/06/2026' },
    ],
  };

  useEffect(() => {
    setFinancialData(mockData);
  }, []);

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

  if (!financialData) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Typography variant="h1">Financeiro</Typography>
        <Typography variant="body1" className="mt-1">Carregando dados...</Typography>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <Typography variant="h1">Financeiro</Typography>
        <Typography variant="body1" className="mt-1">
          Acompanhe a saúde financeira da sua operação.
        </Typography>
      </div>

      {/* Stats Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">
                Receita Total
              </Typography>
              <Typography variant="h1" className="text-2xl mt-1">
                {formatCurrency(financialData.totalRevenue)}
              </Typography>
            </div>
            <div className="w-10 h-10 rounded-lg bg-success/10 text-success flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <Badge variant="success" size="sm" className="mt-3">
            <TrendingUp className="w-3 h-3 mr-1" />
            {financialData.monthlyGrowth}% este mês
          </Badge>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">
                Pagamentos Pendentes
              </Typography>
              <Typography variant="h1" className="text-2xl mt-1">
                {formatCurrency(financialData.pendingPayments)}
              </Typography>
            </div>
            <div className="w-10 h-10 rounded-lg bg-warning/10 text-warning flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <Badge variant="warning" size="sm" className="mt-3">
            <TrendingDown className="w-3 h-3 mr-1" />
            Aguardando pagamento
          </Badge>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">
                Pagamentos Realizados
              </Typography>
              <Typography variant="h1" className="text-2xl mt-1">
                {formatCurrency(financialData.completedPayments)}
              </Typography>
            </div>
            <div className="w-10 h-10 rounded-lg bg-info/10 text-info flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <Badge variant="success" size="sm" className="mt-3">
            <TrendingUp className="w-3 h-3 mr-1" />
            Recebidos
          </Badge>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <Typography variant="caption" className="uppercase text-taupe">
                Taxa de Recebimento
              </Typography>
              <Typography variant="h1" className="text-2xl mt-1">
                85%
              </Typography>
            </div>
            <div className="w-10 h-10 rounded-lg bg-offWhite flex items-center justify-center text-taupe">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full rounded-full bg-success"
              style={{ width: '85%' }}
            />
          </div>
        </Card>
      </section>

      {/* Recent Transactions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h3">Transações Recentes</Typography>
          <Badge variant="neutral" size="sm">
            {financialData.recentTransactions.length} registros
          </Badge>
        </div>

        <div className="space-y-3">
          {financialData.recentTransactions.map((transaction) => {
            const status = getStatusBadge(transaction.status);
            return (
              <div
                key={transaction.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg hover:bg-offWhite transition-colors border-b border-gray/50 last:border-b-0"
              >
                <div>
                  <Typography variant="h4" className="text-sm">
                    {transaction.client}
                  </Typography>
                  <Typography variant="caption" className="text-gray-400">
                    {transaction.date}
                  </Typography>
                </div>
                <div className="flex items-center gap-4">
                  <Typography variant="h4" className="text-sm font-semibold">
                    {formatCurrency(transaction.amount)}
                  </Typography>
                  <Badge variant={status.variant} size="sm">
                    {status.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </main>
  );
};

export default Financial;