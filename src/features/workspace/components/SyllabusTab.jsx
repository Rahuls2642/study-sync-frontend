import React, { useState } from "react";
import { Upload, CheckCircle2, ChevronRight, BrainCircuit } from "lucide-react";
import { useUploadSyllabus, useConfirmSyllabus, useGenerateStudyPlan, useSaveStudyPreferences } from "../hooks/useWorkspace";

const STEPS = ["Upload Syllabus", "Review AI Extraction", "Study Preferences", "Generate Plan"];

export const SyllabusTab = ({ course, onNavigate }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const uploadMutation = useUploadSyllabus(course.id || course._id);
  const confirmMutation = useConfirmSyllabus(course.id || course._id);
  const generateMutation = useGenerateStudyPlan(course.id || course._id);
  const savePreferencesMutation = useSaveStudyPreferences(course.id || course._id);

  const [extractedData, setExtractedData] = useState({ topics: [], assessments: [], rawText: "" });
  
  // Study Preferences State
  const [preferences, setPreferences] = useState({
    hoursPerDay: 2,
    minutesPerDay: 0,
    sessionMinutes: 60,
    breakMinutes: 10,
    studyDays: [1, 2, 3, 4, 5], // default Mon-Fri
    startDate: new Date().toISOString(),
    examDate: ""
  });

  const toggleStudyDay = (dayIndex) => {
    setPreferences(prev => ({
      ...prev,
      studyDays: prev.studyDays.includes(dayIndex) 
        ? prev.studyDays.filter(d => d !== dayIndex)
        : [...prev.studyDays, dayIndex].sort()
    }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      uploadMutation.mutate(
        { courseId: course.id || course._id, file },
        {
          onSuccess: (res) => {
            setExtractedData(res.data);
            setCurrentStep(1);
          }
        }
      );
    }
  };

  const handleConfirmReview = () => {
    // Sanitize the extracted data since the AI sometimes returns nulls
    // which break the strict Zod validation on the backend.
    const sanitizedTopics = (extractedData.topics || []).map(t => ({
      ...t,
      title: t.title || t.name || "Untitled Topic",
      description: t.description || "",
      estimatedDurationMinutes: t.estimatedDurationMinutes || 60,
      assessmentTitle: t.assessmentTitle || undefined
    }));

    const sanitizedAssessments = (extractedData.assessments || []).map(a => ({
      ...a,
      title: a.title || "Untitled Assessment",
      date: a.date || new Date().toISOString(),
      weight: a.weight || 0
    }));

    confirmMutation.mutate(
      { 
        courseId: course.id || course._id, 
        rawText: extractedData.rawText || "N/A",
        topics: sanitizedTopics,
        assessments: sanitizedAssessments
      },
      {
        onSuccess: () => {
          setCurrentStep(2);
        }
      }
    );
  };

  const handleGenerate = () => {
    setCurrentStep(3); // Show loading immediately
    
    // Convert empty string examDate to undefined/null for backend
    const payload = { ...preferences };
    if (!payload.examDate) {
      delete payload.examDate;
    }

    // Ensure session duration doesn't exceed daily goal
    const dailyGoalMinutes = (payload.hoursPerDay * 60) + payload.minutesPerDay;
    if (dailyGoalMinutes > 0) {
      payload.sessionMinutes = Math.min(payload.sessionMinutes, dailyGoalMinutes);
    }

    // 1. Save preferences
    savePreferencesMutation.mutate(
      payload,
      {
        onSuccess: () => {
          // 2. Generate Plan
          generateMutation.mutate(
            { courseId: course.id || course._id },
            {
              onSuccess: () => {
                setTimeout(() => {
                  onNavigate("study-plan");
                }, 1500);
              },
              onError: (err) => {
                setCurrentStep(2);
                alert(err.response?.data?.message || "Failed to generate plan. Please try again.");
              }
            }
          );
        },
        onError: (err) => {
          setCurrentStep(2);
          alert(err.response?.data?.message || "Failed to save preferences. Please try again.");
        }
      }
    );
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Stepper Header */}
      <div className="border-b border-gray-100 bg-gray-50/50 p-6">
        <div className="flex items-center space-x-2 md:space-x-4">
          {STEPS.map((step, index) => (
            <React.Fragment key={step}>
              <div className="flex items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0
                  ${currentStep > index ? "bg-gray-900 text-white" : 
                    currentStep === index ? "bg-[#4F46E5] text-white" : "bg-gray-200 text-gray-500"}
                `}>
                  {currentStep > index ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                </div>
                <span className={`hidden md:inline-block ml-3 text-sm font-medium ${currentStep >= index ? 'text-gray-900' : 'text-gray-500'}`}>
                  {step}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`w-8 md:w-16 h-px ${currentStep > index ? 'bg-gray-900' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="p-8 md:p-12">
        {currentStep === 0 && (
          <div className="text-center max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-gray-900 font-['Lora',serif] mb-2">Upload your Syllabus</h3>
            <p className="text-sm text-gray-500 mb-8">Upload a PDF or Image of your course syllabus. Our AI will automatically extract the key topics, modules, and assessment dates.</p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-12 hover:bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer relative">
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                accept=".pdf,image/*"
                onChange={handleFileUpload}
              />
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-4" />
              <p className="text-sm font-medium text-gray-900 mb-1">Click or drag file to this area to upload</p>
              <p className="text-xs text-gray-500">Supports PDF, PNG, JPG up to 10MB</p>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 font-['Lora',serif]">Review AI Extraction</h3>
              <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-full flex items-center">
                <BrainCircuit className="w-3 h-3 mr-1" /> AI Generated
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-8">Review the topics and assessments we found. You can add, edit, or remove items before proceeding.</p>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 mb-8">
              <h4 className="font-semibold text-gray-900 mb-4">Extracted Topics</h4>
              <ul className="space-y-3">
                {extractedData.topics?.length > 0 ? extractedData.topics.map((topic, i) => (
                  <li key={i} className="flex items-center p-3 bg-white border border-gray-100 rounded-lg text-sm text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-gray-400 mr-3" />
                    {topic.title || topic.name || topic}
                  </li>
                )) : (
                  <li className="text-gray-500 text-sm p-3">No topics extracted. Please proceed anyway or upload a different syllabus.</li>
                )}
              </ul>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleConfirmReview}
                className="px-6 py-2.5 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Confirm & Continue
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="max-w-lg mx-auto">
            <h3 className="text-xl font-bold text-gray-900 font-['Lora',serif] mb-2">Study Preferences</h3>
            <p className="text-sm text-gray-500 mb-8">Tell us how you prefer to study so we can generate the perfect schedule.</p>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Study Days</label>
                <div className="flex flex-wrap gap-2">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, idx) => (
                    <button 
                      key={day} 
                      onClick={() => toggleStudyDay(idx)}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors focus:outline-none ${
                        preferences.studyDays.includes(idx)
                          ? "border-gray-900 bg-gray-900 text-white"
                          : "border-gray-200 text-gray-600 hover:border-gray-900 hover:text-gray-900"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Daily Goal</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Hours</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="24" 
                      value={preferences.hoursPerDay}
                      onChange={(e) => setPreferences(prev => ({ ...prev, hoursPerDay: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all text-gray-900" 
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                    <input 
                      type="number" 
                      min="0" 
                      max="59" 
                      value={preferences.minutesPerDay}
                      onChange={(e) => setPreferences(prev => ({ ...prev, minutesPerDay: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all text-gray-900" 
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Exam Date (Optional)</label>
                <input 
                  type="date" 
                  value={preferences.examDate}
                  onChange={(e) => setPreferences(prev => ({ ...prev, examDate: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:bg-white transition-all text-gray-900" 
                />
                <p className="text-xs text-gray-500 mt-2">If provided, your study sessions will be scheduled before this date.</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={handleGenerate}
                className="px-6 py-2.5 bg-[#4F46E5] text-white font-medium rounded-lg hover:bg-[#4338CA] transition-colors shadow-sm flex items-center"
              >
                <BrainCircuit className="w-4 h-4 mr-2" />
                Generate AI Study Plan
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center py-12 max-w-md mx-auto">
            <BrainCircuit className="w-16 h-16 text-gray-900 mx-auto mb-6 animate-pulse" />
            <h3 className="text-2xl font-bold text-gray-900 font-['Lora',serif] mb-3">Generating your plan...</h3>
            <p className="text-sm text-gray-500">Our AI is crunching the numbers, allocating topics, and structuring your ideal learning path.</p>
            <div className="w-full bg-gray-100 rounded-full h-2 mt-8 overflow-hidden">
              <div className="bg-gray-900 h-2 rounded-full w-1/2 animate-[pulse_2s_ease-in-out_infinite]"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
