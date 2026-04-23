import { useQuery } from "@tanstack/react-query";
import { useAppMutation } from "../reactQueryConfig/hooks/useAppMutation";

// --- Mock Data for Invoice ---
const MOCK_INVOICE_DATA = {
  invoiceNo: "INV-001",
  date: "07 Apr 2026",
  ref: "REF-123",
  billFrom: {
    name: "Ranchi Ice Distributors Pvt Ltd",
    address1: "12, Industrial Area, Harmu Road, Ranchi,",
    address2: "Jharkhand 834002",
    gstin: "20RII1234567P1Z8",
    msme: "UDYAM-JH-20-0203456",
    email: "sales@ranchiicedistributors.com",
    phone: "+91 98765 67890",
  },
  billTo: {
    name: "Vishal Enterprises",
    address: "Mackey Road, Mahavir Chowk Ranchi",
    state: "Jharkhand",
    stateCode: "20",
    gstin: "22AAAAA0000A1Z5",
    phone: "+91 98765 43210",
  },
  items: [
    { id: 1, name: "Alkaline Ice Cubes", hsn: "123456", gst: "5%", qty: 2, rate: 500, amount: 1000 },
    { id: 2, name: "Neutral Ice Cubes", hsn: "123456", gst: "5%", qty: 1, rate: 300, amount: 300 },
  ],
  taxableAmount: 1300,
  sgst: 33.33,
  cgst: 33.33,
  totalAmount: 1400,
  amountInWords: "INR One Thousand Four Hundred Only",
};

// --- Mock API Fetchers ---
const fetchInvoiceDetails = async (invoiceId) => {
  console.log("Service: fetchInvoiceDetails for ID:", invoiceId);
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Service: resolving MOCK_INVOICE_DATA");
      resolve(MOCK_INVOICE_DATA);
    }, 500);
  });
};

const acceptOrder = async (orderId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { message: "Order accepted successfully" } }), 800);
  });
};

const rejectOrder = async (orderId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: { message: "Order rejected successfully" } }), 800);
  });
};

// --- React Query Hooks ---

export const useGetInvoiceDetails = (invoiceId) => {
  return useQuery({
    queryKey: ["invoiceDetails", invoiceId],
    queryFn: () => fetchInvoiceDetails(invoiceId),
    enabled: !!invoiceId,
  });
};

export const useAcceptOrder = () => {
  return useAppMutation({
    mutationFn: acceptOrder,
    successMsg: "Order accepted successfully",
    errorMsg: "Failed to accept order",
  });
};

export const useRejectOrder = () => {
  return useAppMutation({
    mutationFn: rejectOrder,
    successMsg: "Order rejected",
    errorMsg: "Failed to reject order",
  });
};
