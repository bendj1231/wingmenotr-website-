import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useTheme } from '../context/ThemeContext';

interface IFRSimulatorPageProps {
  onBackToLanding: () => void;
}

type ViewMode = 'G1000' | 'MAP';
type InstrumentMode = 'VOR' | 'HSI';
type MapViewMode = 'LOCKED' | 'FULL';
type InstrumentType = 'RADIO' | 'HEADING' | 'TURN' | 'TIMER' | 'DME';

interface Point {
    x: number;
    y: number;
}

interface VorStation {
    id: string;
    name: string;
    freq: string;
    x: number;
    y: number;
}

const WORLD_WIDTH = 3600;
const WORLD_HEIGHT = 2400;

const AVAILABLE_STATIONS: VorStation[] = [
    { id: 'MNL', name: 'NINOY AQUINO', freq: '113.8', x: 1800, y: 1200 },
    { id: 'CAB', name: 'CABANATUAN', freq: '112.9', x: 2800, y: 400 },
    { id: 'LIP', name: 'LIPA', freq: '110.8', x: 2600, y: 2000 },
    { id: 'OLG', name: 'OLONGAPO', freq: '115.3', x: 800, y: 1000 },
    { id: 'JOM', name: 'JOMALIG', freq: '116.2', x: 3200, y: 800 },
    { id: 'MIA', name: 'MANILA', freq: '114.9', x: 1650, y: 1350 }
];

const ISLANDS_DATA = [
    { d: "M 600 800 Q 900 500 1200 800 T 1400 1200 T 1000 1500 T 600 1300 T 600 800 Z" },
    { d: "M 1600 1200 Q 1800 1000 2000 1100 T 2200 1400 T 1900 1600 T 1500 1500 T 1600 1200 Z" },
    { d: "M 2600 400 Q 2900 200 3100 500 T 3200 800 T 2900 1000 T 2600 800 T 2600 400 Z" },
    { d: "M 3200 800 Q 3400 700 3500 900 T 3400 1200 T 3100 1100 T 3200 800 Z" },
    { d: "M 2400 1900 Q 2700 1700 3000 2000 T 2900 2300 T 2500 2300 T 2400 1900 Z" },
    { d: "M 400 1600 Q 600 1500 700 1700 T 600 2000 T 300 1900 T 400 1600 Z" },
    { d: "M 2000 500 Q 2100 400 2200 500 T 2200 700 T 2000 700 Z" },
    { d: "M 1200 200 Q 1400 100 1600 200 T 1700 400 T 1500 500 T 1200 400 T 1200 200 Z" }
];

// Enhanced Glass Reflection Overlay with Vignette and depth
const InstrumentGlass = () => (
    <div className="absolute inset-0 z-40 pointer-events-none rounded-full overflow-hidden">
        {/* Main Vignette - Core of the depth */}
        <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(0,0,0,0.8)]"></div>
        
        {/* Dynamic Light Reflection */}
        <div className="absolute top-[-25%] left-[-25%] w-[150%] h-[150%] bg-gradient-to-br from-white/15 via-transparent to-black/30 rotate-[25deg] opacity-40"></div>
        
        {/* Secondary Glare Streak */}
        <div className="absolute top-[10%] left-[-10%] w-[120%] h-[10%] bg-white/5 blur-xl -rotate-12"></div>
        
        {/* Anti-reflective coating effect (Subtle Blue/Purple tint) */}
        <div className="absolute inset-0 bg-blue-500/2 mix-blend-overlay opacity-30"></div>
    </div>
);

// Helper for Mounting Screws with realistic depth
const MountingScrews = () => (
    <>
        <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-zinc-800 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),1px_1px_2px_rgba(0,0,0,0.8)] z-50 border border-black/40 flex items-center justify-center">
            <div className="w-[1px] h-2.5 bg-zinc-600 rotate-45 opacity-60"></div>
        </div>
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-zinc-800 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),1px_1px_2px_rgba(0,0,0,0.8)] z-50 border border-black/40 flex items-center justify-center">
            <div className="w-2.5 h-[1px] bg-zinc-600 rotate-12 opacity-60"></div>
        </div>
        <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-zinc-800 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),1px_1px_2px_rgba(0,0,0,0.8)] z-50 border border-black/40 flex items-center justify-center">
            <div className="w-[1px] h-2.5 bg-zinc-600 -rotate-12 opacity-60"></div>
        </div>
        <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-zinc-800 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),1px_1px_2px_rgba(0,0,0,0.8)] z-50 border border-black/40 flex items-center justify-center">
            <div className="w-2.5 h-[1px] bg-zinc-600 45deg opacity-60"></div>
        </div>
    </>
);

