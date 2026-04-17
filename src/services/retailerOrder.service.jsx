import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axiosInstance from "../utills/axiosInstance";
import { APIs } from "../utills/apis";

// 🔥 Format Date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// 🔥 Status Color Mapping
const getStatusBg = (status) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "var(--yellow)";
    case "completed":
      return "var(--green)";
    case "in orders":
      return "var(--yellow)";
    case "unpaid":
      return "var(--lime)";
    default:
      return "var(--lime)";
  }
};

// ✅ Get Stats (keep mock for now OR replace later)
export const useGetRetailerStats = () => {
  return useQuery({
    queryKey: ["retailer-stats"],
    queryFn: async () => {
      return [
        { label: "Total Orders", value: 925 },
        { label: "In Orders", value: 260 },
        { label: "Unpaid", value: 127 },
        { label: "Completed", value: 538 },
      ];
    },
  });
};

export const useGetVendors = () => {
  const params = { size: 10, sortDir: "dsc" };

  const paramsStringify = JSON.stringify(params);
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

// ✅ Get Orders from API
export const useGetRetailerOrders = () => {
  const params = { size: 10, sortDir: "dsc" };

  const paramsStringify = JSON.stringify(params);
  const infiniteQuery = useInfiniteQuery({
    queryKey: [APIs.CREATE_ORDER, paramsStringify],
    queryFn: async ({ pageParam = 0 }) => {
      params.page = pageParam;

      const { data } = await axiosInstance.get(APIs.CREATE_ORDER, {
        params,
        paramsSerializer: (params) =>
          new URLSearchParams(params).toString().replace(/\+/g, "%20"),
      });

      const finalData = data.data.content.map((order) => ({
        id: order.id,
        name: `Vendor ${order.vendorId}`, // 🔁 replace later with real vendor name
        date: formatDate(order.createdAt),
        initial: `V`,
        status: order.status,
        statusBg: getStatusBg(order.status),
        statusText: "#000",

        products: order.items.map((item) => ({
          name: item.productName,
          price: `₹${item.price}`,
          qty: item.quantity,
          total: `₹${item.total}`,
        })),

        grandTotal: `₹${order.totalAmount}`,
        discount: "₹0",
        balance: "₹0",
        debt: "₹0",

        createdAt: order.createdAt, // 🔥 important for grouping
      }));

      return {
        content: finalData,
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

  const resData =
    infiniteQuery.data?.pages.flatMap((page) => page.content) ?? [];

  return {
    ...infiniteQuery,
    list: resData,
  };
};

// import { APIs } from "../utills/apis";

// import { useQuery } from "@tanstack/react-query";

// // Get Stats (Top 4 cards)
// export const useGetRetailerStats = () => {
//   return useQuery({
//     queryKey: ["mock-retailer-stats"],
//     queryFn: async () => {

//       return [
//         { label: "Total Orders", value: 925 },
//         { label: "In Orders", value: 260 },
//         { label: "Unpaid", value: 127 },
//         { label: "Completed", value: 538 },
//       ];
//     },
//   });
// };

// // Get Orders List
// export const useGetRetailerOrders = (date) => {
//   return useQuery({
//     queryKey: ["mock-retailer-orders", date],
//     queryFn: async () => {
//       // 🔥 MOCK DATA (your existing ORDERS)
//       return [
//         {
//           id: 1,
//           name: "TEN 11 Restaurant & Bar",
//           date: "24 Feb 2026",
//           initial: "T",
//           status: "In Orders",
//           statusBg: "var(--yellow)",
//           statusText: "#000",
//           products: [
//             { name: "ice cube 1", price: "₹30", qty: 10, total: "₹300" },
//           ],
//           grandTotal: "₹300",
//           discount: "₹0",
//           balance: "₹21",
//           debt: "-₹1,790",
//         },
//         {
//           id: 2,
//           name: "GRAVITY Lounge",
//           date: "24 Feb 2026",
//           initial: "G",
//           status: "Completed",
//           statusBg: "var(--green)",
//           statusText: "#000",
//           products: [
//             { name: "ice cube 1", price: "₹30", qty: 10, total: "₹300" },
//           ],
//           grandTotal: "₹300",
//           discount: "₹0",
//           balance: "₹21",
//           debt: "-₹1,790",
//         },
//         {
//           id: 3,
//           name: "Skyscape Bar & Lounge",
//           date: "24 Feb 2026",
//           initial: "S",
//           status: "Unpaid",
//           statusBg: "var(--lime)",
//           statusText: "#000",
//          products: [
//             { name: "ice cube 1", price: "₹30", qty: 10, total: "₹300" },
//           ],
//           grandTotal: "₹300",
//           discount: "₹0",
//           balance: "₹21",
//           debt: "-₹1,790",
//         },
//       ];
//     },
//   });
// };