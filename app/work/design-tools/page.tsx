"use client";
import Link from "next/link";
import { useTheme, type Theme } from "../../theme";

const TOOLS = [
  { name: "Paint",           icon: "🖌",  desc: "Freehand drawing with 8 brush types, shapes, fill, and full color palette.",                                           path: "paint" },
  { name: "Kaleidoscope",    icon: "✦",   desc: "Draw mirrored across 2–16 axes of symmetry simultaneously.",                                                           path: "kaleidoscope" },
  { name: "ASCII Art",       icon: "A>",  desc: "Drop in a photo and convert it to ASCII characters in real time.",                                                     path: "ascii-converter" },
  { name: "Generative Art",  icon: "◎",   desc: "Recursive patterns, Lissajous curves, and particle systems you can export.",                                           path: "generative-art" },
  { name: "Pixel Editor",    icon: "▪",   desc: "Grid-snapped pixel art with animation frames, sprite sheets, and GIF export.",                                         path: "pixel-editor" },
  { name: "GIF Maker",       icon: "▶",   desc: "Create animated GIFs from procedural visuals — bouncing, spirals, waves, and more.",                                   path: "gif-maker" },
  { name: "Digital Rain",    icon: "雨",   desc: "Falling Matrix-style characters with glowing trails — export as GIF or PNG.",                                          path: "digital-rain" },
  { name: "Halftone",        icon: "◉",   desc: "Convert any photo into dot-grid halftone art with custom color palettes and shapes.",                                  path: "halftone" },
  { name: "Avatar Maker",    icon: "♡",   desc: "Build a chibi avatar — eyes, hair, blush, piercings — and download as PNG.",                                          path: "avatar-maker" },
  { name: "Deep Fry",        icon: "🔥",  desc: "Oversaturate, compress, and destroy any photo — the deep-fried meme filter.",                                          path: "fried-filter" },
  { name: "Glitch Art",      icon: "▒",   desc: "Row displacement, chromatic aberration, and scan lines — classic glitch aesthetic.",                                   path: "glitch-art" },
  { name: "Dithering",       icon: "░",   desc: "Floyd-Steinberg, Atkinson, and Bayer dithering across 8 curated palettes.",                                           path: "dithering" },
  { name: "Datamosh",        icon: "▓",   desc: "Simulate video codec corruption — block drift, channel split, JPEG artifact wash.",                                    path: "datamosh" },
  { name: "Harp",            icon: "♬",   desc: "One octave of angelic harp tones. Play with your keyboard or tap.",                                                   path: "harp-piano" },
  { name: "Autotune",        icon: "𝄞",   desc: "Sing into your mic and have your pitch snapped to any scale in real time.",                                           path: "autotune" },
  { name: "Anaplasm",        icon: "⬡",   desc: "Generate anaplastic cell patterns — packed irregular nucleated blobs across 5 stain palettes.",                       path: "anaplasm" },
  { name: "Zine Builder",    icon: "▨",   desc: "Make a zine in your browser — layouts, risograph ink colors, paper textures, image uploads, and print export.",       path: "zine-builder" },
  { name: "Colorfield",      icon: "◑",   desc: "Generate color harmonies — complementary, triadic, analogous, and more. Export as CSS or JSON.",                      path: "colorfield" },
];

function colors(theme: Theme) {
  if (theme === "light") return {
    text: "#111111", dim: "rgba(17,17,17,0.68)", faint: "rgba(17,17,17,0.38)",
    accent: "#e8003d", border: "rgba(0,0,0,0.09)",
    glass: "rgba(255,255,255,0.55)", glassBorder: "rgba(0,0,0,0.08)",
    cardBg: "rgba(0,0,0,0.03)", cardHover: "rgba(0,0,0,0.06)",
    iconBg: "rgba(0,0,0,0.06)",
  };
  if (theme === "mid") return {
    text: "rgba(255,232,185,0.92)", dim: "rgba(255,210,140,0.82)", faint: "rgba(255,195,120,0.5)",
    accent: "#ffaa00", border: "rgba(180,120,255,0.18)",
    glass: "rgba(140,80,255,0.08)", glassBorder: "rgba(180,120,255,0.2)",
    cardBg: "rgba(180,120,255,0.06)", cardHover: "rgba(180,120,255,0.12)",
    iconBg: "rgba(180,120,255,0.1)",
  };
  return {
    text: "#ffffff", dim: "rgba(255,255,255,0.7)", faint: "rgba(255,255,255,0.38)",
    accent: "#ff00aa", border: "rgba(255,255,255,0.06)",
    glass: "rgba(255,255,255,0.04)", glassBorder: "rgba(255,255,255,0.1)",
    cardBg: "rgba(255,255,255,0.03)", cardHover: "rgba(255,255,255,0.07)",
    iconBg: "rgba(255,255,255,0.06)",
  };
}

export default function DesignToolsPage() {
  const { theme } = useTheme();
  const c = colors(theme);
  const base = "https://unafield.vercel.app/tools";

  return (
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "5rem", color: c.text }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 8rem" }}>

        {/* Back */}
        <Link href="/" style={{
          fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.28em",
          color: c.faint, textDecoration: "none", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center",
          marginBottom: "3rem", transition: "color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = c.text)}
        onMouseLeave={e => (e.currentTarget.style.color = c.faint)}>
          ← Index
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "1rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.35em", color: c.faint, textTransform: "uppercase", margin: "0 0 0.7rem" }}>2025</p>
          <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 700, letterSpacing: "-0.04em", color: c.text, margin: "0 0 1rem", lineHeight: 0.95 }}>
            Design Tools
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: c.dim, margin: "0 0 0.8rem", lineHeight: 1.6, borderLeft: `2px solid ${c.accent}`, paddingLeft: "1.2rem", maxWidth: 560 }}>
            Browser-based creative tools built from scratch — no install, no account, all free.
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: c.faint, margin: "1rem 0 0", lineHeight: 1.7, maxWidth: 560 }}>
            Everything here was built because the right version didn&apos;t exist yet. Runs entirely in the browser.
          </p>
        </div>

        {/* CTA to full site */}
        <div style={{ borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, padding: "1.2rem 0", marginBottom: "3rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.2em", color: c.faint, textTransform: "uppercase" }}>
            {TOOLS.length} tools · unafield.vercel.app
          </span>
          <a href="https://unafield.vercel.app/tools" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.2em",
            color: c.accent, textDecoration: "none", textTransform: "uppercase",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.6")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            Open all tools →
          </a>
        </div>

        {/* Tool grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: c.border }}>
          {TOOLS.map(tool => (
            <a
              key={tool.path}
              href={`${base}/${tool.path}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: c.cardBg,
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                padding: "1.8rem",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                transition: "background 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = c.cardHover)}
              onMouseLeave={e => (e.currentTarget.style.background = c.cardBg)}
            >
              {/* Icon */}
              <div style={{
                width: 44, height: 44,
                background: c.iconBg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.2rem",
                flexShrink: 0,
              }}>
                {tool.icon}
              </div>

              {/* Name + desc */}
              <div>
                <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", fontWeight: 600, color: c.text, margin: "0 0 0.4rem", letterSpacing: "-0.01em" }}>
                  {tool.name}
                </p>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: c.dim, margin: 0, lineHeight: 1.6 }}>
                  {tool.desc}
                </p>
              </div>

              {/* Link hint */}
              <p style={{ fontFamily: "monospace", fontSize: "0.42rem", letterSpacing: "0.18em", color: c.faint, textTransform: "uppercase", margin: 0, marginTop: "auto" }}>
                Open tool →
              </p>
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}
