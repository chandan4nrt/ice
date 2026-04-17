import FieldWrapper from "./FieldWrapper";

const Radio = ({
  label,
  options = [],
  name,
  error,
  required,
  className = "",
  wrapperClass = "",
  labelClass = "",
  errorClass = "",
  optionClass = "",
  mapField = { label: "label", value: "value" },
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
      <div className={`radio-group ${className}`}>
        {options.map((opt) => (
          <label
            key={opt[mapField.value]}
            className={`radio-wrapper ${optionClass}`}
          >
            <input
              type="radio"
              name={name}
              value={opt[mapField.value]}
              required={required}
              {...props}
            />
            {opt[mapField.label]}
          </label>
        ))}
      </div>
    </FieldWrapper>
  );
};

export default Radio;