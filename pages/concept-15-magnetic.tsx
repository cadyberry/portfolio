"use client";

/**
 * CONCEPT 15: MAGNETIC
 *
 * Inspired by: Matter.js physics integration + elastic animations (Maxima Therapy,
 * Codrops April 2026) + wave ripple mouse effects.
 *
 * Premise: Your prints float on a black canvas like leaves on water.
 * Each image has spring physics — the cursor acts as a repulsion field.
 * Move near any image and it pushes away. Pull the cursor back and it
 * springs home with elastic overshoot. The images are always drifting
 * slightly (Brownian motion). Your name is pinned at center, immune
 * to the physics, but the images part around it like a crowd.
 *
 * Technique: Pure GSAP spring physics (no Matter.js dependency). Each
 * image tracks a home position. Cursor repulsion computed per-frame.
 * Spring equation: F = -k(x - home) - damping * velocity.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

type PhysicsItem = {
  el: HTMLDivElement;
  hx: number; hy: number;      // home x, y (center of element)
  x: number; y: number;        // current offset from home
  vx: number; vy: number;      // velocity
  driftPhase: number;
  driftAmp: number;
};

const PRINTS = [
  { src: "/prints/print2.webp",  size: 200 },
  { src: "/prints/print3.webp",  size: 160 },
  { src: "/prints/print4.webp",  size: 220 },
  { src: "/prints/print17.webp", size: 140 },
  { src: "/prints/print20.webp", size: 240 },
  { src: "/prints/print21.webp", size: 170 },
  { src: "/prints/print31.webp", size: 150 },
  { src: "/prints/print8.webp",  size: 190 },
];

// Home positions (percent of viewport, will be converted on mount)
const HOME_POS = [
  { px: 0.10, py: 0.15 },
  { px: 0.78, py: 0.10 },
  { px: 0.05, py: 0.60 },
  { px: 0.82, py: 0.55 },
  { px: 0.15, py: 0.82 },
  { px: 0.70, py: 0.78 },
  { px: 0.42, py: 0.08 },
  { px: 0.38, py: 0.85 },
];

const K = 0.045;       // spring stiffness
const DAMP = 0.78;     // damping
const REPULSE_R = 200; // cursor repulsion radius (px)
const REPULSE_F = 18;  // repulsion force strength

export default function ConceptMagnetic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<PhysicsItem[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const nameRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const mouse = mouseRef.current;

    // Build physics items
    itemsRef.current = PRINTS.map((p, i) => {
      const el = container.children[i] as HTMLDivElement;
      const hp = HOME_POS[i];
      const hx = hp.px * w;
      const hy = hp.py * h;
      gsap.set(el, { x: hx, y: hy, opacity: 0 });
      return {
        el,
        hx, hy,
        x: 0, y: 0,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        driftPhase: Math.random() * Math.PI * 2,
        driftAmp: 4 + Math.random() * 8,
      };
    });

    // Entrance
    gsap.to(itemsRef.current.map(i => i.el), {
      opacity: 1,
      duration: 0.8,
      stagger: 0.08,
      delay: 0.3,
      ease: "power2.out",
    });
    gsap.from([nameRef.current, navRef.current], { opacity: 0, duration: 1, delay: 0.5, stagger: 0.2 });

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    let t = 0;
    const tick = () => {
      t += 0.012;

      itemsRef.current.forEach(item => {
        // Current world position
        const wx = item.hx + item.x;
        const wy = item.hy + item.y;

        // Cursor repulsion
        const dx = wx - mouse.x;
        const dy = wy - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let fx = 0, fy = 0;
        if (dist < REPULSE_R && dist > 0) {
          const factor = (1 - dist / REPULSE_R) * REPULSE_F;
          fx += (dx / dist) * factor;
          fy += (dy / dist) * factor;
        }

        // Spring force back to home
        fx += -K * item.x;
        fy += -K * item.y;

        // Brownian drift
        fx += Math.sin(t + item.driftPhase) * 0.08 * item.driftAmp;
        fy += Math.cos(t * 0.7 + item.driftPhase) * 0.08 * item.driftAmp;

        // Integrate
        item.vx = (item.vx + fx) * DAMP;
        item.vy = (item.vy + fy) * DAMP;
        item.x += item.vx;
        item.y += item.vy;

        gsap.set(item.el, {
          x: item.hx + item.x,
          y: item.hy + item.y,
        });
      });

      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      background: "#000",
      overflow: "hidden",
    }}>

      {/* Physics container */}
      <div ref={containerRef} style={{ position: "absolute", inset: 0 }}>
        {PRINTS.map((p, i) => (
          <div key={p.src} style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: p.size,
            height: p.size,
            marginLeft: -p.size / 2,
            marginTop: -p.size / 2,
            willChange: "transform",
            opacity: 0,
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                opacity: 0.75,
                transition: "opacity 0.3s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.75")}
            />
          </div>
        ))}
      </div>

      {/* Center vignette so name reads */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 40% 35% at center, rgba(0,0,0,0.85) 0%, transparent 100%)",
        pointerEvents: "none",
        zIndex: 5,
      }} />

      {/* Name */}
      <div ref={nameRef} style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        pointerEvents: "none",
      }}>
        <h1 style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
          fontWeight: 700,
          letterSpacing: "0.4em",
          color: "#fff",
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.15,
          margin: 0,
        }}>
          ACADIA<br />BERRY
        </h1>
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.3em",
          color: "#444",
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
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>15 / MAGNETIC</div>
    </div>
  );
}
