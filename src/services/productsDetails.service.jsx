import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utills/axiosInstance";
import { APIs } from "../utills/apis";
import { useAppMutation } from "../reactQueryConfig/hooks/useAppMutation";

/**
 * Hook to add or update product details (Admin only).
 * POST - /api/v1/productsDetails
 */
export const useSaveProductDetails = () => {
  return useAppMutation({
    mutationFn: async (payload) => {
      const { data } = await axiosInstance.post(APIs.PRODUCT_DETAILS, payload);
      return data;
    },
    successMsg: "Product details saved successfully",
    errorMsg: "Failed to save product details",
    invalidateQueryKeys: [APIs.PRODUCT_DETAILS],
  });
};

/**
 * Hook to fetch product details (Admin only).
 * GET - /api/v1/productsDetails
 */
export const useGetProductDetails = (options = {}) => {
  return useQuery({
    queryKey: [APIs.PRODUCT_DETAILS],
    queryFn: async () => {
      const { data } = await axiosInstance.get(APIs.PRODUCT_DETAILS);
      return data?.data || [];
    },
    ...options,
  });
};
