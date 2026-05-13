"use client";
import Link from "next/link";
import { useState } from "react";
import { useTheme, type Theme } from "../theme";

function colors(theme: Theme) {
  if (theme === "light") return {
    bg: "#ffffff", text: "#0f0005", dim: "rgba(184,0,55,0.6)",
    faint: "rgba(184,0,55,0.32)", accent: "#B80037",
    hairline: "rgba(184,0,55,0.10)", rule: "rgba(184,0,55,0.18)",
  };
  if (theme === "mid") return {
    bg: "#1a0008", text: "#FFCCDB", dim: "rgba(255,158,187,0.72)",
    faint: "rgba(255,158,187,0.38)", accent: "#FF5286",
    hairline: "rgba(255,82,134,0.18)", rule: "rgba(255,82,134,0.28)",
  };
  return {
    bg: "#060002", text: "#ffffff", dim: "rgba(255,204,219,0.55)",
    faint: "rgba(255,204,219,0.28)", accent: "#FF0550",
    hairline: "rgba(255,5,80,0.12)", rule: "rgba(255,5,80,0.2)",
  };
}

const SERVICES = [
  "UI / UX", "Websites", "Mobile Apps", "Logo & Identity",
  "Brand Systems", "Creative Consulting", "Photography",
  "Generative AI", "Print & Books", "Art Direction", "Other",
];
const TIMELINES = ["ASAP", "< 1 month", "1–3 months", "3+ months", "Flexible"];

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

