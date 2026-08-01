import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/axios";
import { toast } from "sonner";

export const useUser = () => {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const response = await api.get("/auth/me");
      return response.data;
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.clear();
      navigate("/login");
    },
    onError: () => {
      // Even if API fails, clear local storage and redirect
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      queryClient.clear();
      navigate("/login");
    }
  });
};
