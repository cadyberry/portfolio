"use client";
import { useState } from "react";
import { useTheme, type Theme } from "../theme";

function colors(theme: Theme) {
  if (theme === "light") return {
    bg: "#f9f7f4", text: "#111111", dim: "rgba(17,17,17,0.45)",
    faint: "rgba(17,17,17,0.18)", accent: "#e8003d",
    border: "rgba(0,0,0,0.09)", borderHot: "rgba(17,17,17,0.45)",
    surface: "rgba(0,0,0,0.03)", chipBg: "rgba(0,0,0,0.05)",
    chipActive: "#111111", chipActiveText: "#f9f7f4",
    btnBg: "#111111", btnText: "#f9f7f4",
  };
  if (theme === "mid") return {
    bg: "#12082a", text: "rgba(255,232,185,0.92)", dim: "rgba(255,195,120,0.45)",
    faint: "rgba(255,180,80,0.16)", accent: "#ffaa00",
    border: "rgba(180,120,255,0.18)", borderHot: "rgba(255,195,120,0.6)",
    surface: "rgba(180,120,255,0.06)", chipBg: "rgba(180,120,255,0.06)",
    chipActive: "#ffaa00", chipActiveText: "#12082a",
    btnBg: "#ffaa00", btnText: "#12082a",
  };
  return {
    bg: "#050508", text: "#ffffff", dim: "rgba(255,255,255,0.35)",
    faint: "rgba(255,255,255,0.1)", accent: "#ff00aa",
    border: "rgba(255,255,255,0.06)", borderHot: "rgba(255,255,255,0.5)",
    surface: "rgba(255,255,255,0.03)", chipBg: "rgba(255,255,255,0.04)",
    chipActive: "#ffffff", chipActiveText: "#050508",
    btnBg: "#ffffff", btnText: "#050508",
  };
}

const SERVICES = [
  "UI Design", "Creative Direction", "Brand Identity",
  "Web Design & Dev", "Digital Art Commission",
  "Photography", "AI / Data Consulting", "Other",
];

const INFO = [
  { label: "Email", value: "acadiaberry@gmail.com", href: "mailto:acadiaberry@gmail.com" },
  { label: "Based", value: "Brooklyn, NY" },
  { label: "Response", value: "Within 48 hours" },
  { label: "Availability", value: "Open to new projects" },
];

