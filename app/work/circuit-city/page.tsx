"use client";
import Link from "next/link";

const PRINTS = [
  { title: "GRID BLEED",    year: "2023", loc: "Brooklyn" },
  { title: "OVERPASS",      year: "2023", loc: "Manhattan" },
  { title: "CIRCUIT #1",    year: "2024", loc: "The Bronx" },
  { title: "LONG ISLAND CITY", year: "2023", loc: "Queens" },
  { title: "ROOFTOP STACK", year: "2024", loc: "Brooklyn" },
  { title: "CIRCUIT #2",    year: "2024", loc: "Newark" },
];

export default function CircuitCity() {
  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: "#333", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Digital Art Series · 2023–24
        </p>
        <h1 style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(3rem, 10vw, 6rem)",
          fontWeight: 900, letterSpacing: "-0.03em",
          margin: "0 0 0.6rem", lineHeight: 0.88, textTransform: "uppercase",
        }}>CIRCUIT CITY</h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.85rem, 2.5vw, 1rem)", color: "#444", maxWidth: 500, lineHeight: 1.75, marginBottom: "4rem", fontStyle: "italic" }}>
          Urban space turned signal. The city as infrastructure — overhead wire, stacked concrete, light bleed. Photographed then manipulated until the source is barely there.
        </p>

        {/* Full-width hero */}
        <div style={{ position: "relative", aspectRatio: "21/9", overflow: "hidden", background: "#050505", marginBottom: "1px" }}>
          <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(255,255,255,0.06)" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.42rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.1)", textTransform: "uppercase" }}>TBD</span>
          </div>
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 50%)",
            display: "flex", alignItems: "flex-end", padding: "2rem",
          }}>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)", margin: "0 0 0.3rem" }}>SERIES OPENER · 2023</p>
              <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff", margin: 0 }}>GRID BLEED</h2>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", background: "#111" }}>
          {PRINTS.slice(1).map(p => (
            <div key={p.title} style={{ position: "relative", aspectRatio: "1", overflow: "hidden", background: "#000" }}>
              <div style={{ width: "100%", height: "100%", background: "#080808", display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(255,255,255,0.06)" }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.42rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.1)", textTransform: "uppercase" }}>TBD</span>
              </div>
              <div style={{
                position: "absolute", bottom: "1rem", left: "1rem", pointerEvents: "none",
              }}>
                <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "0.7rem", fontWeight: 900, color: "#fff", margin: 0 }}>{p.title}</p>
                <p style={{ fontFamily: "monospace", fontSize: "0.45rem", color: "rgba(255,255,255,0.35)", margin: 0, letterSpacing: "0.1em" }}>{p.loc} · {p.year}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid #111", marginTop: "4rem", paddingTop: "2.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "3rem" }}>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "0.8rem" }}>PROCESS</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.8 }}>
              Shot on phone. Taken in passing — from trains, off bridges, during the commute. Then layered, blended, re-colored until the city is recognizable but strange.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "0.8rem" }}>MEDIUM</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.8 }}>
              Digital manipulation of original photographs. 5×8 archival prints available. 6-piece series.
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
          }}><span style={{color:"#caff3a"}}>←</span> BACK TO WORK</Link>
        </div>
      </div>
    </main>
  );
}
