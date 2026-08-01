import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspaceApi } from "../api/workspaceApi";
import { toast } from "sonner";

export const useCourseDetails = (courseId) => {
  return useQuery({
    queryKey: ["course", courseId],
    queryFn: () => workspaceApi.getCourseDetails(courseId),
    enabled: !!courseId,
  });
};

export const useCourseProgress = (courseId) => {
  return useQuery({
    queryKey: ["course", courseId, "progress"],
    queryFn: () => workspaceApi.getCourseProgress(courseId),
    enabled: !!courseId,
  });
};

export const useStudyPlan = (courseId) => {
  return useQuery({
    queryKey: ["course", courseId, "study-plan"],
    queryFn: () => workspaceApi.getStudyPlan(courseId),
    enabled: !!courseId,
  });
};

export const useUploadSyllabus = (courseId) => {
  return useMutation({
    mutationFn: workspaceApi.uploadSyllabus,
    onSuccess: () => {
      toast.success("Syllabus uploaded successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to upload syllabus");
    }
  });
};

export const useConfirmSyllabus = (courseId) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workspaceApi.confirmSyllabus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
      toast.success("Syllabus confirmed!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to confirm syllabus");
    }
  });
};

export const useSaveStudyPreferences = (courseId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (preferences) => workspaceApi.saveStudyPreferences({ courseId, preferences }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["studyPlan", courseId] });
    },
  });
};

export const useGenerateStudyPlan = (courseId) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workspaceApi.generateStudyPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId, "study-plan"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] }); // update dashboard
      toast.success("Study plan generated successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to generate study plan");
    }
  });
};

export const useUpdateSessionStatus = (courseId) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workspaceApi.updateSessionStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId, "study-plan"] });
      queryClient.invalidateQueries({ queryKey: ["course", courseId, "progress"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Session updated!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update session");
    }
  });
};

export const useUpdateTopicProgress = (courseId) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: workspaceApi.updateTopicProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course", courseId, "progress"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      toast.success("Topic progress updated!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update topic progress");
    }
  });
};
