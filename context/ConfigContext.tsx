
import React, { createContext, useContext, useState, useEffect } from 'react';
import { IMAGES } from '../constants';

interface AppConfig {
  heroVideoUrl: string;
  cutSceneVideoUrl: string; // Added new config option
  images: typeof IMAGES;
}

interface ConfigContextType {
  config: AppConfig;
  updateConfig: (key: keyof AppConfig, value: any) => void;
  updateImage: (key: keyof typeof IMAGES, value: string) => void;
  resetConfig: () => void;
  resetImages: () => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AppConfig>({
    heroVideoUrl: IMAGES.HERO_VIDEO,
    cutSceneVideoUrl: IMAGES.CUT_SCENE_VIDEO, // Default to constant
    images: { ...IMAGES },
  });

  useEffect(() => {
    const saved = localStorage.getItem('wingmentor_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Deep merge logic simplified:
        const mergedImages = parsed.images 
          ? { ...IMAGES, ...parsed.images } 
          : { ...IMAGES };
          
        setConfig(prev => ({ 
          ...prev, 
          ...parsed,
          cutSceneVideoUrl: parsed.cutSceneVideoUrl || IMAGES.CUT_SCENE_VIDEO, // Ensure backward compatibility
          images: mergedImages
        }));
      } catch (e) {
        console.error("Failed to parse config", e);
      }
    }
  }, []);

  const updateConfig = (key: keyof AppConfig, value: any) => {
    const newConfig = { ...config, [key]: value };
    setConfig(newConfig);
    localStorage.setItem('wingmentor_config', JSON.stringify(newConfig));
  };

  const updateImage = (key: keyof typeof IMAGES, value: string) => {
    const newImages = { ...config.images, [key]: value };
    const newConfig = { ...config, images: newImages };
    setConfig(newConfig);
    localStorage.setItem('wingmentor_config', JSON.stringify(newConfig));
  };

  const resetConfig = () => {
    const defaults = { 
      heroVideoUrl: IMAGES.HERO_VIDEO,
      cutSceneVideoUrl: IMAGES.CUT_SCENE_VIDEO,
      images: { ...IMAGES }
    };
    setConfig(defaults);
    localStorage.removeItem('wingmentor_config');
  };

  const resetImages = () => {
    const newConfig = { ...config, images: { ...IMAGES } };
    setConfig(newConfig);
    localStorage.setItem('wingmentor_config', JSON.stringify(newConfig));
  };

  return (
    <ConfigContext.Provider value={{ config, updateConfig, updateImage, resetConfig, resetImages }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) throw new Error("useConfig must be used within ConfigProvider");
  return context;
};