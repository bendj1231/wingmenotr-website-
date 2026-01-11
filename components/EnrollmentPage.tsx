import React, { useRef, useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useTheme } from '../context/ThemeContext';
import { EpauletBars } from './EpauletBars';

interface EnrollmentPageProps {
  onBackToProgramDetail: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
}

interface PilotEntry {
  id: string;
  callsign: string;
  rank: string;
  school: string;
  country: string;
  status: 'VERIFIED' | 'PENDING' | 'IN_VETTING';
  date: string;
}

const MOCK_ROSTER: PilotEntry[] = [
    { id: 'WM-742', callsign: 'GHOST', rank: 'CPL / IR', school: 'Alpha Aviation', country: 'PH', status: 'VERIFIED', date: '12 NOV 2024' },
    { id: 'WM-109', callsign: 'MAVERICK', rank: 'PPL', school: 'Omni Aviation', country: 'PH', status: 'VERIFIED', date: '10 NOV 2024' },
    { id: 'WM-882', callsign: 'VIPER', rank: 'CPL / ME', school: 'Airworks', country: 'PH', status: 'IN_VETTING', date: '14 NOV 2024' },
    { id: 'WM-331', callsign: 'PHOENIX', rank: 'SPL', school: 'WCC', country: 'PH', status: 'PENDING', date: '15 NOV 2024' },
    { id: 'WM-552', callsign: 'ICEMAN', rank: 'CPL / IR', school: 'AAA', country: 'PH', status: 'VERIFIED', date: '08 NOV 2024' },
];

