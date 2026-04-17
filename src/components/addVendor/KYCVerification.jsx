import { Controller, useFormContext } from "react-hook-form";
import Upload from "../../components/atoms/Upload";
import FieldWrapper from "../../components/atoms/FieldWrapper";
import { useCallback } from "react";
import { useDeleteVendorFile } from "../../services/distributor.service";

export default function KYCVerification() {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  
  const deleteDocMutation = useDeleteVendorFile();

  const fileValidation = {
    validate: (file) => {
      if (!file) return true;

      if (file.size > 2 * 1024 * 1024) {
        return "File must be less than 2MB";
      }

      return true;
    },
  };


  const handleDeleteFile = useCallback(
    ({ key }) => {
      const file = getValues(key);

      if (!(file instanceof File) && file?.id) {
        deleteDocMutation.mutate(file.id, {
          onSuccess: () => {
            setValue(key, null);
          },
        });

        return;
      }

      setValue(key, null);
    },
    [setValue, getValues, deleteDocMutation],
  );

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
          name="panImage"
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
              error={errors.panImage?.message}
              accept="image/*,application/pdf"
              preview
              required
              onDelete={() => handleDeleteFile({ key: "panImage" })}
            />
          )}
        />

        {/* Aadhaar Front */}
        <Controller
          name="aadharFrontImage"
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
              error={errors.aadharFrontImage?.message}
              accept="image/*,application/pdf"
              preview
              required
              onDelete={() => handleDeleteFile({ key: "aadharFrontImage" })}
            />
          )}
        />

        {/* Aadhaar Back */}
        <Controller
          name="aadharBackImage"
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
              error={errors.aadharBackImage?.message}
              accept="image/*,application/pdf"
              preview
              required
              onDelete={() => handleDeleteFile({ key: "aadharBackImage" })}
            />
          )}
        />

        {/* Owner Photo */}
        <Controller
          name="ownerPhotoImage"
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
              error={errors.ownerPhotoImage?.message}
              accept="image/*"
              preview
              required
              onDelete={() => handleDeleteFile({ key: "ownerPhotoImage" })}
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
          name="selfieImage"
          control={control}
          defaultValue={null}
          rules={fileValidation}
          render={({ field }) => (
            <Upload
              label="Capture / Upload Selfie"
              file={field.value}
              onChange={(file) => field.onChange(file)}
              error={errors.selfieImage?.message}
              accept="image/*"
              preview
              onDelete={() => handleDeleteFile({ key: "selfieImage" })}
            />
          )}
        />
      </div>
    </div>
  );
}
