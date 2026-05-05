"use client";
import Link from "next/link";
import { useTheme, type Theme } from "../theme";

function colors(theme: Theme) {
  if (theme === "light") return {
    bg: "#f9f7f4", text: "#111111", dim: "rgba(17,17,17,0.72)",
    faint: "rgba(17,17,17,0.5)", accent: "#e8003d",
    border: "rgba(0,0,0,0.09)", surface: "rgba(0,0,0,0.03)",
    glass: "rgba(255,255,255,0.55)", glassBorder: "rgba(255,255,255,0.85)",
  };
  if (theme === "mid") return {
    bg: "#12082a", text: "rgba(255,232,185,0.92)", dim: "rgba(255,210,140,0.85)",
    faint: "rgba(255,195,120,0.65)", accent: "#ffaa00",
    border: "rgba(180,120,255,0.18)", surface: "rgba(180,120,255,0.06)",
    glass: "rgba(140,80,255,0.08)", glassBorder: "rgba(180,120,255,0.2)",
  };
  return {
    bg: "#050508", text: "#ffffff", dim: "rgba(255,255,255,0.75)",
    faint: "rgba(255,255,255,0.5)", accent: "#ff00aa",
    border: "rgba(255,255,255,0.06)", surface: "rgba(255,255,255,0.03)",
    glass: "rgba(255,255,255,0.05)", glassBorder: "rgba(255,255,255,0.12)",
  };
}

const SERVICES = [
  "Poster Design", "Websites", "Mobile Apps",
  "Logo & Identity", "Social Media Planning", "Creative Consulting",
  "UI / UX", "Brand Systems", "Digital Art",
  "Generative AI", "Photography", "Art Direction",
  "Motion Design", "Illustration", "Print & Book Design",
  "Web Apps", "Prompt Engineering", "Data Visualization",
];

