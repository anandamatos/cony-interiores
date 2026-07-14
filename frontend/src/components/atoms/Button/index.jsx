import classNames from "classnames";

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover focus:ring-primary",
  secondary: "border-2 border-primary text-primary hover:bg-primary/10 focus:ring-primary",
  danger: "bg-error text-white hover:bg-error/90 focus:ring-error",
  ghost: "text-text-secondary hover:bg-gray-100 focus:ring-gray-200",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

const Button = ({
  variant = "primary",
  size = "md",
  children,
  className,
  loading = false,
  disabled = false,
  icon: Icon,
  onClick,
  ...props
}) => {
  const classes = classNames(
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    variants[variant],
    sizes[size],
    className,
  );

  return (
    <button className={classes} disabled={disabled || loading} onClick={onClick} {...props}>
      {loading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {!loading && Icon && <Icon className="w-4 h-4" />}
      {children}
    </button>
  );
};

export default Button;
