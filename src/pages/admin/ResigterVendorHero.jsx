import { useState } from "react";
import AddVendor from "./AddVendor";
import BankDetails from "./BankDetails";
import BusinessDetails from "./BusinessDetails";
import KYCVerification from "./KYCVerification";
import LocationVerification from "./LocationVerification";
import ReviewSubmit from "./ReviewSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { vendorSchema } from "../../validations/vendor.schema";
import { yupResolver } from "@hookform/resolvers/yup"

const allSteps = [
  AddVendor,
  BusinessDetails,
  BankDetails,
  LocationVerification,
  KYCVerification,
  ReviewSubmit,
];

const stepFields = [
  ["businessName", "ownerFullName", "mobileNo"],
  ["gstNumber", "panNumber", "businessCategory", "yearInBusiness", "monthlyPurchaseVolume", "panCard"],
  ["accountHolderName", "bankName", "accountNumber", "confirmAccountNumber", "ifscCode", "upiId", "cancelledCheque"],
  ["address", "landmark", "city", "state", "pinCode", "enableAutoCheckIn", "timeZone"],
  ["panCard", "aadhaarFront", "aadhaarBack", "ownerPhoto", "liveSelfie"],
  [],
];

const ResigterVendorHero = () => {
  const [step, setStep] = useState(0);

  const methods = useForm({
    resolver: yupResolver(vendorSchema),
    mode: "onChange",
    defaultValues: {},
  });

  const CurrentStep = allSteps[step];

  const next = async () => {
    const valid = await methods.trigger(stepFields[step]); // validate current fields
    if (!valid) return;

    setStep((prev) => prev + 1);
  };

  const prev = () => setStep((prev) => prev - 1);

  const onSubmit = async (data) => {
    console.log("FINAL DATA", data);

    // 👉 1. Call create vendor API
    // 👉 2. Get vendorId
    // 👉 3. Upload files separately
  };

  return (
    <FormProvider {...methods}>
      {/* <form onSubmit={methods.handleSubmit(onSubmit)}> */}
        <CurrentStep />

        <div className="stepper-footer d-flex justify-content-between">
          {step > 0 ? (
            <button type="button" onClick={prev}>
              Previous
            </button> 
          ) : <div/>}

          {step < allSteps.length - 1 ? (
            <button type="button" onClick={next}>
              Next
            </button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      {/* </form> */}
    </FormProvider>
  );
};

export default ResigterVendorHero;
