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
    nav:    "rgba(240,236,228,0.92)",
    text:   "#0a0a0a",
    dim:    "rgba(0,0,0,0.35)",
    accent: "#cc006e",
    border: "rgba(0,0,0,0.08)",
  };
  if (theme === "mid") return {
    nav:    "rgba(6,5,26,0.85)",
    text:   "rgba(210,205,255,0.9)",
    dim:    "rgba(180,170,255,0.38)",
    accent: "#00ffee",
    border: "rgba(120,100,255,0.12)",
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
      backdropFilter: theme === "light" ? "blur(12px)" : "none",
      borderBottom: theme === "light" ? `1px solid ${c.border}` : "none",
      transition: "background 0.3s ease",
    }}>
      <Link href="/" style={{
        fontSize: "0.85rem",
        fontWeight: 700,
        letterSpacing: "0.25em",
        color: c.text,
        textDecoration: "none",
        textTransform: "uppercase",
        transition: "color 0.2s",
      }}>ACADIA</Link>

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
