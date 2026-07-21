import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CostureiraForm from '../../components/molecules/CostureiraForm';
import {
  getSeamstressById,
  updateSeamstress,
} from '../../services/seamstressService';

const EditSeamstress = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSeamstress = async () => {
      try {
        setIsLoading(true);
        const data = await getSeamstressById(id);
        setInitialData(data);
      } catch (error) {
        console.error('Erro ao carregar costureira:', error);
        alert('Não foi possível carregar a costureira.');
        navigate('/seamstresses');
      } finally {
        setIsLoading(false);
      }
    };

    loadSeamstress();
  }, [id, navigate]);

  const handleSubmit = async (data) => {
    try {
      await updateSeamstress(id, data);
      navigate('/seamstresses');
    } catch (error) {
      console.error('Erro ao atualizar costureira:', error);
      alert(error?.message || 'Não foi possível atualizar a costureira.');
    }
  };

  if (isLoading) {
    return <div className="p-6">Carregando costureira...</div>;
  }

  if (!initialData) {
    return <div className="p-6">Costureira não encontrada.</div>;
  }

  return (
    <div className="p-6">
      <CostureiraForm
        initialData={initialData}
        isEditing
        onSubmit={handleSubmit}
        onCancel={() => navigate('/seamstresses')}
      />
    </div>
  );
};

export default EditSeamstress;
