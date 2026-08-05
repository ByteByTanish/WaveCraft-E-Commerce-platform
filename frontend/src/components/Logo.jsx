export default function Logo({ className = "", size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient id="waveGradient" x1="8" y1="8" x2="40" y2="40">
          <stop offset="0%" stopColor="#25E0B1" />
          <stop offset="100%" stopColor="#18C998" />
        </linearGradient>

        <filter
          id="glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Rounded Border */}
      <rect
        x="1"
        y="1"
        width="46"
        height="46"
        rx="13"
        stroke="rgba(37,224,177,.35)"
        strokeWidth="1.2"
      />

      {/* Headphone Band */}
      <path
        d="M12 23
           C12 14 17 9 24 9
           C31 9 36 14 36 23"
        stroke="url(#waveGradient)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Left Earcup */}
      <rect
        x="10"
        y="22"
        width="5"
        height="11"
        rx="2.5"
        fill="url(#waveGradient)"
      />

      {/* Right Earcup */}
      <rect
        x="33"
        y="22"
        width="5"
        height="11"
        rx="2.5"
        fill="url(#waveGradient)"
      />

      {/* W Wave */}
      <path
        filter="url(#glow)"
        d="
        M16 29
        L20 21
        L24 31
        L28 21
        L32 29
      "
        stroke="url(#waveGradient)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}