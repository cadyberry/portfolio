"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, type Theme } from "../theme";

type Tab = "skills" | "offerings";

/* ── Tech spheres ─────────────────────────────────────────── */
const TECH: { name: string; size: "sm" | "md" | "lg" }[] = [
  { name: "Figma",       size: "lg" },
  { name: "React",       size: "lg" },
  { name: "Next.js",     size: "md" },
  { name: "TypeScript",  size: "lg" },
  { name: "Node.js",     size: "md" },
  { name: "Python",      size: "md" },
  { name: "TailwindCSS", size: "sm" },
  { name: "SQL",         size: "sm" },
  { name: "Adobe CC",    size: "sm" },
  { name: "Framer",      size: "md" },
  { name: "Vercel",      size: "sm" },
  { name: "OpenAI API",  size: "lg" },
  { name: "FL Studio",   size: "sm" },
  { name: "Git",         size: "sm" },
];

const TECH_COLORS: Record<string, string> = {
  "Figma":       "#a259ff",
  "React":       "#087ea4",
  "Next.js":     "#1a1a1a",
  "TypeScript":  "#3178c6",
  "Node.js":     "#5fa04e",
  "Python":      "#ffd343",
  "TailwindCSS": "#0e7490",
  "SQL":         "#f97316",
  "Adobe CC":    "#cc1100",
  "Framer":      "#0055ff",
  "Vercel":      "#333333",
  "OpenAI API":  "#10a37f",
  "FL Studio":   "#e05c00",
  "Git":         "#f05032",
};

const TECH_SIZES = {
  sm: "clamp(58px, 19vw, 76px)",
  md: "clamp(82px, 26vw, 108px)",
  lg: "clamp(108px, 34vw, 144px)",
};

/* ── Offerings SVG map ────────────────────────────────────── */
const VW = 540, VH = 620;
const JX = 270, JY = 310;

const RAW_O: [string, string, number, number, number, number, number, number][] = [
  //  title                   desc-key   x    y   rx  ry  rot  off
  ["Brand Identity",        "0",  265,  68, 30, 20,  -5,  10],
  ["Web Design & Dev",      "1",  440, 152, 26, 17, -22, -15],
  ["UI / UX Design",        "2",  455, 428, 24, 16,  18,  12],
  ["Creative Direction",    "3",  258, 550, 32, 21,   5,  -8],
  ["Generative Art",        "4",   82, 430, 27, 18,  -8,  15],
  ["AI Integration",        "5",   92, 158, 29, 19,  10, -12],
];

const OFFERING_DESCS = [
  "Logo systems, type pairings, color strategy, and brand guidelines built to last.",
  "Custom sites and apps built from scratch — fast, responsive, and actually yours.",
  "Wireframes, prototypes, and polished interfaces for products that need to feel right.",
  "Visual strategy and art direction for campaigns, launches, and ongoing projects.",
  "Custom digital pieces, series, and prints generated with code.",
  "Wiring language models and generative tools into products and workflows.",
];

function bcp(jx: number, jy: number, nx: number, ny: number, off: number) {
  const mx = (jx + nx) / 2, my = (jy + ny) / 2;
  const dx = nx - jx, dy = ny - jy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { cpx: mx + (-dy / len) * off, cpy: my + (dx / len) * off };
}

function spikeRot(jx: number, jy: number, tx: number, ty: number) {
  return (Math.atan2(ty - jy, tx - jx) * 180) / Math.PI + 90;
}

const O_NODES = RAW_O.map(([title,, x, y, rx, ry, rot, off]) => ({
  title: title as string,
  x, y, rx, ry, rot,
  jx: JX, jy: JY,
  ...bcp(JX, JY, x, y, off),
}));

const J_SPIKES = O_NODES.map(n => ({ tx: n.x, ty: n.y }));

function cardPos(n: typeof O_NODES[number]) {
  const xPct = (n.x / VW) * 100;
  const xT   = xPct < 22 ? "0%" : xPct > 78 ? "-100%" : "-50%";
  const above = n.y / VH > 0.65;
  const top   = above
    ? `${((n.y - n.ry - 12) / VH) * 100}%`
    : `${((n.y + n.ry + 12) / VH) * 100}%`;
  const yT = above ? "translateY(-100%)" : "";
  const xPart = xT !== "0%" ? `translateX(${xT})` : "";
  return { left: `${xPct}%`, top, transform: [xPart, yT].filter(Boolean).join(" ") || `translateX(${xT})` };
}

