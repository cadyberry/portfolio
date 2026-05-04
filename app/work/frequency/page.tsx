"use client";
import Link from "next/link";

const PRINTS = [
  { src: "/prints/print3.webp",  title: "FREQUENCY 01", sub: "First transmission",  year: "2024" },
  { src: "/prints/print4.webp",  title: "RADIAL 01",    sub: "Signal expanding",    year: "2024" },
  { src: "/prints/print5.webp",  title: "PULSE",        sub: "Standing wave",       year: "2024" },
  { src: "/prints/print8.webp",  title: "FREQUENCY 02", sub: "Interference pattern", year: "2025" },
  { src: "/prints/print20.webp", title: "MANDALA SYS",  sub: "Rotational field",    year: "2025" },
  { src: "/prints/print31.webp", title: "CARRIER WAVE", sub: "Final transmission",  year: "2025" },
];

export default function Frequency() {
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
        }}>FREQUENCY</h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.85rem, 2.5vw, 1rem)", color: "#444", maxWidth: 500, lineHeight: 1.75, marginBottom: "4rem", fontStyle: "italic" }}>
          Radial transmission. Every piece is organized around a center — a signal point — and radiates outward. Mandalas if mandalas were built from math and neon.
        </p>

        {/* 2-column layout: large left, stacked right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "#111", marginBottom: "1px" }}>
          {/* Large featured */}
          <div style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#000", gridRow: "1 / 3" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PRINTS[0].src} alt={PRINTS[0].title} style={{
              width: "100%", height: "100%", objectFit: "cover",
              filter: "brightness(0.8) saturate(1.3)",
              transition: "filter 0.5s, transform 0.5s",
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = "brightness(1) saturate(1.5)"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.filter = "brightness(0.8) saturate(1.3)"; e.currentTarget.style.transform = "scale(1)"; }} />
            <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", pointerEvents: "none" }}>
              <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "1rem", fontWeight: 900, color: "#fff", margin: 0 }}>{PRINTS[0].title}</p>
              <p style={{ fontFamily: "monospace", fontSize: "0.48rem", color: "rgba(255,255,255,0.4)", margin: 0, letterSpacing: "0.1em" }}>{PRINTS[0].sub}</p>
            </div>
          </div>

          {/* Stacked right */}
          {PRINTS.slice(1, 3).map(p => (
            <div key={p.title} style={{ position: "relative", aspectRatio: "2/1", overflow: "hidden", background: "#000" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.title} style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: "brightness(0.65) saturate(1.2)",
                transition: "filter 0.4s",
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.9) saturate(1.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "brightness(0.65) saturate(1.2)"; }} />
              <div style={{ position: "absolute", bottom: "0.8rem", left: "1rem", pointerEvents: "none" }}>
                <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "0.75rem", fontWeight: 900, color: "#fff", margin: 0 }}>{p.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "#111" }}>
          {PRINTS.slice(3).map(p => (
            <div key={p.title} style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#000" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.title} style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: "brightness(0.6) saturate(1.1)",
                transition: "filter 0.4s, transform 0.4s",
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.9) saturate(1.4)"; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "brightness(0.6) saturate(1.1)"; e.currentTarget.style.transform = "scale(1)"; }} />
              <div style={{ position: "absolute", bottom: "0.8rem", left: "0.8rem", pointerEvents: "none" }}>
                <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "0.65rem", fontWeight: 900, color: "#fff", margin: 0 }}>{p.title}</p>
                <p style={{ fontFamily: "monospace", fontSize: "0.42rem", color: "rgba(255,255,255,0.35)", margin: 0, letterSpacing: "0.08em" }}>{p.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #111", marginTop: "4rem", paddingTop: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "0.8rem" }}>STRUCTURE</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.8 }}>
              Every piece in this series is built from rotational symmetry. A generative kernel is spun, mirrored, and layered until it resolves into something that looks intentional — because it is, just not by hand.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "0.8rem" }}>AVAILABLE</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.8 }}>
              6-piece series. Archival prints, 5×8 and 8×10 available. Limited run. Ships worldwide via Etsy.
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
          }}>← BACK TO WORK</Link>
        </div>
      </div>
    </main>
  );
}
