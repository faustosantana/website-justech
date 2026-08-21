/** Composición editorial: infraestructura y conectividad, sin stock ni neón. */
export function HeroCanvas() {
  return (
    <div className="hero-canvas" aria-hidden>
      <svg className="hero-svg" viewBox="0 0 560 480" fill="none">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3ec4d0" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0a5c64" stopOpacity="0.05" />
          </linearGradient>
          <linearGradient id="g2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#3ec4d0" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect width="560" height="480" fill="url(#g2)" />
        {Array.from({ length: 8 }, (_, i) => (
          <line
            key={`v${i}`}
            x1={40 + i * 64}
            y1="24"
            x2={40 + i * 64}
            y2="456"
            stroke="#3ec4d0"
            strokeOpacity="0.08"
          />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line
            key={`h${i}`}
            x1="24"
            y1={40 + i * 72}
            x2="536"
            y2={40 + i * 72}
            stroke="#3ec4d0"
            strokeOpacity="0.08"
          />
        ))}
        <rect x="72" y="88" width="196" height="128" stroke="url(#g1)" strokeWidth="1.2" />
        <rect x="292" y="88" width="196" height="80" stroke="#3ec4d0" strokeOpacity="0.35" />
        <rect x="292" y="184" width="196" height="140" stroke="#ffffff" strokeOpacity="0.2" />
        <rect x="72" y="232" width="196" height="92" stroke="#3ec4d0" strokeOpacity="0.22" />
        <circle cx="168" cy="152" r="26" stroke="#3ec4d0" strokeOpacity="0.55" />
        <circle cx="390" cy="254" r="42" stroke="#ffffff" strokeOpacity="0.18" />
        <path d="M168 178v54M168 286h122M390 224V168M390 324v40" stroke="#3ec4d0" strokeOpacity="0.35" />
        <circle cx="168" cy="232" r="3" fill="#3ec4d0" />
        <circle cx="290" cy="286" r="3" fill="#3ec4d0" />
        <circle cx="390" cy="168" r="3" fill="#3ec4d0" />
        <text x="86" y="112" fill="#9ad9e0" fontSize="11" fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.16em">
          OPERACIÓN
        </text>
        <text x="306" y="112" fill="#9ad9e0" fontSize="11" fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.16em">
          CONECTIVIDAD
        </text>
        <text x="86" y="256" fill="#9ad9e0" fontSize="11" fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.16em">
          SOPORTE
        </text>
        <text x="306" y="208" fill="#9ad9e0" fontSize="11" fontFamily="IBM Plex Sans, sans-serif" letterSpacing="0.16em">
          INFRAESTRUCTURA
        </text>
      </svg>
      <div className="hero-orb" />
    </div>
  );
}