export default function Contact() {
  const { theme } = useTheme();
  const c = colors(theme);

  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "500", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch { /* logged server-side */ }
    setSending(false);
    setSent(true);
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${c.border}`,
    color: c.text,
    fontFamily: "Inter, monospace",
    fontSize: "0.9rem",
    padding: "0.75rem 0",
    outline: "none",
    transition: "border-color 0.2s, color 0.3s",
    letterSpacing: "0.01em",
  };

  const fieldLabel: React.CSSProperties = {
    fontFamily: "monospace",
    fontSize: "0.45rem",
    letterSpacing: "0.32em",
    color: c.faint,
    textTransform: "uppercase",
    display: "block",
    marginBottom: "0.3rem",
    transition: "color 0.3s",
  };

  return (
    <main style={{ background: c.bg, minHeight: "100vh", paddingTop: "5rem", color: c.text, transition: "background 0.3s, color 0.3s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: "6rem", alignItems: "start" }}>

          {/* ── LEFT: INFO ── */}
          <div style={{ position: "sticky", top: "7rem" }}>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: c.faint, textTransform: "uppercase", margin: "0 0 0.6rem", transition: "color 0.3s" }}>
              Get in touch
            </p>
            <h1 style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700, letterSpacing: "-0.04em",
              color: c.text, margin: "0 0 2rem", lineHeight: 0.9,
              transition: "color 0.3s",
            }}>
              Let&apos;s<br />work.
            </h1>

            <div style={{ display: "flex", flexDirection: "column", marginBottom: "2.5rem" }}>
              {INFO.map((row, i) => (
                <div key={row.label} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline",
                  padding: "0.7rem 0",
                  borderBottom: `1px solid ${c.border}`,
                  borderTop: i === 0 ? `1px solid ${c.border}` : "none",
                  transition: "border-color 0.3s",
                }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.2em", color: c.faint, textTransform: "uppercase", transition: "color 0.3s" }}>{row.label}</span>
                  {row.href ? (
                    <a href={row.href} style={{ fontFamily: "monospace", fontSize: "0.62rem", color: c.accent, textDecoration: "none", transition: "color 0.3s" }}>{row.value}</a>
                  ) : (
                    <span style={{ fontFamily: "monospace", fontSize: "0.62rem", color: c.dim, transition: "color 0.3s" }}>{row.value}</span>
                  )}
                </div>
              ))}
            </div>

            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: c.faint, lineHeight: 1.75, fontStyle: "italic", transition: "color 0.3s" }}>
              Commissions from $20. Projects from $500. I take on a small number of clients at a time so the work is actually good.
            </p>
          </div>

          {/* ── RIGHT: FORM ── */}
          <div>
            {!sent ? (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2.2rem" }}>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                  <div>
                    <label style={fieldLabel}>Name</label>
                    <input
                      required value={form.name}
                      onChange={e => set("name", e.target.value)}
                      onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                      placeholder="your name"
                      style={{ ...inputBase, borderBottomColor: focused === "name" ? c.borderHot : c.border }}
                    />
                  </div>
                  <div>
                    <label style={fieldLabel}>Email</label>
                    <input
                      required type="email" value={form.email}
                      onChange={e => set("email", e.target.value)}
                      onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                      placeholder="you@example.com"
                      style={{ ...inputBase, borderBottomColor: focused === "email" ? c.borderHot : c.border }}
                    />
                  </div>
                </div>

                <div>
                  <label style={fieldLabel}>What do you need</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginTop: "0.6rem" }}>
                    {SERVICES.map(s => (
                      <button
                        type="button" key={s}
                        onClick={() => set("service", form.service === s ? "" : s)}
                        style={{
                          fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.1em",
                          color: form.service === s ? c.chipActiveText : c.dim,
                          background: form.service === s ? c.chipActive : c.chipBg,
                          border: `1px solid ${form.service === s ? c.chipActive : c.border}`,
                          padding: "0.5rem 0.9rem", cursor: "pointer", textTransform: "uppercase",
                          transition: "all 0.15s", minHeight: 44,
                        }}
                      >{s}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={fieldLabel}>
                    Budget — <span style={{ color: c.accent, transition: "color 0.3s" }}>${parseInt(form.budget).toLocaleString()}</span>
                  </label>
                  <input
                    type="range" min={20} max={5000} step={10}
                    value={form.budget}
                    onChange={e => set("budget", e.target.value)}
                    style={{ width: "100%", accentColor: c.accent, height: 44, cursor: "pointer", marginTop: "0.3rem" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: "0.45rem", color: c.faint, marginTop: "0.2rem", transition: "color 0.3s" }}>
                    <span>$20</span><span>$5,000+</span>
                  </div>
                </div>

                <div>
                  <label style={fieldLabel}>Message</label>
                  <textarea
                    required value={form.message}
                    onChange={e => set("message", e.target.value)}
                    onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                    rows={5} placeholder="tell me about the project"
                    style={{
                      ...inputBase,
                      borderBottomColor: focused === "message" ? c.borderHot : c.border,
                      resize: "none", display: "block",
                    }}
                  />
                </div>

                <div>
                  <button
                    type="submit" disabled={sending}
                    style={{
                      fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em",
                      color: c.btnText, background: c.btnBg, border: "none",
                      padding: "1rem 2rem", cursor: sending ? "wait" : "pointer",
                      textTransform: "uppercase", transition: "opacity 0.2s",
                      minHeight: 44, opacity: sending ? 0.6 : 1,
                    }}
                  >{sending ? "SENDING…" : "SEND IT →"}</button>
                </div>

              </form>
            ) : (
              <div style={{ paddingTop: "3rem" }}>
                <div style={{
                  width: 48, height: 48, background: c.accent,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "monospace", fontSize: "1.2rem", color: c.bg,
                  marginBottom: "1.5rem", transition: "background 0.3s, color 0.3s",
                }}>✦</div>
                <h2 style={{
                  fontFamily: "Inter, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)",
                  fontWeight: 700, letterSpacing: "-0.03em",
                  color: c.text, margin: "0 0 0.8rem", lineHeight: 1,
                  transition: "color 0.3s",
                }}>Got it.</h2>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: c.dim, lineHeight: 1.8, transition: "color 0.3s" }}>
                  I&apos;ll be in touch soon, {form.name.split(" ")[0]}.<br />
                  Check your inbox — usually within 48 hours.
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
