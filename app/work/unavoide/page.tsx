import Link from "next/link";

const TOOLS = [
  { name: "KALEIDOSCOPE",        tag: "Visual · Generative",  year: "2018", desc: "The first tool. Symmetrical pattern generation driven by mouse movement. 2M+ sessions." },
  { name: "PIXEL EDITOR",        tag: "Visual · Tool",        year: "2019", desc: "A pixel art editor built from scratch. No canvas library. 256×256 grid, 32-color palette." },
  { name: "GENERATIVE ART",      tag: "Visual · Algorithmic", year: "2020", desc: "Parameterized canvas paintings. Every refresh unique. Built in p5.js before switching to raw canvas." },
  { name: "DIGITAL RAIN",        tag: "Visual · Ambient",     year: "2021", desc: "Matrix-style falling code. Accurate to the original. Used as a screensaver by people I've never met." },
  { name: "ASCII CONVERTER",     tag: "Image · Tool",         year: "2022", desc: "Convert any image to ASCII art in the browser. 70 character densities. No upload required." },
  { name: "GIF MAKER",           tag: "Animation · Tool",     year: "2022", desc: "Frame-by-frame GIF creation. Export to actual .gif. Nothing else like it in the browser." },
  { name: "WALLPAPER GENERATOR", tag: "Visual · Generative",  year: "2023", desc: "Desktop wallpapers from generative patterns. 4K export. Infinite variety." },
  { name: "GALLERY WALK",        tag: "Community · Gallery",  year: "2024", desc: "A virtual gallery of community-submitted art. Browse, rotate, zoom. You're the curator." },
];

const STATS = [
  { label: "TOOLS LIVE",     val: "8" },
  { label: "YEARS RUNNING",  val: "7" },
  { label: "BUILT FROM",     val: "SCRATCH" },
  { label: "COST TO USER",   val: "$0" },
];

export default function Unavoide() {
  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 6rem" }}>

        <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: "#333", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Design · Development · Ongoing · 2018–present
        </p>
        <h1 style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(3rem, 10vw, 6rem)",
          fontWeight: 900, letterSpacing: "-0.03em",
          margin: "0 0 0.6rem", lineHeight: 0.88, textTransform: "uppercase",
        }}>UNAVOIDE</h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.85rem, 2.5vw, 1rem)", color: "#444", maxWidth: 540, lineHeight: 1.8, marginBottom: "4rem", fontStyle: "italic" }}>
          A free tools and games platform running since 2018. Eight interactive experiences built from scratch — no frameworks where they didn't fit, no dependencies for show. Just tools I wished existed.
        </p>

        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(140px, 100%), 1fr))", gap: "1px", background: "#111", marginBottom: "4rem" }}>
          {STATS.map(s => (
            <div key={s.label} style={{ background: "#000", padding: "1.5rem", textAlign: "center" }}>
              <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.2rem, 4vw, 2rem)", fontWeight: 900, color: "#fff", margin: "0 0 0.3rem", letterSpacing: "-0.02em" }}>{s.val}</p>
              <p style={{ fontFamily: "monospace", fontSize: "0.45rem", color: "#333", letterSpacing: "0.2em", textTransform: "uppercase", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tool list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#111" }}>
          {TOOLS.map((tool, i) => (
            <div key={tool.name} style={{
              background: "#000", padding: "1.2rem 1.5rem",
              display: "grid", gridTemplateColumns: "auto 1fr auto",
              gap: "1.5rem", alignItems: "center",
            }}>
              <span style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "#222", letterSpacing: "0.1em" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "0.9rem", fontWeight: 900, color: "#fff", margin: "0 0 0.2rem", letterSpacing: "0.02em" }}>{tool.name}</p>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.72rem", color: "#444", margin: 0, lineHeight: 1.5 }}>{tool.desc}</p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p style={{ fontFamily: "monospace", fontSize: "0.45rem", color: "#333", letterSpacing: "0.15em", margin: "0 0 0.2rem", textTransform: "uppercase" }}>{tool.tag}</p>
                <p style={{ fontFamily: "monospace", fontSize: "0.45rem", color: "#222", margin: 0 }}>{tool.year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Statement */}
        <div style={{ borderTop: "1px solid #111", marginTop: "4rem", paddingTop: "2.5rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "0.8rem" }}>THE APPROACH</p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.88rem", color: "#555", lineHeight: 1.85, maxWidth: 620 }}>
            Every tool on unavoide was built because the existing options were either too commercial, too limited, or too dull. Starting from a blank canvas file and ending with something someone in another country uses daily — that's the loop. No ads. No signups. No monetization. Just the work.
          </p>
        </div>

        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <a href="https://unavoide.com" target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em",
            color: "#000", background: "#fff", textDecoration: "none",
            padding: "0.9rem 1.8rem", textTransform: "uppercase",
            display: "inline-flex", alignItems: "center", minHeight: 44,
          }}>VISIT UNAVOIDE.COM →</a>
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
