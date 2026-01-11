
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useConfig } from '../context/ConfigContext'; // Import useConfig
import { PilotGapTimeline } from './PilotGapTimeline'; 

interface LowTimerGapPageProps {
  onBackToLanding: () => void;
  onGoToProgram: () => void;
  isLoggedIn: boolean; 
}

interface ForumTopic {
  id: string;
  code: string; 
  title: string;
  mentorName: string; 
  role: string;
  date: string;
  zuluTime: string;
  severity: 'SPL' | 'PPL' | 'IR' | 'CPL' | 'ME' | 'INFO'; 
  category: string; 
  preview: string;
  section: 'INFO' | 'GAP' | 'PATHWAY'; 
}

const TOPICS: ForumTopic[] = [
  // SECTION: FORUM INFORMATION
  {
    id: 'welcome',
    code: 'ADMIN-001',
    title: 'WELCOME TO THE FORUM',
    mentorName: 'SYSTEM ADMIN',
    role: 'ADMIN',
    date: 'CURRENT',
    zuluTime: '0000Z',
    severity: 'INFO',
    category: 'GEN',
    preview: 'Orientation for all new pilots entering the Gap Forum.',
    section: 'INFO'
  },
  {
    id: 'rules',
    code: 'ADMIN-002',
    title: 'FORUM RULES & ETIQUETTE',
    mentorName: 'MODERATOR',
    role: 'ADMIN',
    date: 'CURRENT',
    zuluTime: '0000Z',
    severity: 'INFO',
    category: 'RULES',
    preview: 'Standard Operating Procedures for communication.',
    section: 'INFO'
  },
  {
    id: 'guide',
    code: 'ADMIN-003',
    title: 'USER GUIDE: RATING TAGS',
    mentorName: 'SYSTEM ADMIN',
    role: 'ADMIN',
    date: 'CURRENT',
    zuluTime: '0000Z',
    severity: 'INFO',
    category: 'HELP',
    preview: 'Understanding the rating category tags (SPL, PPL, CPL, etc).',
    section: 'INFO'
  },

  // SECTION: HOT TOPICS (THE PILOT GAP)
  {
    id: 'intro',
    code: 'A001/24',
    title: 'CAREER TURBULENCE - THE LOW TIMER GAP',
    mentorName: 'CAPT. BOWLER',
    role: 'FOUNDER',
    date: '01 NOV 2024',
    zuluTime: '0800Z',
    severity: 'CPL',
    category: 'ADVISORY',
    preview: 'Advisory: Airline requirements, Turbine Hours, and the reality of Flight Time Bonds.',
    section: 'GAP'
  },
  {
    id: 'saturation',
    code: 'MKT-94',
    title: 'MARKET SATURATION & THE INSTRUCTOR LOOP',
    mentorName: 'CAPT. VOGT',
    role: 'CHIEF MENTOR',
    date: '03 NOV 2024',
    zuluTime: '1000Z',
    severity: 'CPL',
    category: 'ANALYSIS',
    preview: 'The Structural Cycle: 94% aim for airlines, fail, and return to teach the next wave of students.',
    section: 'GAP'
  },
  {
    id: 'university',
    code: 'U042/24',
    title: 'ACADEMIC QUALIFICATION VS OPERATIONAL REALITY',
    mentorName: 'CAPT. VOGT',
    role: 'CHIEF MENTOR',
    date: '02 NOV 2024',
    zuluTime: '1130Z',
    severity: 'SPL',
    category: 'MISMATCH',
    preview: 'Advisory: Discrepancy between degree status and logbook value.',
    section: 'GAP'
  },
  {
    id: 'blackbox', 
    code: 'CASE-001/24',
    title: 'CASE FILE: JOHN - THE 6 MILLION PESO LESSON',
    mentorName: 'CAPT. BOWLER',
    role: 'FOUNDER',
    date: '05 NOV 2024',
    zuluTime: '0900Z',
    severity: 'CPL', 
    category: 'CASE_STUDY',
    preview: 'Financial Analysis: Type Ratings vs. Asset Ownership. The Banker & Casino Manager perspective.',
    section: 'GAP'
  },
  {
    id: 'industry',
    code: 'I882/24',
    title: 'SYSTEMIC BLIND SPOTS: THE UNSEEN GAP',
    mentorName: 'OPS DIRECTOR',
    role: 'ANALYST',
    date: '15 NOV 2024',
    zuluTime: '1445Z',
    severity: 'CPL',
    category: 'OPS_NORMAL',
    preview: 'Hazard Identification: Industry structure ignores low time pilots.',
    section: 'GAP'
  },
  {
    id: 'solution',
    code: 'W100/24',
    title: 'ESTABLISHED PATHWAY: WING MENTOR',
    mentorName: 'HQ DISPATCH',
    role: 'COMMAND',
    date: 'CURRENT',
    zuluTime: 'LIVE',
    severity: 'INFO',
    category: 'NEW_PROC',
    preview: 'New Procedure: Implementation of mentorship protocols effective immediately.',
    section: 'GAP'
  },

  // SECTION: PILOT PATHWAY DISCUSSIONS
  {
    id: 'typeratings',
    code: 'TR-320',
    title: 'DISCUSSION: TYPE RATINGS & CAREER SECURITY',
    mentorName: 'CAPT. RODRIGUEZ',
    role: 'MENTOR',
    date: '18 NOV 2024',
    zuluTime: '0900Z',
    severity: 'ME',
    category: 'TRAINING',
    preview: 'Is a self-sponsored type rating worth the investment without hours?',
    section: 'PATHWAY'
  },
  {
    id: 'ifr',
    code: 'IFR-001',
    title: 'INSTRUMENT FLIGHT RULES MASTERY & CURRENCY',
    mentorName: 'INST. SARAH',
    role: 'IFR MENTOR',
    date: '19 NOV 2024',
    zuluTime: '1620Z',
    severity: 'IR',
    category: 'SKILLS',
    preview: 'Staying current vs staying proficient. The simulator is your friend.',
    section: 'PATHWAY'
  },
  {
    id: 'maneuvers',
    code: 'MAN-101',
    title: 'TIPS & TRICKS: MASTERING FLIGHT MANEUVERS',
    mentorName: 'CAPT. LEE',
    role: 'CFI MENTOR',
    date: '20 NOV 2024',
    zuluTime: '1300Z',
    severity: 'PPL',
    category: 'TIPS',
    preview: 'Energy management tips for the perfect chandelle.',
    section: 'PATHWAY'
  }
];

