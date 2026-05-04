"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const PRINT = "/prints/print2.webp";

const WORK_PREVIEW = [
  { slug: "signal-fm",   label: "SIGNAL FM",     sub: "Radio identity",        img: "/prints/print11.webp" },
  { slug: "vanta",       label: "VANTA",          sub: "Nightclub brand",       img: "/prints/print21.webp" },
  { slug: "hollow",      label: "HOLLOW",         sub: "Cold brew café",        img: "/prints/print17.webp" },
  { slug: "biome",       label: "BIOME",          sub: "Organic neon series",   img: "/prints/print4.webp"  },
];

const DISCIPLINES = ["Digital Designer", "Artist", "Developer", "Creative Director", "Brooklyn, NY"];

const CLI_LINES = [
  { type: "cmd",  text: "name" },
  { type: "out",  text: "Acadia Berry" },
  { type: "gap",  text: "" },
  { type: "cmd",  text: "location" },
  { type: "out",  text: "Brooklyn, New York" },
  { type: "gap",  text: "" },
  { type: "cmd",  text: "occupation" },
  { type: "out",  text: "Designer, Artist, Developer" },
  { type: "gap",  text: "" },
  { type: "cmd",  text: "specialties" },
  { type: "out",  text: "UI Design" },
  { type: "out",  text: "Creative Direction" },
  { type: "out",  text: "Brand Identity" },
  { type: "out",  text: "Digital Art" },
  { type: "out",  text: "Photography" },
  { type: "out",  text: "Generative AI" },
  { type: "out",  text: "Web Development" },
  { type: "gap",  text: "" },
  { type: "cmd",  text: "projects" },
  { type: "out",  text: "Signal FM — radio identity" },
  { type: "out",  text: "Vanta — nightclub brand" },
  { type: "out",  text: "Hollow — cold brew café" },
  { type: "out",  text: "Silt — fashion label" },
  { type: "out",  text: "Biome — digital art series" },
  { type: "out",  text: "unavoide.com — tools platform" },
];

