
import React, { useState, useEffect } from 'react';
import { EXAM_DATA, ExamQuestion } from '../data/examData';

interface GroundCourseViewerProps {
  topic: string;
  onBack: () => void;
}

interface ExamContent {
    title: string;
    subtitle: string;
    questions: ExamQuestion[];
}

export const GroundCourseViewer: React.FC<GroundCourseViewerProps> = ({ topic, onBack }) => {
  // Key for local storage to persist edits per topic
  const storageKey = `exam_data_${topic}`;

  const [content, setContent] = useState<ExamContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    // 1. Try loading from Local Storage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
        try {
            setContent(JSON.parse(saved));
        } catch (e) {
            console.error("Failed to parse saved exam data", e);
            loadDefaultData();
        }
    } else {
        // 2. Fallback to default EXAM_DATA
        loadDefaultData();
    }
  }, [topic]);

  const loadDefaultData = () => {
      const defaultData = EXAM_DATA[topic.toUpperCase()];
      if (defaultData) {
          // Deep copy to ensure we have a mutable object
          setContent(JSON.parse(JSON.stringify(defaultData)));
      } else {
          setContent(null);
      }
  };

  const handleSave = () => {
      if (content) {
          localStorage.setItem(storageKey, JSON.stringify(content));
          setSaveMessage("Saved successfully!");
          setTimeout(() => setSaveMessage(""), 3000);
          setIsEditing(false);
      }
  };

  const handleReset = () => {
      if (window.confirm("Reset to default data? All your custom edits for this topic will be lost.")) {
          localStorage.removeItem(storageKey);
          loadDefaultData();
          setIsEditing(false);
      }
  };

  // Update specific fields of a question
  const updateQuestion = (index: number, field: keyof ExamQuestion, value: any) => {
      if (!content) return;
      const newQuestions = [...content.questions];
      newQuestions[index] = { ...newQuestions[index], [field]: value };
      setContent({ ...content, questions: newQuestions });
  };

  // Update a specific option text
  const updateOption = (qIndex: number, optIndex: number, value: string) => {
      if (!content) return;
      const newQuestions = [...content.questions];
      const newOptions = [...newQuestions[qIndex].options];
      newOptions[optIndex] = value;
      newQuestions[qIndex] = { ...newQuestions[qIndex], options: newOptions };
      setContent({ ...content, questions: newQuestions });
  };

  const addQuestion = () => {
      if (!content) return;
      const newQuestion: ExamQuestion = {
          q: "New Question Text",
          options: ["Option A", "Option B", "Option C"],
          answer: "A"
      };
      setContent({ ...content, questions: [...content.questions, newQuestion] });
  };

  const deleteQuestion = (index: number) => {
      if (!content) return;
      if (!window.confirm("Delete this question?")) return;
      const newQuestions = content.questions.filter((_, i) => i !== index);
      setContent({ ...content, questions: newQuestions });
  };

  if (!content) {
    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-white text-black font-serif rounded-lg shadow-2xl animate-in fade-in duration-500 text-center">
        <h2 className="text-red-600 font-bold">Error</h2>
        <p>Exam content for "{topic}" could not be found.</p>
        <button
          onClick={onBack}
          className="mt-6 px-6 py-2 bg-black text-white font-bold rounded hover:bg-zinc-800 transition-colors uppercase tracking-widest text-sm"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white text-black font-serif rounded-lg shadow-2xl animate-in fade-in duration-500 relative">
      
      {/* Editor Controls */}
      <div className="absolute top-4 right-4 flex space-x-2 z-10">
          {isEditing ? (
              <>
                <button 
                    onClick={handleReset} 
                    className="px-3 py-1 bg-red-100 text-red-700 border border-red-300 text-xs font-bold rounded hover:bg-red-200 transition-colors uppercase tracking-wider"
                >
                    Reset Defaults
                </button>
                <button 
                    onClick={() => setIsEditing(false)} 
                    className="px-3 py-1 bg-gray-100 text-gray-700 border border-gray-300 text-xs font-bold rounded hover:bg-gray-200 transition-colors uppercase tracking-wider"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSave} 
                    className="px-3 py-1 bg-green-600 text-white border border-green-600 text-xs font-bold rounded hover:bg-green-500 transition-colors uppercase tracking-wider shadow-md"
                >
                    Save Changes
                </button>
              </>
          ) : (
              <button 
                onClick={() => setIsEditing(true)} 
                className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-500 shadow-md transition-all uppercase tracking-wider flex items-center"
              >
                  <i className="fas fa-edit mr-2"></i> Edit Reviewer
              </button>
          )}
      </div>
      {saveMessage && (
          <div className="absolute top-4 left-4 bg-green-100 text-green-800 px-3 py-1 rounded border border-green-300 text-xs font-bold uppercase tracking-wider animate-pulse">
              {saveMessage}
          </div>
      )}

      {/* Header Section */}
      <div className="text-center mb-10 border-b-2 border-black pb-4 mt-8">
        {isEditing ? (
            <div className="space-y-2">
                <input 
                    className="text-xl font-bold uppercase tracking-widest text-center w-full border-b border-dashed border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent placeholder-gray-400"
                    value={content.title}
                    onChange={(e) => setContent({...content, title: e.target.value})}
                    placeholder="Exam Title"
                />
                <input 
                    className="text-lg font-semibold uppercase tracking-wider text-center w-full border-b border-dashed border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent placeholder-gray-400"
                    value={content.subtitle}
                    onChange={(e) => setContent({...content, subtitle: e.target.value})}
                    placeholder="Subtitle"
                />
            </div>
        ) : (
            <>
                <h1 className="text-xl font-bold uppercase tracking-widest">{content.title}</h1>
                <h2 className="text-lg font-semibold uppercase tracking-wider mt-2">{content.subtitle}</h2>
            </>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-8">
        {content.questions.map((item, index) => (
          <div key={index} className={`text-base leading-relaxed border-b border-gray-100 pb-6 relative group transition-colors ${isEditing ? 'hover:bg-gray-50 p-4 rounded-lg border border-transparent hover:border-gray-200' : ''}`}>
            
            {/* Delete Button (Edit Mode Only) */}
            {isEditing && (
                <button 
                    onClick={() => deleteQuestion(index)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                    title="Delete Question"
                >
                    <i className="fas fa-trash-alt"></i>
                </button>
            )}

            {isEditing ? (
                <div className="mb-4 pr-8">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Question {index + 1}</label>
                    <textarea 
                        className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 font-sans text-sm resize-y"
                        value={item.q}
                        onChange={(e) => updateQuestion(index, 'q', e.target.value)}
                        rows={2}
                    />
                </div>
            ) : (
                <p className="mb-4 font-bold text-lg">{item.q}</p>
            )}
            
            <div className="ml-4 md:ml-8 space-y-2">
              {item.options.map((option, optIndex) => {
                // Determine the letter for this option index (0 -> A, 1 -> B, etc.)
                const currentLetter = String.fromCharCode(65 + optIndex);
                const isCorrect = currentLetter === item.answer.toUpperCase();
                
                return (
                  <div key={optIndex} className="flex items-start space-x-3">
                      <span className={`font-mono text-sm font-bold w-6 pt-1 ${isCorrect && !isEditing ? 'text-green-600' : 'text-gray-500'}`}>
                          {currentLetter}.
                      </span>
                      
                      {isEditing ? (
                          <input 
                            className="flex-1 p-1 border-b border-gray-300 focus:outline-none focus:border-blue-500 font-sans text-sm bg-transparent"
                            value={option}
                            onChange={(e) => updateOption(index, optIndex, e.target.value)}
                          />
                      ) : (
                          <div className={`flex-1 ${isCorrect ? 'font-bold text-green-700 bg-green-50/50 -ml-2 pl-2 rounded' : ''}`}>
                            {option} 
                            {isCorrect && <i className="fas fa-check ml-2 text-xs"></i>}
                          </div>
                      )}
                  </div>
                );
              })}
            </div>

            {/* Answer Selector (Edit Mode Only) */}
            {isEditing && (
                <div className="mt-4 ml-8 flex items-center bg-yellow-50 p-2 rounded border border-yellow-200 w-fit">
                    <label className="text-[10px] font-bold text-yellow-700 uppercase mr-3">Correct Answer:</label>
                    <select 
                        value={item.answer}
                        onChange={(e) => updateQuestion(index, 'answer', e.target.value)}
                        className="p-1 border border-yellow-300 rounded font-sans text-sm bg-white focus:outline-none"
                    >
                        {item.options.map((_, i) => (
                            <option key={i} value={String.fromCharCode(65 + i)}>{String.fromCharCode(65 + i)}</option>
                        ))}
                    </select>
                </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Question Button (Edit Mode Only) */}
      {isEditing && (
          <div className="mt-8 text-center py-8 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition-colors">
              <button 
                onClick={addQuestion}
                className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-full hover:bg-blue-600 hover:text-white uppercase tracking-wider text-xs transition-all shadow-sm"
              >
                  <i className="fas fa-plus mr-2"></i> Add New Question
              </button>
          </div>
      )}

      {/* Footer Navigation */}
      <div className="mt-12 text-center border-t border-gray-300 pt-8">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-black text-white font-bold rounded hover:bg-zinc-800 transition-colors uppercase tracking-widest text-xs shadow-lg"
        >
          Return to Options
        </button>
      </div>
    </div>
  );
};
