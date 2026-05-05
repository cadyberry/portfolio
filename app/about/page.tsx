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

const SKILLS = [
  "UI Design", "Creative Direction", "Brand Identity",
  "Web Development", "Digital Art", "Photography",
  "Generative AI", "Data Science", "ML Engineering",
  "Illustration", "Art Direction", "Prompt Engineering",
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
              Designer, artist, engineer. Something between all three, depending on the day.
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
            background: c.glass,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${c.glassBorder}`,
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
          <div style={{ background: c.glass, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${c.glassBorder}`, padding: "2rem", borderRadius: 0 }}>
            <span style={label}>The Person</span>
            <p style={body}>
              Grew up in Connecticut. Moved to Brooklyn. Started making things with acrylic and resin because I needed something physical to hold. Switched to digital when I realized I didn't have to stop at the edge of the frame. The work is neon and biomorphic and psychedelic and I've never seen anyone else make stuff that looks like it. That's the point.
            </p>
          </div>
          <div style={{ background: c.glass, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${c.glassBorder}`, padding: "2rem", borderRadius: 0 }}>
            <span style={label}>The Work</span>
            <p style={body}>
              UI design. Creative direction. Photography. Digital art. I've spent years building AI systems at scale — clinical chatbots, document intelligence, things running in hospitals. That background means I can go from concept to shipped product without handing it off. Then I come home and make neon prints.
            </p>
            <br />
            <p style={body}>
              I also build tools because the tools that exist are never strange enough.
            </p>
          </div>
        </div>

        {/* ── VENN ── */}
        <div style={{ marginBottom: "5rem" }}>
          <span style={label}>Roles</span>
          <div style={{ position: "relative", width: 300, height: 260, margin: "2rem auto 0" }}>
            <div className="venn-c venn-designer">
              <span className="venn-title">designer</span>
              <span className="venn-sub">prints · etsy<br />commissions<br />photography</span>
            </div>
            <div className="venn-c venn-developer">
              <span className="venn-title">software<br />developer</span>
              <span className="venn-sub">angular · node<br />typescript<br />github</span>
            </div>
            <div className="venn-c venn-ux">
              <span className="venn-title">ui / ux</span>
              <span className="venn-sub">motion.dev<br />interaction<br />responsive</span>
            </div>
          </div>
        </div>

        {/* ── VENN DIAGRAM ── */}
        <div style={{ marginBottom: "5rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={label}>where it all overlaps</span>
          <svg viewBox="0 0 420 300" style={{ width: "100%", maxWidth: 520, overflow: "visible" }} aria-hidden="true">
            <defs>
              <style>{`
                .venn-circle { mix-blend-mode: screen; }
              `}</style>
            </defs>

            {/* Three circles */}
            <circle className="venn-circle" cx="175" cy="130" r="110" fill={c.accent} opacity="0.18"/>
            <circle className="venn-circle" cx="245" cy="130" r="110" fill={c.accent} opacity="0.18"/>
            <circle className="venn-circle" cx="210" cy="195" r="110" fill={c.accent} opacity="0.18"/>

            {/* Circle outlines */}
            <circle cx="175" cy="130" r="110" fill="none" stroke={c.accent} strokeWidth="1" opacity="0.35"/>
            <circle cx="245" cy="130" r="110" fill="none" stroke={c.accent} strokeWidth="1" opacity="0.35"/>
            <circle cx="210" cy="195" r="110" fill="none" stroke={c.accent} strokeWidth="1" opacity="0.35"/>

            {/* Labels — outer */}
            <text x="100" y="72" textAnchor="middle" fontFamily="monospace" fontSize="11" letterSpacing="2" fill={c.dim} textDecoration="none" style={{ textTransform: "uppercase" }}>ART</text>
            <text x="320" y="72" textAnchor="middle" fontFamily="monospace" fontSize="11" letterSpacing="2" fill={c.dim}>TECH</text>
            <text x="210" y="295" textAnchor="middle" fontFamily="monospace" fontSize="11" letterSpacing="2" fill={c.dim}>DESIGN</text>

            {/* Center label */}
            <text x="210" y="168" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="13" fontWeight="700" letterSpacing="-0.5" fill={c.text}>acadia</text>
          </svg>
        </div>

        {/* ── SKILLS ── */}
        <div style={{ marginBottom: "5rem" }}>
          <span style={label}>Disciplines</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {SKILLS.map(s => (
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
