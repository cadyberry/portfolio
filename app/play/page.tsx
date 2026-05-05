"use client";

const TOOLS = [
  { name: "Kaleidoscope",       href: "https://unafield.vercel.app/kaleidoscope"        },
  { name: "Generative Art",     href: "https://unafield.vercel.app/generative-art"      },
  { name: "Pixel Editor",       href: "https://unafield.vercel.app/pixel-editor"        },
  { name: "GIF Maker",          href: "https://unafield.vercel.app/gif-maker"           },
  { name: "Wallpaper Generator",href: "https://unafield.vercel.app/wallpaper-generator" },
  { name: "Digital Rain",       href: "https://unafield.vercel.app/digital-rain"        },
  { name: "ASCII Converter",    href: "https://unafield.vercel.app/ascii-converter"     },
  { name: "Gallery Walk",       href: "https://unafield.vercel.app/gallery-walk"        },
];

export default function Play() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "4rem 2rem 6rem" }}>

        {/* Hero */}
        <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: "rgba(255,255,255,0.18)", textTransform: "uppercase", margin: "0 0 1rem" }}>
          Free · Browser-based · No sign-up
        </p>
        <h1 style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "clamp(3.5rem, 12vw, 7rem)",
          fontWeight: 700, letterSpacing: "-0.04em",
          margin: "0 0 1.5rem", lineHeight: 0.88, color: "#fff",
        }}>8 free<br />tools.</h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, maxWidth: 480, margin: "0 0 3rem", fontStyle: "italic" }}>
          Built from scratch since 2018. Kaleidoscopes, pixel editors, generative art, digital rain — all living on Spacescape.
        </p>

        {/* Primary CTA */}
        <a
          href="https://unafield.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: "0.8rem",
            fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.2em",
            color: "#000", background: "#fff",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            padding: "1.1rem 2rem", textDecoration: "none",
            textTransform: "uppercase", minHeight: 44,
            transition: "background 0.2s, color 0.2s",
            marginBottom: "5rem",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "#ccff00"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
        >
          OPEN SPACESCAPE ↗
        </a>

        {/* Tool list */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "0 1.5rem",
        }}>
          {TOOLS.map((tool, i) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "1rem 0.75rem",
                borderBottom: i < TOOLS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                textDecoration: "none",
                background: "rgba(255,255,255,0.04)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.08)",
                marginBottom: "0.5rem",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.5")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem" }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.45rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em" }}>{String(i + 1).padStart(2, "0")}</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 500, color: "#fff", letterSpacing: "-0.01em" }}>{tool.name}</span>
              </div>
              <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "rgba(255,255,255,0.25)" }}>↗</span>
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}
