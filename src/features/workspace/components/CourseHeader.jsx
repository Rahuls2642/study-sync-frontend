import React from "react";
import { ArrowLeft, Edit, Trash2, BookOpen } from "lucide-react";

export const CourseHeader = ({ course, onBack }) => {
  const topicsCount = course.topicsCount || course.topics?.length || 0;
  const assessmentsCount = course.assessmentsCount || course.assessments?.length || 0;
  const progress = course.progress || 0;

  return (
    <div className="mb-8">
      <button 
        onClick={onBack}
        className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Courses
      </button>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1">
            <BookOpen className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-['Lora',serif] mb-2 leading-tight">
              {course.title}
            </h1>
            <p className="text-sm text-gray-500 font-medium">
              {topicsCount} Topics • {assessmentsCount} Assessments
            </p>
          </div>
        </div>

        <div className="flex flex-col md:items-end w-full md:w-64">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-sm font-bold text-gray-900">Overall Progress</span>
            <span className="text-sm font-bold text-gray-900 font-['Lora',serif]">{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2.5">
            <div
              className="bg-gray-900 h-2.5 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
