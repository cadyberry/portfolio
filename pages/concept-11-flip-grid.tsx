"use client";

/**
 * CONCEPT 11: FLIP GRID
 *
 * Inspired by: GSAP FLIP technique (Joffrey Spitzer portfolio, Codrops 2026)
 *
 * Premise: Your art laid out in a tight 3×3 grid, each piece a perfect square.
 * Click any piece — it FLIP-animates from its grid cell to fill the entire
 * viewport, while all other pieces scatter off-screen. Name + nav appear
 * in the expanded state. Click again — everything FLIP-animates back.
 * The transition is smooth, physics-based (elastic ease). It feels like
 * the grid is alive and breathing.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";

const PRINTS = [
  "/prints/print2.webp",
  "/prints/print3.webp",
  "/prints/print4.webp",
  "/prints/print5.webp",
  "/prints/print8.webp",
  "/prints/print11.webp",
  "/prints/print17.webp",
  "/prints/print20.webp",
  "/prints/print21.webp",
];

export default function ConceptFlip() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const isAnimating = useRef(false);

  const handleClick = useCallback((idx: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    if (expanded !== null) {
      // Collapse back to grid
      const el = itemRefs.current[expanded];
      if (!el) return;

      // Fade out name/nav
      gsap.to([nameRef.current, navRef.current], { opacity: 0, duration: 0.2 });

      // Shrink expanded item back
      gsap.to(el, {
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        position: "relative",
        duration: 0.6,
        ease: "power3.inOut",
        onComplete: () => {
          setExpanded(null);
          // Fly other items back in
          itemRefs.current.forEach((item, i) => {
            if (i !== expanded && item) {
              gsap.to(item, { opacity: 1, scale: 1, duration: 0.4, delay: i * 0.04, ease: "back.out(1.5)" });
            }
          });
          isAnimating.current = false;
        },
      });
      return;
    }

    // Expand clicked item
    const el = itemRefs.current[idx];
    if (!el) return;

    const rect = el.getBoundingClientRect();

    // Scatter others
    itemRefs.current.forEach((item, i) => {
      if (i !== idx && item) {
        const angle = (Math.random() - 0.5) * 60;
        const dist = 150 + Math.random() * 100;
        gsap.to(item, {
          opacity: 0,
          scale: 0.6,
          x: (Math.random() - 0.5) * dist,
          y: (Math.random() - 0.5) * dist,
          rotation: angle,
          duration: 0.5,
          ease: "power2.in",
        });
      }
    });

    // Expand clicked item to full viewport
    // We animate it using fixed positioning
    setExpanded(idx);

    gsap.fromTo(el,
      { width: rect.width, height: rect.height },
      {
        width: window.innerWidth,
        height: window.innerHeight,
        duration: 0.7,
        ease: "expo.inOut",
        delay: 0.15,
        onComplete: () => {
          gsap.to([nameRef.current, navRef.current], { opacity: 1, duration: 0.5 });
          isAnimating.current = false;
        },
      }
    );
  }, [expanded]);

  // Reset x/y on collapse
  useEffect(() => {
    if (expanded === null) {
      itemRefs.current.forEach(item => {
        if (item) gsap.set(item, { x: 0, y: 0, rotation: 0 });
      });
    }
  }, [expanded]);

  // Initial entrance
  useEffect(() => {
    gsap.from(itemRefs.current.filter(Boolean), {
      opacity: 0,
      scale: 0.8,
      stagger: 0.05,
      duration: 0.6,
      delay: 0.2,
      ease: "back.out(1.5)",
    });
    gsap.set([nameRef.current, navRef.current], { opacity: 0 });
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      background: "#000",
      overflow: "hidden",
    }}>

      {/* Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        width: "100%",
        height: "100%",
        gap: 2,
        position: "absolute",
        inset: 0,
      }}>
        {PRINTS.map((src, i) => (
          <div
            key={src}
            ref={el => { itemRefs.current[i] = el; }}
            onClick={() => handleClick(i)}
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              zIndex: expanded === i ? 50 : 1,
              ...(expanded === i ? {
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 50,
              } : {}),
            }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "filter 0.3s",
              }}
              onMouseEnter={e => { if (expanded === null) (e.currentTarget as HTMLImageElement).style.filter = "brightness(1.2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.filter = "none"; }}
            />
            {/* Hover border */}
            {expanded === null && (
              <div style={{
                position: "absolute",
                inset: 0,
                border: "0px solid #ff00aa",
                transition: "border-width 0.2s",
                pointerEvents: "none",
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Name + info — shown when expanded */}
      <div ref={nameRef} style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: 0,
      }}>
        <h1 style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "clamp(3rem, 10vw, 8rem)",
          fontWeight: 900,
          color: "#fff",
          mixBlendMode: "difference",
          textAlign: "center",
          lineHeight: 0.9,
          letterSpacing: "-0.02em",
          textTransform: "uppercase",
        }}>
          ACADIA<br />BERRY
        </h1>
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.5)",
          mixBlendMode: "difference",
          marginTop: "1.5rem",
          textTransform: "uppercase",
        }}>click to return</p>
      </div>

      {/* Nav */}
      <nav ref={navRef} style={{
        position: "fixed",
        bottom: "2rem",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: "2.5rem",
        zIndex: 70,
        opacity: 0,
      }}>
        {["work", "about", "photography", "contact"].map(item => (
          <a key={item} href="#" style={{
            fontFamily: "monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none",
            textTransform: "uppercase",
            mixBlendMode: "difference",
            transition: "color 0.2s",
            pointerEvents: "auto",
          }}>
            {item}
          </a>
        ))}
      </nav>

      <Link href="/" style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 100, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#555", textDecoration: "none" }}>← concepts</Link>
      <div style={{ position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 100, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>11 / FLIP GRID</div>
    </div>
  );
}
