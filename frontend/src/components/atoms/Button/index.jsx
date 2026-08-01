import React from 'react';
import classNames from 'classnames';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  ariaLabel,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-sm font-display text-xs font-normal tracking-[0.15em] uppercase transition-all duration-300 ease-spring focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  const variants = {
    primary: 'bg-[#703824] text-[#F8F5F0] shadow-sm hover:bg-[#8B4A2E] hover:-translate-y-0.5 hover:shadow-md focus:ring-[#703824]/30',
    secondary: 'bg-transparent text-[#703824] border border-[#BFB3A6] hover:bg-[#F8F5F0] hover:-translate-y-0.5',
    gold: 'bg-gradient-gold text-[#703824] shadow-sm hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-md',
    ghost: 'bg-transparent text-[#703824] hover:bg-[#F8F5F0] hover:translate-x-0.5',
  };

  const sizes = {
    sm: 'px-4 py-2 text-[10px]',
    md: 'px-6 py-3 text-xs',
    lg: 'px-8 py-4 text-sm',
  };

  const classes = classNames(
    baseStyles,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  );

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Carregando...
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;