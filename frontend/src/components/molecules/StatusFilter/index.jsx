import { useState } from 'react';

const StatusFilter = ({ options = [], defaultValue = 'all', onChange }) => {
  const [selected, setSelected] = useState(defaultValue);

  const handleChange = (value) => {
    setSelected(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleChange(option.value)}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${selected === option.value
              ? 'bg-primary text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;