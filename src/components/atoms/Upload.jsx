import FieldWrapper from "./FieldWrapper";

const getFileUrl = (file) => {
  if (!file) return null;

  const isFileObject = file instanceof File;
  if (isFileObject) return URL.createObjectURL(file);

  return file?.url;
};

const Upload = ({
  label,
  error,
  required,
  className = "",
  wrapperClass = "",
  labelClass = "",
  errorClass = "",
  file, // File object (new)
  onChange,
  onDelete, // delete handler
  accept = "*",
  preview = false,
}) => {
  const isFileObject = file instanceof File;

  const isImage = isFileObject
    ? file.type.startsWith("image/")
    : file && file?.url?.match(/\.(jpeg|jpg|png|webp)$/i);

  const isPDF = isFileObject
    ? file.type === "application/pdf"
    : file && file?.url?.endsWith(".pdf");

  const previewUrl = getFileUrl(file);

  return (
    <FieldWrapper
      required={required}
      error={error}
      wrapperClass={wrapperClass}
      labelClass={labelClass}
      errorClass={errorClass}
    >
      <div className={`upload-box ${className}`}>
        {/* Preview Section */}
        {previewUrl && preview ? (
          <>
            {isImage && (
              <img src={previewUrl} alt="preview" loading="lazy" className="preview-img" />
            )}

            {isPDF && (
              <div className="pdf-preview">
                📄 <p>{isFileObject ? file.name : "View File"}</p>
              </div>
            )}

            {/* Delete Button */}
          
          </>
        ) : (
          <>
            <div className="upload-icon">⬆</div>
            <p>{label}</p>
            <span>Drag & drop or click to browse</span>
          </>
        )}

        {/* File Input */}
        <input
          type="file"
          accept={accept}
          className="file-input"
          onChange={(e) => onChange && onChange(e.target.files[0])}
        />
         {previewUrl && preview && (
          <button
              type="button"
              className="crossbtn"
              onClick={() => onDelete && onDelete()}
            >
              ❌
            </button>
         )}
      </div>
    </FieldWrapper>
  );
};

export default Upload;
