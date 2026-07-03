import CostureiraForm from "../components/CostureiraForm";
import { useParams } from "react-router-dom";
import { useCostureiras } from "../context/CostureiraContext";

export default function CadastroCostureira() {
  const { id } = useParams();
  const { buscarPorId } = useCostureiras();

  const editando = Boolean(id);

  const costureira = editando
    ? buscarPorId(id)
    : null;

  return (
    <main className="cadastro-page">
      <h1>
        {editando ? "Editar Costureira" : "Nova Costureira"}
      </h1>

      <p>
        {editando
          ? "Atualize os dados da costureira."
          : "Preencha os dados para cadastrar uma nova costureira."}
      </p>

      <CostureiraForm
        editando={editando}
        initialData={costureira}
      />
    </main>
  );
}