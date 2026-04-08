import React from 'react';
import { Play, Plus, Trash2, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Keyframe {
  id: string;
  path: string;
  color: string;
}

interface MorphingTimelineProps {
  keyframes: Keyframe[];
  onAddKeyframe: () => void;
  onRemoveKeyframe: (id: string) => void;
  onPlay: () => void;
  active: boolean;
}

/**
 * Morphing Timeline
 * Algoritmo para interpolar entre dois estados de path SVG.
 * Uses Framer Motion's layout and path animation capabilities.
 */
export const MorphingTimeline: React.FC<MorphingTimelineProps> = ({ 
  keyframes, 
  onAddKeyframe, 
  onRemoveKeyframe, 
  onPlay,
  active 
}) => {
  if (!active) return null;

  return (
    <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 transition-colors">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
            <History className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold text-text dark:text-white">Morphing Timeline</h3>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onPlay}
            disabled={keyframes.length < 2}
            className="flex items-center gap-2 px-6 py-2 bg-primary text-white font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md"
          >
            <Play size={18} /> Play Metamorphosis
          </button>
          <button 
            onClick={onAddKeyframe}
            className="flex items-center gap-2 px-6 py-2 border-2 border-accent/10 text-accent font-bold rounded-xl hover:bg-accent/5 transition-all active:scale-95"
          >
            <Plus size={18} /> Add Keyframe
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 overflow-x-auto pb-4 scrollbar-hide">
        <AnimatePresence mode="popLayout">
          {keyframes.map((kf, index) => (
            <motion.div
              key={kf.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative group shrink-0"
            >
              <div className="w-24 h-24 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center p-2 shadow-sm transition-colors">
                <svg viewBox="0 0 400 400" className="w-full h-full">
                  <path d={kf.path} fill={kf.color} />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onRemoveKeyframe(kf.id)}
                  className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <span className="block text-center text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-2 uppercase tracking-widest">
                Frame {index + 1}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {keyframes.length === 0 && (
          <div className="w-full py-12 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl text-gray-400 dark:text-gray-500 transition-colors">
            <p className="text-sm font-medium">No keyframes added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};
