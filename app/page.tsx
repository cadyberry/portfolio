"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useTheme, type Theme } from "./theme";

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
  { slug: "gen-ai-tools",  name: "CREATIVE TOOLS", year: "2024", cls: "m-signal",   href: "https://unafield.vercel.app", img: "/icons/creative-tools.svg" },
  { slug: "motion",        name: "MOTION",         year: "2025", cls: "m-vanta",                                         img: "/icons/motion.svg"         },
  { slug: "audio",         name: "MUSIC",          year: "2025", cls: "m-signal",                                        img: "/icons/music.svg"          },
  { slug: "github",        name: "GITHUB",         year: "2018–", cls: "m-plugins", href: "https://github.com/cadyberry", img: "/icons/github.svg"         },
  { slug: "shop",          name: "SHOP",           year: "2025", cls: "m-unavoide",                                      img: "/icons/shop.svg"           },
];

const MARQUEE_TEXT = Array(6).fill(
  "UI Design · Creative Direction · Digital Art · Brand Identity · Photography · Generative AI · Web Development · Brooklyn NY · Available for Hire · ✹ "
).join("");

type Offset = { x: number; y: number };

export default function Home() {
  const { theme } = useTheme();
  const c = pageColors(theme);

  const [offsets, setOffsets] = useState<Record<string, Offset>>({});
  const offsetsRef = useRef<Record<string, Offset>>({});
  const drag = useRef<{ slug: string; startX: number; startY: number; originX: number; originY: number } | null>(null);
  const moved = useRef(false);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".browser-window");
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add("loaded"), 80 + i * 110);
    });
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.startX;
      const dy = e.clientY - drag.current.startY;
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved.current = true;
      if (!moved.current) return;
      const { slug, originX, originY } = drag.current;
      const next = { ...offsetsRef.current, [slug]: { x: originX + dx, y: originY + dy } };
      offsetsRef.current = next;
      setOffsets(next);
    }
    function onUp() { drag.current = null; }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  function startDrag(slug: string, e: React.MouseEvent) {
    e.preventDefault();
    moved.current = false;
    const off = offsetsRef.current[slug] ?? { x: 0, y: 0 };
    drag.current = { slug, startX: e.clientX, startY: e.clientY, originX: off.x, originY: off.y };
  }

  function guardClick(e: React.MouseEvent) {
    if (moved.current) { e.preventDefault(); e.stopPropagation(); }
  }

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
              const dest = (p as { href?: string }).href ?? `/work/${p.slug}`;
              const external = !!(p as { href?: string }).href;
              const off = offsets[p.slug];
              const iconStyle: React.CSSProperties = off
                ? { transform: `translate(${off.x}px, ${off.y}px)` }
                : {};
              const cls = `browser-window win-${i + 1}`;
              const inner = (
                <>
                  <div className={`window-screen ${p.cls}`} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div className="screen" style={{ position: "absolute", inset: 0 }} />
                    <img src={p.img} alt={p.name} style={{ position: "relative", zIndex: 1, width: "60%", height: "60%", objectFit: "contain", opacity: 0.92, pointerEvents: "none" }} />
                  </div>
                  <div className="window-titlebar">{p.name}</div>
                </>
              );
              const sharedProps = {
                className: cls,
                style: iconStyle,
                onMouseDown: (e: React.MouseEvent) => startDrag(p.slug, e),
                onClick: guardClick,
              };
              return external
                ? <a key={p.slug} href={dest} target="_blank" rel="noopener noreferrer" {...sharedProps}>{inner}</a>
                : <Link key={p.slug} href={dest} {...sharedProps}>{inner}</Link>;
            })}
          </div>
        </div>

        <aside className="index-area">
          <div className="work-index">
            <div className="index-label">[INDEX]</div>
            {PROJECTS.map((p, i) => {
              const dest = (p as { href?: string }).href ?? `/work/${p.slug}`;
              const external = !!(p as { href?: string }).href;
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
          fontFamily: "Special Elite, monospace",
          fontSize: "0.52rem",
          letterSpacing: "0.28em",
          color: c.textFaint,
          textTransform: "lowercase",
        }}>
          {MARQUEE_TEXT}
        </div>
      </div>

      {/* ── PLAY + SHOP ── */}
      <section className="home-play-shop" style={{
        borderTop: `1px solid ${c.border}`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}>
        <div className="home-play-card" style={{
          padding: "3.5rem 3rem",
          borderRight: `1px solid ${c.border}`,
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}>
          <p style={{ fontFamily: "Special Elite, monospace", fontSize: "0.52rem", letterSpacing: "0.3em", color: c.accent, textTransform: "lowercase", marginBottom: "1rem" }}>Play</p>
          <p style={{ fontFamily: "Special Elite, monospace", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: c.text, margin: "0 0 0.8rem", lineHeight: 1 }}>
            8 FREE TOOLS
          </p>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.82rem", color: c.textDim, lineHeight: 1.7, marginBottom: "1.8rem", maxWidth: 360 }}>
            Kaleidoscope, pixel editor, generative art, digital rain — all browser-based, all free, built from scratch since 2018.
          </p>
          <a href="https://unafield.vercel.app" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "Special Elite, monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
            color: c.textDim, textDecoration: "none", textTransform: "lowercase",
            border: `1px solid ${c.border}`, padding: "0.8rem 1.5rem",
            display: "inline-flex", alignItems: "center", minHeight: 44, transition: "all 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = c.text; (e.currentTarget as HTMLAnchorElement).style.borderColor = c.textDim; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = c.textDim; (e.currentTarget as HTMLAnchorElement).style.borderColor = c.border; }}>
            EXPLORE TOOLS →
          </a>
        </div>

        <div className="home-play-card" style={{ padding: "3.5rem 3rem", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
          <p style={{ fontFamily: "Special Elite, monospace", fontSize: "0.52rem", letterSpacing: "0.3em", color: c.accent, textTransform: "lowercase", marginBottom: "1rem" }}>Shop</p>
          <p style={{ fontFamily: "Special Elite, monospace", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: c.text, margin: "0 0 1.8rem", lineHeight: 1 }}>
            PRINTS + BOOKS
          </p>
          <a href="https://unavoide.com" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "Special Elite, monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
            color: c.textDim, textDecoration: "none", textTransform: "lowercase",
            border: `1px solid ${c.border}`, padding: "0.8rem 1.5rem",
            display: "inline-flex", alignItems: "center", minHeight: 44, transition: "all 0.2s",
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
        padding: "1.8rem clamp(1rem, 4vw, 3rem)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}>
        <span style={{ fontFamily: "Special Elite, monospace", fontSize: "0.48rem", letterSpacing: "0.25em", color: c.textFaint, textTransform: "lowercase" }}>
          © 2026 ACADIA · Brooklyn, NY
        </span>
        <span style={{ fontFamily: "Special Elite, monospace", fontSize: "0.48rem", letterSpacing: "0.25em", color: c.textFaint, textTransform: "lowercase" }}>
          acadiaberry.com
        </span>
      </footer>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
      `}</style>
    </div>
  );
}
