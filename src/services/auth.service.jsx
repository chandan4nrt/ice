import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utills/axiosInstance";
import { useAuth } from "../context/AuthContext";
import { APIs } from "../utills/apis";
import { useAppMutation } from "../reactQueryConfig/hooks/useAppMutation";
import { transformMenu } from "../utills/helper";

export const waitForToken = (maxAttempts = 3, delay = 200) => {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    const checkToken = () => {
      // const isAndroid = localStorage.getItem("isAndroid");
      const token = localStorage.getItem("token");
      // if (!isAndroid) resolve();

      if (token) {
        resolve(token);
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkToken, delay);
      } else {
        reject(new Error("Token not found after retries"));
      }
    };

    checkToken();
  });
};

export const useLogin = () => {
  return useAppMutation({
    mutationFn: async (body) => {
      const { data } = await axiosInstance.post(APIs.AUTH__LOGIN, body);
      return data;
    },
    successMsg: "Login successfully",
    errorMsg: "Failed to login",
  });
};

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: [APIs.GET_USER_DETAILS],
    queryFn: async () => {
      const token = await waitForToken(3, 200);

      const userDetails = localStorage.getItem("userDetails");
      const user = JSON.parse(userDetails);
      const roleCodes = user?.roles?.map((role) => role.role) || [];
      const primaryRole = roleCodes?.[0];

      return token ? { ...user, roleCodes, primaryRole, token } : null;
    },
  });
};

export const useGetRoutes = (role) => {
  return useQuery({
    queryKey: [APIs.MENUMASTER__SUBMENU, role],

    queryFn: async () => {
      const { data } = await axiosInstance.get(
        APIs.MENUMASTER__SUBMENU + `/${role}`,
      );

      return data || [];
    },
    enabled: !!role,
  });
};

export const useGetSidebar = () => {
  const { user } = useAuth();
  const role = user?.primaryRole;

  return useQuery({
    queryKey: [APIs.MENUMASTER, role],
    queryFn: async () => {
      const { data } = await axiosInstance.get(APIs.MENUMASTER + `/${role}`);

      const menuItems = transformMenu(data)

      return menuItems.filter((item) => item.status !== 'N');
    },
    enabled: !!role,
  });
};
