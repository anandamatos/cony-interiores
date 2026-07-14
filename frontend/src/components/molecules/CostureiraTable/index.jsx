import classNames from 'classnames';

const CostureiraTable = ({ data = [], onRowClick, className, ...props }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-taupe bg-offWhite rounded-lg border border-gray">
        <span className="text-4xl block mb-3" aria-hidden="true">📋</span>
        <p className="text-lg font-medium">Nenhum dado disponível</p>
        <p className="text-sm mt-1">Adicione uma nova costureira para começar</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: {
        label: 'Ativo',
        className: 'bg-success/10 text-success border-success/20',
      },
      inactive: {
        label: 'Inativo',
        className: 'bg-gray/10 text-gray-500 border-gray/20',
      },
      pending: {
        label: 'Pendente',
        className: 'bg-warning/10 text-warning border-warning/20',
      },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        className={classNames(
          'px-2.5 py-1 text-xs font-medium rounded-full border',
          config.className
        )}
      >
        {config.label}
      </span>
    );
  };

  const baseClasses = {
  container: classNames(
    'overflow-x-auto',
    'rounded-xl', // Usando o token xl (16px)
    'border border-[rgba(75,58,46,0.08)]',
    'bg-white',
    className
  ),
    table: 'w-full',
    thead: 'bg-offWhite border-b border-gray',
    th: classNames(
      'px-4 py-3 text-left text-xs font-semibold text-taupe uppercase tracking-wider',
      'border-b border-gray'
    ),
    td: 'px-4 py-3 text-sm text-primary border-b border-gray/50',
    tr: 'hover:bg-offWhite/50 transition-colors duration-150 cursor-pointer',
  };

  const columns = [
    { key: 'name', label: 'Nome' },
    { key: 'specialty', label: 'Especialidade' },
    { key: 'status', label: 'Status' },
    { key: 'orders', label: 'Pedidos' },
  ];

  return (
    <div className={baseClasses.container} {...props}>
      <table className={baseClasses.table}>
        <thead className={baseClasses.thead}>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={baseClasses.th}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className={baseClasses.tr}
              onClick={() => onRowClick && onRowClick(item)}
            >
              <td className={baseClasses.td}>
                <span className="font-medium">{item.name}</span>
              </td>
              <td className={baseClasses.td}>{item.specialty}</td>
              <td className={baseClasses.td}>{getStatusBadge(item.status)}</td>
              <td className={classNames(baseClasses.td, 'text-center')}>
                {item.orders}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CostureiraTable;