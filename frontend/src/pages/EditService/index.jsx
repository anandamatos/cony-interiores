import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ServiceForm from '../../components/molecules/ServiceForm';
import { serviceService } from '../../services/serviceService';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';
import Alert from '../../components/atoms/Alert';

const EditService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // Mapeamento de complexidade
  const COMPLEXIDADE_MAP = {
    0: 'baixa',
    1: 'media',
    2: 'alta'
  };

  useEffect(() => {
    const loadService = async () => {
      try {
        setIsLoading(true);
        const data = await serviceService.getById(id);
        
        // Transformar dados do backend para o formato do formulário
        setInitialData({
          cliente: data.cliente || '',
          costureira: data.costureira || '',
          produto: data.produto?.[0] || '',
          quantidade: data.quantidade || 1,
          complexidade: COMPLEXIDADE_MAP[data.complexidade] || 'media',
          dataEnvio: data.data_envio || '',
          prazoEntrega: data.prazo_entrega || '',
          valor: data.valor || '',
          observacoes: data.observacoes || '',
        });
      } catch (error) {
        console.error('Erro ao carregar serviço:', error);
        setLoadError(error?.message || 'Não foi possível carregar o serviço.');
        setTimeout(() => navigate('/services'), 2000);
      } finally {
        setIsLoading(false);
      }
    };

    loadService();
  }, [id, navigate]);

  // Mapeamento reverso para enviar ao backend
  const COMPLEXIDADE_REVERSE = {
    'baixa': 0,
    'media': 1,
    'alta': 2
  };

  const handleSubmit = async (formData) => {
    const payload = {
      cliente: parseInt(formData.cliente),
      costureira: parseInt(formData.costureira),
      produto: [parseInt(formData.produto)],
      quantidade: parseInt(formData.quantidade),
      data_envio: formData.dataEnvio,
      prazo_entrega: formData.prazoEntrega,
      valor: formData.valor,
      complexidade: COMPLEXIDADE_REVERSE[formData.complexidade] || 1,
      observacoes: formData.observacoes || '',
    };
    await serviceService.update(id, payload);
    setTimeout(() => navigate('/services'), 1500);
  };

  const handleCancel = () => {
    navigate('/services');
  };

  if (isLoading) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Card className="p-12 text-center">
          <Typography variant="body1" className="text-taupe">
            Carregando serviço...
          </Typography>
        </Card>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Alert
          type="error"
          message={loadError}
          title="Erro ao carregar"
        />
      </main>
    );
  }

  if (!initialData) {
    return (
      <main className="flex-1 p-6 sm:p-8 lg:p-10">
        <Card className="p-12 text-center">
          <Typography variant="body1" className="text-danger">
            Serviço não encontrado.
          </Typography>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex-1 p-6 sm:p-8 lg:p-10">
      <div className="mb-6">
        <Typography variant="h1">Editar Serviço</Typography>
        <Typography variant="body1" className="mt-1 text-taupe">
          Atualize os detalhes do serviço.
        </Typography>
      </div>

      <Card className="p-6 max-w-2xl">
        <ServiceForm
          initialData={initialData}
          isEditing={true}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Card>
    </main>
  );
};

export default EditService;