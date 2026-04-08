import React from 'react';
import { ASSETS } from '../../constants/assets';
import { LogIn, LogOut, User as UserIcon, Moon, Sun } from 'lucide-react';
import { User } from 'firebase/auth';
import { analytics } from '../../lib/firebase';
import { logEvent } from 'firebase/analytics';

interface HeaderProps {
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, isDarkMode, onToggleDarkMode }) => {
  const handleShareClick = () => {
    if (analytics) logEvent(analytics, 'share_click', { platform: 'twitter' });
  };

  return (
    <div className="w-full">
      {/* Top Bar Background */}
      <div 
        className="w-full h-14 bg-gradient-to-r from-blue-950 to-blue-600 relative flex items-center justify-center"
      >
        <div className="px-4">
          <p className="text-white text-sm md:text-base font-bold text-center drop-shadow-sm">
            O Morfic agora faz parte do <a href="https://haikei.app" target="_blank" rel="noopener noreferrer" className="underline hover:text-pink-100 transition-colors">Haikei.app</a>. Experimente de graça!
          </p>
        </div>
      </div>
      
      {/* Header Content - Logo Left, Share & Auth Right */}
      <div className="container mx-auto px-4 flex justify-between items-start pt-4">
        {/* Left Side: Logo and Credit */}
        <div className="flex items-center gap-2">
          <div className="relative w-12 h-12 flex items-center justify-center">
            {/* Blue Oval (Right/Top) - Updated from #FF9933 to #3B82F6 */}
            <div className="absolute w-11 h-9 bg-accent rounded-full translate-x-1.5 -translate-y-1" />
            {/* Darker Blue Oval (Left/Bottom) - Updated from #FF0066 to a darker blue or primary */}
            <div className="absolute w-11 h-9 bg-primary rounded-full -translate-x-1 translate-y-1 z-10" />
            {/* Letter M */}
            <span className="relative z-20 text-white dark:text-gray-900 font-black text-4xl select-none font-century">M</span>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Por <a href="https://www.zcreativelabs.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">z creative labs</a>
          </span>
        </div>

        {/* Right Side: Share and Auth Stacked */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleDarkMode}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label={isDarkMode ? "Mudar para modo claro" : "Mudar para modo escuro"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a 
              href="http://twitter.com/intent/tweet?url=https://www.blobmaker.app&text=Make%20organic%20%23SVG%20shapes%20with%20Morfic%20by%20%40zcreativelabs&original_referer=https://www.blobmaker.app"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleShareClick}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors group"
              aria-label="Compartilhar no Twitter"
            >
              <span className="text-sm font-medium">Compartilhe</span>
              <svg 
                viewBox="0 0 24 24" 
                focusable="false" 
                role="presentation" 
                className="w-5 h-5 fill-current css-1im46kq"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                <UserIcon size={14} />
                <span>{user.displayName || user.email}</span>
              </div>
              <button 
                onClick={onLogout}
                className="text-xs font-bold text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                aria-label="Sair"
              >
                Sair
              </button>
            </div>
          ) : (
            <button 
              onClick={onLogin}
              className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm active:scale-95"
              aria-label="Entrar com Google"
            >
              <LogIn size={14} /> Entrar com Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
