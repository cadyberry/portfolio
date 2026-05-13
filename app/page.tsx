"use client";

import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

const TABS = [
  { num: "01", name: "creative tools", href: "/creative-tools",              external: false, desc: "browser-based design & art tools"        },
  { num: "02", name: "shop",            href: "/shop",                         external: false, desc: "prints, goods, and digital downloads"                  },
  { num: "03", name: "music",           href: "/work/audio",                   external: false, desc: "singles i produced"                                    },
  { num: "04", name: "github",          href: "/github",                       external: false, desc: "open source projects and experiments"                  },
  { num: "05", name: "art",             href: "/work/biome",                   external: false, desc: "original mixed-media artwork"                          },
  { num: "06", name: "about",           href: "/about",                        external: false, desc: "background, process, and philosophy"                   },
  { num: "07", name: "contact",         href: "/contact",                      external: false, desc: "interested in working together?"                         },
];

const TAB  = 22;
const R    = 32;
const STEP = 360 / TABS.length;

function vibrate() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(5);
}

function getActive(rot: number) {
  const raw = Math.round((180 - rot) / STEP);
  return ((raw % TABS.length) + TABS.length) % TABS.length;
}

export default function Home() {
  const rotRef        = useRef(0);
  const [rot, setRot] = useState(0);
  const stepRef       = useRef(0);
  const lastY         = useRef(0);
  const lastT         = useRef(0);
  const velRef        = useRef(0);
  const rafRef        = useRef<number>(0);
  const containerRef  = useRef<HTMLDivElement>(null);
  const scrollTickRef = useRef(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("spin-hint-seen")) setShowHint(true);
  }, []);

  const activeIdx = getActive(rot);

  const updateRot = useCallback((r: number) => {
    const step = Math.round(r / STEP);
    if (step !== stepRef.current) {
      stepRef.current = step;
      vibrate();
    }
    rotRef.current = r;
    setRot(r);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    function onStart(e: TouchEvent) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastY.current       = e.touches[0].clientY;
      lastT.current       = Date.now();
      velRef.current      = 0;
      scrollTickRef.current = 0;
      localStorage.setItem("spin-hint-seen", "1");
      setShowHint(false);
    }
    function onMove(e: TouchEvent) {
      e.preventDefault();
      const y  = e.touches[0].clientY;
      const dy = y - lastY.current;
      const dt = Math.max(Date.now() - lastT.current, 1);
      velRef.current = dy / dt;
      const dRot = Math.abs(dy * 0.55);
      scrollTickRef.current += dRot;
      if (scrollTickRef.current >= 8) {
        scrollTickRef.current %= 8;
        const speed = Math.abs(velRef.current);
        const ms = Math.min(Math.max(Math.round(speed * 30), 1), 5);
        if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(ms);
      }
      lastY.current  = y;
      lastT.current  = Date.now();
      updateRot(rotRef.current + dy * 0.55);
    }
    function onEnd() {
      let v = velRef.current * 0.55 * 16;
      function coast() {
        v *= 0.88;
        if (Math.abs(v) < 0.4) {
          const snapped = Math.round(rotRef.current / STEP) * STEP;
          rotRef.current = snapped;
          setRot(snapped);
          return;
        }
        updateRot(rotRef.current + v);
        rafRef.current = requestAnimationFrame(coast);
      }
      rafRef.current = requestAnimationFrame(coast);
    }

    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove",  onMove,  { passive: false });
    el.addEventListener("touchend",   onEnd,   { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove",  onMove);
      el.removeEventListener("touchend",   onEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateRot]);

  return (
    <div className="home-wrap">
      <style>{`
        .orbit-wrap { background: var(--bg); position: relative; }
        .orbit-tab {
          position: absolute;
          display: flex; align-items: center; justify-content: center;
          background: #ffffff;
          border-radius: clamp(22px, 7vw, 36px);
          text-decoration: none;
          transition: opacity 0.15s ease, box-shadow 0.2s ease, transform 0.2s ease;
          user-select: none; -webkit-user-select: none;
        }
        .orbit-tab.active {
          box-shadow: 0 0 0 2.5px var(--accent);
          transform: scale(1.08);
        }
        .orbit-tab:hover { opacity: 0.78; }
        .orbit-tab-name {
          font-size: clamp(0.38rem, 2.2vw, 0.58rem);
          font-weight: 400; letter-spacing: -0.01em;
          color: #000; text-align: center; line-height: 1.2;
          padding: 0 10%; pointer-events: none;
        }
        html.light .orbit-tab { background: #000; }
        html.light .orbit-tab-name { color: #fff; }
        html.light .orbit-tab.active { box-shadow: 0 0 0 2.5px var(--accent); }

        @keyframes _hint-bob {
          0%, 100% { transform: translateY(-50%) translateX(0);    opacity: 0.5; }
          50%       { transform: translateY(-50%) translateX(-6px); opacity: 0.9; }
        }
        @keyframes _hint-fade {
          from { opacity: 1; } to { opacity: 0; }
        }
        .spin-hint {
          position: fixed;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          animation: _hint-bob 1.6s ease-in-out infinite;
          pointer-events: none;
          white-space: nowrap;
          z-index: 100;
        }
        .spin-hint.hide {
          animation: _hint-fade 0.4s ease forwards;
        }
        .spin-hint-arrows {
          font-size: 0.7rem;
          color: var(--text-dim);
          line-height: 1;
        }
        .spin-hint-label {
          font-size: 0.38rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-dim);
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        @keyframes _desc-in {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .orbit-desc {
          animation: _desc-in 0.22s ease forwards;
        }

        /* bottom indicator pip */
        .orbit-pip {
          position: absolute;
          left: 50%; bottom: -10px;
          transform: translateX(-50%);
          width: 5px; height: 5px;
          border-radius: 50%;
          background: var(--accent);
        }
      `}</style>

      <div style={{ padding: "2.5rem 1.4rem 2rem", textAlign: "center" }}>
        <h1 className="home-wordmark">acadia berry</h1>
        <p className="home-tagline">designer · artist · technologist · NYC</p>
      </div>

      {/* Circle */}
      <div ref={containerRef} className="orbit-wrap" style={{
        width: "min(76vw, 76vh, 380px)",
        aspectRatio: "1",
        margin: "0 auto",
        touchAction: "none",
      }}>
        {/* Bottom indicator pip */}
        <div className="orbit-pip" />

        {TABS.map((t, i) => {
          const angleDeg = (i * STEP) - 90 + rot;
          const angleRad = angleDeg * Math.PI / 180;
          const cx = 50 + R * Math.cos(angleRad);
          const cy = 50 + R * Math.sin(angleRad);
          const isActive = i === activeIdx;
          const style: React.CSSProperties = {
            left: `${cx - TAB / 2}%`, top: `${cy - TAB / 2}%`,
            width: `${TAB}%`, height: `${TAB}%`,
          };
          const inner = <span className="orbit-tab-name">{t.name}</span>;
          return t.external
            ? <a key={t.num} href={t.href} target="_blank" rel="noopener noreferrer"
                 className={`orbit-tab${isActive ? " active" : ""}`} style={style}>{inner}</a>
            : <Link key={t.num} href={t.href}
                    className={`orbit-tab${isActive ? " active" : ""}`} style={style}>{inner}</Link>;
        })}
      </div>

      {/* First-visit swipe hint — fixed to right edge */}
      {showHint && (
        <div className="spin-hint">
          <span className="spin-hint-arrows">←</span>
          <span className="spin-hint-label">spin</span>
        </div>
      )}

      {/* Live description */}
      <div style={{ textAlign: "center", padding: "1.2rem 2rem 0", minHeight: "3rem" }}>
        <p
          key={activeIdx}
          className="orbit-desc"
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.04em",
            color: "var(--text-dim)",
            textTransform: "lowercase",
            margin: 0,
          }}
        >
          {TABS[activeIdx].desc}
        </p>
      </div>

      <div style={{
        padding: "1rem 1.4rem 2rem",
        borderTop: "1px solid var(--border)",
        marginTop: "auto",
        fontSize: "0.44rem",
        letterSpacing: "0.22em",
        color: "var(--text-dim)",
        textTransform: "lowercase",
        display: "flex",
        justifyContent: "space-between",
      }}>
        <span>available for hire · 2026</span>
        <span>brooklyn, ny</span>
      </div>
    </div>
  );
}
