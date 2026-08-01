import React from "react";
import { Calendar } from "lucide-react";

export const UpcomingAssessmentCard = ({ assessments }) => {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-full flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-6">Upcoming Deadlines</h2>
      
      {(!assessments || assessments.length === 0) ? (
        <div className="flex flex-col items-center justify-center h-48 text-gray-400">
          <Calendar className="w-12 h-12 mb-3 text-gray-200" />
          <p>No upcoming assessments.</p>
        </div>
      ) : (
        <div className="flex-1 space-y-4 overflow-y-auto pr-2">
          {assessments.slice(0, 4).map((assessment, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-100">
              <div>
                <p className="text-xs font-semibold text-indigo-600 mb-1">{assessment.course}</p>
                <h4 className="text-sm font-medium text-gray-900">{assessment.title}</h4>
              </div>
              <div className="text-right">
                <p className={`text-sm font-bold ${assessment.daysRemaining <= 3 ? 'text-red-500' : 'text-gray-900'}`}>
                  {assessment.daysRemaining === 0 ? 'Today' : `${assessment.daysRemaining} Days Left`}
                </p>
                {assessment.date && (
                  <p className="text-xs text-gray-500">{new Date(assessment.date).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
