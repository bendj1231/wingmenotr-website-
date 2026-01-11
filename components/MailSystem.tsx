import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useTheme } from '../context/ThemeContext';
import { GoogleGenAI } from "@google/genai";

interface MailSystemProps {
  onBackToHub: () => void;
}

interface Message {
  id: string;
  from: string;
  subject: string;
  body: string;
  date: string;
  time: string;
  read: boolean;
  priority: 'URGENT' | 'NORMAL' | 'NOTAM';
  level: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    from: 'CHIEF MENTOR',
    subject: 'ONBOARDING PHASE COMPLETE: ALPHA BATCH',
    body: 'Greetings Pilot. Your initial onboarding phase is complete. Please report to the Black Box for your next set of technical manuals. Success in this program depends on your commitment to the verifiable experience protocols.',
    date: '15 NOV 2024',
    time: '08:00Z',
    read: false,
    priority: 'URGENT',
    level: 'CPL'
  },
  {
    id: '2',
    from: 'FLIGHT DISPATCH',
    subject: 'NEW NOTAM: SYSTEM UPDATES',
    body: 'Attention all Wing Mentors. The terminal interface has been upgraded to support real-time messaging. Ensure your local persistence protocol is active before logging out.',
    date: '14 NOV 2024',
    time: '12:30Z',
    read: true,
    priority: 'NOTAM',
    level: 'INFO'
  },
  {
    id: '3',
    from: 'AIRLINE RECRUITER',
    subject: 'FOLLOW UP: WINGMENTOR VERIFICATION',
    body: 'We have received your mentorship logbook. The verifiable hours are currently under review by our HR department. Please ensure your Wing Passport is stamped and up to date.',
    date: '10 NOV 2024',
    time: '09:15Z',
    read: true,
    priority: 'NORMAL',
    level: 'MENTOR'
  }
];

