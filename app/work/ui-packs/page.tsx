"use client";
import Link from "next/link";
import { useState } from "react";

const THEMES = [
  {
    id: "schematic",
    name: "SCHEMATIC",
    tag: "dark · blueprint · technical",
    desc: "Every element documented. Every decision annotated.",
    bg: "#090d1a",
    surface: "#0e1528",
    surface2: "#131d35",
    text: "#cce4f0",
    textDim: "rgba(180,220,240,0.45)",
    textFaint: "rgba(180,220,240,0.18)",
    accent: "#4db8ff",
    accent2: "#ffd700",
    border: "rgba(77,184,255,0.14)",
    borderAccent: "rgba(77,184,255,0.5)",
    monoFont: true,
  },
  {
    id: "chrome",
    name: "CHROME",
    tag: "light · editorial · type-first",
    desc: "When the work is the decoration.",
    bg: "#f2f2f2",
    surface: "#ffffff",
    surface2: "#e8e8e8",
    text: "#0a0a0a",
    textDim: "rgba(10,10,10,0.42)",
    textFaint: "rgba(10,10,10,0.14)",
    accent: "#0a0a0a",
    accent2: "#555555",
    border: "rgba(0,0,0,0.1)",
    borderAccent: "rgba(0,0,0,0.35)",
    monoFont: false,
  },
  {
    id: "garden",
    name: "GARDEN",
    tag: "warm · organic · serif",
    desc: "Slow. The kind of page that makes people exhale.",
    bg: "#f3ede3",
    surface: "#ebe4d8",
    surface2: "#e0d8ca",
    text: "#1e1a12",
    textDim: "rgba(30,26,18,0.48)",
    textFaint: "rgba(30,26,18,0.18)",
    accent: "#3d5c38",
    accent2: "#8f6a18",
    border: "rgba(30,26,18,0.1)",
    borderAccent: "rgba(61,92,56,0.45)",
    monoFont: false,
  },
  {
    id: "dusk",
    name: "DUSK",
    tag: "dark · luxe · amber",
    desc: "Deep space. Candlelight. Presence before words.",
    bg: "#0b0520",
    surface: "#160a38",
    surface2: "#1e1048",
    text: "rgba(255,228,175,0.95)",
    textDim: "rgba(255,195,110,0.42)",
    textFaint: "rgba(255,170,60,0.16)",
    accent: "#ffb300",
    accent2: "#c880ff",
    border: "rgba(150,90,255,0.14)",
    borderAccent: "rgba(255,179,0,0.45)",
    monoFont: false,
  },
  {
    id: "static",
    name: "STATIC",
    tag: "monochrome · brutalist · grid",
    desc: "Zero compromise. The grid is the design.",
    bg: "#000000",
    surface: "#0c0c0c",
    surface2: "#181818",
    text: "#ffffff",
    textDim: "rgba(255,255,255,0.38)",
    textFaint: "rgba(255,255,255,0.1)",
    accent: "#ffffff",
    accent2: "#444444",
    border: "rgba(255,255,255,0.1)",
    borderAccent: "rgba(255,255,255,0.5)",
    monoFont: true,
  },
];

type Theme = typeof THEMES[0];

