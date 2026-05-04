"use client";

/**
 * CONCEPT 4: TERMINAL
 *
 * Premise: The page is a command line. On load, commands type themselves out
 * in sequence — whoami, ls, cat about.txt — and the "output" is your portfolio.
 * Your art slowly materializes as a bleed behind the terminal text.
 * Nav is the last command: > connect
 *
 * Palette: neon green terminal on black, with your print colors bleeding through.
 */

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Line = { prompt: boolean; text: string; delay: number; isArt?: boolean };

const SEQUENCE: Line[] = [
  { prompt: true,  text: "whoami",                              delay: 400  },
  { prompt: false, text: "acadia berry",                        delay: 900  },
  { prompt: false, text: "",                                    delay: 1000 },
  { prompt: true,  text: "cat identity.txt",                    delay: 1300 },
  { prompt: false, text: "digital designer. photographer.",     delay: 1900 },
  { prompt: false, text: "brooklyn, ny. born from the noise.",  delay: 2100 },
  { prompt: false, text: "",                                    delay: 2300 },
  { prompt: true,  text: "ls ./work",                           delay: 2600 },
  { prompt: false, text: "digital-art/  photography/  branding/  tools/", delay: 3200 },
  { prompt: false, text: "",                                    delay: 3400 },
  { prompt: true,  text: "open portfolio",                      delay: 3700 },
  { prompt: false, text: "loading...",                          delay: 4100, isArt: true },
];

export default function ConceptTerminal() {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [artVisible, setArtVisible] = useState(false);
  const [cursor, setCursor] = useState(true);
  const termRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Blink cursor
    const blink = setInterval(() => setCursor(c => !c), 530);

    // Reveal lines on schedule
    SEQUENCE.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(i + 1);
        if (line.isArt) setTimeout(() => setArtVisible(true), 400);
        termRef.current?.scrollTo({ top: 9999, behavior: "smooth" });
      }, line.delay);
    });

    return () => clearInterval(blink);
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100vw",
      height: "100vh",
      background: "#000",
      overflow: "hidden",
    }}>

      {/* Art background — bleeds in after "open portfolio" */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(/prints/print2.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: artVisible ? 0.12 : 0,
        transition: "opacity 3s ease",
        mixBlendMode: "screen",
      }} />
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(/prints/print20.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: artVisible ? 0.07 : 0,
        transition: "opacity 4s ease 1s",
        mixBlendMode: "screen",
      }} />

      {/* Terminal window */}
      <div ref={termRef} style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "clamp(2rem, 6vw, 5rem)",
        fontFamily: "'Courier New', monospace",
        fontSize: "clamp(0.75rem, 1.6vw, 1rem)",
        lineHeight: 1.9,
        overflowY: "auto",
        zIndex: 10,
      }}>
        {SEQUENCE.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.6em",
          }}>
            {line.prompt && (
              <span style={{ color: "#ff00aa", userSelect: "none" }}>›</span>
            )}
            <span style={{
              color: line.prompt ? "#00ffee" : line.isArt ? "#ff00aa" : "#cccc99",
              letterSpacing: line.prompt ? "0.05em" : "0.02em",
            }}>
              {line.text}
              {/* Blinking cursor on last line */}
              {i === visibleLines - 1 && (
                <span style={{
                  display: "inline-block",
                  width: "0.55em",
                  height: "1em",
                  background: cursor ? "#00ffee" : "transparent",
                  marginLeft: "2px",
                  verticalAlign: "text-bottom",
                  transition: "background 0.1s",
                }} />
              )}
            </span>
          </div>
        ))}

        {/* Nav appears after art loads */}
        {artVisible && (
          <div style={{
            marginTop: "2.5rem",
            display: "flex",
            gap: "2rem",
            flexWrap: "wrap",
          }}>
            {["work", "about", "photography", "contact"].map(item => (
              <a key={item} href="#" style={{
                color: "#333",
                fontFamily: "monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.2em",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ff00aa")}
              onMouseLeave={e => (e.currentTarget.style.color = "#333")}>
                ./{item}
              </a>
            ))}
          </div>
        )}
      </div>

      <Link href="/" style={{ position: "absolute", top: "1.5rem", left: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333", textDecoration: "none" }}>← concepts</Link>
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", zIndex: 40, fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em", color: "#333" }}>04 / TERMINAL</div>
    </div>
  );
}
