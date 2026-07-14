import classNames from 'classnames';
import { typography } from '../../../styles/tokens/typography';

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
    body2: 'p',
    caption: 'span',
  };

  const Tag = Component || tagMap[variant] || 'p';

  // Classes base por variante
  const variantClasses = {
    h1: classNames(
      'font-primary text-4xl font-bold',
      'md:text-4xl',
      'tracking-tight leading-tight'
    ),
    h2: classNames(
      'font-primary text-2xl font-semibold',
      'tracking-tight leading-snug'
    ),
    h3: classNames(
      'font-primary text-xl font-semibold',
      'tracking-tight leading-normal'
    ),
    h4: classNames(
      'font-primary text-lg font-semibold',
      'leading-normal'
    ),
    body1: classNames(
      'font-secondary text-base font-normal',
      'leading-relaxed'
    ),
    body2: classNames(
      'font-secondary text-sm font-normal',
      'leading-relaxed'
    ),
    caption: classNames(
      'font-secondary text-xs font-normal',
      'tracking-wide leading-relaxed'
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