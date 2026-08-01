import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Bookmark, TrendingUp } from "lucide-react";

const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <rect x="0" y="8" width="4" height="12" rx="1" fill="#818CF8" />
    <rect x="6" y="4" width="4" height="16" rx="1" fill="#6366F1" />
    <rect x="12" y="0" width="4" height="20" rx="1" fill="#4F46E5" />
  </svg>
);

export const AuthLayout = ({ children, isLogin }) => {
  return (
    <div className="flex min-h-screen bg-white font-['Inter',sans-serif]">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-50 via-gray-50 to-indigo-100 flex-col justify-between px-12 py-8 text-gray-900 relative overflow-hidden">
        {/* Flowing silk-like wave background */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 760 1020"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
        >
          <defs>
            <linearGradient id="wave1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#C7D2FE" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="wave2" x1="0" y1="0" x2="1" y2="0.6">
              <stop offset="0%" stopColor="#EEF2FF" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="wave3" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          <path
            d="M-40,620 C120,560 220,700 360,650 C500,600 560,720 700,660 C780,630 820,650 860,610
               L860,1040 L-40,1040 Z"
            fill="url(#wave1)"
          />
          <path
            d="M-40,740 C100,690 240,820 380,760 C520,700 600,830 740,770 C800,745 830,760 860,730
               L860,1040 L-40,1040 Z"
            fill="url(#wave2)"
          />
          <path
            d="M-40,860 C140,810 260,900 400,860 C540,820 640,910 780,860 C820,845 840,855 860,845
               L860,1040 L-40,1040 Z"
            fill="url(#wave3)"
          />
        </svg>

        <div className="z-10 relative">
          <div className="flex items-center space-x-2 mb-10">
            <Logo />
            <span className="text-xl font-bold tracking-tight text-gray-900">StudySync</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-4xl lg:text-5xl font-normal leading-tight mb-4 font-['Lora',serif]">
              Study smarter.<br />
              Achieve <span className="text-indigo-500 italic">more.</span>
            </h1>
            <p className="text-gray-500 text-base mb-8 font-light">
              AI-powered study plans, progress tracking, and personalized insights to help you reach your goals faster.
            </p>

            <ul className="space-y-5">
              <li className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  <Sparkles className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium text-sm mb-0.5">AI Syllabus Analysis</h3>
                  <p className="text-gray-500 text-xs">Understand topics, gaps & priorities</p>
                </div>
              </li>
              <li className="flex items-start space-x-4 border-t border-gray-200/70 pt-4">
                <div className="flex-shrink-0 mt-1">
                  <Bookmark className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium text-sm mb-0.5">Personalized Plans</h3>
                  <p className="text-gray-500 text-xs">Plans that adapt to you</p>
                </div>
              </li>
              <li className="flex items-start space-x-4 border-t border-gray-200/70 pt-4">
                <div className="flex-shrink-0 mt-1">
                  <TrendingUp className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-gray-900 font-medium text-sm mb-0.5">Progress Tracking</h3>
                  <p className="text-gray-500 text-xs">Stay on track with clear insights</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="z-10 mt-8 text-xs text-gray-400">
          Trusted by 10,000+ students worldwide
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col p-6 lg:px-12 lg:py-8 relative bg-white">
        <div className="absolute top-6 right-8 text-sm text-gray-500 hidden sm:block">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <Link to="/register" className="text-indigo-600 font-medium hover:underline">
                Create one
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 font-medium hover:underline">
                Log in
              </Link>
            </>
          )}
        </div>
        <div className="flex-1 flex items-center justify-center w-full max-w-md mx-auto mt-10 sm:mt-0">
          <div className="w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};