"use client";
import Link from "next/link";
import { useTheme, type Theme } from "../../theme";

const TOOLS = [
  { name: "Kaleidoscope",   desc: "Draw mirrored across 2–16 axes of symmetry simultaneously.",                        path: "kaleidoscope" },
  { name: "Generative Art", desc: "Recursive patterns, Lissajous curves, and particle systems you can export.",        path: "generative-art" },
  { name: "Pixel Editor",   desc: "Grid-snapped pixel art with animation frames, sprite sheets, and GIF export.",      path: "pixel-editor" },
];

function colors(theme: Theme) {
  if (theme === "light") return {
    text: "#111111", dim: "rgba(17,17,17,0.68)", faint: "rgba(17,17,17,0.38)",
    accent: "#e8003d", border: "rgba(0,0,0,0.09)",
  };
  if (theme === "mid") return {
    text: "rgba(255,232,185,0.92)", dim: "rgba(255,210,140,0.82)", faint: "rgba(255,195,120,0.5)",
    accent: "#ffaa00", border: "rgba(180,120,255,0.18)",
  };
  return {
    text: "#ffffff", dim: "rgba(255,255,255,0.7)", faint: "rgba(255,255,255,0.38)",
    accent: "#ff00aa", border: "rgba(255,255,255,0.06)",
  };
}

export default function DesignToolsPage() {
  const { theme } = useTheme();
  const c = colors(theme);
  const base = "https://unafield.vercel.app/tools";

  return (
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "5rem", color: c.text }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 8rem" }}>

        {/* Back */}
        <Link href="/" style={{
          fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.28em",
          color: c.faint, textDecoration: "none", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center",
          marginBottom: "3rem", transition: "color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = c.text)}
        onMouseLeave={e => (e.currentTarget.style.color = c.faint)}>
          ← Index
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "1rem" }}>
          <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 700, letterSpacing: "-0.04em", color: c.text, margin: "0 0 1rem", lineHeight: 0.95 }}>
            Design Tools
          </h1>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: c.dim, margin: "0 0 0.8rem", lineHeight: 1.6, borderLeft: `2px solid ${c.accent}`, paddingLeft: "1.2rem", maxWidth: 560 }}>
            Browser-based creative tools built from scratch — no install, no account, all free.
          </p>
        </div>

        {/* CTA to full site */}
        <div style={{ borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, padding: "1.2rem 0", marginBottom: "3rem", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <a href="https://unafield.vercel.app/" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.2em",
            color: c.accent, textDecoration: "none", textTransform: "uppercase",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            show all tools →
          </a>
        </div>

        {/* Tool list */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {TOOLS.map((tool, i) => (
            <div key={tool.path} style={{
              display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "2rem",
              padding: "1.1rem 0",
              borderBottom: i < TOOLS.length - 1 ? `1px solid ${c.border}` : "none",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", flex: 1 }}>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.95rem", fontWeight: 600, color: c.text, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{tool.name}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: c.faint, lineHeight: 1.5 }}>{tool.desc}</span>
              </div>
              <a href={`${base}/${tool.path}`} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "monospace", fontSize: "0.42rem", letterSpacing: "0.18em",
                color: c.accent, textDecoration: "none", textTransform: "uppercase",
                whiteSpace: "nowrap", transition: "opacity 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
                open tool →
              </a>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
