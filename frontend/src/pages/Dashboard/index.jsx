import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Scissors, 
  DollarSign, 
  Clock,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Plus,
  Search,
  Filter,
  UserPlus
} from 'lucide-react';
import { useCostureira } from '../../context/CostureiraContext';
import { serviceService } from '../../services/serviceService';

const Dashboard = () => {
  const navigate = useNavigate();
  const { costureiras, loadCostureiras } = useCostureira();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCostureiras: 0,
    activeCostureiras: 0,
    totalServices: 0,
    totalRevenue: 0,
    pendingServices: 0,
    completedServices: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const loadStats = async () => {
    try {
      const services = await serviceService.getAll();
      
      const totalServices = services.length;
      const pendingServices = services.filter(s => s.status === 'pending').length;
      const completedServices = services.filter(s => s.status === 'completed').length;
      const totalRevenue = services
        .filter(s => s.status === 'completed')
        .reduce((sum, s) => sum + (s.price || 0), 0);

      setStats({
        totalCostureiras: costureiras.length,
        activeCostureiras: costureiras.filter(c => c.status === 'active').length,
        totalServices,
        totalRevenue,
        pendingServices,
        completedServices,
      });
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

  const loadRecentActivities = async () => {
    try {
      const activities = [
        { id: 1, type: 'service', action: 'Novo serviço criado', user: 'Maria Silva', time: 'há 5 minutos', icon: 'Plus' },
        { id: 2, type: 'costureira', action: 'Costureira adicionada', user: 'João Santos', time: 'há 15 minutos', icon: 'UserPlus' },
        { id: 3, type: 'service', action: 'Serviço concluído', user: 'Ana Oliveira', time: 'há 1 hora', icon: 'Check' },
        { id: 4, type: 'service', action: 'Pagamento recebido', user: 'Carlos Pereira', time: 'há 2 horas', icon: 'DollarSign' },
      ];
      setRecentActivities(activities);
    } catch (error) {
      console.error('Erro ao carregar atividades:', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        await loadCostureiras();
        await loadStats();
        await loadRecentActivities();
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCardClick = (item) => {
    if (item.type === 'service') {
      navigate(`/services/${item.id}`);
    } else if (item.type === 'costureira') {
      navigate(`/seamstresses/${item.id}`);
    }
  };

  const statCards = [
    {
      title: 'Total de Costureiras',
      value: stats.totalCostureiras,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Serviços Ativos',
      value: stats.pendingServices,
      icon: Scissors,
      color: 'bg-green-500',
      change: '+8%',
      trend: 'up'
    },
    {
      title: 'Receita Total',
      value: `R$ ${stats.totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-purple-500',
      change: '+23%',
      trend: 'up'
    },
    {
      title: 'Serviços Concluídos',
      value: stats.completedServices,
      icon: Clock,
      color: 'bg-orange-500',
      change: '+5%',
      trend: 'up'
    }
  ];

  const filteredActivities = recentActivities.filter(activity =>
    activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStatus = filterStatus === 'all' 
    ? filteredActivities 
    : filteredActivities.filter(a => a.type === filterStatus);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Visão geral do seu negócio</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => navigate('/seamstresses/new')}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <UserPlus size={20} />
            Nova Costureira
          </button>
          <button 
            onClick={() => navigate('/services/new')}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={20} />
            Novo Serviço
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold mt-3">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Atividades Recentes</h2>
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar atividades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todos</option>
              <option value="service">Serviços</option>
              <option value="costureira">Costureiras</option>
            </select>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredStatus.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Nenhuma atividade encontrada</p>
          ) : (
            filteredStatus.map((activity) => (
              <button
                key={activity.id}
                onClick={() => handleCardClick(activity)}
                className="w-full text-left flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded-full">
                    {activity.icon === 'Plus' && <Plus size={16} className="text-blue-600" />}
                    {activity.icon === 'UserPlus' && <UserPlus size={16} className="text-green-600" />}
                    {activity.icon === 'Check' && <Scissors size={16} className="text-orange-600" />}
                    {activity.icon === 'DollarSign' && <DollarSign size={16} className="text-purple-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">por {activity.user}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{activity.time}</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <h3 className="font-semibold mb-2">Agenda do Dia</h3>
          <p className="text-sm opacity-90">5 serviços agendados para hoje</p>
          <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
            Ver agenda
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <h3 className="font-semibold mb-2">Costureiras Disponíveis</h3>
          <p className="text-sm opacity-90">{stats.activeCostureiras} costureiras ativas</p>
          <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
            Ver costureiras
          </button>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <h3 className="font-semibold mb-2">Faturamento</h3>
          <p className="text-sm opacity-90">R$ {stats.totalRevenue.toFixed(2)} este mês</p>
          <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
            Ver relatório
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;