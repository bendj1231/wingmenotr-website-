import React from 'react';
import { LATEST_NEWS_ARTICLES } from '../constants';
import { useConfig } from '../context/ConfigContext'; // Import useConfig
import { useTheme } from '../context/ThemeContext';
import { RevealOnScroll } from './RevealOnScroll';

interface LatestNewsPageProps {
  onBackToLanding: () => void;
}

const NewsCard: React.FC<{ article: typeof LATEST_NEWS_ARTICLES[0], isDarkMode: boolean }> = ({ article, isDarkMode }) => (
  <div className={`group relative overflow-hidden rounded-xl border backdrop-blur-lg shadow-2xl transition-all duration-300 hover:-translate-y-2
                  ${isDarkMode 
                    ? 'border-white/20 bg-black/40 hover:shadow-cyan-500/30' 
                    : 'border-zinc-200 bg-white/80 hover:shadow-blue-500/20'}`}>
    <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
    <div className="p-5">
      <h3 className={`text-lg font-bold brand-font truncate ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{article.title}</h3>
      <p className={`text-sm mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{article.date}</p>
      <p className={`text-sm ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>{article.excerpt}</p>
      <button className={`mt-4 text-xs font-bold uppercase tracking-wider border-b border-transparent hover:border-current transition-colors ${isDarkMode ? 'text-white' : 'text-black'}`}>
        Read More <i className="fas fa-arrow-right ml-1"></i>
      </button>
    </div>
  </div>
);

export const LatestNewsPage: React.FC<LatestNewsPageProps> = ({ onBackToLanding }) => {
  const { isDarkMode } = useTheme();
  const { config } = useConfig();
  const { images } = config;

  return (
    <div className={`relative min-h-screen animate-in fade-in duration-700 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={images.NEWS_BG} 
          alt="News Background" 
          className="w-full h-full object-cover object-center" 
          style={{
            filter: 'brightness(40%) blur(3px)', 
            pointerEvents: 'none'
          }} 
        />
        <div className={`absolute inset-0 z-10 ${isDarkMode ? 'bg-black/50' : 'bg-white/80'}`}></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto pt-40 pb-16 px-6 lg:px-12">
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
          <h1 className={`text-5xl md:text-7xl font-bold brand-font leading-tight mb-4 drop-shadow-lg
                          ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            Latest News & Updates
          </h1>
          <p className={`text-xl md:text-2xl font-light leading-relaxed
                         ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Stay Informed with WingMentor.
          </p>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LATEST_NEWS_ARTICLES.map(article => (
            <RevealOnScroll key={article.id} delay={100}>
              <NewsCard article={article} isDarkMode={isDarkMode} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  );
};