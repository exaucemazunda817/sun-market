// Animated Grid Pattern (Magic UI), réécrit sans Tailwind ni Framer Motion :
// grille de lignes violettes très légère et quelques cases orange qui
// s'allument tour à tour (animation CSS, mode complet uniquement).
// Positions des cases fixes (pas d'aléatoire) : rendu identique serveur / navigateur.
const SIZE = 56;
const SQUARES: [number, number, number][] = [
  [3, 2, 0], [9, 1, 1.2], [14, 4, 2.4], [6, 6, 3.6], [19, 2, 0.6], [22, 6, 1.8], [11, 8, 3], [2, 9, 4.2], [17, 9, 4.8], [25, 3, 2.1],
];

export default function GridPattern({ id = "sun-grid" }: { id?: string }) {
  return (
    <div className="sun-grid" aria-hidden="true">
      <svg width="100%" height="100%">
        <defs>
          <pattern id={id} width={SIZE} height={SIZE} patternUnits="userSpaceOnUse">
            <path d={`M${SIZE} 0H0V${SIZE}`} fill="none" stroke="rgba(38,26,102,.11)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
        {SQUARES.map(([x, y, delay]) => (
          <rect key={`${x}-${y}`} className="sq" x={x * SIZE + 1} y={y * SIZE + 1} width={SIZE - 1} height={SIZE - 1}
            fill="rgba(239,95,24,.12)" style={{ animationDelay: `${delay}s` }} />
        ))}
      </svg>
    </div>
  );
}
