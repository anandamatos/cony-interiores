import React from 'react';
import { useNavigate } from 'react-router-dom';
import CostureiraForm from '../../components/CostureiraForm';
import { createSeamstress } from '../../services/seamstressService';

const NewSeamstress = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createSeamstress(data);
      navigate('/seamstresses');
    } catch (error) {
      console.error('Erro ao criar costureira:', error);
      alert('Erro ao criar costureira. Tente novamente.');
    }
  };

  return (
    <div className="p-6">
      <CostureiraForm 
        onSubmit={handleSubmit}
        onCancel={() => navigate('/seamstresses')}
      />
    </div>
  );
};

export default NewSeamstress;