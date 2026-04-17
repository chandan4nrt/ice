const FieldWrapper = ({
  label,
  required,
  error,
  children,
  wrapperClass = "",
  labelClass = "",
  errorClass = "",
}) => {
  return (
    <div className={`field-wrapper ${wrapperClass}`}>
      {label && (
        <label className={`label ${labelClass}`}>
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      {children}
      {error && <p className={`error text-danger small ${errorClass}`}>{error}</p>}
    </div>
  );
};

export default FieldWrapper