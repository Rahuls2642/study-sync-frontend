import React from "react";
import { Bell } from "lucide-react";

export const TopHeader = ({ userName }) => {
  return (
    <header className="h-20 bg-[#fafafc] flex items-center justify-between px-4 md:px-8 shrink-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1 font-['Lora',serif]">
          Good morning, {userName || "Student"}
        </h1>
        <p className="text-sm text-gray-500">Your dashboard is ready. Time to dive into your next topic.</p>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gray-900 rounded-full"></span>
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 font-semibold flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors border border-gray-200">
          {(userName || "S")[0].toUpperCase()}
        </div>
      </div>
    </header>
  );
};
