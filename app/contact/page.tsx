"use client";
import { useState, FormEvent } from "react";
import Nav from "../components/Nav";
import { useTheme, type Theme } from "../theme";

const SERVICES = [
  "UI / UX","Websites","Mobile Apps","Logo & Identity",
  "Brand Systems","Creative Consulting","Photography",
  "Generative AI","Print & Books","Art Direction","Other",
];
const TIMELINES = ["ASAP","< 1 month","1–3 months","3+ months","Flexible"];

function tokens(theme: Theme) {
  if (theme === "light") return {
    bg: "#f6f3ee", text: "#111111",
    dim: "rgba(17,17,17,0.66)", faint: "rgba(17,17,17,0.38)",
    hairline: "rgba(17,17,17,0.10)", rule: "rgba(17,17,17,0.16)",
    accent: "#e8003d",
  };
  if (theme === "mid") return {
    bg: "#12082a", text: "rgba(255,232,185,0.94)",
    dim: "rgba(255,210,140,0.78)", faint: "rgba(255,195,120,0.45)",
    hairline: "rgba(180,120,255,0.18)", rule: "rgba(180,120,255,0.30)",
    accent: "#ffaa00",
  };
  return {
    bg: "#050508", text: "#ffffff",
    dim: "rgba(255,255,255,0.62)", faint: "rgba(255,255,255,0.32)",
    hairline: "rgba(255,255,255,0.06)", rule: "rgba(255,255,255,0.10)",
    accent: "#ff00aa",
  };
}

