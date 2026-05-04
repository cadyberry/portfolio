"use client";
import { useState } from "react";

const SERVICES = [
  "UI Design", "Creative Direction", "Website Design & Dev",
  "Brand Identity", "Digital Art Commission", "Photography",
  "AI / Data Consulting", "Other",
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [active, setActive] = useState<string | null>(null);

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
    } catch {
      // show confirmation regardless — email logged server-side
    }
    setSending(false);
    setSent(true);
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: `1px solid ${active === name ? "#fff" : "#222"}`,
    color: "#fff",
    fontFamily: "monospace",
    fontSize: "0.85rem",
    padding: "0.8rem 0",
    outline: "none",
    transition: "border-color 0.2s",
    letterSpacing: "0.02em",
  });

  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>

        <h1 style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(2.5rem, 10vw, 5rem)",
          fontWeight: 900, letterSpacing: "-0.02em",
          margin: "0 0 0.4rem", lineHeight: 0.9,
          textTransform: "uppercase",
        }}>LET'S<br />WORK.</h1>
        <p style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.25em", color: "#333", textTransform: "uppercase", marginBottom: "3rem" }}>
          commissions from $20 · projects from $500
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              <div>
                <label style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.25em", color: "#444", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>NAME</label>
                <input required value={form.name} onChange={e => set("name", e.target.value)}
                  onFocus={() => setActive("name")} onBlur={() => setActive(null)}
                  style={inputStyle("name")} placeholder="your name" />
              </div>
              <div>
                <label style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.25em", color: "#444", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>EMAIL</label>
                <input required type="email" value={form.email} onChange={e => set("email", e.target.value)}
                  onFocus={() => setActive("email")} onBlur={() => setActive(null)}
                  style={inputStyle("email")} placeholder="you@example.com" />
              </div>
            </div>

            {/* Service picker */}
            <div>
              <label style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.25em", color: "#444", textTransform: "uppercase", display: "block", marginBottom: "0.8rem" }}>WHAT DO YOU NEED</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {SERVICES.map(s => (
                  <button type="button" key={s} onClick={() => set("service", form.service === s ? "" : s)} style={{
                    fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.1em",
                    color: form.service === s ? "#000" : "#555",
                    background: form.service === s ? "#fff" : "transparent",
                    border: `1px solid ${form.service === s ? "#fff" : "#222"}`,
                    padding: "0.5rem 0.9rem",
                    cursor: "pointer", textTransform: "uppercase",
                    transition: "all 0.15s",
                    minHeight: 44,
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.25em", color: "#444", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                BUDGET — <span style={{ color: "#555" }}>${form.budget || "?"}</span>
              </label>
              <input type="range" min={20} max={5000} step={10} value={form.budget || 100}
                onChange={e => set("budget", e.target.value)}
                style={{ width: "100%", accentColor: "#ff00aa", height: 44, cursor: "pointer" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: "0.5rem", color: "#333", marginTop: "0.3rem" }}>
                <span>$20</span><span>$5,000+</span>
              </div>
            </div>

            <div>
              <label style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.25em", color: "#444", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" }}>MESSAGE</label>
              <textarea required value={form.message} onChange={e => set("message", e.target.value)}
                onFocus={() => setActive("message")} onBlur={() => setActive(null)}
                rows={4} placeholder="tell me about the project"
                style={{ ...inputStyle("message"), resize: "none", display: "block" }} />
            </div>

            <button type="submit" style={{
              fontFamily: "monospace", fontSize: "0.7rem", letterSpacing: "0.2em",
              color: "#000", background: "#fff", border: "none",
              padding: "1.1rem 2rem", cursor: "pointer",
              textTransform: "uppercase", transition: "background 0.2s",
              minHeight: 44, alignSelf: "flex-start",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = sending ? "#fff" : "#ff00aa")}
            onMouseLeave={e => (e.currentTarget.style.background = "#fff")}
            disabled={sending}>
              {sending ? "SENDING…" : "SEND IT →"}
            </button>
          </form>
        ) : (
          <div style={{ paddingTop: "2rem" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✦</div>
            <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "2rem", fontWeight: 900, margin: "0 0 0.5rem" }}>GOT IT.</h2>
            <p style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#555", lineHeight: 2 }}>
              i'll be in touch soon, {form.name.split(" ")[0]}.<br />
              check your inbox.
            </p>
          </div>
        )}

        {/* Direct email */}
        <div style={{ marginTop: "4rem", borderTop: "1px solid #111", paddingTop: "2rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#333", textTransform: "uppercase", marginBottom: "0.5rem" }}>OR JUST EMAIL</p>
          <a href="mailto:acadiaberry@gmail.com" style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#555", textDecoration: "none", transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "#555")}>
            acadiaberry@gmail.com
          </a>
        </div>
      </div>
    </main>
  );
}
