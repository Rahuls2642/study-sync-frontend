import React, { useState, useMemo } from "react";
import { CourseHeader } from "../components/CourseHeader";
import { SearchBar } from "../components/SearchBar";
import { CourseGrid } from "../components/CourseGrid";
import { EmptyState } from "../components/EmptyState";
import { CreateCourseDialog } from "../components/dialogs/CreateCourseDialog";
import { EditCourseDialog } from "../components/dialogs/EditCourseDialog";
import { DeleteCourseDialog } from "../components/dialogs/DeleteCourseDialog";
import { useCourses } from "../hooks/useCourses";
import { AlertCircle } from "lucide-react";

export const CoursesPage = () => {
  const { data: response, isLoading, isError, refetch } = useCourses();
  
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dialog states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [deleteCourse, setDeleteCourse] = useState(null);

  // Extract courses from API response format which returns { success, data: { courses: [], pagination: {} } }
  const courses = response?.data?.courses || [];

  // Local filtering
  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    const lowerQuery = searchQuery.toLowerCase();
    return courses.filter((course) => 
      course.title?.toLowerCase().includes(lowerQuery)
    );
  }, [courses, searchQuery]);

  if (isLoading) {
    return (
      <div className="py-8 animate-in fade-in">
        <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
        <div className="h-4 w-64 bg-gray-100 rounded animate-pulse mb-8"></div>
        <div className="h-10 w-full max-w-md bg-gray-100 rounded-lg animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-white border border-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] animate-in fade-in">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Unable to load courses</h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          We encountered an error while retrieving your courses. Please check your connection and try again.
        </p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const hasNoCourses = courses.length === 0;
  const hasNoSearchResults = filteredCourses.length === 0 && searchQuery.trim() !== "";

  return (
    <div className="py-4 animate-in fade-in duration-500">
      <CourseHeader onCreateClick={() => setIsCreateOpen(true)} />
      
      {!hasNoCourses && (
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      )}

      {hasNoCourses ? (
        <EmptyState isSearch={false} onCreateClick={() => setIsCreateOpen(true)} />
      ) : hasNoSearchResults ? (
        <EmptyState isSearch={true} searchQuery={searchQuery} />
      ) : (
        <CourseGrid 
          courses={filteredCourses} 
          onEdit={(course) => setEditCourse(course)}
          onDelete={(course) => setDeleteCourse(course)}
        />
      )}

      {/* Dialogs */}
      <CreateCourseDialog 
        isOpen={isCreateOpen} 
        onClose={() => setIsCreateOpen(false)} 
      />
      
      <EditCourseDialog 
        isOpen={!!editCourse} 
        onClose={() => setEditCourse(null)} 
        course={editCourse} 
      />
      
      <DeleteCourseDialog 
        isOpen={!!deleteCourse} 
        onClose={() => setDeleteCourse(null)} 
        course={deleteCourse} 
      />
    </div>
  );
};
