"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme, type Theme } from "../theme";

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
  { id: "all",      label: "all"      },
  { id: "street",   label: "street"   },
  { id: "travel",   label: "travel"   },
  { id: "abstract", label: "abstract" },
];

const ITEMS = [
  { label: "six years, multiple countries" },
  { label: "street, travel, and abstract" },
  { label: "shot on whatever was closest" },
];

function palette(theme: Theme) {
  if (theme === "light") return {
    bg:      "#f8f5f0",
    text:    "#160008",
    dim:     "rgba(0,0,0,0.38)",
    border:  "rgba(0,0,0,0.08)",
    accent:  "#B80037",
    btnBg:   "#160008",
    btnText: "#f8f5f0",
  };
  if (theme === "mid") return {
    bg:      "#0e0005",
    text:    "#FFCCDB",
    dim:     "rgba(255,204,219,0.4)",
    border:  "rgba(192,176,240,0.12)",
    accent:  "#FF5286",
    btnBg:   "#FFCCDB",
    btnText: "#0e0005",
  };
  return {
    bg:      "#060002",
    text:    "#ffffff",
    dim:     "rgba(255,255,255,0.35)",
    border:  "rgba(255,255,255,0.07)",
    accent:  "#FF0550",
    btnBg:   "#ffffff",
    btnText: "#060002",
  };
}

export default function Photographs() {
  const { theme } = useTheme();
  const p = palette(theme);
  const [active, setActive] = useState<Filter>("all");
  const [hovered, setHovered] = useState<number | null>(null);

  const filtered = active === "all" ? PHOTOS : PHOTOS.filter(ph => ph.cat === active);

  return (
    <main style={{
      minHeight:     "100vh",
      background:    p.bg,
      color:         p.text,
      display:       "flex",
      flexDirection: "column",
      alignItems:    "center",
      padding:       "6rem 1.5rem 4rem",
      transition:    "background 0.3s, color 0.3s",
    }}>

      <Link href="/" style={{
        position:      "fixed",
        top:           "1.4rem",
        left:          "1.4rem",
        fontSize:      "0.55rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color:         p.dim,
        textDecoration:"none",
        transition:    "color 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = p.text)}
      onMouseLeave={e => (e.currentTarget.style.color = p.dim)}
      >
        <span style={{color:"#caff3a"}}>←</span> back
      </Link>

      <div style={{ maxWidth: 480, width: "100%" }}>

        <p style={{
          fontSize:      "0.55rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         p.dim,
          marginBottom:  "0.6rem",
        }}>
          photographs / brooklyn
        </p>

        <h1 style={{
          fontSize:      "clamp(1.6rem, 6vw, 2.4rem)",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          lineHeight:    1.1,
          marginBottom:  "1.8rem",
        }}>
          what I've shot
        </h1>

        <ul style={{
          listStyle:     "none",
          padding:       0,
          margin:        "0 0 2rem",
          display:       "flex",
          flexDirection: "column",
          gap:           "0.75rem",
        }}>
          {ITEMS.map((item, i) => (
            <li key={i} style={{
              display:    "flex",
              alignItems: "baseline",
              gap:        "0.75rem",
              fontSize:   "clamp(0.85rem, 3vw, 1rem)",
              lineHeight: 1.55,
              color:      p.text,
            }}>
              <span style={{
                flexShrink:  0,
                width:       6,
                height:      6,
                borderRadius:"50%",
                background:  p.accent,
                marginTop:   "0.45em",
                display:     "inline-block",
              }}/>
              {item.label}
            </li>
          ))}
        </ul>

        <div style={{ borderTop: `1px solid ${p.border}`, marginBottom: "2rem" }}/>

        {/* filter row */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2.4rem" }}>
          {CATS.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              style={{
                padding:       "0.55rem 1.2rem",
                background:    active === id ? p.btnBg : "transparent",
                color:         active === id ? p.btnText : p.dim,
                fontSize:      "0.72rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                border:        `1px solid ${active === id ? p.btnBg : p.border}`,
                borderRadius:  "10px",
                cursor:        "pointer",
                fontFamily:    "'Violet Sans', sans-serif",
                transition:    "all 0.2s",
              }}
              onMouseEnter={e => { if (active !== id) e.currentTarget.style.color = p.text; }}
              onMouseLeave={e => { if (active !== id) e.currentTarget.style.color = p.dim; }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* photo grid */}
      <div style={{
        width:     "100%",
        maxWidth:  960,
        columns:   "3 240px",
        columnGap: "4px",
      }}>
        {filtered.map((photo, i) => (
          <div
            key={`${photo.src}-${i}`}
            style={{
              breakInside: "avoid",
              marginBottom: "4px",
              position:    "relative",
              overflow:    "hidden",
              cursor:      "pointer",
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
                width:      "100%",
                height:     "100%",
                objectFit:  "cover",
                display:    "block",
                transition: "transform 0.5s ease",
                transform:  hovered === i ? "scale(1.04)" : "scale(1)",
              }}
            />

            <div style={{
              position:   "absolute",
              inset:      0,
              background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)",
              opacity:    hovered === i ? 1 : 0,
              transition: "opacity 0.3s ease",
              display:    "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding:    "1rem",
              pointerEvents: "none",
            }}>
              <span style={{
                fontSize:      "0.48rem",
                letterSpacing: "0.25em",
                color:         "rgba(255,255,255,0.55)",
                textTransform: "uppercase",
                fontFamily:    "monospace",
              }}>
                {photo.location} · {photo.year}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p style={{
        fontSize:   "0.75rem",
        fontStyle:  "italic",
        color:      p.dim,
        marginTop:  "3rem",
        textAlign:  "center",
        transition: "color 0.3s",
      }}>
        more added as they come
      </p>
    </main>
  );
}
