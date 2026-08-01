import React from "react";
import { Upload, BrainCircuit, PlayCircle, ArrowRight } from "lucide-react";

export const OverviewTab = ({ course, onNavigate }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Quick Action: Upload Syllabus */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow group flex flex-col justify-between h-48">
          <div>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <Upload className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-['Lora',serif] mb-1">Setup Syllabus</h3>
            <p className="text-sm text-gray-500">Upload your PDF syllabus to get started.</p>
          </div>
          <button 
            onClick={() => onNavigate("syllabus")}
            className="flex items-center text-sm font-semibold text-gray-900 mt-4 group-hover:translate-x-1 transition-transform w-fit"
          >
            Start Setup <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Quick Action: Generate Plan */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow group flex flex-col justify-between h-48">
          <div>
            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
              <BrainCircuit className="w-5 h-5 text-gray-700" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 font-['Lora',serif] mb-1">AI Study Plan</h3>
            <p className="text-sm text-gray-500">Generate your personalized timeline.</p>
          </div>
          <button 
            onClick={() => onNavigate("syllabus")}
            className="flex items-center text-sm font-semibold text-gray-900 mt-4 group-hover:translate-x-1 transition-transform w-fit"
          >
            Generate <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Quick Action: Continue Studying */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:shadow-md transition-shadow group flex flex-col justify-between h-48">
          <div>
            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center mb-4 group-hover:bg-gray-700 transition-colors">
              <PlayCircle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-bold text-white font-['Lora',serif] mb-1">Continue Studying</h3>
            <p className="text-sm text-gray-400">Jump back into your upcoming sessions.</p>
          </div>
          <button 
            onClick={() => onNavigate("study-plan")}
            className="flex items-center text-sm font-semibold text-white mt-4 group-hover:translate-x-1 transition-transform w-fit"
          >
            Go to Plan <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
      </div>
    </div>
  );
};
