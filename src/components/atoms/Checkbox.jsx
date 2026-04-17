import FieldWrapper from "./FieldWrapper";

const Checkbox = ({
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
      label={null} // prevent default label rendering
      required={required}
      error={error}
      wrapperClass={wrapperClass}
      labelClass={labelClass}
      errorClass={errorClass}
    >
      <label className={`checkbox-wrapper ${className}`}>
        <input type="checkbox" required={required} {...props} />
        {label && (
          <span>
            {label} {required && <span className="required">*</span>}
          </span>
        )}
      </label>
    </FieldWrapper>
  );
};

export default Checkbox;