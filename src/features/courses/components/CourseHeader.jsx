import React from "react";
import { Plus } from "lucide-react";

export const CourseHeader = ({ onCreateClick }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 font-['Lora',serif]">Courses</h1>
        <p className="text-sm text-gray-500 mt-1">Manage all your study curriculums here.</p>
      </div>
      
      <button
        onClick={onCreateClick}
        className="inline-flex items-center justify-center px-4 py-2 bg-[#4F46E5] text-white font-medium text-sm rounded-lg hover:bg-[#4338CA] transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Course
      </button>
    </div>
  );
};
