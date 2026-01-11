import React, { useState } from 'react';
import { GENERAL_MENU } from '../constants';
import { useConfig } from '../context/ConfigContext'; // Import useConfig
import { PilotLevel } from '../types';
import { MasterSwitch } from './MasterSwitch';
import { Sidebar } from './Sidebar';
import { EpauletBars } from './EpauletBars';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
  onGoToLanding: () => void;
  onGoToHub: () => void;
  onGoToProgramDetail: () => void;
  onGoToShop: () => void;
  onGoToGapPage: () => void;
  onGoToBlackBox: () => void;
  onGoToLatestNews: () => void;
  onGoToLandingAndScroll: (sectionId: string) => void;
  onGoToOperatingHandbook: () => void; 
  onGoToTeamPage: () => void; 
  onGoToEnrollment: () => void; 
  onGoToIfrSimulator: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isLoggedIn, toggleLogin, onGoToLanding, onGoToHub, onGoToProgramDetail, onGoToShop, onGoToGapPage, onGoToBlackBox, onGoToLatestNews, onGoToLandingAndScroll, onGoToOperatingHandbook, onGoToTeamPage, onGoToEnrollment, onGoToIfrSimulator }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const userLevel = isLoggedIn ? PilotLevel.MENTOR : PilotLevel.STUDENT;
  const { isDarkMode, toggleTheme } = useTheme();
  const { config } = useConfig();
  const { images } = config;

  const handleGeneralMenuItemClick = (itemTarget?: string, itemName?: string) => {
    if (itemTarget === 'gap-page') {
      if (isLoggedIn) {
        onGoToGapPage();
      } else {
        onGoToLandingAndScroll('how-we-fill-gap-section');
      }
    } else if (itemTarget === 'black-box-page') { 
      onGoToBlackBox();
    } else if (itemTarget === 'operating-handbook-page') { 
      onGoToOperatingHandbook();
    } else if (itemTarget === 'team-page') { 
      onGoToTeamPage();
    } else if (itemTarget && ['program-section', 'about-us-section', 'contact-us-section', 'how-we-fill-gap-section'].includes(itemTarget)) {
      onGoToLandingAndScroll(itemTarget);
    } else if (itemName === 'Shop') {
      onGoToShop();
    } else if (itemName === 'Latest News') { 
      onGoToLatestNews();
    } else {
      onGoToLanding();
    }
  };

  const handleSwitchClick = () => {
    if (isLoggedIn) {
        toggleLogin(); // Logout immediately
        setShowLoginPopup(false);
    } else {
        setShowLoginPopup(!showLoginPopup); // Toggle popup
        // Reset form
        setLoginUser('');
        setLoginPass('');
        setLoginError('');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsAuthenticating(true);
      setLoginError('');

      // Simulate a small network delay for realism
      setTimeout(() => {
          // Enforce specific admin credentials as requested
          if ((loginUser === 'LEOPARD' && loginPass === 'RPC1993') || 
              (loginUser === 'TIGER' && loginPass === 'RPC1884')) {
              setIsAuthenticating(false);
              toggleLogin(); // Sets isLoggedIn to true
              setShowLoginPopup(false);
          } else {
              setIsAuthenticating(false);
              setLoginError('INVALID CREDENTIALS');
          }
      }, 800);
  };

  const handleSignUp = () => {
      setShowLoginPopup(false);
      onGoToEnrollment();
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full h-32 z-40 flex items-center justify-between px-10 transition-all duration-300
                      ${isDarkMode ? 'bg-gradient-to-b from-black via-black/90 to-transparent' : 'bg-white/95 backdrop-blur-md border-b border-zinc-200/50'}`}>
        
        <div className="flex items-center space-x-6">
            <button 
                onClick={() => setSidebarOpen(true)}
                className={`transition-colors p-2 ${isDarkMode ? 'text-white hover:text-yellow-400' : 'text-black hover:text-blue-600'}`}
            >
                <i className="fas fa-bars text-2xl"></i>
            </button>
            
            <button onClick={onGoToLanding} className="flex items-center space-x-4 group">
                 <div className="w-24 h-24 flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                    <img src={images.HERO_ALT} alt="Mini Logo" className="w-full h-full object-contain" />
                 </div>
                 <span className={`text-lg font-bold tracking-[0.2em] uppercase transition-colors
                                  ${isDarkMode ? 'text-white group-hover:text-yellow-400' : 'text-zinc-900 group-hover:text-blue-600'}`}>
                    WING MENTOR
                 </span>
            </button>

            <button 
              onClick={onGoToHub} 
              className={`ml-6 text-[11px] font-medium uppercase tracking-widest transition-colors
                         ${isDarkMode ? 'text-white hover:text-yellow-400' : 'text-black hover:text-blue-600'}`}
              aria-label="Go to Wing Mentor Airport"
            >
                Wing Mentor Airport
            </button>
        </div>

        <div className="flex items-center space-x-8">
            
            <div className={`w-px h-8 ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-300'}`}></div>

            <div className="relative flex items-center space-x-6">
                
                <div className="flex items-center">
                    <EpauletBars count={userLevel} size="small" />
                </div>

                <div className={`${isDarkMode ? 'text-white' : 'text-black'}`}>
                     <i className="far fa-user text-sm"></i>
                </div>

                {/* Master Switch Container with Popup */}
                <div className="relative">
                    <div className="scale-90 origin-right transition-transform">
                        <MasterSwitch isLoggedIn={isLoggedIn} onToggle={handleSwitchClick} />
                    </div>

                    {/* LOGIN POPUP */}
                    {showLoginPopup && !isLoggedIn && (
                        <div className={`absolute top-full right-0 mt-4 w-72 p-6 rounded-xl shadow-2xl border z-50 animate-in fade-in slide-in-from-top-2 origin-top-right
                                        ${isDarkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'}`}>
                            
                            {/* Arrow Pointer */}
                            <div className={`absolute -top-2 right-8 w-4 h-4 transform rotate-45 border-l border-t 
                                            ${isDarkMode ? 'bg-zinc-900 border-zinc-700' : 'bg-white border-zinc-200'}`}></div>

                            <form onSubmit={handleLoginSubmit} className="space-y-4 relative z-10">
                                <h3 className={`text-xs font-bold uppercase tracking-widest text-center mb-4 
                                              ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                                    System Access
                                </h3>
                                
                                {loginError && (
                                    <div className="text-[10px] text-center text-red-500 font-bold bg-red-500/10 p-2 rounded border border-red-500/20">
                                        {loginError}
                                    </div>
                                )}

                                <div>
                                    <label className={`block text-[9px] font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                                        Callsign / Username
                                    </label>
                                    <input 
                                        type="text" 
                                        value={loginUser}
                                        onChange={(e) => setLoginUser(e.target.value)}
                                        className={`w-full p-2 text-xs font-mono rounded border focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors
                                                  ${isDarkMode ? 'bg-black border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                        placeholder="LEOPARD / TIGER"
                                    />
                                </div>
                                <div>
                                    <label className={`block text-[9px] font-bold uppercase tracking-wider mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
                                        Password
                                    </label>
                                    <input 
                                        type="password" 
                                        value={loginPass}
                                        onChange={(e) => setLoginPass(e.target.value)}
                                        className={`w-full p-2 text-xs font-mono rounded border focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-all text-sm font-mono tracking-wide placeholder-zinc-700"
                                                  ${isDarkMode ? 'bg-black border-zinc-700 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                                        placeholder="••••••"
                                    />
                                </div>

                                <button 
                                    type="submit"
                                    disabled={isAuthenticating}
                                    className={`w-full py-3 rounded font-bold uppercase tracking-widest text-xs transition-all shadow-lg flex justify-center items-center
                                              ${isAuthenticating 
                                                ? 'bg-zinc-600 cursor-wait' 
                                                : 'bg-yellow-600 hover:bg-yellow-500 text-black'}`}
                                >
                                    {isAuthenticating ? <i className="fas fa-spinner fa-spin"></i> : 'Initialize'}
                                </button>

                                <div className="text-center pt-2 border-t border-zinc-700/50">
                                    <button 
                                        type="button" 
                                        onClick={handleSignUp}
                                        className={`text-[10px] font-bold uppercase tracking-wide hover:underline
                                                  ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-black'}`}
                                    >
                                        No Account? Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <button
              onClick={toggleTheme}
              className={`ml-4 flex items-center space-x-2 p-2 rounded-full backdrop-blur-md border transition-all
                          ${isDarkMode 
                            ? 'bg-zinc-800/60 hover:bg-zinc-700/80 border-zinc-700 text-white hover:text-yellow-400' 
                            : 'bg-zinc-100/80 hover:bg-zinc-200/80 border-zinc-300 text-black hover:text-blue-600'}`}
              aria-label="Toggle Dark/Light Mode"
            >
              <i className={`fas ${isDarkMode ? 'fa-moon' : 'fa-sun'} text-sm`}></i>
            </button>
        </div>
      </nav>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        userLevel={userLevel}
        isLoggedIn={isLoggedIn}
        onGoToGapPage={onGoToGapPage}
        onGoToProgramDetail={onGoToProgramDetail}
        onGoToShop={onGoToShop} 
        onGoToBlackBox={onGoToBlackBox} 
        onGoToLatestNews={onGoToLatestNews} 
        onGoToLandingAndScroll={onGoToLandingAndScroll} 
        onGoToOperatingHandbook={onGoToOperatingHandbook}
        onGoToTeamPage={onGoToTeamPage} 
        onGoToHub={onGoToHub} 
        onGoToLanding={onGoToLanding}
        onGoToIfrSimulator={onGoToIfrSimulator}
      />
    </>
  );
};