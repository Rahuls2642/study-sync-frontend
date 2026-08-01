import React from "react";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";
import { useCourseProgress, useUpdateTopicProgress } from "../hooks/useWorkspace";

const TopicRow = ({ topic, onUpdateProgress }) => {
  const isCompleted = topic.progress === 100;
  
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors ${isCompleted ? 'bg-gray-50/50' : ''}`}>
      <div className="flex items-start mb-3 sm:mb-0">
        <button 
          onClick={() => onUpdateProgress(topic.id, isCompleted ? 0 : 100)}
          className="mt-0.5 mr-3 text-gray-400 hover:text-gray-900 transition-colors"
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>
        <div>
          <h4 className={`text-sm font-semibold ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {topic.title}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">{topic.hoursStudied || 0} hours studied</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4 pl-8 sm:pl-0 w-full sm:w-64 shrink-0">
        <div className="flex-1 w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-gray-900'}`}
            style={{ width: `${topic.progress || 0}%` }}
          ></div>
        </div>
        <span className="text-xs font-bold text-gray-900 w-10 text-right">{topic.progress || 0}%</span>
      </div>
    </div>
  );
};

export const ProgressTab = ({ course }) => {
  const { data: response, isLoading, isError } = useCourseProgress(course.id || course._id);
  const { mutate: updateTopic } = useUpdateTopicProgress(course.id || course._id);

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500 animate-pulse">Loading progress...</div>;
  }

  if (isError) {
    return (
       <div className="p-8 text-center text-red-500 flex flex-col items-center">
         <AlertCircle className="w-8 h-8 mb-2" />
         Failed to load progress.
       </div>
    );
  }

  // Assuming response.data contains the topics array
  const topics = response?.data?.topics || response?.data || [];

  if (topics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
        <CheckCircle2 className="w-12 h-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-bold text-gray-900 mb-2 font-['Lora',serif]">No topics found</h3>
        <p className="text-sm text-gray-500 text-center max-w-sm mb-6">
          Set up your syllabus to generate topics and track your progress.
        </p>
      </div>
    );
  }

  const handleUpdateProgress = (topicId, progress) => {
    updateTopic({ topicId, progress });
  };

  const completedCount = topics.filter(t => t.progress === 100).length;
  const totalCount = topics.length;
  const overallProgress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-xl font-bold font-['Lora',serif] mb-1">Course Progress</h3>
          <p className="text-sm text-gray-400">You have completed {completedCount} out of {totalCount} topics.</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="text-right">
            <span className="block text-3xl font-bold font-['Lora',serif]">{overallProgress}%</span>
            <span className="block text-xs text-gray-400 uppercase tracking-wider">Completed</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-50/50 border-b border-gray-200 flex justify-between items-center">
          <h4 className="text-sm font-bold text-gray-900">Topic List</h4>
        </div>
        <div>
          {topics.map(topic => (
            <TopicRow key={topic.id} topic={topic} onUpdateProgress={handleUpdateProgress} />
          ))}
        </div>
      </div>
    </div>
  );
};
