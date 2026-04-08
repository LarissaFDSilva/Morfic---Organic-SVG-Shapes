import React from 'react';
import { motion } from 'motion/react';
import { Point } from '../../lib/blob';

interface NodeEditorProps {
  points: Point[];
  onPointMove: (index: number, newPoint: Point) => void;
  onPointMoveEnd?: () => void;
  active: boolean;
}

/**
 * Node Editor (Precision Mode)
 * Renders interactive draggable nodes over the SVG path.
 * Uses Framer Motion for high-performance drag gestures.
 */
export const NodeEditor: React.FC<NodeEditorProps> = ({ points, onPointMove, onPointMoveEnd, active }) => {
  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg viewBox="0 0 400 400" className="w-full h-full overflow-visible">
        {points.map((point, index) => (
          <motion.circle
            key={index}
            cx={point.x}
            cy={point.y}
            r={6}
            className="fill-white dark:fill-gray-800 stroke-accent stroke-2 cursor-move pointer-events-auto shadow-lg transition-colors"
            drag
            dragMomentum={false}
            onDrag={(_, info) => {
              // Calculate relative movement
              onPointMove(index, {
                x: point.x + info.delta.x,
                y: point.y + info.delta.y
              });
            }}
            onDragEnd={onPointMoveEnd}
            whileHover={{ scale: 1.5, r: 8 }}
            whileDrag={{ scale: 1.2, fill: "var(--color-accent)" }}
          />
        ))}
      </svg>
    </div>
  );
};
