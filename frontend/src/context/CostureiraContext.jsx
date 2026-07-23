import { useState } from "react";
import { costureirasMock } from "../mocks/costureiras";
import { CostureiraContext } from "./CostureiraContextInstance";

export function CostureiraProvider({ children }) {
  const [costureiras, setCostureiras] = useState(costureirasMock);

  function adicionarCostureira(novaCostureira) {
    setCostureiras((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...novaCostureira,
      },
    ]);
  }

  function editarCostureira(id, dadosAtualizados) {
    setCostureiras((prev) =>
      prev.map((c) =>
        c.id === Number(id)
          ? { ...c, ...dadosAtualizados }
          : c
      )
    );
  }

  function excluirCostureira(id) {
    setCostureiras((prev) =>
      prev.filter((c) => c.id !== id)
    );
  }

  function buscarPorId(id) {
    return costureiras.find(
      (c) => c.id === Number(id)
    );
  }

  return (
    <CostureiraContext.Provider
      value={{
        costureiras,
        adicionarCostureira,
        editarCostureira,
        excluirCostureira,
        buscarPorId,
      }}
    >
      {children}
    </CostureiraContext.Provider>
  );
}