"use client";

/**
 * CONCEPT 7: FILM STRIP
 *
 * Premise: Your work presented as 35mm film. Two horizontal strips scroll
 * in opposite directions — top strip left, bottom strip right — continuously,
 * slowly, never stopping. The perforations are real. In the center gap
 * between the strips sits your name and a one-line bio, static against
 * the moving frames. Feels archival, physical, cinematic — but the frames
 * are psychedelic digital art. The tension between format and content is the point.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const STRIP_1 = ["/prints/print2.webp", "/prints/print4.webp", "/prints/print8.webp", "/prints/print11.webp", "/prints/print17.webp"];
const STRIP_2 = ["/prints/print20.webp", "/prints/print21.webp", "/prints/print31.webp", "/prints/print3.webp", "/prints/print5.webp"];

// Triple the strips for seamless loop
const S1 = [...STRIP_1, ...STRIP_1, ...STRIP_1];
const S2 = [...STRIP_2, ...STRIP_2, ...STRIP_2];

const FRAME_W = 200;
const PERF_SIZE = 14;

function FilmPerfs({ count }: { count: number }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      height: PERF_SIZE + 4,
      gap: 18,
      padding: "0 9px",
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: PERF_SIZE,
          height: PERF_SIZE,
          borderRadius: 3,
          border: "1px solid #333",
          background: "#000",
          flexShrink: 0,
        }} />
      ))}
    </div>
  );
}

function FilmStrip({ images, direction }: { images: string[]; direction: "left" | "right" }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const FRAME_COUNT = images.length;
  const TOTAL_W = FRAME_COUNT * (FRAME_W + 8); // frame + gap

  useEffect(() => {
    if (!trackRef.current) return;
    const start = direction === "left" ? 0 : -(TOTAL_W / 3);
    gsap.set(trackRef.current, { x: start });
    gsap.to(trackRef.current, {
      x: direction === "left" ? -(TOTAL_W / 3) : 0,
      duration: 30,
      ease: "none",
      repeat: -1,
    });
  }, [direction, TOTAL_W]);

  const perfCount = Math.floor(FRAME_W / (PERF_SIZE + 18));

  return (
    <div style={{ overflow: "hidden", width: "100%", background: "#080808" }}>
      <div ref={trackRef} style={{ display: "flex", gap: 8, willChange: "transform" }}>
        {images.map((src, i) => (
          <div key={i} style={{
            flexShrink: 0,
            width: FRAME_W,
            background: "#0a0a0a",
            border: "1px solid #1a1a1a",
          }}>
            <FilmPerfs count={perfCount} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" style={{ width: "100%", height: 130, objectFit: "cover", display: "block" }} />
            <FilmPerfs count={perfCount} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ConceptFilm() {
  const centerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from([centerRef.current, navRef.current], {
      opacity: 0,
      duration: 1.2,
      delay: 0.4,
      ease: "power2.out",
    });
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      background: "#000",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}>

      {/* Top strip */}
      <FilmStrip images={S1} direction="left" />

      {/* Center — name and bio */}
      <div ref={centerRef} style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem 2rem",
        gap: "0.6rem",
        zIndex: 10,
        flexShrink: 0,
      }}>
        <h1 style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "clamp(1.8rem, 5vw, 4rem)",
          fontWeight: 700,
          letterSpacing: "0.4em",
          color: "#e8e8e0",
          textTransform: "uppercase",
          margin: 0,
          lineHeight: 1,
          textAlign: "center",
        }}>ACADIA BERRY</h1>
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.62rem",
          letterSpacing: "0.3em",
          color: "#555",
          textTransform: "uppercase",
        }}>digital designer · brooklyn, ny</p>
      </div>

      {/* Bottom strip */}
      <FilmStrip images={S2} direction="right" />

      {/* Nav */}
      <nav ref={navRef} style={{
        position: "absolute",
        bottom: "2rem",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: "2.5rem",
        zIndex: 20,
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
          onMouseEnter={e => (e.currentTarget.style.color = "#ff00aa")}
          onMouseLeave={e => (e.currentTarget.style.color = "#555")}>
            {item}
          </a>
        ))}
      </nav>

      <Link href="/" style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333", textDecoration: "none" }}>← concepts</Link>
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>07 / FILM STRIP</div>
    </div>
  );
}
