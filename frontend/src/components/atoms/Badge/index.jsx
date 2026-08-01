import classNames from 'classnames';

const Badge = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary/10 text-primary',
    secondary: 'bg-secondary/25 text-primary',
    gold: 'bg-gold/15 text-gold',
    terracota: 'bg-terracota/12 text-terracota',
    success: 'bg-success/12 text-success',
    warning: 'bg-warning/12 text-warning',
    danger: 'bg-danger/12 text-danger',
    info: 'bg-info/12 text-info',
    neutral: 'bg-gray/20 text-taupe',
    ghost: 'bg-transparent border border-primary text-primary',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-[11px]',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  const baseClasses = classNames(
    'inline-flex items-center justify-center rounded-full font-display font-normal uppercase tracking-[0.15em]',
    'transition-all duration-200 ease-spring',
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    className
  );

  return (
    <span className={baseClasses} {...props}>
      {children}
    </span>
  );
};

export default Badge;