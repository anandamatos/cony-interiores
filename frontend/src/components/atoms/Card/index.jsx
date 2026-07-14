import classNames from 'classnames';

const Card = ({
  children,
  className,
  hover = false,
  padding = true,
  variant = 'default',
  shadow = 'card',
  ...props
}) => {
  const variants = {
    default: 'bg-white border border-[rgba(75,58,46,0.08)]',
    gold: 'bg-gradient-gold border border-gold/10',
    offWhite: 'bg-offWhite border border-[rgba(75,58,46,0.06)]',
    ghost: 'bg-transparent border border-[rgba(75,58,46,0.08)]',
    elevated: 'bg-white shadow-card',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    card: 'shadow-card',
    elevated: 'shadow-elevated',
    gold: 'shadow-gold',
    terracota: 'shadow-terracota',
    sage: 'shadow-sage',
    primary: 'shadow-primary',
    'card-hover': 'shadow-card-hover',
  };

  const hoverShadows = {
    default: 'hover:shadow-card-hover',
    elevated: 'hover:shadow-lg',
    gold: 'hover:shadow-gold',
    terracota: 'hover:shadow-terracota',
    sage: 'hover:shadow-sage',
    primary: 'hover:shadow-primary',
  };

  const baseClasses = classNames(
    'rounded-xl', // 16px de border-radius
    'transition-all duration-300 ease-spring',
    variants[variant] || variants.default,
    shadowClasses[shadow] || shadowClasses.card,
    padding && 'p-6',
    hover && [
      hoverShadows[variant] || hoverShadows.default,
      'hover:-translate-y-1',
      'hover:border-primary/20',
    ],
    className
  );

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;