"use client";
import Link from "next/link";
import { useTheme, type Theme } from "../theme";
import { NOTES } from "../lib/notes";

function colors(theme: Theme) {
  if (theme === "light") return {
    text: "#111111", dim: "rgba(17,17,17,0.65)", faint: "rgba(17,17,17,0.35)",
    accent: "#e8003d", border: "rgba(0,0,0,0.09)", glass: "rgba(255,255,255,0.55)",
    glassBorder: "rgba(255,255,255,0.85)",
  };
  if (theme === "mid") return {
    text: "rgba(255,232,185,0.92)", dim: "rgba(255,210,140,0.8)", faint: "rgba(255,195,120,0.5)",
    accent: "#ffaa00", border: "rgba(180,120,255,0.18)", glass: "rgba(140,80,255,0.08)",
    glassBorder: "rgba(180,120,255,0.2)",
  };
  return {
    text: "#ffffff", dim: "rgba(255,255,255,0.7)", faint: "rgba(255,255,255,0.38)",
    accent: "#ff00aa", border: "rgba(255,255,255,0.06)", glass: "rgba(255,255,255,0.04)",
    glassBorder: "rgba(255,255,255,0.1)",
  };
}

export default function Notes() {
  const { theme } = useTheme();
  const c = colors(theme);

  return (
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "5rem", color: c.text }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "3rem 2rem 8rem" }}>

        <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: c.faint, textTransform: "uppercase", margin: "0 0 0.8rem" }}>
          Writing
        </p>
        <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2.5rem, 8vw, 4.5rem)", fontWeight: 700, letterSpacing: "-0.04em", color: c.text, margin: "0 0 4rem", lineHeight: 0.95 }}>
          Notes
        </h1>

        {NOTES.length === 0 && (
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", color: c.faint, fontStyle: "italic" }}>
            Coming soon.
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          {NOTES.map((note, i) => (
            <Link
              key={note.slug}
              href={`/notes/${note.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "140px 1fr",
                gap: "2rem",
                padding: "2rem 0",
                borderTop: `1px solid ${c.border}`,
                borderBottom: i === NOTES.length - 1 ? `1px solid ${c.border}` : "none",
                textDecoration: "none",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <span style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.1em", color: c.faint, paddingTop: "0.25rem" }}>
                {note.date}
              </span>
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1.1rem", fontWeight: 600, color: c.text, margin: "0 0 0.4rem", letterSpacing: "-0.02em" }}>
                  {note.title}
                </p>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", color: c.dim, lineHeight: 1.6, margin: 0 }}>
                  {note.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
