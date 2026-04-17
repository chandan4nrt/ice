import Input from "../../components/atoms/Input";
import Upload from "../../components/atoms/Upload";
import { useFormContext, Controller } from "react-hook-form";

export default function BankDetails() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

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
          placeholder="Enter account holder's full name"
          {...register("accountHolderName")}
          required
          error={errors.accountHolderName?.message}
        />

        {/* Bank Name */}
        <Input
          label="Bank Name"
          placeholder="Enter bank name"
          {...register("bankName")}
          required
          error={errors.bankName?.message}
        />

        {/* Account Number */}
        <Input
          label="Account Number"
          placeholder="Enter account number"
          {...register("accountNumber")}
          required
          error={errors.accountNumber?.message}
        />

        {/* Confirm Account Number */}
        <Input
          label="Confirm Account Number"
          placeholder="Re-enter account number"
          {...register("confirmAccountNumber")}
          required
          error={errors.confirmAccountNumber?.message}
        />

        {/* IFSC */}
        <Input
          label="IFSC Code"
          placeholder="ABCD0123456"
          {...register("ifscCode")}
          required
          error={errors.ifscCode?.message}
        />

        {/* UPI */}
        <Input
          label="UPI ID (Optional)"
          placeholder="vendor@upi"
          {...register("upiId")}
          error={errors.upiId?.message}
        />

        {/* Upload Cheque */}
        <Controller
          name="cancelledCheque"
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
              error={errors.cancelledCheque?.message}
              accept="image/*,application/pdf"
              preview
            />
          )}
        />
      </div>
    </div>
  );
}
