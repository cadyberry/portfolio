"use client";
import { useState } from "react";
import { useTheme, type Theme } from "../theme";

function colors(theme: Theme) {
  if (theme === "light") return {
    bg: "#f9f7f4", text: "#111111", dim: "rgba(17,17,17,0.45)",
    faint: "rgba(17,17,17,0.18)", accent: "#e8003d",
    border: "rgba(0,0,0,0.09)",
    glass: "rgba(255,255,255,0.55)", glassBorder: "rgba(255,255,255,0.85)",
  };
  if (theme === "mid") return {
    bg: "#12082a", text: "rgba(255,232,185,0.92)", dim: "rgba(255,195,120,0.45)",
    faint: "rgba(255,180,80,0.16)", accent: "#ffaa00",
    border: "rgba(180,120,255,0.18)",
    glass: "rgba(140,80,255,0.08)", glassBorder: "rgba(180,120,255,0.2)",
  };
  return {
    bg: "#050508", text: "#ffffff", dim: "rgba(255,255,255,0.35)",
    faint: "rgba(255,255,255,0.12)", accent: "#ff00aa",
    border: "rgba(255,255,255,0.07)",
    glass: "rgba(255,255,255,0.05)", glassBorder: "rgba(255,255,255,0.12)",
  };
}

type Filter = "all" | "street" | "travel" | "abstract";

const PHOTOS = [
  { src: "/prints/print20.webp", cat: "travel",   location: "TBD", year: "2024", span: "tall"   },
  { src: "/prints/print2.webp",  cat: "abstract", location: "TBD", year: "2023", span: "wide"   },
  { src: "/prints/print4.webp",  cat: "street",   location: "NYC", year: "2024", span: "normal" },
  { src: "/prints/print8.webp",  cat: "street",   location: "NYC", year: "2023", span: "tall"   },
  { src: "/prints/print11.webp", cat: "travel",   location: "TBD", year: "2022", span: "normal" },
  { src: "/prints/print17.webp", cat: "abstract", location: "TBD", year: "2024", span: "wide"   },
  { src: "/prints/print21.webp", cat: "street",   location: "NYC", year: "2024", span: "normal" },
  { src: "/prints/print31.webp", cat: "travel",   location: "TBD", year: "2023", span: "tall"   },
  { src: "/prints/print3.webp",  cat: "abstract", location: "TBD", year: "2024", span: "normal" },
  { src: "/prints/print5.webp",  cat: "street",   location: "NYC", year: "2023", span: "wide"   },
];

const CATS: { id: Filter; label: string }[] = [
  { id: "all",      label: "ALL"      },
  { id: "street",   label: "STREET"   },
  { id: "travel",   label: "TRAVEL"   },
  { id: "abstract", label: "ABSTRACT" },
];

export default function Photographs() {
  const { theme } = useTheme();
  const c = colors(theme);
  const [active, setActive] = useState<Filter>("all");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = active === "all" ? PHOTOS : PHOTOS.filter(p => p.cat === active);

  return (
    <main style={{ minHeight: "100vh", paddingTop: "6rem", paddingBottom: "6rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: c.faint, textTransform: "uppercase", margin: "0 0 0.6rem" }}>
              Brooklyn, NY — ongoing
            </p>
            <h1 style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 700, letterSpacing: "-0.04em",
              color: c.text, margin: 0, lineHeight: 0.9,
              transition: "color 0.3s",
            }}>photographs</h1>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: 0 }}>
            {CATS.map(({ id, label }) => (
              <button key={id} onClick={() => setActive(id)} style={{
                fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.18em",
                color: active === id ? (theme === "light" ? "#f9f7f4" : c.bg) : c.dim,
                background: active === id ? c.accent : c.glass,
                border: `1px solid ${c.glassBorder}`,
                backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                padding: "0.5rem 1.1rem", cursor: "pointer",
                textTransform: "uppercase", transition: "all 0.2s",
                marginLeft: -1, minHeight: 40,
              }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Masonry grid */}
        <div style={{
          columns: "3 280px",
          columnGap: "4px",
        }}>
          {filtered.map((photo, i) => (
            <div
              key={`${photo.src}-${i}`}
              style={{
                breakInside: "avoid",
                marginBottom: "4px",
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                aspectRatio: photo.span === "tall" ? "3/4" : photo.span === "wide" ? "4/3" : "1",
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt=""
                style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                  transition: "transform 0.6s ease, filter 0.6s ease",
                  transform: hovered === i ? "scale(1.04)" : "scale(1)",
                  filter: hovered === i ? "brightness(0.75)" : "brightness(0.55)",
                }}
              />

              {/* Hover overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)",
                backdropFilter: hovered === i ? "blur(0px)" : "none",
                opacity: hovered === i ? 1 : 0,
                transition: "opacity 0.3s ease",
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                padding: "1.2rem",
                pointerEvents: "none",
              }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
                  {photo.location} · {photo.year}
                </span>
              </div>

              {/* Category tag */}
              <div style={{
                position: "absolute", top: "0.8rem", left: "0.8rem",
                fontFamily: "monospace", fontSize: "0.42rem", letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
                opacity: hovered === i ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}>{photo.cat}</div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p style={{
          fontFamily: "Georgia, serif", fontSize: "0.8rem", fontStyle: "italic",
          color: c.faint, textAlign: "center", marginTop: "4rem",
          transition: "color 0.3s",
        }}>
          shot on various cameras, various places — more added as they come
        </p>
      </div>
    </main>
  );
}