export default function Home() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const turbRef     = useRef<SVGFETurbulenceElement>(null);
  const dispRef     = useRef<SVGFEDisplacementMapElement>(null);
  const mouseRef    = useRef({ x: -9999, y: -9999 });
  const rafRef      = useRef<number>(0);
  const [ready, setReady]   = useState(false);
  const [mobile, setMobile] = useState(false);
  const [tickIdx, setTickIdx] = useState(0);
  const [cliVisible, setCliVisible] = useState<number>(0); // how many lines shown
  const [cliChar, setCliChar]   = useState<number>(0);     // chars typed on current line
  const [blink, setBlink]       = useState(true);

  // Ticker animation
  useEffect(() => {
    const id = setInterval(() => setTickIdx(i => (i + 1) % DISCIPLINES.length), 2200);
    return () => clearInterval(id);
  }, []);

  // Cursor blink
  useEffect(() => {
    const id = setInterval(() => setBlink(b => !b), 530);
    return () => clearInterval(id);
  }, []);

  // CLI typewriter loop
  useEffect(() => {
    let lineIdx = 0, charIdx = 0;
    let tid: ReturnType<typeof setTimeout>;

    const step = () => {
      const line = CLI_LINES[lineIdx];
      if (!line) {
        // restart after pause
        tid = setTimeout(() => { lineIdx = 0; charIdx = 0; setCliVisible(0); setCliChar(0); step(); }, 1800);
        return;
      }
      if (line.type === "gap") {
        setCliVisible(lineIdx + 1);
        lineIdx++;
        charIdx = 0;
        tid = setTimeout(step, 120);
        return;
      }
      if (line.type === "out") {
        // output appears instantly
        setCliVisible(lineIdx + 1);
        lineIdx++;
        charIdx = 0;
        tid = setTimeout(step, line.text === "Done. ✓" ? 900 : 80);
        return;
      }
      // cmd: type char by char
      if (charIdx <= line.text.length) {
        setCliVisible(lineIdx + 1);
        setCliChar(charIdx);
        charIdx++;
        tid = setTimeout(step, charIdx === 0 ? 400 : 55);
      } else {
        // done typing this cmd line
        lineIdx++;
        charIdx = 0;
        setCliChar(0);
        tid = setTimeout(step, 220);
      }
    };

    tid = setTimeout(step, 800);
    return () => clearTimeout(tid);
  }, []);

  useEffect(() => {
    const mob = window.innerWidth < 768;
    setMobile(mob);

    if (mob) {
      const turb = turbRef.current;
      const disp = dispRef.current;
      if (!turb || !disp) return;
      let tx = 0.5, ty = 0.5, cx = 0.5, cy = 0.5, t = 0;
      const onTouch = (e: TouchEvent) => {
        tx = e.touches[0].clientX / window.innerWidth;
        ty = e.touches[0].clientY / window.innerHeight;
      };
      window.addEventListener("touchmove", onTouch, { passive: true });
      const tick = () => {
        t += 0.006; cx += (tx - cx) * 0.05; cy += (ty - cy) * 0.05;
        turb.setAttribute("baseFrequency", `${(0.006 + cx * 0.01).toFixed(4)} ${(0.009 + cx * 0.01).toFixed(4)}`);
        disp.setAttribute("scale", (14 + cy * 28 + Math.sin(t) * 3).toFixed(1));
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
      setReady(true);
      return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("touchmove", onTouch); };
    } else {
      const canvas   = canvasRef.current!;
      const bgCanvas = bgCanvasRef.current!;
      const ctx      = canvas.getContext("2d")!;
      const bgCtx    = bgCanvas.getContext("2d")!;
      const SCALE    = 0.45;
      let w = 0, h = 0;

      const img = new Image();
      const drawBg = () => {
        if (!img.complete) return;
        const bw = bgCanvas.width, bh = bgCanvas.height;
        bgCtx.fillStyle = "#000"; bgCtx.fillRect(0, 0, bw, bh);
        bgCtx.globalAlpha = 0.88; bgCtx.drawImage(img, 0, 0, bw, bh); bgCtx.globalAlpha = 1;
      };

      const setup = () => {
        const container = canvas.parentElement!;
        w = container.clientWidth; h = container.clientHeight;
        canvas.width = w; canvas.height = h;
        bgCanvas.width = Math.ceil(w * SCALE); bgCanvas.height = Math.ceil(h * SCALE);
        drawBg();
      };

      img.onload = () => { drawBg(); setReady(true); };
      img.src = PRINT;
      setup();
      window.addEventListener("resize", setup);

      const container = canvas.parentElement!;
      const onMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };
      container.addEventListener("mousemove", onMove);

      const RADIUS = 200, STR = 40;
      const tmp = document.createElement("canvas");

      const draw = () => {
        if (!img.complete) { rafRef.current = requestAnimationFrame(draw); return; }
        const bw = bgCanvas.width, bh = bgCanvas.height;
        const bgData = bgCtx.getImageData(0, 0, bw, bh);
        const src = bgData.data;
        const out = new ImageData(bw, bh); const dst = out.data;
        const mx = mouseRef.current.x * SCALE, my = mouseRef.current.y * SCALE;
        const r = RADIUS * SCALE, str = STR * SCALE;
        for (let y = 0; y < bh; y++) {
          for (let x = 0; x < bw; x++) {
            const dx = x - mx, dy = y - my;
            const d = Math.sqrt(dx * dx + dy * dy);
            let sx = x, sy = y;
            if (d < r && d > 0) { const f = 1 - d / r; sx = x - (dx / d) * str * f * f; sy = y - (dy / d) * str * f * f; }
            sx = Math.max(0, Math.min(bw - 1, Math.round(sx)));
            sy = Math.max(0, Math.min(bh - 1, Math.round(sy)));
            const si = (sy * bw + sx) * 4, di = (y * bw + x) * 4;
            dst[di] = src[si]; dst[di+1] = src[si+1]; dst[di+2] = src[si+2]; dst[di+3] = src[si+3];
          }
        }
        tmp.width = bw; tmp.height = bh;
        tmp.getContext("2d")!.putImageData(out, 0, 0);
        ctx.clearRect(0, 0, w, h); ctx.drawImage(tmp, 0, 0, w, h);
        rafRef.current = requestAnimationFrame(draw);
      };
      draw();

      return () => {
        cancelAnimationFrame(rafRef.current);
        window.removeEventListener("resize", setup);
        container.removeEventListener("mousemove", onMove);
      };
    }
  }, []);

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", cursor: mobile ? "default" : "none" }}>

      {/* ── HERO ── */}
      <section style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
        gridTemplateRows: mobile ? "auto auto" : "1fr",
      }}>

        {/* Left: name top + CLI bottom 2/3 */}
        <div style={{
          display: "flex", flexDirection: "column",
          padding: mobile ? "7rem 1.5rem 2.5rem" : "0",
          borderRight: mobile ? "none" : "1px solid #111",
          position: "relative",
          height: mobile ? "auto" : "100vh",
          overflow: "hidden",
        }}>
          {/* Top 1/3: name block */}
          <div style={{
            padding: mobile ? "0 0 2rem" : "8rem 3rem 2rem",
            flex: mobile ? "none" : "0 0 33%",
            display: "flex", flexDirection: "column", justifyContent: "flex-end",
          }}>
            <p style={{
              fontFamily: "monospace", fontSize: "0.52rem",
              letterSpacing: "0.35em", color: "#333",
              textTransform: "uppercase", marginBottom: "1rem",
            }}>
              Portfolio · 2026
            </p>
            <h1 style={{
              fontFamily: "'Zen Dots', sans-serif",
              fontSize: mobile ? "clamp(2.2rem, 11vw, 5rem)" : "clamp(2rem, 4.2vw, 4.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 0.86,
              margin: 0,
              textTransform: "uppercase",
            }}>
              ACADIA BERRY
            </h1>
          </div>

          {/* Bottom 2/3: CLI terminal */}
          <div style={{
            flex: mobile ? "none" : 1,
            background: "#000",
            borderTop: "1px solid #111",
            padding: mobile ? "1.5rem 0 0" : "1.5rem 3rem 3rem",
            fontFamily: "'Courier New', Courier, monospace",
            fontSize: mobile ? "0.7rem" : "0.72rem",
            lineHeight: 1.7,
            overflowY: "hidden",
            display: "flex", flexDirection: "column",
            justifyContent: "flex-start",
          }}>
            {CLI_LINES.slice(0, cliVisible).map((line, i) => {
              const isLastLine = i === cliVisible - 1;
              if (line.type === "gap") return <div key={i} style={{ height: "0.5em" }} />;
              if (line.type === "cmd") {
                const displayed = isLastLine ? line.text.slice(0, cliChar) : line.text;
                return (
                  <div key={i} style={{ color: "#fff", display: "flex", alignItems: "center" }}>
                    <span style={{ color: "#ff00aa", marginRight: "0.5em", userSelect: "none" }}>$</span>
                    <span>{displayed}</span>
                    {isLastLine && (
                      <span style={{
                        display: "inline-block", width: "0.55em", height: "1em",
                        background: blink ? "#ff00aa" : "transparent",
                        marginLeft: "1px", verticalAlign: "text-bottom",
                        transition: "background 0.1s",
                      }} />
                    )}
                  </div>
                );
              }
              return (
                <div key={i} style={{ color: "#555", paddingLeft: "1.2em" }}>
                  {line.text}
                </div>
              );
            })}
            {/* cursor when idle at end */}
            {cliVisible === 0 && (
              <div style={{ color: "#fff", display: "flex", alignItems: "center" }}>
                <span style={{ color: "#ff00aa", marginRight: "0.5em" }}>$</span>
                <span style={{
                  display: "inline-block", width: "0.55em", height: "1em",
                  background: blink ? "#ff00aa" : "transparent",
                  verticalAlign: "text-bottom",
                }} />
              </div>
            )}
          </div>
        </div>

        {/* Right: fluid lens */}
        <div style={{
          position: "relative",
          height: mobile ? "60vw" : "100vh",
          overflow: "hidden",
          background: "#000",
          minHeight: mobile ? 260 : undefined,
        }}>
          {mobile && (
            <>
              <svg style={{ display: "none" }}>
                <defs>
                  <filter id="liquid" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                    <feTurbulence ref={turbRef} type="turbulence" baseFrequency="0.008 0.011" numOctaves="3" seed="7" result="noise" />
                    <feDisplacementMap ref={dispRef} in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
                  </filter>
                </defs>
              </svg>
              <div style={{ position: "absolute", inset: 0, filter: "url(#liquid)", willChange: "filter" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={PRINT} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
            </>
          )}
          {!mobile && (
            <>
              <canvas ref={bgCanvasRef} style={{ display: "none" }} />
              <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, display: "block", width: "100%", height: "100%" }} />
            </>
          )}

          {/* Tag overlay */}
          <div style={{
            position: "absolute", top: "1.5rem", left: "1.5rem",
            fontFamily: "monospace", fontSize: "0.45rem",
            letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
            opacity: ready ? 1 : 0, transition: "opacity 1.5s ease",
            pointerEvents: "none",
          }}>
            Digital Art · unavoide.com
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div style={{
        borderTop: "1px solid #111", borderBottom: "1px solid #111",
        overflow: "hidden", whiteSpace: "nowrap",
        padding: "0.9rem 0",
        background: "#000",
      }}>
        <div style={{
          display: "inline-block",
          animation: "marquee 28s linear infinite",
          fontFamily: "monospace", fontSize: "0.52rem",
          letterSpacing: "0.3em", color: "#222",
          textTransform: "uppercase",
        }}>
          {Array(6).fill("UI Design · Creative Direction · Digital Art · Brand Identity · Photography · Generative AI · Website Development · Brooklyn, NY · Available for Hire · ✹ ").join("")}
        </div>
        <style>{`@keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }`}</style>
      </div>

      {/* ── WORK PREVIEW ── */}
      <section style={{ padding: mobile ? "3rem 1.5rem" : "5rem 3rem", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.35em", color: "#ff00aa", textTransform: "uppercase", margin: 0 }}>
            Selected Work
          </p>
          <Link href="/work" style={{
            fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.2em",
            color: "#333", textDecoration: "none", textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "#333")}>
            ALL WORK →
          </Link>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)",
          gap: "1px", background: "#111",
        }}>
          {WORK_PREVIEW.map(p => (
            <Link key={p.slug} href={`/work/${p.slug}`} style={{
              display: "block", background: "#000",
              textDecoration: "none", position: "relative",
              overflow: "hidden", aspectRatio: "3/4",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.img} alt={p.label} style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: "brightness(0.55)",
                transition: "filter 0.5s, transform 0.5s",
              }}
              onMouseEnter={e => { e.currentTarget.style.filter = "brightness(0.85)"; e.currentTarget.style.transform = "scale(1.04)"; }}
              onMouseLeave={e => { e.currentTarget.style.filter = "brightness(0.55)"; e.currentTarget.style.transform = "scale(1)"; }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)",
                padding: "1rem", display: "flex", flexDirection: "column",
                justifyContent: "flex-end", pointerEvents: "none",
              }}>
                <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "0.85rem", fontWeight: 900, color: "#fff", margin: "0 0 0.2rem", textTransform: "uppercase" }}>{p.label}</p>
                <p style={{ fontFamily: "monospace", fontSize: "0.45rem", color: "rgba(255,255,255,0.4)", margin: 0, letterSpacing: "0.1em" }}>{p.sub}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section style={{
        borderTop: "1px solid #111",
        padding: mobile ? "3rem 1.5rem" : "5rem 3rem",
        maxWidth: 1200, margin: "0 auto",
      }}>
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: mobile ? "clamp(1.3rem, 5vw, 2rem)" : "clamp(1.5rem, 3vw, 2.5rem)",
          lineHeight: 1.5, color: "#555",
          fontStyle: "italic",
          maxWidth: 800,
          borderLeft: "2px solid #ff00aa",
          paddingLeft: "1.5rem",
          margin: 0,
        }}>
          "Appreciator of life. I notice things. I make things. Sometimes they're the same thing."
        </p>
        <div style={{ marginTop: "2rem" }}>
          <Link href="/about" style={{
            fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.2em",
            color: "#333", textDecoration: "none", textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = "#333")}>
            ABOUT ACADIA →
          </Link>
        </div>
      </section>

      {/* ── PLAY + SHOP STRIP ── */}
      <section style={{
        borderTop: "1px solid #111",
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
      }}>
        {/* Play */}
        <div style={{
          padding: mobile ? "2.5rem 1.5rem" : "3.5rem 3rem",
          borderRight: mobile ? "none" : "1px solid #111",
          borderBottom: mobile ? "1px solid #111" : "none",
        }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.35em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "1rem" }}>Play</p>
          <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 0.8rem", lineHeight: 1 }}>
            8 FREE TOOLS
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.7, marginBottom: "1.8rem", maxWidth: 360 }}>
            Kaleidoscope, pixel editor, generative art, digital rain — all browser-based, all free, all built from scratch since 2018.
          </p>
          <Link href="/play" style={{
            fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
            color: "#333", textDecoration: "none", textTransform: "uppercase",
            border: "1px solid #1a1a1a", padding: "0.8rem 1.5rem",
            display: "inline-flex", alignItems: "center", minHeight: 44,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#333"; e.currentTarget.style.borderColor = "#1a1a1a"; }}>
            EXPLORE TOOLS →
          </Link>
        </div>

        {/* Shop */}
        <div style={{ padding: mobile ? "2.5rem 1.5rem" : "3.5rem 3rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.52rem", letterSpacing: "0.35em", color: "#ff00aa", textTransform: "uppercase", marginBottom: "1rem" }}>Shop</p>
          <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 0.8rem", lineHeight: 1 }}>
            PRINTS + BOOKS
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#444", lineHeight: 1.7, marginBottom: "1.8rem", maxWidth: 360 }}>
            60+ digital art prints on Etsy. Three books in production — travel photography, coloring book, print collection.
          </p>
          <Link href="/shop" style={{
            fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
            color: "#333", textDecoration: "none", textTransform: "uppercase",
            border: "1px solid #1a1a1a", padding: "0.8rem 1.5rem",
            display: "inline-flex", alignItems: "center", minHeight: 44,
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#333"; e.currentTarget.style.borderColor = "#1a1a1a"; }}>
            VISIT SHOP →
          </Link>
        </div>
      </section>

      {/* ── FOOTER STRIP ── */}
      <footer style={{
        borderTop: "1px solid #111",
        padding: mobile ? "2rem 1.5rem" : "2rem 3rem",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "1rem",
      }}>
        <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.25em", color: "#222", textTransform: "uppercase" }}>
          © 2026 ACADIA · Brooklyn, NY
        </span>
        <span style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.25em", color: "#222", textTransform: "uppercase" }}>
          acadiaberry.com
        </span>
      </footer>
    </div>
  );
}
