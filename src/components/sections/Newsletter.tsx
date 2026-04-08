import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { analytics } from '../../lib/firebase';
import { logEvent } from 'firebase/analytics';

export const Newsletter: React.FC = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (analytics) {
      logEvent(analytics, 'newsletter_subscribe', {
        marketing_opt_in: subscribed
      });
    }
    setSuccess(true);
  };

    if (success) {
      return (
        <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full flex flex-col items-center justify-center text-center transition-colors duration-300">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold mb-2 text-text dark:text-white">Obrigado!</h2>
          <p className="text-gray-500 dark:text-gray-400">Você foi inscrito com sucesso em nosso boletim informativo.</p>
        </section>
      );
    }

    return (
      <section className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 h-full transition-colors duration-300">
        <h2 className="text-xl font-bold mb-6 text-text dark:text-white flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-accent" />
          </div>
          Boletim informativo
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl px-4 py-1 border border-gray-200 dark:border-gray-700">
            <input 
              type="email" 
              placeholder="Preencha seu e-mail" 
              title="Preencha este campo"
              className="w-full py-3 bg-transparent outline-none text-sm text-text dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
              required
            />
          </div>
          <button 
            type="submit"
            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 active:scale-95 transition-all shadow-md"
          >
            Assine
          </button>
          
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative w-6 h-6 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
              <input 
                type="checkbox" 
                className="peer sr-only"
                checked={subscribed}
                onChange={() => setSubscribed(!subscribed)}
              />
              <div className="w-full h-full bg-accent opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white fill-current">
                  <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                </svg>
              </div>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors text-justify">
              Me envie atualizações sobre os produtos da z creative labs
            </span>
          </label>
        </form>
      </section>
    );
};
