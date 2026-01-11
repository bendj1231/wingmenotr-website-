import React from 'react';

interface MasterSwitchProps {
  isLoggedIn: boolean;
  onToggle: () => void;
}

export const MasterSwitch: React.FC<MasterSwitchProps> = ({ isLoggedIn, onToggle }) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={onToggle}
        className={`
          w-16 h-16 border-2 border-zinc-300 rounded-md flex items-center justify-center
          transition-all duration-300 shadow-[0_0_15px_rgba(200,0,0,0.3)] hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]
          ${isLoggedIn ? 'bg-red-600' : 'bg-red-900'}
        `}
        aria-label="Master Switch"
      >
        <div className="text-center flex flex-col items-center justify-center">
          <span className="block text-[10px] font-bold text-white uppercase leading-tight mb-1">
            Master Switch
          </span>
          <span className="block text-[12px] font-black text-white uppercase leading-none">
            {isLoggedIn ? 'ON' : 'OFF'}
          </span>
        </div>
      </button>
      <div className="mt-2 text-center">
        <span className={`text-[10px] uppercase font-bold tracking-wider ${isLoggedIn ? 'text-green-400' : 'text-zinc-500'}`}>
          {isLoggedIn ? 'Signed In' : 'Signed Out'}
        </span>
      </div>
    </div>
  );
};