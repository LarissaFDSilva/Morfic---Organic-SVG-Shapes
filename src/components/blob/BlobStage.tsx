import React from 'react';
import { motion } from 'motion/react';
import { Download, Code, Dices, Check } from 'lucide-react';
import { MeshGradient } from './MeshGradient';
import { NodeEditor } from './NodeEditor';
import { Point } from '../../lib/blob';

interface BlobStageProps {
  path: string;
  color: string;
  points: Point[];
  onPointMove: (index: number, newPoint: Point) => void;
  onPointMoveEnd?: () => void;
  isPrecisionMode: boolean;
  isMeshGradient: boolean;
  onDownload: () => void;
  onCopy: () => void;
  onRandomize: () => void;
}

export const BlobStage: React.FC<BlobStageProps> = ({ 
  path, 
  color, 
  points, 
  onPointMove, 
  onPointMoveEnd,
  isPrecisionMode,
  isMeshGradient,
  onDownload,
  onCopy,
  onRandomize
}) => {
  const [copied, setCopied] = React.useState(false);
  const gradientId = "organic-mesh";

  const handleCopy = () => {
    onCopy();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative w-full aspect-square max-w-[600px] flex items-center justify-center">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl -z-10" />
      
      {/* Dotted Square 450x450 */}
      <div className="absolute w-[450px] h-[450px] border-2 border-dashed border-gray-200 dark:border-gray-700 pointer-events-none transition-colors duration-300" />

      {/* Action Icons on the right side of the dotted square */}
      <div className="absolute left-[calc(50%+225px+20px)] flex flex-col gap-4 z-50">
        <button 
          onClick={onDownload}
          className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-accent hover:bg-accent/10 transition-all active:scale-90"
          title="Download SVG"
          aria-label="Baixar SVG"
        >
          <Download size={24} />
        </button>
        <button 
          onClick={handleCopy}
          className="w-12 h-12 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-accent hover:bg-accent/10 transition-all active:scale-90"
          title="Copy SVG Code"
          aria-label="Copiar código SVG"
        >
          {copied ? <Check size={24} className="text-green-500" /> : <Code size={24} />}
        </button>
        <motion.button 
          onClick={onRandomize}
          className="w-12 h-12 rounded-2xl bg-primary shadow-lg flex items-center justify-center text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
          title="Randomize"
          aria-label="Gerar nova forma"
          whileHover={{ scale: 1.05, rotate: 15 }}
          whileTap={{ scale: 0.9, rotate: 90 }}
        >
          <Dices size={24} />
        </motion.button>
      </div>

      <div className="w-full h-full p-4 flex items-center justify-center relative">
        <svg
          viewBox="-100 -100 600 600"
          className="w-full h-full drop-shadow-2xl filter"
          style={{ 
            filter: `drop-shadow(0 20px 40px ${color}44)` 
          }}
        >
          {isMeshGradient && <MeshGradient id={gradientId} baseColor={color} />}
          <motion.path
            d={path}
            fill={isMeshGradient ? `url(#${gradientId})` : color}
            initial={false}
            animate={{ d: path }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 80,
              mass: 1
            }}
          />
        </svg>

        <NodeEditor 
          points={points} 
          onPointMove={onPointMove} 
          onPointMoveEnd={onPointMoveEnd}
          active={isPrecisionMode} 
        />
      </div>
    </div>
  );
};
