import FieldWrapper from "./FieldWrapper";

const DateInput = ({
  label,
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
        type="date"
        className={`input ${className}`}
        required={required}
        {...props}
      />
    </FieldWrapper>
  );
};

export default DateInput;