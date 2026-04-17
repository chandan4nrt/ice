import { useCallback } from "react";
import Input from "../../components/atoms/Input";
import Upload from "../../components/atoms/Upload";
import { useFormContext, Controller } from "react-hook-form";
import { useDeleteVendorFile } from "../../services/distributor.service";

export default function BankDetails() {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const deleteDocMutation = useDeleteVendorFile();

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
      {/* Info Box */}
      <div className="darkbox">
        <div className="info-icon"></div>
        <div>
          <h4>Bank Details Usage</h4>
          <p>Bank details used for refunds & credit settlements</p>
        </div>
      </div>

      <div className="darkbox">
        {/* Account Holder */}
        <Input
          label="Account Holder Name"
          name="accountHolderName"
          placeholder="Enter account holder's full name"
          {...register("accountHolderName")}
          required
          error={errors.accountHolderName?.message}
        />

        {/* Bank Name */}
        <Input
          label="Bank Name"
          name="bankName"
          placeholder="Enter bank name"
          {...register("bankName")}
          required
          error={errors.bankName?.message}
        />

        {/* Account Number */}
        <Input
          label="Account Number"
          name="accountNumber"
          placeholder="Enter account number"
          {...register("accountNumber")}
          required
          error={errors.accountNumber?.message}
        />

        {/* Confirm Account Number */}
        <Input
          label="Confirm Account Number"
          name="confirmAccountNumber"
          placeholder="Re-enter account number"
          {...register("confirmAccountNumber")}
          required
          error={errors.confirmAccountNumber?.message}
        />

        {/* IFSC */}
        <Input
          label="IFSC Code"
          name="ifscCode"
          placeholder="ABCD0123456"
          {...register("ifscCode")}
          required
          error={errors.ifscCode?.message}
        />

        {/* UPI */}
        <Input
          label="UPI ID (Optional)"
          name="upiId"
          placeholder="vendor@upi"
          {...register("upiId")}
          error={errors.upiId?.message}
        />

        {/* Upload Cheque */}
        <Controller
          name="cancelledChequeImage"
          control={control}
          defaultValue={null}
          rules={{
            validate: (file) => {
              if (!file) return true;

              if (file.size > 2 * 1024 * 1024) {
                return "File must be less than 2MB";
              }

              return true;
            },
          }}
          render={({ field }) => (
            <Upload
              label="Upload Cancelled Cheque"
              file={field.value}
              onChange={(file) => field.onChange(file)}
              error={errors.cancelledChequeImage?.message}
              accept="image/*,application/pdf"
              preview
              onDelete={() => handleDeleteFile({ key: "cancelledChequeImage" })}
            />
          )}
        />
      </div>
    </div>
  );
}
