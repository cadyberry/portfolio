"use client";

/**
 * CONCEPT 6: DISSOLVE
 *
 * Premise: Your name starts as 2000+ particles scattered randomly across the
 * viewport. On load they swarm and lock into the letterforms of "ACADIA BERRY."
 * Once assembled, the particles slowly drift apart again — the name always
 * fighting to hold itself together. Your art bleeds in as the background.
 *
 * Canvas-based particle system. Each particle is a tiny square (2-3px),
 * colored from your neon palette. The letterforms are computed by drawing
 * text to an offscreen canvas and sampling pixel positions.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const NEON = ["#ff00aa", "#00ffee", "#ccff00", "#ff6600", "#aa00ff", "#ffffff"];

type Particle = {
  x: number; y: number;
  tx: number; ty: number;   // target (letterform position)
  ox: number; oy: number;   // original scatter position
  vx: number; vy: number;
  color: string;
  size: number;
  phase: number;
};

function sampleText(text: string, canvasW: number, canvasH: number, density: number): { x: number; y: number }[] {
  const offscreen = document.createElement("canvas");
  offscreen.width = canvasW;
  offscreen.height = canvasH;
  const ctx = offscreen.getContext("2d")!;
  ctx.fillStyle = "#fff";
  const fontSize = Math.min(canvasW / 6, 120);
  ctx.font = `900 ${fontSize}px Arial Black, Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("ACADIA", canvasW / 2, canvasH / 2 - fontSize * 0.6);
  ctx.fillText("BERRY", canvasW / 2, canvasH / 2 + fontSize * 0.6);
  const data = ctx.getImageData(0, 0, canvasW, canvasH).data;
  const pts: { x: number; y: number }[] = [];
  for (let y = 0; y < canvasH; y += density) {
    for (let x = 0; x < canvasW; x += density) {
      const idx = (y * canvasW + x) * 4;
      if (data[idx + 3] > 128) pts.push({ x, y });
    }
  }
  return pts;
}

export default function ConceptDissolve() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const assembledRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", resize);

    // Sample letterform positions
    const pts = sampleText("", w, h, 6);

    // Create particles — one per letterform point (capped)
    const MAX = Math.min(pts.length, 1800);
    const selected = pts.sort(() => Math.random() - 0.5).slice(0, MAX);

    const particles: Particle[] = selected.map(pt => ({
      x: Math.random() * w,
      y: Math.random() * h,
      tx: pt.x,
      ty: pt.y,
      ox: Math.random() * w,
      oy: Math.random() * h,
      vx: 0,
      vy: 0,
      color: NEON[Math.floor(Math.random() * NEON.length)],
      size: Math.random() * 1.5 + 1,
      phase: Math.random() * Math.PI * 2,
    }));

    let assembled = false;
    let t = 0;

    // After 0.3s, pull particles to letterforms
    setTimeout(() => {
      assembled = true;
      assembledRef.current = true;
      // Show nav after particles arrive
      setTimeout(() => {
        if (navRef.current) gsap.to(navRef.current, { opacity: 1, duration: 0.8 });
      }, 1200);
    }, 300);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      t += 0.01;

      particles.forEach(p => {
        if (assembled) {
          // Spring toward target
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          p.vx += dx * 0.06;
          p.vy += dy * 0.06;
          p.vx *= 0.82;
          p.vy *= 0.82;
          // Add tiny drift once close
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 5) {
            p.vx += Math.sin(t * 1.5 + p.phase) * 0.3;
            p.vy += Math.cos(t * 1.2 + p.phase) * 0.3;
          }
        } else {
          // Float randomly
          p.vx += (Math.random() - 0.5) * 0.4;
          p.vy += (Math.random() - 0.5) * 0.4;
          p.vx *= 0.96;
          p.vy *= 0.96;
        }

        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = p.color;
        ctx.globalAlpha = assembled ? 0.85 : 0.4;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
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

      {/* Art background — very subtle */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(/prints/print3.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.06,
        mixBlendMode: "screen",
      }} />

      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 5 }} />

      {/* Tagline */}
      <div style={{
        position: "absolute",
        bottom: "5rem",
        left: 0,
        right: 0,
        textAlign: "center",
        zIndex: 10,
        fontFamily: "monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.35em",
        color: "#333",
        textTransform: "uppercase",
      }}>digital designer · brooklyn, ny</div>

      <nav ref={navRef} style={{
        position: "absolute",
        bottom: "2.5rem",
        left: 0,
        right: 0,
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        gap: "2.5rem",
        opacity: 0,
      }}>
        {["work", "about", "photography", "contact"].map(item => (
          <a key={item} href="#" style={{
            fontFamily: "monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "#555",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#00ffee")}
          onMouseLeave={e => (e.currentTarget.style.color = "#555")}>
            {item}
          </a>
        ))}
      </nav>

      <Link href="/" style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333", textDecoration: "none" }}>← concepts</Link>
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>06 / DISSOLVE</div>
    </div>
  );
}
