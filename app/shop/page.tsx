"use client";
import Link from "next/link";

const BOOKS = [
  {
    title: "THE WORLD AS I FOUND IT",
    sub: "A travel photography collection",
    spec: "Softcover · Full color · Coming 2025",
    size: "Standard print",
    status: "coming",
    img: "/prints/print20.webp",
    desc: "Life is pretty when you look at it right. Six years of travel, strangers, light, and the moments you can't plan.",
  },
  {
    title: "COLOR ME IN",
    sub: "An adult coloring book",
    spec: "8 × 11 in · 40 pages",
    size: "8 × 11 in",
    status: "coming",
    img: "/prints/print3.webp",
    desc: "My digital art translated into intricate line work. Biomorphic, psychedelic, endlessly fillable.",
  },
  {
    title: "PRINTS",
    sub: "A collection of digital works",
    spec: "5 × 8 in · Limited edition",
    size: "5 × 8 in",
    status: "coming",
    img: "/prints/print11.webp",
    desc: "Sixty prints. Seven years of work. The neon, the black, the forms that don't exist anywhere else.",
  },
];

const PRINT_PREVIEWS = [
  "/prints/print2.webp", "/prints/print4.webp", "/prints/print17.webp",
  "/prints/print21.webp", "/prints/print8.webp", "/prints/print31.webp",
];

export default function Shop() {
  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>

        <h1 style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(2.5rem, 10vw, 5rem)",
          fontWeight: 900, letterSpacing: "-0.02em",
          margin: "0 0 0.4rem", lineHeight: 0.9,
          textTransform: "uppercase",
        }}>SHOP</h1>
        <p style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.25em", color: "#333", textTransform: "uppercase", marginBottom: "4rem" }}>
          prints · books · coming soon
        </p>

        {/* Books section */}
        <div style={{ marginBottom: "5rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "1.5rem" }}>BOOKS — IN PRODUCTION</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
            {BOOKS.map(book => (
              <div key={book.title} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Book cover preview */}
                <div style={{ position: "relative", aspectRatio: book.size === "8 × 11 in" ? "8.5/11" : book.size === "5 × 8 in" ? "5/8" : "4/3", overflow: "hidden", background: "#050505" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={book.img} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", flexDirection: "column",
                    justifyContent: "flex-end", padding: "1rem",
                    background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)",
                  }}>
                    <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.2em", color: "#555", margin: 0 }}>{book.spec}</p>
                  </div>
                  {/* Coming soon badge */}
                  <div style={{
                    position: "absolute", top: "1rem", right: "1rem",
                    fontFamily: "monospace", fontSize: "0.45rem", letterSpacing: "0.2em",
                    color: "#ff00aa", border: "1px solid #ff00aa",
                    padding: "0.25rem 0.5rem", textTransform: "uppercase",
                  }}>COMING SOON</div>
                </div>

                <div>
                  <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "0.95rem", fontWeight: 900, letterSpacing: "0.02em", color: "#fff", margin: "0 0 0.2rem", textTransform: "uppercase" }}>{book.title}</h2>
                  <p style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#444", margin: 0, letterSpacing: "0.1em" }}>{book.sub}</p>
                </div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#555", lineHeight: 1.7, margin: 0 }}>{book.desc}</p>

                <button style={{
                  fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
                  color: "#333", background: "transparent", border: "1px solid #1a1a1a",
                  padding: "0.7rem 1rem", cursor: "not-allowed", textTransform: "uppercase",
                  minHeight: 44, marginTop: "1.5rem",
                }}>NOTIFY ME</button>
              </div>
            ))}
          </div>
        </div>

        {/* Prints section — links to Etsy */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", margin: 0 }}>PRINTS — AVAILABLE NOW</p>
            <a href="https://www.etsy.com" target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
              color: "#444", textDecoration: "none", textTransform: "uppercase",
              border: "1px solid #1a1a1a", padding: "0.5rem 1rem",
              transition: "all 0.2s", minHeight: 44, display: "flex", alignItems: "center",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#444"; e.currentTarget.style.borderColor = "#1a1a1a"; }}>
              SHOP ON ETSY →
            </a>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "1px", background: "#111" }}>
            {PRINT_PREVIEWS.map((src, i) => (
              <a key={i} href="https://www.etsy.com" target="_blank" rel="noopener noreferrer" style={{
                display: "block", aspectRatio: "1", overflow: "hidden",
                position: "relative", background: "#000",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  transition: "transform 0.4s, filter 0.4s",
                  filter: "brightness(0.7)",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.filter = "brightness(1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(0.7)"; }} />
              </a>
            ))}
          </div>
          <p style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#333", letterSpacing: "0.15em", textAlign: "center", marginTop: "1rem" }}>
            60+ prints available · various sizes · ships worldwide
          </p>
        </div>
      </div>
    </main>
  );
}
