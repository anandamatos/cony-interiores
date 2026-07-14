import classNames from 'classnames';

const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  type = 'button',
  ...props
}) => {
  // Variantes de estilo com nova paleta
  const variants = {
    primary: 'bg-primary text-offWhite hover:bg-primary-hover focus:ring-primary/30 shadow-sm hover:shadow-md',
    secondary: 'bg-transparent text-primary border border-gray/400 hover:bg-offWhite focus:ring-primary/20',
    gold: 'bg-gradient-gold text-primary hover:brightness-105 focus:ring-gold/30 shadow-sm hover:shadow-md',
    terracota: 'bg-terracota text-white hover:bg-terracota/90 focus:ring-terracota/30 shadow-sm hover:shadow-md',
    danger: 'bg-danger text-white hover:bg-danger/90 focus:ring-danger/30 shadow-sm hover:shadow-md',
    ghost: 'bg-transparent text-primary hover:bg-offWhite focus:ring-primary/20',
    outline: 'border border-primary text-primary hover:bg-primary/5 focus:ring-primary/20',
  };

  // Tamanhos
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-3 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  // Classes base
  const baseClasses = {
    button: classNames(
      'inline-flex items-center justify-center gap-2 rounded-[6px] font-semibold font-primary',
      'transition-all duration-200 ease-spring',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'active:scale-95',
      variants[variant] || variants.primary,
      sizes[size] || sizes.md,
      className
    ),
  };

  // Atributos de acessibilidade
  const accessibilityProps = {
    role: 'button',
    'aria-disabled': disabled || loading,
    'aria-busy': loading,
    ...(loading && { 'aria-label': 'Carregando...' }),
  };

  return (
    <button
      type={type}
      className={baseClasses.button}
      disabled={disabled || loading}
      onClick={onClick}
      {...accessibilityProps}
      {...props}
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
      {children}
    </button>
  );
};

export default Button;