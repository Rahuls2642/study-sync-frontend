import api from "../../../lib/axios";

export const dashboardApi = {
  getDashboardData: async () => {
    const response = await api.get("/dashboard");
    return response.data;
  },
  
  getTodayStudyPlan: async () => {
    const response = await api.get("/study-plan/today");
    return response.data;
  }
};
