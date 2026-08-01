import React from "react";
import { useTodayStudyPlan, useUpdateTodaySessionStatus } from "../../dashboard/hooks/useDashboard";
import { Clock, PlayCircle, CheckCircle, SkipForward, AlertCircle } from "lucide-react";
import { DashboardSkeleton } from "../../dashboard/components/DashboardSkeleton";

export const TodayPage = () => {
  const { data: response, isLoading, isError, refetch } = useTodayStudyPlan();
  const { mutate: updateStatus } = useUpdateTodaySessionStatus();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load today's study plan</h2>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const sessions = response?.data || [];
  const completedCount = sessions.filter(s => s.status === "COMPLETED").length;
  const totalCount = sessions.length;
  const progressPercentage = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-8">
      {/* Header and Progress Ring */}
      <div className="bg-gray-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-xl relative overflow-hidden">
        {/* Background visual flair */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-indigo-500/20 blur-3xl mix-blend-screen pointer-events-none"></div>
        
        <div className="z-10">
          <h1 className="text-3xl font-bold font-['Lora',serif] mb-2">Today's Study</h1>
          <p className="text-gray-400 max-w-sm text-sm">
            Stay on track. You have completed {completedCount} out of {totalCount} sessions today.
          </p>
        </div>

        <div className="mt-8 md:mt-0 z-10 flex items-center justify-center relative">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="52"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-gray-800"
            />
            <circle
              cx="64"
              cy="64"
              r="52"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 52}
              strokeDashoffset={2 * Math.PI * 52 * (1 - progressPercentage / 100)}
              className="text-indigo-500 transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-bold font-['Lora',serif]">{progressPercentage}%</span>
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-6 font-['Lora',serif]">Scheduled Sessions</h2>
        
        {sessions.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center flex flex-col items-center justify-center shadow-sm">
            <Clock className="w-16 h-16 text-gray-200 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No Sessions Today</h3>
            <p className="text-gray-500 mt-2 max-w-sm">Take a break or head over to the AI planner to generate a new study plan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessions.map(session => (
              <div 
                key={session.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden flex flex-col"
              >
                {session.status === 'COMPLETED' && (
                  <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-50 rounded-bl-full z-0 transition-transform group-hover:scale-110"></div>
                )}
                
                <div className="flex-1 z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
                      {session.courseName}
                    </span>
                    <div className="flex items-center text-sm font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                      <Clock className="w-4 h-4 mr-1.5" />
                      {session.estimatedMinutes} mins
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 font-['Lora',serif] line-clamp-1">
                    {session.topicName}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Part {session.part} of {session.totalParts}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2 z-10 pt-4 border-t border-gray-100">
                  {session.status === 'COMPLETED' ? (
                    <button 
                      onClick={() => updateStatus({ planId: session.id, status: 'PENDING' })}
                      className="flex-1 flex items-center justify-center px-4 py-2.5 bg-emerald-50 text-emerald-600 font-medium rounded-xl hover:bg-emerald-100 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => updateStatus({ planId: session.id, status: 'COMPLETED' })}
                        className="flex-1 flex items-center justify-center px-4 py-2.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Complete
                      </button>
                      <button 
                        onClick={() => updateStatus({ planId: session.id, status: 'SKIPPED' })}
                        className="flex-none p-2.5 text-gray-400 bg-gray-50 rounded-xl hover:text-gray-900 hover:bg-gray-100 transition-colors"
                        title="Skip Session"
                      >
                        <SkipForward className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