/* ── Theme ────────────────────────────────────────────────── */
function colors(theme: Theme) {
  if (theme === "light") return {
    text: "#111111", faint: "rgba(17,17,17,0.3)",
    accent: "#e8003d",
    tabActive: "#111111", tabActiveText: "#ffffff",
    tabInactive: "transparent", tabInactiveText: "rgba(17,17,17,0.4)",
    tabBorder: "rgba(0,0,0,0.12)",
    stroke: "#0d0d0d", junction: "#0d0d0d", blob: "#5535d6",
    card: "rgba(255,255,255,0.97)", cardBorder: "rgba(0,0,0,0.08)",
    cardShadow: "0 6px 24px rgba(0,0,0,0.09)",
  };
  if (theme === "mid") return {
    text: "rgba(255,232,185,0.92)", faint: "rgba(255,195,120,0.4)",
    accent: "#ffaa00",
    tabActive: "#ffaa00", tabActiveText: "#12082a",
    tabInactive: "transparent", tabInactiveText: "rgba(255,195,120,0.4)",
    tabBorder: "rgba(180,120,255,0.18)",
    stroke: "#c0b0f0", junction: "#c0b0f0", blob: "#7c5ce4",
    card: "rgba(24,0,12,0.97)", cardBorder: "rgba(192,176,240,0.14)",
    cardShadow: "0 6px 24px rgba(0,0,0,0.55)",
  };
  return {
    text: "#ffffff", faint: "rgba(255,255,255,0.25)",
    accent: "#ff00aa",
    tabActive: "#ffffff", tabActiveText: "#050508",
    tabInactive: "transparent", tabInactiveText: "rgba(255,255,255,0.35)",
    tabBorder: "rgba(255,255,255,0.12)",
    stroke: "#c8baf2", junction: "#c8baf2", blob: "#7c5ce4",
    card: "rgba(10,0,5,0.97)", cardBorder: "rgba(255,255,255,0.09)",
    cardShadow: "0 6px 24px rgba(0,0,0,0.7)",
  };
}

