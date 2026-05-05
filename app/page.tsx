"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useTheme, type Theme } from "./theme";
import UnicornWindow from "./components/UnicornWindow";

function pageColors(theme: Theme) {
  if (theme === "light") return {
    border:     "rgba(0,0,0,0.09)",
    text:       "#111111",
    textDim:    "rgba(17,17,17,0.45)",
    textFaint:  "rgba(17,17,17,0.2)",
    accent:     "#e8003d",
  };
  if (theme === "mid") return {
    border:     "rgba(180,120,255,0.18)",
    text:       "rgba(255,232,185,0.92)",
    textDim:    "rgba(255,195,120,0.45)",
    textFaint:  "rgba(255,180,80,0.2)",
    accent:     "#ffaa00",
  };
  return {
    border:     "rgba(255,255,255,0.05)",
    text:       "#ffffff",
    textDim:    "rgba(255,255,255,0.28)",
    textFaint:  "rgba(255,255,255,0.14)",
    accent:     "#ff00aa",
  };
}

const PROJECTS = [
  { slug: "themes",        name: "THEMES",        year: "2025", cls: "m-uipacks",   file: "themes.zip"       },
  { slug: "packs",         name: "PACKS",         year: "2025", cls: "m-silt",      file: "packs.zip"        },
  { slug: "gen-ai-tools",  name: "GEN AI TOOLS",  year: "2024", cls: "m-signal",    file: "gen-ai.mp4"       },
  { slug: "animation",     name: "ANIMATION",     year: "2025", cls: "m-vanta",     file: "animation.mp4",   unicorn: true },
  { slug: "design-tools",  name: "DESIGN TOOLS",  year: "2025", cls: "m-biome",     file: "design-tools.zip" },
  { slug: "ui-packs",      name: "UI PACKS",      year: "2025", cls: "m-uipacks",   file: "ui-packs.zip"     },
  { slug: "github",        name: "GITHUB",        year: "2018–", cls: "m-plugins",  file: "github.com",      href: "https://github.com/cadyberry" },
  { slug: "shop",          name: "SHOP",          year: "2025", cls: "m-unavoide",  file: "unavoide.com",    href: "https://unavoide.com" },
];

const MARQUEE_TEXT = Array(6).fill(
  "UI Design · Creative Direction · Digital Art · Brand Identity · Photography · Generative AI · Web Development · Brooklyn NY · Available for Hire · ✹ "
).join("");

