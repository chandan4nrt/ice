import { useCallback } from "react";
import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
import Upload from "../../components/atoms/Upload";
import { useFormContext, Controller } from "react-hook-form";
import { useDeleteVendorFile } from "../../services/distributor.service";

export default function BusinessDetails() {
  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const deleteDocMutation = useDeleteVendorFile();

  // Upload Fields Config
  const uploadFields = [
    { name: "gstCertificateImage", label: "Upload GST Certificate" },
    { name: "shopLicenseImage", label: "Upload Shop License" },
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
      <div className="darkbox">
        {/* GST */}
        <Input
          label="GST Number"
          name="gstNumber"
          required
          placeholder="22AAAAA0000A1Z5"
          {...register("gstNumber")}
          error={errors.gstNumber?.message}
        />

        {/* PAN */}
        <Input
          label="PAN Number"
          required
          name="panNumber"
          placeholder="ABCDE1234F"
          {...register("panNumber")}
          error={errors.panNumber?.message}
        />

        {/* License */}
        <Input
          label="Shop & Establishment License No"
          name="licenseNumber"
          placeholder="Enter license number"
          {...register("licenseNumber")}
          error={errors.licenseNumber?.message}
        />

        {/* FSSAI */}
        <Input
          label="FSSAI License (if applicable)"
          name="fssaiNumber"
          placeholder="Enter FSSAI license number"
          {...register("fssaiNumber")}
          error={errors.fssaiNumber?.message}
        />

        {/* Select Fields (Controller REQUIRED) */}
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select
              required
              label="Business Category"
              options={categoryOptions}
              {...field}
              error={errors.category?.message}
            />
          )}
        />

        <Controller
          name="yearsInBusiness"
          control={control}
          render={({ field }) => (
            <Select
              required
              label="Years in Business"
              options={yearsOptions}
              {...field}
              error={errors.yearsInBusiness?.message}
            />
          )}
        />

        <Controller
          name="monthlyVolume"
          control={control}
          render={({ field }) => (
            <Select
              required
              label="Monthly Purchase Volume"
              options={volumeOptions}
              {...field}
              error={errors.monthlyVolume?.message}
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
                onDelete={() => handleDeleteFile({ key: item.name })}
              />
            )}
          />
        ))}
      </div>
    </div>
  );
}
