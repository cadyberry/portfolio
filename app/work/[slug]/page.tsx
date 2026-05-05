"use client";
import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { useTheme, type Theme } from "../../theme";
import { getProject } from "../../lib/projects";

function colors(theme: Theme) {
  if (theme === "light") return {
    text: "#111111", dim: "rgba(17,17,17,0.68)", faint: "rgba(17,17,17,0.38)",
    accent: "#e8003d", border: "rgba(0,0,0,0.09)",
    glass: "rgba(255,255,255,0.55)", glassBorder: "rgba(0,0,0,0.08)",
    ctaBg: "#111111", ctaText: "#ffffff",
  };
  if (theme === "mid") return {
    text: "rgba(255,232,185,0.92)", dim: "rgba(255,210,140,0.82)", faint: "rgba(255,195,120,0.5)",
    accent: "#ffaa00", border: "rgba(180,120,255,0.18)",
    glass: "rgba(140,80,255,0.08)", glassBorder: "rgba(180,120,255,0.2)",
    ctaBg: "#ffaa00", ctaText: "#12082a",
  };
  return {
    text: "#ffffff", dim: "rgba(255,255,255,0.7)", faint: "rgba(255,255,255,0.38)",
    accent: "#ff00aa", border: "rgba(255,255,255,0.06)",
    glass: "rgba(255,255,255,0.04)", glassBorder: "rgba(255,255,255,0.1)",
    ctaBg: "#ffffff", ctaText: "#050508",
  };
}

export default function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const project = getProject(slug);
  if (!project) notFound();

  const { theme } = useTheme();
  const c = colors(theme);

  return (
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "5rem", color: c.text }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 2rem 8rem" }}>

        {/* Back */}
        <Link href="/" style={{
          fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.28em",
          color: c.faint, textDecoration: "none", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          marginBottom: "3rem", transition: "color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = c.text)}
        onMouseLeave={e => (e.currentTarget.style.color = c.faint)}>
          ← Index
        </Link>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.35em", color: c.faint, textTransform: "uppercase", margin: "0 0 0.7rem" }}>
            {project.year}
          </p>
          <h1 style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 700, letterSpacing: "-0.04em",
            color: c.text, margin: "0 0 1rem", lineHeight: 0.95,
          }}>
            {project.name}
          </h1>
          <p style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
            color: c.dim, margin: 0, lineHeight: 1.6,
            borderLeft: `2px solid ${c.accent}`,
            paddingLeft: "1.2rem",
            maxWidth: 560,
          }}>
            {project.tagline}
          </p>
        </div>

        {/* Body */}
        <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "2.5rem", marginBottom: "3.5rem" }}>
          {project.description.map((para, i) => (
            <p key={i} style={{
              fontFamily: "Georgia, serif", fontSize: "1rem",
              lineHeight: 1.85, color: c.dim, margin: "0 0 1.4rem",
            }}>
              {para}
            </p>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "3.5rem" }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.12em",
              color: c.faint, border: `1px solid ${c.border}`,
              padding: "0.35rem 0.7rem", textTransform: "uppercase",
            }}>{tag}</span>
          ))}
        </div>

        {/* CTA card */}
        {project.cta && (
          <div style={{
            background: c.glass,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${c.glassBorder}`,
            padding: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
          }}>
            <div>
              <p style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.3em", color: c.faint, textTransform: "uppercase", margin: "0 0 0.4rem" }}>
                External
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 600, color: c.text, margin: 0 }}>
                {project.cta.href.replace("https://", "")}
              </p>
            </div>
            <a
              href={project.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
                color: c.ctaText, background: c.ctaBg,
                padding: "0.9rem 1.8rem", textDecoration: "none",
                textTransform: "uppercase", display: "inline-flex", alignItems: "center",
                minHeight: 44, transition: "opacity 0.2s", whiteSpace: "nowrap",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {project.cta.label} →
            </a>
          </div>
        )}

        {/* No CTA — coming soon */}
        {!project.cta && (
          <div style={{
            background: c.glass,
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${c.glassBorder}`,
            padding: "2.5rem",
          }}>
            <p style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.3em", color: c.faint, textTransform: "uppercase", margin: "0 0 0.4rem" }}>
              Status
            </p>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", fontWeight: 600, color: c.text, margin: 0 }}>
              Coming soon
            </p>
          </div>
        )}

      </div>
    </main>
  );
}
