const CostureiraTable = ({ data = [] }) => {
  if (data.length === 0) {
    return <div className="text-center py-8 text-gray-500">Nenhum dado disponível</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nome
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Especialidade
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pedidos
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{item.specialty}</td>
              <td className="px-4 py-3">
                <span
                  className={`
                  px-2 py-1 text-xs rounded-full
                  ${item.status === "active" ? "bg-green-100 text-green-700" : ""}
                  ${item.status === "inactive" ? "bg-gray-100 text-gray-700" : ""}
                  ${item.status === "pending" ? "bg-yellow-100 text-yellow-700" : ""}
                `}
                >
                  {item.status === "active"
                    ? "Ativo"
                    : item.status === "inactive"
                      ? "Inativo"
                      : item.status === "pending"
                        ? "Pendente"
                        : item.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">{item.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostureiraTable;
