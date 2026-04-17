export const BaseButton = ({
  children,
  className = "",
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <button
      className={`btn ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="spinner" />
      ) : (
        <>
          {leftIcon && <span className="btn-icon">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="btn-icon">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  ...props
}) => {
  return (
    <BaseButton
      isLoading={isLoading}
      className={`btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </BaseButton>
  );
};


const NormalButton = ({ children, variant = "primary", ...props }) => {
  return (
    <button className={`btn btn-${variant}`} {...props}>
      {children}
    </button>
  );
};

export default NormalButton