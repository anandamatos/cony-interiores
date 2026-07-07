import classNames from 'classnames';
import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

const Select = forwardRef(({ label, error, options = [], className, ...props }, ref) => {
  const selectClasses = classNames(
    'w-full appearance-none rounded-lg border border-border bg-white px-4 py-2.5 pr-10',
    'text-text-primary text-sm',
    'transition-colors duration-200',
    'focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    error && 'border-error focus:border-error focus:ring-error/20',
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-primary mb-1.5">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select ref={ref} className={selectClasses} {...props}>
          <option value="">Selecione...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
      </div>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;