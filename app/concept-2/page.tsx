"use client";

/**
 * CONCEPT 2: SCATTER
 *
 * Premise: The city throws things at you all at once. Your art pieces fly in
 * from every direction — off all four edges — and crash into position on load.
 * They never quite settle into a grid. They land at different sizes, slight
 * rotations, overlapping. Your name is carved through the composition in
 * massive type using mix-blend-mode: difference — it reads everywhere.
 * Nav is embedded at bottom, quiet.
 *
 * Interaction: hover any piece to pop it forward (scale + z-index bump).
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

type Piece = {
  src: string;
  x: string;        // final position (CSS, viewport-relative)
  y: string;
  w: string;
  rotate: number;
  z: number;
  fromX: number;    // start offset (px, off-screen direction)
  fromY: number;
  delay: number;
};

const PIECES: Piece[] = [
  { src: "/prints/print2.webp",  x: "-2%",  y: "-5%",  w: "38vw", rotate: -3,  z: 1, fromX: -500, fromY: -200, delay: 0    },
  { src: "/prints/print3.webp",  x: "55%",  y: "-8%",  w: "32vw", rotate:  4,  z: 2, fromX:  500, fromY: -300, delay: 0.08 },
  { src: "/prints/print11.webp", x: "28%",  y: "18%",  w: "22vw", rotate: -1,  z: 4, fromX:    0, fromY: -400, delay: 0.12 },
  { src: "/prints/print17.webp", x: "-4%",  y: "48%",  w: "28vw", rotate:  5,  z: 2, fromX: -500, fromY:  200, delay: 0.05 },
  { src: "/prints/print4.webp",  x: "62%",  y: "42%",  w: "34vw", rotate: -4,  z: 1, fromX:  500, fromY:  300, delay: 0.1  },
  { src: "/prints/print21.webp", x: "18%",  y: "58%",  w: "26vw", rotate:  2,  z: 3, fromX: -200, fromY:  500, delay: 0.15 },
  { src: "/prints/print20.webp", x: "52%",  y: "68%",  w: "40vw", rotate: -2,  z: 1, fromX:  400, fromY:  500, delay: 0.07 },
  { src: "/prints/print31.webp", x: "3%",   y: "20%",  w: "20vw", rotate:  7,  z: 3, fromX: -400, fromY:  100, delay: 0.18 },
];

export default function ConceptScatter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const piecesRef = useRef<(HTMLDivElement | null)[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const pieces = piecesRef.current.filter(Boolean) as HTMLDivElement[];

    // Set start positions off-screen
    pieces.forEach((el, i) => {
      const p = PIECES[i];
      gsap.set(el, {
        x: p.fromX,
        y: p.fromY,
        opacity: 0,
        scale: 0.85,
      });
    });

    if (nameRef.current) gsap.set(nameRef.current, { opacity: 0 });
    if (navRef.current) gsap.set(navRef.current, { opacity: 0 });

    // Pieces fly in
    pieces.forEach((el, i) => {
      gsap.to(el, {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.9,
        delay: PIECES[i].delay + 0.2,
        ease: "power3.out",
      });
    });

    // Name and nav after pieces land
    gsap.to(nameRef.current, { opacity: 1, duration: 0.6, delay: 0.9 });
    gsap.to(navRef.current, { opacity: 1, duration: 0.8, delay: 1.2 });
  }, []);

  const handleMouseEnter = (el: HTMLDivElement, origZ: number) => {
    gsap.to(el, { scale: 1.06, duration: 0.3, ease: "power2.out" });
    el.style.zIndex = "50";
  };
  const handleMouseLeave = (el: HTMLDivElement, origZ: number) => {
    gsap.to(el, { scale: 1, duration: 0.3, ease: "power2.out" });
    el.style.zIndex = String(origZ);
  };

  return (
    <div ref={containerRef} style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      background: "#000",
      overflow: "hidden",
    }}>

      {/* Art pieces */}
      {PIECES.map((p, i) => (
        <div
          key={p.src + i}
          ref={el => { piecesRef.current[i] = el; }}
          onMouseEnter={e => handleMouseEnter(e.currentTarget as HTMLDivElement, p.z)}
          onMouseLeave={e => handleMouseLeave(e.currentTarget as HTMLDivElement, p.z)}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.w,
            zIndex: p.z,
            transform: `rotate(${p.rotate}deg)`,
            cursor: "pointer",
            willChange: "transform",
          }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            alt=""
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </div>
      ))}

      {/* Name — sits above everything, difference blend carves through art */}
      <div ref={nameRef} style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}>
        <h1 style={{
          fontFamily: "'Arial Black', 'Arial', sans-serif",
          fontSize: "clamp(3.5rem, 11vw, 9rem)",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          color: "#fff",
          mixBlendMode: "difference",
          textAlign: "center",
          lineHeight: 0.9,
          userSelect: "none",
          textTransform: "uppercase",
        }}>
          ACADIA<br />BERRY
        </h1>
      </div>

      {/* Nav */}
      <nav ref={navRef} style={{
        position: "absolute",
        bottom: "2rem",
        left: 0,
        right: 0,
        zIndex: 30,
        display: "flex",
        justifyContent: "center",
        gap: "3rem",
      }}>
        {["work", "about", "photography", "contact"].map(item => (
          <a key={item} href="#" style={{
            fontFamily: "monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "#888",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#00ffee")}
          onMouseLeave={e => (e.currentTarget.style.color = "#888")}>
            {item}
          </a>
        ))}
      </nav>

      {/* Tag */}
      <div style={{
        position: "absolute",
        bottom: "2rem",
        right: "1.5rem",
        zIndex: 40,
        fontFamily: "monospace",
        fontSize: "0.55rem",
        letterSpacing: "0.15em",
        color: "#222",
      }}>brooklyn, ny</div>

      {/* Back */}
      <Link href="/" style={{
        position: "absolute",
        top: "1.5rem",
        left: "1.5rem",
        zIndex: 40,
        fontFamily: "monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.2em",
        color: "#333",
        textDecoration: "none",
      }}>← concepts</Link>

      <div style={{
        position: "absolute",
        top: "1.5rem",
        right: "1.5rem",
        zIndex: 40,
        fontFamily: "monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.2em",
        color: "#333",
      }}>02 / SCATTER</div>
    </div>
  );
}
