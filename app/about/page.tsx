import Link from "next/link";

export default function About() {
  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(3rem, 12vw, 6rem)",
          fontWeight: 900, letterSpacing: "-0.02em",
          color: "#fff", margin: "0 0 0.5rem", lineHeight: 0.9,
          textTransform: "uppercase",
        }}>ACADIA</h1>
        <p style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: "#333", textTransform: "uppercase", marginBottom: "3rem" }}>
          brooklyn, ny · originally from connecticut
        </p>

        {/* Tagline */}
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(1.1rem, 3.5vw, 1.5rem)",
          lineHeight: 1.6, color: "#ccc",
          fontStyle: "italic",
          borderLeft: "2px solid #ff00aa",
          paddingLeft: "1.2rem",
          marginBottom: "3rem",
        }}>
          "Appreciator of life. I notice things. I make things. Sometimes they're the same thing."
        </p>

        {/* Bio sections */}
        {[
          {
            heading: "THE PERSON",
            body: `Grew up in Connecticut. Made it to Brooklyn. The city has been the education — the randomness of it, the contradictions, the way a single block holds a bodega, a gallery, a construction site, a mural, and the best food you've ever had. All of that goes into the work.

Started with acrylic and resin. Switched to digital when I realized the canvas didn't have to stop at the edge of the frame. Six years in, the work is neon and biomorphic and psychedelic and unlike anything else. That's intentional.`,
          },
          {
            heading: "THE WORK",
            body: `Digital art. UI design. Creative direction. Photography. I build brands that have a heartbeat and websites that feel like places. I also build tools — actual software — because the tools that exist are never strange enough.

The AI and data science background isn't separate from the creative work. It's why I can go from concept to shipped product. I've built AI agents, clinical chatbots, and document intelligence systems at scale. Then I come home and make neon prints.`,
          },
          {
            heading: "THE PROJECTS",
            body: `unavoide.com has been running since 2018 — a free tools and games platform built from scratch. Kaleidoscope, pixel editor, generative art, digital rain, GIF maker — all live, all free.

Prism is a social app for sharing art made with creative tools. Currently building.

Spacescape is a generative space art environment. Also in progress.

Three books in the works: a travel photography collection, a coloring book, and a prints collection.`,
          },
          {
            heading: "AVAILABLE FOR",
            body: `UI design · Creative direction · Website design & development · Brand identity · Digital art commissions · Photography · Generative AI consulting · Speaking`,
          },
        ].map(({ heading, body }) => (
          <div key={heading} style={{ marginBottom: "2.5rem" }}>
            <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "0.8rem" }}>
              {heading}
            </p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.85rem, 2.5vw, 0.95rem)", lineHeight: 1.85, color: "#999", whiteSpace: "pre-line" }}>
              {body}
            </p>
          </div>
        ))}

        {/* Education — brief */}
        <div style={{ borderTop: "1px solid #111", paddingTop: "2rem", marginTop: "1rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "#333", textTransform: "uppercase", marginBottom: "1rem" }}>EDUCATION</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {[
              { degree: "M.S. Data Science", school: "Central Connecticut State University", year: "2023" },
              { degree: "B.A. Psychological Science", school: "Central Connecticut State University", year: "2021" },
            ].map(e => (
              <div key={e.degree} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#555" }}>{e.degree}</span>
                  <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#333", marginLeft: "0.8rem" }}>{e.school}</span>
                </div>
                <span style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#333" }}>{e.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/contact" style={{
            fontFamily: "monospace", fontSize: "0.65rem",
            letterSpacing: "0.2em", color: "#000",
            background: "#fff", border: "none",
            padding: "0.9rem 1.8rem",
            textDecoration: "none",
            textTransform: "uppercase",
            minHeight: 44, display: "flex", alignItems: "center",
          }}>HIRE ME</Link>
          <Link href="/work" style={{
            fontFamily: "monospace", fontSize: "0.65rem",
            letterSpacing: "0.2em", color: "#555",
            background: "transparent", border: "1px solid #222",
            padding: "0.9rem 1.8rem",
            textDecoration: "none",
            textTransform: "uppercase",
            display: "flex", alignItems: "center",
            minHeight: 44,
          }}>SEE THE WORK</Link>
        </div>
      </div>
    </main>
  );
}
