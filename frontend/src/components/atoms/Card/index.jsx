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
    default: 'bg-white/80 backdrop-blur-sm border border-border',
    gold: 'bg-gradient-gold border border-gold/15',
    offWhite: 'bg-offWhite/80 border border-border/80',
    ghost: 'bg-white/40 backdrop-blur-sm border border-border/70',
    elevated: 'bg-white border border-border shadow-elevated',
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
    'rounded-card',
    'overflow-hidden',
    'transition-all duration-normal ease-spring',
    variants[variant] || variants.default,
    shadowClasses[shadow] || shadowClasses.card,
    padding && 'p-6',
    hover && [
      hoverShadows[variant] || hoverShadows.default,
      'hover:-translate-y-1',
      'hover:border-gold/30',
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