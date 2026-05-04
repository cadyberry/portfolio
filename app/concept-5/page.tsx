"use client";

/**
 * CONCEPT 5: TABLOID
 *
 * Premise: You're front-page news. The homepage is a NYC tabloid broadsheet —
 * chaotic headline hierarchy, columns that don't quite line up, pull quotes
 * breaking the grid. Your art fills the "photos." The overall feel is black ink
 * on newsprint but the images are fully saturated neon.
 *
 * Typography: huge bold headline, subhed, dateline, byline, column body text.
 * Color: strictly black/white/grey for type — color only lives in the art.
 * GSAP: sections stamp in one by one, like a printing press laying down ink.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function ConceptTabloid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const blocks = rootRef.current.querySelectorAll(".stamp");
    gsap.set(blocks, { opacity: 0, y: 12 });
    gsap.to(blocks, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.2,
    });
  }, []);

  return (
    <div style={{
      background: "#000",
      minHeight: "100vh",
      color: "#e8e8e0",
      fontFamily: "Georgia, 'Times New Roman', serif",
      padding: "clamp(1rem, 4vw, 3rem)",
      paddingTop: "3rem",
      overflowX: "hidden",
    }}>
      <div ref={rootRef} style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Masthead */}
        <div className="stamp" style={{
          borderTop: "3px solid #e8e8e0",
          borderBottom: "1px solid #444",
          padding: "0.5rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "0.4rem",
        }}>
          <span style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#555" }}>
            BROOKLYN, NEW YORK
          </span>
          <span style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#555" }}>
            EST. ALWAYS
          </span>
        </div>

        {/* Name as masthead */}
        <div className="stamp" style={{
          textAlign: "center",
          borderBottom: "3px double #e8e8e0",
          paddingBottom: "0.4rem",
          marginBottom: "1rem",
        }}>
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2.8rem, 9vw, 7rem)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            lineHeight: 1,
            margin: 0,
            textTransform: "uppercase",
          }}>
            ACADIA BERRY
          </h1>
          <p style={{
            fontFamily: "monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            color: "#666",
            marginTop: "0.3rem",
          }}>DIGITAL DESIGNER · PHOTOGRAPHER · ARTIST</p>
        </div>

        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr 1fr",
          gap: "1.5rem",
          alignItems: "start",
        }}>

          {/* Col 1 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="stamp" style={{ borderTop: "1px solid #444", paddingTop: "0.5rem" }}>
              <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#555", marginBottom: "0.3rem" }}>DIGITAL ART</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/prints/print17.webp" alt="" style={{ width: "100%", display: "block", marginBottom: "0.6rem" }} />
              <p style={{ fontSize: "0.75rem", lineHeight: 1.6, color: "#999" }}>
                "Every piece starts as something broken and ends as something alive."
              </p>
            </div>
            <div className="stamp" style={{ borderTop: "1px solid #333", paddingTop: "0.5rem" }}>
              <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#555", marginBottom: "0.5rem" }}>CONNECT</p>
              {["work", "about", "photography", "contact"].map(item => (
                <a key={item} href="#" style={{
                  display: "block",
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "#666",
                  textDecoration: "none",
                  textTransform: "uppercase",
                  padding: "0.3rem 0",
                  borderBottom: "1px solid #222",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#ff00aa")}
                onMouseLeave={e => (e.currentTarget.style.color = "#666")}>
                  {item} →
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — hero */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            <div className="stamp">
              <h2 style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.4rem, 4vw, 2.8rem)",
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: "0.5rem",
                textTransform: "uppercase",
              }}>
                BROOKLYN DESIGNER REFUSES TO MAKE BORING THINGS
              </h2>
              <p style={{ fontSize: "0.8rem", color: "#777", fontStyle: "italic", marginBottom: "0.8rem" }}>
                Sources confirm the work is "unlike anything we've seen." Witnesses describe neon.
                A lot of neon.
              </p>
            </div>
            <div className="stamp" style={{ position: "relative" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/prints/print4.webp" alt="" style={{ width: "100%", display: "block" }} />
              <p style={{
                fontFamily: "monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.15em",
                color: "#444",
                marginTop: "0.3rem",
              }}>ABOVE: recent work, untitled, 2025</p>
            </div>
            <div className="stamp" style={{ borderTop: "1px solid #333", paddingTop: "0.6rem" }}>
              <p style={{ fontSize: "0.8rem", lineHeight: 1.7, color: "#888" }}>
                Six years of digital art. Acrylic to algorithm. The city is the inspiration —
                so random, yet it all works. This is that translated into pixels.
              </p>
            </div>
          </div>

          {/* Col 3 */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="stamp" style={{ borderTop: "1px solid #444", paddingTop: "0.5rem" }}>
              <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em", color: "#555", marginBottom: "0.5rem" }}>PHOTOGRAPHY</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/prints/print21.webp" alt="" style={{ width: "100%", display: "block", marginBottom: "0.5rem" }} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/prints/print31.webp" alt="" style={{ width: "100%", display: "block" }} />
            </div>
            <div className="stamp" style={{ borderTop: "1px solid #333", paddingTop: "0.5rem" }}>
              <blockquote style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                fontStyle: "italic",
                lineHeight: 1.3,
                color: "#e8e8e0",
                borderLeft: "3px solid #ff00aa",
                paddingLeft: "0.8rem",
              }}>
                "The city throws things at you. I just catch them."
              </blockquote>
            </div>
          </div>
        </div>
      </div>

      <Link href="/" style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333", textDecoration: "none" }}>← concepts</Link>
      <div style={{ position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>05 / TABLOID</div>
    </div>
  );
}
