import { useQuery } from "@tanstack/react-query";

const MOCK_INCOMING_STATS = {
  pendingTransfers: 127,
  totalItemsExpected: 538
};

const MOCK_INCOMING_TRANSFERS = [
  {
    id: "TRF-5612",
    status: "Expected",
    supplier: "Meraki Iceberg (opc) pvt. ltd.",
    reference: "REP-1043",
    expectedDate: "2026-02-26",
    items: [
      { id: 1, name: "Crushed ICE 1.25 KG", expectedQty: 8, receivedQty: 8 },
      { id: 2, name: "Full Cubes ICE", expectedQty: 12, receivedQty: 6 },
    ],
  },
  {
    id: "TRF-5613",
    status: "Expected",
    supplier: "Meraki Iceberg (opc) pvt. ltd.",
    reference: "REP-1044",
    expectedDate: "2026-02-27",
    items: [],
  }
];

const fetchIncomingStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_INCOMING_STATS), 500);
  });
};

const fetchIncomingTransfers = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_INCOMING_TRANSFERS), 600);
  });
};

export const useGetIncomingStats = () => {
  return useQuery({
    queryKey: ["mockIncomingStats"],
    queryFn: fetchIncomingStats,
  });
};

export const useGetIncomingTransfers = () => {
  return useQuery({
    queryKey: ["mockIncomingTransfers"],
    queryFn: fetchIncomingTransfers,
  });
};
