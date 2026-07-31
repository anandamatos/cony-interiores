import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { seamstressService } from '../../services/seamstressService';
import CostureiraForm from '../../components/molecules/CostureiraForm';
import Alert from '../../components/atoms/Alert';

const NewSeamstress = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const showSuccess = (message, title) => {
    setFeedback({ type: 'success', message, title });
    setTimeout(() => setFeedback(null), 5000);
  };

  const showError = (message, title) => {
    setFeedback({ type: 'error', message, title });
    setTimeout(() => setFeedback(null), 5000);
  };

  const clearFeedback = () => setFeedback(null);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await seamstressService.create(formData);
      showSuccess('Costureira cadastrada com sucesso!', 'Concluído');
      setTimeout(() => {
        navigate('/seamstresses');
      }, 1500);
    } catch (err) {
      showError(err.message || 'Erro ao cadastrar costureira. Tente novamente.', 'Erro');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Nova Costureira</h1>

      {feedback && (
        <div className="mb-4">
          <Alert
            type={feedback.type}
            title={feedback.title}
            message={feedback.message}
            onClose={clearFeedback}
          />
        </div>
      )}

      <CostureiraForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/seamstresses')}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default NewSeamstress;
