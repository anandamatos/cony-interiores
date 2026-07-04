import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCostureiras } from "../context/CostureiraContext";

import CostureiraTable from "../components/CostureiraTable";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";

import "../styles/Costureiras.css";

export default function Costureiras() {
  const navigate = useNavigate();

  const { costureiras, excluirCostureira } = useCostureiras();

  const [status, setStatus] = useState("Todos");
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta costureira?"
    );

    if (!confirmar) return;

    excluirCostureira(id);
  };

  const costureirasFiltradas = costureiras.filter((costureira) => {
    const pesquisa = costureira.nome
      .toLowerCase()
      .includes(search.toLowerCase());

    const filtroStatus =
      status === "Todos" || costureira.status === status;

    return pesquisa && filtroStatus;
  });

  const handleEdit = (id) => {
    navigate(`/costureiras/${id}/editar`);
  };

  return (
    <main className="costureiras-page">
      <div className="page-header">
        <h1>Costureiras</h1>

        <button
          className="new-button"
          onClick={() => navigate("/costureiras/nova")}
        >
          + Nova Costureira
        </button>
      </div>

      <div className="filters">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Pesquisar costureira..."
        />

        <StatusFilter
          value={status}
          onChange={setStatus}
        />
      </div>

      <CostureiraTable
        costureiras={costureirasFiltradas}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>
  );
}