export const LowTimerGapPage: React.FC<LowTimerGapPageProps> = ({ onBackToLanding, onGoToProgram, isLoggedIn }) => {
  const { isDarkMode } = useTheme();
  const { config } = useConfig();
  const { images } = config; // Access dynamic images
  
  const [activeTopicId, setActiveTopicId] = useState<string | null>('welcome'); 
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  
  const [hasAccess, setHasAccess] = useState(isLoggedIn); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [commentText, setCommentText] = useState(''); 
  const [isLoading, setIsLoading] = useState(true);

  const pageBg = isDarkMode ? 'bg-slate-950' : 'bg-slate-50';
  const sidebarBg = isDarkMode ? 'bg-slate-900' : 'bg-slate-100';
  const contentBg = isDarkMode ? 'bg-slate-900/50' : 'bg-white';
  
  const borderBase = isDarkMode ? 'border-slate-700' : 'border-slate-300';

  const textPrimary = isDarkMode ? 'text-yellow-400' : 'text-yellow-800'; 
  const textSecondary = isDarkMode ? 'text-slate-400' : 'text-slate-500'; 
  const textHighlight = isDarkMode ? 'text-yellow-300' : 'text-yellow-700'; 
  const textBody = isDarkMode ? 'text-white' : 'text-black'; 
  const forumHeadingColor = isDarkMode ? 'text-white' : 'text-zinc-900'; 

  const activeItemStyle = isDarkMode 
    ? 'bg-blue-900/20 border-l-4 border-l-blue-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]' 
    : 'bg-blue-50 border-l-4 border-l-blue-600 shadow-sm';

  const getSeverityColor = (sev: string) => {
    switch (sev) {
        case 'ME': return 'text-red-500 font-bold'; 
        case 'CPL': return 'text-yellow-500 font-bold'; 
        case 'IR': return 'text-purple-400 font-bold'; 
        case 'PPL': return 'text-blue-500 font-bold'; 
        case 'SPL': return 'text-emerald-500 font-bold'; 
        case 'INFO': return 'text-sky-400 font-bold'; 
        default: return 'text-slate-400';
    }
  };

  const commonContentClasses = `text-lg md:text-xl leading-relaxed ${textBody} font-sans space-y-4`;
  const panelClasses = `p-5 rounded-xl border ${borderBase} ${isDarkMode ? 'bg-slate-800/40' : 'bg-zinc-100 shadow-sm'}`;
  
  const blackBoxResponseOuterClasses = `mt-12 p-0 rounded-xl border-l-4 border-emerald-500 shadow-lg overflow-hidden`; 
  const blackBoxResponseInnerClasses = `p-8 bg-black text-white text-center`; 
  const blackBoxResponseTextClasses = `text-base leading-relaxed font-sans mx-auto max-w-2xl text-white`; 
  const blackBoxSignatureClasses = `text-sm italic font-mono text-zinc-400 mt-4`; 

  useEffect(() => {
    if (isLoggedIn) {
      setHasAccess(true);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1024 && !activeTopicId) { 
        setActiveTopicId('welcome');
    }
  }, [activeTopicId]);

  const handleTopicSelect = (id: string) => {
    setActiveTopicId(id);
    if (window.innerWidth < 1024) {
        setIsMobileDetailOpen(true);
    }
  };

  const handleBackToList = () => {
    setIsMobileDetailOpen(false);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    setIsLoggingIn(true);
    setTimeout(() => {
        setHasAccess(true);
        setIsLoggingIn(false);
    }, 1500);
  };

  const handlePostComment = () => {
    if (commentText.trim() === '') return;
    setCommentText(''); 
  };

  const activeTopic = TOPICS.find(t => t.id === activeTopicId);

  const renderContent = () => {
    if (!activeTopic) return null;

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {activeTopic.id === 'welcome' && <img src={images.INFO_WELCOME_IMG} alt="Welcome to Forum" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}
            {activeTopic.id === 'rules' && <img src={images.INFO_RULES_IMG} alt="Forum Rules" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}
            {activeTopic.id === 'guide' && <img src={images.INFO_GUIDE_IMG} alt="User Guide" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}
            {activeTopic.id === 'intro' && <img src={images.GAP_CAREER_TURBULENCE_IMG} alt="Career Turbulence" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}
            {activeTopic.id === 'saturation' && <img src={images.GAP_CAREER_TURBULENCE_IMG} alt="Market Saturation" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}
            {activeTopic.id === 'university' && <img src={images.GAP_UNIVERSITY_REALITY_IMG} alt="University vs Reality" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}
            {activeTopic.id === 'blackbox' && <img src={images.GAP_JOHN_CASE_IMG} alt="Case File John" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}
            {activeTopic.id === 'industry' && <img src={images.GAP_INDUSTRY_BLIND_SPOT_IMG} alt="Industry Blind Spot" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}
            {activeTopic.id === 'solution' && <img src={images.GAP_SOLUTION_PATHWAY_IMG} alt="Wing Mentor Solution" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}
            {activeTopic.id === 'typeratings' && <img src={images.PATHWAY_TYPE_RATINGS_IMG} alt="Type Ratings" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}
            {activeTopic.id === 'ifr' && <img src={images.PATHWAY_IFR_MASTERY_IMG} alt="IFR Mastery" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}
            {activeTopic.id === 'maneuvers' && <img src={images.PATHWAY_MANEUVERS_IMG} alt="Flight Maneuvers" className="w-full h-64 object-cover rounded-lg mb-8 shadow-lg" />}


            {activeTopic.id === 'welcome' && (
                <>
                    <h2 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        Welcome to Wing Mentor's Pilot Gap Forum!
                    </h2>
                    <p className={commonContentClasses}>
                        So, you're here. You've felt it, haven't you? That moment when the dream of flight hits the cold, hard reality of the industry. This isn't just another forum; this is where we start a conversation that nobody else is having. This is about rethinking what it means to be a pilot, not just today, but for the next generation. We don't just talk about the problem; we architect the solution.
                    </p>
                    <p className={commonContentClasses}>
                        We believe that the industry's biggest challenges are its greatest opportunities. This forum is built for those who refuse to accept the status quo, for those who demand a better path. Here, you'll find the collective genius of pilots who are actively reshaping the future, sharing insights, and forging connections that truly matter. This is about vision. This is about impact.
                    </p>
                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: Wing Mentor's Vision
                            </h4>
                            <p className={blackBoxResponseTextClasses}>
                                Wing Mentor exists to transcend the traditional. We are creating a synergistic ecosystem where ambition meets opportunity. This platform is meticulously crafted to be the nexus for breakthrough insights, strategic guidance, and the verifiable experience essential for every pilot's ascent. We are not just bridging a gap; we are engineering a new horizon for aviation careers. Your active participation is the fuel for this revolution.
                            </p>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}

            {activeTopic.id === 'rules' && (
                <>
                    <h3 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        Forum Rules & Etiquette: The Operating Principles
                    </h3>
                    <p className={commonContentClasses}>
                        We're here to build something groundbreaking, something that elevates the entire aviation community. That means we operate on a set of core principles, not just rules. These aren't about restriction; they're about enabling the kind of radical collaboration and breakthrough thinking that defines who we are.
                    </p>
                    <p className={commonContentClasses}>
                        Every revolutionary idea starts with a foundation of clarity and mutual respect. Consider these our code of conduct, designed to ensure our discussions remain sharp, impactful, and always focused on the mission: empowering pilots to overcome the impossible.
                    </p>
                    <div className="grid gap-6">
                        {[
                            { icon: "fas fa-user-tie", title: "1. ELEVATE THE DIALOGUE", desc: "This isn't a place for noise; it's a platform for substance. Every contribution should add value, spark insight, or challenge conventional wisdom constructively. We speak with purpose, not just volume." },
                            { icon: "fas fa-sitemap", title: "2. RESPECT THE JOURNEY", desc: "Every pilot here is on a unique flight path, but we're all aiming for the same destination: mastery. Respect the experience, the struggles, and the triumphs of others. Our diversity of thought is our strength." },
                            { icon: "fas fa-ban", title: "3. FOCUSED INNOVATION", desc: "Our mission is clear: to bridge the pilot gap and redefine career progression. Keep discussions aligned with aviation, mentorship, and industry evolution. Irrelevant detours dilute our collective power." },
                            { icon: "fas fa-shield-alt", title: "4. PROTECT THE ECOSYSTEM", desc: "The integrity of our community is paramount. Safeguard sensitive information, respect privacy, and build trust. We are a collective, and our strength comes from our secure and supportive environment." }
                        ].map((rule, idx) => (
                            <div key={idx} className={panelClasses}>
                                <div className="flex items-center space-x-3 mb-2">
                                    <i className={`${rule.icon} text-2xl ${textHighlight}`}></i>
                                    <span className={`font-bold brand-font text-lg ${textHighlight}`}>{rule.title}</span>
                                </div>
                                <p className={`text-base ${textBody} font-sans leading-relaxed`}>{rule.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: Building a Culture of Excellence
                            </h4>
                            <p className={blackBoxResponseTextClasses}>
                                Wing Mentor is engineered to foster an environment of groundbreaking ideas and mutual elevation. These principles are not merely guidelines; they are the architectural blueprints for a community that thrives on innovation and respect. Adherence ensures every interaction propels our collective mission forward, making this forum the definitive platform for the future of aviation mentorship.
                            </p>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}

            {activeTopic.id === 'guide' && (
                <>
                    <h3 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        User Guide: Your Intuitive Navigation System
                    </h3>
                    <p className={commonContentClasses}>
                        We believe technology should be invisible, intuitive, and empower you to do what you do best: fly. This forum is no different. We've engineered a navigation system that cuts through the noise, allowing you to instantly connect with the insights most critical to your journey. Forget complex charts; this is your digital flight plan for knowledge.
                    </p>
                    <p className={commonContentClasses}>
                        Our unique tagging system, rooted in official pilot license categories, is more than just labels—it's a precision instrument. It instantly categorizes content, allowing you to effortlessly target discussions that elevate your specific phase of flight. This isn't just browsing; it's strategic intelligence gathering.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {[
                            { label: 'SPL', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', desc: 'Student Pilot License: Navigate foundational concepts, pre-solo breakthroughs, and the initial spark of flight. This is where the future begins.' },
                            { label: 'PPL', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', desc: 'Private Pilot License: Master the art of VFR flight, cross-country planning, and refine the core skills that define true command. Elevate your personal freedom in the skies.' },
                            { label: 'IR', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', desc: 'Instrument Rating: Demystify the unseen world. Dive into precision approaches, complex ATC interactions, and the unwavering discipline of instrument flight. Command the unknown.' },
                            { label: 'CPL', color: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', desc: 'Commercial Pilot License: Confront the industry\'s biggest challenge—the gap. Explore career strategies, advanced hour building, and the definitive pathway to professional aviation. Your future is here.' },
                            { label: 'ME', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20', desc: 'Multi-Engine & Type Ratings: Step into the complex. Analyze advanced aircraft systems, crew dynamics, and the meticulous preparation for specific type certifications. Expand your operational envelope.' },
                            { label: 'INFO', color: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/20', desc: 'General Information: Critical system updates, community alerts, and essential announcements. Stay informed, stay ahead. This is vital intelligence.' },
                        ].map((item, idx) => (
                            <div key={idx} className={`flex items-start space-x-4 p-5 rounded-lg border ${item.bg} ${item.border}`}>
                                <span className={`font-bold brand-font w-20 flex-shrink-0 ${item.color} text-xl`}>{item.label}</span>
                                <p className={`text-base ${textBody} font-sans leading-snug`}>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: Optimized Intelligence Gathering
                            </h4>
                            <p className={blackBoxResponseTextClasses}>
                                This isn't merely a guide; it's a strategic brief on how to leverage this platform for maximum impact. Each rating tag is a precision filter, designed to bring you directly to the insights relevant to your current mission. Wing Mentor empowers you to cut through the noise, ensuring every moment spent here is an investment in your career trajectory. This is about intelligent, targeted growth.
                            </p>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}

            {activeTopic.id === 'intro' && (
                <>
                    <h3 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        Career Turbulence: Navigating The Low Timer Gap & Flight Time Bonds
                    </h3>
                    <p className={commonContentClasses}>
                        You've earned your wings. You're a Commercial Pilot. This should be the moment of triumph. Yet, for so many, it's a silent standoff. The phone doesn't ring. The emails disappear into the void. This isn't just a challenge; it's a systemic flaw we call the "Low Timer Gap"—a paradox where ambition meets an antiquated industry. You're overqualified by diploma, yet under-experienced by arbitrary numbers.
                    </p>
                    <p className={commonContentClasses}>
                        <span className="font-bold text-red-500">The Hard Numbers:</span> Airlines aren't just looking for "hours." They demand specific, hard-to-get experience: <strong>Turbine Hours</strong> and <strong>PIC (Pilot in Command)</strong> time. The gap isn't just 200 hours to 1500 hours; it's the <em>quality</em> of those hours. Most entry-level jobs don't offer the multi-engine turbine experience airlines mandate.
                    </p>
                    <p className={commonContentClasses}>
                        <span className="font-bold text-yellow-500">The Golden Handcuffs: Flight Time Bonds.</span> To bridge this gap, many airlines offer a deal with the devil: <strong>The Training Bond</strong>. It functions like a bank bond but for your career. You sign a contract—typically 5 years—in exchange for a secure job position and type rating training.
                    </p>
                    <p className={commonContentClasses}>
                        For example, in the Philippines, major carriers like <strong>Cebu Pacific</strong> offer training bonds valued at upwards of <strong>1.6 million pesos</strong>. They essentially "loan" you the training cost, and you pay it back with 5 years of service. It's security, yes, but it locks you in. For those who already self-funded a Type Rating, you might skip the bond cost, but you still face the "experience gap" to even get the interview.
                    </p>
                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: Engineering a New Flight Plan
                            </h4>
                            <p className={blackBoxResponseTextClasses}>
                                This is not a personal failure; it's a systemic challenge we are actively disrupting. Wing Mentor provides the strategic framework to transform this turbulence into acceleration. We engineer verifiable experience, refine critical skills, and build a network that makes you visible. Your career trajectory demands a proactive approach, and we are your co-pilots in this mission.
                            </p>
                            <button 
                                onClick={onGoToProgram}
                                className={`mt-6 px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm transition-all shadow-lg
                                           ${isDarkMode 
                                             ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20' 
                                             : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'}`}
                            >
                                EXPLORE WING MENTOR SOLUTIONS <i className="fas fa-angle-right ml-2"></i>
                            </button>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}

            {/* NEW TOPIC: MARKET SATURATION */}
            {activeTopic.id === 'saturation' && (
                <>
                    <h3 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        The Saturation Event & The "Instructor Loop"
                    </h3>
                    <div className="border-l-4 border-red-500 pl-4 py-2 bg-red-900/10 mb-8">
                        <p className={`font-bold uppercase text-xs ${textHighlight}`}>SURVEY DATA ANALYSIS</p>
                        <p className={`${commonContentClasses} text-base`}>
                            <strong>94%</strong> of flight school students surveyed listed "Airlines" as their primary goal. <br/>
                            <strong>74%</strong> were unaware of the 1500-hour hurdle or the "gap" challenges until <em>after</em> graduation.
                        </p>
                    </div>

                    <h4 className={`text-xl font-bold uppercase mb-4 ${textHighlight}`}>1. The Saturation Event: Plan A</h4>
                    <p className={commonContentClasses}>
                        If you put yourself in the shoes of an Airline Hiring Manager, visualize the stack on your desk: <strong>1,000+ applicants per year</strong>. Every single one has a CPL. Every single one has ~200 hours. They are identical on paper.
                    </p>
                    <p className={commonContentClasses}>
                        This is the "Saturation Event." It doesn't matter if you are the son of a politician, a banker's child, or from a construction background (like myself). The industry is blind to your background when the resume pile is this high. An overwhelming <strong>80% of pilots without an aviation family background</strong> fail to make it through this saturation event simply because they didn't know the game was rigged against low-timers. They discover the "unknowns" only after the money is spent.
                    </p>

                    <h4 className={`text-xl font-bold uppercase mb-4 mt-8 ${textHighlight}`}>2. The "Plan B" Paradox</h4>
                    <p className={commonContentClasses}>
                        So what happens when Plan A (Airlines) fails? Everyone pivots to Plan B: <strong>Flight Instructor (CFI)</strong>.
                    </p>
                    <p className={commonContentClasses}>
                        The tragic irony is that the flight schools become saturated with their own graduates. Everyone turns back to their alma mater, desperate for a job. Suddenly, the "Plan B" market is just as flooded as the airlines. It is a pilot paradox: A mass of supply with no demand valve.
                    </p>

                    <h4 className={`text-xl font-bold uppercase mb-4 mt-8 ${textHighlight}`}>3. The Structural Cycle</h4>
                    <p className={commonContentClasses}>
                        Let's call it what it looks like: A closed economic loop.
                    </p>
                    <ul className={`list-disc list-inside space-y-2 ${commonContentClasses} text-base`}>
                        <li>Pilots invest huge sums to learn to fly.</li>
                        <li>They graduate and cannot get airline jobs (The Gap).</li>
                        <li>They reinvest to become Instructors (CFI).</li>
                        <li>Their only job is to teach <em>new</em> students who are promised the airline dream.</li>
                        <li>Those new students graduate, find no jobs, and become instructors...</li>
                    </ul>
                    <p className={commonContentClasses}>
                        It is a cycle where the instructor relies on new students to build the hours needed to leave. It is important to note that <span className="font-bold">this is a structural reality of the industry, not a malicious design by flight schools.</span> Schools provide the necessary training and facilities, but the airline industry's entry barriers create this loop. It is a paradox where the system unintentionally necessitates a constant influx of new students to propel the careers of the previous class.
                    </p>

                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: Breaking the Cycle
                            </h4>
                            <p className={blackBoxResponseTextClasses}>
                                You cannot break this cycle by doing what everyone else is doing. If you follow the herd into the Saturation Event, you become a statistic. Wing Mentor exists to give you a "Plan C": Verifiable, documented experience that distinguishes you from the 1,000 identical resumes. We provide the mentorship structure that airlines respect, proving you didn't just "wait" for a job—you sharpened your command skills while others stagnated.
                            </p>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}

            {activeTopic.id === 'university' && (
                <>
                    <h3 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        Academic Qualification vs. Operational Reality
                    </h3>
                    <p className={commonContentClasses}>
                        You've invested. You've excelled. You hold a degree or a certificate from a premier flight academy. That's a profound accomplishment. It’s the bedrock of discipline, professional ethos, and the theoretical mastery essential for command. This is powerful. But here's the uncomfortable truth: the industry, in its current form, demands a different currency for initial entry: <span className={`${textBody} font-bold`}>verifiable operational hours</span>.
                    </p>
                    <p className={commonContentClasses}>
                        This isn't a flaw in your education; it's a design flaw in the system. You are academically brilliant, poised for greatness, yet categorized as "operationally under-experienced" by a narrow metric. Your degree provides the knowledge. Wing Mentor provides the vital, documented experience that unlocks its true potential. This is the integration you need.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                        <div className={panelClasses}>
                            <div className="flex justify-between items-start mb-4">
                                <h4 className={`font-bold uppercase text-sm ${textHighlight}`}>POTENTIAL: ACADEMIC CAPITAL</h4>
                                <i className={`fas fa-graduation-cap text-2xl ${textHighlight}`}></i>
                            </div>
                            <p className={`${commonContentClasses} text-base`}>
                                You possess the intellect, the discipline, and the comprehensive knowledge base. This is the raw power, the foundation upon which true mastery is built. This is invaluable.
                            </p>
                        </div>

                        <div className={panelClasses}>
                            <div className="flex justify-between items-start mb-4">
                                <h4 className={`font-bold uppercase text-sm ${textHighlight}`}>OBSTACLE: OPERATIONAL GAP</h4>
                                <i className={`fas fa-clock text-2xl ${textHighlight}`}></i>
                            </div>
                            <p className={`${commonContentClasses} text-base`}>
                                The hurdle isn't ability; it's the arbitrary requirement for thousands of hours of flight time for which the industry provides no clear path. This is the friction we eliminate.
                            </p>
                        </div>
                    </div>
                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: Activating Academic Potential
                            </h4>
                            <p className={blackBoxResponseTextClasses}>
                                Your degree is a powerful asset. Wing Mentor's mission is to amplify its impact by providing the verifiable operational experience the industry demands. We translate your theoretical brilliance into practical, documented skill, turning academic capital into undeniable career momentum. This is the strategic integration that redefines your trajectory.
                            </p>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}

            {activeTopic.id === 'blackbox' && (
                <>
                    <h3 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        CASE FILE: JOHN & The Investment Gamble
                    </h3>
                    
                    {/* Part 1: John's Story */}
                    <div className="mb-8">
                        <h4 className={`text-xl font-bold uppercase mb-4 ${textHighlight}`}>The 6 Million Peso Lesson</h4>
                        <p className={commonContentClasses}>
                            Every great movement has a moment of clarity. For Wing Mentor, it was John. We witnessed the "Low Timer Gap" destroy a brilliant aviator. John did everything right: Commercial License in hand, he took the audacious leap and invested over <span className={`font-bold ${textHighlight}`}>6 million Philippine pesos</span> for an advanced Airbus A320 Type Rating.
                        </p>
                        <p className={commonContentClasses}>
                            The industry's response? Silence. His advanced qualification became a gilded cage. He lacked the one thing that truly mattered: hours. Heartbroken and financially drained, John uttered the words no pilot should ever have to say: <span className={`font-bold italic text-red-500`}>"I quit flying. For good."</span>
                        </p>
                    </div>

                    {/* Part 2: Capt. Joyce */}
                    <div className="mb-8">
                        <h4 className={`text-xl font-bold uppercase mb-4 ${textHighlight}`}>The Subscription Trap: Capt. Joyce</h4>
                        <p className={commonContentClasses}>
                            Consider Capt. Joyce (name changed), an Airbus A320 rated pilot working as a flight instructor at a renowned, credited school in the Philippines. She has been applying to airlines for <span className="font-bold">5 years</span>. Despite her rating, she is stuck in a loop.
                        </p>
                        <p className={commonContentClasses}>
                            Why? Because a Type Rating is a <strong>subscription</strong>. She must pay for recurrency every 6 months—approx <strong>$10,000 USD</strong>—just to keep her license valid. If she stops paying, she loses her investment. She is likely working just to pay for the right to keep waiting. It’s the classic "Not a Penny More, Not a Penny Less" scenario: digging a deeper hole believing the next shovel-full will reveal the gold.
                        </p>
                    </div>

                    {/* Part 3: Financial Analysis */}
                    <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800/60 border-slate-600' : 'bg-zinc-100 border-zinc-300'}`}>
                        <h4 className={`text-xl font-bold uppercase mb-4 text-center ${textHighlight}`}>
                            Financial Analysis: The Banker & The Casino Manager
                        </h4>
                        <p className={`${commonContentClasses} text-sm italic mb-6 text-center`}>
                            We asked a Banker with investment experience and a Casino Manager to analyze a hypothetical 6 Million Peso investment scenario. Here is their verdict.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="border-r border-slate-600 pr-4">
                                <h5 className="font-bold text-red-500 uppercase mb-2">Option A: Type Rating (Airbus A320)</h5>
                                <ul className={`list-disc ml-4 space-y-2 text-sm ${textSecondary}`}>
                                    <li><strong>Physical Asset?</strong> No. You cannot touch it.</li>
                                    <li><strong>Refundable?</strong> No. Sunk cost.</li>
                                    <li><strong>Ownership Cost?</strong> High. Recurrency every 6 months ($10k USD).</li>
                                    <li><strong>Risk Profile:</strong> <span className="text-red-500 font-bold">EXTREME HIGH RISK / GAMBLE.</span></li>
                                    <li><strong>Verdict:</strong> "A privilege, not property. If you don't pay to renew, you lose 100% of the principal investment. It's a subscription you can't cancel."</li>
                                </ul>
                            </div>
                            <div className="pl-4">
                                <h5 className="font-bold text-emerald-500 uppercase mb-2">Option B: Aircraft (Cessna 172)</h5>
                                <ul className={`list-disc ml-4 space-y-2 text-sm ${textSecondary}`}>
                                    <li><strong>Physical Asset?</strong> Yes. Tangible property.</li>
                                    <li><strong>Refundable?</strong> Yes. Can be sold/liquidated for medical bills/emergency.</li>
                                    <li><strong>Ownership Cost?</strong> Maintenance exists, but asset retains value (scarcity).</li>
                                    <li><strong>Risk Profile:</strong> <span className="text-emerald-500 font-bold">LOW RISK / EQUITY ASSET.</span></li>
                                    <li><strong>Verdict:</strong> "Valuable equity. You have full liability and control. You don't wait 5 years; you fly when you want. If you back out, you keep your capital."</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: The Imperative for Disruption
                            </h4>
                            <p className={blackBoxResponseTextClasses}>
                                Both the Banker and the Casino Manager agreed: A Type Rating without a job offer is a high-risk gamble. Owning an aircraft is an equity investment. Wing Mentor exists to help you navigate these financial minefields. We ensure no pilot has to make John's heartbreaking call or get stuck in Capt. Joyce's expensive loop. We build value, not debt.
                            </p>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}

            {activeTopic.id === 'industry' && (
                <>
                    <h3 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        Systemic Blind Spots: The Industry's Unseen Gap
                    </h3>
                    <p className={commonContentClasses}>
                        The industry operates on an outdated model. It brilliantly produces licensed pilots. It meticulously trains experienced captains. But in between, there's a chasm—a systemic blind spot where thousands of talented, newly licensed aviators simply vanish. They're ready to fly, but the system isn't ready for them. This isn't a supply issue; it's a design flaw in the career pipeline itself.
                    </p>
                    <p className={commonContentClasses}>
                        Airlines demand 1500+ hours. Flight schools graduate pilots with 200-300 hours. The math doesn't work. This disconnect is the "unseen gap," a bottleneck that stifles potential and perpetuates a myth of scarcity when talent abounds. It's a problem begging for innovation, a challenge only a new paradigm can solve.
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                        <div className={panelClasses}>
                            <div className="flex justify-between items-center mb-4">
                                <h4 className={`text-xs uppercase font-bold ${textHighlight}`}>INPUT: RAW POTENTIAL</h4>
                                <i className={`fas fa-users text-2xl ${textHighlight}`}></i>
                            </div>
                            <p className={`${commonContentClasses} text-base`}>Thousands of brilliant, licensed pilots, fueled by passion, graduating annually. Ready for the next stage, but finding no clear path.</p>
                        </div>
                        <div className={panelClasses}>
                            <div className="flex justify-between items-center mb-4">
                                <h4 className={`text-xs uppercase font-bold ${textHighlight}`}>OUTPUT: STAGNANT DEMAND</h4>
                                <i className={`fas fa-plane-departure text-2xl ${textHighlight}`}></i>
                            </div>
                            <p className={`${commonContentClasses} text-base`}>Airlines seeking seasoned professionals, overlooking the vast pool of emerging talent. A system built on yesterday's assumptions.</p>
                        </div>
                    </div>
                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: Engineering the Future Pipeline
                            </h4>
                            <p className={blackBoxResponseTextClasses}>
                                Wing Mentor is actively redesigning the pilot pipeline. We provide the missing link: a structured, verifiable ecosystem for low-time pilots to gain essential experience. This isn't about adapting to an outdated system; it's about disrupting it. We transform untapped potential into undeniable professional assets, making the unseen visible and the unachievable attainable.
                            </p>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}

            {activeTopic.id === 'solution' && (
                <>
                    <h3 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        Established Pathway: The Wing Mentor Initiative
                    </h3>
                    <p className={commonContentClasses}>
                        The greatest challenges often present the greatest opportunities. The "Low Timer Gap" isn't a problem to manage; it's a fundamental flaw that demands a radical new approach. Wing Mentor is that approach. We saw a broken system, and we engineered an elegant, intuitive solution. This isn't just a program; it's a paradigm shift.
                    </p>
                    <p className={commonContentClasses}>
                        We reject the notion that talent should be stifled by antiquated industry models. We believe in empowering every pilot to fulfill their potential. Wing Mentor is designed from the ground up to provide a structured, verifiable pathway that equips you with the experience, the confidence, and the network needed to simply outcompete the old system.
                    </p>
                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: Your Operational Plan for Success
                            </h4>
                            <p className={`${blackBoxResponseTextClasses} mb-4`}>
                                Wing Mentor is not merely a program; it's a strategic framework for career acceleration. We provide the critical, documented experience the industry demands, transforming your potential into undeniable proof.
                            </p>
                            <ul className={`${blackBoxResponseTextClasses} list-disc list-inside mb-4`}>
                                <li>**Verifiable Logged Experience:** Documented mentorship hours for career progression.</li>
                                <li>**Skill Refinement:** Peer-to-peer consultation to master flight-related challenges.</li>
                                <li>**Community & Support:** Combat isolation, connect with mentors and mentees.</li>
                            </ul>
                            <button 
                                onClick={onGoToProgram}
                                className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm
                                           ${isDarkMode 
                                             ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20' 
                                             : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20' 
                                             ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20' 
                                             : 'bg-blue-700 hover:bg-blue-600 text-white shadow-blue-200'}`}
                            >
                                INITIATE PATHWAY TO MENTORSHIP <i className="fas fa-chevron-right ml-2"></i>
                            </button>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}

            {activeTopic.id === 'typeratings' && (
                <>
                    <h3 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        Type Ratings & Career Security: A Strategic Discussion
                    </h3>
                    <p className={commonContentClasses}>
                        The siren song of a jet type rating is powerful. It whispers promises of a fast track, of a dream realized. But let's be candid: without a guaranteed seat, an expensive type rating can become a beautiful, yet quickly obsolete, piece of paper. It's a significant investment that, without strategic timing, can yield devastatingly low returns.
                    </p>
                    <p className={commonContentClasses}>
                        Currency fades. Recency vanishes. Your $30,000+ investment becomes a relic. This isn't about discouraging ambition; it's about intelligent, calculated strategy. We're here to help you dissect the hype, understand the true value, and ensure every investment you make propels your career forward, not just into debt.
                    </p>
                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: Optimized Investment Strategy
                            </h4>
                            <p className={blackBoxResponseTextClasses}>
                                A type rating is a tool, not a guarantee. Wing Mentor advises a meticulously calculated approach. Prioritize verifiable hour-building, advanced ratings (like CFI), and strategic networking *before* committing to a type rating without a confirmed airline offer. Consult with our experienced mentors to craft an investment strategy that yields maximum career acceleration, not just financial burden.
                            </p>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}

            {activeTopic.id === 'ifr' && (
                <>
                    <h3 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        Instrument Flight Rules Mastery & Currency: The Clouds Don't Compromise
                    </h3>
                    <p className={commonContentClasses}>
                        Your Instrument Rating is more than a privilege; it's a testament to precision and unwavering command. You've proven you can navigate the unseen. But the air doesn't forgive complacency. Instrument proficiency is a living skill, one that requires constant, deliberate engagement. The clouds don't care about your last checkride; they demand a pilot who is sharp, current, and utterly prepared.
                    </p>
                    <p className={commonContentClasses}>
                        Fixation, degradation of scan, procedural slips—these aren't just errors; they're vulnerabilities. Without a rigorous, consistent protocol, even the most seasoned aviator can lose their edge. This isn't about maintaining minimums; it's about achieving true, effortless mastery, about flying with an intuitive command that transcends mere procedure.
                    </p>
                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: Cultivating Unflappable Command
                            </h4>
                            <p className={`${blackBoxResponseTextClasses} mb-4`}>
                                True IFR mastery transcends mere currency. Wing Mentor advocates for a consistent, immersive approach: integrate "chair flying" into your daily routine, visualizing every nuanced input and procedural flow. This builds cognitive command. Our IFR mentors provide advanced insights and scenario-based consultation to push you beyond proficiency, ensuring you maintain an intuitive, unflappable command when it matters most.
                            </p>
                            <button 
                                onClick={onGoToProgram}
                                className={`mt-6 px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm transition-all shadow-lg
                                           ${isDarkMode 
                                             ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/20' 
                                             : 'bg-purple-700 hover:bg-purple-600 text-white shadow-purple-200'}`}
                            >
                                ENHANCE YOUR IFR SKILLS <i className="fas fa-angle-right ml-2"></i>
                            </button>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}

            {activeTopic.id === 'maneuvers' && (
                <>
                    <h3 className={`font-bold brand-font text-3xl md:text-4xl leading-tight ${forumHeadingColor}`}>
                        Tips & Tricks: Mastering Flight Maneuvers
                    </h3>
                    <p className={commonContentClasses}>
                        Flying isn't just a science; it's an art. Mastering core flight maneuvers isn't merely about ticking boxes; it's about achieving a symbiotic relationship with your aircraft, understanding its every nuance, and executing with a precision that borders on poetry. This is where the true aviator separates themselves from the mere pilot.
                    </p>
                    <p className={commonContentClasses}>
                        Consider the Chandelle. It's not just a climbing turn; it's a dance of energy management, a ballet of pitch and power. The secret isn't brute force; it's <span className="italic font-bold text-blue-400">finesse and subtle variation</span> in control inputs. It's about feeling the aircraft, understanding its aerodynamic whispers, and translating intent into flawless execution. This section isn't just about techniques; it's about elevating your craft.
                    </p>
                    <div className={blackBoxResponseOuterClasses}>
                        <div className={blackBoxResponseInnerClasses}>
                            <img src={images.LOGO} alt="Wing Mentor Logo" className="w-12 h-12 object-contain mx-auto mb-4 filter brightness(0) invert(1)" />
                            <h4 className={`text-xl font-bold text-white mb-4 flex flex-col items-center`}>
                                VERIFIED ANSWER: The Art of Flawless Execution
                            </h4>
                            <p className={`${blackBoxResponseTextClasses} mb-4`}>
                                Mastering maneuvers is about intuition and precision. Wing Mentor champions deliberate practice beyond the cockpit. Visualize every detail, every control input, every energy state in your mind. Seek feedback, challenge your ingrained habits, and cultivate an insatiable drive for perfection. Our mentors guide you to transform rote tasks into expressions of pure, unadulterated flight, distinguishing you as an exceptional aviator.
                            </p>
                            <button 
                                onClick={onGoToProgram}
                                className={`mt-6 px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm transition-all shadow-lg
                                           ${isDarkMode 
                                             ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20' 
                                             : 'bg-blue-700 hover:bg-blue-600 text-white shadow-blue-200'}`}
                            >
                                REFINE YOUR FLIGHT SKILLS <i className="fas fa-angle-right ml-2"></i>
                            </button>
                            <p className={blackBoxSignatureClasses}>
                                --- Signed, {activeTopic.mentorName}, {activeTopic.role} ---
                            </p>
                        </div>
                    </div>
                </>
            )}
            
            <div className={`mt-12 p-6 rounded-xl ${isDarkMode ? 'bg-slate-800/40 border border-slate-700' : 'bg-zinc-100 border border-zinc-300'}`}>
                <button 
                    onClick={() => console.log('Reply functionality not yet implemented')} 
                    className={`w-full py-3 ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-700 hover:bg-blue-800 text-white'} font-bold uppercase tracking-widest text-sm rounded transition-all`}
                >
                    REPLY TO TOPIC <i className="fas fa-comment-alt ml-2"></i>
                </button>
                <textarea 
                    placeholder="Post your comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className={`w-full mt-4 p-3 rounded border text-sm focus:outline-none ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'bg-zinc-200 border-zinc-300 text-black'}`}
                    rows={3}
                ></textarea>
                <button 
                    onClick={handlePostComment}
                    disabled={commentText.trim() === ''}
                    className={`mt-3 py-2 px-5 rounded font-bold uppercase text-xs transition-all ${commentText.trim() === '' ? 'bg-slate-600 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
                >
                    POST COMMENT
                </button>
            </div>
        </div>
    );
  };

  const renderTopicList = () => {
    const renderSection = (title: string, sectionCode: 'INFO' | 'GAP' | 'PATHWAY') => {
        const sectionTopics = TOPICS.filter(t => t.section === sectionCode);
        if (sectionTopics.length === 0) return null;

        let sectionIcon = '';
        let sectionColorClass = '';
        switch (sectionCode) {
            case 'INFO':
                sectionIcon = 'fas fa-info-circle';
                sectionColorClass = 'text-sky-400';
                break;
            case 'GAP':
                sectionIcon = 'fas fa-exclamation-triangle';
                sectionColorClass = 'text-yellow-500';
                break;
            case 'PATHWAY':
                sectionIcon = 'fas fa-chart-line';
                sectionColorClass = 'text-blue-500';
                break;
        }

        return (
            <div key={sectionCode} className="mb-2">
                 <div className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2
                                bg-slate-800 text-white`}>
                    <i className={`${sectionIcon} ${sectionColorClass}`}></i>
                    <span>{title}</span>
                </div>
                {sectionTopics.map(topic => (
                    <button
                        key={topic.id}
                        onClick={() => handleTopicSelect(topic.id)}
                        className={`w-full text-left p-4 border-b transition-all duration-200 group relative
                                    ${activeTopicId === topic.id 
                                    ? activeItemStyle
                                    : `border-slate-500/10 hover:bg-slate-500/5`}`}
                    >
                        <div className="flex justify-between items-start mb-1">
                            <span className={`font-mono text-[10px] font-bold ${activeTopicId === topic.id ? textHighlight : textSecondary}`}>
                                {topic.code}
                            </span>
                            <span className={`text-[10px] font-bold uppercase ${getSeverityColor(topic.severity)}`}>
                                {topic.severity}
                            </span>
                        </div>
                        
                        <h3 className={`font-bold brand-font text-sm leading-tight mb-2 truncate ${forumHeadingColor}`}>
                            {topic.title}
                        </h3>
                        
                        <div className={`flex justify-between items-center text-[10px] uppercase font-mono ${textSecondary}`}>
                            <span>{topic.date}</span>
                            <span>{topic.mentorName}</span>
                        </div>
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className={`flex-1 overflow-y-auto custom-scrollbar ${sidebarBg}`}>
            {renderSection("FORUM INFORMATION", "INFO")}
            {renderSection("HOT TOPICS: THE PILOT GAP", "GAP")}
            {renderSection("PILOT PATHWAY DISCUSSIONS", "PATHWAY")}
        </div>
    );
  };

  const renderGate = () => (
    <div className={`relative min-h-screen flex items-center justify-center animate-in fade-in duration-700 p-6 ${pageBg}`}>
        <div className={`absolute inset-0 z-0 ${isDarkMode ? 'bg-slate-950/90' : 'bg-slate-50/90'}`}></div>
        <div className={`absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-20`} style={{backgroundImage: `url(${images.ABOUT_BG})`}}></div>
        
        <div className={`relative z-10 max-w-3xl w-full border-2 p-8 md:p-12 rounded-lg shadow-2xl flex flex-col
                        ${isDarkMode ? 'border-blue-500/20 bg-slate-900/90' : 'border-blue-500/20 bg-white/95'}`}>
             
             <button 
                onClick={onBackToLanding}
                className={`absolute top-6 left-6 text-xs font-bold uppercase tracking-widest hover:underline ${textSecondary}`}
             >
                <i className="fas fa-arrow-left mr-2"></i> Back
             </button>

             <div className="text-center mb-10 mt-6">
                 <h1 className={`text-4xl md:text-5xl font-bold brand-font uppercase tracking-wider mb-2 ${textPrimary}`}>
                    THE PILOT GAP FORUM
                 </h1>
                 <p className={`text-sm font-mono tracking-widest ${textSecondary}`}>SECURE CHANNEL • PILOTS ONLY</p>
                 <div className="w-24 h-1 bg-blue-500 mx-auto mt-6"></div>
             </div>

             <div className={`mb-12 max-w-xl mx-auto p-6 md:p-8 rounded-xl backdrop-blur-md transition-all duration-300
                            ${isDarkMode ? 'bg-white/5 border border-white/10' : 'bg-white/50 border border-black/5 shadow-inner'}`}>
                 <p className={`text-lg leading-relaxed ${textBody} font-['Raleway'] text-center mb-6`}>
                    This is the command center for navigating the industry's toughest phase.
                 </p>
                 <p className={`text-base leading-relaxed ${textSecondary} font-['Raleway'] text-center mb-6`}>
                    Access critical discussions on career gaps, airline hiring realities, and advanced training strategies. Connect with mentors who have bridged the gap.
                 </p>
                 <div className="flex justify-center space-x-2">
                    {['SPL', 'PPL', 'IR', 'CPL', 'ME'].map(tag => (
                        <span key={tag} className={`text-[10px] font-bold px-2 py-1 rounded bg-slate-700 text-slate-300 border border-slate-600`}>
                            {tag}
                        </span>
                    ))}
                 </div>
             </div>

             <div className={`pt-8 border-t ${borderBase}`}>
                 <h3 className={`text-center font-mono text-sm font-bold uppercase tracking-widest mb-6 ${textSecondary}`}>
                    {isLoggedIn ? 'ACCESS GRANTED: WINGMENTOR MEMBER' : 'SECURE ACCESS PROTOCOL: FORUM'}
                 </h3>
                 
                 {isLoggedIn ? (
                     <div className="text-center">
                         <button 
                             onClick={() => setHasAccess(true)}
                             className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded shadow-lg mt-2
                                         ${isDarkMode 
                                             ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20' 
                                             : 'bg-blue-700 hover:bg-blue-600 text-white shadow-blue-200'}`}
                         >
                             ACCESS FORUM
                         </button>
                     </div>
                 ) : (
                     <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
                         <div>
                            <input 
                                type="text" 
                                placeholder="USERNAME / CALLSIGN" 
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`w-full p-3 text-sm font-mono border rounded focus:outline-none focus:border-blue-500 transition-colors
                                           ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-100 border-slate-300 text-black'}`}
                            />
                         </div>
                         <div>
                            <input 
                                type="password" 
                                placeholder="PASSWORD" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full p-3 text-sm font-mono border rounded focus:outline-none focus:border-blue-500 transition-colors
                                           ${isDarkMode ? 'bg-slate-800 border-slate-600 text-white' : 'bg-slate-100 border-slate-300 text-black'}`}
                            />
                         </div>
                         <button 
                            type="submit"
                            className={`w-full py-4 font-bold uppercase tracking-widest text-sm transition-all duration-300 rounded shadow-lg mt-2
                                       ${isLoggingIn 
                                         ? 'bg-slate-600 cursor-wait' 
                                         : isDarkMode 
                                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20' 
                                            : 'bg-blue-700 hover:bg-blue-600 text-white shadow-blue-200'}`}
                         >
                            {isLoggingIn ? 'AUTHENTICATING...' : 'INITIATE ACCESS'}
                         </button>
                     </form>
                 )}
             </div>
        </div>
    </div>
  );

  if (isLoading) {
    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center animate-in fade-in duration-500">
            <div className="relative">
                <img 
                    src={images.PILOT_GAP_LOGO} // Use new Pilot Gap Logo
                    alt="Loading..." 
                    className="w-32 h-32 md:w-48 md:h-48 object-contain"
                    style={{ animation: 'logo-glow-pulse 2s infinite ease-in-out' }}
                />
            </div>
            <div className="mt-8 flex flex-col items-center space-y-2">
                <div className="text-yellow-500/80 font-mono text-xs uppercase tracking-[0.3em] animate-pulse">
                    Establishing Secure Link
                </div>
                <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-yellow-500/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1 h-1 bg-yellow-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1 h-1 bg-yellow-500/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
  }

  if (!hasAccess) {
      return renderGate();
  }

  return (
    <div 
      className={`relative min-h-screen animate-in fade-in duration-700 font-sans transition-colors bg-cover bg-center`}
      style={{ backgroundImage: `url(${images.FORUM_BG})` }} // Using FORUM_BG for the Pilot Gap Forum background
    > 
      {/* Overlay for readability */}
      <div className={`absolute inset-0 z-0 ${isDarkMode ? 'bg-black/70' : 'bg-white/70'}`}></div>

      <div className="relative z-10 w-full min-h-screen flex flex-col pt-24 md:pt-32 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
        
        <div className={`flex-shrink-0 flex justify-between items-end mb-6 pb-6 border-b ${borderBase}`}>
             <div>
                 <button 
                    onClick={onBackToLanding}
                    className={`text-[10px] md:text-xs font-bold uppercase tracking-widest ${textSecondary} hover:${textPrimary} mb-3 flex items-center space-x-2 transition-opacity`}>
                    <i className="fas fa-arrow-left"></i> <span>WING MENTOR OPS</span>
                 </button>
                 <div>
                    <h1 className={`text-3xl md:text-5xl font-bold uppercase brand-font tracking-tight leading-none ${forumHeadingColor}`}>
                        THE PILOT GAP FORUM
                    </h1>
                 </div>
             </div>
             <div className={`hidden md:block text-right ${textSecondary} font-mono text-xs`}>
                 <div className="font-bold">STA: WING_MENTOR_OPS</div>
                 <div>FREQ: 121.500</div>
                 <div>MODE: SECURE</div>
             </div>
        </div>

        <div className={`flex-1 flex overflow-hidden rounded-xl border shadow-2xl relative
                        ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-300 bg-white'}`}>
            
            <div className={`w-full lg:w-1/3 flex flex-col border-r ${borderBase} 
                            ${isMobileDetailOpen ? 'hidden lg:flex' : 'flex'}`}>
                {renderTopicList()}
            </div>

            <div className={`w-full lg:w-2/3 flex flex-col relative ${contentBg}
                            ${!isMobileDetailOpen ? 'hidden lg:flex' : 'flex'}`}>
                
                <div className={`lg:hidden p-4 border-b ${borderBase} flex items-center text-xs font-bold uppercase tracking-widest`}>
                    <button onClick={handleBackToList} className={`flex items-center space-x-2 ${textSecondary} hover:${textPrimary}`}>
                        <i className="fas fa-chevron-left"></i>
                        <span>Back to Index</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-8">
                    {activeTopic && (
                        <div className="pb-8 animate-in fade-in duration-500">
                            <div className={`rounded-lg border shadow-lg overflow-hidden
                                            ${isDarkMode ? 'bg-slate-800 border-slate-600' : 'bg-slate-100 border-slate-300'}`}>
                                 <div className={`px-4 py-2 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest border-b
                                                 ${isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-400' : 'bg-slate-200 border-slate-300 text-slate-600'}`}>
                                     <span>FLIGHT DISPATCH</span>
                                     <span>PRIORITY: <span className={`${getSeverityColor(activeTopic.severity)}`}>{activeTopic.severity}</span></span>
                                 </div>
                                 <div className="p-4 space-y-2">
                                     <div className="flex justify-between font-mono text-xs">
                                         <span className={textSecondary}>FROM: <span className={textPrimary}>{activeTopic.mentorName} / {activeTopic.role}</span></span>
                                         <span className={textSecondary}>VALID: <span className={textPrimary}>{activeTopic.date} {activeTopic.zuluTime}</span></span>
                                     </div>
                                     <div className="flex justify-between font-mono text-xs">
                                         <span className={textSecondary}>TO: <span className={textPrimary}>ALL PILOT CREW</span></span>
                                         <span className={textSecondary}>TYPE: <span className={textPrimary}>{activeTopic.category}</span></span>
                                     </div>
                                     <h2 className={`font-bold brand-font text-xl md:text-2xl leading-tight mt-4 ${forumHeadingColor}`}>
                                        SUBJ: <span className={textHighlight}>{activeTopic.title}</span>
                                     </h2>
                                 </div>
                            </div>
                        </div>
                    )}
                    {renderContent()}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
