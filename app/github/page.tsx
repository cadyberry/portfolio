"use client";

import Link from "next/link";
import { useTheme, type Theme } from "../theme";

const GITHUB_URL = "https://github.com/cadyberry";

const ITEMS = [
  { label: "tools I built for myself that maybe work for you too" },
  { label: "experiments that got too big to delete" },
  { label: "the occasional actually-finished project" },
];

function palette(theme: Theme) {
  if (theme === "light") return {
    bg:      "#f8f5f0",
    text:    "#160008",
    dim:     "rgba(0,0,0,0.38)",
    border:  "rgba(0,0,0,0.08)",
    accent:  "#B80037",
    btnBg:   "#160008",
    btnText: "#f8f5f0",
    pip:     "rgba(0,0,0,0.15)",
  };
  if (theme === "mid") return {
    bg:      "#0e0005",
    text:    "#FFCCDB",
    dim:     "rgba(255,204,219,0.4)",
    border:  "rgba(192,176,240,0.12)",
    accent:  "#FF5286",
    btnBg:   "#FFCCDB",
    btnText: "#0e0005",
    pip:     "rgba(255,204,219,0.2)",
  };
  return {
    bg:      "#060002",
    text:    "#ffffff",
    dim:     "rgba(255,255,255,0.35)",
    border:  "rgba(255,255,255,0.07)",
    accent:  "#FF0550",
    btnBg:   "#ffffff",
    btnText: "#060002",
    pip:     "rgba(255,255,255,0.12)",
  };
}

export default function GithubPage() {
  const { theme } = useTheme();
  const p = palette(theme);

  return (
    <main style={{
      minHeight:      "100vh",
      background:     p.bg,
      color:          p.text,
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "6rem 1.5rem 3rem",
      transition:     "background 0.3s, color 0.3s",
    }}>

      {/* back */}
      <Link href="/" style={{
        position:      "fixed",
        top:           "1.4rem",
        left:          "1.4rem",
        fontSize:      "0.55rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color:         p.dim,
        textDecoration:"none",
        transition:    "color 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = p.text)}
      onMouseLeave={e => (e.currentTarget.style.color = p.dim)}
      >
        ← back
      </Link>

      <div style={{ maxWidth: 480, width: "100%" }}>

        {/* heading */}
        <p style={{
          fontSize:      "0.55rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         p.dim,
          marginBottom:  "0.6rem",
        }}>
          github / cadyberry
        </p>

        <h1 style={{
          fontSize:      "clamp(1.6rem, 6vw, 2.4rem)",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          lineHeight:    1.1,
          marginBottom:  "1.8rem",
        }}>
          what's over there
        </h1>

        {/* list */}
        <ul style={{
          listStyle:    "none",
          padding:      0,
          margin:       "0 0 2.4rem",
          display:      "flex",
          flexDirection:"column",
          gap:          "0.75rem",
        }}>
          {ITEMS.map((item, i) => (
            <li key={i} style={{
              display:    "flex",
              alignItems: "baseline",
              gap:        "0.75rem",
              fontSize:   "clamp(0.85rem, 3vw, 1rem)",
              lineHeight: 1.55,
              color:      p.text,
            }}>
              <span style={{
                flexShrink:  0,
                width:       6,
                height:      6,
                borderRadius:"50%",
                background:  p.accent,
                marginTop:   "0.35em",
                display:     "inline-block",
              }}/>
              {item.label}
            </li>
          ))}
        </ul>

        {/* divider */}
        <div style={{ borderTop: `1px solid ${p.border}`, marginBottom: "2rem" }}/>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:        "inline-block",
              padding:        "0.75rem 1.6rem",
              background:     p.btnBg,
              color:          p.btnText,
              fontSize:       "0.72rem",
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              textDecoration: "none",
              borderRadius:   "10px",
              transition:     "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            take me there →
          </a>

          <Link
            href="/"
            style={{
              display:        "inline-block",
              padding:        "0.75rem 1.6rem",
              background:     "transparent",
              color:          p.dim,
              fontSize:       "0.72rem",
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              textDecoration: "none",
              border:         `1px solid ${p.border}`,
              borderRadius:   "10px",
              transition:     "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = p.text;
              e.currentTarget.style.borderColor = p.text;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = p.dim;
              e.currentTarget.style.borderColor = p.border;
            }}
          >
            maybe later
          </Link>
        </div>
      </div>
    </main>
  );
}
