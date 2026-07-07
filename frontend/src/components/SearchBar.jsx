import "../styles/SearchBar.css";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder || "Pesquisar..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}