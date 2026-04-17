import { useFormContext } from "react-hook-form";

export default function ReviewSubmit() {
  const { watch, register } = useFormContext();

  const data = watch(); // 🔥 full form data

  const getFileName = (file) => file?.name || "Not uploaded";

  return (
    <div className="vendor-container formsec">

      {/* Business Info */}
      <Card title="Business Information" status="complete">
        <Row label="Business Name" value={data.businessName} />
        <Row label="Owner Name" value={data.ownerName} />
        <Row label="Mobile Number" value={data.mobile} />
        <Row label="Email" value={data.email} />
        <Row label="Store Type" value={data.storeType} />
        <Row label="GST Registered" value={data.gstRegistered ? "Yes" : "No"} />
      </Card>

      {/* Business Details */}
      <Card title="Business Details" status="complete">
        <Row label="GST Number" value={data.gstNumber} />
        <Row label="PAN Number" value={data.panNumber} />
        <Row label="Shop License" value={data.shopLicense} />
        <Row label="FSSAI License" value={data.fssai} />
        <Row label="Business Category" value={data.category} />
        <Row label="Years in Business" value={data.years} />
        <Row label="GST Certificate" value={getFileName(data.gstFile)} />
        <Row label="Shop License Doc" value={getFileName(data.shopFile)} />
      </Card>

      {/* KYC */}
      <Card title="KYC Documents" status="complete">
        <Row label="PAN Card" value={getFileName(data.pan)} />
        <Row label="Aadhaar Front" value={getFileName(data.aadhaarFront)} />
        <Row label="Aadhaar Back" value={getFileName(data.aadhaarBack)} />
        <Row label="Owner Photo" value={getFileName(data.ownerPhoto)} />
        <Row label="Live Selfie" value={getFileName(data.selfie)} />
      </Card>

      {/* Location */}
      <Card title="Location Details" status="complete">
        <Row label="Address" value={data.address1} />
        <Row label="City" value={data.city} />
        <Row label="State" value={data.state} />
        <Row label="Pincode" value={data.pincode} />
        <Row label="Latitude" value={data.lat} />
        <Row label="Longitude" value={data.lng} />
      </Card>

      {/* Toggle */}
      <div className="allocation">
        <span>Is Freezer Allocation Required?</span>
        <label className="switch">
          <input type="checkbox" {...register("freezerRequired")} />
          <span className="slider"></span>
        </label>
        <span className="yes">
          {watch("freezerRequired") ? "Yes" : "No"}
        </span>
      </div>

      {/* Dropdown */}
      <select className="select" {...register("capacity")}>
        <option value="">Select Capacity</option>
        <option value="1">1 Ton</option>
        <option value="5">5 Ton</option>
        <option value="10">10 Ton</option>
      </select>

      {/* Submit */}
      <button type="submit" className="submit-btn">
        Submit Request for Approval
      </button>

    </div>
  );
}

/* Components */
const Card = ({ title, status, children }) => (
  <div className="darkbox">
    <div className="card-header">
      <h3>{title}</h3>

      <div className="right">
        {status === "complete" && <span className="badge green">● Complete</span>}
        {status === "missing" && <span className="badge red">⚠ Missing Info</span>}
        <span className="edit">✏ Edit</span>
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