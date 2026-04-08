import React from 'react';
import { ASSETS } from '../../constants/assets';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-secondary transition-colors duration-300">
      {/* Wave Background */}
      <div className="w-full overflow-hidden leading-none text-primary transition-colors duration-300">
        <svg 
          viewBox="0 0 1440 320" 
          className="relative block w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            fill="currentColor" 
            fillOpacity="1" 
            d={ASSETS.WAVE_FOOTER}
          ></path>
        </svg>
      </div>
      
      {/* Footer Content */}
      <div className="bg-primary py-12 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/80 dark:text-gray-900/80 text-sm">
            © 2026 <a href="https://www.zcreativelabs.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">Z Creative Labs</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
