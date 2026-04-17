import { Controller, useFormContext } from "react-hook-form";
import Upload from "../../components/atoms/Upload";
import FieldWrapper from "../../components/atoms/FieldWrapper";

export default function KYCVerification() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const fileValidation = {
    validate: (file) => {
      if (!file) return true;

      if (file.size > 2 * 1024 * 1024) {
        return "File must be less than 2MB";
      }

      return true;
    },
  };

  return (
    <div className="vendor-container formsec">

      {/* Info Card */}
      <div className="darkbox">
        <div className="lock-icon">🔒</div>
        <div>
          <h4>Secure Document Storage</h4>
          <p>
            Documents are encrypted and securely stored. Your data is protected
            with enterprise-grade security.
          </p>
        </div>
      </div>

      <div className="darkbox">

        {/* PAN */}
        <Controller
          name="panCard"
          control={control}
          defaultValue={null}
          rules={{
            required: "PAN Card is required",
            ...fileValidation,
          }}
          render={({ field }) => (
            <Upload
              label="PAN Card (Front)"
              file={field.value}
              onChange={(file) => field.onChange(file)}
              error={errors.panCard?.message}
              accept="image/*,application/pdf"
              preview
              required
            />
          )}
        />

        {/* Aadhaar Front */}
        <Controller
          name="aadhaarFront"
          control={control}
          defaultValue={null}
          rules={{
            required: "Aadhaar Front is required",
            ...fileValidation,
          }}
          render={({ field }) => (
            <Upload
              label="Aadhaar Card (Front)"
              file={field.value}
              onChange={(file) => field.onChange(file)}
              error={errors.aadhaarFront?.message}
              accept="image/*,application/pdf"
              preview
              required
            />
          )}
        />

        {/* Aadhaar Back */}
        <Controller
          name="aadhaarBack"
          control={control}
          defaultValue={null}
          rules={{
            required: "Aadhaar Back is required",
            ...fileValidation,
          }}
          render={({ field }) => (
            <Upload
              label="Aadhaar Card (Back)"
              file={field.value}
              onChange={(file) => field.onChange(file)}
              error={errors.aadhaarBack?.message}
              accept="image/*,application/pdf"
              preview
              required
            />
          )}
        />

        {/* Owner Photo */}
        <Controller
          name="ownerPhoto"
          control={control}
          defaultValue={null}
          rules={{
            required: "Owner Photo is required",
            ...fileValidation,
          }}
          render={({ field }) => (
            <Upload
              label="Owner Photo"
              file={field.value}
              onChange={(file) => field.onChange(file)}
              error={errors.ownerPhoto?.message}
              accept="image/*"
              preview
              required
            />
          )}
        />

        {/* Selfie Info */}
        <FieldWrapper>
          <div className="label-row">
            <label>Live Selfie Verification</label>
            <span className="badge">Recommended</span>
          </div>
        </FieldWrapper>

        {/* Selfie */}
        <Controller
          name="liveSelfie"
          control={control}
          defaultValue={null}
          rules={fileValidation}
          render={({ field }) => (
            <Upload
              label="Capture / Upload Selfie"
              file={field.value}
              onChange={(file) => field.onChange(file)}
              error={errors.liveSelfie?.message}
              accept="image/*"
              preview
            />
          )}
        />

      </div>
    </div>
  );
}