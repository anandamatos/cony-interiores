import "../styles/CostureiraTable.css";

export default function CostureiraTable({
  costureiras = [],
  onDelete = () => {},
  onEdit = () => {},
}) {
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
            costureiras.map((costureira) => {
              const statusClass =
                costureira.status === "Ativa"
                  ? "status-active"
                  : "status-inactive";

              return (
                <tr key={costureira.id}>
                  <td>{costureira.nome}</td>
                  <td>{costureira.telefone}</td>
                  <td>{costureira.especialidade}</td>

                  <td>
                    <span className={`status-badge ${statusClass}`}>
                      <span className="status-dot"></span>
                      {costureira.status}
                    </span>
                  </td>

                  <td>
                    <div className="actions">
                      <button
                        className="icon-button edit"
                        onClick={() => onEdit(costureira.id)}
                        title="Editar"
                        aria-label="Editar costureira"
                      >
                        ✏️
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => onDelete(costureira.id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}