import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
import Upload from "../../components/atoms/Upload";
import { useFormContext, Controller } from "react-hook-form";

export default function BusinessDetails() {
  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  // Upload Fields Config
  const uploadFields = [
    { name: "gstCertificate", label: "Upload GST Certificate" },
    { name: "shopLicenseDoc", label: "Upload Shop License" },
    { name: "panCard", label: "Upload PAN Card", required: true },
    { name: "fssaiFile", label: "Upload FSSAI Certificate" },
  ];

  const categoryOptions = [
    { label: "Retail", value: "retail" },
    { label: "Wholesale", value: "wholesale" },
  ];

  const yearsOptions = [
    { label: "0-1 Years", value: "0-1" },
    { label: "1-3 Years", value: "1-3" },
    { label: "3+ Years", value: "3+" },
  ];

  const volumeOptions = [
    { label: "Below 50K", value: "50k" },
    { label: "50K - 2L", value: "2l" },
    { label: "Above 2L", value: "2l+" },
  ];

  console.log("errors >>>", errors)
  console.log("value >>>", getValues())
  return (
    <div className="vendor-container formsec">
      <div className="darkbox">
        {/* GST */}
        <Input
          label="GST Number"
          placeholder="22AAAAA0000A1Z5"
          {...register("gstNumber")}
          error={errors.gstNumber?.message}
        />

        {/* PAN */}
        <Input
          label="PAN Number"
          required
          placeholder="ABCDE1234F"
          {...register("panNumber")}
          error={errors.panNumber?.message}
        />

        {/* License */}
        <Input
          label="Shop & Establishment License No"
          placeholder="Enter license number"
          {...register("licenseNo")}
          error={errors.licenseNo?.message}
        />

        {/* FSSAI */}
        <Input
          label="FSSAI License (if applicable)"
          placeholder="Enter FSSAI license number"
          {...register("fssaiLicense")}
          error={errors.fssaiLicense?.message}
        />

        {/* Select Fields (Controller REQUIRED) */}
        <Controller
          name="businessCategory"
          control={control}
          render={({ field }) => (
            <Select
              required
              label="Business Category"
              options={categoryOptions}
              {...field}
              error={errors.businessCategory?.message}
            />
          )}
        />

        <Controller
          name="yearInBusiness"
          control={control}
          render={({ field }) => (
            <Select
              required
              label="Years in Business"
              options={yearsOptions}
              {...field}
              error={errors.yearInBusiness?.message}
            />
          )}
        />

        <Controller
          name="monthlyPurchaseVolume"
          control={control}
          render={({ field }) => (
            <Select
              required
              label="Monthly Purchase Volume"
              options={volumeOptions}
              {...field}
              error={errors.monthlyPurchaseVolume?.message}
            />
          )}
        />

        {/* Upload Section */}
        {uploadFields.map((item) => (
          <Controller
            key={item.name}
            name={item.name}
            control={control}
            rules={{
              required: item.required ? `${item.label} is required` : false,
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
                label={item.label}
                error={errors[item.name]?.message}
                file={field.value}
                onChange={(file) => field.onChange(file)}
                accept=".jpg,.png,.pdf"
                preview
              />
            )}
          />
        ))}
      </div>
    </div>
  );
}
