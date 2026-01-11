
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { IMAGES, TIMELINE_STAGES } from '../constants'; // Import TIMELINE_STAGES

interface PilotGapTimelineProps {
  // compact?: boolean; // Removed as requested
}

export const PilotGapTimeline: React.FC<PilotGapTimelineProps> = (/* { compact = false } */) => {
  const { isDarkMode } = useTheme();

  const stageColor = isDarkMode ? 'text-yellow-400' : 'text-blue-600';
  const accentBg = isDarkMode ? 'bg-blue-900/20' : 'bg-blue-100';
  const accentBorder = isDarkMode ? 'border-blue-700' : 'border-blue-300';
  const textColor = isDarkMode ? 'text-zinc-300' : 'text-zinc-700';
  const textBody = isDarkMode ? 'text-white' : 'text-black'; // Using textBody for consistency
  const gapColor = 'text-red-500';
  const gapBg = 'bg-red-900/10';
  const gapBorder = 'border-red-700';

  // Use TIMELINE_STAGES from constants.ts
  const stages = TIMELINE_STAGES;

  // The compact view logic is no longer applicable since `compact` prop is removed
  // if (compact) {
  //   return (
  //     <div className={`w-full max-w-lg mx-auto mb-10 p-4 rounded-lg ${accentBg} transition-colors relative`}>
  //       <div className="relative flex justify-between items-start text-center mb-4 pt-4">
  //         <div className={`absolute top-1/2 left-0 right-0 h-1 bg-white -translate-y-1/2`}></div>
  //         <div className={`absolute top-1/2 left-0 right-0 h-1 bg-zinc-300 -translate-y-1/2 animate-pulse-slow`}></div>
  //         <div className="absolute top-1/2 -translate-y-1/2 left-[calc(25%_+_12px)] w-[calc(50%_-_24px)] flex justify-center z-20 pointer-events-none">
  //           <span className={`bg-red-900/50 text-red-300 px-2 py-1 rounded-full text-[8px] font-bold uppercase whitespace-nowrap`}>
  //               PILOTS EXPERIENCE AND HOURLY GAP
  //           </span>
  //         </div>
  //         {stages.map((stage, index) => (
  //           <div key={stage.id} className="relative flex flex-col items-center flex-1 z-10 mx-1">
  //             <div className="mb-2">
  //               <span className={`text-[9px] font-bold uppercase leading-tight ${textColor}`}>{stage.title === 'STUDENT PILOT' ? 'STUDENT' : stage.title}</span>
  //               {stage.id === 'commercial' && <span className={`text-[8px] font-bold ${gapColor} opacity-70 ml-1`}></span>}
  //             </div>
  //             <div className={`w-3 h-3 rounded-full ${stage.id === 'wing_mentor' ? 'bg-red-500' : 'bg-white'} ring-2 ring-white mb-2`}></div>
  //           </div>
  //         ))}
  //       </div>
  //       <div className="flex justify-between items-center mt-4">
  //           {stages.map(stage => (
  //               <span key={stage.id} className={`text-[8px] uppercase font-mono px-1 py-0.5 rounded
  //                           ${stage.id === 'commercial' ? `bg-red-900/10 ${textBody} border ${gapBorder}` : `${accentBg} ${textColor} border ${accentBorder}`}`}>
  //                   {stage.hours}
  //               </span>
  //           ))}
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <h3 className={`text-xl md:text-2xl font-bold brand-font uppercase tracking-widest text-center mb-8 ${stageColor}`}>
        PILOT PATHWAY: FROM ASPIRATION TO COMMAND
      </h3>
      <div className="relative flex flex-row flex-nowrap overflow-x-auto md:overflow-visible justify-between items-stretch py-4 px-2 md:px-0 scrollbar-hide">
        {/* Timeline Line - Now visible on mobile */}
        <div className={`absolute top-1/2 left-0 right-0 h-2 bg-white -translate-y-1/2 z-0 min-w-[600px] md:min-w-0`}></div>
        <div className={`absolute top-1/2 left-0 right-0 h-2 bg-zinc-300 -translate-y-1/2 animate-pulse-slow z-0 min-w-[600px] md:min-w-0`}></div>


        {stages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <div className="relative flex flex-col items-center text-center p-3 md:p-4 flex-shrink-0 w-[160px] md:w-auto md:flex-1 mx-1 z-10
                                        rounded-xl shadow-lg transition-all duration-500 hover:scale-105
                                        py-3"> {/* Removed border classes */}
              {/* Stage Title */}
              <h4 className={`text-lg md:text-xl font-bold brand-font uppercase mb-0.5 ${stage.color}`}>
                {stage.title}
              </h4>
              {/* Stage Description */}
              {stage.description && (
                <p className={`text-xs md:text-sm leading-relaxed ${textColor} flex-grow mb-2`}> {/* Added mb-2 to push content down from dot */}
                  {stage.description}
                </p>
              )}
              
              {/* Dot for line alignment */}
              <div className={`absolute top-1/2 left-1/2 w-3 h-3 rounded-full ${stage.id === 'wing_mentor' ? 'bg-red-500' : 'bg-white'} transform -translate-x-1/2 -translate-y-1/2 z-20 ring-2 ring-white`}></div>

              {/* Hours */}
              <div className={`mt-3 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest
                            ${stage.id === 'commercial' ? `bg-red-900/10 ${textBody} border ${gapBorder}` : `${accentBg} ${textColor} border ${accentBorder}`}`}>
                  {stage.hours}
              </div>
            </div>
            {/* Gap Indicator between CPL and Wing Mentor */}
            {/* FIX: Moved gap indicator to appear after the Commercial Pilot stage (index 2) to accurately reflect the career path. */}
            {index === 2 && ( // CPL is at index 2
              <div className="flex flex-col items-center justify-center flex-shrink-0 w-[100px] md:w-[200px] mx-1 z-10">
                <div className={`w-full h-1 bg-red-600 border-t border-b border-red-800 animate-pulse-slow`}></div>
                <span className={`text-[8px] md:text-[9px] font-bold uppercase text-red-300 text-center mt-2 px-1`}>
                  PILOTS EXPERIENCE AND HOURLY GAP
                </span>
                <div className={`w-full h-1 bg-red-600 border-t border-b border-red-800 animate-pulse-slow mt-2`}></div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
