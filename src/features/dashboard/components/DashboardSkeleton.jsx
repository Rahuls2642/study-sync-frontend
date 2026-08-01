import React from "react";

export const DashboardSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 h-24"></div>
        ))}
      </div>

      {/* Main Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Chart Skeleton */}
        <div className="bg-white p-6 rounded-xl border border-gray-100 h-80 col-span-1 lg:col-span-2"></div>
        
        {/* Today's Study / Assessments Stack Skeleton */}
        <div className="space-y-6 col-span-1">
          <div className="bg-white p-6 rounded-xl border border-gray-100 h-64"></div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 h-64"></div>
        </div>
      </div>

      {/* Course Grid Skeleton */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 h-64 mt-6"></div>
    </div>
  );
};
