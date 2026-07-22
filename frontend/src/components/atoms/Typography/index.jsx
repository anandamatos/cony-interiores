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
      'font-primary text-[30px] font-bold',
      'tracking-[-0.5px]',
      'leading-[1.2]',
      'text-[#4B3A2E]'
    ),
    h2: classNames(
      'font-primary text-[24px] font-semibold',
      'tracking-[-0.3px]',
      'leading-[1.3]',
      'text-[#4B3A2E]'
    ),
    h3: classNames(
      'font-primary text-[18px] font-semibold',
      'tracking-[-0.2px]',
      'leading-[1.4]',
      'text-[#4B3A2E]'
    ),
    h4: classNames(
      'font-primary text-[16px] font-semibold',
      'tracking-[-0.1px]',
      'leading-[1.4]',
      'text-[#4B3A2E]'
    ),
    body1: classNames(
      'font-secondary text-[16px] font-normal',
      'leading-[1.7]',
      'text-[#4B3A2E]/85'
    ),
    body2: classNames(
      'font-secondary text-[14px] font-normal',
      'leading-[1.6]',
      'text-[#4B3A2E]/70'
    ),
    caption: classNames(
      'font-secondary text-[12px] font-normal',
      'tracking-[0.03em]',
      'leading-[1.5]',
      'text-[#A8968B]'
    ),
  };

  // Classes de cor
  const colorClasses = {
    primary: 'text-[#4B3A2E]',
    secondary: 'text-[#D9C7B1]',
    taupe: 'text-[#A8968B]',
    white: 'text-white',
    black: 'text-[#1A1A1A]',
    gold: 'text-[#C9A86A]',
    terracota: 'text-[#B56A4A]',
    danger: 'text-[#B56A4A]',
    success: 'text-[#4A7C59]',
    warning: 'text-[#C9A86A]',
    info: 'text-[#8D9ABA]',
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