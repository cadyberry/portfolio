"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PROJECTS = [
  { slug: "signal-fm",    name: "SIGNAL FM",    sub: "Radio identity",      tag: "branding", size: "large",  cls: "m-signal"   },
  { slug: "vanta",        name: "VANTA",         sub: "Nightclub brand",     tag: "branding", size: "normal", cls: "m-vanta"    },
  { slug: "hollow",       name: "HOLLOW",        sub: "Cold brew café",      tag: "branding", size: "normal", cls: "m-hollow"   },
  { slug: "biome",        name: "BIOME",         sub: "Organic neon series", tag: "art",      size: "wide",   cls: "m-biome"    },
  { slug: "circuit-city", name: "CIRCUIT CITY",  sub: "Urban manipulation",  tag: "art",      size: "tall",   cls: "m-circuit"  },
  { slug: "frequency",    name: "FREQUENCY",     sub: "Radial transmission", tag: "art",      size: "normal", cls: "m-frequency"},
  { slug: "silt",         name: "SILT",          sub: "Fashion label",       tag: "branding", size: "normal", cls: "m-silt"     },
  { slug: "unavoide",     name: "UNAVOIDE",      sub: "Tools platform",      tag: "tools",    size: "normal", cls: "m-unavoide" },
];

const TABS = ["ALL", "ART", "BRANDING", "TOOLS"];

const MARQUEE_TEXT = Array(6).fill(
  "UI Design · Creative Direction · Digital Art · Brand Identity · Photography · Generative AI · Web Development · Brooklyn NY · Available for Hire · ✹ "
).join("");

export default function Home() {
  const [tab, setTab] = useState("ALL");
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 600);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const visible = tab === "ALL"
    ? PROJECTS
    : PROJECTS.filter(p => p.tag === tab.toLowerCase());

  return (
    <div className="home-wrap">

      {/* ── HEADER ── */}
      <header className="home-header">
        <h1 className="home-wordmark">ACADIA</h1>
        <p className="home-tagline">Digital Designer · Artist · Brooklyn, NY</p>
      </header>

      {/* ── TABS ── */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
        <div className="home-tabs">
          {TABS.map(t => (
            <button
              key={t}
              className={`home-tab${tab === t ? " active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* ── FLOOR ── */}
      <div className="floor-wrap">
        <div className="floor">
          {visible.map(p => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className={`machine ${p.cls} size-${p.size}`}
            >
              <div className="screen" />
              <div className="nameplate">
                <span className="machine-name">{p.name}</span>
                <span className="machine-enter">enter →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── MARQUEE ── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
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
          color: "rgba(255,255,255,0.14)",
          textTransform: "uppercase",
        }}>
          {MARQUEE_TEXT}
        </div>
      </div>

      {/* ── STATEMENT ── */}
      <section style={{
        padding: mobile ? "3rem 1.5rem" : "5rem 3rem",
        maxWidth: 900,
        margin: "0 auto",
      }}>
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: mobile ? "clamp(1.2rem, 5vw, 1.8rem)" : "clamp(1.4rem, 2.4vw, 2.2rem)",
          lineHeight: 1.55,
          color: "rgba(255,255,255,0.35)",
          fontStyle: "italic",
          maxWidth: 720,
          borderLeft: "2px solid #ff00aa",
          paddingLeft: "1.5rem",
          margin: 0,
        }}>
          "Appreciator of life. I notice things. I make things. Sometimes they&apos;re the same thing."
        </p>
        <div style={{ marginTop: "2rem" }}>
          <Link href="/about" style={{
            fontFamily: "monospace",
            fontSize: "0.52rem",
            letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.28)",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}>
            ABOUT ACADIA →
          </Link>
        </div>
      </section>

      {/* ── PLAY + SHOP ── */}
      <section style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
      }}>
        <div style={{
          padding: mobile ? "2.5rem 1.5rem" : "3.5rem 3rem",
          borderRight: mobile ? "none" : "1px solid rgba(255,255,255,0.05)",
          borderBottom: mobile ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "1rem" }}>Play</p>
          <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 0.8rem", lineHeight: 1 }}>
            8 FREE TOOLS
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.28)", lineHeight: 1.7, marginBottom: "1.8rem", maxWidth: 360 }}>
            Kaleidoscope, pixel editor, generative art, digital rain — all browser-based, all free, built from scratch since 2018.
          </p>
          <Link href="/play" style={{
            fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.28)", textDecoration: "none", textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.1)", padding: "0.8rem 1.5rem",
            display: "inline-flex", alignItems: "center", minHeight: 44,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.28)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
            EXPLORE TOOLS →
          </Link>
        </div>

        <div style={{ padding: mobile ? "2.5rem 1.5rem" : "3.5rem 3rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "1rem" }}>Shop</p>
          <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 0.8rem", lineHeight: 1 }}>
            PRINTS + BOOKS
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "rgba(255,255,255,0.28)", lineHeight: 1.7, marginBottom: "1.8rem", maxWidth: 360 }}>
            60+ digital art prints. Three books in production — travel photography, coloring book, print collection.
          </p>
          <Link href="/shop" style={{
            fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
            color: "rgba(255,255,255,0.28)", textDecoration: "none", textTransform: "uppercase",
            border: "1px solid rgba(255,255,255,0.1)", padding: "0.8rem 1.5rem",
            display: "inline-flex", alignItems: "center", minHeight: 44,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.28)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
            VISIT SHOP →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: mobile ? "1.8rem 1.5rem" : "1.8rem 3rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}>
        <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.14)", textTransform: "uppercase" }}>
          © 2026 ACADIA · Brooklyn, NY
        </span>
        <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.14)", textTransform: "uppercase" }}>
          acadiaberry.com
        </span>
      </footer>

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
      `}</style>
    </div>
  );
}
