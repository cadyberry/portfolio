"use client";

/**
 * CONCEPT 3: SIGNAL
 *
 * Premise: You are transmitting. A single piece of your art rotates slowly
 * at center — a living signal. Concentric rings pulse outward from it.
 * Your name splits: "ACADIA" left-anchored, "BERRY" right-anchored,
 * both in huge type flanking the center signal. Navigation orbits at
 * the bottom in a horizontal arc. On hover of the center: rotation
 * accelerates, rings flare neon.
 *
 * Inspired by print11 (mandala/radial, magenta circles) and print17 (orb on black).
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const RING_SIZES = [260, 360, 480, 640];

export default function ConceptSignal() {
  const orbRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<(HTMLDivElement | null)[]>([]);
  const leftNameRef = useRef<HTMLSpanElement>(null);
  const rightNameRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const rotationRef = useRef({ speed: 12 }); // deg/sec
  const gsapSpeedRef = useRef<gsap.core.Tween | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Initial entrance
    gsap.set(orbRef.current, { scale: 0, opacity: 0, rotation: -90 });
    gsap.set(ringsRef.current.filter(Boolean), { scale: 0, opacity: 0 });
    gsap.set([leftNameRef.current, rightNameRef.current], { opacity: 0, y: 20 });
    gsap.set(navRef.current, { opacity: 0 });

    const tl = gsap.timeline({ onComplete: () => setReady(true) });

    // Orb expands in
    tl.to(orbRef.current, { scale: 1, opacity: 1, rotation: 0, duration: 1.2, ease: "power3.out" });

    // Rings expand outward staggered
    tl.to(ringsRef.current.filter(Boolean), {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      stagger: 0.12,
      ease: "power2.out",
    }, "-=0.6");

    // Name slides in
    tl.to([leftNameRef.current, rightNameRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: "power2.out",
    }, "-=0.3");

    // Nav
    tl.to(navRef.current, { opacity: 1, duration: 0.5 }, "-=0.2");

    // Continuous slow rotation of orb
    gsap.to(orbRef.current, {
      rotation: 360,
      duration: 22,
      repeat: -1,
      ease: "none",
    });

    // Rings pulse opacity
    ringsRef.current.filter(Boolean).forEach((ring, i) => {
      gsap.to(ring, {
        opacity: 0.15 + i * 0.05,
        duration: 1.8 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });
  }, []);

  const onOrbEnter = () => {
    // Accelerate
    gsap.to(orbRef.current, { timeScale: 4, duration: 0.5 });
    ringsRef.current.filter(Boolean).forEach((ring, i) => {
      gsap.to(ring, {
        borderColor: i % 2 === 0 ? "#ff00aa" : "#00ffee",
        duration: 0.4,
      });
    });
  };

  const onOrbLeave = () => {
    gsap.to(orbRef.current, { timeScale: 1, duration: 1.5 });
    ringsRef.current.filter(Boolean).forEach(ring => {
      gsap.to(ring, { borderColor: "rgba(255,255,255,0.12)", duration: 0.8 });
    });
  };

  const navItems = ["work", "about", "photography", "contact"];

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      background: "#000",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>

      {/* Left name */}
      <span ref={leftNameRef} style={{
        position: "absolute",
        right: "calc(50% + min(18vw, 260px) + 1.5rem)",
        fontFamily: "'Arial Black', Arial, sans-serif",
        fontSize: "clamp(2rem, 7vw, 5.5rem)",
        fontWeight: 900,
        color: "#fff",
        letterSpacing: "-0.03em",
        userSelect: "none",
        whiteSpace: "nowrap",
        textAlign: "right",
      }}>ACADIA</span>

      {/* Right name */}
      <span ref={rightNameRef} style={{
        position: "absolute",
        left: "calc(50% + min(18vw, 260px) + 1.5rem)",
        fontFamily: "'Arial Black', Arial, sans-serif",
        fontSize: "clamp(2rem, 7vw, 5.5rem)",
        fontWeight: 900,
        color: "#fff",
        letterSpacing: "-0.03em",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}>BERRY</span>

      {/* Concentric rings */}
      {RING_SIZES.map((size, i) => (
        <div
          key={size}
          ref={el => { ringsRef.current[i] = el; }}
          style={{
            position: "absolute",
            width: `min(${size}px, ${size / 4}vw * 4)`,
            height: `min(${size}px, ${size / 4}vw * 4)`,
            borderRadius: "50%",
            border: `${i === 0 ? 2 : 1}px solid rgba(255,255,255,0.12)`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Central orb — the art */}
      <div
        ref={orbRef}
        onMouseEnter={onOrbEnter}
        onMouseLeave={onOrbLeave}
        style={{
          position: "relative",
          width: "clamp(200px, 36vmin, 420px)",
          height: "clamp(200px, 36vmin, 420px)",
          borderRadius: "50%",
          overflow: "hidden",
          cursor: "pointer",
          zIndex: 10,
          boxShadow: "0 0 60px rgba(255,0,170,0.15), 0 0 120px rgba(0,255,238,0.08)",
          flexShrink: 0,
        }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/prints/print11.webp"
          alt="Acadia Berry digital art"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            userSelect: "none",
          }}
        />
        {/* Subtle vignette */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          boxShadow: "inset 0 0 40px rgba(0,0,0,0.5)",
          pointerEvents: "none",
        }} />
      </div>

      {/* Tagline beneath orb */}
      <div style={{
        position: "absolute",
        top: "calc(50% + min(18vmin, 220px) + 1.5rem)",
        fontFamily: "monospace",
        fontSize: "0.65rem",
        letterSpacing: "0.3em",
        color: "#444",
        textTransform: "uppercase",
        textAlign: "center",
      }}>digital designer · brooklyn, ny</div>

      {/* Nav */}
      <nav ref={navRef} style={{
        position: "absolute",
        bottom: "2.5rem",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: "3rem",
        zIndex: 20,
      }}>
        {navItems.map(item => (
          <a key={item} href="#" style={{
            fontFamily: "monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            color: "#666",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#ff00aa")}
          onMouseLeave={e => (e.currentTarget.style.color = "#666")}>
            {item}
          </a>
        ))}
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

      <div style={{
        position: "absolute",
        top: "1.5rem",
        right: "1.5rem",
        zIndex: 40,
        fontFamily: "monospace",
        fontSize: "0.6rem",
        letterSpacing: "0.2em",
        color: "#333",
      }}>03 / SIGNAL</div>
    </div>
  );
}
