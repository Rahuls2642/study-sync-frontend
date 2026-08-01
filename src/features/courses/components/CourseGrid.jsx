import React from "react";
import { CourseCard } from "./CourseCard";

export const CourseGrid = ({ courses, onEdit, onDelete }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard 
          key={course.id || course._id} 
          course={course} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};
