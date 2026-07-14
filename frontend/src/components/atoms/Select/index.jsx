import { useState } from 'react';
import classNames from 'classnames';
import { ChevronDown } from 'lucide-react';

const Select = ({
  label,
  id,
  options = [],
  value,
  onChange,
  placeholder = 'Selecione...',
  required = false,
  disabled = false,
  error,
  className,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const baseClasses = {
    container: classNames('flex flex-col gap-1.5 w-full', className),
    label: classNames(
      'text-sm font-medium text-primary transition-colors duration-200',
      error ? 'text-danger' : 'text-primary',
      disabled && 'opacity-50'
    ),
    wrapper: classNames(
      'relative w-full',
      focused && 'shadow-sm'
    ),
    select: classNames(
      'w-full px-4 py-2.5 pr-10 rounded-lg border-2 appearance-none',
      'bg-offWhite text-primary placeholder-taupe',
      'transition-all duration-200 ease-spring',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      error
        ? 'border-danger focus:border-danger focus:ring-danger/20'
        : 'border-gray focus:border-primary focus:ring-primary/20'
    ),
    icon: classNames(
      'absolute right-3 top-1/2 -translate-y-1/2',
      'text-taupe transition-transform duration-200',
      focused && 'rotate-180'
    ),
    error: classNames(
      'text-sm text-danger flex items-center gap-1 mt-1',
      'animate-slideDown'
    ),
    required: classNames(
      'text-danger ml-1',
      required ? 'opacity-100' : 'opacity-0'
    ),
  };

  const accessibilityProps = {
    'aria-label': label || placeholder,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${selectId}-error` : undefined,
    'aria-required': required,
  };

  return (
    <div className={baseClasses.container}>
      {label && (
        <label htmlFor={selectId} className={baseClasses.label}>
          {label}
          {required && <span className={baseClasses.required}>*</span>}
        </label>
      )}

      <div className={baseClasses.wrapper}>
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className={baseClasses.select}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...accessibilityProps}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className={baseClasses.icon} size={20} aria-hidden="true" />
      </div>

      {error && (
        <p id={`${selectId}-error`} className={baseClasses.error}>
          <span aria-hidden="true">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;