export const EnrollmentPage: React.FC<EnrollmentPageProps> = ({ onBackToProgramDetail, isLoggedIn, onLogin }) => {
  const { isDarkMode } = useTheme();
  const { config } = useConfig();
  const { images } = config;
  
  const [activeTab, setActiveTab] = useState<'FORM' | 'ROSTER'>('FORM');
  const [isUplinking, setIsUplinking] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  
  // UPDATED: Form responder link from user request
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfvMOvZfFfOUtWr2Oa2tioMPYqftJszKHhR6D__TC0tn0my4A/viewform?embedded=true";

  useEffect(() => {
    setIsUplinking(true);
    const timer = setTimeout(() => setIsUplinking(false), 1200);
    return () => clearTimeout(timer);
  }, [activeTab, refreshKey]);

  const handleRefreshForm = () => {
    setRefreshKey(prev => prev + 1);
  };

  const panelBg = isDarkMode ? 'bg-zinc-950/90 border-zinc-800' : 'bg-white/90 border-zinc-200';

  return (
    <div className={`relative min-h-screen pt-32 pb-16 px-4 md:px-8 transition-colors duration-500 bg-cover bg-center overflow-x-hidden`}
         style={{ backgroundImage: `url(${images.PROGRAM_BG})` }}>
      
      {/* Background Overlay */}
      <div className={`absolute inset-0 z-0 ${isDarkMode ? 'bg-black/80' : 'bg-zinc-100/90'}`}></div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col h-[calc(100vh-160px)] min-h-[700px]">
        
        {/* Navigation Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 shrink-0">
            <button 
                onClick={onBackToProgramDetail}
                className={`flex items-center space-x-3 px-6 py-2 rounded-md uppercase tracking-widest text-xs font-bold transition-all shadow-md border
                            ${isDarkMode ? 'bg-zinc-900 text-white border-zinc-700 hover:bg-zinc-800' : 'bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-50'}`}>
                <i className="fas fa-arrow-left"></i>
                <span>Return to Briefing</span>
            </button>

            {/* Tab Controls */}
            <div className={`flex p-1 rounded-lg border ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-zinc-200 border-zinc-300'}`}>
                <button 
                    onClick={() => setActiveTab('FORM')}
                    className={`px-6 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all
                                ${activeTab === 'FORM' 
                                    ? 'bg-red-700 text-white shadow-lg' 
                                    : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                    <i className="fas fa-file-contract mr-2"></i> Application Form
                </button>
                <button 
                    onClick={() => setActiveTab('ROSTER')}
                    className={`px-6 py-2 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all
                                ${activeTab === 'ROSTER' 
                                    ? 'bg-blue-700 text-white shadow-lg' 
                                    : 'text-zinc-500 hover:text-zinc-700'}`}
                >
                    <i className="fas fa-list-ol mr-2"></i> Flight Roster
                </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-3">
                <div className="text-right">
                    <p className={`text-[10px] font-mono font-bold ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>UPLINK STATUS</p>
                    <p className={`text-[10px] font-mono font-bold text-green-500 animate-pulse`}>SECURE_ENCRYPTED</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-green-500/30 ${isDarkMode ? 'bg-green-900/10' : 'bg-green-50'}`}>
                    <i className="fas fa-satellite-dish text-green-500"></i>
                </div>
            </div>
        </div>

        {/* Main Terminal Container */}
        <div className={`flex-1 rounded-2xl border-2 shadow-2xl overflow-hidden flex flex-col relative ${panelBg}`}>
            
            {/* Terminal Header */}
            <div className={`p-4 border-b flex items-center justify-between shrink-0 ${isDarkMode ? 'bg-zinc-900/50' : 'bg-zinc-50'}`}>
                <div className="flex items-center space-x-3">
                    <img src={images.LOGO} alt="WM" className="w-8 h-8 object-contain" />
                    <div>
                        <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${isDarkMode ? 'text-white' : 'text-black'}`}>
                            {activeTab === 'FORM' ? 'MENTORSHIP ENROLLMENT TERMINAL' : 'CENTRAL PILOT ROSTER'}
                        </h2>
                        <p className="text-[9px] font-mono text-zinc-500 uppercase">System ID: WM-ALPHA-9</p>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    {activeTab === 'FORM' && (
                        <button 
                            onClick={handleRefreshForm}
                            title="Reload Application Data"
                            className={`flex items-center space-x-2 px-3 py-1.5 rounded border font-mono text-[9px] uppercase tracking-wider transition-all
                                      ${isDarkMode 
                                        ? 'bg-zinc-800 border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-700' 
                                        : 'bg-zinc-100 border-zinc-300 text-zinc-600 hover:bg-zinc-200'}`}
                        >
                            <i className={`fas fa-sync-alt ${isUplinking ? 'fa-spin' : ''}`}></i>
                            <span className="font-bold">[REFRESH_LINK]</span>
                        </button>
                    )}

                    {isUplinking && (
                        <div className="flex items-center space-x-2 text-green-500 font-mono text-[9px] uppercase animate-pulse">
                            <i className="fas fa-spinner fa-spin"></i>
                            <span>Syncing Data Stream...</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden flex flex-col bg-zinc-800">
                
                {/* Loading Overlay */}
                {isUplinking && (
                    <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center space-y-4">
                        <EpauletBars count={4} size="medium" animated={true} />
                        <p className="text-yellow-500 font-mono text-[10px] uppercase tracking-[0.4em] animate-pulse">Establishing Satellite Handshake</p>
                    </div>
                )}

                {activeTab === 'FORM' ? (
                    <div className="flex-1 bg-white relative overflow-hidden flex flex-col">
                        <iframe 
                            key={refreshKey}
                            src={GOOGLE_FORM_URL} 
                            className="absolute inset-0 w-full h-full border-none"
                            title="Enrollment Form"
                        >
                            Loading Application...
                        </iframe>
                    </div>
                ) : (
                    <div className="flex-1 overflow-auto bg-zinc-950 custom-scrollbar">
                         <table className="w-full border-collapse font-mono text-[10px]">
                            <thead className={`sticky top-0 z-10 bg-zinc-900 text-zinc-500 border-b border-zinc-800`}>
                                <tr>
                                    <th className="p-4 text-left font-bold uppercase tracking-widest border-r border-zinc-800">Pilot UID</th>
                                    <th className="p-4 text-left font-bold uppercase tracking-widest border-r border-zinc-800">Callsign</th>
                                    <th className="p-4 text-left font-bold uppercase tracking-widest border-r border-zinc-800">License</th>
                                    <th className="p-4 text-left font-bold uppercase tracking-widest border-r border-zinc-800">Operational Base</th>
                                    <th className="p-4 text-left font-bold uppercase tracking-widest border-r border-zinc-800">Status</th>
                                    <th className="p-4 text-left font-bold uppercase tracking-widest">Enrollment</th>
                                </tr>
                            </thead>
                            <tbody className="text-zinc-300">
                                {MOCK_ROSTER.map((pilot, i) => (
                                    <tr key={pilot.id} className={`${i % 2 === 0 ? 'bg-zinc-900/30' : ''} border-b border-zinc-900 hover:bg-blue-500/5 transition-colors`}>
                                        <td className="p-4 border-r border-zinc-900 text-zinc-500">{pilot.id}</td>
                                        <td className="p-4 border-r border-zinc-900 font-bold text-blue-400">{pilot.callsign}</td>
                                        <td className="p-4 border-r border-zinc-900">{pilot.rank}</td>
                                        <td className="p-4 border-r border-zinc-900">{pilot.school}, {pilot.country}</td>
                                        <td className="p-4 border-r border-zinc-900">
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black
                                                            ${pilot.status === 'VERIFIED' ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 
                                                              pilot.status === 'IN_VETTING' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 
                                                              'bg-zinc-700/20 text-zinc-500 border border-zinc-700/30'}`}>
                                                {pilot.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-zinc-500">{pilot.date}</td>
                                    </tr>
                                ))}
                                {/* User's Pending Entry Placeholder */}
                                <tr className="bg-red-900/10 border-b border-red-900/30 animate-pulse">
                                    <td className="p-4 border-r border-zinc-900 text-red-500">WM-PENDING</td>
                                    <td className="p-4 border-r border-zinc-900 font-bold text-red-400">YOU_CURRENT_USER</td>
                                    <td className="p-4 border-r border-zinc-900">PENDING_SYNC</td>
                                    <td className="p-4 border-r border-zinc-900">PENDING_SYNC</td>
                                    <td className="p-4 border-r border-zinc-900">
                                        <span className="px-2 py-0.5 rounded text-[8px] font-black bg-red-500/20 text-red-500 border border-red-500/30">AWAITING_APPLICATION</span>
                                    </td>
                                    <td className="p-4 text-red-500">SYSTEM_DATE</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Terminal Footer */}
            <div className={`px-6 py-3 border-t flex flex-col md:flex-row justify-between items-center gap-4 shrink-0 ${isDarkMode ? 'bg-zinc-900/80 text-zinc-500' : 'bg-zinc-50 text-zinc-400'}`}>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[8px] font-bold uppercase tracking-wider">Form Server Active</span>
                    </div>
                    <div className="h-3 w-px bg-zinc-700"></div>
                    <span className="text-[8px] font-mono">LAT: 14.5995° N / LON: 120.9842° E</span>
                </div>
                <div className="text-[8px] uppercase tracking-widest font-bold">
                    Property of Wing Mentor Operations Command • v2.4.0
                </div>
            </div>
        </div>

        {/* Informational Note */}
        <div className="mt-4 text-center max-w-2xl mx-auto shrink-0 pb-2">
            <p className={`text-[10px] uppercase tracking-widest leading-relaxed opacity-60 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                <i className="fas fa-info-circle mr-1"></i> Ensure all flight hours and license details are accurate. 
                Inaccurate data in the mission application may result in immediate revocation of system access.
            </p>
        </div>
      </div>
    </div>
  );
};