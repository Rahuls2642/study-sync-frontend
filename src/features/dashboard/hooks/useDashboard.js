import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboardApi";

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
