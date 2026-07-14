import classNames from 'classnames';

const Card = ({
  children,
  className,
  hover = false,
  padding = true,
  variant = 'default',
  ...props
}) => {
  const variants = {
    default: 'bg-white border border-gray',
    gold: 'bg-gradient-gold border border-gold/20',
    offWhite: 'bg-offWhite border border-gray',
    ghost: 'bg-transparent border border-gray',
  };

  const baseClasses = classNames(
    'rounded-lg transition-all duration-300 ease-spring',
    variants[variant] || variants.default,
    padding && 'p-6',
    hover && [
      'hover:shadow-card hover:-translate-y-1 hover:border-primary/20',
      'hover:shadow-gold/10',
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