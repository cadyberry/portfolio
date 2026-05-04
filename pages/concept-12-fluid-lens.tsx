"use client";

/**
 * CONCEPT 12: FLUID LENS
 *
 * Inspired by: Arnaud Rocca's fluid simulation + lens distortion hovers (Codrops 2026)
 *
 * Premise: Your prints tile the background in a loose mosaic. A canvas overlay
 * tracks the cursor and renders a real-time lens distortion / liquid ripple.
 * Moving the mouse pushes the pixels underneath like a magnifying glass dragged
 * through water. Your name is centered, clean, always undistorted.
 * The distortion creates the feeling that your art is alive and responsive —
 * it reacts to human presence.
 *
 * Technique: Canvas pixel displacement. Each frame, we sample an offscreen
 * composite of the prints and displace pixels toward/away from cursor using
 * a radial field. No WebGL needed — pure 2D canvas math.
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
  "/prints/print31.webp",
];

export default function ConceptFluidLens() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, px: -1000, py: -1000 });
  const rafRef = useRef<number>(0);
  const nameRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const bgCanvas = bgCanvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const bgCtx = bgCanvas.getContext("2d")!;

    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      bgCanvas.width = w;
      bgCanvas.height = h;
      drawBg();
    };

    // Draw mosaic of prints to offscreen canvas
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    const drawBg = () => {
      if (loaded < PRINTS.length) return;
      const cols = 3;
      const rows = 3;
      const tw = Math.ceil(w / cols);
      const th = Math.ceil(h / rows);
      bgCtx.fillStyle = "#000";
      bgCtx.fillRect(0, 0, w, h);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const img = images[(r * cols + c) % images.length];
          bgCtx.globalAlpha = 0.7;
          bgCtx.drawImage(img, c * tw, r * th, tw, th);
        }
      }
      bgCtx.globalAlpha = 1;
    };

    PRINTS.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        images[i] = img;
        loaded++;
        if (loaded === PRINTS.length) drawBg();
      };
      img.src = src;
    });

    canvas.width = w;
    canvas.height = h;
    bgCanvas.width = w;
    bgCanvas.height = h;
    window.addEventListener("resize", resize);

    const mouse = mouseRef.current;

    const onMove = (e: MouseEvent) => {
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.vx = mouse.x - mouse.px;
      mouse.vy = mouse.y - mouse.py;
    };
    window.addEventListener("mousemove", onMove);

    // Lens radius and strength
    const RADIUS = 160;
    const STRENGTH = 28;

    const draw = () => {
      if (loaded < PRINTS.length) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const bgData = bgCtx.getImageData(0, 0, w, h);
      const src = bgData.data;
      const out = ctx.createImageData(w, h);
      const dst = out.data;

      const mx = mouse.x;
      const my = mouse.y;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let sx = x;
          let sy = y;

          if (dist < RADIUS && dist > 0) {
            // Lens distortion: push pixels away from cursor (magnify) or toward (pinch)
            const factor = (1 - dist / RADIUS);
            const push = STRENGTH * factor * factor;
            sx = x + (dx / dist) * push * -1;
            sy = y + (dy / dist) * push * -1;
          }

          // Clamp
          sx = Math.max(0, Math.min(w - 1, Math.round(sx)));
          sy = Math.max(0, Math.min(h - 1, Math.round(sy)));

          const srcIdx = (sy * w + sx) * 4;
          const dstIdx = (y * w + x) * 4;
          dst[dstIdx]     = src[srcIdx];
          dst[dstIdx + 1] = src[srcIdx + 1];
          dst[dstIdx + 2] = src[srcIdx + 2];
          dst[dstIdx + 3] = src[srcIdx + 3];
        }
      }

      ctx.putImageData(out, 0, 0);
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    gsap.from([nameRef.current, navRef.current], { opacity: 0, duration: 1.2, delay: 0.5, stagger: 0.2 });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
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
      cursor: "none",
    }}>
      {/* Offscreen bg (hidden) */}
      <canvas ref={bgCanvasRef} style={{ display: "none" }} />

      {/* Live distorted output */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 1 }} />

      {/* Dark overlay to keep it moody */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.38)",
        zIndex: 2,
        pointerEvents: "none",
      }} />

      {/* Name — centered, undistorted */}
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
          fontSize: "clamp(2rem, 6vw, 4.5rem)",
          fontWeight: 700,
          letterSpacing: "0.3em",
          color: "#fff",
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: 1.1,
          textShadow: "0 0 60px rgba(0,0,0,0.8)",
        }}>
          ACADIA<br />BERRY
        </h1>
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.35em",
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
          marginTop: "1.2rem",
        }}>move cursor · feel it breathe</p>
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
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#ff00aa")}
          onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
            {item}
          </a>
        ))}
      </nav>

      <Link href="/" style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#555", textDecoration: "none", cursor: "pointer" }}>← concepts</Link>
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>12 / FLUID LENS</div>
    </div>
  );
}
