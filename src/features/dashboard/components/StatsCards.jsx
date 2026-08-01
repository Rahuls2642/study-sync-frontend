import React from "react";
import { BookOpen, Calendar, CheckCircle2, Flame } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, subtext, iconColor, iconBgColor }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${iconBgColor}`}>
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
      <p className="text-xs text-gray-400">{subtext}</p>
    </div>
  </div>
);

export const StatsCards = ({ overall, today, isEmpty }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        icon={BookOpen}
        label="Total Courses"
        value={overall?.courses || 0}
        subtext={isEmpty ? "Create your first course" : "Total courses enrolled"}
        iconColor="text-indigo-500"
        iconBgColor="bg-indigo-50/50 border-indigo-100"
      />
      <StatCard
        icon={Calendar}
        label="Study Sessions"
        value={today?.totalSessions || 0}
        subtext={isEmpty ? "No sessions yet" : `${today?.completedSessions || 0} Completed`}
        iconColor="text-blue-500"
        iconBgColor="bg-blue-50/50 border-blue-100"
      />
      <StatCard
        icon={CheckCircle2}
        label="Overall Progress"
        value={`${overall?.completionPercentage || 0}%`}
        subtext={isEmpty ? "Keep going!" : "Overall completion"}
        iconColor="text-emerald-500"
        iconBgColor="bg-emerald-50/50 border-emerald-100"
      />
      <StatCard
        icon={Flame}
        label="Study Streak"
        value={`${overall?.studyStreak || 0} Days`}
        subtext={isEmpty ? "Start your streak today" : "You're on fire!"}
        iconColor="text-orange-500"
        iconBgColor="bg-orange-50/50 border-orange-100"
      />
    </div>
  );
};
