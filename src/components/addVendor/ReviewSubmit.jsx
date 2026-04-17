import { useFormContext } from "react-hook-form";
import Checkbox from "../atoms/Checkbox";

export default function ReviewSubmit({ onEdit }) {
  const {
    watch,
    register,
    handleSubmit
  } = useFormContext();

  const data = watch(); // full form data

  const getFileName = (file) => file?.name || "Not uploaded";

  return (
    <div className="vendor-container formsec">
      {/* Business Info */}
      <Card
        title="Business Information"
        status="complete"
        onEdit={() => onEdit(0)}
      >
        <Row label="Business Name" value={data.businessName} />
        <Row label="Owner Name" value={data.ownerName} />
        <Row label="Mobile Number" value={data.mobileNo} />
        <Row label="Email" value={data.emailId} />
        <Row label="Store Type" value={data.storeType} />
        <Row label="GST Registered" value={data.isGstRegistered ? "Yes" : "No"} />
      </Card>

      {/* Business Details */}
      <Card title="Business Details" status="complete" onEdit={() => onEdit(1)}>
        <Row label="GST Number" value={data.gstNumber} />
        <Row label="PAN Number" value={data.panNumber} />
        <Row label="Shop License" value={data.licenseNo} />
        <Row label="FSSAI License" value={data.fssaiLicense} />
        <Row label="Business Category" value={data.businessCategory} />
        <Row label="Years in Business" value={data.yearInBusiness} />
        <Row
          label="GST Certificate"
          value={getFileName(data.gstCertificateImage)}
        />
        <Row
          label="Shop License Doc"
          value={getFileName(data.shopLicenseImage)}
        />
      </Card>

      {/* Bank Details */}
      <Card title="Bank Details" status="complete" onEdit={() => onEdit(2)}>
        <Row label="Account Holder" value={data.accountHolderName} />
        <Row label="Bank Name" value={data.bankName} />
        <Row label="Account Number" value={data.accountNumber} />
        <Row label="IFSC Code" value={data.ifscCode} />
        <Row label="UPI Id" value={data.upiId} />
        <Row
          label="Cancelled Cheque"
          value={getFileName(data.cancelledChequeImage)}
        />
      </Card>

      {/* Location */}
      <Card title="Location Details" status="complete" onEdit={() => onEdit(3)}>
        <Row label="Address" value={data.address} />
        <Row label="City" value={data.city} />
        <Row label="State" value={data.state} />
        <Row label="Pincode" value={data.pinCode} />
        <Row label="Latitude" value={data.latitude} />
        <Row label="Longitude" value={data.longitude} />
      </Card>

      {/* KYC */}
      <Card title="KYC Documents" status="complete" onEdit={() => onEdit(4)}>
        <Row label="PAN Card" value={getFileName(data.panImage)} />
        <Row label="Aadhaar Front" value={getFileName(data.aadharFrontImage)} />
        <Row label="Aadhaar Back" value={getFileName(data.aadharBackImage)} />
        <Row label="Owner Photo" value={getFileName(data.ownerPhotoImage)} />
        <Row label="Live Selfie" value={getFileName(data.selfieImage)} />
      </Card>

      {/* Toggle */}
      <div className="allocation">
        <Checkbox
          label="Is Freezer Allocation Required?"
          {...register("isFreezerRequired")}
        />
      </div>

      {/* Dropdown */}
      <select className="select" {...register("freezerCapacity")}>
        <option value="">Select Capacity</option>
        <option value="1">1 Ton</option>
        <option value="5">5 Ton</option>
        <option value="10">10 Ton</option>
      </select>

      {/* Submit */}
      <button type="submit" className="submit-btn" onClick={handleSubmit}>
        Submit Request for Approval
      </button>
    </div>
  );
}

/* Components */
const Card = ({ title, status, children, onEdit }) => (
  <div className="darkbox">
    <div className="card-header">
      <h3>{title}</h3>

      <div className="right">
        {status === "complete" && (
          <span className="badge green">● Complete</span>
        )}
        {status === "missing" && (
          <span className="badge red">⚠ Missing Info</span>
        )}
        <span className="edit" onClick={onEdit}>
          ✏ Edit
        </span>
      </div>
    </div>

    <div className="card-body">{children}</div>
  </div>
);

const Row = ({ label, value }) => (
  <div className="row-item">
    <span>{label}</span>
    <span className="value">{value || "-"}</span>
  </div>
);
