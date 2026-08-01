import React from "react";

const StatItem = ({ label, value, subtext, highlight = false }) => (
  <div className="flex-1 px-8 py-6">
    <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">{label}</p>
    <h3 className={`text-4xl font-bold mb-2 ${highlight ? 'text-gray-900 font-["Lora",serif]' : 'text-gray-900 font-["Lora",serif]'}`}>
      {value}
    </h3>
    <p className={`text-xs ${highlight ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
      {subtext}
    </p>
  </div>
);

export const StatsBar = ({ overall, today, isEmpty }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-8 flex flex-col md:flex-row md:divide-x divide-gray-100">
      <StatItem
        label="Total Courses"
        value={overall?.courses || 0}
        subtext={isEmpty ? "Create your first course" : "Total courses enrolled"}
      />
      <StatItem
        label="Study Sessions"
        value={today?.totalSessions || 0}
        subtext={isEmpty ? "No sessions yet" : `${today?.completedSessions || 0} Completed`}
      />
      <StatItem
        label="Overall Progress"
        value={`${overall?.completionPercentage || 0}%`}
        subtext={isEmpty ? "Keep going!" : "Overall completion"}
      />
      <div className="flex-1 px-8 py-6 bg-gray-50/50 md:rounded-r-2xl">
        <p className="text-sm font-bold text-gray-900 mb-2 uppercase tracking-wide">Study Streak</p>
        <div className="flex items-end space-x-2 mb-2">
          <h3 className="text-4xl font-bold text-gray-900 font-['Lora',serif]">
            {overall?.studyStreak || 0}
          </h3>
          <span className="text-gray-500 font-medium pb-1">Days</span>
        </div>
        <p className="text-xs text-gray-700 font-medium">
          {isEmpty ? "Start your streak today" : "You're on fire!"}
        </p>
      </div>
    </div>
  );
};
