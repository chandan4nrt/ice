import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utills/axiosInstance";
import { APIs } from "../utills/apis";
import { useAppMutation } from "../reactQueryConfig/hooks/useAppMutation";

export const useSaveDistributor = () => {
    return useAppMutation({
        mutationFn: async (payload) => {
            const url = payload.distributorId ? `${APIs.DISTRIBUTOR}/${payload.distributorId}` : APIs.DISTRIBUTOR;
            const method = payload.distributorId ? 'put' : 'post';
            const { data } = await axiosInstance[method](url, payload);
            return data;
        },
        successMsg: "Distributor details saved",
        invalidateQueryKeys: [APIs.DISTRIBUTOR],
    });
};

export const useGetDistributors = (options = {}) => {
    return useQuery({
        queryKey: [APIs.DISTRIBUTOR],
        queryFn: async () => {
            const { data } = await axiosInstance.get(APIs.DISTRIBUTOR);
            return data?.data || [];
        },
        ...options,
    });
};