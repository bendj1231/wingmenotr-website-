
import React, { useState } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useTheme } from '../context/ThemeContext';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onCancel: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onCancel }) => {
  const { config } = useConfig();
  const { isDarkMode } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for effect
    setTimeout(() => {
      // Enforce specific admin credentials (LEOPARD or TIGER)
      if ((username === 'LEOPARD' && password === 'RPC1993') || 
          (username === 'TIGER' && password === 'RPC1884')) {
        setIsLoading(false);
        onLoginSuccess();
      } else {
        setIsLoading(false);
        if (username.trim().length === 0 || password.trim().length === 0) {
            setError('CREDENTIALS REQUIRED');
        } else {
            setError('ACCESS DENIED: INVALID CREDENTIALS');
        }
      }
    }, 1500);
  };

  const handleGuestAccess = () => {
      // Cancel login and return to terminal
      onCancel();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden font-sans">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
            src={config.images.RUNWAY_HOLDING_POINT} 
            alt="Login Background" 
            className="w-full h-full object-cover opacity-40 filter blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center mb-10">
            <img 
                src={config.images.LOGO} 
                alt="Wing Mentor Logo" 
                className="w-24 h-24 object-contain mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
            />
            <h1 className="text-3xl font-bold brand-font text-white uppercase tracking-[0.2em] text-center">
                Wing Mentor
            </h1>
            <p className="text-zinc-400 text-xs uppercase tracking-widest mt-2">
                System Access Portal
            </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 bg-zinc-900/50 backdrop-blur-md p-8 rounded-xl border border-zinc-800 shadow-2xl">
            {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 text-xs font-bold uppercase p-3 rounded text-center animate-pulse">
                    {error}
                </div>
            )}
            
            <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Callsign / Username</label>
                <div className="relative">
                    <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs"></i>
                    <input 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-700 text-white pl-9 pr-4 py-3 rounded focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all text-sm font-mono tracking-wide placeholder-zinc-700"
                        placeholder="ENTER CALLSIGN"
                    />
                </div>
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-zinc-500 tracking-wider">Password</label>
                <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-xs"></i>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-black/50 border border-zinc-700 text-white pl-9 pr-4 py-3 rounded focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all text-sm font-mono tracking-wide placeholder-zinc-700"
                        placeholder="••••••••"
                    />
                </div>
            </div>

            <button 
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold uppercase tracking-widest text-xs rounded transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] flex justify-center items-center gap-2 ${isLoading ? 'opacity-80 cursor-wait' : ''}`}
            >
                {isLoading ? (
                    <>
                        <i className="fas fa-spinner fa-spin"></i> Authenticating...
                    </>
                ) : (
                    <>
                        Initialize System <i className="fas fa-power-off"></i>
                    </>
                )}
            </button>
        </form>

        <div className="mt-6 text-center">
            <button 
                onClick={handleGuestAccess}
                className="text-zinc-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors border-b border-transparent hover:border-white pb-0.5"
            >
                Cancel / Return to Terminal
            </button>
        </div>

        <div className="mt-12 flex justify-center space-x-2">
            <div className="w-1 h-1 bg-zinc-700 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-zinc-700 rounded-full animate-pulse delay-100"></div>
            <div className="w-1 h-1 bg-zinc-700 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};
