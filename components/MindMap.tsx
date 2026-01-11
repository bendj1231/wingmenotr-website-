import React, { useState, useEffect, useRef } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useTheme } from '../context/ThemeContext';

interface NodeData {
  id: string;
  title: string;
  icon?: string;
  image?: string;
  x: number; // Percentage (0-100)
  y: number; // Pixels
  parent?: string;
  color?: 'default' | 'red' | 'green' | 'blue' | 'gold';
  blink?: boolean;
  description: string;
  deadEnd?: boolean;
  supported?: boolean;
}

const NODES: NodeData[] = [
  // TRUNK
  { 
    id: 'student', 
    title: 'Student Pilot', 
    icon: 'fa-graduation-cap', 
    x: 50, 
    y: 50, 
    description: "The beginning of the journey. Mastering the fundamentals of flight, aerodynamics, regulations, and aircraft control. This is where the dream takes flight.",
    supported: true
  },
  { 
    id: 'private', 
    title: 'Private Pilot', 
    icon: 'fa-user', 
    x: 50, 
    y: 170, 
    parent: 'student',
    description: "The first major milestone. Earning the license to fly for leisure and carry passengers. Building cross-country experience and command authority.",
    supported: true
  },
  { 
    id: 'commercial', 
    title: 'Commercial Pilot', 
    icon: 'fa-user-tie', 
    x: 50, 
    y: 290, 
    parent: 'private',
    description: "The professional standard. You are now licensed to fly for compensation. However, you likely have only ~200 hours, far short of airline requirements.",
    supported: true
  },
  
  // BRANCHES (SPLIT FROM COMMERCIAL)
  { 
    id: 'me', 
    title: 'Multi-Engine', 
    icon: 'fa-cogs', 
    x: 10, 
    y: 450, 
    parent: 'commercial',
    deadEnd: true,
    description: "Dead End. Qualified to fly twin-engine aircraft. A valuable rating, but without 1500 hours, it often leads to a dead end in the job market.",
    supported: false
  },
  { 
    id: 'ir', 
    title: 'Instrument Rating', 
    icon: 'fa-tachometer-alt', 
    x: 30, 
    y: 450, 
    parent: 'commercial',
    deadEnd: true,
    description: "Dead End. Qualified to fly in clouds and low visibility. Critical for safety, yet this rating alone does not solve the employment gap immediately.",
    supported: false
  },
  { 
    id: 'gap', 
    title: 'Low Timer Gap', 
    icon: 'fa-exclamation-triangle', 
    x: 50, 
    y: 450, 
    parent: 'commercial',
    color: 'red',
    blink: true,
    description: "CRITICAL ALERT: THE LOW TIMER GAP. You have the licenses (CPL, IR, ME) but lack the 1500+ hours airlines demand. You are 'overqualified' for basic jobs but 'under-experienced' for careers. This is the 'Death Valley' where 85% of pilots quit due to lack of opportunity and skill decay.",
    supported: false
  },
  { 
    id: 'recurrency', 
    title: 'Recurrency', 
    icon: 'fa-sync-alt', 
    x: 70, 
    y: 450, 
    parent: 'commercial',
    deadEnd: true,
    description: "To renew a commercial pilot license, the holder must undergo a skill test (proficiency check) in accordance with PCAR Part 2. Airlines or Approved Training Organizations (ATOs) usually manage recurrent training and proficiency checks for their pilots, which must be documented.",
    supported: false
  },
  { 
    id: 'type', 
    title: 'Type Ratings', 
    icon: 'fa-plane', 
    x: 90, 
    y: 450, 
    parent: 'commercial',
    deadEnd: true,
    description: "Dead End. Specific aircraft certifications (e.g., A320, B737). An expensive gamble ($30k+) that is risky without a guaranteed job offer, often leading to currency expiry and wasted funds.",
    supported: false
  },

  // CONTINUATION (FROM GAP)
  { 
    id: 'wing', 
    title: 'Wing Mentorship', 
    image: "https://lh3.googleusercontent.com/d/1U7pwMY1-ZsvNYC0Np3fVw5OhW3rTD5DR",
    x: 50, 
    y: 600, 
    parent: 'gap',
    color: 'green',
    description: "THE SOLUTION: Wing Mentor Program. We bridge the gap by providing a structured platform to build verifiable mentorship experience. We are NOT a flight school; we are a consultation and support community that turns your downtime into credible aviation experience.",
    supported: false
  },

  // WING MENTOR CHILDREN (7 NODES)
  { 
    id: 'logs', 
    title: 'Verifiable Experience', 
    icon: 'fa-file-signature', 
    x: 11, 
    y: 850, 
    parent: 'wing',
    color: 'blue',
    description: "The Paper Trail. We provide a structured system to log your mentorship hours and mentee feedback. This transforms 'helping a friend' into credible, documented industry experience that you can present to future employers.",
    supported: false
  },
  { 
    id: 'consultation', 
    title: 'Hands-on Consultation', 
    icon: 'fa-user-md', 
    x: 24, 
    y: 850, 
    parent: 'wing',
    color: 'blue',
    description: "The 'Doctor' Scenario. Unlike a flight instructor who teaches from scratch, you act as a consultant. You receive grading sheets from mentees, diagnose the root causes of their errors, and provide targeted solutions. This builds elite troubleshooting skills.",
    supported: false
  },
  { 
    id: 'softskills', 
    title: 'CRM & Soft Skills', 
    icon: 'fa-users', 
    x: 37, 
    y: 850, 
    parent: 'wing',
    color: 'blue',
    description: "Airlines hire people, not just pilots. Through the program, you demonstrate the ability to communicate, empathize, and lead fellow aviators. You gain tangible examples of 'Conflict Resolution' and 'Leadership' for your behavioral interviews.",
    supported: false
  },
  { 
    id: 'outcome', 
    title: 'Competitive Advantage', 
    icon: 'fa-trophy', 
    x: 50, 
    y: 850, 
    parent: 'wing',
    color: 'gold',
    description: "THE RESULT: You walk into an interview not just with a license, but with a portfolio of success. You have proven you can solve problems, support a team, and maintain professional standards during the 'Gap'. You are no longer a liability; you are a proven asset.",
    supported: false
  },
  { 
    id: 'retention', 
    title: 'Active Recurrency', 
    icon: 'fa-brain', 
    x: 63, 
    y: 850, 
    parent: 'wing',
    color: 'blue',
    description: "Use it or lose it. If you did Ground School 3 years ago, you are losing sharpness. By guiding others, you force yourself to recall, explain, and apply complex aviation theory, keeping you 'Checkride Ready' at all times.",
    supported: false
  },
  { 
    id: 'instructor_ready', 
    title: 'Instructor Ready', 
    icon: 'fa-chalkboard-teacher', 
    x: 76, 
    y: 850, 
    parent: 'wing',
    color: 'blue',
    description: "The ultimate prep for your Ground Instructor (GI) or CFI practicals. You aren't just reading books; you are practicing mentorship with real people. You enter your instructor checkride with experience your competitors simply don't have.",
    supported: false
  },
  {
    id: 'interview_ready',
    title: 'Interview Ready',
    icon: 'fa-user-tie',
    x: 89, 
    y: 850,
    parent: 'wing',
    color: 'blue',
    description: "Specific preparation for airline screenings. You learn to articulate your mentorship experiences to answer behavioral questions (e.g., 'Tell me about a time you handled a colleague'). You build the confidence to ace the HR panel.",
    supported: false
  }
];

