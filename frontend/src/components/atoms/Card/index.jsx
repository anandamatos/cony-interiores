import classNames from "classnames";

const Card = ({ children, className, hover = false, ...props }) => {
  const classes = classNames(
    "bg-white rounded-xl shadow-card border border-border/50 p-6",
    hover && "transition-shadow duration-200 hover:shadow-md",
    className,
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;
