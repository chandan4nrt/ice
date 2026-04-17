import * as yup from "yup";

export const vendorSchema = yup.object({
  // STEP 1: BASIC INFO
  businessName: yup.string().trim().required("Business name is required"),

  ownerName: yup.string().trim().required("Owner name is required"),

  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile number")
    .required("Mobile number is required"),

  isMobileVerified: yup
    .boolean()
    .when("mobile", {
      is: (val) => !!val,
      then: (schema) => {
        return schema.oneOf([true], "Please verify mobile no");
      },
    })
    .default(false),
    
  alternateContact: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "is-valid-alt",
      "Enter valid 10-digit number",
      (val) => !val || /^[0-9]{10}$/.test(val),
    ),

  email: yup.string().nullable().notRequired().email("Invalid email format"),

  storeType: yup.string().required("Store type is required"),

  isGstRegistered: yup.boolean().required("GST selection is required"),

  // STEP 2: BUSINESS DETAILS
  gstNumber: yup
    .string()
    .nullable()
    .when("isGstRegistered", {
      is: true,
      then: (schema) =>
        schema
          // .matches(
          //   /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/,
          //   "Invalid GST number",
          // )
          .required("GST number is required"),
      otherwise: (schema) => schema.nullable(),
    }),

  panNumber: yup
    .string()
    // .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number")
    .required("PAN number is required"),

  licenseNumber: yup.string().nullable(),

  fssaiNumber: yup.string().nullable(),

  category: yup.string().required("Business category is required"),

  yearsInBusiness: yup.string().required("Years in business is required"),

  monthlyVolume: yup.string().required("Monthly volume is required"),

  // STEP 2 FILES
  gstCertificateImage: yup.mixed().nullable(),

  shopLicenseImage: yup.mixed().nullable(),

  // STEP 3: KYC
  panImage: yup.mixed().required("PAN card is required"),

  aadharFrontImage: yup.mixed().required("Aadhar front is required"),

  aadharBackImage: yup.mixed().required("Aadhar back is required"),

  ownerPhotoImage: yup.mixed().required("Owner photo is required"),

  selfieImage: yup.mixed().nullable(),

  // STEP 4: BANK DETAILS
  accountHolderName: yup.string().required("Account holder name is required"),

  bankName: yup.string().required("Bank name is required"),

  accountNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Only numbers allowed")
    .required("Account number is required"),

  confirmAccountNumber: yup
    .string()
    .oneOf([yup.ref("accountNumber")], "Account numbers must match")
    .required("Confirm account number is required"),

  ifscCode: yup
    .string()
    // .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code")
    .required("IFSC code is required"),

  upiId: yup
  .string()
  .nullable()
  .notRequired()
  .test(
    "is-valid-upi",
    "Invalid UPI ID",
    (value) => {
      if (!value) return true; // allow empty
      return /^[\w.-]+@[\w.-]+$/.test(value);
    }
  ),

  cancelledChequeImage: yup.mixed().nullable(),

  // STEP 5: LOCATION
  address: yup.string().required("Address is required"),

  landmark: yup.string().nullable(),

  city: yup.string().required("City is required"),

  state: yup.string().required("State is required"),

  pinCode: yup
    .string()
    .matches(/^[0-9]{6}$/, "Enter valid 6-digit pincode")
    .required("Pincode is required"),

  latitude: yup.number().required("Latitude is required"),

  longitude: yup.number().required("Longitude is required"),

  isGeofenceEnabled: yup.boolean().required(),

  // STEP 6: FREEZER DETAILS
  isFreezerRequired: yup.boolean().required(),

  freezerCapacity: yup
    .string()
    .nullable()
    .when("isFreezerRequired", {
      is: true,
      then: (schema) => schema.required("Freezer capacity is required"),
    }),

  // METADATA (optional)
  createdBy: yup.string().nullable(),

  createdAt: yup.string().nullable(),

  updatedAt: yup.string().nullable(),

  timeZone: yup.string().nullable(),
});
