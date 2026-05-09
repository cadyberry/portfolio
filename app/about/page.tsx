"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
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

const SERVICES: { label: string; desc: string }[] = [
  { label: "UI / UX",               desc: "Interface design and user experience — flows, wireframes, prototypes, and full design systems." },
  { label: "Websites",              desc: "Design and development of web experiences, from portfolio sites to full product builds." },
  { label: "Mobile Apps",           desc: "UI design for iOS and Android — native patterns, responsive layouts, interaction design." },
  { label: "Logo & Identity",       desc: "Visual identity systems — logo, color, type, and the rules that hold a brand together." },
  { label: "Social Media Planning", desc: "Content strategy, visual templates, and creative direction for social channels." },
  { label: "Creative Consulting",   desc: "Strategic creative input on direction, aesthetics, and execution for projects or teams." },
  { label: "Poster Design",         desc: "Print and digital poster work — event, editorial, and art-driven." },
  { label: "Brand Systems",         desc: "Comprehensive brand guidelines, component libraries, and design tokens." },
  { label: "Digital Art",           desc: "Original digital artwork — generative, illustrative, abstract, or print-ready." },
  { label: "Generative AI",         desc: "Prompt engineering, AI-assisted creative workflows, and custom generative visual tools." },
  { label: "Photography",           desc: "Portrait, travel, and documentary photography. Six years, multiple countries." },
  { label: "Art Direction",         desc: "Creative leadership on visual projects — setting the aesthetic and guiding execution." },
  { label: "Motion Design",         desc: "Animated UI, motion graphics, and interactive visual experiments." },
  { label: "Illustration",          desc: "Custom illustration for digital and print — from icons to full editorial spreads." },
  { label: "Print & Book Design",   desc: "Layout and design for physical publications — books, zines, and limited editions." },
  { label: "Web Apps",              desc: "Full-stack web application design and development, from concept to deployment." },
  { label: "Prompt Engineering",    desc: "Designing and refining prompts for LLMs — for products, creative tools, or internal workflows." },
  { label: "Data Visualization",    desc: "Turning data into clear, beautiful visuals — dashboards, charts, and infographic systems." },
];

const TECH = ["Figma","Angular","React","Next.js","TypeScript","Node.js","Python","TailwindCSS","SQL","Git","Adobe CC","Framer","Vercel","OpenAI API","FL Studio"];

const TIMELINE = [
  { year: "2011",    label: "Photography",  sub: "started at 13",             color: "#00ffee" },
  { year: "2018–20", label: "Pour Painting", sub: "physical · analog",        color: "#ff6600" },
  { year: "2019",    label: "Music",         sub: "FL Studio · production",   color: "#ff00aa" },
  { year: "2020",    label: "Digital Art",   sub: "first digital works",      color: "#ccff00" },
  { year: "2021",    label: "Synthesis",     sub: "pour paintings → digital", color: "#b94dff" },
];

const TABS = ["Philosophy", "Disciplines", "Offerings", "Stack", "Work Together"] as const;
type Tab = typeof TABS[number];

