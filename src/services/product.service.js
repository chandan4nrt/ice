import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utills/axiosInstance";
import { APIs } from "../utills/apis";
import { useAppMutation } from "../reactQueryConfig/hooks/useAppMutation";

export const useSaveProduct = () => {
    return useAppMutation({
        mutationFn: async (payload) => {
            const url = payload.productId ? `${APIs.PRODUCT}/${payload.productId}` : APIs.PRODUCT;
            const method = payload.productId ? 'put' : 'post';
            const { data } = await axiosInstance[method](url, payload);
            return data;
        },
        successMsg: "Product saved successfully",
        invalidateQueryKeys: [APIs.PRODUCT],
    });
};

export const useGetProducts = (options = {}) => {
    return useQuery({
        queryKey: [APIs.PRODUCT],
        queryFn: async () => {
            const { data } = await axiosInstance.get(APIs.PRODUCT);
            return data?.data || [];
        },
        ...options,
    });
};