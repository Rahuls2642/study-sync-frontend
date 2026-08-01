import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export const EmptyState = ({ userName }) => {
  return (
    <div className="max-w-4xl mx-auto text-center py-12 px-6 bg-white border border-gray-100 rounded-xl shadow-sm">
      <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <BookOpen className="w-8 h-8 text-indigo-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        Ready to start learning, {userName || "Student"}?
      </h2>
      <p className="text-gray-500 text-base mb-6 max-w-md mx-auto">
        You haven't created any courses yet. Add your first course to unlock AI-powered study plans and tracking.
      </p>
      <Link
        to="/courses/new"
        className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
      >
        Create Your First Course
      </Link>
    </div>
  );
};