export const MailSystem: React.FC<MailSystemProps> = ({ onBackToHub }) => {
  const { isDarkMode } = useTheme();
  const { config } = useConfig();
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [selectedId, setSelectedId] = useState<string | null>(MOCK_MESSAGES[0].id);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiDraft, setAiDraft] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const activeMessage = messages.find(m => m.id === selectedId);

  const handleMessageClick = (id: string) => {
    setSelectedId(id);
    setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const handleAiDraft = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    setAiDraft('');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are a professional aviation career assistant. Draft a formal, concise, and highly professional email based on this request: "${aiPrompt}". Use pilot terminology and maintain a command-like tone.`,
      });
      setAiDraft(response.text || "Draft could not be generated.");
    } catch (err) {
      console.error(err);
      setAiDraft("Communication failure with Gemini Uplink.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans flex flex-col ${isDarkMode ? 'bg-black text-white' : 'bg-zinc-50 text-black'}`}>
      
      {/* Header Bar */}
      <div className={`px-6 py-4 border-b flex items-center justify-between ${isDarkMode ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'}`}>
        <div className="flex items-center space-x-4">
          <button onClick={onBackToHub} className={`text-sm font-bold uppercase tracking-widest flex items-center space-x-2 transition-opacity hover:opacity-70`}>
            <i className="fas fa-arrow-left"></i> <span>Terminal Hub</span>
          </button>
          <div className={`h-6 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`}></div>
          <h1 className="brand-font text-xl md:text-2xl font-bold uppercase tracking-tighter">
            Flight Dispatch Mail <span className="text-blue-500 text-xs font-mono ml-2 animate-pulse">SECURE LINK</span>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setIsAiModalOpen(true)}
            className={`px-4 py-2 rounded font-bold uppercase tracking-widest text-xs transition-all shadow-lg
                       ${isDarkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-700 hover:bg-blue-600 text-white'}`}
          >
            <i className="fas fa-magic mr-2"></i> AI Draft Assistant
          </button>
          <div className="text-right hidden md:block">
            <p className="text-[9px] font-mono font-bold text-zinc-500">STA: DISPATCH_CENTRAL</p>
            <p className="text-[9px] font-mono font-bold text-green-500">ENCRYPTION: AES-256</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Thread List Sidebar */}
        <div className={`w-full md:w-80 flex flex-col border-r ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
          <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
            <div className="space-y-2">
              {messages.map(msg => (
                <button
                  key={msg.id}
                  onClick={() => handleMessageClick(msg.id)}
                  className={`w-full text-left p-4 rounded-lg transition-all border flex flex-col
                             ${selectedId === msg.id 
                               ? 'bg-blue-900/10 border-blue-500 shadow-[inset_0_0_15px_rgba(59,130,246,0.1)]' 
                               : `hover:bg-zinc-800/20 border-transparent`}`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded
                                     ${msg.priority === 'URGENT' ? 'bg-red-500/20 text-red-500' : msg.priority === 'NOTAM' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-zinc-500/20 text-zinc-500'}`}>
                      {msg.priority}
                    </span>
                    {!msg.read && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
                  </div>
                  <h4 className={`text-sm font-bold truncate ${selectedId === msg.id ? 'text-blue-400' : isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {msg.from}
                  </h4>
                  <p className="text-[10px] text-zinc-500 truncate mb-1">{msg.subject}</p>
                  <div className="flex justify-between items-center mt-2 text-[8px] font-mono text-zinc-600">
                    <span>{msg.date}</span>
                    <span className="bg-zinc-800 px-1 rounded text-zinc-400">{msg.level}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Message Content Viewer */}
        <div className="flex-1 flex flex-col relative overflow-hidden bg-white dark:bg-zinc-950">
          {activeMessage ? (
            <div className="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto custom-scrollbar animate-in fade-in duration-500">
              <div className="max-w-3xl mx-auto w-full">
                <div className="flex justify-between items-start mb-8 border-b pb-8 border-zinc-200 dark:border-zinc-800">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold brand-font uppercase mb-1">{activeMessage.subject}</h2>
                    <p className="text-sm font-mono text-zinc-500">FROM: <span className="text-blue-500">{activeMessage.from}</span></p>
                  </div>
                  <div className="text-right font-mono text-[10px] text-zinc-600">
                    <p>SENT: {activeMessage.date}</p>
                    <p>TIME: {activeMessage.time}</p>
                  </div>
                </div>

                <div className="notam-font text-lg leading-relaxed text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap mb-16">
                  {activeMessage.body}
                </div>

                <div className="mt-auto border-t pt-8 border-zinc-200 dark:border-zinc-800">
                   <div className="flex space-x-4">
                      <button className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded font-bold uppercase tracking-widest text-xs transition-all">
                        Reply
                      </button>
                      <button className="flex-1 py-3 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded font-bold uppercase tracking-widest text-xs transition-all">
                        Forward
                      </button>
                      <button className="px-6 py-3 border border-zinc-200 dark:border-zinc-800 hover:bg-red-500/10 text-red-500 rounded font-bold uppercase tracking-widest text-xs transition-all">
                        Archive
                      </button>
                   </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-500">
               <i className="fas fa-inbox text-5xl mb-4 opacity-20"></i>
               <p className="text-xs uppercase tracking-widest font-bold">Select a message to display contents</p>
            </div>
          )}
        </div>
      </div>

      {/* AI DRAFT MODAL */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className={`w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col ${isDarkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-white'}`}>
            <div className={`p-6 border-b flex justify-between items-center ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
              <h3 className="text-xl font-bold brand-font text-blue-500 uppercase tracking-widest flex items-center">
                <i className="fas fa-robot mr-3"></i> Gemini AI Draft Assistant
              </h3>
              <button onClick={() => setIsAiModalOpen(false)} className="text-zinc-500 hover:text-white transition-colors">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider mb-2 block">What do you want to communicate?</label>
                <textarea 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g. Draft a professional request to a Senior Mentor for an IFR review session."
                  className={`w-full p-4 rounded border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all h-32
                             ${isDarkMode ? 'bg-black border-zinc-800 text-white' : 'bg-zinc-50 border-zinc-300 text-black'}`}
                />
              </div>

              <button
                onClick={handleAiDraft}
                disabled={isGenerating || !aiPrompt.trim()}
                className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm transition-all
                           ${isGenerating || !aiPrompt.trim() 
                             ? 'bg-zinc-700/50 text-zinc-500 cursor-not-allowed' 
                             : 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/20'}`}
              >
                {isGenerating ? (
                  <span className="flex items-center justify-center">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Initializing Gemini Uplink...
                  </span>
                ) : (
                  'Generate Official Draft'
                )}
              </button>

              {aiDraft && (
                <div className={`p-6 rounded-lg border animate-in slide-in-from-top-2 duration-300
                               ${isDarkMode ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
                  <h4 className="text-[10px] font-bold uppercase text-blue-500 mb-3 tracking-widest">Suggested Draft Output</h4>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap font-serif italic mb-4">
                    {aiDraft}
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(aiDraft);
                      alert('Draft copied to clipboard.');
                    }}
                    className="text-[10px] font-bold uppercase text-zinc-500 hover:text-blue-500 transition-colors"
                  >
                    <i className="fas fa-copy mr-1"></i> Copy to Clipboard
                  </button>
                </div>
              )}
            </div>
            
            <div className={`px-8 py-4 border-t text-center ${isDarkMode ? 'bg-zinc-950 border-zinc-800' : 'bg-zinc-100 border-zinc-200'}`}>
              <p className="text-[9px] text-zinc-500 uppercase tracking-widest">Warning: AI content should be verified before dispatch.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};