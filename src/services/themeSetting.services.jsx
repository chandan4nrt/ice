import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utills/axiosInstance";
import { SCHOOL_DEFAULT } from "../context/themeRoles";


export const useGetPageThemeByRole = (roleId, pageName) => {

  return useQuery({
    queryKey: ["pageThemeByRole", roleId, pageName],

    queryFn: async () => {
      const appId =
        localStorage.getItem("appId") || SCHOOL_DEFAULT?.ID;

      const res = await axiosInstance.get("/api/theme/page", {
        params: { appId, roleId, pageName },
      });

      return {
        data: res.data,
        status: res.status,
      };
    },

    enabled: !!roleId && !!pageName,

    staleTime: 0,
    gcTime: 0,              // react-query v5 me cacheTime ki jagah gcTime
    retry: 1,
    refetchOnWindowFocus: false,
  });
};



export const useGetDashboardThemeByRole = (roleId) => {

  return useQuery({
    queryKey: ["dashboardThemeByRole", roleId],

    queryFn: async () => {

      const appId =
        localStorage.getItem("appId") || SCHOOL_DEFAULT?.ID;

      const res = await axiosInstance.get("/api/theme/page", {
        params: {
          appId,
          roleId,
          pageName: "dashboard",
        },
      });

      return res.data;
    },

    enabled: !!roleId,

    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30,    // 30 minutes

    retry: 1,
    refetchOnWindowFocus: false,
  });
};