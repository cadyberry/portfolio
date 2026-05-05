"use client";
import Link from "next/link";
import { useTheme, type Theme } from "../../theme";

// Replace these with real track URLs when available
// Format: https://soundcloud.com/47c4dy/[track-slug]
const TRACKS: { title: string; url: string | null; year: string }[] = [
  { title: "Track 1", url: null, year: "2025" },
  { title: "Track 2", url: null, year: "2025" },
  { title: "Track 3", url: null, year: "2025" },
  { title: "Track 4", url: null, year: "2025" },
  { title: "Track 5", url: null, year: "2025" },
];

const PLATFORMS = [
  { name: "SoundCloud", url: "https://soundcloud.com/47c4dy", color: "#ff5500" },
];

function colors(theme: Theme) {
  if (theme === "light") return {
    text: "#111111", dim: "rgba(17,17,17,0.68)", faint: "rgba(17,17,17,0.38)",
    accent: "#e8003d", border: "rgba(0,0,0,0.09)",
    glass: "rgba(255,255,255,0.55)", glassBorder: "rgba(0,0,0,0.08)",
    cardBg: "rgba(0,0,0,0.03)",
  };
  if (theme === "mid") return {
    text: "rgba(255,232,185,0.92)", dim: "rgba(255,210,140,0.82)", faint: "rgba(255,195,120,0.5)",
    accent: "#ffaa00", border: "rgba(180,120,255,0.18)",
    glass: "rgba(140,80,255,0.08)", glassBorder: "rgba(180,120,255,0.2)",
    cardBg: "rgba(180,120,255,0.06)",
  };
  return {
    text: "#ffffff", dim: "rgba(255,255,255,0.7)", faint: "rgba(255,255,255,0.38)",
    accent: "#ff00aa", border: "rgba(255,255,255,0.06)",
    glass: "rgba(255,255,255,0.04)", glassBorder: "rgba(255,255,255,0.1)",
    cardBg: "rgba(255,255,255,0.03)",
  };
}

export default function AudioPage() {
  const { theme } = useTheme();
  const c = colors(theme);

  return (
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "5rem", color: c.text }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 2rem 8rem" }}>

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
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.35em", color: c.faint, textTransform: "uppercase", margin: "0 0 0.7rem" }}>2025</p>
          <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 700, letterSpacing: "-0.04em", color: c.text, margin: "0 0 1rem", lineHeight: 0.95 }}>
            Audio
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: c.dim, margin: 0, lineHeight: 1.6, borderLeft: `2px solid ${c.accent}`, paddingLeft: "1.2rem", maxWidth: 520 }}>
            Original music — produced in FL Studio. Electronic, experimental, and somewhere in between.
          </p>
        </div>

        {/* SoundCloud profile embed */}
        <div style={{ marginBottom: "4rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.3em", color: c.faint, textTransform: "uppercase", margin: "0 0 1rem" }}>Profile</p>
          <iframe
            width="100%"
            height="300"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/47c4dy&color=%23ff00aa&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
            style={{ border: "none", display: "block" }}
          />
        </div>

        {/* Individual tracks */}
        <div style={{ marginBottom: "4rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.3em", color: c.faint, textTransform: "uppercase", margin: "0 0 1rem" }}>
            Tracks
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: c.border }}>
            {TRACKS.map((track, i) => (
              <div key={i} style={{ background: c.cardBg, backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", padding: "1.5rem 1.8rem" }}>
                {track.url ? (
                  <iframe
                    width="100%"
                    height="166"
                    allow="autoplay"
                    src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(track.url)}&color=%23ff00aa&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false`}
                    style={{ border: "none", display: "block", marginBottom: "0.5rem" }}
                  />
                ) : (
                  <div style={{ height: 80, display: "flex", alignItems: "center", gap: "1.5rem" }}>
                    <span style={{ fontFamily: "monospace", fontSize: "0.48rem", color: c.faint, minWidth: 24 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", fontWeight: 600, color: c.dim }}>
                      {track.title}
                    </span>
                    <span style={{ fontFamily: "monospace", fontSize: "0.42rem", color: c.faint, marginLeft: "auto", letterSpacing: "0.15em" }}>
                      Coming soon
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Platform links */}
        <div>
          <p style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.3em", color: c.faint, textTransform: "uppercase", margin: "0 0 1rem" }}>Listen on</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {PLATFORMS.map(p => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.18em",
                color: c.dim, border: `1px solid ${c.border}`,
                padding: "0.7rem 1.2rem", textDecoration: "none", textTransform: "uppercase",
                transition: "color 0.2s, border-color 0.2s", minHeight: 44, display: "inline-flex", alignItems: "center",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = c.text; (e.currentTarget as HTMLAnchorElement).style.borderColor = c.dim; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = c.dim; (e.currentTarget as HTMLAnchorElement).style.borderColor = c.border; }}>
                {p.name} →
              </a>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
