import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext'; // Import useConfig
import { useTheme } from '../context/ThemeContext';
import { RevealOnScroll } from './RevealOnScroll';

interface BlackBoxPageProps {
  onBackToLanding: () => void;
  isLoggedIn: boolean;
  onLogin: () => void;
}

export const BlackBoxPage: React.FC<BlackBoxPageProps> = ({ onBackToLanding, isLoggedIn, onLogin }) => { 
  const { isDarkMode } = useTheme();
  const { config } = useConfig();
  const { images } = config;
  const [hasAccessedInfo, setHasAccessedInfo] = useState(isLoggedIn); 

  const pageBg = isDarkMode ? 'bg-black' : 'bg-white';
  const textBody = isDarkMode ? 'text-white' : 'text-black';
  const textSecondary = isDarkMode ? 'text-zinc-400' : 'text-zinc-600';
  const textHighlight = isDarkMode ? 'text-red-500' : 'text-red-700';
  const accentButtonBg = isDarkMode ? 'bg-red-700 hover:bg-red-600' : 'bg-red-700 hover:bg-red-600';
  const accentButtonText = 'text-white';
  const panelBg = isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200';

  const renderIntroGate = () => (
    <div className={`relative min-h-screen flex items-center justify-center animate-in fade-in duration-700 p-6 ${pageBg}`}>
        <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src={images.BLACK_BOX_BG} 
              alt="Black Box Background" 
              className="w-full h-full object-cover object-center" 
              style={{ filter: 'brightness(0.6) blur(2px)' }} 
            />
            <div className={`absolute inset-0 z-10 ${isDarkMode ? 'bg-black/60' : 'bg-white/80'}`}></div>
        </div>

        <div className={`relative z-20 max-w-3xl w-full border-2 p-8 md:p-12 rounded-lg shadow-2xl flex flex-col
                        ${isDarkMode ? 'border-blue-500/20 bg-slate-900/90' : 'border-blue-500/20 bg-white/95'}`}>
             
             <button 
                onClick={onBackToLanding}
                className={`absolute top-6 left-6 text-xs font-bold uppercase tracking-widest hover:underline ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}
             >
                <i className="fas fa-arrow-left mr-2"></i> Back
             </button>

             <div className="text-center mb-10 mt-6">
                 <h1 className={`text-4xl md:text-5xl font-bold brand-font uppercase tracking-widest ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                    THE BLACK BOX
                 </h1>
                 <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
             </div>

             <div className={`mb-12 max-w-xl mx-auto p-6 md:p-8 rounded-xl backdrop-blur-md transition-all duration-300
                            ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/50 border border-black/5 shadow-inner'}`}>
                 <p className={`text-lg leading-relaxed ${textBody} font-['Raleway'] text-center mb-6`}>
                    This is the deeply guarded information access, your ultimate resource for free support and guidance.
                 </p>
                 <p className={`text-base leading-relaxed ${textSecondary} font-['Raleway'] text-center mb-6`}>
                    Gain access to essential PowerPoints and topics for PPL, CPL, IR, ME, SPL ratings, detailed interview & checkride preparations, comprehensive test reviews, and invaluable insights.
                 </p>
                 <p className={`text-base leading-relaxed ${textBody} font-['Raleway'] text-center`}>
                    Sign up is free. Apply for access or sign in with Wing Mentor to unlock this vital intelligence.
                 </p>
             </div>

             <div className={`pt-8 border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                 <h3 className={`text-center font-mono text-sm font-bold uppercase tracking-widest mb-6 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-700'}`}>
                    {isLoggedIn ? 'ACCESS GRANTED: WING MENTOR' : 'RESTRICTED ACCESS'}
                 </h3>
                 
                 {isLoggedIn ? (
                     <div className="text-center">
                         <p className={`text-sm mb-4 ${textHighlight} font-bold`}>
                             Welcome back, Mentor. The Black Box is open.
                         </p>
                         <button 
                             onClick={() => setHasAccessedInfo(true)}
                             className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded shadow-lg mt-2
                                         ${accentButtonBg} ${accentButtonText}`}
                         >
                             ACCESS THE BLACK BOX
                         </button>
                     </div>
                 ) : (
                     <div className="text-center">
                         <p className={`text-sm mb-4 ${textSecondary}`}>
                             <span className="font-bold block mb-1">Mentors:</span> Sign in for instant access.<br/>
                             <span className="font-bold block mt-2">Mentees:</span> Apply for membership & complete a vetting interview to access.
                         </p>
                         <button 
                            onClick={onLogin} 
                            className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded shadow-lg mt-2
                                        ${accentButtonBg} ${accentButtonText}`}
                         >
                            SIGN IN / APPLY FOR ACCESS
                         </button>
                     </div>
                 )}
             </div>
        </div>
    </div>
  );

  if (!hasAccessedInfo) {
      return renderIntroGate();
  }

  return (
    <div 
      className={`relative min-h-screen animate-in fade-in duration-700 transition-colors bg-cover bg-center`}
      style={{ backgroundImage: `url(${images.BLACK_BOX_BG})` }}
    >
      
      {/* Overlay for readability */}
      <div className={`absolute inset-0 z-0 ${isDarkMode ? 'bg-black/70' : 'bg-white/70'}`}></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto pt-32 pb-16 px-6 lg:px-12">
        <RevealOnScroll className="mb-12 text-center">
            <button 
                onClick={onBackToLanding}
                className={`flex items-center mx-auto space-x-3 px-6 py-3 rounded-md uppercase tracking-widest text-sm font-bold transition-all shadow-md
                            border ${isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-600' : 'bg-white text-zinc-800 hover:bg-zinc-100 border-zinc-300'}`}>
                <i className="fas fa-arrow-left"></i>
                <span>Back to Main Deck</span>
            </button>
        </RevealOnScroll>

        <RevealOnScroll className="text-center mb-16">
          <img 
            src={images.LOGO} 
            alt="Wing Mentor Logo" 
            className="w-24 h-auto object-contain mx-auto mb-6" 
          />
          <h1 className={`text-5xl md:text-7xl font-bold brand-font leading-tight mb-2 
                          ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            THE BLACK BOX
          </h1>
          <p className={`text-xl md:text-3xl font-light leading-relaxed ${textSecondary}`}>
            Deeply Guarded Information Access
          </p>
        </RevealOnScroll>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16`}>
            {[
                { title: 'PPL / SPL', subtitle: 'Private / Student Pilot', icon: 'fa-cloud-sun', desc: 'PowerPoints, Maneuver Guides, Test Preparations, Reviews.' },
                { title: 'CPL', subtitle: 'Commercial Pilot License', icon: 'fa-plane', desc: 'Advanced Systems, Interview Checkrides, Performance Data, Exam Prep.' },
                { title: 'IR', subtitle: 'Instrument Rating', icon: 'fa-tachometer-alt', desc: 'IFR Charts, Approach Plates, Holding Patterns, Scenario Reviews.' },
                { title: 'ME', subtitle: 'Multi-Engine', icon: 'fa-cogs', desc: 'Engine Out Procedures, V-Speeds, Complex Systems, SOPs.' }
            ].map((item, idx) => (
                <RevealOnScroll key={idx} delay={idx * 100} className={`p-6 rounded-xl border shadow-lg transition-transform hover:-translate-y-1 ${panelBg}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isDarkMode ? 'bg-red-900/20 text-red-500' : 'bg-red-100 text-red-600'}`}>
                        <i className={`fas ${item.icon} text-xl`}></i>
                    </div>
                    <h3 className={`font-bold brand-font text-xl mb-1 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{item.title}</h3>
                    <p className={`text-xs uppercase tracking-wider font-bold mb-3 ${textHighlight}`}>{item.subtitle}</p>
                    <p className={`text-sm ${textSecondary}`}>{item.desc}</p>
                    <button className={`mt-4 text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-current transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        Access Files <i className="fas fa-arrow-right ml-1"></i>
                    </button>
                </RevealOnScroll>
            ))}
        </div>

        <div className={`space-y-10 p-8 md:p-12 rounded-xl shadow-md transition-all duration-500 border
                        ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
          
          <RevealOnScroll delay={100}>
            <div className="flex items-center justify-between border-b pb-4 mb-8 border-zinc-700">
                <h2 className={`text-2xl md:text-3xl font-bold brand-font ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                AIRCRAFT PROCEDURES
                </h2>
                <span className={`font-mono text-xs px-2 py-1 rounded ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-200 text-zinc-600'}`}>DOC: WM-C152-001</span>
            </div>

            <h3 className={`text-xl md:text-2xl font-bold brand-font mb-6 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
              1.1 Cessna 152 Descriptive Notes
            </h3>
            
            <div className="flex justify-center items-center mb-10">
                <img src={images.CESSNA_152_IMG_1} alt="Cessna 152" className="w-full max-w-3xl h-auto object-cover rounded-lg shadow-lg" />
            </div>

            <div className="space-y-6">
                <h4 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>General Characteristics</h4>
                <ul className={`list-none space-y-2 ${textSecondary} font-mono text-base`}>
                    <li><span className={`${textHighlight}`}>&gt;</span> Crew: 1 pilot</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Capacity: 1 passenger</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Length: 24 ft 1 in (7.3 m)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Wingspan: 33 ft 4 in (10.2 m)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Height: 8 ft 6 in (2.6 m)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Wing area: 160 ft² (14.9 m²)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Empty weight: 1,081 lb (490 kg)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Max. takeoff weight: 1,670 lb (757 kg)</li>
                </ul>

                <h4 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'} mt-8`}>Powerplant</h4>
                <p className={`${textSecondary} font-mono text-base`}>
                    <span className={`${textHighlight}`}>&gt;</span> Powerplant: 1 x Lycoming O-235-L2C flat-4 engine, 110 hp (82 kW) driving a 69-inch (175 cm), two-blade, fixed-pitch McCauley propeller or a 72-inch, two-blade, fixed-pitch Sensenich propeller
                </p>

                <h4 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-zinc-900'} mt-8`}>Performance</h4>
                <ul className={`list-none space-y-2 ${textSecondary} font-mono text-base`}>
                    <li><span className={`${textHighlight}`}>&gt;</span> Maximum speed: 126 mph (110 knots, 204 km/h)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Cruise speed: 123 mph (107 knots, 198 km/h)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Stall speed: 49 mph (43 knots, 79 km/h) unpowered, flaps down</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Range: 477 mi (414 nm, 768 km)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Extended range: 795 mi (690 nm, 1,280 km) with long-range tanks</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Service ceiling: 14,700 ft (4,480 m)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Takeoff roll: 725 ft (221 m)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Rate of climb: 715 ft/min (3.6 m/s)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Max. wing loading: 10.44 lb/ft² (51 kg/m²)</li>
                    <li><span className={`${textHighlight}`}>&gt;</span> Minimum power/mass: .066 hp/lb (108 W/kg)</li>
                </ul>
            </div>
          </RevealOnScroll>
          
          <div className={`mt-16 pt-8 border-t ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'} text-center`}>
            <p className={`${textSecondary} font-mono text-xs mb-1`}>Rev.: 00</p>
            <p className={`${textSecondary} font-mono text-xs mb-1`}>Date: Nov. 15, 2017</p>
            <p className={`${textSecondary} font-mono text-xs`}>Issue No.: 3</p>
          </div>

        </div>
      </div>
    </div>
  );
};