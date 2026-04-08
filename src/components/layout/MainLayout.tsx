import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  user: any;
  onLogin: () => void;
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children, user, onLogin, onLogout, isDarkMode, onToggleDarkMode }) => {
  return (
    <div className="min-h-screen bg-background font-sans antialiased selection:bg-accent/30 text-text transition-colors duration-300">
      <Header user={user} onLogin={onLogin} onLogout={onLogout} isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
      <main className="min-h-[calc(100vh-300px)]">
        {children}
      </main>
      <Footer />
    </div>
  );
};
