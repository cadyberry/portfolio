"use client";

/**
 * CONCEPT 13: LEFTOVERS
 *
 * Inspired by: The "Leftovers" text animation from The Leftovers title sequence,
 * implemented in Joffrey Spitzer's portfolio (Codrops Feb 2026).
 *
 * Premise: Your name cycles through labels. "ACADIA BERRY" → "DIGITAL DESIGNER"
 * → "PHOTOGRAPHER" → "BROOKLYN, NY" → "ARTIST" → back.
 * Characters that EXIST in both strings don't disappear — they physically travel
 * from their old position to their new position. Unique chars fade out/in.
 * The result: letters migrate across the screen like people switching seats.
 * Mesmerizing. Nothing else on the page — just this, and a slowly cycling art bg.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

const LABELS = [
  "ACADIA BERRY",
  "DIGITAL DESIGNER",
  "PHOTOGRAPHER",
  "BROOKLYN NY",
  "VISUAL ARTIST",
  "UNAVOIDE",
];

const BG_PRINTS = ["/prints/print11.webp", "/prints/print3.webp", "/prints/print8.webp"];

type CharSpan = {
  char: string;
  el: HTMLSpanElement;
  idx: number;
};

export default function ConceptLeftovers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bgIdx, setBgIdx] = useState(0);
  const labelIdxRef = useRef(0);
  const isAnimating = useRef(false);
  const spansRef = useRef<CharSpan[]>([]);
  const navRef = useRef<HTMLElement>(null);

  const buildSpans = useCallback((text: string) => {
    const container = containerRef.current;
    if (!container) return;
    container.innerHTML = "";
    spansRef.current = [];

    // Wrapper for centering measurement
    const wrapper = document.createElement("div");
    wrapper.style.cssText = `display:inline-flex; gap:0;`;
    container.appendChild(wrapper);

    text.split("").forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? " " : char;
      span.style.cssText = `
        display: inline-block;
        font-family: 'Arial Black', Arial, sans-serif;
        font-size: clamp(2rem, 6vw, 5rem);
        font-weight: 900;
        letter-spacing: 0.05em;
        color: #fff;
        text-transform: uppercase;
        position: relative;
        white-space: pre;
      `;
      wrapper.appendChild(span);
      spansRef.current.push({ char: char === " " ? " " : char, el: span, idx: i });
    });
  }, []);

  const morph = useCallback((nextText: string) => {
    if (isAnimating.current || !containerRef.current) return;
    isAnimating.current = true;

    const currentSpans = [...spansRef.current];
    const nextChars = nextText.split("");

    // Get current positions
    const currentRects = currentSpans.map(s => s.el.getBoundingClientRect());

    // Measure next layout by temporarily building it offscreen
    const ghost = document.createElement("div");
    ghost.style.cssText = `
      position: fixed; top: -9999px; left: 50%;
      transform: translateX(-50%);
      display: flex; gap: 0; visibility: hidden;
    `;
    document.body.appendChild(ghost);

    const ghostSpans: HTMLSpanElement[] = nextChars.map(char => {
      const s = document.createElement("span");
      s.textContent = char === " " ? " " : char;
      s.style.cssText = `
        display: inline-block;
        font-family: 'Arial Black', Arial, sans-serif;
        font-size: clamp(2rem, 6vw, 5rem);
        font-weight: 900;
        letter-spacing: 0.05em;
        white-space: pre;
      `;
      ghost.appendChild(s);
      return s;
    });

    // Force layout
    ghost.getBoundingClientRect();
    const nextRects = ghostSpans.map(s => s.getBoundingClientRect());
    document.body.removeChild(ghost);

    // Match characters: greedy — for each next char, find first unused current char that matches
    const usedCurrent = new Set<number>();
    const matches: { currentIdx: number; nextIdx: number }[] = [];

    nextChars.forEach((char, ni) => {
      if (char === " ") return;
      const match = currentSpans.findIndex((s, ci) =>
        !usedCurrent.has(ci) && s.char.toUpperCase() === char.toUpperCase()
      );
      if (match !== -1) {
        usedCurrent.add(match);
        matches.push({ currentIdx: match, nextIdx: ni });
      }
    });

    const matchedCurrent = new Set(matches.map(m => m.currentIdx));

    // Fade out unmatched current chars
    currentSpans.forEach((s, ci) => {
      if (!matchedCurrent.has(ci)) {
        gsap.to(s.el, { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" });
      }
    });

    // Animate matched chars to new positions (using fixed positioning trick)
    const flying: HTMLSpanElement[] = [];
    matches.forEach(({ currentIdx, nextIdx }) => {
      const fromRect = currentRects[currentIdx];
      const toRect = nextRects[nextIdx];
      const el = currentSpans[currentIdx].el;

      // Clone to body at current position
      const clone = el.cloneNode(true) as HTMLSpanElement;
      clone.style.cssText += `
        position: fixed;
        top: ${fromRect.top}px;
        left: ${fromRect.left}px;
        margin: 0; padding: 0;
        z-index: 100;
      `;
      document.body.appendChild(clone);
      flying.push(clone);

      gsap.to(clone, {
        top: toRect.top,
        left: toRect.left,
        duration: 0.65,
        delay: Math.random() * 0.15,
        ease: "power3.inOut",
        onComplete: () => document.body.removeChild(clone),
      });

      gsap.to(el, { opacity: 0, duration: 0 });
    });

    // After animation, rebuild with next text
    setTimeout(() => {
      buildSpans(nextText);
      // Fade in new unique chars
      spansRef.current.forEach((s, i) => {
        const isMatched = matches.some(m => m.nextIdx === i);
        if (!isMatched) {
          gsap.from(s.el, { opacity: 0, y: 20, duration: 0.3, delay: 0.1, ease: "power2.out" });
        }
      });
      isAnimating.current = false;
    }, 800);
  }, [buildSpans]);

  useEffect(() => {
    buildSpans(LABELS[0]);
    gsap.from(navRef.current, { opacity: 0, duration: 1, delay: 1 });

    // Cycle bg
    const bgInterval = setInterval(() => {
      setBgIdx(i => (i + 1) % BG_PRINTS.length);
    }, 4000);

    // Cycle labels
    const labelInterval = setInterval(() => {
      labelIdxRef.current = (labelIdxRef.current + 1) % LABELS.length;
      morph(LABELS[labelIdxRef.current]);
    }, 2400);

    return () => {
      clearInterval(bgInterval);
      clearInterval(labelInterval);
    };
  }, [buildSpans, morph]);

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      background: "#000",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>

      {/* Cycling bg */}
      {BG_PRINTS.map((src, i) => (
        <div key={src} style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: i === bgIdx ? 0.08 : 0,
          transition: "opacity 2s ease",
          mixBlendMode: "screen",
        }} />
      ))}

      {/* Text stage */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        zIndex: 10,
      }}>
        <div
          ref={containerRef}
          style={{
            minHeight: "6rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.35em",
          color: "#333",
          textTransform: "uppercase",
        }}>brooklyn, ny</p>
      </div>

      <nav ref={navRef} style={{
        position: "absolute",
        bottom: "2.5rem",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: "2.5rem",
        zIndex: 10,
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
            {item}
          </a>
        ))}
      </nav>

      <Link href="/" style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333", textDecoration: "none" }}>← concepts</Link>
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>13 / LEFTOVERS</div>
    </div>
  );
}
