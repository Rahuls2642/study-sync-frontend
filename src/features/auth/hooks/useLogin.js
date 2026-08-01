import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/axios";

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    },
    onSuccess: (responseData) => {
      if (responseData.data?.accessToken) {
        localStorage.setItem("accessToken", responseData.data.accessToken);
      }
      if (responseData.data?.refreshToken) {
        localStorage.setItem("refreshToken", responseData.data.refreshToken);
      }
      navigate("/app/dashboard");
    },
  });
};
