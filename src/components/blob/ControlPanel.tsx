import React from 'react';
import { 
  Dices, 
  Download, 
  Code, 
  Palette, 
  Check,
  MousePointer2,
  History,
  Terminal,
  Layers
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface ControlPanelProps {
  color: string;
  complexity: number;
  contrast: number;
  isPrecisionMode: boolean;
  isMorphingMode: boolean;
  isExportMode: boolean;
  isMeshGradient: boolean;
  onColorChange: (color: string) => void;
  onComplexityChange: (val: number) => void;
  onContrastChange: (val: number) => void;
  onTogglePrecision: () => void;
  onToggleMorphing: () => void;
  onToggleExport: () => void;
  onToggleMesh: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  color,
  complexity,
  contrast,
  isPrecisionMode,
  isMorphingMode,
  isExportMode,
  isMeshGradient,
  onColorChange,
  onComplexityChange,
  onContrastChange,
  onTogglePrecision,
  onToggleMorphing,
  onToggleExport,
  onToggleMesh
}) => {
  const [isColorActive, setIsColorActive] = React.useState(false);

  return (
    <div className="w-full max-w-7xl bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-4 flex flex-col xl:flex-row items-center justify-between gap-4 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Color Picker Section */}
      <div className="flex items-center gap-3 xl:gap-4 pl-2">
        <div className={cn(
          "flex items-center gap-3 px-4 py-2 rounded-full border transition-all",
          isColorActive ? "bg-accent/10 border-accent/50" : "bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700"
        )}>
          <div 
            className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow-sm shrink-0" 
            style={{ backgroundColor: color }}
          />
          <span className="font-mono text-sm font-bold text-gray-500 dark:text-gray-400 uppercase hidden sm:inline">{color}</span>
          <div className="relative flex items-center justify-center">
            <input 
              type="color" 
              value={color}
              onFocus={() => setIsColorActive(true)}
              onBlur={() => setIsColorActive(false)}
              onChange={(e) => {
                onColorChange(e.target.value);
                setIsColorActive(true);
              }}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-30"
            />
            <button className={cn(
              "p-1.5 transition-all flex items-center justify-center rounded-lg relative z-20",
              isColorActive ? "text-accent bg-white dark:bg-gray-800 shadow-sm" : "text-gray-400 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700"
            )}>
              <Palette 
                size={26} 
                viewBox="0 0 40 40" 
              />
            </button>
          </div>
        </div>
        <div className="hidden xl:block h-8 w-px bg-gray-200 dark:bg-gray-700" />
        
        {/* Acute Triangle Icon */}
        <button 
          onClick={() => onComplexityChange(3)}
          className={cn(
            "p-2 rounded-xl transition-all shrink-0",
            complexity === 3 ? "bg-accent/10 text-accent shadow-inner" : "text-gray-400 hover:text-accent/60 hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
        >
          <svg viewBox="0 0 40 40" className="w-8 h-8 fill-none stroke-current" strokeWidth="1.5">
            <path d="M20 10 L10 30 L30 30 Z" />
            <circle cx="20" cy="10" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="10" cy="30" r="3.5" fill="currentColor" stroke="none" />
            <circle cx="30" cy="30" r="3.5" fill="currentColor" stroke="none" />
          </svg>
        </button>
      </div>

      {/* Sliders Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 xl:gap-8 px-2">
        <div className="flex items-center gap-3 text-gray-400">
          <div className="bg-gray-50 dark:bg-gray-900/50 px-3 py-1.5 rounded-full flex items-center border border-gray-200 dark:border-gray-700">
            <input 
              type="range" 
              min="3" 
              max="12" 
              step="1"
              value={complexity}
              onChange={(e) => onComplexityChange(parseInt(e.target.value))}
              className="w-40 xl:w-56 h-1.5 bg-transparent rounded-lg appearance-none cursor-pointer accent-accent" 
            />
          </div>
          {/* Pentagon Icon */}
          <button 
            onClick={() => onComplexityChange(5)}
            className={cn(
              "p-2 rounded-xl transition-all shrink-0",
              complexity === 5 ? "bg-accent/10 text-accent shadow-inner" : "text-gray-400 hover:text-accent/60 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <svg viewBox="0 0 40 40" className="w-8 h-8 fill-none stroke-current" strokeWidth="1.5">
              <path d="M20 8 L32 18 L28 32 L12 32 L8 18 Z" />
              <circle cx="20" cy="8" r="3" fill="currentColor" stroke="none" />
              <circle cx="32" cy="18" r="3" fill="currentColor" stroke="none" />
              <circle cx="28" cy="32" r="3" fill="currentColor" stroke="none" />
              <circle cx="12" cy="32" r="3" fill="currentColor" stroke="none" />
              <circle cx="8" cy="18" r="3" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-3 text-gray-400">
          {/* White Circle with Dark Gray Outline */}
          <button 
            onClick={() => onContrastChange(0)}
            className={cn(
              "w-8 h-8 rounded-full transition-all flex items-center justify-center p-1 shrink-0",
              contrast === 0 ? "bg-accent/10 text-accent shadow-inner" : "text-gray-400 hover:text-accent/60 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <div className={cn("w-full h-full rounded-full", contrast === 0 ? "bg-accent" : "bg-gray-200 dark:bg-gray-600 border border-gray-300 dark:border-gray-500")} />
          </button>
          <div className="bg-gray-50 dark:bg-gray-900/50 px-3 py-1.5 rounded-full flex items-center border border-gray-200 dark:border-gray-700">
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={contrast}
              onChange={(e) => onContrastChange(parseFloat(e.target.value))}
              className="w-40 xl:w-56 h-1.5 bg-transparent rounded-lg appearance-none cursor-pointer accent-accent" 
            />
          </div>
          {/* Wavy Blob Icon */}
          <button 
            onClick={() => onContrastChange(1)}
            className={cn(
              "p-2 rounded-xl transition-all shrink-0",
              contrast === 1 ? "bg-accent/10 text-accent shadow-inner" : "text-gray-400 hover:text-accent/60 hover:bg-gray-100 dark:hover:bg-gray-700"
            )}
          >
            <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path fill="currentColor" d="M11.7,-17.4C18.5,-8.2,29.7,-7.7,42.9,2C56,11.7,71,30.7,66.5,38.3C62,45.9,38,42.3,19.4,45.9C0.7,49.5,-12.6,60.4,-20.2,57C-27.7,53.6,-29.5,35.8,-39.5,21.4C-49.5,7,-67.7,-4.1,-65.5,-10.6C-63.2,-17.1,-40.4,-19,-26.1,-26.9C-11.7,-34.9,-5.9,-48.8,-1.7,-46.7C2.4,-44.7,4.9,-26.7,11.7,-17.4Z" transform="translate(100 100)" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Advanced Features Section */}
      <div className="flex items-center gap-2 xl:gap-3 px-4 border-l border-r border-gray-200 dark:border-gray-700">
        <button 
          onClick={onToggleMesh}
          className={cn(
            "p-2.5 rounded-xl transition-all",
            isMeshGradient ? "bg-accent/10 text-accent shadow-inner" : "text-gray-400 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
          title="Organic Mesh Gradient"
        >
          <Layers size={22} />
        </button>
        <button 
          onClick={onTogglePrecision}
          className={cn(
            "p-2.5 rounded-xl transition-all",
            isPrecisionMode ? "bg-accent/10 text-accent shadow-inner" : "text-gray-400 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
          title="Precision Mode (Node Editor)"
        >
          <MousePointer2 size={22} />
        </button>
        <button 
          onClick={onToggleMorphing}
          className={cn(
            "p-2.5 rounded-xl transition-all",
            isMorphingMode ? "bg-accent/10 text-accent shadow-inner" : "text-gray-400 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
          title="Morphing Timeline"
        >
          <History size={22} />
        </button>
        <button 
          onClick={onToggleExport}
          className={cn(
            "p-2.5 rounded-xl transition-all",
            isExportMode ? "bg-accent/10 text-accent shadow-inner" : "text-gray-400 hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
          title="Design Tokens Export"
        >
          <Terminal size={22} />
        </button>
      </div>

      {/* Actions Section - Removed redundant icons as they are now on the BlobStage */}
      <div className="flex items-center gap-3 xl:gap-4 pr-4">
        {/* Only keeping the color picker and sliders in the main bar for a cleaner look */}
      </div>
    </div>
  );
};
