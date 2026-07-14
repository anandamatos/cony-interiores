import { useId, useState } from 'react';
import classNames from 'classnames';

const Input = ({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  className,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const inputId = id || `input-${generatedId}`;

  // Classes base - CORRIGIDAS (vírgulas entre propriedades)
  const baseClasses = {
    container: classNames('flex flex-col gap-1.5 w-full', className),
    label: classNames(
      'text-sm font-medium text-primary transition-colors duration-200',
      error ? 'text-danger' : 'text-primary',
      disabled && 'opacity-50'
    ),
    input: classNames(
      'w-full px-4 py-2.5 rounded-xl',
      'border-2',
      'bg-offWhite text-primary placeholder-taupe',
      'transition-all duration-300 ease-spring',
      'focus:outline-none focus:ring-2 focus:ring-offset-1',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      error
        ? 'border-danger focus:border-danger focus:ring-danger/20'
        : 'border-gray focus:border-primary focus:ring-primary/20',
      focused && 'shadow-sm'
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

  // Atributos de acessibilidade
  const accessibilityProps = {
    'aria-label': label || placeholder,
    'aria-invalid': !!error,
    'aria-describedby': error ? `${inputId}-error` : undefined,
    'aria-required': required,
  };

  return (
    <div className={baseClasses.container}>
      {label && (
        <label htmlFor={inputId} className={baseClasses.label}>
          {label}
          {required && <span className={baseClasses.required}>*</span>}
        </label>
      )}

      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={baseClasses.input}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...accessibilityProps}
        {...props}
      />

      {error && (
        <p id={`${inputId}-error`} className={baseClasses.error}>
          <span aria-hidden="true">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;