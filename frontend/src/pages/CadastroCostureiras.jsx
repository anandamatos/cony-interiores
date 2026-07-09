import CostureiraForm from "../components/CostureiraForm";
// import "../styles/CadastroCostureira.css";

export default function CadastroCostureira() {
  return (
    <main className="cadastro-page">
      <h1>Nova Costureira</h1>
      <p>Preencha os dados para cadastrar uma nova costureira.</p>

      <CostureiraForm />
    </main>
  );
}