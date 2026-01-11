
import React, { useState, useEffect } from 'react';
import { EXAM_DATA } from '../data/examData';

interface ExamSimulationProps {
  topic: string;
  onBack: () => void;
}

export const ExamSimulation: React.FC<ExamSimulationProps> = ({ topic, onBack }) => {
  const examContent = EXAM_DATA[topic.toUpperCase()];
  const totalQuestions = examContent?.questions.length || 0;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [examState, setExamState] = useState<'in_progress' | 'submitted' | 'reviewing'>('in_progress');
  const [score, setScore] = useState(0);

  const handleSelectAnswer = (option: string) => {
    const optionLetter = option.substring(0, 1).toUpperCase();
    setAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionLetter }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to finish the exam?')) {
      let correctAnswers = 0;
      examContent.questions.forEach((q, index) => {
        if (answers[index] === q.answer.toUpperCase()) {
          correctAnswers++;
        }
      });
      setScore(correctAnswers);
      setExamState('submitted');
    }
  };

  const handleReview = () => {
    setCurrentQuestionIndex(0);
    setExamState('reviewing');
  };

  const handleRetake = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setScore(0);
    setExamState('in_progress');
  };

  if (!examContent) {
    return (
      <div className="text-center text-red-500">
        <p>Exam content for "{topic}" not found.</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 bg-zinc-700 rounded">Back</button>
      </div>
    );
  }

  const currentQuestion = examContent.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (examState === 'submitted' || examState === 'reviewing') {
    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
    const isPass = percentage >= 70;

    return (
      <div className="w-full max-w-4xl mx-auto p-8 bg-zinc-900 text-white rounded-lg shadow-2xl animate-in fade-in duration-500 border border-zinc-700">
        <h2 className="text-3xl font-bold brand-font text-center mb-4">{examState === 'submitted' ? 'Exam Results' : 'Review Answers'}</h2>
        <p className="text-center text-zinc-400 mb-8">{topic.toUpperCase()}</p>
        
        {examState === 'submitted' && (
          <div className="text-center mb-10">
            <p className={`text-6xl font-bold ${isPass ? 'text-green-500' : 'text-red-500'}`}>{percentage.toFixed(0)}%</p>
            <p className="text-2xl font-semibold mt-2">{score} / {totalQuestions} Correct</p>
            <p className={`text-xl font-bold mt-4 uppercase tracking-widest ${isPass ? 'text-green-500' : 'text-red-500'}`}>
              {isPass ? 'PASS' : 'FAIL'}
            </p>
          </div>
        )}

        {examState === 'reviewing' && (
          <div className="mb-8">
            <h3 className="font-bold text-lg mb-2">{currentQuestion.q}</h3>
            <div className="space-y-3 mt-4">
              {currentQuestion.options.map((option, optIndex) => {
                const optionLetter = option.substring(0, 1).toUpperCase();
                const isCorrect = optionLetter === currentQuestion.answer.toUpperCase();
                const isSelected = optionLetter === answers[currentQuestionIndex];
                
                let optionStyle = "border-zinc-700 bg-zinc-800";
                if (isCorrect) {
                  optionStyle = "border-green-500 bg-green-900/50 text-white font-bold";
                } else if (isSelected) {
                  optionStyle = "border-red-500 bg-red-900/50";
                }

                return (
                  <div key={optIndex} className={`p-4 border-2 rounded-lg flex items-center space-x-4 ${optionStyle}`}>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-700 flex items-center justify-center font-bold text-xs">{optionLetter}</div>
                    <span>{option.substring(3)}</span>
                    {isSelected && <span className="ml-auto text-xs font-bold uppercase tracking-wider">{ isCorrect ? "Correct" : "Your Answer"}</span>}
                    {!isSelected && isCorrect && <span className="ml-auto text-xs font-bold uppercase tracking-wider">Correct Answer</span>}
                  </div>
                );
              })}
            </div>
             <div className="flex justify-between items-center mt-8">
              <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="px-5 py-2 bg-zinc-700 rounded disabled:opacity-50 hover:bg-zinc-600">Previous</button>
              <span className="text-sm font-mono">{currentQuestionIndex + 1} / {totalQuestions}</span>
              <button onClick={handleNext} disabled={currentQuestionIndex === totalQuestions - 1} className="px-5 py-2 bg-zinc-700 rounded disabled:opacity-50 hover:bg-zinc-600">Next</button>
            </div>
          </div>
        )}

        <div className="mt-12 flex flex-col md:flex-row justify-center items-center gap-4 border-t border-zinc-700 pt-8">
          {examState === 'submitted' && <button onClick={handleReview} className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-500 transition-colors uppercase tracking-widest text-sm w-full md:w-auto">Review Answers</button>}
          {examState === 'reviewing' && <button onClick={() => setExamState('submitted')} className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-500 transition-colors uppercase tracking-widest text-sm w-full md:w-auto">Back to Results</button>}
          <button onClick={handleRetake} className="px-6 py-3 bg-zinc-700 text-white font-bold rounded hover:bg-zinc-600 transition-colors uppercase tracking-widest text-sm w-full md:w-auto">Retake Exam</button>
          <button onClick={onBack} className="px-6 py-3 bg-zinc-700 text-white font-bold rounded hover:bg-zinc-600 transition-colors uppercase tracking-widest text-sm w-full md:w-auto">Back to Topics</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-zinc-900 text-white rounded-lg shadow-2xl animate-in fade-in duration-500 border border-zinc-700">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold brand-font">{topic.toUpperCase()} EXAM</h2>
            <span className="text-sm font-mono">{currentQuestionIndex + 1} / {totalQuestions}</span>
        </div>
        <div className="w-full bg-zinc-700 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.3s' }}></div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-lg leading-relaxed mb-6">{currentQuestion.q}</h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option, optIndex) => {
            const optionLetter = option.substring(0, 1).toUpperCase();
            const isSelected = answers[currentQuestionIndex] === optionLetter;
            return (
              <button
                key={optIndex}
                onClick={() => handleSelectAnswer(option)}
                className={`w-full text-left p-4 border-2 rounded-lg flex items-center space-x-4 transition-all duration-200
                            ${isSelected ? 'border-blue-500 bg-blue-900/50' : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700'}`}
              >
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${isSelected ? 'bg-blue-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>{optionLetter}</div>
                <span>{option.substring(3)}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center mt-10 pt-6 border-t border-zinc-700">
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="px-6 py-3 bg-zinc-700 rounded disabled:opacity-50 hover:bg-zinc-600 transition-colors">Previous</button>
        {currentQuestionIndex === totalQuestions - 1 ? (
          <button onClick={handleSubmit} className="px-6 py-3 bg-green-600 text-white font-bold rounded hover:bg-green-500 transition-colors">Finish Exam</button>
        ) : (
          <button onClick={handleNext} className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-500 transition-colors">Next</button>
        )}
      </div>
    </div>
  );
};
