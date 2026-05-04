"use client";

/**
 * CONCEPT 9: TUNNEL
 *
 * Premise: You're flying through a wormhole made of your art.
 * CSS 3D perspective: prints arranged as panels on the walls of an infinite
 * tunnel. GSAP continuously translates the z-axis — panels fly toward you
 * and loop. It feels like being inside your own work.
 * Your name floats at the tunnel's vanishing point, perfectly still as the
 * art rushes past it. Eerie, immersive, unlike anything.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const PRINTS = [
  "/prints/print2.webp",
  "/prints/print4.webp",
  "/prints/print8.webp",
  "/prints/print11.webp",
  "/prints/print17.webp",
  "/prints/print20.webp",
  "/prints/print21.webp",
  "/prints/print3.webp",
];

const RING_COUNT = 6;
const RING_DEPTH = 400; // px between rings
const PANELS_PER_RING = 8;

export default function ConceptTunnel() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    // Fly the rings toward viewer continuously
    gsap.to(wrapperRef.current, {
      z: RING_DEPTH * RING_COUNT,
      duration: 8,
      repeat: -1,
      ease: "none",
      modifiers: {
        z: (val: string) => `${(parseFloat(val) % (RING_DEPTH * RING_COUNT))}px`,
      },
    });

    gsap.from(navRef.current, { opacity: 0, duration: 1.5, delay: 0.5 });
  }, []);

  const rings = Array.from({ length: RING_COUNT });
  const panelAngle = 360 / PANELS_PER_RING;
  const radius = 380;

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      background: "#000",
      overflow: "hidden",
    }}>

      {/* 3D scene */}
      <div ref={sceneRef} style={{
        position: "absolute",
        inset: 0,
        perspective: 800,
        perspectiveOrigin: "50% 50%",
      }}>
        <div ref={wrapperRef} style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 0,
          height: 0,
          transformStyle: "preserve-3d",
          transform: "translateZ(0px)",
        }}>
          {rings.map((_, ri) => (
            <div key={ri} style={{
              position: "absolute",
              transformStyle: "preserve-3d",
              transform: `translateZ(${-ri * RING_DEPTH}px)`,
            }}>
              {Array.from({ length: PANELS_PER_RING }).map((_, pi) => {
                const angle = pi * panelAngle;
                const src = PRINTS[(ri * PANELS_PER_RING + pi) % PRINTS.length];
                return (
                  <div key={pi} style={{
                    position: "absolute",
                    width: 240,
                    height: 200,
                    transformOrigin: "center center",
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    backfaceVisibility: "hidden",
                    marginLeft: -120,
                    marginTop: -100,
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
                        opacity: 0.7,
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Vignette — darkness at edges focuses the tunnel */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.85) 80%)",
        pointerEvents: "none",
        zIndex: 10,
      }} />

      {/* Name at vanishing point */}
      <div style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 20,
        pointerEvents: "none",
      }}>
        <h1 style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "clamp(1.5rem, 4vw, 3rem)",
          fontWeight: 700,
          letterSpacing: "0.5em",
          color: "#fff",
          textTransform: "uppercase",
          textAlign: "center",
          margin: 0,
          lineHeight: 1.2,
          textShadow: "0 0 40px rgba(255,0,170,0.5), 0 0 80px rgba(0,255,238,0.3)",
        }}>
          ACADIA<br />BERRY
        </h1>
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.4)",
          textTransform: "uppercase",
          marginTop: "1rem",
        }}>digital designer · brooklyn, ny</p>
      </div>

      <nav ref={navRef} style={{
        position: "absolute",
        bottom: "2rem",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: "2.5rem",
        zIndex: 30,
        opacity: 0,
      }}>
        {["work", "about", "photography", "contact"].map(item => (
          <a key={item} href="#" style={{
            fontFamily: "monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#ff00aa")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
            {item}
          </a>
        ))}
      </nav>

      <Link href="/" style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333", textDecoration: "none" }}>← concepts</Link>
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>09 / TUNNEL</div>
    </div>
  );
}
