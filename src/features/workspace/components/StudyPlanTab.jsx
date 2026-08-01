import React from "react";
import { Play, Check, SkipForward, Clock, Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { useStudyPlan, useUpdateSessionStatus } from "../hooks/useWorkspace";

const SessionCard = ({ session, onUpdateStatus }) => {
  const isCompleted = session.status === "completed";
  const isSkipped = session.status === "skipped";
  const isInProgress = session.status === "in_progress";
  
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 border rounded-xl mb-4 transition-colors ${
      isCompleted ? "bg-green-50/30 border-green-100" :
      isSkipped ? "bg-gray-50 border-gray-100 opacity-70" :
      isInProgress ? "bg-indigo-50/40 border-indigo-200 shadow-md ring-1 ring-indigo-100" :
      "bg-white border-gray-200 hover:border-gray-300 shadow-sm"
    }`}>
      <div className="mb-4 sm:mb-0 pr-4">
        <div className="flex items-center space-x-3 mb-1">
          <h4 className={`text-base font-bold ${
            isCompleted ? 'text-gray-600 line-through' : 
            isInProgress ? 'text-indigo-900' : 'text-gray-900'
          }`}>
            {session.topicName}
          </h4>
          {isInProgress && (
            <span className="flex items-center px-2 py-0.5 bg-indigo-100 text-indigo-700 text-[10px] uppercase font-bold rounded-full tracking-wider animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-1.5"></span>
              Active Now
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4 text-xs font-medium text-gray-500">
          <span className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {session.duration} mins
          </span>
          <span className="flex items-center">
            <CalendarIcon className="w-3.5 h-3.5 mr-1" />
            {session.date}
          </span>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 shrink-0">
        {session.status === "pending" && (
          <>
            <button 
              onClick={() => onUpdateStatus(session.id, "in_progress")}
              className="px-3 py-1.5 bg-[#4F46E5] text-white text-xs font-semibold rounded-md hover:bg-[#4338CA] transition-colors flex items-center"
            >
              <Play className="w-3.5 h-3.5 mr-1.5" /> Start
            </button>
            <button 
              onClick={() => onUpdateStatus(session.id, "skipped")}
              className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-semibold rounded-md hover:bg-gray-50 transition-colors flex items-center"
            >
              <SkipForward className="w-3.5 h-3.5 mr-1.5" /> Skip
            </button>
          </>
        )}
        {session.status === "in_progress" && (
          <button 
            onClick={() => onUpdateStatus(session.id, "completed")}
            className="px-4 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md hover:bg-gray-800 transition-colors flex items-center ring-2 ring-gray-900 ring-offset-2"
          >
            <Check className="w-3.5 h-3.5 mr-1.5" /> Finish Session
          </button>
        )}
        {isCompleted && (
          <span className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-md flex items-center">
            <Check className="w-3.5 h-3.5 mr-1" /> Completed
          </span>
        )}
        {isSkipped && (
          <span className="px-3 py-1.5 bg-gray-200 text-gray-600 text-xs font-bold rounded-md flex items-center">
            Skipped
          </span>
        )}
      </div>
    </div>
  );
};

export const StudyPlanTab = ({ course }) => {
  const { data: response, isLoading, isError } = useStudyPlan(course.id || course._id);
  const { mutate: updateStatus } = useUpdateSessionStatus(course.id || course._id);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Loading study plan...</div>;
  }

  if (isError) {
    return (
       <div className="p-8 text-center text-red-500 flex flex-col items-center">
         <AlertCircle className="w-8 h-8 mb-2" />
         Failed to load study plan.
       </div>
    );
  }

  // Assuming response.data contains the study plan array or object
  const rawSessions = response?.data?.sessions || response?.data || [];
  
  if (rawSessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
        <CalendarIcon className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-2 font-['Lora',serif]">No study plan yet</h3>
        <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
          Head over to the Setup tab to upload your syllabus and generate your personalized AI study plan.
        </p>
      </div>
    );
  }

  // Map backend format to frontend format
  const sessions = rawSessions.map(s => {
    const sessionDate = new Date(s.studyDate);
    const today = new Date();
    
    let displayDate = sessionDate.toLocaleDateString();
    if (sessionDate.toDateString() === today.toDateString()) {
      displayDate = "Today";
    } else {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      if (sessionDate.toDateString() === tomorrow.toDateString()) {
        displayDate = "Tomorrow";
      }
    }

    let topicName = s.topic?.title || s.topicTitle || "Unknown Topic";
    if (s.totalParts > 1) {
      topicName += ` (Part ${s.part} of ${s.totalParts})`;
    }

    return {
      id: s.id,
      topicName,
      duration: s.estimatedMinutes,
      date: displayDate,
      status: s.status ? s.status.toLowerCase() : "pending",
      rawDate: sessionDate
    };
  });

  const handleUpdateStatus = (sessionId, status) => {
    updateStatus({ planId: sessionId, status });
  };

  const todaySessions = sessions.filter(s => s.date === "Today" && (s.status === "pending" || s.status === "in_progress"));
  const upcomingSessions = sessions.filter(s => s.date !== "Today" && (s.status === "pending" || s.status === "in_progress"));
  const completedSessions = sessions.filter(s => s.status === "completed" || s.status === "skipped");

  return (
    <div className="space-y-8">
      {/* Today's Sessions */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 font-['Lora',serif] mb-4 flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
          Today's Sessions
        </h3>
        {todaySessions.length === 0 ? (
          <p className="text-sm text-gray-500 italic p-4 bg-gray-50 rounded-lg">No sessions scheduled for today. Take a break!</p>
        ) : (
          <div>
            {todaySessions.map(session => (
              <SessionCard key={session.id} session={session} onUpdateStatus={handleUpdateStatus} />
            ))}
          </div>
        )}
      </div>

      {/* Upcoming Sessions */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 font-['Lora',serif] mb-4">Upcoming</h3>
        {upcomingSessions.length === 0 ? (
          <p className="text-sm text-gray-500 italic p-4 bg-gray-50 rounded-lg">No upcoming sessions.</p>
        ) : (
          <div>
            {upcomingSessions.map(session => (
              <SessionCard key={session.id} session={session} onUpdateStatus={handleUpdateStatus} />
            ))}
          </div>
        )}
      </div>

      {/* Completed Sessions */}
      {completedSessions.length > 0 && (
        <div className="opacity-80">
          <h3 className="text-lg font-bold text-gray-900 font-['Lora',serif] mb-4">Completed</h3>
          <div>
            {completedSessions.map(session => (
              <SessionCard key={session.id} session={session} onUpdateStatus={handleUpdateStatus} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
