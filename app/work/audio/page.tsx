"use client";
import Link from "next/link";
import { useTheme, type Theme } from "../../theme";

function colors(theme: Theme) {
  if (theme === "light") return {
    text: "#111111", dim: "rgba(17,17,17,0.68)", faint: "rgba(17,17,17,0.38)",
    accent: "#e8003d",
  };
  if (theme === "mid") return {
    text: "rgba(255,232,185,0.92)", dim: "rgba(255,210,140,0.82)", faint: "rgba(255,195,120,0.5)",
    accent: "#ffaa00",
  };
  return {
    text: "#ffffff", dim: "rgba(255,255,255,0.7)", faint: "rgba(255,255,255,0.38)",
    accent: "#ff00aa",
  };
}

export default function AudioPage() {
  const { theme } = useTheme();
  const c = colors(theme);

  return (
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "5rem", color: c.text }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 2rem 8rem" }}>

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

        <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.35em", color: c.faint, textTransform: "uppercase", margin: "0 0 0.7rem" }}>2025</p>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 700, letterSpacing: "-0.04em", color: c.text, margin: "0 0 1rem", lineHeight: 0.95 }}>
          Audio
        </h1>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: c.dim, margin: 0, lineHeight: 1.6, borderLeft: `2px solid ${c.accent}`, paddingLeft: "1.2rem", maxWidth: 520 }}>
          Original music — produced in FL Studio. Electronic, experimental, and somewhere in between.
        </p>

      </div>
    </main>
  );
}
