import UnicornHero from "../components/UnicornHero";

export default function Motion() {
  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 2rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: "#333", textTransform: "uppercase", marginBottom: "0.5rem" }}>
          Motion · Interactive
        </p>
        <h1 style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(3rem, 10vw, 6rem)",
          fontWeight: 900, letterSpacing: "-0.03em",
          margin: "0 0 3rem", lineHeight: 0.88, textTransform: "uppercase",
        }}>MOTION</h1>
      </div>

      <UnicornHero />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 2rem 6rem" }}>
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
          <iframe
            src="https://www.youtube.com/embed/4n2MsQ2mYGv92SengCUd"
            title="Motion video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
      </div>
    </main>
  );
}
