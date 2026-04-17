import FieldWrapper from "./FieldWrapper";

const Textarea = ({
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
      <textarea
        className={`textarea ${className}`}
        required={required}
        {...props}
      />
    </FieldWrapper>
  );
};

export default Textarea;