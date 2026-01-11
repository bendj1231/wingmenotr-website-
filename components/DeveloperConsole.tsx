import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';

interface DeveloperConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeveloperConsole: React.FC<DeveloperConsoleProps> = ({ isOpen, onClose }) => {
  const { config, updateConfig, resetConfig } = useConfig();
  const [tempVideoUrl, setTempVideoUrl] = useState(config.heroVideoUrl);

  useEffect(() => {
    if (isOpen) {
        setTempVideoUrl(config.heroVideoUrl);
    }
  }, [isOpen, config.heroVideoUrl]);

  if (!isOpen) return null;

  const handleSave = () => {
    updateConfig('heroVideoUrl', tempVideoUrl);
    onClose();
  };

  const handleReset = () => {
    if(window.confirm('Reset configuration to defaults?')) {
        resetConfig();
        onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-zinc-900 border border-yellow-500/50 p-8 rounded-lg max-w-lg w-full shadow-[0_0_50px_rgba(234,179,8,0.2)]">
        <h2 className="text-2xl font-bold text-yellow-500 mb-6 brand-font uppercase tracking-widest flex items-center">
            <i className="fas fa-terminal mr-3"></i> Developer Console
        </h2>
        
        <div className="space-y-6">
            <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                    Hero Video Source
                </label>
                <input 
                    type="text" 
                    value={tempVideoUrl}
                    onChange={(e) => setTempVideoUrl(e.target.value)}
                    className="w-full bg-black border border-zinc-700 text-white p-3 rounded focus:border-yellow-500 focus:outline-none font-mono text-sm"
                    placeholder="https://..."
                />
                <p className="text-[10px] text-zinc-500 mt-2">
                    Use a direct download link for video files (mp4).
                </p>
            </div>

            {/* Live Preview Area */}
            <div className="space-y-2">
                 <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Live Preview
                </label>
                <div className="w-full aspect-video bg-black border border-zinc-800 rounded overflow-hidden relative">
                    {tempVideoUrl ? (
                         // Using video tag for preview to match main page behavior
                         <video 
                            src={tempVideoUrl} 
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                         />
                    ) : (
                        <div className="flex items-center justify-center h-full text-zinc-600 text-xs">
                            No Video URL
                        </div>
                    )}
                </div>
            </div>
            
            <div className="p-4 bg-black/50 border border-zinc-800 rounded">
                <p className="text-xs text-zinc-400">
                    <i className="fas fa-info-circle mr-2"></i>
                    Changes are saved to your local browser storage and will persist across reloads.
                </p>
            </div>
        </div>

        <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-zinc-800">
            <button 
                onClick={handleReset}
                className="text-xs text-red-500 hover:text-red-400 font-bold uppercase tracking-wider mr-auto transition-colors"
            >
                Reset Default
            </button>
            <button 
                onClick={onClose}
                className="px-4 py-2 text-zinc-400 hover:text-white text-sm font-bold uppercase tracking-wider transition-colors"
            >
                Cancel
            </button>
            <button 
                onClick={handleSave}
                className="px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold uppercase tracking-wider rounded transition-colors shadow-lg shadow-yellow-600/20"
            >
                Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};