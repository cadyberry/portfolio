"use client";

/**
 * CONCEPT 10: MANIFESTO
 *
 * Premise: The page is a wall of text — your creative manifesto, dense and
 * unapologetic, in tiny monospace. The kind of thing you read on a zine or
 * a flyer stapled to a Brooklyn telephone pole. As you scroll (or it auto-scrolls
 * slowly), your art materializes in the background at full bleed, slowly cycling.
 * Your name is printed once, at the top, massive. Everything else is body text.
 * There are no images except as background. The writing IS the design.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const MANIFESTO = `I make things that shouldn't exist but do.

Digital art is just paint that moves. Photography is just the city
talking back to you. Design is just honesty with a grid. I've been
doing all three since before I knew they had names.

Brooklyn raised me on contradictions. A bodega next to a gallery next
to a construction site that'll be a condo in six months. I took notes.
The randomness isn't chaos — it's a system you haven't decoded yet.
My work is me trying to decode it.

Started with acrylic and resin. Switched to pixels when I realized
the canvas didn't have to stop at the edge of a frame. Now the frame
is the screen, the window, the projection, whatever. I don't care
about medium. I care about whether it hits.

I build my own tools because the tools that exist aren't strange enough.
I make prints because I want to hold the thing. I take photographs
because sometimes the city hands you something perfect for exactly
one second and you have to catch it.

This is all the same project. The categories are for other people.

The work is here. Look at it.

— A.B.

────────────────────────────────

Digital art. Photography. Branding. Tools. Brooklyn, New York.
All inquiries welcome. Response not guaranteed.`;

const BG_PRINTS = [
  "/prints/print4.webp",
  "/prints/print20.webp",
  "/prints/print8.webp",
  "/prints/print11.webp",
];

export default function ConceptManifesto() {
  const textRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [bgIdx, setBgIdx] = useState(0);

  useEffect(() => {
    gsap.from(textRef.current, { opacity: 0, duration: 1.5, ease: "power2.out" });
    gsap.from(navRef.current, { opacity: 0, duration: 1, delay: 1 });

    // Cycle background prints
    const interval = setInterval(() => {
      setBgIdx(i => (i + 1) % BG_PRINTS.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      background: "#000",
      overflow: "hidden",
    }}>

      {/* Cycling art background */}
      {BG_PRINTS.map((src, i) => (
        <div key={src} style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: i === bgIdx ? 0.09 : 0,
          transition: "opacity 3s ease",
          mixBlendMode: "screen",
          zIndex: 0,
        }} />
      ))}

      {/* Grain overlay */}
      <div style={{
        position: "fixed",
        inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        opacity: 0.4,
        zIndex: 1,
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div ref={textRef} style={{
        position: "relative",
        zIndex: 10,
        padding: "clamp(2rem, 6vw, 5rem)",
        paddingTop: "3rem",
        maxWidth: 680,
        margin: "0 auto",
      }}>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "clamp(2rem, 7vw, 5rem)",
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: "#fff",
          marginBottom: "3rem",
          lineHeight: 1,
          textTransform: "uppercase",
        }}>
          ACADIA<br />BERRY
        </h1>

        {/* Manifesto body */}
        <div style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "clamp(0.7rem, 1.4vw, 0.82rem)",
          lineHeight: 2,
          color: "#888",
          whiteSpace: "pre-wrap",
          letterSpacing: "0.02em",
        }}>
          {MANIFESTO}
        </div>

        {/* Nav embedded at bottom of text */}
        <nav ref={navRef} style={{
          marginTop: "3rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #222",
          display: "flex",
          gap: "2rem",
          flexWrap: "wrap",
        }}>
          {["work", "about", "photography", "contact"].map(item => (
            <a key={item} href="#" style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "#444",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ff00aa")}
            onMouseLeave={e => (e.currentTarget.style.color = "#444")}>
              {item} →
            </a>
          ))}
        </nav>

        <div style={{ height: "4rem" }} />
      </div>

      <Link href="/" style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333", textDecoration: "none" }}>← concepts</Link>
      <div style={{ position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>10 / MANIFESTO</div>
    </div>
  );
}
