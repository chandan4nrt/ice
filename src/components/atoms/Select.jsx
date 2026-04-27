import FieldWrapper from "./FieldWrapper";

// options: array 
// mapField: { label: 'name', value: 'id' }

const Select = ({
  label,
  options = [],
  mapField = { label: "label", value: "value" },
  error,
  required,
  className = "",
  wrapperClass = "",
  labelClass = "",
  errorClass = "",
  placeholder = "Select...",
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
      <select
        className={`select ${className}`}
        required={required}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((item, index) => (
          <option
            key={item[mapField.value] ? item[mapField.value] : index}
            value={item[mapField.value]}
          >
            {item[mapField.label]}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};

export default Select;