const TECH = [
  "Figma", "Angular", "React", "Next.js", "TypeScript",
  "Node.js", "Python", "TailwindCSS", "SQL", "Git",
  "Adobe CC", "Framer", "Vercel", "OpenAI API", "FL Studio",
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
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "5rem", color: c.text, transition: "color 0.3s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        {/* ── HEADER ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", marginBottom: "5rem" }}>
          <div>
            <h1 style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(3rem, 10vw, 6rem)",
              fontWeight: 700, letterSpacing: "-0.04em",
              color: c.text, margin: "0 0 0.6rem", lineHeight: 0.9,
              transition: "color 0.3s",
            }}>acadia<br />berry</h1>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: c.faint, textTransform: "uppercase", margin: "0 0 2rem", transition: "color 0.3s" }}>
              Brooklyn, NYC
            </p>
            <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
              <Link href="/contact" style={{
                fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.18em",
                color: c.bg, background: c.accent,
                padding: "0.8rem 1.5rem", textDecoration: "none",
                textTransform: "uppercase", display: "inline-flex", alignItems: "center",
                minHeight: 44, transition: "background 0.3s, color 0.3s",
              }}>WORK WITH ME →</Link>
              <Link href="/work" style={{
                fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.18em",
                color: c.dim, border: `1px solid ${c.border}`,
                padding: "0.8rem 1.5rem", textDecoration: "none",
                textTransform: "uppercase", display: "inline-flex", alignItems: "center",
                minHeight: 44, transition: "border-color 0.3s, color 0.3s",
              }}>SEE THE WORK</Link>
            </div>
          </div>

          {/* Venn diagram */}
          <svg viewBox="0 0 460 420" style={{ width: "100%", maxWidth: 500, overflow: "visible" }} aria-hidden="true">
            <defs>
              <style>{`.vc { mix-blend-mode: screen; }`}</style>
            </defs>

            {/* Filled circles — centered in viewBox with room for labels */}
            <circle className="vc" cx="170" cy="200" r="105" fill={c.accent} opacity="0.14"/>
            <circle className="vc" cx="290" cy="200" r="105" fill={c.accent} opacity="0.14"/>
            <circle className="vc" cx="230" cy="282" r="105" fill={c.accent} opacity="0.14"/>

            {/* Outlines */}
            <circle cx="170" cy="200" r="105" fill="none" stroke={c.accent} strokeWidth="1" opacity="0.38"/>
            <circle cx="290" cy="200" r="105" fill="none" stroke={c.accent} strokeWidth="1" opacity="0.38"/>
            <circle cx="230" cy="282" r="105" fill="none" stroke={c.accent} strokeWidth="1" opacity="0.38"/>

            {/* ART — label sits above-left, anchored to circle's upper-left edge */}
            <text x="98" y="72" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="3" fill={c.text} fontWeight="600" textDecoration="none">ART</text>
            <text x="98" y="84" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={c.faint}>illustration · prints</text>
            <text x="98" y="94" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={c.faint}>photography</text>

            {/* TECH — label sits above-right */}
            <text x="362" y="72" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="3" fill={c.text} fontWeight="600">TECH</text>
            <text x="362" y="84" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={c.faint}>ml · data science</text>
            <text x="362" y="94" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={c.faint}>web dev · typescript</text>

            {/* DESIGN — label sits below the bottom circle */}
            <text x="230" y="404" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="3" fill={c.text} fontWeight="600">DESIGN</text>
            <text x="230" y="392" textAnchor="middle" fontFamily="monospace" fontSize="7" fill={c.faint}>ui/ux · brand · motion</text>

            {/* Short tick lines from labels to circle edges */}
            <line x1="98" y1="98" x2="115" y2="112" stroke={c.accent} strokeWidth="0.5" opacity="0.3"/>
            <line x1="362" y1="98" x2="345" y2="112" stroke={c.accent} strokeWidth="0.5" opacity="0.3"/>
            <line x1="230" y1="387" x2="230" y2="374" stroke={c.accent} strokeWidth="0.5" opacity="0.3"/>

            {/* Intersection labels */}
            <text x="230" y="172" textAnchor="middle" fontFamily="monospace" fontSize="6.5" letterSpacing="1" fill={c.dim} opacity="0.65">generative ai</text>
            <text x="163" y="268" textAnchor="middle" fontFamily="monospace" fontSize="6.5" letterSpacing="1" fill={c.dim} opacity="0.65">art direction</text>
            <text x="297" y="268" textAnchor="middle" fontFamily="monospace" fontSize="6.5" letterSpacing="1" fill={c.dim} opacity="0.65">product design</text>
          </svg>
        </div>

        {/* ── BIO ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", marginBottom: "5rem" }}>
          <div style={{ background: c.glass, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${c.glassBorder}`, padding: "2rem", borderRadius: 0 }}>
            <span style={label}>The Person</span>
            <p style={body}>
              Acadia is a Brooklyn-based designer and technologist. She helps clients build a complete online presence — from brand and identity through to the interfaces and websites themselves. The goal is cohesion: every part of how a brand shows up online, designed and built by the same hand.
            </p>
          </div>
          <div style={{ background: c.glass, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${c.glassBorder}`, padding: "2rem", borderRadius: 0 }}>
            <span style={label}>The Work</span>
            <p style={body}>
              Acadia&apos;s work spans generative AI tools, digital art, UI systems, photography, audio engineering, and software built from scratch. Running since 2018 — tools that didn&apos;t exist yet, prints that don&apos;t look like anyone else&apos;s. The technical background (ML engineering, clinical AI, data science at scale) means the work isn&apos;t just aesthetic. It ships.
            </p>
          </div>
        </div>


        {/* ── SERVICES ── */}
        <div style={{ marginBottom: "5rem" }}>
          <span style={label}>Services</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {SERVICES.map(s => (
              <span key={s} style={{
                fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.1em",
                color: c.dim, border: `1px solid ${c.border}`,
                background: c.glass,
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                padding: "0.4rem 0.8rem", textTransform: "uppercase",
                transition: "color 0.3s, border-color 0.3s",
              }}>{s}</span>
            ))}
          </div>
        </div>

        {/* ── TECH ── */}
        <div style={{ marginBottom: "5rem" }}>
          <span style={label}>Technical</span>
          <p style={{ margin: 0, lineHeight: 2.2 }}>
            {TECH.map((s, i) => (
              <span key={s}>
                <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.12em", color: c.dim, textTransform: "uppercase" }}>{s}</span>
                {i < TECH.length - 1 && <span style={{ color: c.faint, margin: "0 0.5em" }}>·</span>}
              </span>
            ))}
          </p>
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
            <div key={col.label} style={{ padding: "2rem 1.5rem", background: c.glass, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", transition: "background 0.3s" }}>
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
        <div style={{ background: c.glass, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${c.glassBorder}`, padding: "2.5rem", transition: "background 0.3s, border-color 0.3s" }}>
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
      <style>{`
        .venn-c {
          position: absolute;
          width: 170px; height: 170px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.13);
          background: rgba(255,255,255,0.025);
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .venn-designer { left:65px; top:0; justify-content:flex-start; align-items:center; padding-top:20px; }
        .venn-developer { left:0; top:90px; justify-content:flex-end; align-items:flex-start; padding:0 0 20px 20px; }
        .venn-ux { left:130px; top:90px; justify-content:flex-end; align-items:flex-end; padding:0 20px 20px 0; }
        .venn-title { font-family:monospace; font-size:0.55rem; font-weight:600; letter-spacing:0.08em; text-transform:lowercase; color:rgba(255,255,255,0.75); line-height:1.3; text-align:center; }
        .venn-developer .venn-title { text-align:left; }
        .venn-ux .venn-title { text-align:right; }
        .venn-sub { font-family:monospace; font-size:0.46rem; color:rgba(255,255,255,0.28); line-height:1.7; letter-spacing:0.04em; text-align:center; }
        .venn-developer .venn-sub { text-align:left; }
        .venn-ux .venn-sub { text-align:right; }
      `}</style>
    </main>
  );
}
