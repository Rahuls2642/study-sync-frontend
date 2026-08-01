import React from "react";
import { Sparkles, Calendar, TrendingUp, Lightbulb } from "lucide-react";

const FeatureBlock = ({ icon: Icon, title, description, iconColor, iconBgColor }) => (
  <div>
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${iconBgColor}`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <h4 className="font-semibold text-gray-900 text-sm mb-2">{title}</h4>
    <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
  </div>
);

export const DashboardFeatures = () => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-6 font-['Inter',sans-serif]">How StudySync helps you</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <FeatureBlock
          icon={Sparkles}
          title="AI Study Plans"
          description="Get a personalized plan based on your syllabus, goals, and timeframe."
          iconColor="text-gray-900"
          iconBgColor="bg-gray-100"
        />
        <FeatureBlock
          icon={Calendar}
          title="Smart Schedule"
          description="AI creates the perfect schedule to help you stay consistent."
          iconColor="text-gray-900"
          iconBgColor="bg-gray-100"
        />
        <FeatureBlock
          icon={TrendingUp}
          title="Track Progress"
          description="Monitor your progress and stay motivated every day."
          iconColor="text-gray-900"
          iconBgColor="bg-gray-100"
        />
        <FeatureBlock
          icon={Lightbulb}
          title="Smart Insights"
          description="Get AI insights to improve your study and performance."
          iconColor="text-gray-900"
          iconBgColor="bg-gray-100"
        />
      </div>
    </div>
  );
};
