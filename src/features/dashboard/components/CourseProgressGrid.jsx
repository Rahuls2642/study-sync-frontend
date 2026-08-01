import React from "react";
import { ArrowRight } from "lucide-react";
import { EmptyState } from "./EmptyState";

const ProgressBar = ({ percentage }) => (
  <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
    <div
      className="bg-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

export const CourseProgressGrid = ({ courses, userName }) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="mt-6">
        <EmptyState userName={userName} />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Course Progress</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border border-gray-100 p-5 rounded-lg hover:border-indigo-100 hover:shadow-sm transition-all group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-gray-900">{course.name}</h3>
              <span className="text-sm font-bold text-indigo-600">{course.completionPercentage}%</span>
            </div>
            
            <ProgressBar percentage={course.completionPercentage} />
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
              <p className="text-xs text-gray-500">
                {course.completedSessions}/{course.completedSessions + course.remainingSessions} sessions
              </p>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