export const MindMap: React.FC = () => {
  const { config } = useConfig();
  const { images } = config;
  const { isDarkMode } = useTheme();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [visibleNodes, setVisibleNodes] = useState<Set<string>>(() => new Set(['student']));
  
  const deepestY = Math.max(...Array.from(visibleNodes).map(nodeId => NODES.find(n => n.id === nodeId)?.y || 0));
  const containerHeight = Math.max(300, deepestY + 300);

  const lineColor = isDarkMode ? 'white' : '#52525b'; // Zinc-600 for light mode

  const hasChildren = (nodeId: string) => NODES.some(n => n.parent === nodeId);
  const getChildrenIds = (nodeId: string) => NODES.filter(n => n.parent === nodeId).map(n => n.id);

  const toggleNodeExpansion = (nodeId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const children = getChildrenIds(nodeId);
    if (children.length === 0) return;

    const newVisible = new Set(visibleNodes);
    const areChildrenVisible = children.every(id => newVisible.has(id));

    if (areChildrenVisible) {
        if (e) {
             const hideRecursively = (ids: string[]) => {
                ids.forEach(id => {
                  newVisible.delete(id);
                  const grandChildren = getChildrenIds(id);
                  if (grandChildren.length > 0) hideRecursively(grandChildren);
                });
              };
              hideRecursively(children);
              setVisibleNodes(newVisible);
        }
    } else {
      children.forEach(id => newVisible.add(id));
      setVisibleNodes(newVisible);
    }
  };

  const getNodeStyle = (node: NodeData, isHovered: boolean) => {
    let base = `transition-all duration-300 cursor-pointer absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center p-3 rounded-xl w-28 md:w-32 text-center shadow-2xl group`;
    
    const zIndex = isHovered ? 'z-50' : 'z-20';
    const scale = isHovered ? 'scale-110' : 'scale-100';
    const bg = isDarkMode ? "bg-black" : "bg-white";

    let border = isDarkMode ? "border-2 border-white" : "border-2 border-zinc-300";
    let text = isDarkMode ? "text-white" : "text-zinc-900";
    let shadow = isDarkMode ? "hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]" : "hover:shadow-xl";

    if (node.color === 'red') {
      border = "border-2 border-red-600";
      text = "text-red-500";
      shadow = `shadow-[0_0_20px_rgba(220,38,38,0.6)] ${node.blink ? 'animate-pulse' : ''}`;
    } else if (node.color === 'green') {
      border = "border-2 border-green-500";
      text = "text-green-500"; // Darker green for visibility on white
      shadow = "shadow-[0_0_20px_rgba(34,197,94,0.6)]";
    } else if (node.color === 'blue') {
        border = "border-2 border-blue-500";
        text = "text-blue-500";
        shadow = "shadow-[0_0_20px_rgba(59,130,246,0.4)]";
    } else if (node.color === 'gold') {
        border = "border-2 border-yellow-500";
        text = "text-yellow-500";
        shadow = "shadow-[0_0_25px_rgba(234,179,8,0.6)]";
    }

    return `${base} ${zIndex} ${scale} ${bg} ${border} ${text} ${shadow}`;
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-10 relative select-none">
      
      <div 
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-500 z-40 pointer-events-none
                    ${hoveredNodeId ? 'opacity-100' : 'opacity-0'}`}
      ></div>

      {/* Removed min-w-[900px] to ensure centering within the 680px root */}
      <div 
        className={`relative w-full overflow-hidden transition-all duration-1000 ease-in-out border-b rounded-b-3xl ${isDarkMode ? 'border-zinc-800/50' : 'border-zinc-300'}`}
        style={{ height: `${containerHeight}px` }}
      >
        
        <div
            className="absolute top-12 left-0 right-0 bottom-0 bg-top bg-no-repeat z-0"
            style={{ 
              backgroundImage: `url(${images.MINDMAP_SECTION_BG})`,
              backgroundSize: '100% auto' 
            }}
        >
            <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/80' : 'bg-white/80'}`}></div>
        </div>

        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
            <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={lineColor} />
            </marker>
            </defs>
            {NODES.map(node => {
                if (!node.parent) return null;
                const parent = NODES.find(n => n.id === node.parent);
                if (!parent) return null;

                if (!visibleNodes.has(node.id) || !visibleNodes.has(parent.id)) return null;

                return (
                    <g key={`${parent.id}-${node.id}`} className="animate-in fade-in duration-1000 delay-300">
                    <line 
                        x1={`${parent.x}%`} 
                        y1={parent.y} 
                        x2={`${node.x}%`} 
                        y2={node.y} 
                        stroke={lineColor} 
                        strokeWidth="2" 
                        markerEnd="url(#arrowhead)" 
                        opacity="0.5"
                    />
                    </g>
                );
            })}
        </svg>

        {NODES.map((node) => {
            if (!visibleNodes.has(node.id)) return null;

            const isParent = hasChildren(node.id);
            const children = getChildrenIds(node.id);
            const isExpanded = children.length > 0 && children.every(id => visibleNodes.has(id));
            const isHovered = hoveredNodeId === node.id;
            
            return (
                <div 
                    key={node.id}
                    id={`node-${node.id}`}
                    className={`animate-in zoom-in fade-in slide-in-from-top-4 duration-700 ease-out fill-mode-forwards`} 
                >
                    <div 
                        className={getNodeStyle(node, isHovered)}
                        style={{ left: `${node.x}%`, top: `${node.y}px` }}
                        onMouseEnter={() => setHoveredNodeId(node.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                        onClick={isParent ? (e) => toggleNodeExpansion(node.id, e) : undefined}
                    >
                        {node.image ? (
                            <img src={node.image} alt={node.title} className="w-20 h-20 md:w-24 md:h-24 object-contain mb-2" />
                        ) : (
                            <i className={`fas ${node.icon} text-2xl mb-2`}></i>
                        )}
                        
                        <span className="text-[10px] md:text-xs font-bold uppercase leading-tight">{node.title}</span>
                        
                        {node.id === 'gap' && (
                            <span className="absolute -top-2 -right-2 flex h-3 w-3">
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        )}
                        
                        {isHovered && (
                            <div className={`absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 w-64 p-5 rounded-xl border-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-300 pointer-events-none
                                            ${isDarkMode ? 'bg-zinc-950/95' : 'bg-white/95'}
                                            ${node.color === 'red' ? 'border-red-600' : 
                                              node.color === 'green' ? 'border-green-500' : 
                                              node.color === 'blue' ? 'border-blue-500' :
                                              node.color === 'gold' ? 'border-yellow-500' : 
                                              isDarkMode ? 'border-white' : 'border-zinc-300'}
                                            `}>
                                <h3 className={`text-lg font-bold brand-font uppercase mb-2 text-left
                                            ${node.color === 'red' ? 'text-red-500' : 
                                                node.color === 'green' ? 'text-green-500' : 
                                                node.color === 'blue' ? 'text-blue-500' :
                                                node.color === 'gold' ? 'text-yellow-500' : 
                                                isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                                    {node.title}
                                </h3>
                                <p className={`text-xs font-sans text-left leading-relaxed mb-4 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                    {node.description}
                                </p>
                                {node.image && (
                                     <div className={`w-full h-24 rounded-lg overflow-hidden border mt-2 ${isDarkMode ? 'border-white/10' : 'border-black/10'}`}>
                                        <img src={node.image} alt="Detail" className="w-full h-full object-cover" />
                                     </div>
                                )}
                            </div>
                        )}
                        
                        {node.supported && (
                            <div className="absolute top-[calc(100%+28px)] left-1/2 transform -translate-x-1/2 flex items-center justify-center bg-[#00b14f] rounded-md px-2 py-0.5 whitespace-nowrap shadow-lg">
                                <i className="fas fa-check-circle text-[8px] text-white mr-1"></i>
                                <span className="text-[7px] font-bold text-white uppercase tracking-wider">Eligible for Wing Mentorship</span>
                            </div>
                        )}

                        {isParent && (
                            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 flex flex-col items-center z-30`}>
                                <button
                                    style={{ pointerEvents: 'none' }}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-lg transition-all duration-300
                                              ${isExpanded 
                                                ? 'bg-zinc-700/80 border-zinc-600 text-zinc-400 rotate-180 -mt-2' 
                                                : isDarkMode ? 'bg-zinc-800/80 border-zinc-700 text-zinc-400 mt-1' : 'bg-zinc-200/80 border-zinc-300 text-zinc-600 mt-1'}`}
                                >
                                    <i className="fas fa-chevron-up text-[9px]"></i>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            );
        })}
      </div>
      
      <div className="mt-20 text-center max-w-2xl mx-auto px-4 animate-in fade-in duration-1000 delay-500">
        <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8"></div>
        <h3 className={`text-2xl md:text-3xl font-bold brand-font uppercase tracking-widest mb-6 ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
          The Competitive Advantage
        </h3>
        <p className={`text-base md:text-lg font-light leading-relaxed notam-font ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
          "You walk into an interview not just with a license, but with a portfolio of success. You have proven you can solve problems, support a team, and maintain professional standards during the 'Gap'. You are no longer a liability; you are a proven asset."
        </p>
      </div>

    </div>
  );
};