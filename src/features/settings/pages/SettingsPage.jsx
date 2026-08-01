import React, { useState } from "react";
import { Moon, Sun, Monitor, Bell, Shield, Info, Smartphone } from "lucide-react";

export const SettingsPage = () => {
  const [theme, setTheme] = useState("system");

  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto space-y-8 mt-4">
      <div>
        <h1 className="text-3xl font-bold font-['Lora',serif] text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-500 text-sm">Manage your preferences and app configuration.</p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        
        {/* Theme Settings */}
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mr-4 shrink-0">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Appearance</h2>
              <p className="text-sm text-gray-500 mt-1">Customize how the application looks on your device.</p>
            </div>
          </div>

          <div className="pl-14">
            <div className="flex flex-wrap gap-4">
              {themes.map((t) => {
                const Icon = t.icon;
                const isActive = theme === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`flex items-center px-5 py-3 rounded-xl border transition-all ${
                      isActive 
                        ? "bg-gray-900 border-gray-900 text-white shadow-md shadow-gray-900/20" 
                        : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 mr-2 ${isActive ? "text-gray-300" : "text-gray-400"}`} />
                    <span className="font-medium text-sm">{t.label}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-4 flex items-center">
              <Info className="w-3.5 h-3.5 mr-1" />
              Theme switching is currently in preview.
            </p>
          </div>
        </div>

        {/* Future Preferences Placeholder */}
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mr-4 shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Notifications & Preferences</h2>
              <p className="text-sm text-gray-500 mt-1">Control your daily reminders and study alerts.</p>
            </div>
          </div>
          
          <div className="pl-14">
            <div className="p-4 bg-gray-50 border border-gray-200 border-dashed rounded-xl flex items-center justify-center text-gray-400 text-sm">
              Notification settings coming soon in v1.1
            </div>
          </div>
        </div>

        {/* About & App Info */}
        <div className="p-8 bg-gray-50">
          <div className="flex items-start mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mr-4 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">About StudySync</h2>
              <p className="text-sm text-gray-500 mt-1">Application version and details.</p>
            </div>
          </div>
          
          <div className="pl-14 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center">
              <div className="p-2 bg-gray-50 rounded-lg mr-3">
                <Info className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Version</p>
                <p className="text-sm font-medium text-gray-900">1.0.0 (Beta)</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center">
              <div className="p-2 bg-gray-50 rounded-lg mr-3">
                <Smartphone className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Platform</p>
                <p className="text-sm font-medium text-gray-900">Web App</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
