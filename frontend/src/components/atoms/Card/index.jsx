import classNames from 'classnames';

const Card = ({
  children,
  className,
  hover = false,
  padding = true,
  variant = 'default',
  shadow = 'card',
  glass = false,
  ...props
}) => {
  const variants = {
    default: 'bg-white border border-[rgba(75,58,46,0.08)]',
    gold: 'bg-gradient-gold border border-gold/10',
    offWhite: 'bg-offWhite border border-[rgba(75,58,46,0.06)]',
    ghost: 'bg-transparent border border-[rgba(75,58,46,0.08)]',
    elevated: 'bg-white shadow-card',
    glass: 'bg-white/70 backdrop-blur-md border border-[rgba(75,58,46,0.06)]',
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
    default: 'hover:shadow-card-hover hover:border-primary/20',
    elevated: 'hover:shadow-lg hover:border-primary/20',
    gold: 'hover:shadow-gold hover:border-gold/30',
    terracota: 'hover:shadow-terracota hover:border-terracota/30',
    sage: 'hover:shadow-sage hover:border-sage/30',
    primary: 'hover:shadow-primary hover:border-primary/30',
    glass: 'hover:shadow-md hover:bg-white/80 hover:border-primary/20',
  };

  const variantKey = glass ? 'glass' : variant;

  const baseClasses = classNames(
    'rounded-xl',
    'transition-all duration-300 ease-spring',
    variants[variantKey] || variants.default,
    shadowClasses[shadow] || shadowClasses.card,
    padding && 'p-6',
    hover && [
      hoverShadows[variantKey] || hoverShadows.default,
      'hover:-translate-y-1',
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