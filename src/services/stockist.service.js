import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utills/axiosInstance";
import { APIs } from "../utills/apis";
import { useAppMutation } from "../reactQueryConfig/hooks/useAppMutation";

/**
 * Hook to Create or Update a Stockist
 * POST - /api/v1/stockist
 */
export const useSaveStockist = () => {
    return useAppMutation({
        mutationFn: async (payload) => {
            // Logic: If payload has an ID, you might use PUT, otherwise POST
            const url = payload.stockistId ? `${APIs.STOCKIST}/${payload.stockistId}` : APIs.STOCKIST;
            const method = payload.stockistId ? 'put' : 'post';

            const { data } = await axiosInstance[method](url, payload);
            return data;
        },
        successMsg: "Stockist saved successfully",
        errorMsg: "Failed to save stockist",
        invalidateQueryKeys: [APIs.STOCKIST],
    });
};

/**
 * Hook to fetch all Stockists
 * GET - /api/v1/stockist
 */
export const useGetStockists = (options = {}) => {
    return useQuery({
        queryKey: [APIs.STOCKIST],
        queryFn: async () => {
            const { data } = await axiosInstance.get(APIs.STOCKIST);
            return data?.data || [];
        },
        ...options,
    });
};