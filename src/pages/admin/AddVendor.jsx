import Input from "../../components/atoms/Input";
import Select from "../../components/atoms/Select";
import FieldWrapper from "../../components/atoms/FieldWrapper"; // import
import { useFormContext } from "react-hook-form";

export default function AddVendor() {
  const {
    register,
    value,
    formState: { errors },
  } = useFormContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);
  };

  const storeOptions = [
    { label: "Retail", value: "retail" },
    { label: "Wholesale", value: "wholesale" },
  ];

  return (
    <div className="vendor-container formsec">
      <form onSubmit={handleSubmit}>
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
            name="ownerFullName"
            placeholder="Enter owner's full name"
            {...register("ownerFullName")}
            error={errors.ownerFullName?.message}
            required
          />

          {/* Mobile + OTP (Use FieldWrapper instead of custom div) */}

          <div className="mobile-row">
            <Input
              label={"Mobile Number"} // prevent duplicate label
              name="mobile"
              placeholder="+91 00000 00000"
              {...register("mobileNo")}
              error={errors.mobileNo?.message}
              required
              wrapperClass="flex-fill mb-0"
            />

            <button type="button" className="otp-btn">
              Verify OTP
            </button>
          </div>

          {/* Alternate */}
          <Input
            label="Alternate Contact"
            name="altMobile"
            placeholder="Enter alternate mobile number"
            {...register("alternateContact")}
            error={errors.alternateContact?.message}
          />

          {/* Email */}
          <Input
            label="Email ID"
            type="email"
            name="emailId"
            placeholder="vendor@example.com"
            {...register("emailId")}
            error={errors.emailId?.message}
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

              {/* <Checkbox
                label={"toggleslider"}
                {...register("gstRegistered")}
                error={errors.gstRegistered?.message}
              /> */}

              <label className="switch">
                <input
                  type="checkbox"
                  name="gst"
                  {...register("gstRegistered")}
                />
                <span className="toggleslider"></span>
              </label>
            </div>
          </FieldWrapper>

          {/* Submit */}
          <button type="submit" className="continue-btn">
            CONTINUE
          </button>
        </div>
      </form>
    </div>
  );
}
