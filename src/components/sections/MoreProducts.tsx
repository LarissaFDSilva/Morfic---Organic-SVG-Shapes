import React from 'react';
import { LayoutGrid, Globe } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { analytics } from '../../lib/firebase';
import { logEvent } from 'firebase/analytics';

export const MoreProducts: React.FC = () => {
  const handleProductClick = (product: string) => {
    if (analytics) logEvent(analytics, 'external_product_click', { product });
  };

  return (
    <section className="text-left bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full transition-colors duration-300">
      <h2 className="text-xl font-bold mb-8 text-text dark:text-white flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
          <LayoutGrid className="w-5 h-5" />
        </div>
        Mais produtos
      </h2>
      <div className="space-y-8">
        {/* Getwaves */}
        <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group border border-transparent hover:border-gray-100 dark:hover:border-gray-600">
          <img 
            src={ASSETS.GETWAVES_LOGO} 
            alt="Getwaves Logo" 
            className="w-14 h-14 flex-shrink-0 group-hover:scale-110 transition-transform"
            referrerPolicy="no-referrer"
          />
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Se você gosta de geradores de formas SVG, <a href="https://getwaves.io/" target="_blank" rel="noopener noreferrer" onClick={() => handleProductClick('getwaves')} className="text-accent hover:underline font-medium">experimente getwaves.io</a> e faça algumas transições de ondas legais para suas páginas web.
          </p>
        </div>
        
        {/* Quiz */}
        <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group border border-transparent hover:border-gray-100 dark:hover:border-gray-600">
          <div className="w-14 h-14 flex-shrink-0 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Globe className="w-7 h-7" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            Tem um minuto? Desafie-se com nosso divertido quiz de geo! <a href="https://geography.games/europe-quiz/" target="_blank" rel="noopener noreferrer" onClick={() => handleProductClick('geography_games')} className="text-accent hover:underline font-medium">Comece a jogar →</a>
          </p>
        </div>
      </div>
    </section>
  );
};
