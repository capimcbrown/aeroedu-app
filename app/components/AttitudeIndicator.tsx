export default function AttitudeIndicator() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <svg
        viewBox="0 0 300 300"
        className="h-full w-full"
        role="img"
        aria-label="Indicador de horizonte artificial"
      >
        <defs>
          <clipPath id="ballClip">
            <circle cx="150" cy="150" r="130" />
          </clipPath>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a5a78" />
            <stop offset="100%" stopColor="#1c3247" />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a3a22" />
            <stop offset="100%" stopColor="#2c1c10" />
          </linearGradient>
        </defs>

        <g clipPath="url(#ballClip)">
          <rect x="0" y="0" width="300" height="150" fill="url(#sky)" />
          <rect x="0" y="150" width="300" height="150" fill="url(#ground)" />
          <rect x="0" y="147" width="300" height="6" fill="#e0b563" />

          {[...Array(6)].map((_, i) => {
            const y = 150 - (i + 1) * 22;
            return (
              <line
                key={`up-${i}`}
                x1="130"
                y1={y}
                x2="170"
                y2={y}
                stroke="#e8e4da"
                strokeWidth="2"
                opacity="0.6"
              />
            );
          })}
          {[...Array(6)].map((_, i) => {
            const y = 150 + (i + 1) * 22;
            return (
              <line
                key={`down-${i}`}
                x1="130"
                y1={y}
                x2="170"
                y2={y}
                stroke="#e8e4da"
                strokeWidth="2"
                opacity="0.35"
              />
            );
          })}
        </g>

        <circle
          cx="150"
          cy="150"
          r="130"
          fill="none"
          stroke="#c9962c"
          strokeWidth="4"
        />

        <polygon points="150,120 138,142 162,142" fill="#c9962c" />
        <rect x="120" y="148" width="24" height="5" fill="#c9962c" />
        <rect x="156" y="148" width="24" height="5" fill="#c9962c" />

        {[...Array(37)].map((_, i) => {
          const angle = (i * 10 * Math.PI) / 180;
          const r1 = 145;
          const r2 = i % 3 === 0 ? 132 : 138;
          const x1 = 150 + r1 * Math.sin(angle);
          const y1 = 150 - r1 * Math.cos(angle);
          const x2 = 150 + r2 * Math.sin(angle);
          const y2 = 150 - r2 * Math.cos(angle);
          return (
            <line
              key={`tick-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#8a94a3"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
    </div>
  );
}