/* ── Component ────────────────────────────────────────────── */
export default function Skills() {
  const { theme } = useTheme();
  const c = colors(theme);
  const [tab, setTab]         = useState<Tab>("skills");
  const [open, setOpen]       = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    if (open === i) { setOpen(null); return; }
    setOpen(i);
    setVisited(prev => new Set([...prev, i]));
  };

  return (
    <main style={{ minHeight: "100vh", paddingTop: "5rem", paddingBottom: "4rem", color: c.text }}>
      <style>{`
        .tech-sphere {
          position: relative; border-radius: 50%; overflow: hidden; flex-shrink: 0;
          box-shadow: 0 10px 24px -6px rgba(0,0,0,0.75), 0 5px 12px -4px rgba(0,0,0,0.5),
            inset -8px -10px 24px rgba(0,0,0,0.65), inset 4px 5px 14px rgba(255,255,255,0.07);
          transition: box-shadow 0.25s ease, filter 0.25s ease;
        }
        .tech-sphere:hover {
          filter: saturate(1.2) brightness(1.08);
          box-shadow: 0 14px 30px -5px rgba(0,0,0,0.85), 0 7px 16px -4px rgba(0,0,0,0.6),
            inset -8px -10px 24px rgba(0,0,0,0.65), inset 4px 5px 14px rgba(255,255,255,0.10),
            0 0 30px rgba(255,255,255,0.05);
        }
        .tech-shade {
          position: absolute; inset: 0; pointer-events: none; z-index: 10; border-radius: 50%;
          background: radial-gradient(ellipse at 50% 50%, transparent 48%, rgba(0,0,0,0.82) 100%),
            radial-gradient(ellipse 70% 70% at 72% 76%, rgba(0,0,0,0.6) 0%, transparent 60%),
            radial-gradient(ellipse 65% 60% at 28% 24%, rgba(255,255,255,0.07) 0%, transparent 60%);
        }
        .tech-shade::before {
          content: ''; position: absolute; top: 6%; left: 8%; width: 42%; height: 30%;
          border-radius: 50%;
          background: radial-gradient(ellipse at 35% 38%, rgba(255,255,255,0.82) 0%,
            rgba(255,255,255,0.35) 30%, rgba(255,255,255,0.08) 60%, transparent 100%);
          transform: rotate(-22deg); filter: blur(2px);
        }
        .tech-shade::after {
          content: ''; position: absolute; top: 9%; left: 13%; width: 16%; height: 11%;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.5) 45%, transparent 100%);
          filter: blur(0.5px);
        }
        .tech-name {
          position: absolute; inset: 0; z-index: 20;
          display: flex; align-items: center; justify-content: center;
          padding: 0 12%; font-size: clamp(0.34rem, 1.8vw, 0.52rem);
          letter-spacing: 0.04em; text-transform: uppercase;
          color: rgba(255,255,255,0.95); text-align: center; word-break: break-word; line-height: 1.2;
          text-shadow: 0 0 8px rgba(0,0,0,1), 0 1px 14px rgba(0,0,0,1), 0 2px 4px rgba(0,0,0,1);
        }
        @keyframes _prism {
          0%   { fill: rgba(100,48,255,0.92); }
          16%  { fill: rgba(48,148,255,0.88); }
          33%  { fill: rgba(48,218,168,0.85); }
          50%  { fill: rgba(208,255,48,0.82); }
          66%  { fill: rgba(255,148,48,0.88); }
          83%  { fill: rgba(255,48,148,0.90); }
          100% { fill: rgba(100,48,255,0.92); }
        }
        .sk-nd { cursor: pointer; }
        .sk-nd .bl { transform-box: fill-box; transform-origin: center; scale: 1; transition: scale 0.22s ease; }
        .sk-nd:hover .bl { scale: 1.12; }
        .sk-nd:focus { outline: none; }
        .sk-nd.vis .bl { animation: _prism 7s linear var(--pd, 0s) infinite; }
      `}</style>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem clamp(1rem, 4vw, 2rem) 0" }}>

        {/* Back */}
        <Link href="/about" style={{
          fontSize: "0.5rem", letterSpacing: "0.28em", color: c.faint,
          textDecoration: "none", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          marginBottom: "2.5rem", transition: "color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = c.text)}
        onMouseLeave={e => (e.currentTarget.style.color = c.faint)}>
          ← about
        </Link>

        {/* Header + toggle */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
          <h1 style={{ fontSize: "clamp(1.8rem, 8vw, 3rem)", fontWeight: 400, letterSpacing: "-0.025em", margin: 0, lineHeight: 1 }}>
            {tab === "skills" ? "skills" : "offerings"}
          </h1>
          <div style={{ display: "flex" }}>
            {(["skills", "offerings"] as Tab[]).map(t => (
              <button key={t} onClick={() => { setTab(t); setOpen(null); }} style={{
                fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase",
                padding: "0.5rem 1.1rem", cursor: "pointer", border: `1px solid ${c.tabBorder}`,
                marginLeft: -1,
                background: tab === t ? c.tabActive : c.tabInactive,
                color: tab === t ? c.tabActiveText : c.tabInactiveText,
                transition: "all 0.2s",
              }}>
                {t}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Skills — sphere cluster */}
      {tab === "skills" && (
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 clamp(1rem, 4vw, 2rem)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", justifyContent: "center", alignItems: "center", paddingBottom: "2rem" }}>
            {TECH.map(t => {
              const sz = TECH_SIZES[t.size];
              return (
                <div key={t.name} className="tech-sphere" style={{ background: TECH_COLORS[t.name] ?? c.accent, width: sz, height: sz }}>
                  <div className="tech-shade" />
                  <div className="tech-name">{t.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Offerings — SVG blob map */}
      {tab === "offerings" && (
        <div style={{
          position: "relative",
          width: "100%",
          maxWidth: `min(${VW}px, calc((100vh - 10rem) * ${VW} / ${VH}))`,
          margin: "0 auto",
          padding: "0 1.5rem",
          boxSizing: "border-box",
          overflow: "visible",
        }}>
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            width="100%"
            height="auto"
            style={{ display: "block", overflow: "visible" }}
            aria-label="Offerings map"
          >
            <defs>
              <filter id="sk-ink" x="-70%" y="-70%" width="240%" height="240%" colorInterpolationFilters="sRGB">
                <feGaussianBlur stdDeviation="9" result="b"/>
                <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12"/>
              </filter>
              <filter id="sk-soft" x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="2"/>
              </filter>
            </defs>

            {/* Branch lines */}
            <g stroke={c.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round">
              {O_NODES.map((n, i) => (
                <path key={i} d={`M${n.jx},${n.jy} Q${n.cpx},${n.cpy} ${n.x},${n.y}`}/>
              ))}
            </g>

            {/* Junction ink splat */}
            <g filter="url(#sk-ink)" fill={c.junction} pointerEvents="none">
              <circle cx={JX} cy={JY} r={14}/>
              {J_SPIKES.map((s, i) => (
                <ellipse key={i} cx={JX} cy={JY} rx={5} ry={25}
                  transform={`rotate(${spikeRot(JX, JY, s.tx, s.ty)},${JX},${JY})`}/>
              ))}
            </g>

            {/* Terminal blobs */}
            {O_NODES.map((n, i) => {
              const isVis  = visited.has(i);
              const isOpen = open === i;
              return (
                <g
                  key={i}
                  className={`sk-nd${isVis ? " vis" : ""}`}
                  onClick={() => toggle(i)}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={n.title}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") toggle(i); }}
                  style={{ "--pd": `${(i * 0.58).toFixed(2)}s` } as React.CSSProperties}
                  filter="url(#sk-soft)"
                >
                  <ellipse
                    className="bl"
                    cx={n.x} cy={n.y} rx={n.rx} ry={n.ry}
                    style={{
                      transform: `rotate(${n.rot}deg)`,
                      fill: isVis ? undefined : c.blob,
                      opacity: isOpen ? 1 : 0.88,
                    }}
                  />
                  <ellipse
                    cx={n.x} cy={n.y} rx={n.rx + 14} ry={n.ry + 14}
                    style={{ transform: `rotate(${n.rot}deg)`, fill: "transparent" }}
                  />
                </g>
              );
            })}

            {/* Always-visible title labels */}
            <g pointerEvents="none">
              {O_NODES.map((n, i) => {
                const dx = n.x - JX, dy = n.y - JY;
                const len = Math.sqrt(dx * dx + dy * dy) || 1;
                const nx = dx / len, ny = dy / len;
                const tx = n.x + nx * (n.rx + 11);
                const ty = n.y + ny * (n.ry + 11);
                const anchor = dx > 30 ? "start" : dx < -30 ? "end" : "middle";
                const baseline = dy > 30 ? "hanging" : dy < -30 ? "auto" : "middle";
                return (
                  <text
                    key={i}
                    x={tx} y={ty}
                    textAnchor={anchor}
                    dominantBaseline={baseline}
                    fontSize="11"
                    letterSpacing="0.06em"
                    fill={c.text}
                    opacity="0.75"
                    style={{ fontFamily: "'Violet Sans', sans-serif", textTransform: "uppercase" }}
                  >
                    {n.title}
                  </text>
                );
              })}
            </g>
          </svg>

          {/* Cards */}
          {O_NODES.map((n, i) => {
            const { left, top, transform } = cardPos(n);
            return (
              <AnimatePresence key={i}>
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      position: "absolute",
                      left, top, transform,
                      width: "clamp(160px, 40%, 230px)",
                      background: c.card,
                      border: `1px solid ${c.cardBorder}`,
                      boxShadow: c.cardShadow,
                      padding: "0.9rem 1rem",
                      zIndex: 20,
                      pointerEvents: "none",
                    }}
                  >
                    <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: c.text, margin: 0 }}>
                      {OFFERING_DESCS[i]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>
      )}

      {/* Footer CTA */}
      <div style={{ maxWidth: 860, margin: "2rem auto 0", padding: "1.5rem clamp(1rem, 4vw, 2rem) 0", borderTop: `1px solid ${c.tabBorder}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <span style={{ fontSize: "0.5rem", letterSpacing: "0.22em", color: c.faint, textTransform: "uppercase" }}>open for work · 2026</span>
        <Link href="/contact" style={{
          fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase",
          color: c.tabActiveText, background: c.tabActive,
          padding: "0.8rem 1.5rem", textDecoration: "none", transition: "opacity 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
        onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
          get in touch →
        </Link>
      </div>

    </main>
  );
}
