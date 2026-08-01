import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboardApi";
import { workspaceApi } from "../../workspace/api/workspaceApi";
import { toast } from "sonner";

export const useDashboardData = () => {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardApi.getDashboardData,
  });
};

export const useTodayStudyPlan = () => {
  return useQuery({
    queryKey: ["study-plan", "today"],
    queryFn: dashboardApi.getTodayStudyPlan,
  });
};

export const useUpdateTodaySessionStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workspaceApi.updateSessionStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["study-plan", "today"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Session updated!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update session");
    }
  });
};
