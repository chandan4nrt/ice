import { useEffect, useState } from "react";
import ReviewSubmit from "./ReviewSubmit";
import { FormProvider, useForm } from "react-hook-form";
import { vendorSchema } from "../../validations/vendor.schema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useEditVendor,
  useGetVendorById,
  useUploadVendorFile,
} from "../../services/distributor.service";
import { useLocation } from "react-router-dom";
import {
  extractFirstErrorMessage,
  extractingVendorDocuments,
  sanitizeVendorPayload,
  stepFields,
} from "./helper";
import AddVendor from "./AddVendor";
import BusinessDetails from "./BusinessDetails";
import BankDetails from "./BankDetails";
import LocationVerification from "./LocationVerification";
import KYCVerification from "./KYCVerification";
import { useLoader } from "../../context/LoaderContext";
import { useNotification } from "../../context/NotificationContext";

const mapVendorToForm = (vendor) => {
  if (!vendor) return {};

  const docMap = {
    Pan_Image: "panImage",
    Aadhar_Front_Image: "aadharFrontImage",
    Aadhar_Back_Image: "aadharBackImage",
    Owner_Photo_Image: "ownerPhotoImage",
    Selfie_Image: "selfieImage",
    Cancelled_Cheque_Image: "cancelledChequeImage",
    Shop_License_Image: "shopLicenseImage",
    Ggt_Certificate_Image: "gstCertificateImage",
  };

  const documentFields = {};
  const { documents, ...rest } = vendor;

  documents?.forEach((doc) => {
    const fieldKey = docMap[doc.documentType];

    if (fieldKey) {
      documentFields[fieldKey] = {
        url: doc.storagePath.replace(/\\/g, "/"),
        name: doc.fileName,
        id: doc.id, // optional (useful for delete API)
      };
    }
  });

  return {
    ...rest,
    isMobileVerified: true,
    ...documentFields,
  };
};

const UpdateVendorHero = () => {
  const [step, setStep] = useState(0);
  const location = useLocation();
  const { vendorId } = location.state;
  const { showLoader, hideLoader } = useLoader();
  const { showNotification } = useNotification();

  const { data: vendor } = useGetVendorById({ vendorId });

  const methods = useForm({
    resolver: yupResolver(vendorSchema),
    mode: "onChange",
    defaultValues: {},
  });

  const { reset } = methods;

  /** API Services */
  const editVendorMutation = useEditVendor();
  const uploadDocMutation = useUploadVendorFile();

  /** SideEffect */
  useEffect(() => {
    if (vendor && reset) {
      const finalValue = mapVendorToForm(vendor);
      reset(finalValue);
    }
  }, [vendor, reset]);

  useEffect(() => {
    if (editVendorMutation.isPending) {
      showLoader("Saving vendor details...");
    } else if (uploadDocMutation.isPending) {
      showLoader("Uploading vendor docs..");
    } else {
      hideLoader();
    }
  }, [
    editVendorMutation.isPending,
    uploadDocMutation.isPending,
    showLoader,
    hideLoader,
  ]);

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
    if(step === 2 && !isGstRegistered){
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
    try {
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
      const res = await editVendorMutation.mutateAsync({
        payload: vendorInfo,
        vendorId,
      });

      /** Extrating vendor docs and docsType that need to be uploaded */
      const vendorDocs = extractingVendorDocuments(docs);
      
      /** Uploading file using vendorId */
      const hasNeedToUploadFile = [...vendorDocs.formData.values()].length > 0
      if(hasNeedToUploadFile){
        uploadDocMutation.mutate({ ...vendorDocs, vendorId: res.data.vendorId });
      }
    } catch (error) {
      console.log("erorr : ", error);
    }
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

export default UpdateVendorHero;
