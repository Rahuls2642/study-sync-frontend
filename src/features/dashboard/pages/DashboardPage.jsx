import React from "react";
import { useDashboardData, useTodayStudyPlan } from "../hooks/useDashboard";
import { StatsBar } from "../components/StatsBar";
import { TodayStudyCard } from "../components/TodayStudyCard";
import { UpcomingAssessmentCard } from "../components/UpcomingAssessmentCard";
import { WeeklyChart } from "../components/WeeklyChart";
import { CourseProgressGrid } from "../components/CourseProgressGrid";
import { DashboardSkeleton } from "../components/DashboardSkeleton";
import { DashboardHero } from "../components/DashboardHero";
import { DashboardFeatures } from "../components/DashboardFeatures";
import { RecentActivityEmpty } from "../components/RecentActivityEmpty";
import { AlertCircle } from "lucide-react";

export const DashboardPage = () => {
  const { data: dashboardData, isLoading, isError, refetch } = useDashboardData();
  const { data: todayStudyResponse } = useTodayStudyPlan();

  if (isLoading) {
    return (
      <div className="py-2">
        <DashboardSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load dashboard</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          We encountered an error while retrieving your dashboard data. Please check your connection and try again.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const { data } = dashboardData || {};
  const todayStudyPlan = todayStudyResponse?.data || [];
  
  const isEmpty = !data?.overall || data.overall.courses === 0;

  if (isEmpty) {
    return (
      <div className="animate-in fade-in duration-500">
        <DashboardHero />
        <StatsBar overall={data?.overall} today={data?.today} isEmpty={true} />
        <DashboardFeatures />
        <RecentActivityEmpty />
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-500">
      <StatsBar overall={data?.overall} today={data?.today} isEmpty={false} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <WeeklyChart data={data?.weeklyActivity} />
        
        <div className="col-span-1 flex flex-col space-y-6">
          <div className="flex-1">
            <TodayStudyCard studyPlan={todayStudyPlan} />
          </div>
          <div className="flex-1">
            <UpcomingAssessmentCard assessments={data?.assessments} />
          </div>
        </div>
      </div>

      <CourseProgressGrid courses={data?.courses} userName={data?.user?.name} />
    </div>
  );
};
