"use client";

import { useTheme, type Theme } from "../theme";

function HomeGlyph() {
  // hex-packed drupelets clipped to berry ellipse
  const even = [8.5, 13, 17.5, 22];
  const odd  = [11, 15.5, 20];
  const rows = [
    { y: 13,   xs: even },
    { y: 17,   xs: odd  },
    { y: 21,   xs: even },
    { y: 25,   xs: odd  },
    { y: 29,   xs: even },
    { y: 33,   xs: odd  },
  ];
  return (
    <svg width="30" height="30" viewBox="0 0 30 34" fill="none" aria-hidden="true">
      <defs>
        <clipPath id="bc">
          <ellipse cx="15" cy="23" rx="10.5" ry="11.5"/>
        </clipPath>
      </defs>

      {/* stem */}
      <path d="M15 12 C15 9.5 15.5 7 16.5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
      {/* calyx leaves */}
      <path d="M15 13 C12 12 10.5 10 11.5 8.5 C12.5 7 14.5 9 15 12" fill="currentColor" opacity="0.6"/>
      <path d="M15 13 C18 12 19.5 10 18.5 8.5 C17.5 7 15.5 9 15 12" fill="currentColor" opacity="0.6"/>
      <path d="M15 13 C15 10.5 16 8.5 17.5 8 C19 7.5 18.5 10 15 13" fill="currentColor" opacity="0.35"/>

      {/* berry base — dark fill between drupelets */}
      <ellipse cx="15" cy="23" rx="10.5" ry="11.5" fill="currentColor" opacity="0.35"/>

      {/* drupelets */}
      <g clipPath="url(#bc)">
        {rows.flatMap(({ y, xs }) =>
          xs.map(x => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="2.6" fill="currentColor"/>
              <circle cx={x - 0.9} cy={y - 0.9} r="0.8" fill="white" opacity="0.28"/>
            </g>
          ))
        )}
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M22 16.5A9 9 0 1 1 13.5 8a7 7 0 0 0 8.5 8.5z" fill="currentColor" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <circle cx="15" cy="15" r="5.5" fill="currentColor" />
      <line x1="15" y1="3" x2="15" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="15" y1="24" x2="15" y2="27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5.4" y1="5.4" x2="7.5" y2="7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="22.5" y1="22.5" x2="24.6" y2="24.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="3" y1="15" x2="6" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="15" x2="27" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5.4" y1="24.6" x2="7.5" y2="22.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="22.5" y1="7.5" x2="24.6" y2="5.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="currentColor">
      <path d="M15 3l3 9.2h9.7L20 18l3 9.2L15 21.5 8 27.2l3-9.2L3.3 12.2H13z" />
    </svg>
  );
}

const ICONS: Record<Theme, React.ReactNode> = {
  dark:  <MoonIcon />,
  light: <SunIcon />,
  mid:   <StarIcon />,
};

function themeColors(theme: Theme) {
  if (theme === "light") return {
    nav:     "transparent",
    glassBg: "transparent",
    text:    "#0f0005",
    dim:     "rgba(184,0,55,0.45)",
    accent:  "#B80037",
    border:  "rgba(184,0,55,0.12)",
  };
  if (theme === "mid") return {
    nav:     "transparent",
    glassBg: "transparent",
    text:    "#FFCCDB",
    dim:     "rgba(255,158,187,0.55)",
    accent:  "#FF5286",
    border:  "rgba(255,82,134,0.2)",
  };
  return {
    nav:     "transparent",
    glassBg: "transparent",
    text:    "#ffffff",
    dim:     "rgba(255,204,219,0.45)",
    accent:  "#FF0550",
    border:  "rgba(255,5,80,0.12)",
  };
}

export default function Nav() {
  const { theme, cycle } = useTheme();
  const c = themeColors(theme);

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "1.2rem 1.2rem",
      minHeight: "4rem",
      background: "transparent",
    }}>
      <button
        onClick={cycle}
        aria-label="Toggle theme"
        style={{
          background: "none", border: "none", cursor: "pointer",
          color: c.text, display: "flex", alignItems: "center",
          justifyContent: "center", width: 30, height: 30,
          borderRadius: "50%", padding: 0,
          transition: "color 0.2s, opacity 0.2s", opacity: 0.7,
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
      >
        {ICONS[theme]}
      </button>
    </nav>
  );
}
