import { useLocation } from "react-router-dom";
import { useGetVendorById } from "../../services/distributor.service";
import Checkbox from "../../components/atoms/Checkbox";
import FileViewer from "../../components/FileViewer";
import { Fragment, useCallback, useState } from "react";

export default function VendorDetails() {
  const location = useLocation();
  const vendorId = location.state?.vendorId;
  const [file, setFile] = useState(null);

  const { data, isLoading, isError } = useGetVendorById({ vendorId });

  const vendorData = data || {};

  // Convert documents array → map for easy access
  const docMap = {};
  vendorData.documents?.forEach((doc) => {
    docMap[doc.documentType] = doc;
  });

  // Helper to get file name
  const getDocName = (type) => docMap[type]?.fileName || "-";

  const handleViewFile = useCallback(
    (key) => {
      const file = docMap[key];
     
      setFile({
        fileName: file.fileName,
        isDownloadable: true,
        filePath: file.storagePath,
      });
    },
    [docMap],
  );

  if (!vendorId) return <div>No Vendor Selected</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading vendor details</div>;

  return (
    <Fragment>
      <div className="vendor-container formsec">
        {/* Business Info */}
        <Card title="Business Information">
          <Row label="Business Name" value={vendorData.businessName} />
          <Row label="Owner Name" value={vendorData.ownerName} />
          <Row label="Mobile Number" value={vendorData.mobile} />
          <Row label="Email" value={vendorData.email} />
          <Row label="Store Type" value={vendorData.storeType} />
          <Row
            label="GST Registered"
            value={vendorData.isGstRegistered ? "Yes" : "No"}
          />
        </Card>

        {/* Business Details */}
        <Card title="Business Details">
          <Row label="GST Number" value={vendorData.gstNumber} />
          <Row label="PAN Number" value={vendorData.panNumber} />
          <Row label="Shop License" value={vendorData.licenseNumber} />
          <Row label="FSSAI License" value={vendorData.fssaiNumber} />
          <Row label="Business Category" value={vendorData.category} />
          <Row label="Years in Business" value={vendorData.yearsInBusiness} />

          <Row
            label="GST Certificate"
            value={getDocName("Ggt_Certificate_Image")}
            onClick={() => handleViewFile("Ggt_Certificate_Image")}
          />
          <Row
            label="Shop License Doc"
            value={getDocName("Shop_License_Image")}
            onClick={() => handleViewFile("Shop_License_Image")}
          />
        </Card>

        {/* Bank Details */}
        <Card title="Bank Details">
          <Row label="Account Holder" value={vendorData.accountHolderName} />
          <Row label="Bank Name" value={vendorData.bankName} />
          <Row label="Account Number" value={vendorData.accountNumber} />
          <Row label="IFSC Code" value={vendorData.ifscCode} />
          <Row label="UPI Id" value={vendorData.upiId} />
          <Row
            label="Cancelled Cheque"
            value={getDocName("Cancelled_Cheque_Image")}
            onClick={() => handleViewFile("Cancelled_Cheque_Image")}
          />
        </Card>

        {/* Location */}
        <Card title="Location Details">
          <Row label="Address" value={vendorData.address} />
          <Row label="City" value={vendorData.city} />
          <Row label="State" value={vendorData.state} />
          <Row label="Pincode" value={vendorData.pinCode} />
          <Row label="Latitude" value={vendorData.latitude} />
          <Row label="Longitude" value={vendorData.longitude} />
        </Card>

        {/* KYC */}
        <Card title="KYC Documents">
          <Row
            label="PAN Card"
            value={getDocName("Pan_Image")}
            onClick={() => handleViewFile("Pan_Image")}
          />
          <Row
            label="Aadhaar Front"
            value={getDocName("Aadhar_Front_Image")}
            onClick={() => handleViewFile("Aadhar_Front_Image")}
          />
          <Row
            label="Aadhaar Back"
            value={getDocName("Aadhar_Back_Image")}
            onClick={() => handleViewFile("Aadhar_Back_Image")}
          />
          <Row
            label="Owner Photo"
            value={getDocName("Owner_Photo_Image")}
            onClick={() => handleViewFile("Owner_Photo_Image")}
          />
          <Row
            label="Live Selfie"
            value={getDocName("Selfie_Image")}
            onClick={() => handleViewFile("Selfie_Image")}
          />
        </Card>

        {/* Toggle */}
        <div className="allocation">
          <Checkbox
            label="Is Freezer Allocation Required?"
            checked={vendorData.isFreezerRequired}
            readOnly
          />
        </div>

        {/* Dropdown */}
        <select
          className="select"
          value={vendorData.freezerCapacity || ""}
          disabled
        >
          <option value="">Select Capacity</option>
          <option value="1">1 Ton</option>
          <option value="5">5 Ton</option>
          <option value="10">10 Ton</option>
        </select>
      </div>
      {!!file && <FileViewer onClose={setFile} open={!!file} file={file} />}
    </Fragment>
  );
}

/* Components */
const Card = ({ title, children }) => (
  <div className="darkbox">
    <div className="card-header">
      <h3>{title}</h3>
    </div>

    <div className="card-body">{children}</div>
  </div>
);

const Row = ({ label, value, onClick }) => (
  <div className="row-item cursor-pointer" onClick={onClick}>
    <span>{label}</span>
    <span className="value">{value || "-"}</span>
  </div>
);
