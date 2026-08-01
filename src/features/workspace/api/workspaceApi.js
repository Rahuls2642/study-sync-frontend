import api from "../../../lib/axios";

export const workspaceApi = {
  getCourseDetails: async (courseId) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },
  
  getCourseProgress: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/progress`);
    return response.data;
  },
  
  getStudyPlan: async (courseId) => {
    const response = await api.get(`/courses/${courseId}/study-plan`);
    return response.data;
  },
  
  uploadSyllabus: async ({ courseId, file }) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post(`/courses/${courseId}/syllabus`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },
  
  confirmSyllabus: async ({ courseId, rawText, topics, assessments }) => {
    const response = await api.post(`/courses/${courseId}/syllabus/confirm`, {
      rawText,
      topics,
      assessments
    });
    return response.data;
  },
  
  saveStudyPreferences: async ({ courseId, preferences }) => {
    const response = await api.post(`/courses/${courseId}/study-preferences`, preferences);
    return response.data;
  },
  
  generateStudyPlan: async ({ courseId }) => {
    const response = await api.post(`/courses/${courseId}/study-plan/generate`);
    return response.data;
  },
  
  updateSessionStatus: async ({ planId, status }) => {
    const response = await api.patch(`/study-plan/${planId}/status`, {
      status: status.toUpperCase()
    });
    return response.data;
  },
  
  updateTopicProgress: async ({ topicId, progress }) => {
    const response = await api.patch(`/topics/${topicId}/progress`, {
      completed: progress === 100
    });
    return response.data;
  }
};
