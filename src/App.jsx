import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { RegisterPage } from './features/auth/pages/RegisterPage';
import { LoginPage } from './features/auth/pages/LoginPage';

import { DashboardPage } from './features/dashboard/pages/DashboardPage';
import { CoursesPage } from './features/courses/pages/CoursesPage';
import { CourseWorkspace } from './features/workspace/pages/CourseWorkspace';
import { TodayPage } from './features/study/pages/TodayPage';
import { AssessmentsPage } from './features/assessments/pages/AssessmentsPage';
import { ProfilePage } from './features/profile/pages/ProfilePage';
import { SettingsPage } from './features/settings/pages/SettingsPage';

import { AppLayout } from './components/layout/AppLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="top-center" richColors />
      <Router>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/app/*" element={
            <AppLayout userName="Rahul">
              <Routes>
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="courses/:courseId" element={<CourseWorkspace />} />
                <Route path="today" element={<TodayPage />} />
                <Route path="assessments" element={<AssessmentsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
                {/* Fallback for other /app routes */}
                <Route path="*" element={<DashboardPage />} />
              </Routes>
            </AppLayout>
          } />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
