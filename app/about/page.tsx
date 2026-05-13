"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, type Theme } from "../theme";

// ─── SVG canvas ────────────────────────────────────────────────────────────────
const VW = 540, VH = 860;

// ─── Junctions ─────────────────────────────────────────────────────────────────
const J1 = { x: 258, y: 305 };
const J2 = { x: 315, y: 510 };

// ─── Statements ────────────────────────────────────────────────────────────────
const STATEMENTS = [
  "unavoide started about seven years ago as a digital archive for my work. It's grown since then, but it's still the same project.",
  "Located in Brooklyn.",
  "After a few years, I went digital. More creative opportunities, less waste.",
  "I started with acrylic pouring and resin. Beautiful mediums, but a lot of plastic and a lot of chemicals. Going digital meant I could work anywhere, and produce less waste.",
  "Digital tools, photography, and whatever else a piece asks for. The shift opened up more than it closed.",
  "The whole process feels like wandering. A piece goes through dozens of iterations before something clicks and only then do I know it's worth sharing.",
  "Nothing ever feels done. What I share are snapshots: the moment the composition lands.",
  "The patterns of life; the macro to the micro.",
  "There are vast ranges of the light spectrum we can't see. Part of me believes the digital creations exist somewhere out there in the \"physical\".. whatever that means.",
  "They also remind me of emotions made visible. Messy, layered, complex.",
  "Or maybe the inside of a cell.",
  "It's not always pretty but it must be interesting.",
  "Does it fit within the programs of your mind?",
];