function LiveDemo({ t }: { t: Theme }) {
  const ff = t.monoFont ? "'Courier New', monospace" : "Inter, system-ui, sans-serif";
  const ffHead = t.id === "garden" ? "Georgia, serif" : t.id === "dusk" ? "Georgia, serif" : ff;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "200px 1fr",
      height: 440,
      background: t.bg,
      overflow: "hidden",
      transition: "background 0.5s ease",
    }}>
      {/* Sidebar */}
      <div style={{
        background: t.surface,
        borderRight: `1px solid ${t.border}`,
        padding: "1.4rem 0.8rem",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        transition: "background 0.5s ease, border-color 0.5s ease",
      }}>
        <div style={{ padding: "0 0.5rem 1.4rem", borderBottom: `1px solid ${t.border}` }}>
          <p style={{ fontFamily: ff, fontSize: 11, fontWeight: 700, color: t.accent, letterSpacing: "0.18em", margin: 0, textTransform: "uppercase", transition: "color 0.5s" }}>
            {t.id === "garden" ? "Arbor Studio" : t.id === "chrome" ? "STUDIO" : "BRAND ✦"}
          </p>
        </div>
        <div style={{ paddingTop: "0.8rem", display: "flex", flexDirection: "column", gap: 2 }}>
          {["OVERVIEW", "PROJECTS", "LIBRARY", "CLIENTS", "SETTINGS"].map((item, i) => (
            <div key={item} style={{
              padding: "0.42rem 0.6rem",
              fontFamily: ff, fontSize: 9,
              color: i === 0 ? t.accent : t.textDim,
              background: i === 0 ? t.surface2 : "transparent",
              borderLeft: i === 0 ? `2px solid ${t.accent}` : "2px solid transparent",
              letterSpacing: "0.12em",
              transition: "all 0.5s",
            }}>{item}</div>
          ))}
        </div>
        <div style={{ marginTop: "auto" }}>
          <div style={{ height: 1, background: t.border, marginBottom: "0.8rem" }} />
          <div style={{ padding: "0.5rem 0.6rem", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", background: t.accent, opacity: 0.8, flexShrink: 0, transition: "background 0.5s" }} />
            <div>
              <p style={{ fontFamily: ff, fontSize: 8, fontWeight: 700, color: t.text, margin: 0, transition: "color 0.5s" }}>ACADIA</p>
              <p style={{ fontFamily: ff, fontSize: 7, color: t.textFaint, margin: 0 }}>brooklyn · pro</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main panel */}
      <div style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Topbar */}
        <div style={{
          borderBottom: `1px solid ${t.border}`,
          padding: "0.75rem 1.5rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: t.surface,
          transition: "background 0.5s, border-color 0.5s",
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <p style={{ fontFamily: ffHead, fontSize: 15, fontWeight: 700, color: t.text, margin: 0, transition: "color 0.5s" }}>Overview</p>
            <p style={{ fontFamily: ff, fontSize: 8, color: t.textFaint, margin: 0, letterSpacing: "0.15em" }}>Q2 · 2025</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{
              padding: "5px 14px", fontFamily: ff, fontSize: 8,
              background: t.accent, color: t.bg,
              letterSpacing: "0.12em", cursor: "pointer",
              transition: "background 0.5s, color 0.5s",
            }}>+ NEW</div>
            <div style={{
              padding: "5px 10px", fontFamily: ff, fontSize: 8,
              border: `1px solid ${t.border}`, color: t.textDim,
              letterSpacing: "0.12em", cursor: "pointer",
            }}>FILTER</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, padding: "1.2rem 1.5rem", display: "flex", flexDirection: "column", gap: "1rem", overflowY: "hidden" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8 }}>
            {[
              { label: "PROJECTS", val: "24", sub: "+3 this month" },
              { label: "ASSETS",   val: "1.2k", sub: "12 new" },
              { label: "REVENUE",  val: "$48k", sub: "+22% YoY" },
              { label: "VISITORS", val: "8.4k", sub: "↑ trending" },
            ].map(s => (
              <div key={s.label} style={{
                padding: "0.7rem 0.8rem",
                background: t.surface2,
                border: `1px solid ${t.border}`,
                transition: "background 0.5s, border-color 0.5s",
              }}>
                <p style={{ fontFamily: ff, fontSize: 6, color: t.textFaint, margin: "0 0 4px", letterSpacing: "0.2em" }}>{s.label}</p>
                <p style={{ fontFamily: ffHead, fontSize: 20, fontWeight: 700, color: t.text, margin: "0 0 2px", lineHeight: 1, transition: "color 0.5s" }}>{s.val}</p>
                <p style={{ fontFamily: ff, fontSize: 7, color: t.accent, margin: 0, transition: "color 0.5s" }}>{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Table */}
          <div style={{ flex: 1, background: t.surface2, border: `1px solid ${t.border}`, overflow: "hidden", transition: "background 0.5s, border-color 0.5s" }}>
            <div style={{ borderBottom: `1px solid ${t.border}`, padding: "0.5rem 1rem", display: "flex", gap: "2rem" }}>
              {["ACTIVE", "ARCHIVED", "DRAFTS"].map((tab, i) => (
                <p key={tab} style={{
                  fontFamily: ff, fontSize: 8, margin: 0, letterSpacing: "0.15em",
                  color: i === 0 ? t.accent : t.textDim,
                  borderBottom: i === 0 ? `1px solid ${t.accent}` : "1px solid transparent",
                  paddingBottom: 4,
                  transition: "color 0.5s, border-color 0.5s",
                }}>{tab}</p>
              ))}
            </div>
            {[
              { name: "SIGNAL FM",    type: "Brand Identity", date: "Apr 2025", status: "LIVE" },
              { name: "VANTA",        type: "Art Direction",  date: "Mar 2025", status: "REVIEW" },
              { name: "BIOME",        type: "Digital Art",    date: "Jan 2025", status: "DRAFT" },
              { name: "CIRCUIT CITY", type: "Photography",    date: "Dec 2024", status: "LIVE" },
            ].map((row, i, arr) => (
              <div key={row.name} style={{
                display: "grid", gridTemplateColumns: "1fr auto auto auto",
                alignItems: "center", gap: 16,
                padding: "0.5rem 1rem",
                borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : "none",
                transition: "border-color 0.5s",
              }}>
                <div>
                  <p style={{ fontFamily: ffHead, fontSize: 9, fontWeight: 700, color: t.text, margin: 0, transition: "color 0.5s" }}>{row.name}</p>
                  <p style={{ fontFamily: ff, fontSize: 7, color: t.textDim, margin: 0 }}>{row.type}</p>
                </div>
                <p style={{ fontFamily: ff, fontSize: 7, color: t.textFaint, margin: 0, whiteSpace: "nowrap" }}>{row.date}</p>
                <div style={{
                  padding: "2px 7px",
                  border: `1px solid ${row.status === "LIVE" ? t.accent : t.border}`,
                  fontFamily: ff, fontSize: 6,
                  color: row.status === "LIVE" ? t.accent : t.textDim,
                  letterSpacing: "0.12em",
                  transition: "border-color 0.5s, color 0.5s",
                }}>{row.status}</div>
                <p style={{ fontFamily: ff, fontSize: 10, color: t.textFaint, margin: 0, cursor: "pointer" }}>→</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ThemeBand({ t, i }: { t: Theme; i: number }) {
  const ff = t.monoFont ? "'Courier New', monospace" : "Inter, system-ui, sans-serif";
  const ffHead = t.id === "garden" || t.id === "dusk" ? "Georgia, serif" : ff;
  const isEven = i % 2 === 0;

  const components: Record<string, React.ReactNode> = {
    schematic: (
      <div style={{ position: "relative", border: `1px solid ${t.border}`, padding: "2rem", background: t.surface, fontFamily: ff }}>
        {/* Grid paper background */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.25,
          backgroundImage: `linear-gradient(${t.accent}22 1px, transparent 1px), linear-gradient(90deg, ${t.accent}22 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }} />
        {/* Header annotation */}
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
          <div>
            <p style={{ fontSize: 7, color: t.accent2, margin: "0 0 2px", letterSpacing: "0.3em" }}>DOC-UI-0042 · REV B</p>
            <p style={{ fontSize: 11, fontWeight: 700, color: t.text, margin: 0, letterSpacing: "0.1em" }}>COMPONENT SPECIFICATION</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 6, color: t.textFaint, margin: "0 0 2px", letterSpacing: "0.2em" }}>CLASSIFICATION</p>
            <p style={{ fontSize: 7, color: t.accent, margin: 0, letterSpacing: "0.15em" }}>OPEN · v2.4.1</p>
          </div>
        </div>
        {/* Main diagram — card component breakdown */}
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: "1fr 120px", gap: "2rem" }}>
          {/* Component diagram */}
          <div>
            <div style={{ border: `1px solid ${t.accent}`, padding: "1rem", position: "relative", marginBottom: "1rem" }}>
              {/* corner marks */}
              {[{top:0,left:0},{top:0,right:0},{bottom:0,left:0},{bottom:0,right:0}].map((pos, ci) => (
                <div key={ci} style={{ position: "absolute", width: 6, height: 6, ...pos, background: t.accent2, margin: -1 }} />
              ))}
              <p style={{ fontSize: 6, color: t.accent, margin: "0 0 8px", letterSpacing: "0.3em" }}>HEADER REGION [A]</p>
              <div style={{ height: 1, background: t.border, marginBottom: 8 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["NAV-01", "NAV-02", "NAV-03"].map(n => (
                    <span key={n} style={{ fontSize: 7, color: t.textDim, border: `1px solid ${t.border}`, padding: "2px 5px" }}>{n}</span>
                  ))}
                </div>
                <span style={{ fontSize: 7, color: t.accent, border: `1px solid ${t.accent}`, padding: "2px 8px" }}>CTA →</span>
              </div>
            </div>
            <div style={{ border: `1px dashed ${t.border}`, padding: "0.75rem", marginBottom: 8 }}>
              <p style={{ fontSize: 6, color: t.textFaint, margin: "0 0 6px", letterSpacing: "0.3em" }}>CONTENT AREA [B]</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                {[1,2,3].map(n => (
                  <div key={n} style={{ background: t.surface2, height: 32, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 6, color: t.textFaint, letterSpacing: "0.2em" }}>CARD-0{n}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ border: `1px dashed ${t.border}`, padding: "0.5rem 0.75rem" }}>
              <p style={{ fontSize: 6, color: t.textFaint, margin: 0, letterSpacing: "0.3em" }}>FOOTER REGION [C] · fixed · z-index: 10</p>
            </div>
          </div>
          {/* Annotation column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { ref: "[A]", note: "Sticky nav. backdrop-filter: blur" },
              { ref: "[B]", note: "Auto-grid. gap: 1rem" },
              { ref: "[C]", note: "Full-bleed. border-top: 1px" },
            ].map(a => (
              <div key={a.ref} style={{ borderLeft: `2px solid ${t.accent}`, paddingLeft: 6 }}>
                <p style={{ fontSize: 7, color: t.accent2, margin: "0 0 1px", fontWeight: 700 }}>{a.ref}</p>
                <p style={{ fontSize: 6, color: t.textDim, margin: 0, lineHeight: 1.5 }}>{a.note}</p>
              </div>
            ))}
            <div style={{ marginTop: "auto", borderTop: `1px solid ${t.border}`, paddingTop: 8 }}>
              <p style={{ fontSize: 6, color: t.textFaint, margin: "0 0 4px", letterSpacing: "0.2em" }}>SCALE</p>
              <p style={{ fontSize: 7, color: t.accent, margin: 0 }}>1:1 · px</p>
            </div>
          </div>
        </div>
      </div>
    ),
    chrome: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, border: `1px solid ${t.border}` }}>
        <div style={{ padding: "2.5rem", borderRight: `1px solid ${t.border}` }}>
          <p style={{ fontFamily: ff, fontSize: 7, color: t.textDim, margin: "0 0 1rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>No. 001 · 2025</p>
          <p style={{ fontFamily: "'Arial Black', Arial", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: t.text, margin: "0 0 1.5rem", lineHeight: 0.9, letterSpacing: "-0.03em", textTransform: "uppercase" }}>THE WORK NEVER LIES.</p>
          <div style={{ height: 1, background: t.border, margin: "0 0 1rem" }} />
          <p style={{ fontFamily: ff, fontSize: 9, color: t.textDim, lineHeight: 1.8, margin: 0, maxWidth: 320 }}>
            Seven years of work. Forty-two clients. One rule: make it mean something.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateRows: "1fr 1fr" }}>
          {["IDENTITY", "SYSTEMS"].map((label, j) => (
            <div key={label} style={{
              padding: "2rem 2.5rem",
              borderBottom: j === 0 ? `1px solid ${t.border}` : "none",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              cursor: "pointer",
            }}>
              <div>
                <p style={{ fontFamily: ff, fontSize: 7, color: t.textDim, margin: "0 0 4px", letterSpacing: "0.2em" }}>0{j + 1}</p>
                <p style={{ fontFamily: "'Arial Black', Arial", fontSize: 16, fontWeight: 900, color: t.text, margin: 0, letterSpacing: "0.02em" }}>{label}</p>
              </div>
              <span style={{ fontFamily: ff, fontSize: 18, color: t.textDim }}>↗</span>
            </div>
          ))}
        </div>
      </div>
    ),
    garden: (
      <div style={{ maxWidth: 480, margin: "0 auto" }}>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 11, color: t.textDim, margin: "0 0 1.5rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Get in touch</p>
        {["Full name", "Email address", "What are you working on?"].map((placeholder, j) => (
          <div key={placeholder} style={{ marginBottom: 12 }}>
            <div style={{
              padding: j === 2 ? "0.8rem 1rem" : "0.65rem 1rem",
              background: t.surface2,
              border: `1px solid ${t.border}`,
              borderRadius: 4,
              fontFamily: "Georgia, serif",
              fontSize: 12,
              color: t.textDim,
              minHeight: j === 2 ? 80 : "auto",
              display: "flex", alignItems: j === 2 ? "flex-start" : "center",
            }}>{placeholder}</div>
          </div>
        ))}
        <button style={{
          width: "100%", padding: "0.9rem",
          background: t.accent, color: "#fff",
          border: "none", borderRadius: 4,
          fontFamily: "Georgia, serif", fontSize: 12,
          letterSpacing: "0.1em", cursor: "pointer",
        }}>Send message →</button>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 9, color: t.textFaint, margin: "1rem 0 0", textAlign: "center", lineHeight: 1.6 }}>
          Usually responds within 48 hours · Based in Brooklyn, NY
        </p>
      </div>
    ),
    dusk: (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {[
          { plan: "SOLO", price: "$29", note: "per month", features: ["5 projects", "20GB storage", "Basic analytics", "Email support"] },
          { plan: "STUDIO", price: "$79", note: "per month", features: ["Unlimited projects", "100GB storage", "Full analytics", "Priority support", "Team seats (3)"] },
          { plan: "AGENCY", price: "$199", note: "per month", features: ["Everything in Studio", "500GB storage", "White-label", "SLA guarantee", "Dedicated manager"] },
        ].map((tier, j) => (
          <div key={tier.plan} style={{
            padding: "1.8rem 1.4rem",
            background: j === 1 ? t.surface2 : t.surface,
            border: `1px solid ${j === 1 ? t.borderAccent : t.border}`,
            position: "relative",
          }}>
            {j === 1 && (
              <div style={{
                position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
                background: t.accent, color: t.bg,
                fontFamily: "'Courier New', monospace", fontSize: 7,
                padding: "2px 10px", letterSpacing: "0.15em",
              }}>POPULAR</div>
            )}
            <p style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: t.accent, margin: "0 0 0.8rem", letterSpacing: "0.2em" }}>{tier.plan}</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: t.text, margin: "0 0 2px", lineHeight: 1 }}>{tier.price}</p>
            <p style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: t.textDim, margin: "0 0 1.2rem" }}>{tier.note}</p>
            <div style={{ height: 1, background: t.border, margin: "0 0 1.2rem" }} />
            {tier.features.map(f => (
              <p key={f} style={{ fontFamily: "Georgia, serif", fontSize: 10, color: t.textDim, margin: "0 0 6px", paddingLeft: "1rem", position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: t.accent }}>✓</span>
                {f}
              </p>
            ))}
            <button style={{
              marginTop: "1.2rem", width: "100%",
              padding: "0.65rem",
              background: j === 1 ? t.accent : "transparent",
              color: j === 1 ? t.bg : t.text,
              border: `1px solid ${j === 1 ? t.accent : t.border}`,
              fontFamily: "'Courier New', monospace", fontSize: 8,
              letterSpacing: "0.15em", cursor: "pointer",
            }}>GET STARTED →</button>
          </div>
        ))}
      </div>
    ),
    static: (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", border: `1px solid ${t.border}` }}>
          {["CLIENT", "PROJECT", "YEAR", "STATUS"].map((h, j) => (
            <div key={h} style={{
              padding: "0.5rem 0.8rem",
              borderRight: j < 3 ? `1px solid ${t.border}` : "none",
              fontFamily: ff, fontSize: 7,
              color: t.textFaint, letterSpacing: "0.2em",
            }}>{h}</div>
          ))}
        </div>
        {[
          ["SIGNAL FM",    "Brand Identity",  "2024", "→ LIVE"],
          ["VANTA",        "Art Direction",   "2024", "→ LIVE"],
          ["HOLLOW",       "Packaging",       "2024", "→ LIVE"],
          ["BIOME",        "Digital Art",     "2023", "→ ARCHIVE"],
          ["CIRCUIT CITY", "Photography",     "2023", "→ ARCHIVE"],
          ["FREQUENCY",    "Generative Art",  "2023", "→ ARCHIVE"],
        ].map((row, j) => (
          <div key={row[0]} style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            border: `1px solid ${t.border}`, borderTop: "none",
          }}>
            {row.map((cell, k) => (
              <div key={k} style={{
                padding: "0.6rem 0.8rem",
                borderRight: k < 3 ? `1px solid ${t.border}` : "none",
                fontFamily: ff, fontSize: k === 0 ? 10 : 9,
                fontWeight: k === 0 ? 700 : 400,
                color: k === 3 ? t.accent : k === 0 ? t.text : t.textDim,
                letterSpacing: k === 0 ? "0.04em" : "0.02em",
                background: j % 2 === 1 ? t.surface : "transparent",
                transition: "background 0.15s",
              }}>{cell}</div>
            ))}
          </div>
        ))}
      </div>
    ),
  };

  return (
    <div style={{ background: t.bg, padding: "4rem 3rem", transition: "background 0.5s" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: isEven ? "300px 1fr" : "1fr 300px",
          gap: "4rem",
          alignItems: "start",
        }}>
          <div style={{ order: isEven ? 0 : 1 }}>
            <p style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: t.accent, margin: "0 0 0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", transition: "color 0.5s" }}>
              0{i + 1} · {t.tag}
            </p>
            <p style={{
              fontFamily: t.id === "garden" || t.id === "dusk" ? "Georgia, serif" : "'Arial Black', Arial, sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 900,
              color: t.text,
              margin: "0 0 1rem",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              transition: "color 0.5s",
            }}>{t.name}</p>
            <div style={{ width: 32, height: 2, background: t.accent, margin: "0 0 1.2rem", transition: "background 0.5s" }} />
            <p style={{
              fontFamily: t.id === "garden" || t.id === "dusk" ? "Georgia, serif" : "'Courier New', monospace",
              fontSize: 13,
              fontStyle: t.id === "garden" || t.id === "dusk" ? "italic" : "normal",
              color: t.textDim,
              margin: "0 0 1.8rem",
              lineHeight: 1.7,
              transition: "color 0.5s",
            }}>{t.desc}</p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "0.6rem 1.2rem",
              background: t.accent,
              color: t.bg,
              fontFamily: "'Courier New', monospace",
              fontSize: 8,
              letterSpacing: "0.18em",
              cursor: "pointer",
              transition: "background 0.5s, color 0.5s",
            }}>DOWNLOAD PACK →</div>
          </div>

          <div style={{ order: isEven ? 1 : 0 }}>
            {components[t.id]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UIPacks() {
  const [active, setActive] = useState(0);
  const t = THEMES[active];

  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>

      {/* ── HERO ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 2rem 0" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: "#333", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          HTML · CSS · UI Kits · 2025
        </p>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
          <h1 style={{
            fontFamily: "'Arial Black', Arial, sans-serif",
            fontSize: "clamp(3rem, 10vw, 6rem)",
            fontWeight: 900, letterSpacing: "-0.03em",
            margin: 0, lineHeight: 0.88, textTransform: "uppercase",
          }}>UI PACKS</h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: "#444", maxWidth: 380, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
            Five complete design systems. Copy-paste HTML and CSS. Each theme is a fully realized world — not a color swap.
          </p>
        </div>

        {/* ── THEME SWITCHER ── */}
        <div style={{ display: "flex", gap: 0, marginBottom: 0, borderTop: "1px solid #111", borderLeft: "1px solid #111" }}>
          {THEMES.map((theme, i) => (
            <button
              key={theme.id}
              onClick={() => setActive(i)}
              style={{
                flex: 1,
                padding: "0.9rem 0.5rem",
                background: i === active ? theme.bg : "#000",
                color: i === active ? theme.accent : "#333",
                border: "none",
                borderRight: "1px solid #111",
                borderBottom: i === active ? "none" : "1px solid #111",
                fontFamily: "'Courier New', monospace",
                fontSize: 9,
                letterSpacing: "0.18em",
                cursor: "pointer",
                transition: "background 0.3s, color 0.3s",
                textTransform: "uppercase",
                position: "relative",
              }}
            >
              {theme.name}
              {i === active && (
                <span style={{
                  position: "absolute",
                  bottom: 0, left: "50%",
                  transform: "translateX(-50%)",
                  width: 4, height: 4,
                  borderRadius: "50%",
                  background: theme.accent,
                  display: "block",
                }} />
              )}
            </button>
          ))}
        </div>

        {/* ── LIVE DEMO ── */}
        <LiveDemo t={t} />
        <div style={{
          padding: "0.6rem 1rem",
          background: t.bg,
          borderTop: `1px solid ${t.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          transition: "background 0.5s, border-color 0.5s",
          marginBottom: "6rem",
        }}>
          <p style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: t.textFaint, margin: 0, letterSpacing: "0.2em", transition: "color 0.5s" }}>
            LIVE PREVIEW · {t.name} THEME
          </p>
          <p style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: t.accent, margin: 0, letterSpacing: "0.15em", transition: "color 0.5s" }}>
            {t.tag}
          </p>
        </div>
      </div>

      {/* ── FULL-BLEED THEME BANDS ── */}
      {THEMES.map((theme, i) => (
        <ThemeBand key={theme.id} t={theme} i={i} />
      ))}

      {/* ── FOOTER CTA ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "5rem 2rem 6rem" }}>
        <div style={{ borderTop: "1px solid #111", paddingTop: "3rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem" }}>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "0.8rem" }}>WHAT&apos;S IN EACH PACK</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.8 }}>
              Full HTML template · CSS variables file · Component library (nav, cards, buttons, forms, tables, modals) · Dark/light variant where applicable · README with usage notes. No JavaScript required for the base layer.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "0.8rem" }}>STATUS</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.8 }}>
              In production. All five themes shipping as a bundle. Individual packs available separately. Early access pricing — drops when it launches.
            </p>
          </div>
        </div>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/work" style={{
            fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em",
            color: "#444", textDecoration: "none", textTransform: "uppercase",
            border: "1px solid #1a1a1a", padding: "0.9rem 1.8rem",
            display: "inline-flex", alignItems: "center", minHeight: 44,
          }}>← BACK TO WORK</Link>
        </div>
      </div>
    </main>
  );
}
