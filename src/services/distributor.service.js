import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAppMutation } from "../reactQueryConfig/hooks/useAppMutation";
import axiosInstance from "../utills/axiosInstance";
import { APIs } from "../utills/apis";

export const useAddVendor = () => {
    return useAppMutation({
        mutationFn: async (body) => {
            const { data } = await axiosInstance.post(APIs.VENDOR, body);
            return data;
        },
        successMsg: "Registered successfully",
        errorMsg: "Failed to register",
        invalidateQueryKeys: [APIs.VENDOR],
    });
};

export const useEditVendor = () => {
    return useAppMutation({
        mutationFn: async (body) => {
            const { vendorId, payload } = body;
            const { data } = await axiosInstance.put(
                APIs.VENDOR + `/${vendorId}`,
                payload,
            );
            return data;
        },
        successMsg: "Updated successfully",
        errorMsg: "Failed to update",
        invalidateQueryKeys: [APIs.VENDOR],
    });
};

export const useGetVendorById = ({ vendorId }) => {
    return useQuery({
        queryKey: [APIs.VENDOR, vendorId],
        queryFn: async () => {
            const { data } = await axiosInstance.get(APIs.VENDOR + `/${vendorId}`);
            return data.data;
        },
        enabled: !!vendorId,
    });
};

export const useGetVendors = () => {
    const params = { size: 10, sortDir: 'dsc' };

    const paramsStringify = JSON.stringify(params)
    const infiniteQuery = useInfiniteQuery({
        queryKey: [APIs.VENDOR, paramsStringify],
        queryFn: async ({ pageParam = 0 }) => {
            params.page = pageParam;

            const { data } = await axiosInstance.get(APIs.VENDOR, {
                params,
                paramsSerializer: (params) =>
                    new URLSearchParams(params).toString().replace(/\+/g, "%20"),
            });

            return {
                content: data.data.content,
                totalPages: data.data?.totalPages,
                page: pageParam,
            };
        },
        getNextPageParam: (lastPage) => {
            const nextPage = lastPage.page + 1;
            return nextPage < lastPage.totalPages ? nextPage : undefined;
        },
        initialPageParam: 0,
    });

    return {
        ...infiniteQuery,
        list: infiniteQuery.data?.pages.flatMap((page) => page.content) ?? [],
    };
};

export const useUploadVendorFile = () => {
    return useAppMutation({
        mutationFn: async (body) => {
            const { vendorId, queryParams, formData } = body;
            const { data } = await axiosInstance.post(
                APIs.VENDOR + `/${vendorId}/documents`,
                formData,
                {
                    params: queryParams,
                },
            );
            return data;
        },
        successMsg: "Document uploaded successfully",
        onSuccessNotificationVisible: false,
        errorMsg: "Failed to upload",
        invalidateQueryKeys: [APIs.VENDOR],
    });
};

export const useDeleteVendorFile = () => {
    return useAppMutation({
        mutationFn: async (documentId) => {
            // const {data} = await axiosInstance.delete(APIs.VENDOR__DOCUMENTS+documentId)
            // return data
            return {}
        },
        successMsg: "Document deleted successfully",
        errorMsg: "Failed to delete the document"
    })
}




// import { useQuery } from "@tanstack/react-query";
// import axiosInstance from "../utills/axiosInstance";
// import { APIs } from "../utills/apis";
// import { useAppMutation } from "../reactQueryConfig/hooks/useAppMutation";

// export const useSaveDistributor = () => {
//     return useAppMutation({
//         mutationFn: async (payload) => {
//             const url = payload.distributorId ? `${APIs.DISTRIBUTOR}/${payload.distributorId}` : APIs.DISTRIBUTOR;
//             const method = payload.distributorId ? 'put' : 'post';
//             const { data } = await axiosInstance[method](url, payload);
//             return data;
//         },
//         successMsg: "Distributor details saved",
//         invalidateQueryKeys: [APIs.DISTRIBUTOR],
//     });
// };

// export const useGetDistributors = (options = {}) => {
//     return useQuery({
//         queryKey: [APIs.DISTRIBUTOR],
//         queryFn: async () => {
//             const { data } = await axiosInstance.get(APIs.DISTRIBUTOR);
//             return data?.data || [];
//         },
//         ...options,
//     });
// };