export const IFRSimulatorPage: React.FC<IFRSimulatorPageProps> = ({ onBackToLanding }) => {
  const { isDarkMode } = useTheme();
  const viewportRef = useRef<HTMLDivElement>(null);
  
  // System State
  const [viewMode, setViewMode] = useState<ViewMode>('MAP');
  const [instrumentMode, setInstrumentMode] = useState<InstrumentMode>('HSI');
  const [isSimulating, setIsSimulating] = useState(false);
  const [showTrack, setShowTrack] = useState(true);
  const [trackHistory, setTrackHistory] = useState<Point[]>([]);
  const [mapViewMode, setMapViewMode] = useState<MapViewMode>('LOCKED');
  const [focusedInstrument, setFocusedInstrument] = useState<InstrumentType | 'NAV' | null>(null);
  
  // Modular Instrument State
  const [activeAddons, setActiveAddons] = useState<InstrumentType[]>(['RADIO', 'HEADING', 'DME', 'TIMER']);
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [isInstrumentDeckMinimized, setIsInstrumentDeckMinimized] = useState(false);
  
  // Radio Selection State
  const [isRadioMenuOpen, setIsRadioMenuOpen] = useState(false);
  const [radioMenuTarget, setRadioMenuTarget] = useState<'active' | 'standby'>('standby');

  // Flight State
  const [pitch, setPitch] = useState(0);
  const [roll, setRoll] = useState(0);
  const [heading, setHeading] = useState(0); 
  const [headingBug, setHeadingBug] = useState(0);
  const [speed, setSpeed] = useState(130);    
  const [obs, setObs] = useState(0);         
  const [altitude, setAltitude] = useState(4500);
  
  const windDir = 270;
  const windSpd = 15;

  const [activeStation, setActiveStation] = useState<VorStation>(AVAILABLE_STATIONS[0]);
  const [standbyFreqIndex, setStandbyFreqIndex] = useState(1);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const AIRCRAFT_MAP_ICON_URL = "https://lh3.googleusercontent.com/d/1priQEJnTn4YBaJJ2AyH6o8gk-SCN1-dK";
  const AIRCRAFT_INSTRUMENT_ICON_URL = "https://lh3.googleusercontent.com/d/1XGp7XKF4Pzsq9KoO-QHsMUaPDdUo_B-6";
  
  const [airplanePos, setAirplanePos] = useState<Point>({ x: 1800, y: 1200 }); 

  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      setHeading(h => {
          const diff = (headingBug - h + 540) % 360 - 180;
          if (Math.abs(diff) < 0.2) return headingBug;
          const turnRate = 0.6; 
          return (h + (diff > 0 ? turnRate : -turnRate) + 360) % 360;
      });

      setAirplanePos(prev => {
        const airRad = (heading * Math.PI) / 180;
        const windRad = (windDir * Math.PI) / 180;
        const airVelX = Math.sin(airRad) * (speed / 300);
        const airVelY = -Math.cos(airRad) * (speed / 300);
        const windVelX = Math.sin(windRad) * (windSpd / 300);
        const windVelY = -Math.cos(windRad) * (windSpd / 300);
        const newX = (prev.x + airVelX + windVelX + WORLD_WIDTH) % WORLD_WIDTH;
        const newY = (prev.y + airVelY + windVelY + WORLD_HEIGHT) % WORLD_HEIGHT;
        const next = { x: newX, y: newY };
        if (showTrack) {
            setTrackHistory(h => {
                const last = h[h.length-1];
                if (last && Math.hypot(next.x - last.x, next.y - last.y) < 10) return h;
                return [...h, next].slice(-1000);
            });
        }
        return next;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isSimulating, heading, speed, showTrack, headingBug, windDir, windSpd]);

  const vorLogic = useMemo(() => {
    const dx = airplanePos.x - activeStation.x;
    const dy = activeStation.y - airplanePos.y; 
    let radial = (Math.atan2(dx, dy) * (180 / Math.PI) + 360) % 360;
    let diff = (radial - obs + 540) % 360 - 180;
    const isFrom = Math.abs(diff) <= 90;
    if (!isFrom) diff = (radial - (obs + 180) + 540) % 360 - 180;
    const distanceNM = Math.hypot(dx, dy) / 20; 
    return { 
        radial: Math.round(radial), 
        cdi: Math.max(-1, Math.min(1, diff / 10)), 
        isFrom,
        dme: distanceNM.toFixed(1)
    };
  }, [airplanePos, obs, activeStation]);

  // Timer logic
  useEffect(() => {
    let interval: number | undefined; 
    if (timerRunning) {
        interval = window.setInterval(() => {
            setElapsedTime(prev => prev + 1);
        }, 1000);
    } else if (!timerRunning && interval) {
        clearInterval(interval);
    }
    return () => {
        if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartTimer = () => setTimerRunning(true);
  const handleStopTimer = () => setTimerRunning(false);
  const handleResetTimer = () => {
      setTimerRunning(false);
      setElapsedTime(0);
  };


  const handleManualHeading = (d: number) => setHeadingBug(h => (h + d + 360) % 360);
  const handleManualOBS = (d: number) => setObs(o => (o + d + 360) % 360);
  const handleManualSpeed = (d: number) => setSpeed(s => Math.max(40, Math.min(250, s + d)));
  const handleCenterCDI = () => setObs((vorLogic.radial + 180) % 360);
  
  const handleSwapFreq = () => {
      const current = activeStation;
      setActiveStation(AVAILABLE_STATIONS[standbyFreqIndex]);
      setStandbyFreqIndex(AVAILABLE_STATIONS.findIndex(s => s.id === current.id));
  };
  const handleVorPress = (station: VorStation) => setActiveStation(station);
  
  const handleOpenRadioMenu = (target: 'active' | 'standby') => {
      setRadioMenuTarget(target);
      setIsRadioMenuOpen(true);
  };

  const handleSelectStationFromMenu = (station: VorStation) => {
      if (radioMenuTarget === 'active') {
          setActiveStation(station);
      } else {
          setStandbyFreqIndex(AVAILABLE_STATIONS.findIndex(s => s.id === station.id));
      }
      setIsRadioMenuOpen(false);
  };

  const toggleAddon = (type: InstrumentType) => {
      setActiveAddons(prev => prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]);
  };

  const toggleFocus = (type: InstrumentType | 'NAV') => {
    setFocusedInstrument(focusedInstrument === type ? null : type);
  };

  // Dynamic Sizing Logic - Aggressively scale to fit components within smaller bar
  const deckScale = activeAddons.length >= 4 ? 0.60 : activeAddons.length >= 3 ? 0.70 : 0.80;

  // Helper for instrument state classes
  const getFocusClasses = (type: InstrumentType | 'NAV') => {
    if (!focusedInstrument) return "transition-all duration-300";
    if (focusedInstrument === type) return "scale-110 z-50 transition-all duration-300";
    return "blur-sm opacity-40 scale-95 transition-all duration-300";
  };

  // --- INSTRUMENT RENDERERS ---
  const renderVOR = () => (
    <div 
        className={`relative w-44 h-44 shrink-0 group select-none cursor-pointer flex-shrink-0 ${getFocusClasses('NAV')}`}
        onClick={(e) => { e.stopPropagation(); toggleFocus('NAV'); }}
    >
        <div className={`absolute inset-0 rounded-full border-[10px] border-[#222] shadow-[inset_0_4px_8px_rgba(0,0,0,0.5),0_15px_30px_rgba(0,0,0,1)] z-50 pointer-events-none flex flex-col items-center justify-between p-1`}>
             <div className="w-1 h-3 bg-yellow-500 rounded-sm mt-0.5 shadow-[0_0_5px_yellow]"></div>
        </div>
        <div className="w-full h-full rounded-full bg-black overflow-hidden flex items-center justify-center border border-zinc-800 shadow-inner relative">
            <InstrumentGlass />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, #111 0%, #000 100%)' }}></div>
            <div className="absolute inset-0 transition-transform duration-300" style={{ transform: `rotate(${-obs}deg)` }}>
                {[...Array(72)].map((_, i) => (
                    <div key={i} className="absolute inset-0 flex flex-col items-center" style={{ transform: `rotate(${i * 5}deg)` }}>
                        <div className={`w-[1px] bg-zinc-400 ${i % 2 === 0 ? 'h-2.5' : 'h-1.5'} mt-2.5`}></div>
                        {i % 6 === 0 && <span className="text-[10px] font-black text-white mt-2">{i === 0 ? 'N' : i === 18 ? 'E' : i === 36 ? 'S' : i === 54 ? 'W' : (i * 5 / 10).toString().padStart(2,'0')}</span>}
                    </div>
                ))}
            </div>
            <div className="absolute w-[2px] h-[65%] bg-yellow-400 shadow-[0_0_10px_rgba(234,179,8,1)] transition-transform duration-200 z-10 rounded-full" 
                 style={{ transform: `translateX(${vorLogic.cdi * 35}px)` }}></div>
            <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-10 h-5 bg-black border border-zinc-800 flex items-center justify-center rounded shadow-inner">
                <span className="text-[7px] font-black text-yellow-500 uppercase tracking-widest">{vorLogic.isFrom ? 'FROM' : 'TO'}</span>
            </div>
        </div>
    </div>
  );

  const renderHSI = () => (
    <div 
        className={`relative w-56 h-56 shrink-0 group select-none cursor-pointer flex-shrink-0 ${getFocusClasses('NAV')}`}
        onClick={(e) => { e.stopPropagation(); toggleFocus('NAV'); }}
    >
        {/* Apple-inspired Bezel Housing with depth */}
        <div className="absolute inset-0 rounded-full border-[14px] border-[#1c1c1e] shadow-[0_25px_60px_rgba(0,0,0,1),inset_0_3px_6px_rgba(255,255,255,0.2)] z-50 pointer-events-none overflow-hidden">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')] opacity-10 mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/40 opacity-40"></div>
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-4.5 bg-white z-[60] rounded-b-[2px] shadow-[0_1px_3px_rgba(0,0,0,0.5)]"></div>
        </div>

        {/* GLASS COCKPIT INTERNAL DISPLAY */}
        <div className="w-full h-full rounded-full bg-[#030303] overflow-hidden flex items-center justify-center relative shadow-[inset_0_0_100px_rgba(0,0,0,1)] border-[2px] border-zinc-900">
            <InstrumentGlass />
            <div className="absolute inset-0 transition-transform duration-100 ease-linear" style={{ transform: `rotate(${-heading}deg)` }}>
                {[...Array(72)].map((_, i) => (
                    <div key={i} className="absolute inset-0 flex flex-col items-center" style={{ transform: `rotate(${i * 5}deg)` }}>
                        <div className={`w-[2px] ${i % 2 === 0 ? 'bg-zinc-200 h-5' : 'bg-zinc-600 h-2.5'} mt-3.5 shadow-sm`}></div>
                        {i % 6 === 0 && (
                            <span className="text-[13px] font-black text-white mt-2 select-none tracking-tighter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                {i === 0 ? 'N' : i === 18 ? 'E' : i === 36 ? 'S' : i === 54 ? 'W' : (i * 5 / 10).toString().padStart(2, '0')}
                            </span>
                        )}
                    </div>
                ))}
                <div className="absolute inset-0" style={{ transform: `rotate(${headingBug}deg)` }}>
                    <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-4.5 h-5 bg-orange-600 shadow-[0_0_20px_rgba(249,115,22,1)] clip-path-bug z-20"></div>
                    <style>{`.clip-path-bug { clip-path: polygon(0% 0%, 100% 0%, 50% 100%); }`}</style>
                </div>
                <div className="absolute inset-0" style={{ transform: `rotate(${obs}deg)` }}>
                    <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[14px] border-r-[14px] border-b-[28px] border-b-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,1)] z-20"></div>
                    <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[5px] h-18 bg-yellow-500 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),0_2px_5px_rgba(0,0,0,0.5)] rounded-sm z-20"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] flex items-center justify-between pointer-events-none z-10 px-2 opacity-80">
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700 shadow-inner"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700 shadow-inner"></div>
                        <div className="w-1.5 h-6 bg-white/40 rounded-full shadow-sm"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700 shadow-inner"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-700 shadow-inner"></div>
                    </div>
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[7px] h-[45%] bg-yellow-400 shadow-[0_0_30px_rgba(250,204,21,1),0_5px_10px_rgba(0,0,0,0.5)] transition-transform duration-200 z-[30] rounded-full border-x border-yellow-300" 
                        style={{ transform: `translate(calc(-50% + ${vorLogic.cdi * 85}px), -50%)` }}
                    >
                        <div className="w-px h-full bg-white/40 mx-auto rounded-full"></div>
                    </div>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 transition-all duration-700 flex items-center justify-center z-20
                                    ${vorLogic.isFrom ? 'translate-y-16 opacity-100' : '-translate-y-20 opacity-100'}`}>
                         <div className={`w-0 h-0 border-l-[10px] border-r-[10px] border-white/90 border-l-transparent border-r-transparent shadow-lg
                                         ${vorLogic.isFrom ? 'border-t-[16px]' : 'border-b-[16px]'}`}></div>
                    </div>
                </div>
            </div>
            <div className="relative z-[45] pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,1)] scale-110">
                <img 
                    src={AIRCRAFT_INSTRUMENT_ICON_URL} 
                    className="w-24 h-24 object-contain opacity-100" 
                />
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)] pointer-events-none z-10"></div>
        </div>
    </div>
  );

  const renderRadio = () => (
    <div 
        className={`w-44 h-36 p-4 bg-zinc-900 border-2 border-zinc-800 rounded-2xl flex flex-col justify-between font-mono shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.1)] relative cursor-pointer flex-shrink-0 ${getFocusClasses('RADIO')}`}
        onClick={(e) => { e.stopPropagation(); toggleFocus('RADIO'); }}
    >
        <MountingScrews />
        <div className="flex justify-between items-center text-[8px] text-green-500 border-b border-zinc-800/50 pb-2">
            <span className="font-black tracking-widest uppercase">NAV-1 RADIO</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
        </div>
        <div className="flex space-x-2 mt-2">
            <div 
                onClick={(e) => { e.stopPropagation(); handleOpenRadioMenu('active'); }}
                className="flex-1 bg-black rounded-lg p-2 text-center shadow-inner border border-zinc-800 hover:border-green-500/50 transition-colors group/active"
            >
                <p className="text-[7px] text-zinc-500 uppercase mb-1 group-hover/active:text-green-500/70 transition-colors">Active</p>
                <p className="text-xl text-green-400 font-black leading-none tracking-tighter drop-shadow-[0_0_5px_rgba(34,197,94,0.3)]">{activeStation.freq}</p>
            </div>
            <div 
                onClick={(e) => { e.stopPropagation(); handleOpenRadioMenu('standby'); }}
                className="flex-1 bg-black rounded-lg p-2 text-center shadow-inner border border-zinc-800 hover:border-zinc-500 transition-colors group/stby"
            >
                <p className="text-[7px] text-zinc-500 uppercase mb-1 group-hover/stby:text-zinc-300 transition-colors">Stby</p>
                <p className="text-xl text-zinc-500 font-black leading-none tracking-tighter">{AVAILABLE_STATIONS[standbyFreqIndex].freq}</p>
            </div>
        </div>
        <button onClick={(e) => { e.stopPropagation(); handleSwapFreq(); }} className="mt-2 bg-zinc-800 hover:bg-zinc-700 py-2 rounded-lg text-[8px] uppercase font-black transition-all border border-zinc-700 shadow-md text-zinc-100 flex items-center justify-center gap-2 active:scale-95">
            <i className="fas fa-sync-alt"></i> SWAP FREQ
        </button>

        {/* Radio Tuning Menu */}
        {isRadioMenuOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={(e) => { e.stopPropagation(); setIsRadioMenuOpen(false); }}>
                <div className="w-64 bg-zinc-900/90 border-2 border-zinc-700 rounded-[2rem] p-6 shadow-[0_30px_80px_rgba(0,0,0,1)] flex flex-col backdrop-blur-2xl animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center mb-5 border-b border-zinc-800/50 pb-4">
                        <div className="flex flex-col">
                            <p className="text-[11px] font-black text-white uppercase tracking-widest">TUNER_SELECT</p>
                            <p className="text-[7px] text-blue-500 font-bold uppercase tracking-widest">Target: {radioMenuTarget === 'active' ? 'Active Frequency' : 'Standby Frequency'}</p>
                        </div>
                        <i className="fas fa-satellite text-blue-500 text-xs animate-pulse"></i>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                        {AVAILABLE_STATIONS.map((station) => (
                            <button
                                key={station.id}
                                onClick={() => handleSelectStationFromMenu(station)}
                                className={`w-full text-left p-3 rounded-xl transition-all border flex items-center justify-between group/item
                                        ${(radioMenuTarget === 'active' ? activeStation.id : AVAILABLE_STATIONS[standbyFreqIndex].id) === station.id 
                                            ? 'bg-blue-600 border-blue-400 text-white shadow-lg' 
                                            : 'bg-black/40 border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-700'}`}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs
                                                ${(radioMenuTarget === 'active' ? activeStation.id : AVAILABLE_STATIONS[standbyFreqIndex].id) === station.id 
                                                    ? 'bg-white/20' : 'bg-zinc-900 group-hover/item:bg-zinc-700'}`}>
                                        {station.id}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black truncate max-w-[100px]">{station.name}</span>
                                        <span className="text-[8px] font-mono opacity-60">VOR_NAVAID</span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-black font-mono tracking-tighter">{station.freq}</span>
                            </button>
                        ))}
                    </div>
                    <button 
                        onClick={() => setIsRadioMenuOpen(false)}
                        className="mt-6 w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-[9px] font-black uppercase tracking-widest rounded-xl transition-colors border border-zinc-700"
                    >
                        Cancel Tuning
                    </button>
                </div>
            </div>
        )}
    </div>
  );

  const renderDME = () => (
    <div 
        className={`w-28 h-36 p-4 bg-zinc-900 border-2 border-zinc-800 rounded-2xl flex flex-col items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.1)] font-mono cursor-pointer flex-shrink-0 ${getFocusClasses('DME')}`}
        onClick={(e) => { e.stopPropagation(); toggleFocus('DME'); }}
    >
        <MountingScrews />
        <span className="text-[8px] text-zinc-500 uppercase font-black tracking-widest border-b border-zinc-800/50 w-full text-center pb-1">DME-1</span>
        <div className="text-center">
            <p className="text-3xl font-black text-amber-500 leading-none drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]">{vorLogic.dme}</p>
            <p className="text-[9px] text-zinc-600 mt-1 font-black uppercase">NM DIST</p>
        </div>
        <div className="w-full bg-black h-1.5 rounded-full overflow-hidden shadow-inner p-[1px] border border-zinc-800">
            <div className="bg-amber-500 h-full transition-all duration-1000 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: `${Math.min(100, (parseFloat(vorLogic.dme)/100)*100)}%` }}></div>
        </div>
    </div>
  );

  const renderHeading = () => (
    <div 
        className={`w-36 h-36 border-[10px] rounded-full bg-zinc-950 border-[#1c1c1e] relative flex items-center justify-center overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.05)] cursor-pointer flex-shrink-0 ${getFocusClasses('HEADING')}`}
        onClick={(e) => { e.stopPropagation(); toggleFocus('HEADING'); }}
    >
        <div className="absolute inset-0 transition-transform duration-100 ease-linear" style={{ transform: `rotate(${-heading}deg)` }}>
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(d => (
                <div key={d} className="absolute inset-0 flex flex-col items-center" style={{ transform: `rotate(${d}deg)` }}>
                    <div className="h-4.5 w-[2px] bg-zinc-200 mt-1 shadow-sm"></div>
                    <span className="text-[11px] font-black text-white mt-1.5 drop-shadow-md">{d===0?'N':d===90?'E':d===180?'S':d===270?'W':(d/10).toString().padStart(2,'0')}</span>
                </div>
            ))}
        </div>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-5 bg-orange-600 z-10 rounded-b-sm shadow-[0_1px_5px_rgba(0,0,0,0.5)]"></div>
        <img 
            src={AIRCRAFT_INSTRUMENT_ICON_URL} 
            className="w-12 h-12 object-contain z-20 opacity-100" 
        />
        <InstrumentGlass />
    </div>
  );

  const renderTimer = () => (
    <div 
        className={`w-32 h-36 p-4 bg-zinc-900 border-2 border-zinc-800 rounded-2xl flex flex-col items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.1)] font-mono cursor-pointer flex-shrink-0 ${getFocusClasses('TIMER')}`}
        onClick={(e) => { e.stopPropagation(); toggleFocus('TIMER'); }}
    >
        <MountingScrews />
        <div className="flex justify-between items-center text-[8px] text-blue-500 border-b border-zinc-800/50 w-full text-center pb-1">
            <span className="font-black tracking-widest uppercase">ELAPSED TIME</span>
            {timerRunning && <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>}
        </div>
        <div className="text-center">
            <p className="text-3xl font-black text-blue-400 leading-none tabular-nums drop-shadow-[0_0_5px_rgba(59,130,246,0.3)]">{formatTime(elapsedTime)}</p>
        </div>
        <div className="w-full flex justify-between gap-1.5">
            <button 
                onClick={(e) => { e.stopPropagation(); timerRunning ? handleStopTimer() : handleStartTimer(); }} 
                className={`flex-1 py-1.5 rounded-lg text-[7px] uppercase font-black transition-all border shadow-md active:scale-95
                           ${timerRunning ? 'bg-red-900 border-red-800 text-white' : 'bg-green-900 border-green-800 text-white'}`}
            >
                {timerRunning ? 'STOP' : 'START'}
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); handleResetTimer(); }} 
                className="flex-1 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-[7px] uppercase font-black transition-all border border-zinc-700 shadow-md text-zinc-300 active:scale-95"
            >
                RESET
            </button>
        </div>
    </div>
  );

  return (
    <div className={`h-screen w-full flex flex-col overflow-hidden ${isDarkMode ? 'bg-zinc-950 text-white' : 'bg-zinc-50 text-black'}`}>
      
      {/* 1. NAVIGATION BAR - CENTERED COMPONENTS */}
      <div className="h-12 shrink-0 bg-black flex items-center justify-center px-4 border-b border-zinc-800 z-[100] shadow-xl relative">
        {/* Absolute Left for Back Button */}
        <button onClick={onBackToLanding} className="absolute left-4 text-zinc-500 hover:text-white transition-colors">
            <i className="fas fa-arrow-left text-sm"></i>
        </button>

        {/* Centered Group */}
        <div className="flex items-center space-x-12">
            <div className="flex flex-col items-center">
                <h1 className="brand-font text-base md:text-lg font-bold uppercase tracking-widest text-white leading-none">
                    IFR SIMULATOR <span className="text-blue-500 text-[9px] opacity-60">STATIONARY_CORE</span>
                </h1>
            </div>

            <button 
                onClick={() => setIsSimulating(!isSimulating)}
                className={`px-8 py-1.5 rounded-full font-black uppercase tracking-[0.15em] text-[10px] transition-all border shadow-2xl active:scale-95
                            ${isSimulating ? 'bg-red-700 border-red-500 shadow-red-900/50' : 'bg-green-700 border-green-500 shadow-green-900/50 animate-pulse'}`}
            >
                {isSimulating ? 'HALT SYSTEM' : 'INITIALIZE SIM'}
            </button>

            <div className="flex bg-zinc-900 p-1 rounded-xl border border-zinc-800 shadow-inner">
                <button onClick={() => setViewMode('G1000')} className={`px-5 py-0.5 text-[8px] font-black uppercase rounded-lg transition-all ${viewMode==='G1000'?'bg-blue-600 text-white shadow-lg' : 'text-zinc-600'}`}>PFD</button>
                <button onClick={() => setViewMode('MAP')} className={`px-5 py-0.5 text-[8px] font-black uppercase rounded-lg transition-all ${viewMode==='MAP'?'bg-blue-600 text-white shadow-lg' : 'text-zinc-600'}`}>MFD</button>
            </div>
        </div>
      </div>

      {/* 2. MAIN VIEWPORT */}
      <div ref={viewportRef} className="flex-1 relative bg-black overflow-hidden flex items-center justify-center">
        {viewMode === 'G1000' ? (
          <div className="w-full h-full relative overflow-hidden bg-zinc-900">
            <div className="absolute inset-0 transition-transform duration-100" style={{ transform: `rotate(${-roll}deg) translateY(${pitch * 25}px)` }}>
              <div className="h-screen bg-gradient-to-b from-[#1e40af] to-[#3b82f6] border-b-[6px] border-zinc-100/30"></div>
              <div className="h-screen bg-gradient-to-b from-[#3e2723] to-[#2a1b19]"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[2px] bg-yellow-400 z-10 flex justify-center items-center shadow-[0_0_15px_yellow]">
                <div className="w-4 h-8 bg-yellow-400 border border-black/30 rounded-sm shadow-xl"></div>
            </div>
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-white/10 z-[5]"></div>
          </div>
        ) : (
          <div className="w-full h-full relative flex items-center justify-center overflow-hidden bg-[#050505]">
            <div 
              className="absolute left-1/2 top-1/2 w-[3600px] h-[2400px] transition-transform duration-200 ease-linear"
              style={{ 
                  transform: mapViewMode === 'LOCKED' 
                    ? `translate(calc(-50% + ${1800 - airplanePos.x}px), calc(-50% + ${1200 - airplanePos.y}px))` 
                    : `translate(-50%, -50%) scale(0.18)` 
              }}
            >
              <div className="absolute inset-0 bg-[#080808] grid grid-cols-36 grid-rows-24 border-8 border-zinc-800">
                {Array.from({length: 864}).map((_,i)=><div key={i} className="border-[0.2px] border-zinc-800/40"></div>)}
              </div>
              
              {/* Map Overlay Layer - Islands and Design Elements */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-50">
                  {ISLANDS_DATA.map((island, i) => (
                      <path 
                          key={i} 
                          d={island.d} 
                          fill="#18181b" 
                          stroke="#27272a" 
                          strokeWidth="8"
                          className="drop-shadow-2xl"
                      />
                  ))}
                  {AVAILABLE_STATIONS.map((s, i) => (
                      <g key={i}>
                          {/* Range Rings - Airspace indicators */}
                          <circle cx={s.x} cy={s.y} r="400" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="2" strokeDasharray="20,10" />
                          <circle cx={s.x} cy={s.y} r="200" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      </g>
                  ))}
              </svg>

              {showTrack && trackHistory.length > 1 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <polyline fill="none" stroke="#00f2ff" strokeWidth="5" strokeOpacity="0.6" strokeDasharray="15,15" points={trackHistory.map(p=>`${p.x},${p.y}`).join(' ')} className="drop-shadow-[0_0_10px_#00f2ff]"/>
                </svg>
              )}
              {AVAILABLE_STATIONS.map(s => (
                <div key={s.id} className="absolute" style={{left: s.x, top: s.y}}>
                  <div className={`w-16 h-16 -translate-x-1/2 -translate-y-1/2 border-4 rotate-45 flex items-center justify-center transition-all cursor-pointer rounded-lg z-20 relative
                                  ${activeStation.id===s.id?'bg-blue-600 border-white shadow-[0_0_60px_rgba(59,130,246,1)] scale-110':'bg-zinc-800 border-zinc-600 opacity-60 hover:opacity-100 hover:scale-105'}`}
                       onClick={() => handleVorPress(s)}>
                      <div className="w-4 h-4 bg-white rounded-full -rotate-45 shadow-inner"></div>
                  </div>
                  <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
                    <span className="text-[18px] font-black font-mono text-zinc-100 bg-black/90 px-3 py-1 rounded-lg border border-zinc-700 shadow-2xl tracking-tighter">{s.id}</span>
                    <span className="text-[10px] font-bold text-zinc-500 mt-1 uppercase tracking-widest">{s.freq}</span>
                  </div>
                </div>
              ))}
              <div className="absolute z-40 transition-transform duration-200 ease-linear" style={{ left: airplanePos.x, top: airplanePos.y, transform: `translate(-50%, -50%) rotate(${heading + 180}deg)` }}>
                <img src={AIRCRAFT_MAP_ICON_URL} className="w-28 h-28 object-contain filter drop-shadow-[0_0_40px_rgba(255,165,0,1)]" />
              </div>
            </div>
            
            <div className="absolute top-6 right-6 z-[60] flex flex-col gap-3 scale-95 origin-top-right">
                <div className="flex flex-col space-y-2 p-4 bg-zinc-900/80 backdrop-blur-xl border border-zinc-700 rounded-2xl shadow-3xl">
                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Navigation View</p>
                    <div className="flex bg-black rounded-xl p-1 border border-zinc-800 shadow-inner">
                        <button onClick={() => setMapViewMode('LOCKED')} className={`flex-1 px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all flex items-center justify-center gap-2 ${mapViewMode === 'LOCKED' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}><i className="fas fa-lock text-[8px]"></i> Locked</button>
                        <button onClick={() => setMapViewMode('FULL')} className={`flex-1 px-4 py-2 rounded-lg text-[9px] font-black uppercase transition-all flex items-center justify-center gap-2 ${mapViewMode === 'FULL' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}><i className="fas fa-expand text-[8px]"></i> Global</button>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. MODULAR INSTRUMENT DECK - COMPACT PANEL */}
      <div 
        className={`shrink-0 bg-gradient-to-b from-[#1c1c1e] to-[#0a0a0b] border-t-[3px] border-[#2c2c2e] flex flex-col items-center justify-center relative shadow-[0_-20px_60px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.05)] transition-all duration-500 ease-in-out ${isInstrumentDeckMinimized ? 'h-0 border-t-[3px]' : 'h-52'}`}
        onClick={() => { setFocusedInstrument(null); setIsRadioMenuOpen(false); }}
      >
        {/* Toggle Button */}
        <button 
            onClick={(e) => { e.stopPropagation(); setIsInstrumentDeckMinimized(!isInstrumentDeckMinimized); }}
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#2c2c2e] hover:bg-[#3f3f42] rounded-t-lg border-t border-x border-[#4a4a4c] flex items-center justify-center shadow-lg transition-colors z-[60] group cursor-pointer"
            title={isInstrumentDeckMinimized ? "Expand Instruments" : "Minimize Instruments"}
        >
            <div className={`transition-transform duration-500 ${isInstrumentDeckMinimized ? 'rotate-180' : ''}`}>
                <i className="fas fa-chevron-down text-zinc-400 text-[10px] group-hover:text-white"></i>
            </div>
        </button>

        <div className={`w-full h-full flex flex-col items-center justify-center transition-all duration-300 ${isInstrumentDeckMinimized ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
            {/* Recessed Panel Glow */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/40 to-transparent pointer-events-none"></div>

            {/* Instrument container with scale - centered vertically and horizontally */}
            <div 
              className="flex items-center space-x-6 w-auto justify-center px-4 py-2" 
              style={{ transform: `scale(${deckScale})`, transformOrigin: 'center center' }}
            >
                {/* Primary Nav Unit */}
                <div className={`flex flex-col items-center flex-shrink-0 ${getFocusClasses('NAV')} bg-zinc-900/40 p-2 rounded-[2.5rem] border border-white/5 shadow-2xl relative`}>
                    {/* CENTER CDI Button moved to ABOVE the HSI / Primary Nav Unit */}
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleCenterCDI(); }} 
                        className="mb-3 w-full h-8 rounded-xl border border-green-700/50 bg-green-950/30 text-[9px] font-black uppercase text-green-500 hover:bg-green-600 hover:text-white transition-all shadow-lg active:scale-95"
                    >
                        CENTER CDI
                    </button>
                    <div onClick={(e) => { e.stopPropagation(); toggleFocus('NAV'); }} className="cursor-pointer">
                        {instrumentMode === 'VOR' ? renderVOR() : renderHSI()}
                    </div>
                    <div className="mt-4 flex bg-black/60 p-1 rounded-xl border border-zinc-800 shadow-inner" onClick={(e) => e.stopPropagation()}>
                        <button onClick={()=>setInstrumentMode('VOR')} className={`px-4 py-1 text-[8px] font-black uppercase rounded-lg transition-all ${instrumentMode==='VOR'?'bg-zinc-800 text-yellow-500 shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>VOR</button>
                        <button onClick={()=>setInstrumentMode('HSI')} className={`px-4 py-1 text-[8px] font-black uppercase rounded-lg transition-all ${instrumentMode==='HSI'?'bg-zinc-800 text-blue-500 shadow-lg' : 'text-zinc-600 hover:text-zinc-400'}`}>HSI</button>
                    </div>
                </div>

                {activeAddons.includes('RADIO') && renderRadio()}
                {activeAddons.includes('DME') && renderDME()}
                {activeAddons.includes('HEADING') && renderHeading()}
                {activeAddons.includes('TIMER') && renderTimer()}

                {/* AVIONICS Add Button - Integrated into row for visibility */}
                <div className="flex-shrink-0 ml-4">
                    <div className="relative">
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowAddMenu(!showAddMenu); }}
                            className={`w-14 h-14 rounded-full border-2 flex flex-col items-center justify-center transition-all shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.1)] active:scale-95 group
                                    ${showAddMenu ? 'bg-zinc-800 border-zinc-700 text-white' : 'bg-blue-600 border-blue-400 text-white hover:bg-blue-500 hover:scale-105'}`}
                        >
                            <i className={`fas ${showAddMenu ? 'fa-times' : 'fa-plus'} text-xl transition-transform duration-500 ${showAddMenu ? 'rotate-180' : 'group-hover:rotate-90'}`}></i>
                            <span className="text-[6px] font-black uppercase mt-0.5 tracking-widest">AVIONICS</span>
                        </button>

                        {showAddMenu && (
                            <div className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-64 bg-[#1c1c1e] border-2 border-zinc-700 rounded-[2rem] p-5 shadow-[0_30px_80px_rgba(0,0,0,1)] z-[200] animate-in zoom-in-95 slide-in-from-bottom-6 duration-300 backdrop-blur-2xl" onClick={(e) => e.stopPropagation()}>
                                <div className="flex justify-between items-center mb-4 border-b border-zinc-800/50 pb-3">
                                    <p className="text-[11px] font-black text-white uppercase tracking-widest">Expansion Stack</p>
                                    <i className="fas fa-layer-group text-blue-500 text-xs"></i>
                                </div>
                                <div className="space-y-2">
                                    {['RADIO', 'HEADING', 'DME', 'TIMER'].map(id => (
                                        <button 
                                            key={id}
                                            onClick={() => toggleAddon(id as InstrumentType)}
                                            className={`w-full text-left px-5 py-3 rounded-2xl text-[10px] font-black uppercase transition-all flex justify-between items-center border shadow-sm
                                                    ${activeAddons.includes(id as InstrumentType) 
                                                        ? 'bg-blue-600 border-blue-400 text-white shadow-blue-900/40 translate-x-1' 
                                                        : 'bg-zinc-800/50 border-zinc-700/50 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-200'}`}
                                        >
                                            <span>{id} MODULE</span>
                                            {activeAddons.includes(id as InstrumentType) ? <i className="fas fa-check-circle text-xs"></i> : <i className="far fa-circle text-xs opacity-30"></i>}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-6 pt-3 border-t border-zinc-800/50 text-center">
                                    <p className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest opacity-60 italic">Hardware Encryption Active • v2.5</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* 4. ANALOG CONTROL DECK - CENTERED */}
      <div className="h-16 shrink-0 bg-black border-t border-zinc-900 flex items-center justify-center space-x-10 px-4 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
          {/* SPEED CONTROL */}
          <div className="flex items-center space-x-2 group scale-90">
              <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest opacity-50 group-hover:opacity-100">AIRSPEED</span>
              <div className="flex bg-zinc-900/50 border border-zinc-800 rounded-2xl p-0.5 shadow-inner">
                  <button onClick={()=>handleManualSpeed(-10)} className="w-8 h-8 text-zinc-400 hover:text-white font-black text-lg active:scale-90">-</button>
                  <div className="w-16 flex items-center justify-center font-mono text-xl font-black text-white bg-black/80 rounded-xl mx-1 tabular-nums">
                    {Math.round(speed).toString().padStart(3,'0')}
                  </div>
                  <button onClick={()=>handleManualSpeed(10)} className="w-8 h-8 text-zinc-400 hover:text-white font-black text-lg active:scale-90">+</button>
              </div>
          </div>

          <div className="flex items-center space-x-2 group scale-90">
              <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest opacity-50 group-hover:opacity-100">HDG BUG</span>
              <div className="flex bg-zinc-900/50 border border-zinc-800 rounded-2xl p-0.5 shadow-inner">
                  <button 
                    onClick={()=>handleManualHeading(-1)} 
                    onDoubleClick={()=>handleManualHeading(-10)}
                    className="w-8 h-8 text-zinc-400 hover:text-white font-black text-lg active:scale-90"
                  >-</button>
                  <div className="w-16 flex items-center justify-center font-mono text-xl font-black text-white bg-black/80 rounded-xl mx-1 tabular-nums">
                    {Math.round(headingBug).toString().padStart(3,'0')}°
                  </div>
                  <button 
                    onClick={()=>handleManualHeading(1)} 
                    onDoubleClick={()=>handleManualHeading(10)}
                    className="w-8 h-8 text-zinc-400 hover:text-white font-black text-lg active:scale-90"
                  >+</button>
              </div>
          </div>
          
          <div className="flex items-center space-x-2 group scale-90">
              <span className="text-[8px] font-black text-yellow-500 uppercase tracking-widest opacity-50 group-hover:opacity-100">OBS CRS</span>
              <div className="flex bg-zinc-900/50 border border-zinc-800 rounded-2xl p-0.5 shadow-inner">
                  <button 
                    onClick={()=>handleManualOBS(-1)} 
                    onDoubleClick={()=>handleManualOBS(-10)}
                    className="w-8 h-8 text-zinc-400 hover:text-white font-black text-lg active:scale-90"
                  >-</button>
                  <div className="w-16 flex items-center justify-center font-mono text-xl font-black text-white bg-black/80 rounded-xl mx-1 tabular-nums">
                    {Math.round(obs).toString().padStart(3,'0')}°
                  </div>
                  <button 
                    onClick={()=>handleManualOBS(1)} 
                    onDoubleClick={()=>handleManualOBS(10)}
                    className="w-8 h-8 text-zinc-400 hover:text-white font-black text-lg active:scale-90"
                  >+</button>
              </div>
          </div>
      </div>
    </div>
  );
};