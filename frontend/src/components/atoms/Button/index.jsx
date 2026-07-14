import classNames from 'classnames';
import { animations } from '../../../styles/tokens/animations';

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
    primary: 'bg-primary text-white hover:bg-primary-hover focus:ring-primary/30',
    secondary: 'bg-secondary text-primary hover:bg-secondary/80 focus:ring-secondary/30',
    gold: 'bg-gold text-black hover:bg-gold/80 focus:ring-gold/30',
    terracota: 'bg-terracota text-white hover:bg-terracota/80 focus:ring-terracota/30',
    danger: 'bg-danger text-white hover:bg-danger/80 focus:ring-danger/30',
    ghost: 'bg-transparent text-primary hover:bg-offWhite focus:ring-primary/20',
    outline: 'border-2 border-primary text-primary hover:bg-primary/5 focus:ring-primary/20',
  };

  // Tamanhos
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Classes base
  const baseClasses = {
    button: classNames(
      'inline-flex items-center justify-center gap-2 rounded-lg font-semibold',
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
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
      {children}
    </button>
  );
};

export default Button;