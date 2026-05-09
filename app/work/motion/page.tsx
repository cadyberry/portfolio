"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { useTheme, type Theme } from "../../theme";

function colors(theme: Theme) {
  if (theme === "light") return {
    text: "#111111", faint: "rgba(17,17,17,0.25)", dim: "rgba(17,17,17,0.5)",
    glass: "rgba(255,255,255,0.55)",
    glassBorder: "rgba(255,255,255,0.8)",
    glow: "rgba(80,0,255,0.08)",
    tag: "rgba(0,0,0,0.06)", tagBorder: "rgba(0,0,0,0.1)",
  };
  if (theme === "mid") return {
    text: "rgba(255,232,185,0.92)", faint: "rgba(255,195,120,0.35)", dim: "rgba(255,210,140,0.6)",
    glass: "rgba(20,8,50,0.45)",
    glassBorder: "rgba(180,120,255,0.25)",
    glow: "rgba(140,80,255,0.12)",
    tag: "rgba(180,120,255,0.1)", tagBorder: "rgba(180,120,255,0.2)",
  };
  return {
    text: "#ffffff", faint: "rgba(255,255,255,0.22)", dim: "rgba(255,255,255,0.5)",
    glass: "rgba(255,255,255,0.06)",
    glassBorder: "rgba(255,255,255,0.12)",
    glow: "rgba(120,80,255,0.1)",
    tag: "rgba(255,255,255,0.06)", tagBorder: "rgba(255,255,255,0.12)",
  };
}

const TAGS = ["Motion Design", "Generative Art", "CSS Animation", "Interactive"] as const;
const TOOLS = ["Unicorn Studio", "CSS animation", "Custom canvas"];

export default function MotionPage() {
  const { theme } = useTheme();
  const c = colors(theme);

  return (
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "5rem", color: c.text }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "3rem 2rem 8rem" }}>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" style={{
            fontFamily: "Special Elite, monospace", fontSize: "0.5rem", letterSpacing: "0.28em",
            color: c.faint, textDecoration: "none", textTransform: "uppercase",
            display: "inline-flex", alignItems: "center",
            marginBottom: "3.5rem", transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = c.text)}
          onMouseLeave={e => (e.currentTarget.style.color = c.faint)}>
            ← Index
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            fontFamily: "Inter, sans-serif", fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: 700, letterSpacing: "-0.04em", color: c.text,
            margin: "0 0 1.5rem", lineHeight: 0.95,
          }}
        >
          Motion &amp; Generative Visuals
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.65,
            color: c.dim, margin: "0 0 2rem", maxWidth: 540,
          }}
        >
          The work here lives between code and art — some of it is UI animation,
          some of it is generative systems that produce something different every time.
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}
        >
          {TAGS.map(tag => (
            <span key={tag} style={{
              fontFamily: "Special Elite, monospace", fontSize: "0.48rem",
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: c.dim, padding: "0.35rem 0.75rem",
              background: c.tag, border: `1px solid ${c.tagBorder}`,
              borderRadius: "4px",
            }}>
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Tools */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            background: c.glass,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${c.glassBorder}`,
            borderRadius: "12px",
            padding: "1.25rem 1.5rem",
            boxShadow: `0 8px 48px ${c.glow}`,
          }}
        >
          <span style={{
            fontFamily: "Special Elite, monospace", fontSize: "0.45rem",
            letterSpacing: "0.3em", textTransform: "uppercase", color: c.faint,
            display: "block", marginBottom: "0.75rem",
          }}>
            Built with
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem 1.5rem" }}>
            {TOOLS.map(tool => (
              <span key={tool} style={{
                fontFamily: "Inter, sans-serif", fontSize: "0.875rem",
                color: c.dim,
              }}>
                {tool}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  );
}
