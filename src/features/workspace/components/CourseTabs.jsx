import React from "react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "syllabus", label: "Syllabus & Setup" },
  { id: "study-plan", label: "Study Plan" },
  { id: "progress", label: "Progress" }
];

export const CourseTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 overflow-x-auto no-scrollbar">
      <nav className="flex space-x-8 min-w-max px-2" aria-label="Tabs">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${isActive 
                  ? "border-gray-900 text-gray-900" 
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}
              `}
              aria-current={isActive ? "page" : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
