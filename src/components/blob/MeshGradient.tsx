import React from 'react';

interface MeshGradientProps {
  id: string;
  baseColor: string;
  intensity?: number;
}

/**
 * Organic Mesh Gradient Implementation
 * Uses a combination of multiple radial gradients and SVG filters
 * to simulate a complex mesh that follows the organic curvature.
 */
export const MeshGradient: React.FC<MeshGradientProps> = ({ id, baseColor, intensity = 0.5 }) => {
  // Generate variations of the base color for the mesh points
  const color2 = `${baseColor}99`; // 60% opacity
  const color3 = `${baseColor}44`; // 25% opacity
  
  return (
    <defs>
      <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="40" result="blur" />
        <feColorMatrix in="blur" type="saturate" values="1.5" />
      </filter>

      <radialGradient id={`${id}-grad-1`} cx="20%" cy="20%" r="60%">
        <stop offset="0%" stopColor={baseColor} />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>

      <radialGradient id={`${id}-grad-2`} cx="80%" cy="80%" r="50%">
        <stop offset="0%" stopColor={color2} />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>

      <mask id={`${id}-mask`}>
        <rect width="100%" height="100%" fill="white" />
      </mask>

      <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={baseColor} />
        <stop offset="100%" stopColor={color3} />
      </linearGradient>
    </defs>
  );
};