export default function Home() {
  const { theme } = useTheme();
  const c = pageColors(theme);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".browser-window");
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add("loaded"), 80 + i * 110);
    });
  }, []);

  return (
    <div className="home-wrap">

      {/* ── HEADER ── */}
      <header className="home-header">
        <h1 className="home-wordmark">acadia berry</h1>
        <p className="home-tagline">designer · artist · technologist · NYC</p>
      </header>

      {/* ── MAIN GRID ── */}
      <div className="main-grid">
        <div className="collage-area">
          <div className="browser-collage">
            {PROJECTS.map((p, i) => {
              const dest = (p as {href?: string}).href ?? `/work/${p.slug}`;
              const external = !!(p as {href?: string}).href;
              const cls = `browser-window win-${i + 1}`;
              const isUnicorn = !!(p as { unicorn?: boolean }).unicorn;
              const inner = <>
                <div className="window-titlebar">{p.file}</div>
                <div className={`window-screen ${p.cls}`}>
                  {isUnicorn ? <UnicornWindow /> : <div className="screen" />}
                </div>
              </>;
              return external
                ? <a key={p.slug} href={dest} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
                : <Link key={p.slug} href={dest} className={cls}>{inner}</Link>;
            })}
          </div>
        </div>

        <aside className="index-area">
          <div className="work-index">
            <div className="index-label">[INDEX]</div>
            {PROJECTS.map((p, i) => {
              const dest = (p as {href?: string}).href ?? `/work/${p.slug}`;
              const external = !!(p as {href?: string}).href;
              const rowStyle = { animationDelay: `${0.2 + i * 0.07}s` };
              const inner = <>
                <span className="row-num">{String(i + 1).padStart(2, "0")}.</span>
                <span className="row-name">{p.name}</span>
                <span className="row-year">{p.year}</span>
              </>;
              return external
                ? <a key={p.slug} href={dest} target="_blank" rel="noopener noreferrer" className="work-row" style={rowStyle}>{inner}</a>
                : <Link key={p.slug} href={dest} className="work-row" style={rowStyle}>{inner}</Link>;
            })}
          </div>
        </aside>
      </div>

      {/* ── MARQUEE ── */}
      <div style={{
        borderTop: `1px solid ${c.border}`,
        borderBottom: `1px solid ${c.border}`,
        overflow: "hidden",
        whiteSpace: "nowrap",
        padding: "0.85rem 0",
        marginTop: "3rem",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}>
        <div style={{
          display: "inline-block",
          animation: "marquee 32s linear infinite",
          fontFamily: "monospace",
          fontSize: "0.52rem",
          letterSpacing: "0.28em",
          color: c.textFaint,
          textTransform: "uppercase",
        }}>
          {MARQUEE_TEXT}
        </div>
      </div>

      {/* ── PLAY + SHOP ── */}
      <section style={{
        borderTop: `1px solid ${c.border}`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}>
        <div style={{
          padding: "3.5rem 3rem",
          borderRight: `1px solid ${c.border}`,
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.3em", color: c.accent, textTransform: "uppercase", marginBottom: "1rem" }}>Play</p>
          <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: c.text, margin: "0 0 0.8rem", lineHeight: 1 }}>
            8 FREE TOOLS
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: c.textDim, lineHeight: 1.7, marginBottom: "1.8rem", maxWidth: 360 }}>
            Kaleidoscope, pixel editor, generative art, digital rain — all browser-based, all free, built from scratch since 2018.
          </p>
          <a href="https://unafield.vercel.app" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
            color: c.textDim, textDecoration: "none", textTransform: "uppercase",
            border: `1px solid ${c.border}`, padding: "0.8rem 1.5rem",
            display: "inline-flex", alignItems: "center", minHeight: 44,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = c.text; (e.currentTarget as HTMLAnchorElement).style.borderColor = c.textDim; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = c.textDim; (e.currentTarget as HTMLAnchorElement).style.borderColor = c.border; }}>
            EXPLORE TOOLS →
          </a>
        </div>

        <div style={{ padding: "3.5rem 3rem", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.3em", color: c.accent, textTransform: "uppercase", marginBottom: "1rem" }}>Shop</p>
          <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: c.text, margin: "0 0 0.8rem", lineHeight: 1 }}>
            PRINTS + BOOKS
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: c.textDim, lineHeight: 1.7, marginBottom: "1.8rem", maxWidth: 360 }}>
            60+ digital art prints. Three books in production — travel photography, coloring book, print collection.
          </p>
          <a href="https://unavoide.com" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
            color: c.textDim, textDecoration: "none", textTransform: "uppercase",
            border: `1px solid ${c.border}`, padding: "0.8rem 1.5rem",
            display: "inline-flex", alignItems: "center", minHeight: 44,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = c.text; (e.currentTarget as HTMLAnchorElement).style.borderColor = c.textDim; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = c.textDim; (e.currentTarget as HTMLAnchorElement).style.borderColor = c.border; }}>
            VISIT SHOP →
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: `1px solid ${c.border}`,
        padding: "1.8rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}>
        <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.25em", color: c.textFaint, textTransform: "uppercase" }}>
          © 2026 ACADIA · Brooklyn, NY
        </span>
        <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.25em", color: c.textFaint, textTransform: "uppercase" }}>
          acadiaberry.com
        </span>
      </footer>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
      `}</style>
    </div>
  );
}
