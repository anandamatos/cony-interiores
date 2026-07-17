/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useCallback } from 'react';
import { seamstressService } from '../services/seamstressService';
import { STATUS_LABELS } from '../constants/costureira';

const CostureiraContext = createContext();

export const CostureiraProvider = ({ children }) => {
  const [costureiras, setCostureiras] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCostureiras = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await seamstressService.getAll();
      setCostureiras(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addCostureira = useCallback(async (costureiraData) => {
    setLoading(true);
    try {
      const newCostureira = await seamstressService.create(costureiraData);
      setCostureiras(prev => [...prev, newCostureira]);
      return newCostureira;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCostureira = useCallback(async (id, costureiraData) => {
    setLoading(true);
    try {
      const updated = await seamstressService.update(id, costureiraData);
      setCostureiras(prev => prev.map(c => c.id === id ? updated : c));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCostureira = useCallback(async (id) => {
    setLoading(true);
    try {
      await seamstressService.delete(id);
      setCostureiras(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const getStatusLabel = useCallback((status) => {
    return STATUS_LABELS[status] || status;
  }, []);

  const value = {
    costureiras,
    loading,
    error,
    loadCostureiras,
    addCostureira,
    updateCostureira,
    deleteCostureira,
    getStatusLabel,
  };

  return (
    <CostureiraContext.Provider value={value}>
      {children}
    </CostureiraContext.Provider>
  );
};

export const useCostureira = () => {
  const context = useContext(CostureiraContext);
  if (!context) {
    throw new Error('useCostureira must be used within a CostureiraProvider');
  }
  return context;
};

export default CostureiraContext;