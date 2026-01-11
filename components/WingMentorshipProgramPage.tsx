import React, { useState, useEffect, useRef } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useTheme } from '../context/ThemeContext';
import { RevealOnScroll } from './RevealOnScroll';

interface WingMentorshipProgramPageProps {
  onBackToLanding: () => void;
  onGoToProgramDetail: () => void;
}

export const WingMentorshipProgramPage: React.FC<WingMentorshipProgramPageProps> = ({ onBackToLanding, onGoToProgramDetail }) => {
  const { isDarkMode } = useTheme();
  const { config } = useConfig();
  const { images } = config;
  const [pageVisible, setPageVisible] = useState(false);

  useEffect(() => {
    // Small delay to trigger the fade in effect
    const timer = setTimeout(() => setPageVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="w-full min-h-screen relative flex flex-col items-center py-24 px-6 border-b border-zinc-200 dark:border-zinc-900 bg-cover bg-center overflow-x-hidden" 
      style={{ backgroundImage: `url(${images.PROGRAM_BG})` }}
    >
        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-out 
                           ${isDarkMode ? 'bg-black' : 'bg-white'}
                           ${pageVisible ? 'opacity-70 dark:opacity-70' : 'opacity-100 dark:opacity-100'}`}></div> 
        
        <div className="relative z-20 mb-12 w-full max-w-6xl">
            <button 
                onClick={onBackToLanding}
                className={`flex items-center space-x-3 px-6 py-3 rounded-md uppercase tracking-widest text-sm font-bold transition-all shadow-md
                            border ${isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-600' : 'bg-white text-zinc-800 hover:bg-zinc-100 border-zinc-300'}`}>
                <i className="fas fa-arrow-left"></i>
                <span>Back to Deck</span>
            </button>
        </div>

        <div className={`relative z-10 w-full max-w-6xl mx-auto p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl transition-all duration-500
                        ${isDarkMode ? 'bg-black/70 border border-zinc-700' : 'bg-white/80 border border-zinc-300 backdrop-blur-lg'}`}>

            <RevealOnScroll className="max-w-5xl mx-auto text-center mb-16 pt-8">
                <div className={`flex justify-center mb-8 backdrop-blur-sm p-4 rounded-xl shadow-lg inline-block mx-auto ${isDarkMode ? 'bg-black/50' : 'bg-white/70 border border-zinc-200'}`}>
                    <img 
                        src={images.PROGRAM_HEADER_IMAGE} 
                        alt="Program Header Graphic" 
                        className="w-48 md:w-64 h-auto object-contain" 
                    />
                </div>
                
                <div className={`p-6 rounded-xl shadow-lg backdrop-blur-sm ${isDarkMode ? 'bg-black/50' : 'bg-white/70 border border-zinc-200'}`}> 
                    <h2 className={`text-4xl md:text-6xl font-bold brand-font leading-none mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}> 
                        Wing Mentorship Program
                    </h2>
                    <h3 className={`text-xl md:text-2xl font-light uppercase tracking-widest ${isDarkMode ? 'text-red-400' : 'text-red-700'}`}> 
                        Bridging the experience gap <br />
                        <span className="inline-flex items-center gap-x-2 align-middle mt-2">
                            Low timer
                            <span className="text-yellow-500 font-bold mx-1">TO</span>
                            wing mentor
                        </span>
                    </h3>
                </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100} className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
                <button 
                  onClick={onGoToProgramDetail}
                  className={`
                    w-48 h-48 p-4
                    border-4 rounded-2xl 
                    flex flex-col items-center justify-center
                    transition-all duration-300 
                    bg-red-700 hover:bg-red-600
                    text-white uppercase font-black text-center
                    animate-master-switch-pulse
                    ${isDarkMode ? 'border-zinc-300' : 'border-zinc-400'}
                  `}
                  aria-label="Become a Wing Mentor or Mentee and Start Now"
                >
                    <span className="block text-base leading-tight tracking-wider">
                        Become Wing Mentor/Mentee
                    </span>
                    <div className="w-3/4 h-px bg-white/50 my-3"></div>
                    <span className="block text-2xl leading-none tracking-widest">
                        Start Now
                    </span>
                </button>
                <p className={`text-xs uppercase tracking-wider ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    Press the red master switch to learn more about the program
                </p>
            </RevealOnScroll>

            <RevealOnScroll delay={200} className="max-w-4xl mx-auto text-center mb-20">
                <p className={`text-xl md:text-2xl font-light leading-relaxed notam-font 
                               ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                    The Wing Mentorship Program is specifically designed for newly commercial and low-timer pilots seeking direction in their careers. Recognizing the aviation industry's need for experience where pilot-centric internships are scarce, we offer a unique peer-to-peer consultation and preparation platform. Our core mission is to help mentees assess and address specific flight-related challenges, refining their skills for upcoming lessons, rather than providing traditional instruction. Mentors, all commercially licensed ground instructors, gain invaluable, verifiable experience through a comprehensive logbook system, providing documented proof of their support across various pilot levels. This program is your pathway to building essential communication and leadership skills, setting you apart in the aviation industry.
                </p>
            </RevealOnScroll>

            <RevealOnScroll delay={300} className="max-w-5xl mx-auto mt-16 mb-20">
              <div className={`w-full aspect-video rounded-xl overflow-hidden shadow-2xl border transition-colors duration-300
                              ${isDarkMode ? 'border-zinc-700 bg-black/50' : 'border-zinc-300 bg-white/70'}`}>
                <video 
                    className="w-full h-full object-cover" 
                    src={images.HERO_VIDEO} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    poster={images.HERO_POSTER}
                >
                    Your browser does not support the video tag.
                </video>
              </div>
            </RevealOnScroll>
        </div>
    </div>
  );
};