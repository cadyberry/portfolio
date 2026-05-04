"use client";

/**
 * CONCEPT 1: STATIC
 *
 * Premise: You are a signal. The page starts as pure TV static — white noise,
 * full screen. Your name carves itself out of the interference, letter by letter.
 * Then the static decays and your art bleeds through underneath.
 * Navigation appears last, minimal, at the bottom.
 *
 * Palette pulled directly from prints: neon pink, cyan, yellow on void black.
 * The static itself flickers with those colors before resolving.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const PRINTS = ["/prints/print2.webp", "/prints/print20.webp", "/prints/print4.webp"];

export default function ConceptStatic() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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

    const NEON = ["#ff00aa", "#00ffee", "#ccff00", "#ff6600", "#aa00ff"];
    let intensity = 1.0; // 1 = full static, 0 = clear
    let frame = 0;

    const drawStatic = () => {
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255 * intensity;
        // occasionally inject neon color
        if (Math.random() < 0.003 * intensity) {
          const neon = NEON[Math.floor(Math.random() * NEON.length)];
          const r = parseInt(neon.slice(1, 3), 16);
          const g = parseInt(neon.slice(3, 5), 16);
          const b = parseInt(neon.slice(5, 7), 16);
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = Math.random() * 255 * intensity;
        } else {
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = Math.floor(255 * intensity);
        }
      }
      ctx.putImageData(imageData, 0, 0);
      frame++;
    };

    const animate = () => {
      drawStatic();
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // After 0.4s: name appears, letter by letter
    const tl = gsap.timeline({ delay: 0.4 });

    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll(".letter");
      tl.set(nameRef.current, { visibility: "visible" });
      tl.from(letters, {
        opacity: 0,
        y: 8,
        stagger: 0.06,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    // After 1.2s: static begins to decay
    tl.to({}, {
      duration: 0,
      onComplete: () => {
        gsap.to({ val: 1 }, {
          val: 0,
          duration: 2.5,
          ease: "power2.inOut",
          onUpdate: function () {
            intensity = this.targets()[0].val;
          },
          onComplete: () => {
            cancelAnimationFrame(animFrameRef.current);
            ctx.clearRect(0, 0, w, h);
          },
        });
      },
    }, "+=0.8");

    // Nav fades in after static clears
    if (navRef.current) {
      tl.from(navRef.current, { opacity: 0, duration: 1, ease: "power2.out" }, "+=2");
    }

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const name = "ACADIA BERRY";

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", background: "#000", overflow: "hidden" }}>

      {/* Art layers — visible once static clears */}
      {PRINTS.map((src, i) => (
        <div key={src} style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.18 - i * 0.04,
          mixBlendMode: "screen",
          transform: `scale(${1 + i * 0.05})`,
        }} />
      ))}

      {/* Static canvas */}
      <canvas ref={canvasRef} style={{
        position: "absolute",
        inset: 0,
        zIndex: 10,
        display: "block",
      }} />

      {/* Name */}
      <div ref={nameRef} style={{
        position: "absolute",
        inset: 0,
        zIndex: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        visibility: "hidden",
        pointerEvents: "none",
      }}>
        <h1 style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "clamp(2.5rem, 8vw, 7rem)",
          fontWeight: 700,
          letterSpacing: "0.15em",
          color: "#fff",
          mixBlendMode: "difference",
          userSelect: "none",
          lineHeight: 1,
        }}>
          {name.split("").map((char, i) => (
            <span key={i} className="letter" style={{
              display: "inline-block",
              whiteSpace: char === " " ? "pre" : "normal",
            }}>{char}</span>
          ))}
        </h1>
      </div>

      {/* Tagline + nav */}
      <nav ref={navRef} style={{
        position: "absolute",
        bottom: "2.5rem",
        left: 0,
        right: 0,
        zIndex: 30,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
        opacity: 0,
      }}>
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.35em",
          color: "#555",
          textTransform: "uppercase",
        }}>digital designer · brooklyn, ny</p>
        <div style={{ display: "flex", gap: "2.5rem" }}>
          {["work", "about", "contact"].map(item => (
            <a key={item} href="#" style={{
              fontFamily: "monospace",
              fontSize: "0.65rem",
              letterSpacing: "0.25em",
              color: "#777",
              textDecoration: "none",
              textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#ff00aa")}
            onMouseLeave={e => (e.currentTarget.style.color = "#777")}>
              {item}
            </a>
          ))}
        </div>
      </nav>

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

      {/* Concept label */}
      <div style={{
        position: "absolute",
        top: "1.5rem",
        right: "1.5rem",
        zIndex: 40,
        fontFamily: "monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.2em",
        color: "#333",
      }}>01 / STATIC</div>
    </div>
  );
}
