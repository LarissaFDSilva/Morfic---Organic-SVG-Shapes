/**
 * Blob generation logic
 * Inspired by the organic shapes of Morfic
 */

export interface BlobOptions {
  seed: number;
  complexity: number; // number of points (3 to 20)
  contrast: number; // randomness (0 to 1)
  size?: number;
}

export interface Point {
  x: number;
  y: number;
}

/**
 * Generates the raw points for a blob based on polar coordinates.
 * Uses a seeded random approach to ensure diverse angles and organic shapes.
 */
export function generateBlobPoints(options: BlobOptions): Point[] {
  const { seed, complexity, contrast, size = 400 } = options;
  const center = size / 2;
  const radius = size / 3;
  const pointsCount = Math.max(3, Math.min(20, complexity));
  const angleStep = (Math.PI * 2) / pointsCount;
  
  const seededRandom = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  const coords: Point[] = [];
  for (let i = 0; i < pointsCount; i++) {
    const angle = i * angleStep - Math.PI / 2;
    // Diverse angles: radius varies based on seed and contrast
    const rOffset = (seededRandom(seed + i) - 0.5) * contrast * radius * 1.5;
    const r = radius + rOffset;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    coords.push({ x, y });
  }
  return coords;
}

/**
 * Converts an array of points into a smooth SVG path using Catmull-Rom interpolation.
 * This ensures the "metamorphosis" between states feels fluid and natural.
 */
export function pointsToPath(points: Point[]): string {
  if (points.length < 3) return "";

  const n = points.length;
  let path = `M ${points[0].x},${points[0].y}`;

  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    // Tension factor controls the "curviness" of the organic shape
    const tension = 6;
    const cp1x = p1.x + (p2.x - p0.x) / tension;
    const cp1y = p1.y + (p2.y - p0.y) / tension;
    const cp2x = p2.x - (p3.x - p1.x) / tension;
    const cp2y = p2.y - (p3.y - p1.y) / tension;

    path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }

  return path + " Z";
}

export function generateBlobPath(options: BlobOptions): string {
  const points = generateBlobPoints(options);
  return pointsToPath(points);
}

export function getRandomSeed(): number {
  return Math.floor(Math.random() * 1000000);
}
