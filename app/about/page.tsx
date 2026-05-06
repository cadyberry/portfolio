"use client";
import Link from "next/link";
import { useTheme, type Theme } from "../theme";

function colors(theme: Theme) {
  if (theme === "light") return {
    bg: "#f6f3ee", text: "#111111", dim: "rgba(17,17,17,0.66)",
    faint: "rgba(17,17,17,0.38)", accent: "#e8003d",
    hairline: "rgba(17,17,17,0.10)", rule: "rgba(17,17,17,0.16)",
  };
  if (theme === "mid") return {
    bg: "#12082a", text: "rgba(255,232,185,0.94)", dim: "rgba(255,210,140,0.78)",
    faint: "rgba(255,195,120,0.45)", accent: "#ffaa00",
    hairline: "rgba(180,120,255,0.18)", rule: "rgba(180,120,255,0.30)",
  };
  return {
    bg: "#050508", text: "#ffffff", dim: "rgba(255,255,255,0.62)",
    faint: "rgba(255,255,255,0.32)", accent: "#ff00aa",
    hairline: "rgba(255,255,255,0.06)", rule: "rgba(255,255,255,0.10)",
  };
}

const SERVICES = [
  "UI / UX", "Websites", "Mobile Apps",
  "Logo & Identity", "Social Media Planning", "Creative Consulting",
  "Poster Design", "Brand Systems", "Digital Art",
  "Generative AI", "Photography", "Art Direction",
  "Motion Design", "Illustration", "Print & Book Design",
  "Web Apps", "Prompt Engineering", "Data Visualization",
];

const TECH = ["Figma","Angular","React","Next.js","TypeScript","Node.js","Python","TailwindCSS","SQL","Git","Adobe CC","Framer","Vercel","OpenAI API","FL Studio"];

function Label({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <span style={{
      fontFamily: "'JetBrains Mono', ui-monospace, monospace",
      fontSize: "0.5rem", letterSpacing: "0.32em", textTransform: "uppercase" as const,
      color: accent, display: "inline-flex", alignItems: "center", gap: "0.6rem",
    }}>
      <span style={{ display: "inline-block", width: 14, height: 1, background: "currentColor" }} />
      {children}
    </span>
  );
}

