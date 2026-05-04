"use client";
import Link from "next/link";
import { useState } from "react";

type Category = "all" | "art" | "branding" | "tools";

const PROJECTS = [
  {
    slug: "signal-fm",     cat: "branding", label: "SIGNAL FM",      sub: "underground radio identity", year: "2025", tag: "Brand · Interactive",
    img: "/prints/print11.webp",
  },
  {
    slug: "vanta",         cat: "branding", label: "VANTA",          sub: "Brooklyn nightclub", year: "2025", tag: "Brand · Interactive",
    img: "/prints/print21.webp",
  },
  {
    slug: "hollow",        cat: "branding", label: "HOLLOW",         sub: "Bushwick cold brew café", year: "2024", tag: "Brand · Interactive",
    img: "/prints/print17.webp",
  },
  {
    slug: "silt",          cat: "branding", label: "SILT",           sub: "independent fashion label", year: "2025", tag: "Brand · Interactive",
    img: "/prints/print31.webp",
  },
  {
    slug: "biome",         cat: "art",      label: "BIOME",          sub: "organic neon series", year: "2024–25", tag: "Digital Art · Series",
    img: "/prints/print4.webp",
  },
  {
    slug: "circuit-city",  cat: "art",      label: "CIRCUIT CITY",  sub: "urban manipulation series", year: "2023–24", tag: "Digital Art · Series",
    img: "/prints/print8.webp",
  },
  {
    slug: "frequency",     cat: "art",      label: "FREQUENCY",      sub: "radial transmission series", year: "2024–25", tag: "Digital Art · Series",
    img: "/prints/print3.webp",
  },
  {
    slug: "unavoide",      cat: "tools",    label: "UNAVOIDE",       sub: "free tools & games platform", year: "2018–now", tag: "Design · Dev · Ongoing",
    img: "/prints/print2.webp",
  },
];

const CATS: { id: Category; label: string }[] = [
  { id: "all",      label: "ALL"      },
  { id: "art",      label: "ART"      },
  { id: "branding", label: "BRANDING" },
  { id: "tools",    label: "TOOLS"    },
];

export default function Work() {
  const [active, setActive] = useState<Category>("all");
  const filtered = active === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <h1 style={{ fontFamily: "'Courier New', monospace", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, letterSpacing: "0.1em", color: "#fff", margin: 0 }}>
            WORK
          </h1>

          {/* Filter */}
          <div style={{ display: "flex", gap: "0" }}>
            {CATS.map(({ id, label }) => (
              <button key={id} onClick={() => setActive(id)} style={{
                fontFamily: "monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: active === id ? "#000" : "#444",
                background: active === id ? "#fff" : "transparent",
                border: "1px solid #222",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                transition: "all 0.2s",
                marginLeft: -1,
              }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1px",
          background: "#111",
        }}>
          {filtered.map(p => (
            <Link key={p.slug} href={`/work/${p.slug}`} style={{
              display: "block",
              background: "#000",
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              aspectRatio: "1",
              cursor: "pointer",
            }}
            className="work-card">
              {/* Image */}
              <img src={p.img} alt={p.label} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.6s ease, filter 0.6s ease",
                filter: "brightness(0.6)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.85)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.6)";
              }} />

              {/* Info overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: "1.5rem",
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%)",
                pointerEvents: "none",
              }}>
                <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#ff00aa", marginBottom: "0.3rem" }}>{p.tag}</p>
                <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "1.1rem", fontWeight: 900, letterSpacing: "0.05em", color: "#fff", margin: 0, lineHeight: 1 }}>{p.label}</h2>
                <p style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", marginTop: "0.3rem", letterSpacing: "0.05em" }}>{p.sub}</p>
              </div>

              {/* Year */}
              <div style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                fontFamily: "monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.3)",
              }}>{p.year}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
