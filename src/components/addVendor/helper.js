export const stepFields = [
  // STEP 1: BASIC INFO
  [
    "businessName",
    "ownerName",
    "mobile",
    "alternateContact",
    "email",
    "storeType",
    "isGstRegistered",
    "isMobileVerified",
  ],

  // STEP 2: BUSINESS DETAILS + PAN FILE
  [
    "gstNumber",
    "panNumber",
    "licenseNumber",
    "fssaiNumber",
    "category",
    "yearsInBusiness",
    "monthlyVolume",
    "gstCertificateImage",
    "shopLicenseImage",
    // "panImage",
  ],

  // STEP 3: BANK DETAILS
  [
    "accountHolderName",
    "bankName",
    "accountNumber",
    "confirmAccountNumber",
    "ifscCode",
    "upiId",
    "cancelledChequeImage",
  ],

  // STEP 4: LOCATION
  [
    "address",
    "landmark",
    "city",
    "state",
    "pinCode",
    "latitude",
    "longitude",
    "isGeofenceEnabled",
    "timeZone",
  ],

  // STEP 5: KYC
  [
    "panImage",
    "aadharFrontImage",
    "aadharBackImage",
    "ownerPhotoImage",
    "selfieImage",
  ],

  // STEP 6: FREEZER
  ["isFreezerRequired", "freezerCapacity"],
];

export const sanitizeVendorPayload = (data) => {
  const docs = {
    // FILES
    gstCertificateImage: data.gstCertificateImage || null,
    shopLicenseImage: data.shopLicenseImage || null,
    panImage: data.panImage,
    aadharFrontImage: data.aadharFrontImage,
    aadharBackImage: data.aadharBackImage,
    ownerPhotoImage: data.ownerPhotoImage,
    selfieImage: data.selfieImage || null,
    cancelledChequeImage: data.cancelledChequeImage || null,
  };

  const vendorInfo = {
    // BASIC INFO
    businessName: data.businessName?.trim(),
    ownerName: data.ownerName?.trim(),
    mobile: data.mobile,
    alternateContact: data.alternateContact || null,
    email: data.email || null,
    storeType: data.storeType,

    // GST
    isGstRegistered: data.isGstRegistered,
    gstNumber: data.isGstRegistered ? data.gstNumber : null,

    // BUSINESS DETAILS
    panNumber: data.panNumber,
    licenseNumber: data.licenseNumber || null,
    fssaiNumber: data.fssaiNumber || null,
    category: data.category,
    yearsInBusiness: data.yearsInBusiness,
    monthlyVolume: data.monthlyVolume,

    // BANK DETAILS
    accountHolderName: data.accountHolderName,
    bankName: data.bankName,
    accountNumber: data.accountNumber,
    confirmAccountNumber: data.confirmAccountNumber,
    ifscCode: data.ifscCode,
    upiId: data.upiId || null,

    // LOCATION
    address: data.address,
    landmark: data.landmark || "",
    city: data.city,
    state: data.state,
    pinCode: data.pinCode,
    latitude: data.latitude,
    longitude: data.longitude,
    isGeofenceEnabled: data.isGeofenceEnabled,

    // FREEZER
    isFreezerRequired: data.isFreezerRequired,
    freezerCapacity: data.isFreezerRequired ? data.freezerCapacity : null,

    // OPTIONAL META
    timeZone: data.timeZone || null,
  };

  return {
    docs,
    vendorInfo,
  };
};

export const extractingVendorDocuments = (data) => {
  const formData = new FormData();

  const documentTypes = [];
  const files = [];

  // Mapping
  const docMap = [
    { key: "gstCertificateImage", type: "Ggt_Certificate_Image" },
    { key: "shopLicenseImage", type: "Shop_License_Image" },
    { key: "panImage", type: "Pan_Image" },
    { key: "aadharFrontImage", type: "Aadhar_Front_Image" },
    { key: "aadharBackImage", type: "Aadhar_Back_Image" },
    { key: "ownerPhotoImage", type: "Owner_Photo_Image" },
    { key: "selfieImage", type: "Selfie_Image" },
    { key: "cancelledChequeImage", type: "Cancelled_Cheque_Image" },
  ];

  docMap.forEach(({ key, type }) => {
    const file = data[key];

    if (file instanceof File) {
      documentTypes.push(type);
      files.push(file);
    }
  });

  // append files
  files.forEach((file) => {
    formData.append("files", file);
  });

  return {
    queryParams: {
      documentTypes,
    },
    formData,
  };
};

export const extractFirstErrorMessage = (errors) => {
  const res = { isError: false, message: null };
  if (!errors) res;

  const keys = Object.keys(errors);

  if (keys.length) {
    const firstError = errors[keys[0]];

    res.isError = true;
    res.message = firstError.message || "Something went wrong!!";

    return res;
  }

  return res;
};
