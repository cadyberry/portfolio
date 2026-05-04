"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme, type Theme } from "../theme";

const LINKS = [
  { href: "/work",    label: "WORK"    },
  { href: "/play",    label: "PLAY"    },
  { href: "/shop",    label: "SHOP"    },
  { href: "/about",   label: "ABOUT"   },
  { href: "/contact", label: "CONTACT" },
];

function HomeGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="20" height="20" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5" y="5" width="5" height="5" fill="currentColor" />
      <rect x="12" y="5" width="5" height="5" fill="currentColor" />
      <rect x="5" y="12" width="5" height="5" fill="currentColor" />
      <rect x="12" y="12" width="5" height="5" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" fill="currentColor" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="5" fill="currentColor" />
      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
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
    nav:    "rgba(249,247,244,0.96)",
    text:   "#111111",
    dim:    "rgba(17,17,17,0.38)",
    accent: "#e8003d",
    border: "rgba(0,0,0,0.1)",
  };
  if (theme === "mid") return {
    nav:    "rgba(18,8,42,0.9)",
    text:   "rgba(255,232,185,0.92)",
    dim:    "rgba(255,195,120,0.42)",
    accent: "#ffaa00",
    border: "rgba(180,120,255,0.2)",
  };
  return {
    nav:    "transparent",
    text:   "#ffffff",
    dim:    "#555",
    accent: "#ff00aa",
    border: "rgba(255,255,255,0.08)",
  };
}

export default function Nav() {
  const path = usePathname() ?? "";
  const { theme, cycle } = useTheme();
  const c = themeColors(theme);

  return (
    <nav style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1.2rem 2rem",
      fontFamily: "'Courier New', monospace",
      background: c.nav,
      backdropFilter: theme !== "dark" ? "blur(12px)" : "none",
      borderBottom: theme !== "dark" ? `1px solid ${c.border}` : "none",
      transition: "background 0.3s ease",
    }}>
      <Link href="/" aria-label="Home" style={{
        color: c.dim,
        display: "flex",
        alignItems: "center",
        transition: "color 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = c.accent)}
      onMouseLeave={e => (e.currentTarget.style.color = c.dim)}>
        <HomeGlyph />
      </Link>

      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {LINKS.map(({ href, label }) => (
          <Link key={href} href={href} style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: path.startsWith(href) ? c.accent : c.dim,
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = c.text)}
          onMouseLeave={e => (e.currentTarget.style.color = path.startsWith(href) ? c.accent : c.dim)}>
            {label}
          </Link>
        ))}

        {/* Theme toggle */}
        <button
          onClick={cycle}
          aria-label="Toggle theme"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: c.text,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "50%",
            padding: 0,
            transition: "color 0.2s, opacity 0.2s",
            opacity: 0.7,
            marginLeft: "0.5rem",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "0.7")}
        >
          {ICONS[theme]}
        </button>
      </div>
    </nav>
  );
}
