import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function BackHeader({ onMenuClick }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { enquiryId } = useParams();
  const { logout } = useAuth();

  const [enquiryName, setEnquiryName] = useState(
    sessionStorage.getItem("enquiryHeaderName") || ""
  );

  /* Sync when route changes */
  useEffect(() => {
    setEnquiryName(sessionStorage.getItem("enquiryHeaderName") || "");
  }, [pathname]);

  /* Listen custom event */
  useEffect(() => {
    const syncName = () => {
      setEnquiryName(sessionStorage.getItem("enquiryHeaderName") || "");
    };

    window.addEventListener("enquiryHeaderUpdate", syncName);
    return () =>
      window.removeEventListener("enquiryHeaderUpdate", syncName);
  }, []);

  /* Hide header for specific page */
  if (pathname.includes("/dashboard")) return null;

  /* Page meta titles */
  const pageMeta = {
    "/vendor/incoming-stocks": {
      title: "Incoming Stocks",
      subtitle: "Receive supplier deliveries and update stock",
    },
    "/vendor/create-retailer-order": {
      title: "Create Retailer Order",
      subtitle: "Create a new wholesale order for your retail partners",
    },
    "/vendor/stock-ledger": {
      title: "Stocks Ledger",
      subtitle: "Track all stock movements and transactions",
    },
    "/admin/add-vendor": {
      title: "Add Vendor",
      subtitle: "Enter basic information to get started",
    },
    "/admin/business-details": {
      title: "Business Details",
      subtitle: "Provide your business registration information",
    },
    "/admin/kyc-verification": {
      title: "KYC Verification",
      subtitle: "Secure identity verification for vendor onboarding",
    },
    "/admin/bank-details": {
      title: "Bank Details",
      subtitle: "Add banking information for payments and settlements",
    },
    "/admin/location-verification": {
      title: "Location Verification",
      subtitle: "Set store location for delivery and geofencing",
    },
    "/admin/review-submit": {
      title: "Review & Submit",
      subtitle: "Review all information before submitting for approval",
    },
  };

  let title = pageMeta[pathname]?.title;
  let subtitle = pageMeta[pathname]?.subtitle;

  /* Enquiry detail page */
  if (pathname.startsWith("/admin/enquiries/") && enquiryId) {
    title = `Enquiry #${enquiryId}`;
    subtitle = enquiryName;
  }

  /* Auto title from URL */
  if (!title) {
    title = pathname
      .split("/")
      .pop()
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return (
    <div className="back-header"> 
        <button className="back-btn" onClick={() => navigate(-1)} >
          <ArrowLeft size={30} />
        </button> 
        <div className="title-group">
          <h2 className="page-title">{title}</h2>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div> 
      {/* <div>
        <button className="btn mobileshow" onClick={onMenuClick}>
          <Menu size={22} />
        </button>
      </div> */}
    </div>
  );
}