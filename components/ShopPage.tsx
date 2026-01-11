import React from 'react';
import { SHOP_PRODUCTS } from '../constants';
import { useConfig } from '../context/ConfigContext'; // Import useConfig
import { useTheme } from '../context/ThemeContext';

interface ShopPageProps {
  onBackToHub: () => void;
}

const ProductCard: React.FC<{ product: typeof SHOP_PRODUCTS[0], isDarkMode: boolean }> = ({ product, isDarkMode }) => (
  <div className={`group relative overflow-hidden rounded-xl border backdrop-blur-lg shadow-2xl transition-all duration-300 hover:-translate-y-2
                  ${isDarkMode 
                    ? 'border-white/20 bg-black/40 hover:shadow-cyan-500/30' 
                    : 'border-zinc-200 bg-white/80 hover:shadow-blue-500/20'}`}>
    <img src={product.image} alt={product.name} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
    <div className="p-5">
      <h3 className={`text-lg font-bold brand-font truncate ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>{product.name}</h3>
      <p className={`text-sm mb-4 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`}>{product.category}</p>
      <div className="flex justify-between items-center">
        <p className={`text-2xl font-bold ${isDarkMode ? 'text-cyan-400' : 'text-blue-600'}`}>${product.price}</p>
        <button className={`px-4 py-2 font-bold text-sm uppercase tracking-wider rounded-md transition-all duration-300 shadow-lg
                           ${isDarkMode 
                            ? 'bg-cyan-500 text-black hover:bg-cyan-400 hover:shadow-cyan-500/50' 
                            : 'bg-blue-600 text-white hover:bg-blue-500 hover:shadow-blue-500/30'}`}>
          Add to Cart
        </button>
      </div>
    </div>
  </div>
);

export const ShopPage: React.FC<ShopPageProps> = ({ onBackToHub }) => {
  const { isDarkMode } = useTheme();
  const { config } = useConfig();
  const { images } = config;

  return (
    <div className={`relative min-h-screen animate-in fade-in duration-700 ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src={images.SHOP_BG} 
          alt="Aircraft Hangar" 
          className="w-full h-full object-cover object-center" 
          style={{
            filter: 'brightness(40%) blur(3px)', 
            pointerEvents: 'none'
          }} 
        />
        <div className={`absolute inset-0 z-10 ${isDarkMode ? 'bg-black/50' : 'bg-white/80'}`}></div>
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto pt-40 pb-16 px-6 lg:px-12">
        <div className="mb-12 text-center">
            <button 
                onClick={onBackToHub}
                className={`flex items-center mx-auto space-x-3 px-6 py-3 rounded-md uppercase tracking-widest text-sm font-bold transition-all shadow-md
                            border ${isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700 border-zinc-600' : 'bg-white text-zinc-800 hover:bg-zinc-100 border-zinc-300'}`}>
                <i className="fas fa-arrow-left"></i>
                <span>Back to Hub</span>
            </button>
        </div>

        <div className="text-center mb-16">
          <h1 className={`text-5xl md:text-7xl font-bold brand-font leading-tight mb-4 drop-shadow-lg
                          ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
            WingMentor Hangar Shop
          </h1>
          <p className={`text-xl md:text-2xl font-light leading-relaxed
                         ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
            Gear Up for Your Next Flight.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SHOP_PRODUCTS.map(product => (
            <ProductCard key={product.id} product={product} isDarkMode={isDarkMode} />
          ))}
        </div>
      </div>
    </div>
  );
};