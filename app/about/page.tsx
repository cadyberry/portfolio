"use client";
import Link from "next/link";
import { useTheme, type Theme } from "../theme";

function colors(theme: Theme) {
  if (theme === "light") return {
    bg: "#f9f7f4", text: "#111111", dim: "rgba(17,17,17,0.45)",
    faint: "rgba(17,17,17,0.18)", accent: "#e8003d",
    border: "rgba(0,0,0,0.09)", surface: "rgba(0,0,0,0.03)",
  };
  if (theme === "mid") return {
    bg: "#12082a", text: "rgba(255,232,185,0.92)", dim: "rgba(255,195,120,0.45)",
    faint: "rgba(255,180,80,0.16)", accent: "#ffaa00",
    border: "rgba(180,120,255,0.18)", surface: "rgba(180,120,255,0.06)",
  };
  return {
    bg: "#050508", text: "#ffffff", dim: "rgba(255,255,255,0.35)",
    faint: "rgba(255,255,255,0.1)", accent: "#ff00aa",
    border: "rgba(255,255,255,0.06)", surface: "rgba(255,255,255,0.03)",
  };
}

const SKILLS = [
  "UI Design", "Creative Direction", "Brand Identity",
  "Web Development", "Digital Art", "Photography",
  "Generative AI", "Data Science", "ML Engineering",
  "Illustration", "Art Direction", "Prompt Engineering",
];

const TIMELINE = [
  { year: "2018", event: "Launched unavoide.com — first free tools platform" },
  { year: "2020", event: "Transitioned from acrylic & resin to fully digital" },
  { year: "2021", event: "B.A. Psychological Science, CCSU" },
  { year: "2022", event: "First digital art prints — 60+ editions to date" },
  { year: "2023", event: "M.S. Data Science, CCSU. Built clinical AI systems at scale" },
  { year: "2024", event: "Spacescape launched. Three books in production" },
  { year: "2025", event: "UI Packs, portfolio rebuild, and whatever's next" },
];

