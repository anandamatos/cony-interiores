import { useState } from 'react';
import classNames from 'classnames';

const StatusFilter = ({
  options = [],
  value: externalValue,
  onChange,
  defaultValue = 'all',
  className,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const selected = externalValue !== undefined ? externalValue : internalValue;

  const handleChange = (newValue) => {
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Mapeamento de cores para os botões
  const variantColors = {
    all: 'bg-white/76 text-primary hover:bg-offWhite',
    active: 'bg-gradient-gold text-primary shadow-sm',
    inactive: 'bg-gray/10 text-taupe hover:bg-gray/20',
    pending: 'bg-warning/10 text-warning hover:bg-warning/20',
    completed: 'bg-info/10 text-info hover:bg-info/20',
  };

  const baseClasses = {
    container: classNames(
      'flex flex-wrap gap-2',
      className
    ),
    button: (isSelected, variant) => classNames(
      'px-4 py-3 rounded-full font-display uppercase tracking-[0.15em] text-[10px]',
      'transition-all duration-200 ease-spring',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'hover:-translate-y-0.5 active:scale-95',
      isSelected
        ? 'bg-gradient-gold border-transparent text-primary shadow-sm font-bold'
        : variantColors[variant] || 'bg-offWhite text-primary hover:bg-gray/20',
      'border border-[rgba(75,58,46,0.08)] disabled:opacity-50 disabled:cursor-not-allowed'
    ),
  };

  const accessibilityProps = {
    role: 'group',
    'aria-label': 'Filtro de status',
  };

  return (
    <div className={baseClasses.container} {...accessibilityProps} {...props}>
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => handleChange(option.value)}
          className={baseClasses.button(selected === option.value, option.variant)}
          aria-pressed={selected === option.value}
          aria-label={`Filtrar por ${option.label}`}
        >
          {option.icon && (
            <span className="mr-1.5" aria-hidden="true">
              {option.icon}
            </span>
          )}
          {option.label}
          {option.count !== undefined && (
            <span className="ml-1.5 text-xs opacity-60">
              ({option.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default StatusFilter;