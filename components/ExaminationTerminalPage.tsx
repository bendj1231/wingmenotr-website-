

import React, { useState, useEffect } from 'react';
import { GroundCourseViewer } from './GroundCourseViewer';
import { ExamSimulation } from './ExamSimulation';

interface ExaminationTerminalPageProps {
  onNavigate: (destination: 'PROGRAM' | 'HUB') => void;
  onBackToHub: () => void;
}

type NavTarget = 'PROGRAM' | 'HUB' | 'SHOW_TOPICS' | 'SHOW_RATINGS' | 'SHOW_EXAM_REVIEW' | 'SHOW_TOPIC_OPTIONS' | 'START_EXAM_SIM';

const RATINGS_BOARD_ITEMS: { id: string; label: string; time: string; target: NavTarget }[] = [
  { id: 'spl', label: 'STUDENT PILOT LICENSE (SPL)', time: '08:00', target: 'SHOW_TOPICS' },
  { id: 'ppl', label: 'PRIVATE PILOT LICENSE (PPL)', time: '09:30', target: 'SHOW_TOPICS' },
  { id: 'ir', label: 'INSTRUMENT RATING (IR)', time: '11:00', target: 'PROGRAM' },
  { id: 'cpl', label: 'COMMERCIAL PILOT LICENSE (CPL)', time: '13:00', target: 'SHOW_TOPICS' },
  { id: 'mei', label: 'MULTI-ENGINE RATING (ME)', time: '14:30', target: 'PROGRAM' },
  { id: 'cfi', label: 'FLIGHT INSTRUCTOR (CFI)', time: '16:00', target: 'PROGRAM' },
  { id: 'return', label: 'RETURN TO MAIN TERMINAL', time: '----', target: 'HUB' },
];

const TOPIC_BOARD_ITEMS: { id: string; label: string; time: string; target: NavTarget }[] = [
    { id: 'met', label: 'METEOROLOGY', time: 'EXAM', target: 'SHOW_TOPIC_OPTIONS' },
    { id: 'plan', label: 'FLIGHT PLANNING', time: 'EXAM', target: 'SHOW_TOPIC_OPTIONS' },
    { id: 'nav', label: 'NAVIGATION', time: 'EXAM', target: 'SHOW_TOPIC_OPTIONS' },
    { id: 'law', label: 'AIR LAW', time: 'EXAM', target: 'SHOW_TOPIC_OPTIONS' },
    { id: 'law2', label: 'AIR LAW PHILIPPINES PCAR', time: 'NEW', target: 'SHOW_TOPIC_OPTIONS' },
    { id: 'pof', label: 'PRINCIPALS OF FLIGHT', time: 'EXAM', target: 'SHOW_TOPIC_OPTIONS' },
    { id: 'hp', label: 'HUMAN PERFORMANCE', time: 'EXAM', target: 'SHOW_TOPIC_OPTIONS' },
    { id: 'ops', label: 'OPERATIONS', time: 'EXAM', target: 'SHOW_TOPIC_OPTIONS' },
    { id: 'radio', label: 'RADIOTELEPHONY', time: 'EXAM', target: 'SHOW_TOPIC_OPTIONS' },
    { id: 'agk', label: 'AIRCRAFT GENERAL KNOWLEDGE', time: 'EXAM', target: 'SHOW_TOPIC_OPTIONS' },
    { id: 'back', label: 'BACK TO RATINGS', time: '----', target: 'SHOW_RATINGS' },
];

