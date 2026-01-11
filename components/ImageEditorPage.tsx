import React, { useState, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';
import { useTheme } from '../context/ThemeContext';
import { IMAGES } from '../constants';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

interface ImageEditorPageProps {
  onBackToHub: () => void;
}

export const ImageEditorPage: React.FC<ImageEditorPageProps> = ({ onBackToHub }) => {
  const { config, updateImage, resetImages } = useConfig();
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [editValues, setEditValues] = useState<{ [key: string]: string }>({});

  // Image Generation States
  const [generationPrompt, setGenerationPrompt] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState<boolean>(false);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(hasKey);
      }
    };
    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setEditValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = (key: keyof typeof IMAGES) => {
    if (editValues[key] !== undefined) {
      updateImage(key, editValues[key]);
    }
  };

  const handleGenerateImage = async () => {
    if (!generationPrompt.trim()) {
      setGenerationError('Please enter a prompt to generate an image.');
      return;
    }

    setIsGenerating(true);
    setGeneratedImageUrl(null);
    setGenerationError(null);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
        throw new Error("API Key is missing. Please select a valid key via the [ACTIVATE AI UPLINK] button.");
      }

      const ai = new GoogleGenAI({ apiKey });
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: generationPrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          },
        },
      });

      let base64EncodeString: string | undefined;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            base64EncodeString = part.inlineData.data;
            break;
          }
        }
      }

      if (base64EncodeString) {
        setGeneratedImageUrl(`data:image/png;base64,${base64EncodeString}`);
      } else {
        setGenerationError('No image data found in the response.');
      }
    } catch (error: any) {
      console.error('Image generation failed:', error);
      if (error.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        setGenerationError("API Key session expired or invalid. Please re-activate uplink.");
      } else {
        setGenerationError(`Generation failed: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyGeneratedImageUrl = () => {
    if (generatedImageUrl) {
      const base64Data = generatedImageUrl.split(',')[1];
      navigator.clipboard.writeText(base64Data)
        .then(() => alert('Image data (Base64) copied to clipboard!'))
        .catch(err => console.error('Failed to copy image URL:', err));
    }
  };

  const imageKeys = Object.keys(config.images) as (keyof typeof IMAGES)[];
  const filteredKeys = imageKeys.filter(key => key.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className={`min-h-screen p-8 transition-colors ${isDarkMode ? 'bg-black text-white' : 'bg-zinc-50 text-black'}`}>
      
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold brand-font uppercase tracking-widest text-yellow-500">
                <i className="fas fa-tools mr-3"></i> Backend Image Editor
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Update system assets and backgrounds globally.
            </p>
        </div>
        <div className="flex items-center gap-4">
            {!hasApiKey && (
              <button 
                onClick={handleSelectKey}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-500 rounded transition-all text-xs font-bold uppercase tracking-widest animate-pulse shadow-lg shadow-blue-600/20"
              >
                <i className="fas fa-key mr-2"></i> Activate AI Uplink
              </button>
            )}
            <button 
                onClick={resetImages}
                className="px-4 py-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded transition-colors text-xs font-bold uppercase tracking-widest"
            >
                Reset All Defaults
            </button>
            <button 
                onClick={onBackToHub}
                className={`px-6 py-2 rounded font-bold uppercase tracking-widest text-xs transition-colors
                            ${isDarkMode ? 'bg-zinc-800 hover:bg-zinc-700 text-white' : 'bg-white hover:bg-zinc-200 text-black shadow'}`}
            >
                <i className="fas fa-arrow-left mr-2"></i> Back to Hub
            </button>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto p-6 rounded-lg border flex flex-col space-y-4 shadow-lg mb-8
                       ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <h2 className="text-xl font-bold brand-font uppercase tracking-widest text-blue-500 flex items-center">
          <i className="fas fa-magic mr-3"></i> AI Image Generation
        </h2>

        {!hasApiKey ? (
          <div className="text-center py-10">
             <i className="fas fa-lock text-4xl text-zinc-700 mb-4"></i>
             <p className="text-sm font-bold uppercase tracking-widest text-zinc-500 mb-6">AI Generation requires an active satellite link</p>
             <button 
                onClick={handleSelectKey}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold uppercase tracking-widest text-sm shadow-xl"
             >
                Initialize API Key Selection
             </button>
             <p className="text-[10px] text-zinc-600 mt-4">Note: Gemini 3 Pro requires a billing-enabled API key. See <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="underline">billing docs</a>.</p>
          </div>
        ) : (
          <>
            <div className="flex-1">
              <label className={`block text-[10px] uppercase font-bold mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>
                Image Generation Prompt
              </label>
              <textarea
                value={generationPrompt}
                onChange={(e) => setGenerationPrompt(e.target.value)}
                className={`w-full p-2 text-xs font-mono rounded border resize-y h-24 focus:outline-none focus:border-blue-500
                            ${isDarkMode ? 'bg-black border-zinc-700 text-zinc-300' : 'bg-zinc-50 border-zinc-300 text-zinc-800'}`}
                placeholder="Describe the image you want to generate (e.g., 'A modern aircraft landing at sunset, cinematic lighting')"
              />
            </div>
            <button
              onClick={handleGenerateImage}
              disabled={isGenerating || !generationPrompt.trim()}
              className={`px-6 py-3 rounded font-bold uppercase tracking-wider transition-all
                          ${isGenerating || !generationPrompt.trim()
                            ? 'bg-zinc-700/50 text-zinc-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20'}`}
            >
              {isGenerating ? (
                <span className="flex items-center justify-center">
                  <i className="fas fa-spinner fa-spin mr-2"></i> Generating Asset...
                </span>
              ) : (
                'Execute Image Generation'
              )}
            </button>
          </>
        )}

        {generationError && (
          <div className="text-red-500 text-sm mt-4 p-3 border border-red-700 bg-red-900/20 rounded">
            <i className="fas fa-exclamation-circle mr-2"></i> {generationError}
          </div>
        )}

        {generatedImageUrl && (
          <div className="mt-4 p-4 border border-zinc-700 rounded-lg bg-black/50">
            <h3 className={`text-sm uppercase font-bold mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
              Generated Image Preview
            </h3>
            <div className="w-full h-64 bg-zinc-800 rounded overflow-hidden flex items-center justify-center border border-zinc-600 mb-4">
              <img src={generatedImageUrl} alt="Generated" className="w-full h-full object-contain" />
            </div>
            <button
              onClick={handleCopyGeneratedImageUrl}
              className={`w-full px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all
                          bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20`}
            >
              <i className="fas fa-copy mr-2"></i> Copy Base64 String
            </button>
            <p className={`text-[10px] text-zinc-500 mt-2 text-center`}>
              Copy this string and paste it into the URL field of an image key below to update the UI.
            </p>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto mb-8">
        <input 
            type="text" 
            placeholder="Filter Assets by Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-4 rounded-lg border font-mono text-sm focus:outline-none focus:border-yellow-500
                        ${isDarkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-white border-zinc-300 text-black'}`}
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
        {filteredKeys.map((key) => {
            const currentUrl = config.images[key];
            const editedUrl = editValues[key] !== undefined ? editValues[key] : currentUrl;
            const isChanged = editedUrl !== currentUrl;

            return (
                <div key={key} className={`p-4 rounded-lg border flex flex-col space-y-4 shadow-lg
                                         ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200'}`}>
                    <div className="flex justify-between items-center border-b pb-2 border-zinc-700/50">
                        <span className="font-mono text-xs font-bold text-yellow-500 truncate" title={key}>{key}</span>
                        {isChanged && <span className="text-[10px] bg-yellow-500 text-black px-1 rounded font-bold">DIRTY</span>}
                    </div>
                    
                    <div className="w-full h-32 bg-black/50 rounded overflow-hidden flex items-center justify-center border border-zinc-700">
                        <img src={editedUrl} alt={key} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1">
                        <label className={`block text-[10px] uppercase font-bold mb-1 ${isDarkMode ? 'text-zinc-500' : 'text-zinc-400'}`}>Asset source (URL / BASE64)</label>
                        <textarea
                            value={editedUrl}
                            onChange={(e) => handleInputChange(key, e.target.value)}
                            className={`w-full p-2 text-xs font-mono rounded border resize-none h-20 focus:outline-none focus:border-yellow-500
                                      ${isDarkMode ? 'bg-black border-zinc-700 text-zinc-300' : 'bg-zinc-50 border-zinc-300 text-zinc-800'}`}
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                         <button 
                            onClick={() => handleSave(key)}
                            disabled={!isChanged}
                            className={`px-4 py-2 rounded text-xs font-bold uppercase tracking-wider transition-all
                                      ${isChanged 
                                        ? 'bg-yellow-600 hover:bg-yellow-500 text-white shadow-lg shadow-yellow-900/20' 
                                        : 'bg-zinc-700/50 text-zinc-500 cursor-not-allowed'}`}
                        >
                            Sync Change
                        </button>
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};