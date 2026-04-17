import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
import FieldWrapper from "../../components/atoms/FieldWrapper";
import { useFormContext } from "react-hook-form";
export default function AddVendor() {
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();

  const value = getValues()

  const handleVerifyOtp = () => {
    if(value?.isMobileVerified) return

      setValue("isMobileVerified", true, { shouldValidate: true });
  };

  const storeOptions = [
    { label: "Retail", value: "retail" },
    { label: "Wholesale", value: "wholesale" },
  ];
     
  const registerMobile = {...register("mobile")}

  return (
    <div className="vendor-container formsec">
      <div className="darkbox">
        {/* Business Name */}
        <Input
          label="Business Name"
          name="businessName"
          placeholder="Enter business name"
          {...register("businessName")}
          error={errors.businessName?.message}
          required
        />

        {/* Owner Name */}
        <Input
          label="Owner Full Name"
          name="ownerName"
          placeholder="Enter owner's full name"
          {...register("ownerName")}
          error={errors.ownerName?.message}
          required
        />

        {/* Mobile + OTP (Use FieldWrapper instead of custom div) */}

        <div className="mobile-row">
          <Input
            label={"Mobile Number"} // prevent duplicate label
            name="mobile"
            placeholder="+91 00000 00000"
            {...registerMobile}
            onChange={(e) => {
              registerMobile.onChange(e); 
              setValue("isMobileVerified", false);
            }}
            error={errors.mobile?.message || errors.isMobileVerified?.message}
            required
            wrapperClass="flex-fill mb-0"
          />

          {value.mobile && <button type="button" className="otp-btn" onClick={handleVerifyOtp} >
            {value?.isMobileVerified ? 'Verified' : 'Verify OTP'}
          </button>}
        </div>

        {/* Alternate */}
        <Input
          label="Alternate Contact"
          name="alternateContact"
          placeholder="Enter alternate mobile number"
          {...register("alternateContact")}
          error={errors.alternateContact?.message}
        />

        {/* Email */}
        <Input
          label="Email ID"
          type="email"
          name="email"
          placeholder="vendor@example.com"
          {...register("email")}
          error={errors.email?.message}
        />

        {/* Store Type */}
        <Select
          label="Store Type"
          name="storeType"
          {...register("storeType")}
          error={errors.storeType?.message}
          options={storeOptions}
          placeholder="Select store type"
        />

        {/* GST Toggle (also wrap for consistency) */}
        <FieldWrapper error={errors.gstRegistered?.message}>
          <div className="togglebtn">
            <div>
              <p className="gst-title">GST Registered?</p>
              <span>Enable if business has GST registration</span>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                name="isGstRegistered"
                {...register("isGstRegistered")}
              />
              <span className="toggleslider"></span>
            </label>
          </div>
        </FieldWrapper>
      </div>
    </div>
  );
}