export default function About() {
  const { theme } = useTheme();
  const c = colors(theme);

  const label: React.CSSProperties = {
    fontFamily: "monospace", fontSize: "0.5rem",
    letterSpacing: "0.32em", color: c.accent,
    textTransform: "uppercase", margin: "0 0 0.8rem",
    display: "block", transition: "color 0.3s",
  };

  const body: React.CSSProperties = {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(0.875rem, 2vw, 1rem)",
    lineHeight: 1.85, color: c.dim,
    margin: 0, transition: "color 0.3s",
  };

  return (
    <main style={{ background: c.bg, minHeight: "100vh", paddingTop: "5rem", color: c.text, transition: "background 0.3s, color 0.3s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        {/* ── HEADER ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start", marginBottom: "5rem" }}>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: c.faint, textTransform: "uppercase", margin: "0 0 0.8rem" }}>
              Brooklyn, NY · Available for hire
            </p>
            <h1 style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(3rem, 10vw, 6rem)",
              fontWeight: 700, letterSpacing: "-0.04em",
              color: c.text, margin: "0 0 1.5rem", lineHeight: 0.9,
              transition: "color 0.3s",
            }}>acadia<br />berry</h1>
            <p style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              lineHeight: 1.65, color: c.dim,
              fontStyle: "italic",
              borderLeft: `2px solid ${c.accent}`,
              paddingLeft: "1.2rem",
              margin: "0 0 2rem",
              maxWidth: 420,
              transition: "color 0.3s, border-color 0.3s",
            }}>
              Digital designer, artist, and software engineer. I build things that look like they were made by a person, not a template.
            </p>
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
              <Link href="/contact" style={{
                fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.18em",
                color: c.bg, background: c.accent,
                padding: "0.8rem 1.5rem", textDecoration: "none",
                textTransform: "uppercase", display: "inline-flex", alignItems: "center",
                minHeight: 44, transition: "background 0.3s, color 0.3s",
              }}>HIRE ME →</Link>
              <Link href="/work" style={{
                fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.18em",
                color: c.dim, border: `1px solid ${c.border}`,
                padding: "0.8rem 1.5rem", textDecoration: "none",
                textTransform: "uppercase", display: "inline-flex", alignItems: "center",
                minHeight: 44, transition: "border-color 0.3s, color 0.3s",
              }}>SEE THE WORK</Link>
            </div>
          </div>

          {/* Photo TBD */}
          <div style={{
            aspectRatio: "3/4",
            background: c.surface,
            border: `1px solid ${c.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: "0.5rem",
            transition: "background 0.3s, border-color 0.3s",
          }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.42rem", letterSpacing: "0.4em", color: c.faint, textTransform: "uppercase" }}>PHOTO</span>
            <span style={{ fontFamily: "monospace", fontSize: "0.42rem", letterSpacing: "0.4em", color: c.faint, textTransform: "uppercase" }}>TBD</span>
          </div>
        </div>

        {/* ── BIO ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginBottom: "5rem" }}>
          <div>
            <span style={label}>The Person</span>
            <p style={body}>
              Grew up in Connecticut. Made it to Brooklyn. The city has been an education — the density of it, the contradictions, a single block holding a bodega, a gallery, a construction site, a mural, and the best food you've ever had. All of that goes into the work.
            </p>
            <br />
            <p style={body}>
              Started with acrylic and resin. Switched to digital when I realized the canvas didn't have to stop at the edge of the frame. Five years in, the work is neon and biomorphic and psychedelic and unlike anything else. That's intentional.
            </p>
          </div>
          <div>
            <span style={label}>The Work</span>
            <p style={body}>
              Digital art. UI design. Creative direction. Photography. I build brands that have a heartbeat and websites that feel like places. I also build tools — actual software — because the tools that exist are never strange enough.
            </p>
            <br />
            <p style={body}>
              The AI and data science background isn't separate from the creative work. It's why I can go from concept to shipped product without handing off to an engineer. I've built clinical chatbots, document intelligence systems, and generative AI tools at scale. Then I come home and make neon prints.
            </p>
          </div>
        </div>

        {/* ── SKILLS ── */}
        <div style={{ marginBottom: "5rem" }}>
          <span style={label}>Disciplines</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {SKILLS.map(s => (
              <span key={s} style={{
                fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.1em",
                color: c.dim, border: `1px solid ${c.border}`,
                padding: "0.4rem 0.8rem", textTransform: "uppercase",
                transition: "color 0.3s, border-color 0.3s",
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* ── TIMELINE ── */}
        <div style={{ marginBottom: "5rem" }}>
          <span style={label}>Timeline</span>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {TIMELINE.map((item, i) => (
              <div key={item.year} style={{
                display: "grid",
                gridTemplateColumns: "4rem 1fr",
                gap: "1.5rem",
                padding: "0.9rem 0",
                borderBottom: i < TIMELINE.length - 1 ? `1px solid ${c.border}` : "none",
                alignItems: "baseline",
                transition: "border-color 0.3s",
              }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.52rem", color: c.accent, letterSpacing: "0.1em", transition: "color 0.3s" }}>{item.year}</span>
                <span style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", color: c.dim, lineHeight: 1.6, transition: "color 0.3s" }}>{item.event}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CURRENTLY ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: c.border, marginBottom: "5rem" }}>
          {[
            {
              label: "Building",
              items: ["UI Packs — 5 HTML/CSS theme systems", "Spacescape — generative art tools", "Three books (travel photo, coloring, prints)"],
            },
            {
              label: "Available For",
              items: ["UI / product design", "Brand identity", "Creative direction", "Generative AI consulting", "Digital art commissions"],
            },
            {
              label: "Based In",
              items: ["Brooklyn, NY", "Remote-friendly", "Open to travel for the right project"],
            },
          ].map(col => (
            <div key={col.label} style={{ padding: "2rem 1.5rem", background: c.bg, transition: "background 0.3s" }}>
              <span style={label}>{col.label}</span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {col.items.map(item => (
                  <li key={item} style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: c.dim, lineHeight: 1.5, paddingLeft: "0.8rem", position: "relative", transition: "color 0.3s" }}>
                    <span style={{ position: "absolute", left: 0, color: c.accent, transition: "color 0.3s" }}>·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── EDUCATION ── */}
        <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "2.5rem", transition: "border-color 0.3s" }}>
          <span style={label}>Education</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {[
              { degree: "M.S. Data Science", school: "Central Connecticut State University", year: "2023" },
              { degree: "B.A. Psychological Science", school: "Central Connecticut State University", year: "2021" },
            ].map(e => (
              <div key={e.degree} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: c.text, transition: "color 0.3s" }}>{e.degree}</span>
                  <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: c.faint, marginLeft: "1rem", transition: "color 0.3s" }}>{e.school}</span>
                </div>
                <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: c.faint, transition: "color 0.3s" }}>{e.year}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
