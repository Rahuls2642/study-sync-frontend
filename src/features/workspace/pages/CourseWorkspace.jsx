import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseDetails, useCourseProgress } from "../hooks/useWorkspace";
import { CourseHeader } from "../components/CourseHeader";
import { CourseTabs } from "../components/CourseTabs";
import { OverviewTab } from "../components/OverviewTab";
import { SyllabusTab } from "../components/SyllabusTab";
import { StudyPlanTab } from "../components/StudyPlanTab";
import { ProgressTab } from "../components/ProgressTab";
import { AlertCircle } from "lucide-react";

export const CourseWorkspace = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const { data: response, isLoading: isCourseLoading, isError } = useCourseDetails(courseId);
  const { data: progressResponse, isLoading: isProgressLoading } = useCourseProgress(courseId);

  const isLoading = isCourseLoading || isProgressLoading;

  if (isLoading) {
    return (
      <div className="py-8 animate-in fade-in">
        <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="h-12 w-1/3 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
        <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mb-8"></div>
        <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse mb-8"></div>
        <div className="h-64 w-full bg-white border border-gray-100 rounded-xl animate-pulse"></div>
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] animate-in fade-in">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Course not found</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          We couldn't load the details for this course. It may have been deleted or you don't have access.
        </p>
        <button
          onClick={() => navigate("/app/courses")}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  const course = {
    ...response.data,
    progress: progressResponse?.data?.completionPercentage || 0,
  };

  return (
    <div className="py-4 animate-in fade-in duration-500">
      <CourseHeader course={course} onBack={() => navigate("/app/courses")} />
      
      <CourseTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="mt-6">
        {activeTab === "overview" && (
          <OverviewTab course={course} onNavigate={setActiveTab} />
        )}
        {activeTab === "syllabus" && (
          <SyllabusTab course={course} onNavigate={setActiveTab} />
        )}
        {activeTab === "study-plan" && (
          <StudyPlanTab course={course} />
        )}
        {activeTab === "progress" && (
          <ProgressTab course={course} />
        )}
      </div>
    </div>
  );
};
