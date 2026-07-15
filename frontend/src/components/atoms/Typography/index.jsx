import classNames from 'classnames';

const variants = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-semibold',
  h4: 'text-xl font-medium',
  body: 'text-base text-text-secondary',
  bodyLarge: 'text-lg text-text-secondary',
  caption: 'text-sm text-text-secondary',
};

const Typography = ({ variant = 'body', children, className, as: Component = 'p', ...props }) => {
  const classes = classNames(variants[variant] || variants.body, className);

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
};

export default Typography;