import React from "react";
import { useDashboardData } from "../../dashboard/hooks/useDashboard";
import { DashboardSkeleton } from "../../dashboard/components/DashboardSkeleton";
import { AlertCircle, Calendar as CalendarIcon, BookOpen, Clock } from "lucide-react";
import { differenceInDays, parseISO } from "date-fns";

export const AssessmentsPage = () => {
  const { data: dashboardData, isLoading, isError, refetch } = useDashboardData();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load assessments</h2>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const { data } = dashboardData || {};
  const assessments = data?.assessments || [];
  const courses = data?.courses || [];

  // Sort assessments by date
  const sortedAssessments = [...assessments].sort((a, b) => new Date(a.examDate) - new Date(b.examDate));

  const getCourseName = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    return course ? course.title : "Unknown Course";
  };

  const getDaysRemainingInfo = (dateString) => {
    const examDate = parseISO(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = differenceInDays(examDate, today);
    
    if (diff < 0) return { text: "Past due", color: "text-red-600 bg-red-50 border-red-200" };
    if (diff === 0) return { text: "Today!", color: "text-red-600 bg-red-50 border-red-200 font-bold" };
    if (diff <= 3) return { text: `${diff} days left`, color: "text-orange-600 bg-orange-50 border-orange-200" };
    if (diff <= 7) return { text: `${diff} days left`, color: "text-amber-600 bg-amber-50 border-amber-200" };
    return { text: `${diff} days left`, color: "text-emerald-600 bg-emerald-50 border-emerald-200" };
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto space-y-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Lora',serif] text-gray-900 mb-2">Upcoming Assessments</h1>
          <p className="text-gray-500 text-sm">Keep track of your exams, quizzes, and assignments.</p>
        </div>
        <div className="hidden sm:block">
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl px-4 py-3 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Upcoming</p>
              <p className="text-xl font-bold text-gray-900 leading-none">{sortedAssessments.length}</p>
            </div>
          </div>
        </div>
      </div>

      {sortedAssessments.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center flex flex-col items-center justify-center shadow-sm">
          <Clock className="w-16 h-16 text-gray-200 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No upcoming assessments</h3>
          <p className="text-gray-500 mt-2 max-w-sm">You're all caught up! Enjoy your free time or get ahead on your courses.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAssessments.map(assessment => {
            const courseName = getCourseName(assessment.courseId);
            const formattedDate = new Date(assessment.examDate).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short', 
              day: 'numeric'
            });
            const daysInfo = getDaysRemainingInfo(assessment.examDate);

            return (
              <div 
                key={assessment.id}
                className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all group flex flex-col"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${daysInfo.color}`}>
                    {daysInfo.text}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <CalendarIcon className="w-4 h-4" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-['Lora',serif] line-clamp-2 min-h-[3.5rem]">
                  {assessment.title}
                </h3>
                
                <div className="mt-auto pt-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarIcon className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium">{formattedDate}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="truncate" title={courseName}>{courseName}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
