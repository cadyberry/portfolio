"use client";
import Link from "next/link";

const TOOLS = [
  {
    name: "KALEIDOSCOPE",
    desc: "Symmetrical pattern generator. Move your mouse. Watch physics become art.",
    href: "https://spacescape.vercel.app/kaleidoscope",
    tag: "visual · generative",
    img: "/prints/print3.webp",
  },
  {
    name: "GENERATIVE ART",
    desc: "Algorithmic canvas. Every refresh is a new world that never existed before.",
    href: "https://spacescape.vercel.app/generative-art",
    tag: "visual · algorithmic",
    img: "/prints/print4.webp",
  },
  {
    name: "PIXEL EDITOR",
    desc: "Low-fi pixel art tool built from scratch. Old internet energy.",
    href: "https://spacescape.vercel.app/pixel-editor",
    tag: "visual · tool",
    img: "/prints/print5.webp",
  },
  {
    name: "GIF MAKER",
    desc: "Make animated GIFs in the browser. No installs. No sign-up. Just go.",
    href: "https://spacescape.vercel.app/gif-maker",
    tag: "animation · tool",
    img: "/prints/print21.webp",
  },
  {
    name: "WALLPAPER GENERATOR",
    desc: "Generate desktop wallpapers using generative patterns. Infinite variety.",
    href: "https://spacescape.vercel.app/wallpaper-generator",
    tag: "visual · generative",
    img: "/prints/print8.webp",
  },
  {
    name: "DIGITAL RAIN",
    desc: "Matrix-style falling code. Hypnotic. Based on the original.",
    href: "https://spacescape.vercel.app/digital-rain",
    tag: "visual · ambient",
    img: "/prints/print2.webp",
  },
  {
    name: "ASCII CONVERTER",
    desc: "Turn any image into ASCII art. Old school rendering, new school browser.",
    href: "https://spacescape.vercel.app/ascii-converter",
    tag: "image · tool",
    img: "/prints/print17.webp",
  },
  {
    name: "GALLERY WALK",
    desc: "A virtual gallery built from community-submitted art. You're the curator.",
    href: "https://spacescape.vercel.app/gallery-walk",
    tag: "community · gallery",
    img: "/prints/print11.webp",
  },
];

export default function Play() {
  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>

        <h1 style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(2.5rem, 10vw, 5rem)",
          fontWeight: 900, letterSpacing: "-0.02em",
          margin: "0 0 0.4rem", lineHeight: 0.9,
          textTransform: "uppercase",
        }}>PLAY</h1>
        <p style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.25em", color: "#333", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          free tools & games · lives on unavoide.com
        </p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "#555", lineHeight: 1.7, marginBottom: "3rem", maxWidth: 480 }}>
          I build the tools I wish existed. All of these are free, all browser-based, all made from scratch since 2018.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1px", background: "#111" }}>
          {TOOLS.map(tool => (
            <a key={tool.name} href={tool.href} target="_blank" rel="noopener noreferrer" style={{
              display: "flex", flexDirection: "column",
              background: "#000", textDecoration: "none",
              transition: "background 0.2s",
              position: "relative", overflow: "hidden",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#050505")}
            onMouseLeave={e => (e.currentTarget.style.background = "#000")}>

              {/* Image */}
              <div style={{ aspectRatio: "4/3", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={tool.img} alt="" style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: "brightness(0.5) saturate(0.6)",
                  transition: "filter 0.4s, transform 0.4s",
                }}
                onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.8) saturate(1)"; e.currentTarget.style.transform = "scale(1.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.filter = "brightness(0.5) saturate(0.6)"; e.currentTarget.style.transform = "scale(1)"; }} />
              </div>

              <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.5rem", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "0.9rem", fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "0.03em" }}>{tool.name}</h2>
                  <span style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "#333", whiteSpace: "nowrap", marginLeft: "0.5rem", letterSpacing: "0.1em" }}>↗</span>
                </div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#555", margin: 0, lineHeight: 1.6 }}>{tool.desc}</p>
                <p style={{ fontFamily: "monospace", fontSize: "0.48rem", color: "#333", margin: 0, marginTop: "auto", letterSpacing: "0.15em", textTransform: "uppercase" }}>{tool.tag}</p>
              </div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: "3rem", textAlign: "center" }}>
          <a href="https://spacescape.vercel.app" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.25em",
            color: "#333", textDecoration: "none", textTransform: "uppercase",
            border: "1px solid #1a1a1a", padding: "0.9rem 2rem",
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            transition: "all 0.2s", minHeight: 44,
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#1a1a1a"; e.currentTarget.style.color = "#333"; }}>
            VISIT UNAVOIDE.COM →
          </a>
        </div>
      </div>
    </main>
  );
}
