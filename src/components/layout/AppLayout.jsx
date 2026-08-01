import React from "react";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";

export const AppLayout = ({ children, userName }) => {
  return (
    <div className="flex h-screen bg-[#fafafc] font-['Inter',sans-serif] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopHeader userName={userName} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
