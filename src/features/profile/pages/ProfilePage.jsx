import React from "react";
import { useUser, useLogout } from "../../auth/hooks/useAuth";
import { LogOut, Mail, User, ShieldCheck, AlertCircle } from "lucide-react";
import { DashboardSkeleton } from "../../dashboard/components/DashboardSkeleton";

export const ProfilePage = () => {
  const { data: response, isLoading, isError, refetch } = useUser();
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load profile</h2>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 mt-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const user = response?.data || { name: "User", email: "user@example.com" };

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto space-y-8 mt-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden relative">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        </div>
        
        {/* Profile Info */}
        <div className="px-8 pb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-12 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
              <div className="w-24 h-24 rounded-2xl bg-white p-1 shadow-lg border border-gray-100 flex-shrink-0">
                <div className="w-full h-full rounded-xl bg-gray-900 text-white flex items-center justify-center text-4xl font-bold font-['Lora',serif]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="pb-1">
                <h1 className="text-2xl font-bold text-gray-900 font-['Lora',serif]">{user.name}</h1>
                <div className="flex items-center text-gray-500 mt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 mr-1.5" />
                  <span className="text-sm font-medium">Verified Student</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => logout()}
              disabled={isLoggingOut}
              className="mt-6 sm:mt-0 px-6 py-2.5 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center group disabled:opacity-50"
            >
              <LogOut className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              {isLoggingOut ? "Logging out..." : "Log out"}
            </button>
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100 mr-4">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-0.5 uppercase tracking-wider">Full Name</p>
                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>
            </div>
            
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex items-start">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100 mr-4">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium mb-0.5 uppercase tracking-wider">Email Address</p>
                <p className="font-semibold text-gray-900">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
