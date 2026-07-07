import "../styles/CostureiraTable.css";

export default function CostureiraTable({ costureiras, onDelete, }) {
  return (
    <div className="costureira-table-container">
      <table className="costureira-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Especialidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {costureiras.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-table">
                Nenhuma costureira cadastrada.
              </td>
            </tr>
          ) : (
            costureiras.map((costureira) => (
              <tr key={costureira.id}>
                <td>{costureira.nome}</td>
                <td>{costureira.telefone}</td>
                <td>{costureira.especialidade}</td>
                <td>
                  <span
                    className={`status-badge ${
                      costureira.status === "Ativa"
                      ? "status-active"
                      : "status-inactive"
                    }`}
                  >
                    <span className="status-dot"></span>
                    {costureira.status}
                  </span>
                </td>
                <td>
                  <div className="actions">
                    <button className="table-button">Editar</button>
                    <button className="delete-button" onClick={() => onDelete(costureira.id)}>
                      Excluir
                    </button>
                  </div>
                  
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}