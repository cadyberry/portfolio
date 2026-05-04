"use client";

/**
 * CONCEPT 8: SUBWAY MAP
 *
 * Premise: The page is an NYC subway map — but your disciplines are the lines.
 * PINK LINE = Digital Art. CYAN LINE = Photography. YELLOW LINE = Branding.
 * WHITE LINE = Tools / Dev. Stops on each line are your featured works.
 * The lines cross, branch, intersect. Your name is the station hub at center.
 * Clicking a line scrolls to that section (eventually). For now it's pure design.
 *
 * All the map lines are SVG, drawn on a dark background. Station dots pulse.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const LINES = [
  {
    color: "#ff00aa",
    label: "DIGITAL ART",
    path: "M 80 280 L 200 200 L 380 180 L 520 210 L 660 180",
    stops: [
      { x: 80,  y: 280, name: "Origins"    },
      { x: 200, y: 200, name: "Glitch Era" },
      { x: 380, y: 180, name: "Biomorphic" },
      { x: 520, y: 210, name: "Neon Phase" },
      { x: 660, y: 180, name: "Now"        },
    ],
  },
  {
    color: "#00ffee",
    label: "PHOTOGRAPHY",
    path: "M 140 420 L 260 360 L 380 340 L 500 370 L 680 310",
    stops: [
      { x: 140, y: 420, name: "Street"     },
      { x: 260, y: 360, name: "Portrait"   },
      { x: 380, y: 340, name: "NYC"        },
      { x: 500, y: 370, name: "Abstract"   },
      { x: 680, y: 310, name: "Archive"    },
    ],
  },
  {
    color: "#ccff00",
    label: "BRANDING",
    path: "M 220 480 L 340 420 L 460 400 L 580 430",
    stops: [
      { x: 220, y: 480, name: "Identity"   },
      { x: 340, y: 420, name: "Systems"    },
      { x: 460, y: 400, name: "Campaigns"  },
      { x: 580, y: 430, name: "Print"      },
    ],
  },
  {
    color: "#ffffff",
    label: "DEV / TOOLS",
    path: "M 300 160 L 380 180 L 380 340 L 380 420 L 380 500",
    stops: [
      { x: 300, y: 160, name: "Web"        },
      { x: 380, y: 340, name: "unavoide"   },
      { x: 380, y: 460, name: "Tools"      },
    ],
  },
];

export default function ConceptSubway() {
  const svgRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<SVGCircleElement[]>([]);
  const nameRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Animate paths drawing in
    const paths = svgRef.current.querySelectorAll(".map-line");
    paths.forEach(path => {
      const el = path as SVGPathElement;
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(el, {
        strokeDashoffset: 0,
        duration: 1.8,
        delay: 0.3,
        ease: "power2.inOut",
      });
    });

    // Pulse stop dots
    dotsRef.current.forEach((dot, i) => {
      gsap.to(dot, {
        r: 7,
        duration: 0.8,
        delay: 1.5 + i * 0.04,
        ease: "back.out(2)",
        from: { r: 0 },
      });
    });

    // Name + nav fade
    gsap.from([nameRef.current, navRef.current], {
      opacity: 0,
      duration: 0.8,
      delay: 1.2,
    });
  }, []);

  let dotIdx = 0;

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      background: "#050508",
      overflow: "hidden",
    }}>

      {/* Subtle grid — like a real map */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Map SVG */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 560"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 5,
        }}
        preserveAspectRatio="xMidYMid meet"
      >
        {LINES.map(line => (
          <g key={line.label}>
            <path
              className="map-line"
              d={line.path}
              stroke={line.color}
              strokeWidth={3.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.85}
            />
            {line.stops.map((stop, si) => {
              const idx = dotIdx++;
              return (
                <g key={si}>
                  <circle
                    ref={el => { if (el) dotsRef.current[idx] = el; }}
                    cx={stop.x}
                    cy={stop.y}
                    r={0}
                    fill={line.color}
                    stroke="#050508"
                    strokeWidth={2.5}
                    style={{ cursor: "pointer" }}
                  />
                  <text
                    x={stop.x}
                    y={stop.y - 14}
                    textAnchor="middle"
                    fill={line.color}
                    fontSize={9}
                    fontFamily="monospace"
                    letterSpacing={1}
                    opacity={0.7}
                  >{stop.name}</text>
                </g>
              );
            })}
          </g>
        ))}

        {/* Legend */}
        {LINES.map((line, i) => (
          <g key={line.label + "leg"}>
            <rect x={16} y={16 + i * 20} width={24} height={4} fill={line.color} rx={2} />
            <text x={46} y={22 + i * 20} fill={line.color} fontSize={9} fontFamily="monospace" letterSpacing={1} opacity={0.8}>
              {line.label}
            </text>
          </g>
        ))}

        {/* Central hub — where lines converge near 380,280 */}
        <circle cx={380} cy={250} r={12} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} />
        <circle cx={380} cy={250} r={4} fill="#fff" opacity={0.6} />
      </svg>

      {/* Name — center hub label */}
      <div ref={nameRef} style={{
        position: "absolute",
        left: "50%",
        top: "42%",
        transform: "translate(-50%, -50%)",
        zIndex: 15,
        textAlign: "center",
        pointerEvents: "none",
      }}>
        <h1 style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontWeight: 700,
          letterSpacing: "0.3em",
          color: "#fff",
          margin: 0,
          textTransform: "uppercase",
          textShadow: "0 0 30px rgba(255,255,255,0.3)",
        }}>ACADIA BERRY</h1>
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.55rem",
          letterSpacing: "0.25em",
          color: "#555",
          textTransform: "uppercase",
          marginTop: "0.3rem",
        }}>brooklyn, ny</p>
      </div>

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
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>08 / SUBWAY MAP</div>
    </div>
  );
}
