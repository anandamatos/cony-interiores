import classNames from 'classnames';

const Badge = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-primary',
    gold: 'bg-gold text-black',
    terracota: 'bg-terracota text-white',
    success: 'bg-success text-white',
    warning: 'bg-warning text-black',
    danger: 'bg-danger text-white',
    info: 'bg-info text-white',
    neutral: 'bg-gray text-primary',
    ghost: 'bg-transparent border border-primary text-primary',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const baseClasses = classNames(
    'inline-flex items-center justify-center rounded-full font-medium',
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