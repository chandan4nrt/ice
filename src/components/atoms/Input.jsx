import FieldWrapper from "./FieldWrapper";

const Input = ({
  label,
  type = "text",
  error,
  required,
  className = "",
  wrapperClass = "",
  labelClass = "",
  errorClass = "",
  ...props
}) => {
  return (
    <FieldWrapper
      label={label}
      required={required}
      error={error}
      wrapperClass={wrapperClass}
      labelClass={labelClass}
      errorClass={errorClass}
    >
      <input
        type={type}
        className={`input ${className}`}
        required={required}
        {...props}
      />
    </FieldWrapper>
  );
};

export default Input;