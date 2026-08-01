import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Sun, 
  ClipboardList, 
  Calendar, 
  Lightbulb, 
  Settings,
  ArrowRight
} from "lucide-react";

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mr-3">
    <rect x="2" y="4" width="20" height="16" rx="2" stroke="#111827" strokeWidth="2" />
    <path d="M12 4V20" stroke="#111827" strokeWidth="2" />
  </svg>
);

const NavItem = ({ icon: Icon, label, path, isActive }) => (
  <Link
    to={path}
    className={`flex items-center px-4 py-2.5 mb-1 transition-all ${
      isActive
        ? "border-l-[3px] border-gray-900 bg-gray-50/50 text-gray-900 font-semibold"
        : "border-l-[3px] border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50/50"
    }`}
  >
    <Icon className={`w-5 h-5 mr-3 ${isActive ? "text-gray-900" : "text-gray-400"}`} />
    <span className="text-sm">{label}</span>
  </Link>
);

export const Sidebar = () => {
  const location = useLocation();

  const mainNav = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/app/dashboard" },
    { icon: BookOpen, label: "Courses", path: "/app/courses" },
    { icon: Sun, label: "Today's Study", path: "/app/today" },
    { icon: ClipboardList, label: "Assessments", path: "/app/assessments" },
    { icon: Calendar, label: "Calendar", path: "/app/calendar" },
    { icon: Lightbulb, label: "Insights", path: "/app/insights" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between hidden md:flex">
      <div>
        {/* Brand */}
        <div className="h-20 flex items-center px-6 mb-2">
          <Logo />
          <span className="text-xl font-bold text-gray-900 tracking-tight font-['Lora',serif]">StudySync</span>
        </div>

        {/* Navigation */}
        <nav className="px-2">
          {mainNav.map((item) => (
            <NavItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              path={item.path}
              isActive={location.pathname === item.path}
            />
          ))}
        </nav>
      </div>

      <div>
        {/* Bottom Navigation */}
        <nav className="px-2 mb-4">
          <NavItem
            icon={Settings}
            label="Settings"
            path="/app/settings"
            isActive={location.pathname === "/app/settings"}
          />
        </nav>

        {/* Upgrade Banner */}
        <div className="mx-4 mb-6 p-4 rounded-xl border border-gray-200 bg-gray-50/50">
          <p className="text-xs text-gray-700 font-medium mb-2 leading-relaxed">
            Unlock unlimited AI<br />and premium features.
          </p>
          <button className="text-xs font-semibold text-gray-900 flex items-center hover:text-gray-600 transition-colors mt-3">
            Upgrade Now <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      </div>
    </aside>
  );
};