// ─── Terminal blob positions ───────────────────────────────────────────────────
// [x, y, rx, ry, rotDeg, junction("J1"|"J2"), bezierOffset]
const RAW: [number,number,number,number,number,"J1"|"J2",number][] = [
  [ 275,  72, 30, 21, -14, "J1",  18],
  [  88, 188, 33, 22,  11, "J1", -14],
  [ 472, 388, 26, 17, -12, "J1",  20],
  [ 440, 210, 27, 18, -20, "J1",  16],
  [  78, 370, 34, 23,   8, "J1", -18],
  [ 445, 328, 22, 15, -10, "J1",  22],
  [ 450, 462, 20, 13,  17, "J2", -10],
  [  92, 583, 34, 23,   5, "J2",  16],
  [ 175, 688, 29, 20,  -8, "J2", -20],
  [ 292, 728, 28, 19,  12, "J2",  15],
  [ 402, 700, 31, 20, -15, "J2", -12],
  [ 468, 612, 23, 16,  20, "J2",  18],
  [ 142, 750, 29, 20,   6, "J2", -16],
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function bcp(jx: number, jy: number, nx: number, ny: number, off: number) {
  const mx = (jx + nx) / 2, my = (jy + ny) / 2;
  const dx = nx - jx, dy = ny - jy;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  return { cpx: mx + (-dy / len) * off, cpy: my + (dx / len) * off };
}

function spikeRot(jx: number, jy: number, tx: number, ty: number) {
  return (Math.atan2(ty - jy, tx - jx) * 180) / Math.PI + 90;
}

// ─── Computed base nodes ────────────────────────────────────────────────────────
const JMAP = { J1, J2 };
const NODES = RAW.map(([x, y, rx, ry, rot, jk, off]) => {
  const j = JMAP[jk];
  return { x, y, rx, ry, rot, off, jk, jx: j.x, jy: j.y, ...bcp(j.x, j.y, x, y, off) };
});
const TRUNK = bcp(J1.x, J1.y, J2.x, J2.y, 28);

// ─── Theme ─────────────────────────────────────────────────────────────────────
function palette(theme: Theme) {
  if (theme === "light") return {
    pageBg:     "#f8f5f0",
    text:       "#160008",
    stroke:     "#0d0d0d",
    junction:   "#0d0d0d",
    blob:       "#5535d6",
    panel:      "rgba(255,255,255,0.97)",
    panelBorder:"rgba(0,0,0,0.08)",
    panelShadow:"0 -6px 32px rgba(0,0,0,0.09)",
    dim:        "rgba(0,0,0,0.3)",
  };
  if (theme === "mid") return {
    pageBg:     "#0e0005",
    text:       "#FFCCDB",
    stroke:     "#c0b0f0",
    junction:   "#c0b0f0",
    blob:       "#7c5ce4",
    panel:      "rgba(24,0,12,0.98)",
    panelBorder:"rgba(192,176,240,0.14)",
    panelShadow:"0 -6px 32px rgba(0,0,0,0.55)",
    dim:        "rgba(255,204,219,0.3)",
  };
  return {
    pageBg:     "#060002",
    text:       "#ffffff",
    stroke:     "#c8baf2",
    junction:   "#c8baf2",
    blob:       "#7c5ce4",
    panel:      "rgba(10,0,5,0.98)",
    panelBorder:"rgba(255,255,255,0.09)",
    panelShadow:"0 -6px 32px rgba(0,0,0,0.7)",
    dim:        "rgba(255,255,255,0.25)",
  };
}

// ─── Component ─────────────────────────────────────────────────────────────────
export default function About() {
  const { theme }             = useTheme();
  const p                     = palette(theme);
  const [open, setOpen]       = useState<number | null>(null);
  const [visited, setVisited] = useState<Set<number>>(new Set());

  // drag state
  const [offsets, setOffsets] = useState<{x:number;y:number}[]>(() => NODES.map(() => ({x:0,y:0})));
  const svgRef  = useRef<SVGSVGElement>(null);
  const dragRef = useRef<{ idx: number; startSvgX: number; startSvgY: number; origX: number; origY: number } | null>(null);
  const didDrag = useRef(false);

  function svgPt(clientX: number, clientY: number) {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const pt = svg.createSVGPoint();
    pt.x = clientX; pt.y = clientY;
    const m = svg.getScreenCTM();
    if (!m) return { x: 0, y: 0 };
    return pt.matrixTransform(m.inverse());
  }

  function startDrag(i: number, clientX: number, clientY: number) {
    const sp = svgPt(clientX, clientY);
    didDrag.current = false;
    dragRef.current = {
      idx: i,
      startSvgX: sp.x,
      startSvgY: sp.y,
      origX: NODES[i].x + offsets[i].x,
      origY: NODES[i].y + offsets[i].y,
    };
  }

  function moveDrag(clientX: number, clientY: number) {
    if (!dragRef.current) return;
    const { idx, startSvgX, startSvgY, origX, origY } = dragRef.current;
    const sp = svgPt(clientX, clientY);
    const dx = sp.x - startSvgX;
    const dy = sp.y - startSvgY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) didDrag.current = true;
    setOffsets(prev => {
      const next = [...prev];
      next[idx] = { x: origX - NODES[idx].x + dx, y: origY - NODES[idx].y + dy };
      return next;
    });
  }

  function endDrag() {
    dragRef.current = null;
  }

  // non-passive touchmove on SVG for drag
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    function onTouchMove(e: TouchEvent) {
      if (!dragRef.current) return;
      e.preventDefault();
      moveDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => el.removeEventListener("touchmove", onTouchMove);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (i: number) => {
    if (didDrag.current) return; // don't open if we just dragged
    if (open === i) { setOpen(null); return; }
    setOpen(i);
    setVisited(prev => new Set([...prev, i]));
  };

  // effective node positions
  const effNodes = NODES.map((n, i) => {
    const ex = n.x + offsets[i].x;
    const ey = n.y + offsets[i].y;
    const j  = JMAP[n.jk as "J1"|"J2"];
    return { ...n, x: ex, y: ey, ...bcp(j.x, j.y, ex, ey, n.off) };
  });

  const j1Spikes = [...effNodes.slice(0, 6).map(n => ({ tx: n.x, ty: n.y })), { tx: J2.x, ty: J2.y }];
  const j2Spikes = [...effNodes.slice(6).map(n => ({ tx: n.x, ty: n.y })), { tx: J1.x, ty: J1.y }];

  return (
    <main
      style={{
        minHeight: "100vh",
        paddingTop: "5rem",
        background: p.pageBg,
        color: p.text,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "background 0.3s, color 0.3s",
        position: "relative",
      }}
      onClick={e => {
        // close panel when tapping outside SVG area
        if ((e.target as HTMLElement).closest("svg") === null && open !== null) setOpen(null);
      }}
    >
      <Link href="/" style={{
        position: "fixed", top: "1.4rem", left: "1.4rem", zIndex: 200,
        fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase",
        color: p.dim, textDecoration: "none", transition: "color 0.2s",
        display: "flex", alignItems: "center", gap: "0.3em",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = p.text)}
      onMouseLeave={e => (e.currentTarget.style.color = p.dim)}
      >
        <span style={{color:"#caff3a"}}>←</span> back
      </Link>
      <style>{`
        @keyframes _prism {
          0%   { fill: rgba(100, 48,255,0.92); }
          16%  { fill: rgba( 48,148,255,0.88); }
          33%  { fill: rgba( 48,218,168,0.85); }
          50%  { fill: rgba(208,255, 48,0.82); }
          66%  { fill: rgba(255,148, 48,0.88); }
          83%  { fill: rgba(255, 48,148,0.90); }
          100% { fill: rgba(100, 48,255,0.92); }
        }
        .nd .bl {
          transform-box: fill-box;
          transform-origin: center;
          scale: 1;
          transition: scale 0.22s ease;
        }
        .nd:hover .bl { scale: 1.12; }
        .nd:focus { outline: none; }
        .nd.vis .bl,
        .nd.vis .root { animation: _prism 7s linear var(--pd, 0s) infinite; }
        .nd-hit { cursor: grab; }
        .nd-hit:active { cursor: grabbing; }
        @keyframes _soft-flash {
          0%, 100% { opacity: 0.28; }
          50%       { opacity: 0.6;  }
        }
        .explore-hint {
          animation: _soft-flash 3.2s ease-in-out infinite;
        }
        @keyframes _glow-pulse {
          0%, 100% { opacity: 0.55; r: 44px; }
          50%       { opacity: 0.9;  r: 56px; }
        }
        .nd-glow { animation: _glow-pulse 1.6s ease-in-out infinite; }
      `}</style>

      <p className="explore-hint" style={{
        fontFamily:    "'Violet Sans', sans-serif",
        fontSize:      "clamp(0.55rem, 2vw, 0.7rem)",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color:         p.text,
        margin:        "0 0 1rem",
        textAlign:     "center",
        pointerEvents: "none",
      }}>
        click a node
      </p>

      {/* SVG map */}
      <div style={{
        width: "100%",
        maxWidth: `min(${VW}px, calc((100vh - 14rem) * ${VW} / ${VH}))`,
        margin: "0 auto",
        padding: "0 1rem",
        boxSizing: "border-box",
      }}>
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VW} ${VH}`}
          width="100%"
          height="auto"
          style={{ display: "block", overflow: "visible", touchAction: "none" }}
          aria-label="Interactive fragment map"
          onMouseMove={e => moveDrag(e.clientX, e.clientY)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchEnd={endDrag}
        >
          <defs>
            {/* junction ink splat — heavy blur/threshold */}
            <filter id="ink" x="-70%" y="-70%" width="240%" height="240%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="9" result="b"/>
              <feColorMatrix in="b" mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -12"/>
            </filter>
            {/* root tips — softer blur so tendrils stay distinct */}
            <filter id="root" x="-60%" y="-60%" width="220%" height="220%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="5" result="b"/>
              <feColorMatrix in="b" mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"/>
            </filter>
          </defs>

          {/* branch lines */}
          <g stroke={p.stroke} strokeWidth="1.5" fill="none" strokeLinecap="round">
            {effNodes.slice(0, 6).map((n, i) => (
              <path key={i} d={`M${n.jx},${n.jy} Q${n.cpx},${n.cpy} ${n.x},${n.y}`}/>
            ))}
            <path d={`M${J1.x},${J1.y} Q${TRUNK.cpx},${TRUNK.cpy} ${J2.x},${J2.y}`}/>
            {effNodes.slice(6).map((n, i) => (
              <path key={i + 6} d={`M${n.jx},${n.jy} Q${n.cpx},${n.cpy} ${n.x},${n.y}`}/>
            ))}
          </g>

          {/* junction J1 */}
          <g filter="url(#ink)" fill={p.junction} pointerEvents="none">
            <circle cx={J1.x} cy={J1.y} r={14}/>
            {j1Spikes.map((s, i) => (
              <ellipse key={i} cx={J1.x} cy={J1.y} rx={5} ry={25}
                transform={`rotate(${spikeRot(J1.x, J1.y, s.tx, s.ty)},${J1.x},${J1.y})`}/>
            ))}
          </g>

          {/* junction J2 */}
          <g filter="url(#ink)" fill={p.junction} pointerEvents="none">
            <circle cx={J2.x} cy={J2.y} r={14}/>
            {j2Spikes.map((s, i) => (
              <ellipse key={i} cx={J2.x} cy={J2.y} rx={5} ry={25}
                transform={`rotate(${spikeRot(J2.x, J2.y, s.tx, s.ty)},${J2.x},${J2.y})`}/>
            ))}
          </g>

          {/* terminal root clusters */}
          {effNodes.map((n, i) => {
            const isVis    = visited.has(i);
            const isOpen   = open === i;
            const fill     = isVis ? undefined : p.blob;
            const opacity  = isOpen ? 1 : 0.82;

            // direction away from junction — this is where roots grow
            const toJDeg   = Math.atan2(n.jy - n.y, n.jx - n.x) * 180 / Math.PI + 90;
            const fromJDeg = toJDeg + 180;

            // vary count & spread per node so each cluster looks unique
            const fanCount  = i % 3 === 0 ? 5 : 4;
            const fanSpread = 42 + (i % 3) * 6; // 42–54°
            // tendril lengths: longer in centre, shorter at edges; per-node offset for variety
            const lenMid    = 130 + (i % 4) * 18; // 130–184
            const lenEdge   = 70  + (i % 3) * 12; // 70–94
            const rxMid     = 2.2 + (i % 2) * 0.3;
            const rxEdge    = 1.0;

            const roots = Array.from({ length: fanCount }, (_, ri) => {
              const t      = fanCount <= 1 ? 0.5 : ri / (fanCount - 1); // 0..1
              const dAngle = -fanSpread + t * fanSpread * 2;
              // bell-ish length curve: max at centre
              const bell   = 1 - Math.pow((t - 0.5) * 2, 2) * 0.55;
              const ry     = lenEdge + (lenMid - lenEdge) * bell;
              const rx     = rxEdge + (rxMid - rxEdge) * bell;
              // SVG rotate(a) "top-tip" unit vector: (sin a, -cos a)
              const aRad   = (fromJDeg + dAngle) * Math.PI / 180;
              const offset = ry * 0.52; // shift centre outward so more extends away
              return {
                cx:  n.x + offset * Math.sin(aRad),
                cy:  n.y - offset * Math.cos(aRad),
                rx, ry,
                rot: fromJDeg + dAngle,
              };
            });

            return (
              <g key={i} style={{ "--pd": `${(i * 0.58).toFixed(2)}s` } as React.CSSProperties}>
                {/* soft glow bloom when selected */}
                {isOpen && (
                  <circle
                    cx={n.x} cy={n.y} r={50}
                    fill={p.blob}
                    opacity={0.09}
                    pointerEvents="none"
                    className=""
                    style={{ filter: "blur(18px)" }}
                  />
                )}

                {/* root tendrils */}
                <g
                  className={`nd${isVis ? " vis" : ""}`}
                  filter="url(#root)"
                  pointerEvents="none"
                >
                  {/* small base knot where branch meets roots */}
                  <circle className="bl" cx={n.x} cy={n.y} r={7} style={{ fill, opacity }}/>
                  {roots.map((r, ri) => (
                    <ellipse
                      key={ri}
                      className="root"
                      cx={r.cx} cy={r.cy}
                      rx={r.rx} ry={r.ry}
                      transform={`rotate(${r.rot},${r.cx},${r.cy})`}
                      style={{ fill, opacity }}
                    />
                  ))}
                </g>

                {/* transparent hit area */}
                <circle
                  cx={n.x} cy={n.y} r={42}
                  fill="transparent"
                  className="nd-hit"
                  role="button"
                  tabIndex={0}
                  aria-expanded={isOpen}
                  aria-label={`fragment ${i + 1}`}
                  onClick={() => toggle(i)}
                  onKeyDown={e => { if (e.key === "Enter" || e.key === " ") toggle(i); }}
                  onMouseDown={e => { e.preventDefault(); startDrag(i, e.clientX, e.clientY); }}
                  onTouchStart={e => startDrag(i, e.touches[0].clientX, e.touches[0].clientY)}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* ── Bottom panel — always on screen ── */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            key={open}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:   "fixed",
              bottom:     0,
              left:       0,
              right:      0,
              zIndex:     100,
              background: p.panel,
              borderTop:  `1px solid ${p.panelBorder}`,
              boxShadow:  p.panelShadow,
              padding:    "1.25rem 1.5rem 2rem",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* close pip */}
            <div
              onClick={() => setOpen(null)}
              style={{
                width: 36, height: 4,
                borderRadius: 2,
                background: p.dim,
                margin: "0 auto 1rem",
                cursor: "pointer",
              }}
            />
            <p style={{
              fontFamily:    "'Violet Sans', sans-serif",
              fontSize:      "clamp(0.85rem, 3.5vw, 1rem)",
              lineHeight:    1.7,
              color:         p.text,
              margin:        0,
              letterSpacing: "0.01em",
              maxWidth:      560,
              marginInline:  "auto",
            }}>
              {STATEMENTS[open]}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
