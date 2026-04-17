import { useEffect, useState } from "react";
import AddVendor from "./AddVendor";
import BankDetails from "./BankDetails";
import BusinessDetails from "./BusinessDetails";
import KYCVerification from "./KYCVerification";
import LocationVerification from "./LocationVerification";
import ReviewSubmit from "./ReviewSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { vendorSchema } from "../../validations/vendor.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useAddVendor,
  useUploadVendorFile,
} from "../../services/distributor.service";
import {
  extractFirstErrorMessage,
  extractingVendorDocuments,
  sanitizeVendorPayload,
  stepFields,
} from "./helper";
import { useLoader } from "../../context/LoaderContext";
import { useNotification } from "../../context/NotificationContext";

const ResigterVendorHero = () => {
  const [step, setStep] = useState(0);
  const { showLoader, hideLoader } = useLoader();
  const { showNotification } = useNotification();

  const methods = useForm({
    resolver: yupResolver(vendorSchema),
    mode: "onChange",
    defaultValues: {},
  });

  /** API Services */
  const createVendorMutation = useAddVendor();
  const uploadDocMutation = useUploadVendorFile();

  /** SideEffect */
  useEffect(() => {
    if (createVendorMutation.isPending) {
      showLoader("Saving vendor details...");
    } else if (uploadDocMutation.isPending) {
      showLoader("Uploading vendor docs..");
    } else {
      hideLoader();
    }
  }, [
    createVendorMutation.isPending,
    uploadDocMutation.isPending,
    showLoader,
    hideLoader,
  ]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Required for Chrome
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  /** Next step function */
  const next = async () => {
    const valid = await methods.trigger(stepFields[step]);
    if (!valid) return;

    const isGstRegistered = methods.getValues("isGstRegistered")
    
    if(step === 0 && !isGstRegistered){
      setStep((prev) => prev + 2);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  /** Prevous step function */
  const prev = () => {
    const isGstRegistered = methods.getValues("isGstRegistered")
    if(step === 2 &&  !isGstRegistered){
      setStep((prev) => prev - 2);
    } else {
      setStep((prev) => prev - 1);
    }
  }

  // Switch renderer
  const renderStep = (step) => {    
    switch (step) {
      case 0:
        return <AddVendor />;

      case 1:
        return <BusinessDetails />;

      case 2:
        return <BankDetails />;

      case 3:
        return <LocationVerification />;

      case 4:
        return <KYCVerification />;

      default:
        return null;
    }
  };

  /** Submitting the form data */
  const onSubmit = async (data) => {
    const errors = methods.formState.errors;

    const {isError, message} = extractFirstErrorMessage(errors)

    if (isError) {
      showNotification({
        message: message,
        type: "error",
        duration: 2000,
      });

      return; // stop submission
    }

    /** Sanitize payload */
    const { docs, vendorInfo } = sanitizeVendorPayload(data);

    /** Registering Vendor without docs */
    const res = await createVendorMutation.mutateAsync(vendorInfo);

    /** Extrating vendor docs and docsTypes that need to be uploaded */
    const vendorDocs = extractingVendorDocuments(docs);

    /** Uploading file using vendorId */
    uploadDocMutation.mutate({ ...vendorDocs, vendorId: res.data.vendorId });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Render Step */}
        {renderStep(step)}

        {step > 4 ? (
          <ReviewSubmit onEdit={setStep} showEdit={true} />
        ) : (
          <div className="stepper-footer d-flex justify-content-between">
            {step > 0 ? (
              <button type="button" onClick={prev}>
                Previous
              </button>
            ) : (
              <div />
            )}

            {step < 5 ? (
              <button type="button" onClick={next}>
                Next
              </button>
            ) : (
              <button type="submit">Submit</button>
            )}
          </div>
        )}
      </form>
    </FormProvider>
  );
};

export default ResigterVendorHero;
