import { useState } from 'react';
import { Search, X } from 'lucide-react';
import classNames from 'classnames';

const SearchBar = ({
  placeholder = 'Buscar...',
  value: externalValue,
  onChange,
  onSearch,
  onClear,
  disabled = false,
  className,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState('');
  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    setInternalValue('');
    if (onClear) {
      onClear();
    }
    if (onChange) {
      onChange('');
    }
  };

  const baseClasses = {
    container: classNames(
      'relative w-full max-w-md',
      className
    ),
    input: classNames(
      'w-full pl-10 pr-10 py-2.5 rounded-lg',
      'bg-offWhite border-2 border-gray',
      'text-primary placeholder-taupe',
      'transition-all duration-200 ease-spring',
      'focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'focus:shadow-sm'
    ),
    icon: classNames(
      'absolute left-3 top-1/2 -translate-y-1/2',
      'text-taupe transition-colors duration-200',
      value && 'text-primary'
    ),
    clear: classNames(
      'absolute right-3 top-1/2 -translate-y-1/2',
      'text-taupe hover:text-primary',
      'transition-all duration-200 ease-spring',
      'cursor-pointer rounded-full p-0.5',
      'hover:bg-offWhite',
      !value && 'opacity-0 pointer-events-none'
    ),
  };

  const accessibilityProps = {
    role: 'search',
    'aria-label': placeholder,
  };

  return (
    <form
      className={baseClasses.container}
      onSubmit={handleSubmit}
      {...accessibilityProps}
      {...props}
    >
      <Search className={baseClasses.icon} size={20} aria-hidden="true" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={baseClasses.input}
        aria-label={placeholder}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className={baseClasses.clear}
          aria-label="Limpar busca"
        >
          <X size={18} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;