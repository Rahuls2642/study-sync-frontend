import React from "react";
import { Calendar as CalendarIcon } from "lucide-react";

export const CalendarPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] animate-in fade-in duration-500">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
        <CalendarIcon className="w-10 h-10 text-indigo-600" />
      </div>
      <h1 className="text-3xl font-bold font-['Lora',serif] text-gray-900 mb-3">Calendar</h1>
      <p className="text-gray-500 text-center max-w-md">
        We're working on a beautiful calendar view to help you visualize your study schedule and upcoming exams. Check back soon!
      </p>
      <div className="mt-8 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg opacity-80 cursor-not-allowed">
        Coming Soon
      </div>
    </div>
  );
};