export default function About() {
  const { theme } = useTheme();
  const c = colors(theme);
  const [activeTab, setActiveTab] = useState<Tab>("Philosophy");
  const [activeService, setActiveService] = useState<string | null>(null);

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
        @media (prefers-reduced-motion: reduce) { .venn-c { animation: none !important; } }
        @media (max-width: 760px) {
          .about-body { flex-direction: column !important; }
          .about-tabs { flex-direction: row !important; flex-wrap: wrap; border-right: none !important; border-bottom: 1px solid; padding-right: 0 !important; padding-bottom: 1rem; margin-bottom: 2rem; }
        }
      `}</style>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 2rem 8rem" }}>

        {/* HERO */}
        <header style={{
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
              berr<span style={{ position: "relative", display: "inline-block" }}>y<span style={{ position: "absolute", top: "0.04em", left: "50%", transform: "translateX(-50%)", width: "0.18em", height: "0.18em", borderRadius: "50%", background: c.accent, display: "inline-block" }} /></span>
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

        {/* TABS + CONTENT */}
        <div className="about-body" style={{ display: "flex", gap: "4rem", marginBottom: "8rem" }}>

          {/* Vertical tab list */}
          <nav className="about-tabs" style={{
            display: "flex", flexDirection: "column", gap: "2px",
            borderRight: `1px solid ${c.hairline}`,
            paddingRight: "2rem", flexShrink: 0, width: 140,
          }}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.5rem", letterSpacing: "0.22em", textTransform: "uppercase",
                  padding: "0.75rem 0.8rem", border: "none", cursor: "pointer",
                  background: "none", textAlign: "left", width: "100%",
                  color: activeTab === tab ? c.text : c.faint,
                  borderRight: activeTab === tab ? `2px solid ${c.accent}` : "2px solid transparent",
                  marginRight: -1,
                  transition: "color 0.18s, border-color 0.18s",
                }}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Panel */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              >

                {activeTab === "Philosophy" && (
                  <p style={{
                    fontFamily: "Fraunces, serif", fontWeight: 300,
                    fontSize: "clamp(1.35rem, 2.4vw, 1.85rem)", lineHeight: 1.45,
                    letterSpacing: "-0.012em", color: c.text, maxWidth: "38ch", margin: 0,
                  }}>
                    Visual, audio, or code
                    <span style={{ fontStyle: "italic", color: c.dim }}> — design is the thread of what she does.</span>{" "}
                    Acadia is drawn to the{" "}
                    <span style={{ color: c.accent, fontStyle: "italic" }}>endless possibility of what can be expressed through computers</span>
                    <span style={{ fontStyle: "italic", color: c.dim }}> and how that shapes the way people see, feel, and connect</span>.
                  </p>
                )}

                {activeTab === "Disciplines" && (
                  <div style={{ height: 440, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="420" height="380" viewBox="0 0 420 380" style={{ overflow: "visible" }}>
                      <circle className="venn-c a" cx="210" cy="135" r="115" fill={c.accent} fillOpacity={0.08} stroke={c.accent} strokeOpacity={0.55} strokeWidth={1} />
                      <circle className="venn-c b" cx="140" cy="240" r="115" fill={c.accent} fillOpacity={0.08} stroke={c.accent} strokeOpacity={0.55} strokeWidth={1} />
                      <circle className="venn-c c" cx="280" cy="240" r="115" fill={c.accent} fillOpacity={0.08} stroke={c.accent} strokeOpacity={0.55} strokeWidth={1} />
                    </svg>
                    {[
                      { label: "Designer",  sub: "identity · ui · brand systems", style: { top: 0,    left: "50%", transform: "translateX(-50%)" } },
                      { label: "Developer", sub: "web · tools · prototypes",       style: { bottom: 14, left: "14%", transform: "translateX(-50%)" } },
                      { label: "Artist",    sub: "generative · photo · print",     style: { bottom: 14, right: "14%", transform: "translateX(50%)" } },
                    ].map(({ label, sub, style }) => (
                      <div key={label} style={{ position: "absolute", textAlign: "center", ...style }}>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: c.text }}>{label}</span>
                        <small style={{ display: "block", marginTop: "0.35rem", fontSize: "0.48rem", letterSpacing: "0.2em", color: c.faint, lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace", textTransform: "uppercase" }}>{sub}</small>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "Offerings" && (
                  <div>
                    <div style={{ height: 440, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {/* Venn */}
                      <svg width="420" height="380" viewBox="0 0 420 380" style={{ overflow: "visible", position: "absolute" }}>
                        <circle className="venn-c a" cx="210" cy="135" r="115" fill={c.accent} fillOpacity={0.08} stroke={c.accent} strokeOpacity={0.55} strokeWidth={1} />
                        <circle className="venn-c b" cx="140" cy="240" r="115" fill={c.accent} fillOpacity={0.08} stroke={c.accent} strokeOpacity={0.55} strokeWidth={1} />
                        <circle className="venn-c c" cx="280" cy="240" r="115" fill={c.accent} fillOpacity={0.08} stroke={c.accent} strokeOpacity={0.55} strokeWidth={1} />
                      </svg>

                      {/* Services list in center intersection */}
                      <div style={{
                        position: "absolute",
                        top: "50%", left: "50%",
                        transform: "translate(-50%, -38%)",
                        width: 168, maxHeight: 200,
                        overflowY: "auto",
                        display: "flex", flexDirection: "column", gap: "2px",
                        zIndex: 10,
                        background: "transparent",
                        scrollbarWidth: "none",
                      }}>
                        {SERVICES.map(s => (
                          <motion.button
                            key={s.label}
                            onClick={() => setActiveService(activeService === s.label ? null : s.label)}
                            whileHover={{ x: 3 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                              fontFamily: "'JetBrains Mono', monospace", fontSize: "0.44rem",
                              letterSpacing: "0.1em", textTransform: "uppercase",
                              padding: "0.3rem 0.6rem", cursor: "pointer",
                              border: `1px solid ${activeService === s.label ? c.accent : "transparent"}`,
                              background: activeService === s.label ? `${c.accent}18` : "transparent",
                              color: activeService === s.label ? c.text : c.dim,
                              borderRadius: 2, textAlign: "left",
                              transition: "border-color 0.15s, background 0.15s, color 0.15s",
                            }}
                          >
                            {s.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Description zone */}
                    <div style={{ height: 72, borderTop: `1px solid ${c.hairline}`, paddingTop: "1rem" }}>
                      <AnimatePresence mode="wait">
                        {activeService && (() => {
                          const svc = SERVICES.find(s => s.label === activeService);
                          return svc ? (
                            <motion.div
                              key={activeService}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 4 }}
                              transition={{ duration: 0.16, ease: "easeOut" }}
                            >
                              <div style={{ borderLeft: `2px solid ${c.accent}`, paddingLeft: "0.8rem" }}>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.44rem", letterSpacing: "0.18em", textTransform: "uppercase", color: c.accent, marginBottom: "0.3rem" }}>
                                  {svc.label}
                                </div>
                                <div style={{ fontFamily: "Inter, sans-serif", fontSize: "0.78rem", color: c.dim, lineHeight: 1.55 }}>
                                  {svc.desc}
                                </div>
                              </div>
                            </motion.div>
                          ) : null;
                        })()}
                        {!activeService && (
                          <motion.p
                            key="hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.45rem", letterSpacing: "0.2em", color: c.faint, textTransform: "uppercase", margin: 0 }}
                          >
                            Click any offering to learn more
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {activeTab === "Stack" && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {TECH.map(t => (
                      <span key={t} style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.52rem",
                        letterSpacing: "0.1em", color: c.text,
                        border: `1px solid ${c.accent}40`,
                        background: `${c.accent}08`,
                        padding: "0.4rem 0.8rem", textTransform: "uppercase",
                        borderRadius: 4,
                      }}>{t}</span>
                    ))}
                  </div>
                )}

                {activeTab === "Work Together" && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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
                      }}>Contact →</Link>
                      <Link href="/" style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem",
                        letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none",
                        padding: "0.95rem 1.6rem", display: "inline-flex", alignItems: "center",
                        minHeight: 44, color: c.dim, border: `1px solid ${c.rule}`,
                        background: "transparent",
                      }}>See the work</Link>
                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* TIMELINE — commented out
        <section style={{ borderTop: `1px solid ${c.hairline}`, paddingTop: "4rem" }}>
          ...
        </section>
        */}

      </div>
    </main>
  );
}
