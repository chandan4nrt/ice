import { useQuery } from "@tanstack/react-query";
import { useAppMutation } from "../reactQueryConfig/hooks/useAppMutation";

// --- Mock Data ---

const MOCK_PRODUCTS = [
  { name: "Ice Cube 1", price: 30 },
  { name: "Product 2", price: 200 },
  { name: "Product 3", price: 300 },
];

const MOCK_DATES = [
  "Monday, June 9, 2025",
  "Tuesday, June 10, 2025",
  "Wednesday, June 11, 2025",
  "Thursday, June 12, 2025",
];

// --- Mock API Fetchers ---

const fetchMockProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_PRODUCTS), 600);
  });
};

const fetchMockDates = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_DATES), 400);
  });
};

const submitReplenishmentOrder = async (payload) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful API response
      resolve({ data: { message: "Order created successfully", id: Math.floor(Math.random() * 1000) } });
    }, 1000);
  });
};

// --- React Query Hooks ---

export const useGetProducts = () => {
  return useQuery({
    queryKey: ["mockProducts"],
    queryFn: fetchMockProducts,
  });
};

export const useGetDeliveryDates = () => {
  return useQuery({
    queryKey: ["mockDeliveryDates"],
    queryFn: fetchMockDates,
  });
};

export const useCreateReplenishmentOrder = () => {
  return useAppMutation({
    mutationFn: submitReplenishmentOrder,
    successMsg: "Order generated successfully",
    errorMsg: "Failed to generate order",
  });
};
