import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Target, Pencil, Trash2, ArrowRight } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const CourseCard = ({ course, onEdit, onDelete }) => {
  // Safe defaults if API doesn't return exact fields
  const topicsCount = course.topicsCount || course.topics?.length || 0;
  const assessmentsCount = course.assessmentsCount || course.assessments?.length || 0;
  const progress = course.progress || 0;
  
  // Format updated date if available
  const updatedText = course.updatedAt 
    ? formatDistanceToNow(new Date(course.updatedAt), { addSuffix: true })
    : "Recently";

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 leading-tight font-['Lora',serif] line-clamp-2">
              {course.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <BookOpen className="w-4 h-4 mr-1.5" />
            <span>{topicsCount} Topics</span>
          </div>
          <div className="flex items-center">
            <Target className="w-4 h-4 mr-1.5" />
            <span>{assessmentsCount} Assessments</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs mb-1.5 font-medium">
            <span className="text-gray-500">Progress</span>
            <span className="text-gray-900">{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-gray-900 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50/50">
        <span className="text-xs text-gray-500">Updated {updatedText}</span>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onEdit(course)}
            className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
            title="Edit Course"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button 
            onClick={() => onDelete(course)}
            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Delete Course"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-gray-300 mx-1"></div>
          <Link
            to={`/app/courses/${course.id || course._id}`}
            className="flex items-center text-sm font-semibold text-gray-900 hover:text-gray-600 transition-colors ml-1"
          >
            Open <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
