import React from "react";
import { FolderPlus, Plus } from "lucide-react";

export const EmptyState = ({ isSearch = false, onCreateClick, searchQuery }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 border border-dashed border-gray-300 rounded-2xl bg-gray-50/50 mt-6">
      <div className="w-16 h-16 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <FolderPlus className="w-8 h-8 text-gray-400" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-2 font-['Lora',serif]">
        {isSearch ? "No courses found" : "No courses yet"}
      </h3>
      
      <p className="text-gray-500 text-center max-w-sm mb-8 leading-relaxed text-sm">
        {isSearch 
          ? `We couldn't find any courses matching "${searchQuery}". Try a different search term.` 
          : "Create your first course to let our AI build a personalized study curriculum for you."}
      </p>

      {!isSearch && (
        <button
          onClick={onCreateClick}
          className="inline-flex items-center px-5 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Course
        </button>
      )}
    </div>
  );
};
