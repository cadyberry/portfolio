"use client";
import { useState } from "react";
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
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "7rem", color: c.text, transition: "color 0.3s" }}>
      <style>{`
        .contact-input::placeholder { color: ${c.faint}; font-style: italic; }
        .contact-input:focus { border-bottom-color: ${c.accent} !important; }
        .contact-textarea::placeholder { color: ${c.faint}; font-style: italic; }
        .contact-textarea:focus { border-bottom-color: ${c.accent} !important; }
        .elsewhere-row:hover { color: ${c.accent} !important; }
        .elsewhere-row:hover .handle-span { color: ${c.accent} !important; }
        .elsewhere-row:hover .arrow-span { color: ${c.accent} !important; transform: translate(3px,-3px); }
        @media (max-width: 880px) {
          .contact-hero { grid-template-columns: 1fr !important; gap: 2rem !important; align-items: start !important; }
          .contact-form-grid, .contact-elsewhere { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .contact-details { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .contact-row2 { grid-template-columns: 1fr !important; }
          .contact-sent { grid-template-columns: 1fr !important; gap: 1.5rem !important; }
          .elsewhere-handle { display: none !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 2rem 8rem" }}>

        {/* HERO */}
        <header className="contact-hero" style={{
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
              say<br />hello<span style={{ color: c.accent }}>.</span>
            </h1>
            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: c.faint, margin: 0 }}>
              acadiaberry@gmail.com
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", paddingBottom: "0.4rem" }}>
            {[
              ["Email",  <a key="e" href="mailto:acadiaberry@gmail.com" style={{ color: c.accent, textDecoration: "none" }}>acadiaberry@gmail.com</a>],
              ["Based",  <b key="b" style={{ color: c.text, fontWeight: 500 }}>Brooklyn, NY</b>],
              ["Reply",  <b key="r" style={{ color: c.text, fontWeight: 500 }}>Within 48 hours</b>],
              ["Status", <b key="s" style={{ color: c.accent, fontWeight: 500 }}>Open, 2026</b>],
            ].map(([k, v]) => (
              <div key={String(k)} style={{
                display: "flex", justifyContent: "space-between", gap: "1rem",
                fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem",
                letterSpacing: "0.2em", textTransform: "uppercase", color: c.faint,
                paddingBottom: "0.5rem", borderBottom: `1px dashed ${c.hairline}`,
              }}>
                <span>{k}</span>
                {v}
              </div>
            ))}
          </div>
        </header>

        {/* PITCH */}
        {/* FORM or SENT */}
        {sent ? (
          <section className="contact-sent" style={{
            display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem",
            padding: "3rem 0 6rem", borderBottom: `1px solid ${c.hairline}`, marginBottom: "6rem",
          }}>
            <div style={{ paddingTop: "0.35rem" }}><Label accent={c.accent}>Sent</Label></div>
            <div>
              <p style={{ fontFamily: "Fraunces, serif", fontWeight: 300, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.15, letterSpacing: "-0.02em", color: c.text, maxWidth: "22ch" }}>
                Got it, <em style={{ color: c.accent, fontStyle: "italic" }}>{firstName}</em>.
              </p>
              <p style={{ marginTop: "1.2rem", fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 300, fontSize: "1.1rem", color: c.dim, maxWidth: "36ch" }}>
                I&apos;ll write back within 48 hours. Until then, go work on the thing.
              </p>
              <button onClick={() => { setSent(false); setName(""); setEmail(""); setProject(""); setMessage(""); setSelectedServices([]); setSelectedTimeline(""); }} style={{
                marginTop: "2rem", fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.55rem", letterSpacing: "0.22em", textTransform: "uppercase",
                color: c.faint, background: "none", border: "none",
                borderBottom: `1px solid ${c.rule}`, padding: "0.4rem 0", cursor: "pointer",
              }}>← Send another</button>
            </div>
          </section>
        ) : (
          <section className="contact-form-grid" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", marginBottom: "6rem" }}>
            <div style={{ paddingTop: "0.35rem" }}><Label accent={c.accent}>Send a note</Label></div>
            <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "2.4rem", maxWidth: 640 }}>

              <div className="contact-row2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="f-name" style={fieldLabelStyle}><span style={{ color: c.accent, marginRight: "0.8em", fontWeight: 500 }}>01</span>Name</label>
                  <input id="f-name" className="contact-input" required value={name} onChange={e => setName(e.target.value)} placeholder="your name" autoComplete="name" style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <label htmlFor="f-email" style={fieldLabelStyle}><span style={{ color: c.accent, marginRight: "0.8em", fontWeight: 500 }}>02</span>Email</label>
                  <input id="f-email" className="contact-input" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@somewhere.com" autoComplete="email" style={inputStyle} />
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="f-project" style={fieldLabelStyle}><span style={{ color: c.accent, marginRight: "0.8em", fontWeight: 500 }}>03</span>Project</label>
                <input id="f-project" className="contact-input" value={project} onChange={e => setProject(e.target.value)} placeholder="working title or company" style={inputStyle} />
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={fieldLabelStyle}>
                  <span style={{ color: c.accent, marginRight: "0.8em", fontWeight: 500 }}>04</span>
                  What you need
                  <span style={{ color: c.faint, marginLeft: "0.5em", fontWeight: 400 }}>/ pick any</span>
                </span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {SERVICES.map(s => (
                    <button key={s} type="button" onClick={() => toggleService(s)} style={chipStyle(selectedServices.includes(s))}>{s}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={fieldLabelStyle}><span style={{ color: c.accent, marginRight: "0.8em", fontWeight: 500 }}>05</span>Timeline</span>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {TIMELINES.map(t => (
                    <button key={t} type="button" onClick={() => setSelectedTimeline(prev => prev === t ? "" : t)} style={chipStyle(selectedTimeline === t)}>{t}</button>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <label htmlFor="f-message" style={fieldLabelStyle}><span style={{ color: c.accent, marginRight: "0.8em", fontWeight: 500 }}>06</span>Tell me about it</label>
                <textarea id="f-message" className="contact-textarea" required rows={5} value={message} onChange={e => setMessage(e.target.value)} placeholder="what you're building, who it's for, where you're stuck" style={{ ...inputStyle, resize: "none", minHeight: "4.5rem", lineHeight: 1.5 }} />
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap", paddingTop: "1rem", borderTop: `1px solid ${c.hairline}` }}>
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
          </section>
        )}

        {/* DETAILS */}
        <section className="contact-details" style={{
          display: "grid", gridTemplateColumns: "200px repeat(3, 1fr)",
          gap: "3rem", borderTop: `1px solid ${c.hairline}`,
          paddingTop: "2.5rem", marginBottom: "5rem",
        }}>
          <div><Label accent={c.accent}>Notes</Label></div>
          {[
            { title: "What I take on", body: "Brand identity, websites, UI systems, art direction, generative tools, photo commissions, prints & books." },
            { title: "What to send along", body: "Anything that helps. A moodboard, a deck, a Figma link, the link to the thing that almost works. Files welcome by reply." },
          ].map(col => (
            <div key={col.title}>
              <h3 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase", color: c.text, marginBottom: "1rem", fontWeight: 500 }}>{col.title}</h3>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", lineHeight: 1.6, color: c.dim }}>{col.body}</p>
            </div>
          ))}
        </section>

        {/* ELSEWHERE */}
        <section className="contact-elsewhere" style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", borderTop: `1px solid ${c.hairline}`, paddingTop: "2.5rem" }}>
          <div><Label accent={c.accent}>Elsewhere</Label></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { platform: "GitHub",    handle: "@acadiaberry",  href: "https://github.com/cadyberry" },
              { platform: "Shop",      handle: "unavoide.com",  href: "https://unavoide.com" },
              { platform: "Instagram", handle: "@acadiaberry",  href: "https://instagram.com/acadiaberry" },
            ].map(row => (
              <a key={row.platform} className="elsewhere-row" href={row.href} target="_blank" rel="noopener noreferrer" style={{
                display: "grid", gridTemplateColumns: "1fr 2fr 32px",
                alignItems: "baseline", padding: "1.2rem 0",
                borderBottom: `1px solid ${c.hairline}`,
                textDecoration: "none", color: c.text,
                fontFamily: "Inter, sans-serif", transition: "color 0.2s",
              }}>
                <span style={{ fontFamily: "Fraunces, serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.05rem" }}>{row.platform}</span>
                <span className="elsewhere-handle handle-span" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", letterSpacing: "0.12em", color: c.dim, transition: "color 0.2s" }}>{row.handle}</span>
                <span className="arrow-span" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: c.faint, textAlign: "right", transition: "transform 0.25s, color 0.2s" }}>↗</span>
              </a>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
