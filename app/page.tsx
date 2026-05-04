"use client";

import { useEffect } from "react";
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
  { slug: "signal-fm",    name: "SIGNAL FM",    year: "2024", cls: "m-signal",    file: "signal-fm.mp4"    },
  { slug: "vanta",        name: "VANTA",         year: "2024", cls: "m-vanta",     file: "vanta.mp4"        },
  { slug: "hollow",       name: "HOLLOW",        year: "2024", cls: "m-hollow",    file: "hollow.png"       },
  { slug: "biome",        name: "BIOME",         year: "2023", cls: "m-biome",     file: "biome.gif"        },
  { slug: "circuit-city", name: "CIRCUIT CITY",  year: "2023", cls: "m-circuit",   file: "circuit-city.jpg" },
  { slug: "frequency",    name: "FREQUENCY",     year: "2023", cls: "m-frequency", file: "frequency.gif"    },
  { slug: "silt",         name: "SILT",          year: "2022", cls: "m-silt",      file: "silt.png"         },
  { slug: "unavoide",     name: "UNAVOIDE",      year: "2018", cls: "m-unavoide",  file: "unavoide.mp4"     },
  { slug: "ui-packs",    name: "UI PACKS",      year: "2025", cls: "m-uipacks",   file: "ui-packs.zip"     },
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
        <p className="home-tagline">Digital Designer · Artist · Brooklyn, NY</p>
      </header>

      {/* ── MAIN GRID ── */}
      <div className="main-grid">
        <div className="collage-area">
          <div className="browser-collage">
            {PROJECTS.map((p, i) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className={`browser-window win-${i + 1}`}
              >
                <div className="window-titlebar">{p.file}</div>
                <div className={`window-screen ${p.cls}`}>
                  <div className="screen" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="index-area">
          <div className="work-index">
            <div className="index-label">[INDEX]</div>
            {PROJECTS.map((p, i) => (
              <Link
                key={p.slug}
                href={`/work/${p.slug}`}
                className="work-row"
                style={{ animationDelay: `${0.2 + i * 0.07}s` }}
              >
                <span className="row-num">{String(i + 1).padStart(2, "0")}.</span>
                <span className="row-name">{p.name}</span>
                <span className="row-year">{p.year}</span>
              </Link>
            ))}
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

      {/* ── STATEMENT ── */}
      <section style={{
        padding: "5rem 3rem",
        maxWidth: 900,
        margin: "0 auto",
      }}>
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(1.4rem, 2.4vw, 2.2rem)",
          lineHeight: 1.55,
          color: c.textDim,
          fontStyle: "italic",
          maxWidth: 720,
          borderLeft: `2px solid ${c.accent}`,
          paddingLeft: "1.5rem",
          margin: 0,
        }}>
          &ldquo;Design is how I pay attention.&rdquo;
        </p>
        <div style={{ marginTop: "2rem" }}>
          <Link href="/about" style={{
            fontFamily: "monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.2em",
            color: c.textDim,
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = c.text)}
          onMouseLeave={e => (e.currentTarget.style.color = c.textDim)}>
            ABOUT ACADIA →
          </Link>
        </div>
      </section>

      {/* ── PLAY + SHOP ── */}
      <section style={{
        borderTop: `1px solid ${c.border}`,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}>
        <div style={{
          padding: "3.5rem 3rem",
          borderRight: `1px solid ${c.border}`,
        }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.3em", color: c.accent, textTransform: "uppercase", marginBottom: "1rem" }}>Play</p>
          <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: c.text, margin: "0 0 0.8rem", lineHeight: 1 }}>
            8 FREE TOOLS
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: c.textDim, lineHeight: 1.7, marginBottom: "1.8rem", maxWidth: 360 }}>
            Kaleidoscope, pixel editor, generative art, digital rain — all browser-based, all free, built from scratch since 2018.
          </p>
          <Link href="/play" style={{
            fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
            color: c.textDim, textDecoration: "none", textTransform: "uppercase",
            border: `1px solid ${c.border}`, padding: "0.8rem 1.5rem",
            display: "inline-flex", alignItems: "center", minHeight: 44,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = c.text; e.currentTarget.style.borderColor = c.textDim; }}
          onMouseLeave={e => { e.currentTarget.style.color = c.textDim; e.currentTarget.style.borderColor = c.border; }}>
            EXPLORE TOOLS →
          </Link>
        </div>

        <div style={{ padding: "3.5rem 3rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.3em", color: c.accent, textTransform: "uppercase", marginBottom: "1rem" }}>Shop</p>
          <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: c.text, margin: "0 0 0.8rem", lineHeight: 1 }}>
            PRINTS + BOOKS
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: c.textDim, lineHeight: 1.7, marginBottom: "1.8rem", maxWidth: 360 }}>
            60+ digital art prints. Three books in production — travel photography, coloring book, print collection.
          </p>
          <Link href="/shop" style={{
            fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
            color: c.textDim, textDecoration: "none", textTransform: "uppercase",
            border: `1px solid ${c.border}`, padding: "0.8rem 1.5rem",
            display: "inline-flex", alignItems: "center", minHeight: 44,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = c.text; e.currentTarget.style.borderColor = c.textDim; }}
          onMouseLeave={e => { e.currentTarget.style.color = c.textDim; e.currentTarget.style.borderColor = c.border; }}>
            VISIT SHOP →
          </Link>
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
