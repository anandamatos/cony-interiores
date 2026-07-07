import { useState } from "react";
import { useNavigate } from "react-router-dom";

import CostureiraTable from "../components/CostureiraTable";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";

import "../styles/Costureiras.css";

export default function Costureiras() {
  const [costureiras, setCostureiras] = useState([
  {
    id: 1,
    nome: "Maria Silva",
    telefone: "(11) 99999-9999",
    especialidade: "Cortinas",
    status: "Ativa",
  },
  {
    id: 2,
    nome: "Ana Souza",
    telefone: "(11) 98888-8888",
    especialidade: "Almofadas",
    status: "Inativa",
  },
]);

  const handleDelete = (id) => {
    const confirmar = window.confirm(
      "Deseja realmente excluir esta costureira?"
    );

    if (!confirmar) return;

    setCostureiras((prev) =>
      prev.filter((costureira) => costureira.id !== id)
    );
  };


  const navigate = useNavigate();
  const [status, setStatus] = useState("Todos");
  const [search, setSearch] = useState("");

  const costureirasFiltradas = costureiras.filter((costureira) => {
  const pesquisa = costureira.nome
    .toLowerCase()
    .includes(search.toLowerCase());

  const filtroStatus =
    status === "Todos" || costureira.status === status;

  return pesquisa && filtroStatus;
});



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

      <CostureiraTable costureiras={costureirasFiltradas}
      onDelete={handleDelete} />
    </main>
  );
}