import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesApi } from "../api/coursesApi";
import { toast } from "sonner";

export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: coursesApi.getCourses,
  });
};

export const useCreateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: coursesApi.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      // We'll also want to invalidate the dashboard data
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Course created successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create course");
    }
  });
};

export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: coursesApi.updateCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Course updated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update course");
    }
  });
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: coursesApi.deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Course deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to delete course");
    }
  });
};
