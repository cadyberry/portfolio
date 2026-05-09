"use client";

export default function Shop() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "4rem 1.5rem 8rem" }}>

        <h1 style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(2.5rem, 10vw, 5rem)",
          fontWeight: 900, letterSpacing: "-0.02em",
          margin: "0 0 3rem", lineHeight: 0.9,
          textTransform: "uppercase",
        }}>SHOP</h1>

        <a href="https://unavoide.com" target="_blank" rel="noopener noreferrer" style={{
          fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.4)", textDecoration: "none", textTransform: "uppercase",
          border: "1px solid rgba(255,255,255,0.15)", padding: "0.8rem 1.5rem",
          display: "inline-flex", alignItems: "center", minHeight: 44,
          transition: "all 0.2s",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.4)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}>
          VISIT UNAVOIDE →
        </a>

      </div>
    </main>
  );
}