export default function ContactPage() {
  const { theme } = useTheme();
  const c = tokens(theme);

  const [services, setServices] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("");
  const [sent, setSent] = useState<{ name: string } | null>(null);
  const [busy, setBusy] = useState(false);

  function toggleService(s: string) {
    setServices(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setBusy(true);

    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      project: (form.elements.namedItem("project") as HTMLInputElement).value,
      services,
      timeline,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {}
    setSent({ name: data.name.split(" ")[0] || "friend" });
  }

  return (
    <>
      <Nav />

      <main style={{
        position: "relative",
        padding: "7rem 2rem 8rem",
        maxWidth: 1180,
        margin: "0 auto",
        color: c.text,
      }}>

        {/* HERO */}
        <header style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: "5rem", alignItems: "end",
          paddingBottom: "4rem", marginBottom: "5rem",
          borderBottom: `1px solid ${c.hairline}`,
        }}>
          <div>
            <h1 style={{
              fontFamily: '"Inter", sans-serif',
              fontWeight: 700,
              fontSize: "clamp(3rem, 10vw, 6rem)",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              color: c.text,
            }}>
              say<br/>hello<span style={{ color: c.accent }}>.</span>
            </h1>
            <p style={{
              marginTop: "1.4rem",
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: ".58rem", letterSpacing: ".3em", textTransform: "uppercase",
              color: c.faint,
            }}>acadiaberry@gmail.com</p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem", paddingBottom: ".4rem" }}>
            {[
              ["Email", <a key="e" href="mailto:acadiaberry@gmail.com" style={{ color: c.accent, textDecoration: "none" }}>acadiaberry@gmail.com</a>],
              ["Based", <b key="b" style={{ color: c.text, fontWeight: 500 }}>Brooklyn, NY</b>],
              ["Reply", <b key="r" style={{ color: c.text, fontWeight: 500 }}>Within 48 hours</b>],
              ["Status", <b key="s" style={{ color: c.accent, fontWeight: 500 }}>Open, 2026</b>],
            ].map(([k, v], i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", gap: "1rem",
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: ".55rem", letterSpacing: ".2em", textTransform: "uppercase",
                color: c.faint,
                paddingBottom: ".5rem",
                borderBottom: `1px dashed ${c.hairline}`,
              }}>
                <span>{k}</span>{v}
              </div>
            ))}
          </div>
        </header>

        {/* PITCH */}
        <Block label="Brief" c={c}>
          <p style={{
            fontFamily: '"Fraunces", serif', fontWeight: 300,
            fontSize: "clamp(1.35rem, 2.4vw, 1.85rem)",
            lineHeight: 1.45, letterSpacing: "-0.012em",
            color: c.text, maxWidth: "38ch", textWrap: "pretty" as const,
          }}>
            Tell me <span style={{ color: c.accent, fontStyle: "italic" }}>what you&apos;re building</span>, who it&apos;s for, and where you&apos;re stuck.{" "}
            <span style={{ fontStyle: "italic", color: c.dim }}>A few sentences is plenty.</span>{" "}
            I&apos;ll write back with thoughts, scope, and a way forward.
          </p>
        </Block>

        {/* FORM or SENT */}
        {sent ? (
          <section style={{
            display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem",
            padding: "3rem 0 6rem",
            borderBottom: `1px solid ${c.hairline}`, marginBottom: "6rem",
          }}>
            <Label c={c}>Sent</Label>
            <div>
              <p style={{
                fontFamily: '"Fraunces", serif', fontWeight: 300,
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                lineHeight: 1.15, letterSpacing: "-0.02em",
                color: c.text, maxWidth: "22ch",
              }}>
                Got it, <em style={{ color: c.accent, fontStyle: "italic" }}>{sent.name}</em>.
              </p>
              <p style={{
                marginTop: "1.2rem",
                fontFamily: '"Fraunces", serif', fontStyle: "italic", fontWeight: 300,
                fontSize: "1.1rem", color: c.dim, maxWidth: "36ch",
              }}>I&apos;ll write back within 48 hours. Until then, go work on the thing.</p>
              <button type="button" onClick={() => { setSent(null); setServices([]); setTimeline(""); }} style={{
                marginTop: "2rem",
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: ".55rem", letterSpacing: ".22em", textTransform: "uppercase",
                color: c.faint, background: "none", border: "none",
                borderBottom: `1px solid ${c.rule}`, padding: ".4rem 0", cursor: "pointer",
              }}>← Send another</button>
            </div>
          </section>
        ) : (
          <section style={{
            display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem",
            marginBottom: "6rem",
          }}>
            <Label c={c}>Send a note</Label>
            <form onSubmit={onSubmit} noValidate style={{
              display: "flex", flexDirection: "column", gap: "2.4rem", maxWidth: 640,
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                <Field c={c} num="01" label="Name" htmlFor="f-name">
                  <Input c={c} id="f-name" name="name" required autoComplete="name" placeholder="your name" />
                </Field>
                <Field c={c} num="02" label="Email" htmlFor="f-email">
                  <Input c={c} id="f-email" name="email" type="email" required autoComplete="email" placeholder="you@somewhere.com" />
                </Field>
              </div>
              <Field c={c} num="03" label="Project">
                <Input c={c} id="f-project" name="project" placeholder="working title or company" />
              </Field>

              <Field c={c} num="04" label={<>What you need <span style={{ color: c.faint, marginLeft: ".5em", fontWeight: 400 }}>/ pick any</span></>}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                  {SERVICES.map(s => (
                    <Chip key={s} active={services.includes(s)} onClick={() => toggleService(s)} c={c}>{s}</Chip>
                  ))}
                </div>
              </Field>

              <Field c={c} num="05" label="Timeline">
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                  {TIMELINES.map(t => (
                    <Chip key={t} active={timeline === t} onClick={() => setTimeline(t === timeline ? "" : t)} c={c}>{t}</Chip>
                  ))}
                </div>
              </Field>

              <Field c={c} num="06" label="Tell me about it" htmlFor="f-message">
                <textarea id="f-message" name="message" required rows={5} placeholder="what you're building, who it's for, where you're stuck"
                  style={{
                    width: "100%", background: "transparent", border: "none",
                    borderBottom: `1px solid ${c.rule}`, color: c.text,
                    fontFamily: '"Fraunces", serif', fontWeight: 300, fontSize: "1.15rem",
                    padding: ".55rem 0", outline: "none", resize: "none", minHeight: "4.5rem", lineHeight: 1.5,
                    letterSpacing: "-0.005em",
                  }}
                />
              </Field>

              <div style={{
                display: "flex", alignItems: "center", justifyContent: "flex-end",
                gap: "1.5rem", flexWrap: "wrap",
                paddingTop: "1rem", borderTop: `1px solid ${c.hairline}`,
              }}>
                <button type="submit" disabled={busy} style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: ".55rem", letterSpacing: ".22em", textTransform: "uppercase",
                  padding: ".95rem 1.6rem", minHeight: 44,
                  background: c.accent, color: c.bg,
                  border: `1px solid ${c.accent}`, cursor: busy ? "wait" : "pointer",
                  opacity: busy ? 0.5 : 1,
                }}>{busy ? "Sending…" : "Send it →"}</button>
              </div>
            </form>
          </section>
        )}

        {/* DETAILS */}
        <section style={{
          display: "grid", gridTemplateColumns: "200px repeat(2, 1fr)", gap: "3rem",
          borderTop: `1px solid ${c.hairline}`, paddingTop: "2.5rem", marginBottom: "5rem",
        }}>
          <Label c={c}>Notes</Label>
          <Col c={c} h="What I take on">Brand identity, websites, UI systems, art direction, generative tools, photo commissions, prints &amp; books.</Col>
          <Col c={c} h="What to send along">Anything that helps. A moodboard, a deck, a Figma link, the link to the thing that almost works. Files welcome by reply.</Col>
        </section>

        {/* ELSEWHERE */}
        <section style={{
          display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem",
          borderTop: `1px solid ${c.hairline}`, paddingTop: "2.5rem",
        }}>
          <Label c={c}>Elsewhere</Label>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Row c={c} href="https://github.com/acadiaberry" platform="GitHub" handle="@acadiaberry" />
            <Row c={c} href="https://unavoide.com" platform="Shop" handle="unavoide.com" />
            <Row c={c} href="https://instagram.com/acadiaberry" platform="Instagram" handle="@acadiaberry" />
          </div>
        </section>

      </main>
    </>
  );
}

