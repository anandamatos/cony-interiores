import classNames from 'classnames';

const Typography = ({
  variant = 'body1',
  children,
  className,
  weight,
  color = 'primary',
  as: Component,
  ...props
}) => {
  // Mapeamento de variantes para tags HTML
  const tagMap = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    body1: 'p',
    body: 'p',
    body2: 'p',
    caption: 'span',
  };

  const Tag = Component || tagMap[variant] || 'p';

  // Classes base por variante (refinadas)
  const variantClasses = {
    h1: classNames(
      'font-primary text-[32px] lg:text-[36px] font-bold',
      'tracking-[-0.03em]',
      'leading-[1.1]',
      'text-primary'
    ),
    h2: classNames(
      'font-primary text-[24px] font-semibold',
      'tracking-[-0.03em]',
      'leading-[1.25]',
      'text-primary'
    ),
    h3: classNames(
      'font-primary text-[18px] font-semibold',
      'tracking-[0]',
      'leading-[1.4]',
      'text-primary'
    ),
    h4: classNames(
      'font-primary text-[16px] font-semibold',
      'tracking-[0]',
      'leading-[1.4]',
      'text-primary'
    ),
    body1: classNames(
      'font-secondary text-[16px] font-normal',
      'leading-[1.7]',
      'text-primary/85'
    ),
    body2: classNames(
      'font-secondary text-[14px] font-normal',
      'leading-[1.6]',
      'text-taupe'
    ),
    caption: classNames(
      'font-display text-[10px] font-normal uppercase',
      'tracking-[0.15em]',
      'leading-[1.5]',
      'text-taupe'
    ),
  };

  // Classes de cor
  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    taupe: 'text-taupe',
    white: 'text-white',
    black: 'text-black',
    gold: 'text-gold',
    terracota: 'text-terracota',
    danger: 'text-danger',
    success: 'text-success',
    warning: 'text-warning',
    info: 'text-info',
  };

  // Classes de peso (sobrescreve o padrão da variante)
  const weightClasses = {
    thin: 'font-thin',
    extraLight: 'font-extraLight',
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    extrabold: 'font-extrabold',
    black: 'font-black',
  };

  const classes = classNames(
    variantClasses[variant],
    colorClasses[color] || colorClasses.primary,
    weight && weightClasses[weight],
    className
  );

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};

export default Typography;