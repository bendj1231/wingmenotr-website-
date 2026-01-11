import React from 'react';
import { TOOLS_MENU, GENERAL_MENU } from '../constants';
import { useConfig } from '../context/ConfigContext'; // Import useConfig
import { PilotLevel } from '../types';
import { EpauletBars } from './EpauletBars';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userLevel: PilotLevel;
  isLoggedIn: boolean;
  onGoToProgramDetail: () => void;
  onGoToShop: () => void;
  onGoToBlackBox: () => void;
  onGoToLatestNews: () => void;
  onGoToLandingAndScroll: (sectionId: string) => void; 
  onGoToOperatingHandbook: () => void; 
  onGoToTeamPage: () => void; 
  onGoToGapPage: () => void;
  onGoToHub: () => void; 
  onGoToLanding: () => void;
  onGoToIfrSimulator: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userLevel, isLoggedIn, onGoToProgramDetail, onGoToShop, onGoToBlackBox, onGoToLatestNews, onGoToLandingAndScroll, onGoToOperatingHandbook, onGoToTeamPage, onGoToGapPage, onGoToHub, onGoToLanding, onGoToIfrSimulator }) => {
  const { isDarkMode } = useTheme();
  const { config } = useConfig();
  const { images } = config;

  const handleMenuItemClick = (itemTarget?: string, itemName?: string) => {
    onClose(); 
    if (itemTarget === 'landing-page') {
      onGoToLanding();
    } else if (itemTarget === 'program-detail') {
      onGoToProgramDetail();
    } else if (itemTarget === 'gap-page') {
      if (isLoggedIn) {
        onGoToGapPage();
      } else {
        onGoToLandingAndScroll('how-we-fill-gap-section');
      }
    } else if (itemName === 'Shop') {
      onGoToShop();
    } else if (itemTarget === 'black-box-page') { 
      onGoToBlackBox();
    } else if (itemName === 'Latest News') { 
      onGoToLatestNews();
    } else if (itemTarget === 'operating-handbook-page') { 
      onGoToOperatingHandbook();
    } else if (itemTarget === 'team-page') { 
      onGoToTeamPage();
    } else if (itemTarget && ['program-section', 'about-us-section', 'contact-us-section', 'how-we-fill-gap-section'].includes(itemTarget)) { 
      onGoToLandingAndScroll(itemTarget);
    }
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/80 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 left-0 h-full w-80 z-50 transform transition-transform duration-300 ease-in-out border-r
                      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                      ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        
        <div className={`p-6 border-b flex items-center space-x-4
                        ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
            <img src={images.LOGO} alt="Logo" className="w-12 h-12 object-contain" />
            <span className={`text-xl font-bold brand-font tracking-wider ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                WINGMENTOR
            </span>
            <button onClick={onClose} className={`ml-auto text-xl ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-black'}`}>
                <i className="fas fa-times"></i>
            </button>
        </div>

        <div className="overflow-y-auto h-[calc(100%-90px)] p-4">
            
            <div className={`mb-8 p-4 rounded-lg flex items-center space-x-3 border
                            ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-100 border-zinc-200'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`}>
                    <i className={`fas fa-user ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}></i>
                </div>
                <div>
                    <p className={`text-xs uppercase tracking-wider mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>Pilot Rank</p>
                    <EpauletBars count={userLevel} size="small" />
                </div>
            </div>

            <h3 className={`text-xs uppercase font-bold mb-4 tracking-[0.2em] border-b pb-2
                           ${isDarkMode ? 'text-yellow-500 border-zinc-800' : 'text-blue-700 border-zinc-200'}`}>Tools</h3>
            <ul className="space-y-2 mb-8">
                {TOOLS_MENU.map((item) => (
                    <li key={item.name}>
                        <button 
                           onClick={() => handleMenuItemClick(item.target, item.name)} 
                           className={`flex items-center space-x-3 p-3 rounded-md transition-all group border border-transparent w-full text-left
                                      ${isDarkMode 
                                        ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700' 
                                        : 'text-zinc-700 hover:bg-zinc-100 hover:text-blue-900 hover:border-zinc-200'}`}>
                            <span className="w-8 text-center flex justify-center">
                                <i className={`fas ${item.icon} text-lg transition-colors
                                              ${isDarkMode ? 'text-zinc-500 group-hover:text-yellow-400' : 'text-zinc-400 group-hover:text-blue-600'}`}></i>
                            </span>
                            <span className="font-medium tracking-wide">{item.name}</span>
                        </button>
                    </li>
                ))}
                <li>
                    <button 
                        onClick={() => { onClose(); onGoToIfrSimulator(); }}
                        className={`flex items-center space-x-3 p-3 rounded-md transition-all group border border-transparent w-full text-left
                                  ${isDarkMode 
                                    ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700' 
                                    : 'text-zinc-700 hover:bg-zinc-100 hover:text-blue-900 hover:border-zinc-200'}`}>
                        <span className="w-8 text-center flex justify-center">
                            <i className={`fas fa-compass text-lg transition-colors
                                          ${isDarkMode ? 'text-zinc-500 group-hover:text-yellow-400' : 'text-zinc-400 group-hover:text-blue-600'}`}></i>
                        </span>
                        <span className="font-medium tracking-wide">IFR Simulator</span>
                    </button>
                </li>
            </ul>

            <h3 className={`text-xs uppercase font-bold mb-4 tracking-[0.2em] border-b pb-2
                           ${isDarkMode ? 'text-yellow-500 border-zinc-800' : 'text-blue-700 border-zinc-200'}`}>General</h3>
            <ul className="space-y-2 mb-8">
                {GENERAL_MENU.map((item) => (
                    <li key={item.name}>
                        <button
                           onClick={() => handleMenuItemClick(item.target, item.name)} 
                           className={`flex items-center space-x-3 p-3 rounded-md transition-all group border border-transparent w-full text-left
                                      ${isDarkMode 
                                        ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white hover:border-zinc-700' 
                                        : 'text-zinc-700 hover:bg-zinc-100 hover:text-blue-900 hover:border-zinc-200'}`}>
                            <span className="w-8 text-center flex justify-center">
                                <i className={`fas ${item.icon} text-lg transition-colors
                                              ${isDarkMode ? 'text-zinc-500 group-hover:text-yellow-400' : 'text-zinc-400 group-hover:text-blue-600'}`}></i>
                            </span>
                            <span className="font-medium tracking-wide">{item.name}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </>
  );
};