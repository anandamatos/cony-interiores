import classNames from 'classnames';

const variants = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning-dark',
  error: 'bg-error/10 text-error',
  info: 'bg-primary/10 text-primary',
  neutral: 'bg-gray-100 text-text-secondary',
};

const Badge = ({ variant = 'neutral', children, className, ...props }) => {
  const classes = classNames(
    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    variants[variant],
    className
  );

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};

export default Badge;