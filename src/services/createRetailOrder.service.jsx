import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useAppMutation } from "../reactQueryConfig/hooks/useAppMutation";
import axiosInstance from "../utills/axiosInstance";
import { APIs } from "../utills/apis";

export const useGetRetailers = () => {
  const params = { size: 10, sortDir: "dsc" };

  const paramsStringify = JSON.stringify(params);

  const infiniteQuery = useInfiniteQuery({
    queryKey: [APIs.GET_RETAILERS, paramsStringify],
    queryFn: async ({ pageParam = 0 }) => {
      params.page = pageParam;

      const { data } = await axiosInstance.get(APIs.GET_RETAILERS, {
        params,
      });

      return {
        content: data?.data?.content || [],
        totalPages: data?.data?.totalPages,
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

// Get Products (for popup dropdown)
// export const useGetProducts = () => {
//   return useQuery({
//     queryKey: [APIs.PRODUCT_DETAILS],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get(APIs.PRODUCT_DETAILS);

//       console.log("API Response Data:", data);

//       return data?.data || [];
//     },
//     enabled: true,
//   });
// };

export const useGetProducts = () => {
  return useQuery({
    queryKey: [APIs.PRODUCT_DETAILS],
    queryFn: async () => {
      try {
        const { data } = await axiosInstance.get(APIs.PRODUCT_DETAILS);
        return data?.data || [];
      } catch (err) {
        console.error("API is broken, using mock data");
        return [
          {
            productId: 1,
            productName: "Standard Ice Cubes (5kg)",
            mrp: 120,
            isActive: true
          }
        ];
      }
    },
    enabled: true,
  });
};

//Create retailer order{form}
export const useCreateOrder = () => {
  return useAppMutation({
    mutationFn: async (body) => {
      const { data } = await axiosInstance.post(APIs.CREATE_ORDER, body);
      return data;
    },
    successMsg: "Order created successfully",
    errorMsg: "Failed to create order",
  });
};