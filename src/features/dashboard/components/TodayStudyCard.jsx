import React from "react";
import { PlayCircle, CheckCircle, Clock } from "lucide-react";

export const TodayStudyCard = ({ studyPlan }) => {
  if (!studyPlan || studyPlan.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-900">Today's Study</h2>
        </div>
        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
          <Clock className="w-12 h-12 mb-3 text-gray-200" />
          <p>No study sessions scheduled for today.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-900">Today's Study</h2>
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto pr-2">
        {studyPlan.slice(0, 4).map((session, index) => (
          <div
            key={session.id || index}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="text-xs font-semibold text-indigo-600 mb-1">{session.courseName}</p>
              <h4 className="text-sm font-medium text-gray-900 mb-1">{session.topicName}</h4>
              <p className="text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" /> {session.estimatedMinutes} mins
              </p>
            </div>
            <button className={`p-2 rounded-full transition-colors ${
              session.status === 'COMPLETED' 
                ? 'text-emerald-500 bg-emerald-50 hover:bg-emerald-100'
                : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
            }`}>
              {session.status === 'COMPLETED' ? <CheckCircle className="w-5 h-5" /> : <PlayCircle className="w-5 h-5" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
