"use client";

/**
 * CONCEPT 14: CINEMATIC SCROLL
 *
 * Inspired by: "They Call Me Giulio" cinematic portfolio (Codrops April 2026)
 * + CSS scroll-driven animations (Chrome 145+)
 *
 * Premise: The page is a film. You scroll through it like advancing frames.
 * Each section is a full-bleed artwork with a title card — black screen,
 * white text, brief. Between sections: chromatic aberration / glitch
 * transition shader (CSS filter + offset). The opener is your name on pure
 * black, like a title card. The experience feels like watching something,
 * not browsing something.
 *
 * Technique: CSS scroll-driven animations (animation-timeline: scroll()) for
 * the chromatic aberration effect. GSAP ScrollTrigger for section reveals.
 * Pure CSS 3D for the glitch transitions.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { src: "/prints/print4.webp",  title: "DIGITAL ART",   sub: "6 years. acrylic to algorithm." },
  { src: "/prints/print11.webp", title: "PHOTOGRAPHY",   sub: "the city, caught." },
  { src: "/prints/print8.webp",  title: "BRANDING",      sub: "systems that mean something." },
  { src: "/prints/print20.webp", title: "TOOLS",         sub: "i build what doesn't exist." },
];

export default function ConceptCinematic() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const glitchRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // ScrollTrigger for each chapter — text + image fade
    sectionsRef.current.forEach((section, i) => {
      if (!section) return;

      const title = section.querySelector(".chapter-title");
      const sub = section.querySelector(".chapter-sub");
      const img = section.querySelector(".chapter-img");

      gsap.from([img], {
        scale: 1.08,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.5,
        },
      });

      gsap.from([title, sub], {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 60%",
          toggleActions: "play none none reverse",
        },
      });
    });

    // Glitch panels between sections
    glitchRef.current.forEach(el => {
      if (!el) return;
      const r = el.querySelector(".glitch-r") as HTMLElement;
      const b = el.querySelector(".glitch-b") as HTMLElement;
      if (!r || !b) return;

      gsap.to(r, {
        x: 6,
        opacity: 0.7,
        duration: 0,
        scrollTrigger: {
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          scrub: true,
          onUpdate: (self) => {
            const p = Math.sin(self.progress * Math.PI);
            gsap.set(r, { x: p * 8, opacity: p * 0.6 });
            gsap.set(b, { x: -p * 8, opacity: p * 0.6 });
          },
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div style={{ background: "#000", color: "#fff" }}>

      {/* Title card */}
      <section style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        position: "relative",
      }}>
        <div style={{ textAlign: "center" }}>
          <p style={{
            fontFamily: "monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.4em",
            color: "#444",
            textTransform: "uppercase",
            marginBottom: "1.5rem",
          }}>a portfolio film by</p>
          <h1 style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "clamp(3rem, 9vw, 7rem)",
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: "#fff",
            textTransform: "uppercase",
            lineHeight: 0.95,
            margin: 0,
          }}>
            ACADIA<br />BERRY
          </h1>
          <p style={{
            fontFamily: "monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            color: "#333",
            textTransform: "uppercase",
            marginTop: "1.5rem",
          }}>brooklyn, ny · scroll to begin</p>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}>
          <div style={{
            width: 1,
            height: 60,
            background: "linear-gradient(to bottom, #fff, transparent)",
            animation: "scrollLine 1.8s ease-in-out infinite",
          }} />
          <style>{`@keyframes scrollLine { 0%,100%{opacity:0.2;transform:scaleY(0.3) translateY(-20px)} 50%{opacity:1;transform:scaleY(1) translateY(0)} }`}</style>
        </div>
      </section>

      {/* Chapters */}
      {CHAPTERS.map((chapter, i) => (
        <div key={i}>
          {/* Glitch separator */}
          <div ref={el => { glitchRef.current[i] = el; }} style={{
            position: "relative",
            height: "6px",
            background: "#fff",
            overflow: "visible",
          }}>
            <div className="glitch-r" style={{
              position: "absolute",
              inset: 0,
              background: "#ff00aa",
              opacity: 0,
            }} />
            <div className="glitch-b" style={{
              position: "absolute",
              inset: 0,
              background: "#00ffee",
              opacity: 0,
            }} />
          </div>

          {/* Chapter section */}
          <section
            ref={el => { sectionsRef.current[i] = el; }}
            style={{
              position: "relative",
              width: "100vw",
              height: "100vh",
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
            }}>

            {/* Full-bleed image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="chapter-img"
              src={chapter.src}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Gradient overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)",
            }} />

            {/* Chapter text */}
            <div style={{
              position: "relative",
              zIndex: 10,
              padding: "clamp(2rem, 5vw, 4rem)",
              width: "100%",
            }}>
              <p style={{
                fontFamily: "monospace",
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                color: "rgba(255,255,255,0.5)",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}>chapter {String(i + 1).padStart(2, "0")}</p>
              <h2 className="chapter-title" style={{
                fontFamily: "'Arial Black', Arial, sans-serif",
                fontSize: "clamp(2rem, 6vw, 4.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.02em",
                color: "#fff",
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1,
              }}>{chapter.title}</h2>
              <p className="chapter-sub" style={{
                fontFamily: "monospace",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.6)",
                marginTop: "0.6rem",
                letterSpacing: "0.05em",
              }}>{chapter.sub}</p>
            </div>
          </section>
        </div>
      ))}

      {/* End card */}
      <section style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
      }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: "#444", textTransform: "uppercase" }}>fin.</p>
        <nav style={{ display: "flex", gap: "2.5rem" }}>
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
      </section>

      <Link href="/" style={{ position: "fixed", top: "1.5rem", left: "1.5rem", zIndex: 100, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333", textDecoration: "none" }}>← concepts</Link>
      <div style={{ position: "fixed", top: "1.5rem", right: "1.5rem", zIndex: 100, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>14 / CINEMATIC</div>
    </div>
  );
}