function Block({ label, c, children }: { label: string; c: ReturnType<typeof tokens>; children: React.ReactNode }) {
  return (
    <section style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "3rem", marginBottom: "6rem", padding: "1rem 0" }}>
      <Label c={c}>{label}</Label>
      {children}
    </section>
  );
}

function Label({ c, children }: { c: ReturnType<typeof tokens>; children: React.ReactNode }) {
  return (
    <div style={{ paddingTop: ".35rem" }}>
      <span style={{
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: ".5rem", letterSpacing: ".32em", textTransform: "uppercase",
        color: c.accent, display: "inline-flex", alignItems: "center", gap: ".6rem",
      }}>
        <span style={{ display: "inline-block", width: 14, height: 1, background: "currentColor" }} />
        {children}
      </span>
    </div>
  );
}

function Field({ c, num, label, htmlFor, children }: { c: ReturnType<typeof tokens>; num: string; label: React.ReactNode; htmlFor?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <label htmlFor={htmlFor} style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: ".48rem", letterSpacing: ".32em", textTransform: "uppercase",
        color: c.faint, marginBottom: ".5rem",
      }}>
        <span style={{ color: c.accent, marginRight: ".8em", fontWeight: 500 }}>{num}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ c, ...rest }: { c: ReturnType<typeof tokens> } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...rest} style={{
      width: "100%", background: "transparent", border: "none",
      borderBottom: `1px solid ${c.rule}`, color: c.text,
      fontFamily: '"Fraunces", serif', fontWeight: 300, fontSize: "1.15rem",
      padding: ".55rem 0", outline: "none", letterSpacing: "-0.005em",
    }} />
  );
}

function Chip({ active, onClick, c, children }: { active: boolean; onClick: () => void; c: ReturnType<typeof tokens>; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: ".5rem", letterSpacing: ".14em", textTransform: "uppercase",
      color: active ? c.bg : c.dim,
      background: active ? c.accent : "transparent",
      border: `1px solid ${active ? c.accent : c.rule}`,
      padding: ".55rem .9rem", cursor: "pointer", minHeight: 38,
    }}>{children}</button>
  );
}

function Col({ c, h, children }: { c: ReturnType<typeof tokens>; h: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: ".55rem", letterSpacing: ".25em", textTransform: "uppercase",
        color: c.text, marginBottom: "1rem", fontWeight: 500,
      }}>{h}</h3>
      <p style={{
        fontFamily: '"Inter", sans-serif',
        fontSize: ".85rem", lineHeight: 1.6, color: c.dim,
      }}>{children}</p>
    </div>
  );
}

function Row({ c, href, platform, handle }: { c: ReturnType<typeof tokens>; href: string; platform: string; handle: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display: "grid", gridTemplateColumns: "1fr 2fr 32px",
      alignItems: "baseline", padding: "1.2rem 0",
      borderBottom: `1px solid ${c.hairline}`,
      textDecoration: "none", color: c.text,
      fontFamily: '"Inter", sans-serif',
    }}>
      <span style={{ fontFamily: '"Fraunces", serif', fontStyle: "italic", fontWeight: 400, fontSize: "1.05rem" }}>{platform}</span>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: ".65rem", letterSpacing: ".12em", color: c.dim }}>{handle}</span>
      <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: ".8rem", color: c.faint, textAlign: "right" }}>↗</span>
    </a>
  );
}
