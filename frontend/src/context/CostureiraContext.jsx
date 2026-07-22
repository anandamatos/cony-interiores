import { createContext, useContext, useState } from 'react';
import { costureirasMock } from '../mocks/costureiras';

const CostureiraContext = createContext();

export function CostureiraProvider({ children }) {
  const [costureiras, setCostureiras] = useState(costureirasMock);
  const [loading, setLoading] = useState(false);

  const addCostureira = (novaCostureira) => {
    setCostureiras((prev) => [...prev, { ...novaCostureira, id: Date.now() }]);
  };

  const updateCostureira = (id, dadosAtualizados) => {
    setCostureiras((prev) =>
      prev.map((costureira) =>
        costureira.id === Number(id)
          ? { ...costureira, ...dadosAtualizados }
          : costureira
      )
    );
  };

  const deleteCostureira = (id) => {
    setCostureiras((prev) => prev.filter((costureira) => costureira.id !== Number(id)));
  };

  const findCostureiraById = (id) => {
    return costureiras.find((costureira) => costureira.id === Number(id));
  };

  return (
    <CostureiraContext.Provider
      value={{
        costureiras,
        loading,
        addCostureira,
        updateCostureira,
        deleteCostureira,
        findCostureiraById,
        adicionarCostureira: addCostureira,
        editarCostureira: updateCostureira,
        excluirCostureira: deleteCostureira,
        buscarPorId: findCostureiraById,
      }}
    >
      {children}
    </CostureiraContext.Provider>
  );
}

export function useCostureira() {
  const context = useContext(CostureiraContext);
  if (!context) {
    throw new Error('useCostureira must be used within a CostureiraProvider');
  }
  return context;
}

export function useCostureiras() {
  return useCostureira();
}

export default CostureiraContext;
