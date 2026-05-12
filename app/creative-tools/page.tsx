"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, type Theme } from "../theme";

const TOOLS_URL = "https://unafield.vercel.app";

const HIGHLIGHTS = [
  {
    name: "kaleidoscope",
    desc: "mirror your camera or an image into infinite symmetry. real-time, adjustable segments.",
  },
  {
    name: "color field",
    desc: "generate flowing color gradients and export them as wallpapers or artwork.",
  },
  {
    name: "pattern maker",
    desc: "build repeating tile patterns from shapes and export to SVG.",
  },
  {
    name: "noise canvas",
    desc: "perlin noise visualizer — tweak scale, speed, and palette until something clicks.",
  },
];

function palette(theme: Theme) {
  if (theme === "light") return {
    bg:          "#f8f5f0",
    text:        "#160008",
    dim:         "rgba(0,0,0,0.38)",
    border:      "rgba(0,0,0,0.12)",
    accent:      "#B80037",
    btnBg:       "#160008",
    btnText:     "#f8f5f0",
    cellBg:      "rgba(0,0,0,0.03)",
    cellActive:  "#160008",
    cellTextActive: "#f8f5f0",
  };
  if (theme === "mid") return {
    bg:          "#0e0005",
    text:        "#FFCCDB",
    dim:         "rgba(255,204,219,0.4)",
    border:      "rgba(192,176,240,0.16)",
    accent:      "#FF5286",
    btnBg:       "#FFCCDB",
    btnText:     "#0e0005",
    cellBg:      "rgba(255,204,219,0.04)",
    cellActive:  "#FFCCDB",
    cellTextActive: "#0e0005",
  };
  return {
    bg:          "#060002",
    text:        "#ffffff",
    dim:         "rgba(255,255,255,0.35)",
    border:      "rgba(255,255,255,0.1)",
    accent:      "#FF0550",
    btnBg:       "#ffffff",
    btnText:     "#060002",
    cellBg:      "rgba(255,255,255,0.03)",
    cellActive:  "#ffffff",
    cellTextActive: "#060002",
  };
}

export default function CreativeToolsPage() {
  const { theme } = useTheme();
  const p = palette(theme);
  const [active, setActive] = useState<number | null>(null);

  return (
    <main style={{
      minHeight:      "100vh",
      background:     p.bg,
      color:          p.text,
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "6rem 1.5rem 4rem",
      transition:     "background 0.3s, color 0.3s",
    }}>

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

        <p style={{
          fontSize:      "0.55rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         p.dim,
          marginBottom:  "0.6rem",
        }}>
          unafield / tools
        </p>

        <h1 style={{
          fontSize:      "clamp(1.6rem, 6vw, 2.4rem)",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          lineHeight:    1.1,
          marginBottom:  "0.75rem",
        }}>
          browser-based creative tools
        </h1>

        <p style={{
          fontSize:      "0.85rem",
          color:         p.dim,
          lineHeight:    1.65,
          marginBottom:  "1.8rem",
        }}>
          free to use in the browser. no installs, no accounts.
        </p>

        {/* 2×2 quadrant grid — home tab style */}
        <div style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "0.6rem",
          marginBottom:        "1rem",
        }}>
          {HIGHLIGHTS.map((tool, i) => {
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => setActive(isActive ? null : i)}
                style={{
                  background:    isActive ? p.accent : p.cellActive,
                  color:         isActive ? "#fff"   : p.cellTextActive,
                  border:        "none",
                  borderRadius:  "clamp(18px, 6vw, 28px)",
                  padding:       "1.6rem 1rem",
                  textAlign:     "center",
                  cursor:        "pointer",
                  fontFamily:    "'Violet Sans', sans-serif",
                  transition:    "background 0.18s, transform 0.18s",
                  transform:     isActive ? "scale(1.04)" : "scale(1)",
                  boxShadow:     isActive ? `0 0 0 2.5px ${p.accent}` : "none",
                  display:       "flex",
                  alignItems:    "center",
                  justifyContent:"center",
                }}
              >
                <span style={{
                  fontSize:      "clamp(0.5rem, 2.5vw, 0.65rem)",
                  letterSpacing: "-0.01em",
                  fontWeight:    400,
                  lineHeight:    1.2,
                  textTransform: "lowercase",
                }}>
                  {tool.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* description panel */}
        <div style={{ minHeight: "3.5rem", marginBottom: "2rem" }}>
          <AnimatePresence mode="wait">
            {active !== null && (
              <motion.p
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  fontSize:      "0.88rem",
                  color:         p.text,
                  lineHeight:    1.65,
                  margin:        0,
                  paddingLeft:   "0.25rem",
                }}
              >
                {HIGHLIGHTS[active].desc}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div style={{ borderTop: `1px solid ${p.border}`, marginBottom: "2rem" }}/>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a
            href={TOOLS_URL}
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
