import { AuthContext } from "./AuthContext";
import { useGetUserDetails } from "../services/auth.service";
import { setLogoutHandler } from "../utills/axiosInstance";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { APIs } from "../utills/apis";

export function AuthProvider({ children }) {
  const queryClient = useQueryClient()
  const { data: user, isLoading } = useGetUserDetails();

  const login = (data) => {
    const userDetails = data?.data?.userDetails;
    localStorage.setItem("token", data?.token)
    localStorage.setItem("refreshToken", data?.refreshToken)
    localStorage.setItem("userDetails", JSON.stringify(userDetails))
    queryClient.invalidateQueries({queryKey: [APIs.GET_USER_DETAILS]})
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();

    if (window.Android) {
      console.log("User logged out");
      Android.postMessage("logout", null);
    } else {
      window.location.replace("/login")
    }
  };

  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
