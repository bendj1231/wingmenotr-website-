import React from 'react';
import { useConfig } from '../context/ConfigContext';
import { useTheme } from '../context/ThemeContext';
import { RevealOnScroll } from './RevealOnScroll';

interface WingMentorTeamPageProps {
  onBackToLanding: () => void;
}

export const WingMentorTeamPage: React.FC<WingMentorTeamPageProps> = ({ onBackToLanding }) => {
  const { isDarkMode } = useTheme();
  const { config } = useConfig();
  const { images } = config;

  const textPrimary = isDarkMode ? 'text-white' : 'text-zinc-900';
  const textSecondary = isDarkMode ? 'text-zinc-300' : 'text-zinc-600';
  const textHighlight = isDarkMode ? 'text-yellow-400' : 'text-blue-700';
  const panelBg = isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200';

  return (
    <div className={`relative min-h-screen animate-in fade-in duration-700 transition-colors bg-cover bg-center`}
         style={{ backgroundImage: `url(${images.BLACK_STRIP_BG})` }}>
      
      {/* Overlay */}
      <div className={`absolute inset-0 z-0 ${isDarkMode ? 'bg-black/85' : 'bg-white/90'}`}></div>

      <div className="relative z-10 w-full max-w-7xl mx-auto pt-32 pb-16 px-6 lg:px-12">
        <RevealOnScroll className="mb-12 text-center">
            <button 
                onClick={onBackToLanding}
                className={`flex items-center mx-auto space-x-3 px-6 py-3 rounded-md uppercase tracking-widest text-sm font-bold transition-all shadow-md
                            border ${isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-600' : 'bg-white text-zinc-800 hover:bg-zinc-100 border-zinc-300'}`}>
                <i className="fas fa-arrow-left"></i>
                <span>Back to Operations</span>
            </button>
        </RevealOnScroll>

        {/* Hero Header */}
        <RevealOnScroll className="text-center mb-16">
          <div className="flex justify-center mb-6">
             <img src={images.LOGO} alt="Wing Mentor Logo" className="w-24 h-auto object-contain filter brightness-0 invert opacity-90" />
          </div>
          <h1 className={`text-4xl md:text-6xl font-bold brand-font uppercase tracking-wider mb-4 ${textPrimary}`}>
            The Wing Mentor Team
          </h1>
          <p className={`text-xl md:text-2xl font-light tracking-widest uppercase ${textHighlight}`}>
            Professional. Ethical. Experienced.
          </p>
        </RevealOnScroll>

        <div className="grid gap-12">
            
            {/* Section 1: Professionalism */}
            <RevealOnScroll delay={100}>
                <div className={`p-8 md:p-12 rounded-xl border shadow-xl ${panelBg}`}>
                    <div className="flex items-center space-x-4 mb-6 border-b border-zinc-700/50 pb-4">
                        <i className={`fas fa-user-tie text-3xl ${textHighlight}`}></i>
                        <h2 className={`text-2xl md:text-3xl font-bold brand-font uppercase ${textPrimary}`}>
                            Uncompromising Professionalism
                        </h2>
                    </div>
                    <p className={`text-lg leading-relaxed font-['Hack'] ${textSecondary}`}>
                        We are not hobbyists. The Wing Mentor team is composed exclusively of <span className="font-bold text-white">Licensed Commercial Pilots</span> and certified <span className="font-bold text-white">Ground Instructors</span>. We have walked the path you are on. We understand the rigors of flight training, the pressure of checkrides, and the demands of the aviation industry. Our guidance isn't based on theory alone; it is forged in the cockpit and refined through verified operational experience. When we speak, we speak from a position of qualified authority.
                    </p>
                </div>
            </RevealOnScroll>

            {/* Section 2: Guidance vs Instruction */}
            <RevealOnScroll delay={200}>
                <div className={`p-8 md:p-12 rounded-xl border shadow-xl ${panelBg}`}>
                    <div className="flex items-center space-x-4 mb-6 border-b border-zinc-700/50 pb-4">
                        <i className={`fas fa-hand-holding-medical text-3xl ${textHighlight}`}></i>
                        <h2 className={`text-2xl md:text-3xl font-bold brand-font uppercase ${textPrimary}`}>
                            The "Doctor" Approach: Precise Guidance
                        </h2>
                    </div>
                    <p className={`text-lg leading-relaxed font-['Hack'] ${textSecondary}`}>
                        We know exactly what we are doing in terms of support. We distinguish ourselves by adopting a consultative "Doctor" methodology rather than a traditional teaching role. We do not replace your Flight Instructor; we empower you to maximize your time with them. By analyzing your grading sheets and diagnosing the root causes of performance issues, we provide targeted, surgical guidance to resolve specific hurdles. This ensures you enter your next official lesson prepared, confident, and ready to excel.
                    </p>
                </div>
            </RevealOnScroll>

            {/* Section 3: Ethics & Legal (Key Request) */}
            <RevealOnScroll delay={300}>
                <div className={`p-8 md:p-12 rounded-xl border-l-4 ${isDarkMode ? 'border-red-600 bg-red-900/10' : 'border-red-600 bg-red-50'} shadow-xl`}>
                    <div className="flex items-center space-x-4 mb-6 border-b border-red-500/30 pb-4">
                        <i className={`fas fa-balance-scale text-3xl text-red-500`}></i>
                        <h2 className={`text-2xl md:text-3xl font-bold brand-font uppercase ${textPrimary}`}>
                            Ethical & Legal Framework
                        </h2>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className={`text-xl font-bold uppercase mb-4 text-red-400`}>Our Ethical Code</h3>
                            <p className={`text-base leading-relaxed font-['Hack'] ${textSecondary}`}>
                                Integrity is our currency. We adhere to the strictest ethical standards. We do not facilitate shortcuts or academic dishonesty. Our role is to build competence, not to circumvent requirements. We respect the sanctity of the pilot logbook and the hard work required to earn every flight hour. We are committed to fostering a culture of safety, honesty, and professional responsibility.
                            </p>
                        </div>
                        <div>
                            <h3 className={`text-xl font-bold uppercase mb-4 text-red-400`}>Legal Compliance</h3>
                            <p className={`text-base leading-relaxed font-['Hack'] ${textSecondary}`}>
                                We are acutely aware of our legal boundaries. Wing Mentor operates strictly as a mentorship and consultation community, <span className="font-bold underline">not</span> as an Approved Training Organization (ATO) or Flight School. We do not provide flight instruction for license issuance, sign logbooks for flight time, or override the authority of your official instructors. We operate within a defined scope to protect both our mentors and mentees, ensuring all support provided is legally compliant and supplemental in nature.
                            </p>
                        </div>
                    </div>
                </div>
            </RevealOnScroll>

            <RevealOnScroll delay={400} className="text-center mt-8">
                <p className={`text-sm uppercase tracking-widest ${textSecondary} mb-6`}>
                    Join a team that values integrity as much as ability.
                </p>
                <div className="flex justify-center space-x-8">
                    <div className="text-center">
                        <p className={`font-bold text-lg brand-font ${textPrimary}`}>Benjamin Tiger Bowler</p>
                        <p className={`text-xs uppercase ${textSecondary}`}>Founder</p>
                    </div>
                    <div className="text-center">
                        <p className={`font-bold text-lg brand-font ${textPrimary}`}>Karl Brian Vogt</p>
                        <p className={`text-xs uppercase ${textSecondary}`}>Founder</p>
                    </div>
                </div>
            </RevealOnScroll>

        </div>
      </div>
    </div>
  );
};