import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utills/axiosInstance";
import { APIs } from "../utills/apis";
import { useAppMutation } from "../reactQueryConfig/hooks/useAppMutation";

export const useSaveSalesPerson = () => {
    return useAppMutation({
        mutationFn: async (payload) => {
            const url = payload.salesPersonId ? `${APIs.SALES_PERSON}/${payload.salesPersonId}` : APIs.SALES_PERSON;
            const method = payload.salesPersonId ? 'put' : 'post';
            const { data } = await axiosInstance[method](url, payload);
            return data;
        },
        successMsg: "Sales person saved successfully",
        invalidateQueryKeys: [APIs.SALES_PERSON],
    });
};

export const useGetSalesPersons = (options = {}) => {
    return useQuery({
        queryKey: [APIs.SALES_PERSON],
        queryFn: async () => {
            const { data } = await axiosInstance.get(APIs.SALES_PERSON);
            return data?.data || [];
        },
        ...options,
    });
};