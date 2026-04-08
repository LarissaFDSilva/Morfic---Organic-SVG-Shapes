/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Mail, MessageSquare, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { MainLayout } from './components/layout/MainLayout';
import { BlobStage } from './components/blob/BlobStage';
import { ControlPanel } from './components/blob/ControlPanel';
import { Newsletter } from './components/sections/Newsletter';
import { MoreProducts } from './components/sections/MoreProducts';
import { MorphingTimeline } from './components/blob/MorphingTimeline';
import { ExportPanel } from './components/blob/ExportPanel';
import { generateBlobPoints, pointsToPath, getRandomSeed, Point } from './lib/blob';
import { ASSETS } from './constants/assets';

// Firebase Imports
import { auth, googleProvider, db, storage, analytics, remoteConfig } from './lib/firebase';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { logEvent } from 'firebase/analytics';
import { fetchAndActivate, getString } from 'firebase/remote-config';

interface Keyframe {
  id: string;
  path: string;
  color: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [color, setColor] = useState('#3B82F6');
  const [complexity, setComplexity] = useState(6);
  const [contrast, setContrast] = useState(0.4);
  const [seed, setSeed] = useState(getRandomSeed());
  const [points, setPoints] = useState<Point[]>([]);
  const [path, setPath] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('Bem-vindo ao Morfic!');

  // Advanced Features State
  const [isPrecisionMode, setIsPrecisionMode] = useState(false);
  const [isMorphingMode, setIsMorphingMode] = useState(false);
  const [isExportMode, setIsExportMode] = useState(false);
  const [isMeshGradient, setIsMeshGradient] = useState(false);
  const [keyframes, setKeyframes] = useState<Keyframe[]>([]);
  
  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || 
             window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  // History for Undo (Ctrl+Z)
  const [history, setHistory] = useState<{ points: Point[]; color: string }[]>([]);