export default function About() {
  const { theme } = useTheme();
  const c = colors(theme);

  return (
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "7rem", color: c.text, transition: "color 0.3s" }}>
      <style>{`
        @keyframes venn-breath {
          0%, 100% { fill-opacity: 0.07; }
          50%       { fill-opacity: 0.16; }
        }
        .venn-c { animation: venn-breath 12s ease-in-out infinite; }
        .venn-c.b { animation-delay: -4s; }
        .venn-c.c { animation-delay: -8s; }
        @media (max-width: 880px) {
          .about-hero, .about-manifesto, .about-venn, .about-services,
          .about-tech, .about-edu, .about-cta { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .about-currently { grid-template-columns: 1fr !important; }
          .about-currently .spacer { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .venn-c { animation: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 2rem 8rem" }}>

        {/* HERO */}
        <header className="about-hero" style={{
          display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)",
          gap: "5rem", alignItems: "end",
          paddingBottom: "4rem", marginBottom: "5rem",
          borderBottom: `1px solid ${c.hairline}`,
        }}>
          <div>
            <h1 style={{
              fontFamily: "Inter, sans-serif", fontWeight: 700,
              fontSize: "clamp(3rem, 10vw, 6rem)", letterSpacing: "-0.04em",
              lineHeight: 0.9, color: c.text, margin: "0 0 1.4rem",
            }}>
              <em style={{ fontStyle: "normal" }}>acadia</em><br />
              berry<span style={{ color: c.accent }}>.</span>
            </h1>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: c.faint, margin: 0 }}>
              designer · artist · technologist
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", paddingBottom: "0.4rem" }}>
            {(["Based","Working","Status","Index"] as const).map((k, i) => {
              const vals = ["Brooklyn, NY","Remote-friendly","Available, 2026","01 — About"];
              return (
                <div key={k} style={{
                  display: "flex", justifyContent: "space-between", gap: "1rem",
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem",
                  letterSpacing: "0.2em", textTransform: "uppercase", color: c.faint,
                  paddingBottom: "0.5rem", borderBottom: `1px dashed ${c.hairline}`,
                }}>
                  <span>{k}</span>
                  <b style={{ color: k === "Status" ? c.accent : c.text, fontWeight: 500 }}>{vals[i]}</b>
                </div>
              );
            })}
          </div>
        </header>

        {/* MANIFESTO */}
        <section className="about-manifesto" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", marginBottom: "7rem" }}>
          <div style={{ paddingTop: "0.35rem" }}><Label accent={c.accent}>Ethos</Label></div>
          <p style={{
            fontFamily: "Fraunces, serif", fontWeight: 300,
            fontSize: "clamp(1.35rem, 2.4vw, 1.85rem)", lineHeight: 1.45,
            letterSpacing: "-0.012em", color: c.text, maxWidth: "38ch", margin: 0,
          }}>
            A <span style={{ color: c.accent, fontStyle: "italic" }}>generalist who thinks in form</span>.{" "}
            Visual, audio, or code
            <span style={{ fontStyle: "italic", color: c.dim }}> — design is the thread of what she does.</span>{" "}
            Acadia is drawn to the{" "}
            <span style={{ color: c.accent, fontStyle: "italic" }}>endless possibility of what can be expressed through computers</span>
            <span style={{ fontStyle: "italic", color: c.dim }}> and how that shapes the way people see, feel, and connect</span>.
          </p>
        </section>

        {/* VENN */}
        <section className="about-venn" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", marginBottom: "7rem" }}>
          <div style={{ paddingTop: "0.35rem" }}><Label accent={c.accent}>Practice</Label></div>
          <div style={{ height: 440, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
            <svg width="420" height="380" viewBox="0 0 420 380" style={{ overflow: "visible" }}>
              <circle className="venn-c a" cx="210" cy="135" r="115" fill={c.accent} fillOpacity={0.08} stroke={c.accent} strokeOpacity={0.55} strokeWidth={1} />
              <circle className="venn-c b" cx="140" cy="240" r="115" fill={c.accent} fillOpacity={0.08} stroke={c.accent} strokeOpacity={0.55} strokeWidth={1} />
              <circle className="venn-c c" cx="280" cy="240" r="115" fill={c.accent} fillOpacity={0.08} stroke={c.accent} strokeOpacity={0.55} strokeWidth={1} />
            </svg>
            {[
              { label: "Designer", sub: "identity · ui · brand systems", style: { top: 0, left: "50%", transform: "translateX(-50%)" } },
              { label: "Developer", sub: "web · tools · prototypes",    style: { bottom: 14, left: "14%", transform: "translateX(-50%)" } },
              { label: "Artist",    sub: "generative · photo · print",  style: { bottom: 14, right: "14%", transform: "translateX(50%)" } },
            ].map(({ label, sub, style }) => (
              <div key={label} style={{ position: "absolute", textAlign: "center", ...style }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: c.text }}>
                  {label}
                </span>
                <small style={{ display: "block", marginTop: "0.35rem", fontSize: "0.48rem", letterSpacing: "0.2em", color: c.faint, lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>
                  {sub}
                </small>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section style={{ marginBottom: "7rem" }}>
          <div className="about-services" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", alignItems: "start" }}>
            <div><Label accent={c.accent}>Services</Label></div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {SERVICES.map(s => (
                <span key={s} style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem",
                  letterSpacing: "0.1em", color: c.dim,
                  border: `1px solid ${c.rule}`,
                  padding: "0.4rem 0.8rem", textTransform: "uppercase",
                }}>{s}</span>
              ))}
            </div>
          </div>
        </section>

        {/* TECH */}
        <section className="about-tech" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", marginBottom: "7rem" }}>
          <div><Label accent={c.accent}>Technical</Label></div>
          <p style={{ fontFamily: "Fraunces, serif", fontWeight: 300, fontSize: "clamp(1.05rem, 1.7vw, 1.3rem)", lineHeight: 1.9, color: c.dim, maxWidth: "60ch", margin: 0 }}>
            {TECH.map((t, i) => (
              <span key={t}>
                <span style={{ color: c.text, fontStyle: "italic" }}>{t}</span>
                {i < TECH.length - 1 && <span style={{ color: c.faint, margin: "0 0.35em" }}>·</span>}
              </span>
            ))}
          </p>
        </section>

        {/* CURRENTLY */}
        <section style={{ marginBottom: "7rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", marginBottom: "2rem" }}>
            <div><Label accent={c.accent}>Currently</Label></div>
          </div>
          <div className="about-currently" style={{ display: "grid", gridTemplateColumns: "200px repeat(3, 1fr)", gap: "3rem", borderTop: `1px solid ${c.hairline}`, paddingTop: "2.5rem" }}>
            <div className="spacer" />
            {[
              {
                title: "Building",
                items: [
                  <><b style={{ color: c.text, fontWeight: 500 }}>UI Packs</b> — five HTML/CSS theme systems</>,
                  <><b style={{ color: c.text, fontWeight: 500 }}>Spacescape</b> — generative art tools</>,
                  <><b style={{ color: c.text, fontWeight: 500 }}>Three books</b> — travel photo, coloring, prints</>,
                ],
              },
              {
                title: "Available For",
                items: ["Freelance projects","Contract engagements","Long-term retainers","Art commissions","Creative consulting"],
              },
              {
                title: "Listening / Reading",
                items: ["Lo-fi mixes & FL Studio sessions","Computer Lib / Dream Machines","Old web archives, late-90s GeoCities"],
              },
            ].map(col => (
              <div key={col.title}>
                <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: c.text, marginBottom: "1.2rem", fontWeight: 500 }}>{col.title}</h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                  {col.items.map((item, i) => (
                    <li key={i} style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.5, color: c.dim, paddingLeft: "1.1rem", position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, top: "-0.05em", color: c.accent, fontSize: "1.4em", lineHeight: 1 }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="about-edu" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", marginBottom: "6rem" }}>
          <div><Label accent={c.accent}>Education</Label></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { degree: "M.S. Data Science", school: "Central Connecticut State University", year: "2023" },
              { degree: "B.A. Psychological Science", school: "Central Connecticut State University", year: "2021" },
            ].map((e, i, arr) => (
              <div key={e.degree} style={{
                display: "grid", gridTemplateColumns: "1fr 2fr 80px", gap: "2rem",
                alignItems: "baseline", padding: "1.4rem 0",
                borderTop: `1px solid ${c.hairline}`,
                ...(i === arr.length - 1 ? { borderBottom: `1px solid ${c.hairline}` } : {}),
              }}>
                <span style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.05rem", color: c.text }}>{e.degree}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: c.dim }}>{e.school}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", letterSpacing: "0.18em", color: c.faint, textAlign: "right" }}>{e.year}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta" style={{
          borderTop: `1px solid ${c.hairline}`, paddingTop: "4rem",
          display: "grid", gridTemplateColumns: "200px 1fr auto",
          gap: "3rem", alignItems: "center",
        }}>
          <div><Label accent={c.accent}>Get in touch</Label></div>
          <p style={{
            fontFamily: "Fraunces, serif", fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(1.4rem, 2.6vw, 2rem)", lineHeight: 1.25, color: c.text,
            maxWidth: "24ch", letterSpacing: "-0.012em", margin: 0,
          }}>
            Have something in mind?
          </p>
          <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <Link href="/contact" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem",
              letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none",
              padding: "0.95rem 1.6rem", display: "inline-flex", alignItems: "center",
              gap: "0.8rem", minHeight: 44, background: c.accent, color: c.bg,
              border: `1px solid ${c.accent}`,
            }}>Work with me →</Link>
            <Link href="/work" style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem",
              letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none",
              padding: "0.95rem 1.6rem", display: "inline-flex", alignItems: "center",
              minHeight: 44, color: c.dim, border: `1px solid ${c.rule}`,
              background: "transparent",
            }}>See the work</Link>
          </div>
        </section>

      </div>
    </main>
  );
}
