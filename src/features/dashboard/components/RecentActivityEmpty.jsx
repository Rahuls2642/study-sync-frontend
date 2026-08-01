import React from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export const RecentActivityEmpty = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-8 font-['Inter',sans-serif]">Recent Activity</h3>

      <div className="flex flex-col items-center justify-center py-12 text-center flex-1">
        {/* Abstract Clipboard Illustration */}
        <div className="relative mb-6">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            {/* Background cloud shape */}
            <path d="M40 70 Q30 70 30 60 Q30 50 45 50 Q50 35 70 40 Q85 30 95 45 Q105 50 100 65 Q95 75 80 75 L40 70 Z" fill="#F9FAFB" />
            <path d="M35 75 Q25 75 25 65 Q25 55 40 55 Q45 40 65 45 Q80 35 90 50 Q100 55 95 70 Q90 80 75 80 L35 75 Z" fill="#F3F4F6" />

            {/* Sparkles */}
            <path d="M20 90 L22 93 L25 95 L22 97 L20 100 L18 97 L15 95 L18 93 Z" fill="#E5E7EB" />
            <path d="M90 20 L92 24 L96 26 L92 28 L90 32 L88 28 L84 26 L88 24 Z" fill="#E5E7EB" />

            {/* Clipboard */}
            <rect x="45" y="35" width="40" height="50" rx="4" fill="white" stroke="#111827" strokeWidth="2" />
            <rect x="55" y="30" width="20" height="10" rx="2" fill="white" stroke="#111827" strokeWidth="2" />
            <line x1="55" y1="50" x2="75" y2="50" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
            <line x1="55" y1="60" x2="75" y2="60" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
            <line x1="55" y1="70" x2="65" y2="70" stroke="#E5E7EB" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>

        <h4 className="text-base font-bold text-gray-900 mb-2">No activity yet</h4>
        <p className="text-sm text-gray-500 mb-6 max-w-xs leading-relaxed">
          Once you create a course and start studying, your activity will appear here.
        </p>

        <Link
          to="/app/courses"
          className="inline-flex items-center px-4 py-2 border border-gray-200 text-gray-900 font-medium text-sm rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Your First Course
        </Link>
      </div>
    </div>
  );
};