  // Auth & Remote Config
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Load preferences
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const prefs = userDoc.data().preferences;
          if (prefs) {
            if (prefs.defaultColor) setColor(prefs.defaultColor);
            if (prefs.defaultComplexity) setComplexity(prefs.defaultComplexity);
            if (prefs.defaultContrast) setContrast(prefs.defaultContrast);
          }
        } else {
          // Create user doc
          await setDoc(doc(db, 'users', currentUser.uid), {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            createdAt: serverTimestamp()
          });
        }
      }
    });

    if (remoteConfig) {
      fetchAndActivate(remoteConfig).then(() => {
        setWelcomeMessage(getString(remoteConfig, 'welcome_message'));
      });
    }

    return () => unsubscribe();
  }, []);

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider);
    if (analytics) logEvent(analytics, 'login_attempt');
  };
  const handleLogout = () => {
    signOut(auth);
    if (analytics) logEvent(analytics, 'logout');
  };

  const pushToHistory = useCallback((newPoints: Point[], newColor: string) => {
    setHistory(prev => {
      const updated = [...prev, { points: newPoints, color: newColor }];
      return updated.slice(-50);
    });
  }, []);

  const handleUndo = useCallback(() => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const lastState = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setPoints(lastState.points);
      setColor(lastState.color);
      setPath(pointsToPath(lastState.points));
    }
  }, [history]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo]);

  const updateBlob = useCallback(() => {
    const newPoints = generateBlobPoints({ seed, complexity, contrast });
    setPoints(newPoints);
    setPath(pointsToPath(newPoints));
    pushToHistory(newPoints, color);
  }, [seed, complexity, contrast, color, pushToHistory]);

  useEffect(() => {
    updateBlob();
  }, [updateBlob]);

  const handlePointMove = (index: number, newPoint: Point) => {
    const newPoints = [...points];
    newPoints[index] = newPoint;
    setPoints(newPoints);
    setPath(pointsToPath(newPoints));
  };

  const handlePointMoveEnd = () => {
    pushToHistory(points, color);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    pushToHistory(points, newColor);
    if (analytics) logEvent(analytics, 'change_color', { color: newColor });
  };

  const handleRandomize = () => {
    setSeed(getRandomSeed());
    if (analytics) {
      try {
        logEvent(analytics, 'randomize_blob');
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleAddKeyframe = () => {
    const newKeyframe: Keyframe = {
      id: Math.random().toString(36).substr(2, 9),
      path,
      color
    };
    setKeyframes([...keyframes, newKeyframe]);
    if (analytics) logEvent(analytics, 'add_keyframe');
  };

  const handleRemoveKeyframe = (id: string) => {
    setKeyframes(keyframes.filter(kf => kf.id !== id));
    if (analytics) logEvent(analytics, 'remove_keyframe');
  };

  const handlePlayMorphing = async () => {
    if (keyframes.length < 2) return;
    if (analytics) logEvent(analytics, 'play_morphing');
    
    for (const kf of keyframes) {
      setPath(kf.path);
      setColor(kf.color);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  };

  const handleDownload = async () => {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="${path}" fill="${color}" /></svg>`;
    
    if (user) {
      try {
        // Save to Firestore History
        await addDoc(collection(db, 'users', user.uid, 'history'), {
          uid: user.uid,
          path,
          color,
          seed,
          timestamp: serverTimestamp()
        });

        // Upload to Storage
        const storageRef = ref(storage, `users/${user.uid}/blobs/${Date.now()}.svg`);
        await uploadString(storageRef, svgString, 'raw', { contentType: 'image/svg+xml' });
      } catch (error) {
        console.error("Error saving to Firebase:", error);
      }
    }

    if (analytics) {
      try {
        logEvent(analytics, 'download_svg');
      } catch (e) {
        console.error(e);
      }
    }

    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `morfic-${seed}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><path d="${path}" fill="${color}" /></svg>`;
    try {
      await navigator.clipboard.writeText(svgString);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
    if (analytics) {
      try {
        logEvent(analytics, 'copy_svg');
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <MainLayout 
      user={user} 
      onLogin={handleLogin} 
      onLogout={handleLogout}
      isDarkMode={isDarkMode}
      onToggleDarkMode={toggleDarkMode}
    >
      <div className="flex flex-col items-center pt-12">
        {/* Welcome Message from Remote Config */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-text">{welcomeMessage}</h1>
        </div>

        {/* Blob Visualization Area */}
        <section className="w-full min-h-[50vh] flex flex-col items-center justify-center px-6 gap-12">
          <BlobStage 
            path={path} 
            color={color} 
            points={points}
            onPointMove={handlePointMove}
            onPointMoveEnd={handlePointMoveEnd}
            isPrecisionMode={isPrecisionMode}
            isMeshGradient={isMeshGradient}
            onDownload={handleDownload}
            onCopy={handleCopy}
            onRandomize={handleRandomize}
          />
        </section>

        {/* Control Panel & Wavy Transition to #f5f5f5 */}
        <div className="w-full flex flex-col items-center">
          <div className="mb-12">
            <ControlPanel 
              color={color}
              complexity={complexity}
              contrast={contrast}
              isPrecisionMode={isPrecisionMode}
              isMorphingMode={isMorphingMode}
              isExportMode={isExportMode}
              isMeshGradient={isMeshGradient}
              onColorChange={handleColorChange}
              onComplexityChange={(val) => {
                setComplexity(val);
                if (analytics) logEvent(analytics, 'change_complexity', { value: val });
              }}
              onContrastChange={(val) => {
                setContrast(val);
                if (analytics) logEvent(analytics, 'change_contrast', { value: val });
              }}
              onTogglePrecision={() => {
                const newState = !isPrecisionMode;
                setIsPrecisionMode(newState);
                if (analytics) logEvent(analytics, 'toggle_precision', { enabled: newState });
              }}
              onToggleMorphing={() => {
                const newState = !isMorphingMode;
                setIsMorphingMode(newState);
                if (analytics) logEvent(analytics, 'toggle_morphing', { enabled: newState });
              }}
              onToggleExport={() => {
                const newState = !isExportMode;
                setIsExportMode(newState);
                if (analytics) logEvent(analytics, 'toggle_export', { enabled: newState });
              }}
              onToggleMesh={() => {
                const newState = !isMeshGradient;
                setIsMeshGradient(newState);
                if (analytics) logEvent(analytics, 'toggle_mesh', { enabled: newState });
              }}
            />
          </div>

          {/* Advanced Feature Panels */}
          <div className="w-full flex flex-col items-center px-6 -mt-8 mb-12 space-y-4">
            <MorphingTimeline 
              keyframes={keyframes}
              onAddKeyframe={handleAddKeyframe}
              onRemoveKeyframe={handleRemoveKeyframe}
              onPlay={handlePlayMorphing}
              active={isMorphingMode}
            />
            <ExportPanel 
              path={path}
              color={color}
              active={isExportMode}
            />
          </div>

          <div className="w-full overflow-hidden leading-none text-secondary transition-colors duration-300">
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
          
          <div className="bg-secondary w-full transition-colors duration-300">
            {/* Info Section */}
            <section className="container mx-auto px-4 max-w-4xl text-left py-12 space-y-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Morfic é uma ferramenta gratuita de design generativo criada com 💕 <a href="https://www.zcreativelabs.com/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">a z creative labs</a>, para ajudar você a criar rapidamente formas SVG aleatórias, únicas e orgânicas.
                </p>
                <div className="flex justify-start">
                  <a href="https://www.producthunt.com/posts/blobmaker?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-blobmaker" target="_blank" rel="noopener noreferrer">
                    <img 
                      src={ASSETS.PRODUCT_HUNT_BADGE} 
                      alt="Morfic - #1 Product of the Day | Product Hunt" 
                      className="w-64 h-14 opacity-80 hover:opacity-100 transition-opacity"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                </div>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                De páginas de destino a ilustrações, <a href="https://medium.com/@usonesinbetween/2017-the-year-of-the-blob-a3d899c9b071" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">as manchas estão por toda parte</a>! Criar formas lisas e orgânicas pode ser difícil, especialmente quando você precisa de várias formas diferentes. O Morfic facilita a criação de formas únicas de bolhas baseadas em dados aleatórios.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                Modificar a complexidade (número de pontos) e o contraste (diferença entre pontos) para criar diferentes tipos de formas orgânicas de svg. Pressione esse botão de dados até encontrar uma mancha que goste e baixe como um SVG ou copie o código diretamente para a sua prancheta.
              </p>
            </section>

            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-24">
              <div className="lg:col-span-1">
                <Newsletter />
              </div>
              <div className="lg:col-span-1">
                <MoreProducts />
              </div>
              <div className="lg:col-span-1">
                <section className="text-left bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-black/5 dark:border-white/5 h-full transition-colors duration-300">
                  <h2 className="text-xl font-bold mb-8 text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    Contato
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Você está procurando uma equipe criativa de código + design para seu próximo projeto? Vamos conversar!
                  </p>
                  <a 
                    href="mailto:hello@zcreativelabs.com" 
                    className="inline-block text-accent font-bold hover:underline px-6 py-3 rounded-xl bg-accent/10 transition-all active:scale-95"
                  >
                    hello@zcreativelabs.com
                  </a>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}