const TOPIC_OPTIONS_ITEMS: { id: string; label: string; time: string; target: NavTarget }[] = [
    { id: 'review', label: 'REVIEW MATERIAL', time: 'MODE', target: 'SHOW_EXAM_REVIEW' },
    { id: 'take_exam', label: 'TAKE EXAM', time: 'MODE', target: 'START_EXAM_SIM' },
    { id: 'back_topics', label: 'BACK TO TOPICS', time: '----', target: 'SHOW_TOPICS' },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -_.:";

const SplitFlapChar: React.FC<{ targetChar: string; delay: number; trigger: boolean }> = ({ targetChar, delay, trigger }) => {
  const [char, setChar] = useState(" ");
  
  useEffect(() => {
    if (!trigger) {
        setChar(" ");
        return;
    }
    const startDelay = setTimeout(() => {
      let cycles = 0;
      const maxCycles = 12; 
      const interval = setInterval(() => {
        setChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
        cycles++;
        if (cycles >= maxCycles) {
          clearInterval(interval);
          setChar(targetChar);
        }
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startDelay);
  }, [trigger, targetChar, delay]);

  return (
    <div className="relative w-[1.8vh] h-[3vh] md:w-[2.2vh] md:h-[4vh] bg-black overflow-hidden m-[1px] flex flex-col box-border group-hover:bg-zinc-900 transition-colors duration-300">
      <div className="h-1/2 w-full bg-black border-b border-zinc-800/50 relative overflow-hidden">
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] text-zinc-300 font-mono font-normal text-[2vh] md:text-[2.5vh] leading-none">{char}</span>
      </div>
      <div className="h-1/2 w-full bg-black relative overflow-hidden">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] text-zinc-300 font-mono font-normal text-[2vh] md:text-[2.5vh] leading-none">{char}</span>
      </div>
    </div>
  );
};

const SplitFlapBoard: React.FC<{ label: string; maxLength: number; trigger: boolean }> = ({ label, maxLength, trigger }) => {
  const paddedLabel = label.toUpperCase().padEnd(maxLength, ' ');
  const chars = paddedLabel.split('').slice(0, maxLength);
  return (
    <div className="flex items-center">
      {chars.map((char, i) => (
        <SplitFlapChar key={i} targetChar={char} delay={i * 30} trigger={trigger} />
      ))}
    </div>
  );
};

export const ExaminationTerminalPage: React.FC<ExaminationTerminalPageProps> = ({ onNavigate }) => {
  type ViewState = 'ratings' | 'topics' | 'topic_options' | 'exam_review' | 'exam_simulation';
  const [view, setView] = useState<ViewState>('ratings');
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string>('AIR LAW');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTrigger(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleNavigation = (target: NavTarget, label?: string | null) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTrigger(false);

    setTimeout(() => {
      if (target === 'PROGRAM' || target === 'HUB') {
        onNavigate(target);
        return;
      }
      
      switch(target) {
        case 'SHOW_TOPICS':
          // Only update selectedRating if the label is NOT "BACK TO TOPICS"
          if (label && label !== 'BACK TO TOPICS') setSelectedRating(label);
          setView('topics');
          break;
        case 'SHOW_RATINGS':
          setSelectedRating(null);
          setView('ratings');
          break;
        case 'SHOW_TOPIC_OPTIONS':
          if (label) setSelectedTopic(label);
          setView('topic_options');
          break;
        case 'SHOW_EXAM_REVIEW':
          setView('exam_review');
          break;
        case 'START_EXAM_SIM':
          setView('exam_simulation');
          break;
      }

      setTimeout(() => {
          setTrigger(true);
          setIsTransitioning(false);
      }, 50);
    }, 600);
  };

  const renderHeader = () => {
    switch(view) {
        case 'ratings': return <>
            <h1 className="text-xl md:text-2xl font-mono text-zinc-100 tracking-tight font-bold">EXAMINATION TERMINAL</h1>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </>;
        case 'topics': return <>
            <h1 className="text-lg md:text-xl font-mono text-zinc-100 tracking-tight font-bold">EXAM TOPICS: <span className="text-yellow-400">{selectedRating}</span></h1>
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
        </>;
        case 'topic_options': return <>
            <h1 className="text-lg md:text-xl font-mono text-zinc-100 tracking-tight font-bold">TOPIC: <span className="text-cyan-400">{selectedTopic}</span></h1>
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
        </>;
        case 'exam_review': return <>
            <h1 className="text-lg md:text-xl font-mono text-zinc-100 tracking-tight font-bold">REVIEW MATERIAL: <span className="text-red-400">{selectedTopic}</span></h1>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
        </>;
        case 'exam_simulation': return <>
            <h1 className="text-lg md:text-xl font-mono text-zinc-100 tracking-tight font-bold">EXAM SIMULATION: <span className="text-purple-400">{selectedTopic}</span></h1>
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
        </>;
    }
  };

  const renderSubHeader = () => {
    switch(view) {
        case 'ratings': return <>
            <div className="relative"><span>AVAILABLE EXAMINATIONS</span><i className={`fas fa-plane absolute top-full left-0 mt-2 text-zinc-400 transition-opacity duration-300 ${isTransitioning ? 'plane-takeoff-animation' : 'opacity-100'}`}></i></div>
            <span>SCHEDULED</span>
        </>;
        case 'topics': return <>
            <div className="relative"><span>SELECT TOPIC</span><i className={`fas fa-plane absolute top-full left-0 mt-2 text-zinc-400 transition-opacity duration-300 ${isTransitioning ? 'plane-takeoff-animation' : 'opacity-100'}`}></i></div>
            <span>STATUS</span>
        </>;
        case 'topic_options': return <>
            <div className="relative"><span>SELECT MODE</span><i className={`fas fa-plane absolute top-full left-0 mt-2 text-zinc-400 transition-opacity duration-300 ${isTransitioning ? 'plane-takeoff-animation' : 'opacity-100'}`}></i></div>
            <span>DESCRIPTION</span>
        </>;
        default: return null;
    }
  }

  const renderBoard = () => {
    let items;
    switch(view) {
      case 'ratings': items = RATINGS_BOARD_ITEMS; break;
      case 'topics': items = TOPIC_BOARD_ITEMS; break;
      case 'topic_options': items = TOPIC_OPTIONS_ITEMS; break;
      default: return null;
    }

    return (
      <div className={`relative z-10 flex flex-col gap-4 w-full max-w-6xl transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item.target, item.label)}
            className="flex flex-row items-center justify-between group focus:outline-none w-full opacity-70 hover:opacity-100 transition-all duration-300 hover:pl-2"
          >
            <div className="flex-1 text-left"><SplitFlapBoard label={item.label} maxLength={35} trigger={trigger} /></div>
            <div className="w-auto text-right pl-4 hidden md:block"><SplitFlapBoard label={item.time} maxLength={5} trigger={trigger} /></div>
          </button>
        ))}
      </div>
    );
  };

  const getEffectiveTopic = () => {
    if (selectedTopic === 'FLIGHT PLANNING') {
      if (selectedRating && selectedRating.includes('CPL')) {
        return 'FLIGHT PLANNING (CPL)';
      }
      return 'FLIGHT PLANNING (PPL)';
    }
    if (selectedTopic === 'AIR LAW') {
        if (selectedRating && selectedRating.includes('CPL')) {
            return 'AIR LAW (CPL)';
        }
        return 'AIR LAW (PPL)';
    }
    if (selectedTopic === 'NAVIGATION') {
        if (selectedRating && selectedRating.includes('CPL')) {
            return 'NAVIGATION (CPL)';
        }
        return 'NAVIGATION (PPL)';
    }
    if (selectedTopic === 'HUMAN PERFORMANCE') {
        if (selectedRating && selectedRating.includes('CPL')) {
            return 'HUMAN PERFORMANCE (CPL)';
        }
        return 'HUMAN PERFORMANCE (PPL)';
    }
    if (selectedTopic === 'RADIOTELEPHONY') {
        if (selectedRating && selectedRating.includes('CPL')) {
            return 'RADIOTELEPHONY (CPL)';
        }
        return 'RADIOTELEPHONY (PPL)';
    }
    if (selectedTopic === 'AIRCRAFT GENERAL KNOWLEDGE') {
        if (selectedRating && selectedRating.includes('CPL')) {
            return 'AIRCRAFT GENERAL KNOWLEDGE (CPL)';
        }
        return 'AIRCRAFT GENERAL KNOWLEDGE (PPL)';
    }
    return selectedTopic;
  };

  const renderContent = () => {
    const effectiveTopic = getEffectiveTopic();
    switch(view) {
        case 'exam_review':
            return <div className="w-full">
                {!isTransitioning && <GroundCourseViewer topic={effectiveTopic} onBack={() => handleNavigation('SHOW_TOPIC_OPTIONS', selectedTopic)} />}
            </div>;
        case 'exam_simulation':
            return <div className="w-full">
                {!isTransitioning && <ExamSimulation topic={effectiveTopic} onBack={() => handleNavigation('SHOW_TOPIC_OPTIONS', selectedTopic)} />}
            </div>;
        default:
            return renderBoard();
    }
  }

  return (
    <div className="relative w-full min-h-screen bg-black select-none font-sans flex flex-col items-center justify-center p-8">
      <div className={`relative z-10 w-full max-w-6xl mb-16 flex flex-col items-start border-b border-zinc-800/50 pb-4 transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-baseline space-x-4">{renderHeader()}</div>
          <div className="w-full flex justify-between text-zinc-600 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-2">{renderSubHeader()}</div>
      </div>
      {renderContent()}
      <div className="fixed bottom-8 left-8 text-zinc-800 text-[10px] font-mono tracking-widest uppercase">SYSTEM: ONLINE_</div>
    </div>
  );
};
