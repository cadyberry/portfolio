"use client";
import Link from "next/link";

const PRINTS = [
  { title: "MYCELIUM I",   year: "2024" },
  { title: "NERVE NET",    year: "2024" },
  { title: "BLOOM STATE",  year: "2025" },
  { title: "SPORE FIELD",  year: "2024" },
  { title: "MYCELIUM II",  year: "2025" },
  { title: "ROOT SIGNAL",  year: "2025" },
];

export default function Biome() {
  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: "#333", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Digital Art Series · 2024–25
        </p>
        <h1 style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(3rem, 10vw, 6rem)",
          fontWeight: 900, letterSpacing: "-0.03em",
          margin: "0 0 0.6rem", lineHeight: 0.88, textTransform: "uppercase",
        }}>BIOME</h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.85rem, 2.5vw, 1rem)", color: "#444", maxWidth: 500, lineHeight: 1.75, marginBottom: "4rem", fontStyle: "italic" }}>
          Organic neon forms. Biomorphic shapes that don't exist in nature but feel like they should. The series explores what life looks like when it escapes the frame.
        </p>

        {/* Masonry-style grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "auto",
          gap: "1px",
          background: "#111",
        }}>
          {PRINTS.map((p, i) => (
            <div key={p.title} style={{
              position: "relative",
              aspectRatio: i === 0 || i === 5 ? "3/4" : "1",
              overflow: "hidden",
              background: "#000",
              gridRow: i === 0 ? "1 / 3" : i === 5 ? "2 / 4" : "auto",
            }}>
              <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(255,255,255,0.06)" }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.42rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.1)", textTransform: "uppercase" }}>TBD</span>
              </div>
              <div style={{
                position: "absolute", bottom: "1rem", left: "1rem",
                pointerEvents: "none",
              }}>
                <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "0.7rem", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "0.04em" }}>{p.title}</p>
                <p style={{ fontFamily: "monospace", fontSize: "0.45rem", color: "rgba(255,255,255,0.4)", margin: 0, letterSpacing: "0.1em" }}>{p.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Statement */}
        <div style={{ borderTop: "1px solid #111", marginTop: "4rem", paddingTop: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "0.8rem" }}>PROCESS</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.8 }}>
              Each piece starts with a single generative seed — a mathematical form drawn to canvas. From there: color, distortion, layering. No photographs. No stock assets. Pure synthetic biology.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "0.8rem" }}>EDITIONS</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.8 }}>
              6 prints in this series. Available as limited edition 5×8 archival prints through the Etsy shop. Each signed.
            </p>
          </div>
        </div>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="https://www.etsy.com" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em",
            color: "#000", background: "#fff", textDecoration: "none",
            padding: "0.9rem 1.8rem", textTransform: "uppercase",
            display: "inline-flex", alignItems: "center", minHeight: 44,
          }}>SHOP PRINTS →</a>
          <Link href="/work" style={{
            fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em",
            color: "#444", textDecoration: "none", textTransform: "uppercase",
            border: "1px solid #1a1a1a", padding: "0.9rem 1.8rem",
            display: "inline-flex", alignItems: "center", minHeight: 44,
            transition: "all 0.2s",
          }}
>
            ← BACK TO WORK
          </Link>
        </div>
      </div>
    </main>
  );
}
