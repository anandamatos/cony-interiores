import classNames from 'classnames';
import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className, multiline, rows = 3, ...props }, ref) => {
  const inputClasses = classNames(
    'w-full rounded-lg border border-border bg-white px-4 py-2.5 text-text-primary',
    'placeholder:text-text-secondary placeholder:text-sm',
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
      {multiline ? (
        <textarea
          ref={ref}
          className={inputClasses}
          rows={rows}
          {...props}
        />
      ) : (
        <input ref={ref} className={inputClasses} {...props} />
      )}
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;