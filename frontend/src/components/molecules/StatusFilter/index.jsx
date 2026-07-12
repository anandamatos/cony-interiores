import "../../../styles/StatusFilter.css";

export default function StatusFilter({ value, onChange }) {
  return (
    <select
      className="status-filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="Todos">Todos</option>
      <option value="Ativa">Ativa</option>
      <option value="Inativa">Inativa</option>
    </select>
  );
}