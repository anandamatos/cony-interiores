import { useNavigate } from 'react-router-dom';
import ServiceForm from '../../components/molecules/ServiceForm';
import { serviceService } from '../../services/serviceService';
import Card from '../../components/atoms/Card';
import Typography from '../../components/atoms/Typography';

const NewService = () => {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    await serviceService.create(formData);
    setTimeout(() => navigate('/services'), 1500);
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