export default function Contact() {
  const { theme } = useTheme();
  const c = colors(theme);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedTimeline, setSelectedTimeline] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  function toggleService(s: string) {
    setSelectedServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, project, services: selectedServices, timeline: selectedTimeline, message }),
      });
    } catch (_) {}
    setSending(false);
    setSent(true);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "transparent", border: "none",
    borderBottom: `1px solid ${c.rule}`, color: c.text,
    fontFamily: "Fraunces, serif", fontWeight: 300, fontSize: "1.15rem",
    padding: "0.55rem 0", outline: "none", letterSpacing: "-0.005em",
  };

  const fieldLabelStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.48rem",
    letterSpacing: "0.32em", color: c.faint, textTransform: "uppercase",
    marginBottom: "0.5rem", display: "block",
  };

  const chipStyle = (active: boolean): React.CSSProperties => ({
    fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem",
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: active ? c.bg : c.dim,
    background: active ? c.accent : "transparent",
    border: `1px solid ${active ? c.accent : c.rule}`,
    padding: "0.55rem 0.9rem", cursor: "pointer", minHeight: 38,
  });

  const firstName = name.split(" ")[0] || "friend";

  return (
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "5rem", color: c.text, transition: "color 0.3s" }}>
      <Link href="/" style={{
        position: "fixed", top: "1.4rem", left: "1.4rem", zIndex: 200,
        fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase",
        color: c.dim, textDecoration: "none", transition: "color 0.2s",
        display: "flex", alignItems: "center", gap: "0.3em",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = c.text)}
      onMouseLeave={e => (e.currentTarget.style.color = c.dim)}
      >
        <span style={{color:"#caff3a"}}>←</span> back
      </Link>
      <style>{`
        .contact-input::placeholder { color: ${c.faint}; font-style: italic; }
        .contact-input:focus { border-bottom-color: ${c.accent} !important; }
        .contact-textarea::placeholder { color: ${c.faint}; font-style: italic; }
        .contact-textarea:focus { border-bottom-color: ${c.accent} !important; }
        .elsewhere-row:hover { color: ${c.accent} !important; }
        .elsewhere-row:hover .handle-span { color: ${c.accent} !important; }
        .elsewhere-row:hover .arrow-span { color: ${c.accent} !important; transform: translate(3px,-3px); }
        @media (max-width: 640px) {
          .contact-hero { grid-template-columns: 1fr !important; gap: 2rem !important; align-items: start !important; }
          .contact-form-grid, .contact-elsewhere { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .contact-details { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .contact-row2 { grid-template-columns: 1fr !important; }
          .contact-sent { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .elsewhere-handle { display: none !important; }
        }
      `}</style>

      <div style={{ padding: "0 1.4rem 4rem" }}>

        {/* HERO */}
        <header style={{ padding: "2rem 0 1.8rem", borderBottom: `1px solid ${c.hairline}` }}>
          <h1 style={{
            fontFamily: "Playfair Display, serif", fontWeight: 700,
            fontSize: "clamp(2.8rem, 14vw, 5rem)", letterSpacing: "-0.02em",
            lineHeight: 0.92, color: c.text, margin: "0 0 1rem",
          }}>
            say<br />hello<span style={{ color: c.accent }}>.</span>
          </h1>
          <a href="mailto:acadiaberry@gmail.com" style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem",
            letterSpacing: "0.24em", textTransform: "uppercase", color: c.accent,
            textDecoration: "none",
          }}>acadiaberry@gmail.com</a>
        </header>

        {/* META */}
        <div style={{ borderBottom: `1px solid ${c.hairline}`, marginBottom: "2rem" }}>
          {([
            ["Based",  "Brooklyn, NY"],
            ["Reply",  "Within 48 hours"],
            ["Status", "Open, 2026"],
          ] as const).map(([k, v]) => (
            <div key={k} style={{
              display: "flex", justifyContent: "space-between",
              padding: "0.75rem 0", borderBottom: `1px dashed ${c.hairline}`,
              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
            }}>
              <span style={{ color: c.faint }}>{k}</span>
              <b style={{ fontWeight: 500, color: k === "Status" ? c.accent : c.text }}>{v}</b>
            </div>
          ))}
        </div>

        {/* FORM or SENT */}
        {sent ? (
          <div style={{ padding: "1rem 0 2rem" }}>
            <p style={{ fontFamily: "Fraunces, serif", fontWeight: 300, fontSize: "clamp(1.8rem, 8vw, 2.8rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: c.text, margin: "0 0 0.8rem" }}>
              Got it, <em style={{ color: c.accent, fontStyle: "italic" }}>{firstName}</em>.
            </p>
            <p style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 300, fontSize: "1rem", color: c.dim, margin: "0 0 1.5rem" }}>
              I&apos;ll write back within 48 hours. Until then, go work on the thing.
            </p>
            <button onClick={() => { setSent(false); setName(""); setEmail(""); setProject(""); setMessage(""); setSelectedServices([]); setSelectedTimeline(""); }} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase",
              color: c.faint, background: "none", border: "none",
              borderBottom: `1px solid ${c.rule}`, padding: "0.4rem 0", cursor: "pointer",
            }}>← Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>

            <div className="contact-row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="f-name" style={fieldLabelStyle}>Name</label>
                <input id="f-name" className="contact-input" required value={name} onChange={e => setName(e.target.value)} placeholder="your name" autoComplete="name" style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="f-email" style={fieldLabelStyle}>Email</label>
                <input id="f-email" className="contact-input" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@somewhere.com" autoComplete="email" style={inputStyle} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="f-project" style={fieldLabelStyle}>Project</label>
              <input id="f-project" className="contact-input" value={project} onChange={e => setProject(e.target.value)} placeholder="working title or company" style={inputStyle} />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={fieldLabelStyle}>
                What you need
                <span style={{ color: c.faint, marginLeft: "0.5em" }}>/ pick any</span>
              </span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {SERVICES.map(s => (
                  <button key={s} type="button" onClick={() => toggleService(s)} style={chipStyle(selectedServices.includes(s))}>{s}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={fieldLabelStyle}>Timeline</span>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {TIMELINES.map(t => (
                  <button key={t} type="button" onClick={() => setSelectedTimeline(prev => prev === t ? "" : t)} style={chipStyle(selectedTimeline === t)}>{t}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="f-message" style={fieldLabelStyle}>Tell me about it</label>
              <textarea id="f-message" className="contact-textarea" required rows={4} value={message} onChange={e => setMessage(e.target.value)} placeholder="what you're building, who it's for, where you're stuck" style={{ ...inputStyle, resize: "none", lineHeight: 1.5 }} />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase", color: c.faint }}>
                {sending ? "Sending…" : ""}
              </span>
              <button type="submit" disabled={sending} style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem",
                letterSpacing: "0.22em", textTransform: "uppercase",
                padding: "0.95rem 1.6rem", display: "inline-flex", alignItems: "center",
                gap: "0.8rem", minHeight: 44, background: c.accent, color: c.bg,
                border: `1px solid ${c.accent}`, cursor: sending ? "wait" : "pointer",
                opacity: sending ? 0.5 : 1,
              }}>Send it →</button>
            </div>

          </form>
        )}

        {/* ELSEWHERE */}
        <div style={{ marginTop: "3rem", borderTop: `1px solid ${c.hairline}`, paddingTop: "1.5rem" }}>
          {[
            { platform: "GitHub",    handle: "@cadyberry",    href: "https://github.com/cadyberry" },
            { platform: "Shop",      handle: "unavoide.com",  href: "https://unavoide.com" },
            { platform: "Instagram", handle: "@acadiaberry",  href: "https://instagram.com/acadiaberry" },
          ].map(row => (
            <a key={row.platform} className="elsewhere-row" href={row.href} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              padding: "0.9rem 0", borderBottom: `1px solid ${c.hairline}`,
              textDecoration: "none", color: c.text,
              fontFamily: "Inter, sans-serif", transition: "color 0.2s",
            }}>
              <span style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 400, fontSize: "1rem" }}>{row.platform}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.5rem", letterSpacing: "0.12em", color: c.faint }}>↗</span>
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}
