
import React, { useRef, useEffect } from 'react';
import { useConfig } from '../context/ConfigContext';

interface CutSceneProps {
    onComplete: () => void;
}

export const CutScene: React.FC<CutSceneProps> = ({ onComplete }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const { config } = useConfig();

    useEffect(() => {
        let isMounted = true; // Flag to track if the component is mounted

        const playVideo = async () => {
            if (videoRef.current) {
                try {
                    await videoRef.current.play();
                } catch (err) {
                    // If component unmounted while trying to play, just return.
                    if (!isMounted) return;

                    console.log("Autoplay with sound was blocked. Attempting muted playback.", err);
                    
                    if (videoRef.current) {
                        videoRef.current.muted = true;
                        videoRef.current.play().catch(e => {
                            // Also check here in case of another quick unmount
                            if(isMounted) {
                                console.error("Muted playback failed", e);
                            }
                        });
                    }
                }
            }
        };
        
        playVideo();

        // Cleanup function to run when the component unmounts
        return () => {
            isMounted = false;
            // It's good practice to pause the video on unmount to stop it from playing in the background
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = ""; // Detach the source to be extra safe
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center animate-in fade-in duration-1000">
            <video 
                ref={videoRef}
                src={config.cutSceneVideoUrl} 
                className="w-full h-full object-cover"
                onEnded={onComplete}
                playsInline
                // autoPlay is handled by the useEffect hook
            />
            
            {/* Skip Button */}
            <button 
                onClick={onComplete}
                className="absolute bottom-10 right-10 z-50 text-white/50 hover:text-white text-xs font-bold uppercase tracking-[0.2em] border border-white/20 px-4 py-2 rounded hover:bg-white/10 transition-all"
            >
                Skip Sequence
            </button>
        </div>
    );
}
