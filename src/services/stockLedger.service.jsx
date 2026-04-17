import { useQuery } from "@tanstack/react-query";

const MOCK_TRANSACTIONS = [
  { id: "TID58475", date: "Tuesday, 25 April, 10:32 PM", items: "01", qty: 15, type: "Completed" },
  { id: "TID78459", date: "Tuesday, 22 April, 7:12 PM", items: "04", qty: 52, type: "Completed" },
  { id: "TID68485", date: "Tuesday, 01 April, 02:52 PM", items: "02", qty: 24, type: "Rejected" },
  { id: "TID22547", date: "Tuesday, 18 April, 04:56 PM", items: "02", qty: 36, type: "Completed" },
  { id: "TID33218", date: "Monday, 17 April, 11:20 AM", items: "03", qty: 18, type: "Rejected" },
  { id: "TID44102", date: "Sunday, 16 April, 09:05 AM", items: "01", qty: 60, type: "Completed" },
];

const MOCK_STATS = {
  totalEntries: 54852,
  stockIn: 325,
  stockOut: 486
};

const fetchMockTransactions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_TRANSACTIONS), 600);
  });
};

const fetchMockStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_STATS), 500);
  });
};

export const useGetStockLedgerTransactions = () => {
  return useQuery({
    queryKey: ["mockStockLedgerTransactions"],
    queryFn: fetchMockTransactions,
  });
};

export const useGetStockLedgerStats = () => {
  return useQuery({
    queryKey: ["mockStockLedgerStats"],
    queryFn: fetchMockStats,
  });
};
