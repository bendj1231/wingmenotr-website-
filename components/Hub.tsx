import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';

type Destination = 'LANDING' | 'TOOLS' | 'PROGRAM' | 'LOGS' | 'SHOP' | 'GAP' | 'BLACK_BOX' | 'LATEST_NEWS' | 'DEVELOPER' | 'PASSPORT' | 'EXAMINATION' | 'LOGIN' | 'MAIL' | 'IFR';

interface HubProps {
  onNavigate: (destination: Destination) => void;
}

// Board Data with Times
const BOARD_ITEMS: { id: string; label: string; time: string; target: Destination }[] = [
  { id: 'landing', label: 'HOME PAGE', time: '06:00', target: 'LANDING' },
  { id: 'gap', label: 'THE PILOT GAP FORUM', time: '08:30', target: 'GAP' },
  { id: 'program', label: 'PROGRAM DETAILS', time: '09:00', target: 'PROGRAM' },
  { id: 'mail', label: 'FLIGHT DISPATCH MAIL', time: '10:15', target: 'MAIL' },
  { id: 'examination', label: 'EXAMINATION TERMINAL', time: '11:45', target: 'EXAMINATION' },
  { id: 'ifr', label: 'IFR SIMULATOR', time: '12:00', target: 'IFR' },
  { id: 'blackbox', label: 'THE BLACK BOX', time: '12:15', target: 'BLACK_BOX' },
  { id: 'passport', label: 'WINGMENTOR PASSPORT', time: '14:20', target: 'PASSPORT' },
  { id: 'logs', label: 'WING LOGS', time: '16:50', target: 'LOGS' },
  { id: 'developer', label: 'DEVELOPER SECTION', time: '22:00', target: 'DEVELOPER' },
  { id: 'login', label: 'SYSTEM LOGIN', time: 'AUTH', target: 'LOGIN' },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 -_.:";

const SplitFlapChar: React.FC<{ targetChar: string; delay: number; trigger: boolean }> = ({ targetChar, delay, trigger }) => {
  const [char, setChar] = useState(" ");
  
  useEffect(() => {
    if (!trigger) return;

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
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[50%] text-zinc-300 font-mono font-normal text-[2vh] md:text-[2.5vh] leading-none">
          {char}
        </span>
      </div>
      <div className="h-1/2 w-full bg-black relative overflow-hidden">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[50%] text-zinc-300 font-mono font-normal text-[2vh] md:text-[2.5vh] leading-none">
          {char}
        </span>
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

export const Hub: React.FC<HubProps> = ({ onNavigate }) => {
  const [trigger, setTrigger] = useState(false);
  const [isDeparting, setIsDeparting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTrigger(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleNavigationClick = (target: Destination) => {
    if (isDeparting) return; 
    setIsDeparting(true);
    setTimeout(() => {
      onNavigate(target);
      setIsDeparting(false);
    }, 800);
  };

  return (
    <div className="relative w-full min-h-screen bg-black select-none font-sans flex flex-col items-center justify-center p-8">
      <div className="relative z-10 w-full max-w-6xl mb-16 flex flex-col items-start border-b border-zinc-800/50 pb-4">
          <div className="flex items-baseline space-x-4">
            <h1 className="text-xl md:text-2xl font-mono text-zinc-100 tracking-tight font-bold">
                WINGMENTOR TERMINAL
            </h1>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="w-full flex justify-between text-zinc-600 font-mono text-[10px] md:text-xs uppercase tracking-widest mt-2">
              <div className="relative">
                <span>DESTINATION</span>
                <i className={`fas fa-plane absolute top-full left-0 mt-2 text-zinc-400 transition-opacity duration-300 ${isDeparting ? 'plane-takeoff-animation' : 'opacity-100'}`}></i>
              </div>
              <span>DEPARTURE TIME</span>
          </div>
      </div>

      <div className="relative z-10 flex flex-col gap-4 w-full max-w-6xl">
          {BOARD_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigationClick(item.target)}
              className="flex flex-row items-center justify-between group focus:outline-none w-full opacity-70 hover:opacity-100 transition-all duration-300 hover:pl-2"
            >
              <div className="flex-1 text-left">
                 <SplitFlapBoard label={item.label} maxLength={30} trigger={trigger} />
              </div>
              <div className="w-auto text-right pl-4 hidden md:block">
                 <SplitFlapBoard label={item.time} maxLength={5} trigger={trigger} />
              </div>
            </button>
          ))}
      </div>
      
      <div className="fixed bottom-8 left-8 text-zinc-800 text-[10px] font-mono tracking-widest uppercase">
          SYSTEM: ONLINE_
      </div>
    </div>
  );
};