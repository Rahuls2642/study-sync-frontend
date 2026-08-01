import React from "react";
import { Link } from "react-router-dom";
import { Plus, ChevronRight, BrainCircuit, CheckCircle2 } from "lucide-react";

export const DashboardHero = () => {
  return (
    <div className="bg-gray-900 rounded-2xl p-8 md:p-12 relative overflow-hidden mb-8 border border-gray-800 flex flex-col md:flex-row items-center justify-between">
      <div className="relative z-10 max-w-lg md:pr-8 mb-8 md:mb-0 text-left w-full md:w-1/2">
        <p className="text-gray-400 font-semibold text-sm mb-4 uppercase tracking-wider">Welcome to StudySync</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight font-['Lora',serif]">
          Your AI study assistant<br />is ready.
        </h2>
        <p className="text-gray-300 mb-8 text-base leading-relaxed">
          Let's set up your first curriculum. Our AI will analyze your syllabus and generate a personalized schedule tailored exactly to your goals.
        </p>
        <Link
          to="/courses/new"
          className="inline-flex items-center px-6 py-3 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Your First Course
        </Link>
      </div>

      {/* Signature Moment: Mock UI Preview */}
      <div className="relative z-10 w-full md:w-1/2 flex justify-end">
        <div className="bg-white rounded-xl shadow-2xl p-5 border border-gray-100 w-full max-w-md transform rotate-1 hover:rotate-0 transition-transform duration-500">
          <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-8 h-8 rounded-md bg-gray-900 flex items-center justify-center">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900 font-['Lora',serif]">Generated Curriculum</h4>
              <p className="text-xs text-gray-500">Introduction to Calculus</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-gray-300 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Module 1: Limits & Continuity</p>
                <p className="text-xs text-gray-500 mt-1">45 mins • Highly Recommended</p>
              </div>
            </div>
            <div className="flex items-start opacity-70">
              <CheckCircle2 className="w-5 h-5 text-gray-300 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Module 2: Derivatives</p>
                <p className="text-xs text-gray-500 mt-1">60 mins • Core Concept</p>
              </div>
            </div>
            <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-50">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white"></div>
                <div className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-600">+4</div>
              </div>
              <span className="text-xs font-semibold text-gray-900 flex items-center cursor-pointer">
                View Full Plan <ChevronRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          </div>
        </div>
        
        {/* Subtle decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#4F46E5] opacity-20 blur-3xl rounded-full -z-10"></div>
      </div>
    </div>
  );
};
