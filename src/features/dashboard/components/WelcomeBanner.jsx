import React from "react";
import { format } from "date-fns";
import { Settings, Bell } from "lucide-react";

export const WelcomeBanner = ({ userName }) => {
  const today = new Date();
  const dateString = format(today, "EEEE, MMMM d");

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          Good Morning, {userName || "Student"} <span className="animate-wave inline-block origin-[70%_70%]">👋</span>
        </h1>
        <p className="text-gray-500 text-sm">
          Let's continue your study journey. • {dateString}
        </p>
      </div>
      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <div className="w-10 h-10 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center font-semibold text-indigo-600">
          {(userName || "S")[0].toUpperCase()}
        </div>
      </div>
    </div>
  );
};
