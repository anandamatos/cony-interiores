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

  useEffect(() => {
    const loadService = async () => {
      try {
        setIsLoading(true);
        const data = await serviceService.getById(id);
        setInitialData(data);
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

  const handleSubmit = async (formData) => {
    await serviceService.update(id, formData);
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
