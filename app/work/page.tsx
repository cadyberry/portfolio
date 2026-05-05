"use client";
import Link from "next/link";
import { useState } from "react";
import { useTheme, type Theme } from "../theme";

type Category = "all" | "branding" | "art" | "themes" | "plugins" | "templates";

function colors(theme: Theme) {
  if (theme === "light") return {
    bg: "#f9f7f4", text: "#111111", dim: "rgba(17,17,17,0.45)",
    faint: "rgba(17,17,17,0.18)", accent: "#e8003d",
    border: "rgba(0,0,0,0.12)", grid: "rgba(0,0,0,0.08)",
    btnActive: "#111111", btnActiveText: "#f9f7f4",
    btnInactive: "rgba(0,0,0,0.04)", btnInactiveText: "rgba(17,17,17,0.4)",
    btnBorder: "rgba(0,0,0,0.12)",
  };
  if (theme === "mid") return {
    bg: "#12082a", text: "rgba(255,232,185,0.92)", dim: "rgba(255,195,120,0.45)",
    faint: "rgba(255,180,80,0.16)", accent: "#ffaa00",
    border: "rgba(180,120,255,0.18)", grid: "rgba(180,120,255,0.1)",
    btnActive: "#ffaa00", btnActiveText: "#12082a",
    btnInactive: "rgba(180,120,255,0.06)", btnInactiveText: "rgba(255,195,120,0.4)",
    btnBorder: "rgba(180,120,255,0.18)",
  };
  return {
    bg: "#050508", text: "#ffffff", dim: "rgba(255,255,255,0.35)",
    faint: "rgba(255,255,255,0.12)", accent: "#ff00aa",
    border: "rgba(255,255,255,0.07)", grid: "rgba(255,255,255,0.05)",
    btnActive: "#ffffff", btnActiveText: "#050508",
    btnInactive: "rgba(255,255,255,0.04)", btnInactiveText: "rgba(255,255,255,0.35)",
    btnBorder: "rgba(255,255,255,0.1)",
  };
}

const PROJECTS = [
  { slug: "signal-fm",  cat: "branding",  label: "SIGNAL FM",  sub: "underground radio identity",   year: "2025",     tag: "Brand · Interactive",    screen: "m-signal"    },
  { slug: "vanta",      cat: "branding",  label: "VANTA",      sub: "Brooklyn nightclub",           year: "2025",     tag: "Brand · Interactive",    screen: "m-vanta"     },
  { slug: "hollow",     cat: "branding",  label: "HOLLOW",     sub: "Bushwick cold brew café",      year: "2024",     tag: "Brand · Interactive",    screen: "m-hollow"    },
  { slug: "silt",       cat: "branding",  label: "SILT",       sub: "independent fashion label",    year: "2025",     tag: "Brand · Interactive",    screen: "m-silt"      },
  { slug: "biome",      cat: "art",       label: "BIOME",      sub: "organic neon series",          year: "2024–25",  tag: "Digital Art · Series",   screen: "m-biome"     },
  { slug: "ui-packs",   cat: "themes",    label: "UI PACKS",   sub: "5 HTML/CSS theme systems",     year: "2025",     tag: "Themes · Design System", screen: "m-uipacks"   },
  { slug: "unavoide",   cat: "plugins",   label: "UNAVOIDE",   sub: "free tools & games platform",  year: "2018–now", tag: "Plugins · Dev · Ongoing", img: "/prints/print2.webp" },
  { slug: "templates",  cat: "templates", label: "TEMPLATES",  sub: "site templates",               year: "2025",     tag: "Templates · Web",        screen: "m-templates" },
];

const CATS: { id: Category; label: string }[] = [
  { id: "all",       label: "ALL"       },
  { id: "branding",  label: "BRANDING"  },
  { id: "art",       label: "ART"       },
  { id: "themes",    label: "THEMES"    },
  { id: "plugins",   label: "PLUGINS"   },
  { id: "templates", label: "TEMPLATES" },
];

export default function Work() {
  const [active, setActive] = useState<Category>("all");
  const { theme } = useTheme();
  const c = colors(theme);
  const filtered = active === "all" ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <main style={{ minHeight: "100vh", paddingTop: "6rem", paddingBottom: "4rem" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem" }}>

        <div style={{ marginBottom: "3rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
          <h1 style={{ fontFamily: "'Courier New', monospace", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, letterSpacing: "0.1em", color: c.text, margin: 0, transition: "color 0.3s" }}>
            WORK
          </h1>

          <div style={{ display: "flex", gap: "0" }}>
            {CATS.map(({ id, label }) => (
              <button key={id} onClick={() => setActive(id)} style={{
                fontFamily: "monospace",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: active === id ? c.btnActiveText : c.btnInactiveText,
                background: active === id ? c.btnActive : c.btnInactive,
                border: `1px solid ${c.btnBorder}`,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                transition: "all 0.2s",
                marginLeft: -1,
              }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1px",
          background: c.grid,
        }}>
          {filtered.map(p => (
            <Link key={p.slug} href={`/work/${p.slug}`} style={{
              display: "block",
              background: c.bg,
              textDecoration: "none",
              position: "relative",
              overflow: "hidden",
              aspectRatio: "1",
              cursor: "pointer",
              transition: "background 0.3s",
            }}>
              {p.img ? (
                <img src={p.img} alt={p.label} style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                  transition: "transform 0.6s ease, filter 0.6s ease",
                  filter: "brightness(0.6)",
                }} />
              ) : (
                <div className={p.screen} style={{ position: "absolute", inset: 0 }}>
                  <div className="screen" style={{ height: "100%" }} />
                </div>
              )}

              <div style={{
                position: "absolute", inset: 0,
                display: "flex", flexDirection: "column", justifyContent: "flex-end",
                padding: "1.5rem",
                background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 65%)",
                backdropFilter: "blur(2px)",
                WebkitBackdropFilter: "blur(2px)",
                pointerEvents: "none",
              }}>
                <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#ff00aa", marginBottom: "0.3rem" }}>{p.tag}</p>
                <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "1.1rem", fontWeight: 900, letterSpacing: "0.05em", color: "#fff", margin: 0, lineHeight: 1 }}>{p.label}</h2>
                <p style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "rgba(255,255,255,0.5)", marginTop: "0.3rem", letterSpacing: "0.05em" }}>{p.sub}</p>
              </div>

              <div style={{
                position: "absolute", top: "1rem", right: "1rem",
                fontFamily: "monospace", fontSize: "0.55rem",
                letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)",
              }}>{p.year}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
