import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../../lib/axios";

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (userData) => {
      const response = await api.post("/auth/register", userData);
      return response.data;
    },
    onSuccess: (data) => {
      // User requested to navigate to login directly after registration
      navigate("/login");
    },
  });
};
