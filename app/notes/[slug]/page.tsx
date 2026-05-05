"use client";
import Link from "next/link";
import { useTheme, type Theme } from "../../theme";
import { NOTES, type NoteBlock } from "../../lib/notes";
import { notFound } from "next/navigation";
import { use } from "react";

function colors(theme: Theme) {
  if (theme === "light") return {
    text: "#111111", dim: "rgba(17,17,17,0.68)", faint: "rgba(17,17,17,0.35)",
    accent: "#e8003d", border: "rgba(0,0,0,0.09)", glass: "rgba(255,255,255,0.55)",
    glassBorder: "rgba(0,0,0,0.08)",
  };
  if (theme === "mid") return {
    text: "rgba(255,232,185,0.92)", dim: "rgba(255,210,140,0.82)", faint: "rgba(255,195,120,0.5)",
    accent: "#ffaa00", border: "rgba(180,120,255,0.18)", glass: "rgba(140,80,255,0.08)",
    glassBorder: "rgba(180,120,255,0.2)",
  };
  return {
    text: "#ffffff", dim: "rgba(255,255,255,0.7)", faint: "rgba(255,255,255,0.38)",
    accent: "#ff00aa", border: "rgba(255,255,255,0.06)", glass: "rgba(255,255,255,0.04)",
    glassBorder: "rgba(255,255,255,0.1)",
  };
}

function Block({ block, c }: { block: NoteBlock; c: ReturnType<typeof colors> }) {
  if (block.type === "p") {
    return (
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.85, color: c.dim, margin: "0 0 1.5rem" }}>
        {block.text}
      </p>
    );
  }

  if (block.type === "signoff") {
    return (
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "1rem", lineHeight: 1.85, color: c.dim, margin: "2.5rem 0 0", fontStyle: "italic" }}>
        {block.text}
      </p>
    );
  }

  if (block.type === "section") {
    return (
      <div style={{ margin: "2.5rem 0" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.32em", color: c.accent, textTransform: "uppercase", margin: "0 0 1.5rem" }}>
          {block.title}
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {block.items.map((item, i) => (
            <div key={i} style={{
              padding: "1.4rem 0",
              borderTop: `1px solid ${c.border}`,
              borderBottom: i === block.items.length - 1 ? `1px solid ${c.border}` : "none",
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              gap: "2rem",
              alignItems: "start",
            }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.85rem", fontWeight: 600, color: c.text, margin: 0, letterSpacing: "-0.01em", lineHeight: 1.4 }}>
                {item.name}
              </p>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.88rem", color: c.dim, margin: 0, lineHeight: 1.75 }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export default function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const note = NOTES.find(n => n.slug === slug);
  if (!note) notFound();

  const { theme } = useTheme();
  const c = colors(theme);

  return (
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "5rem", color: c.text }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "3rem 2rem 8rem" }}>

        <Link href="/notes" style={{
          fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.28em",
          color: c.faint, textDecoration: "none", textTransform: "uppercase",
          display: "inline-flex", alignItems: "center", gap: "0.4rem",
          marginBottom: "3rem", transition: "color 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = c.text)}
        onMouseLeave={e => (e.currentTarget.style.color = c.faint)}>
          ← All notes
        </Link>

        <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: c.faint, textTransform: "uppercase", margin: "0 0 0.8rem" }}>
          {note.date}
        </p>
        <h1 style={{
          fontFamily: "Inter, sans-serif", fontSize: "clamp(2rem, 6vw, 3.5rem)",
          fontWeight: 700, letterSpacing: "-0.04em", color: c.text,
          margin: "0 0 3rem", lineHeight: 1,
        }}>
          {note.title}
        </h1>

        <div style={{ borderTop: `1px solid ${c.border}`, paddingTop: "2.5rem" }}>
          {note.blocks.map((block, i) => (
            <Block key={i} block={block} c={c} />
          ))}
        </div>

        <div style={{ marginTop: "4rem", paddingTop: "2rem", borderTop: `1px solid ${c.border}` }}>
          <Link href="/notes" style={{
            fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.28em",
            color: c.faint, textDecoration: "none", textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = c.text)}
          onMouseLeave={e => (e.currentTarget.style.color = c.faint)}>
            ← Back to all notes
          </Link>
        </div>

      </div>
    </main>
  );
}
