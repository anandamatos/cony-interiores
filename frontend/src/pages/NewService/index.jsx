import { useNavigate } from 'react-router-dom';
import ServiceForm from '../../components/molecules/ServiceForm';
import { serviceService } from '../../services/serviceService';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';

const NewService = () => {
  const navigate = useNavigate();

  // Mapeamento de complexidade
  const COMPLEXIDADE_MAP = {
    'baixa': 0,
    'media': 1,
    'alta': 2
  };

  const handleSubmit = async (formData) => {
    try {
      // Normalizar os dados para o formato que o backend espera
      const payload = {
        cliente: parseInt(formData.cliente),
        costureira: parseInt(formData.costureira),
        produto: [parseInt(formData.produto)],
        quantidade: parseInt(formData.quantidade),
        data_envio: formData.dataEnvio,
        prazo_entrega: formData.prazoEntrega,
        valor: formData.valor,
        complexidade: COMPLEXIDADE_MAP[formData.complexidade] || 1, // ✅ converte string para número
        observacoes: formData.observacoes || '',
      };

      console.log('📤 Enviando payload:', payload);
      
      await serviceService.create(payload);
      setTimeout(() => navigate('/services'), 1500);
    } catch (error) {
      console.error('Erro ao criar serviço:', error);
      alert('Erro ao criar serviço. Verifique os dados e tente novamente.');
    }
  };

  const handleCancel = () => {
    navigate('/services');
  };

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <div className="mb-6">
        <Typography variant="h1">Novo Serviço</Typography>
        <Typography variant="body1" className="mt-1 text-taupe">
          Preencha os dados do serviço para adicionar à lista.
        </Typography>
      </div>

      <Card className="p-6 max-w-2xl">
        <ServiceForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Card>
    </main>
  );
};

export default NewService;