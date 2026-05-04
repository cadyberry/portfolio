"use client";
import Link from "next/link";
import { useState } from "react";

const LOOKS = [
  {
    id: 1,
    name: "DRIFT COAT",
    sub: "Oversized linen duster",
    price: 380,
    sizes: ["XS", "S", "M", "L", "XL"],
    img: "/prints/print31.webp",
    desc: "Stone-washed linen. Unstructured. Draped collar. Drops to ankle. Season-less.",
    colorway: "NATURAL · OBSIDIAN · DUSK",
  },
  {
    id: 2,
    name: "VOID TROUSER",
    sub: "Wide-leg relaxed fit",
    price: 220,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    img: "/prints/print17.webp",
    desc: "80% wool, 20% linen blend. Pleated front. Elastic waist. Deep side pockets.",
    colorway: "CHARCOAL · ECRU · CLAY",
  },
  {
    id: 3,
    name: "FIELD SHIRT",
    sub: "Oversized utility shirt",
    price: 165,
    sizes: ["S", "M", "L", "XL"],
    img: "/prints/print4.webp",
    desc: "Washed cotton-twill. Four pockets. Raw hem. Boxy, forward.",
    colorway: "SAND · BLACK · OLIVE",
  },
  {
    id: 4,
    name: "BASIN SLIP",
    sub: "Bias-cut dress",
    price: 295,
    sizes: ["XS", "S", "M", "L"],
    img: "/prints/print8.webp",
    desc: "Silk charmeuse. Barely there. Asymmetric hem. Moves like water.",
    colorway: "IVORY · SLATE · RUST",
  },
  {
    id: 5,
    name: "GROUND BOOT",
    sub: "Flat leather pull-on",
    price: 450,
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    img: "/prints/print21.webp",
    desc: "Full-grain leather. Pull-on silhouette. Flat heel. 16\" shaft. Lasting.",
    colorway: "TAN · BLACK · BROWN",
  },
  {
    id: 6,
    name: "STILL KNIT",
    sub: "Ribbed turtleneck",
    price: 185,
    sizes: ["XS", "S", "M", "L", "XL"],
    img: "/prints/print2.webp",
    desc: "100% merino. Dense rib. High neck. Intentionally heavy.",
    colorway: "CREAM · CHARCOAL · RUST",
  },
];

export default function Silt() {
  const [selected, setSelected] = useState(0);
  const [size, setSize] = useState<Record<number, string>>({});
  const [bag, setBag] = useState<number[]>([]);
  const [bagOpen, setBagOpen] = useState(false);

  const look = LOOKS[selected];
  const hasSize = !!size[look.id];
  const inBag = bag.includes(look.id);

  const addToBag = () => {
    if (!hasSize) return;
    setBag(prev => prev.includes(look.id) ? prev : [...prev, look.id]);
    setBagOpen(true);
  };

  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>

      {/* Header */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 2rem 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem", borderBottom: "1px solid #111", paddingBottom: "2rem", marginBottom: "3rem" }}>
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: "#333", textTransform: "uppercase", marginBottom: "0.4rem" }}>
              Brand Identity — Concept
            </p>
            <h1 style={{
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontSize: "clamp(3rem, 10vw, 6rem)",
              fontWeight: 900, letterSpacing: "-0.03em",
              margin: 0, lineHeight: 0.88, textTransform: "uppercase",
            }}>SILT</h1>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#444", marginTop: "0.5rem", fontStyle: "italic" }}>
              Independent fashion label · New York
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button onClick={() => setBagOpen(o => !o)} style={{
              fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.15em",
              color: bag.length > 0 ? "#fff" : "#333", background: "transparent",
              border: "1px solid #1a1a1a", padding: "0.7rem 1.2rem",
              cursor: "pointer", textTransform: "uppercase", minHeight: 44,
              transition: "all 0.2s",
            }}>
              BAG {bag.length > 0 ? `(${bag.length})` : ""}
            </button>
          </div>
        </div>
      </div>

      {/* Lookbook layout */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "grid", gridTemplateColumns: "1fr 360px", gap: "3rem", alignItems: "start" }}>

        {/* Main image */}
        <div>
          <div style={{ position: "relative", aspectRatio: "3/4", overflow: "hidden", background: "#050505", marginBottom: "1px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={look.img} alt={look.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%) brightness(0.85)", transition: "filter 0.6s" }} />
            <div style={{
              position: "absolute", top: "1.5rem", left: "1.5rem",
              fontFamily: "monospace", fontSize: "0.48rem",
              letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)",
              textTransform: "uppercase",
            }}>
              {selected + 1} / {LOOKS.length}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${LOOKS.length}, 1fr)`, gap: "1px", background: "#111" }}>
            {LOOKS.map((l, i) => (
              <button key={l.id} onClick={() => setSelected(i)} style={{
                position: "relative", aspectRatio: "1", overflow: "hidden",
                background: "#000", border: "none", cursor: "pointer", padding: 0,
                outline: selected === i ? "1px solid #fff" : "none",
                zIndex: selected === i ? 1 : 0,
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={l.img} alt={l.name} style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: selected === i ? "brightness(0.9)" : "brightness(0.35) grayscale(50%)",
                  transition: "filter 0.3s",
                }} />
              </button>
            ))}
          </div>
        </div>

        {/* Product detail */}
        <div style={{ paddingTop: "0.5rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.48rem", letterSpacing: "0.3em", color: "#333", textTransform: "uppercase", marginBottom: "0.4rem" }}>{look.sub}</p>
          <h2 style={{
            fontFamily: "'Arial Black', Arial, sans-serif",
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            fontWeight: 900, letterSpacing: "-0.01em",
            color: "#fff", margin: "0 0 0.5rem", textTransform: "uppercase",
          }}>{look.name}</h2>
          <p style={{ fontFamily: "monospace", fontSize: "0.85rem", color: "#555", marginBottom: "1.5rem" }}>${look.price}</p>

          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.82rem", color: "#555", lineHeight: 1.75, marginBottom: "1.5rem" }}>{look.desc}</p>

          <p style={{ fontFamily: "monospace", fontSize: "0.45rem", letterSpacing: "0.25em", color: "#333", textTransform: "uppercase", marginBottom: "0.8rem" }}>
            COLORWAY — {look.colorway}
          </p>

          {/* Size selector */}
          <p style={{ fontFamily: "monospace", fontSize: "0.45rem", letterSpacing: "0.25em", color: "#444", textTransform: "uppercase", marginBottom: "0.6rem" }}>
            SIZE {size[look.id] ? `— ${size[look.id]}` : ""}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
            {look.sizes.map(s => (
              <button key={s} onClick={() => setSize(prev => ({ ...prev, [look.id]: s }))} style={{
                fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.1em",
                color: size[look.id] === s ? "#000" : "#444",
                background: size[look.id] === s ? "#fff" : "transparent",
                border: "1px solid",
                borderColor: size[look.id] === s ? "#fff" : "#222",
                padding: "0.5rem 0.9rem",
                cursor: "pointer", transition: "all 0.15s",
                minHeight: 44,
              }}>
                {s}
              </button>
            ))}
          </div>

          <button onClick={addToBag} disabled={!hasSize} style={{
            fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em",
            color: inBag ? "#ff00aa" : (hasSize ? "#000" : "#333"),
            background: inBag ? "transparent" : (hasSize ? "#fff" : "transparent"),
            border: inBag ? "1px solid #ff00aa" : (hasSize ? "none" : "1px solid #1a1a1a"),
            padding: "1rem 2rem", cursor: hasSize ? "pointer" : "not-allowed",
            textTransform: "uppercase", width: "100%", minHeight: 44,
            transition: "all 0.2s",
          }}>
            {inBag ? "ADDED TO BAG" : (hasSize ? "ADD TO BAG" : "SELECT A SIZE")}
          </button>

          {/* Shipping note */}
          <p style={{ fontFamily: "monospace", fontSize: "0.45rem", letterSpacing: "0.1em", color: "#222", textAlign: "center", marginTop: "1rem" }}>
            FREE SHIPPING OVER $300 · RETURNS WITHIN 14 DAYS
          </p>

          {/* Brand details */}
          <div style={{ borderTop: "1px solid #111", marginTop: "2rem", paddingTop: "1.5rem" }}>
            <p style={{ fontFamily: "monospace", fontSize: "0.45rem", letterSpacing: "0.3em", color: "#333", textTransform: "uppercase", marginBottom: "0.8rem" }}>BRAND PALETTE</p>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {[{ hex: "#E8E0D0", name: "LINEN" }, { hex: "#2A2420", name: "EARTH" }, { hex: "#8B7355", name: "CLAY" }, { hex: "#C4A882", name: "SAND" }, { hex: "#4A3728", name: "BARK" }].map(c => (
                <div key={c.hex}>
                  <div style={{ width: 32, height: 32, background: c.hex, border: "1px solid #1a1a1a" }} />
                  <p style={{ fontFamily: "monospace", fontSize: "0.38rem", color: "#222", marginTop: "0.3rem", letterSpacing: "0.05em" }}>{c.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bag overlay */}
      {bagOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 300,
          background: "rgba(0,0,0,0.7)",
          display: "flex", justifyContent: "flex-end",
        }} onClick={() => setBagOpen(false)}>
          <div style={{
            background: "#0a0a0a", borderLeft: "1px solid #1a1a1a",
            width: "min(380px, 100vw)", padding: "2rem",
            display: "flex", flexDirection: "column", gap: "1rem",
            overflowY: "auto",
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "#444", textTransform: "uppercase" }}>BAG ({bag.length})</p>
              <button onClick={() => setBagOpen(false)} style={{ background: "none", border: "none", color: "#333", cursor: "pointer", fontSize: "1rem" }}>✕</button>
            </div>

            {bag.map(id => {
              const item = LOOKS.find(l => l.id === id)!;
              return (
                <div key={id} style={{ borderTop: "1px solid #111", paddingTop: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                  <div style={{ width: 60, height: 80, overflow: "hidden", flexShrink: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.img} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.7)" }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "0.7rem", color: "#fff", margin: "0 0 0.2rem" }}>{item.name}</p>
                    <p style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "#444" }}>{size[id]} · ${item.price}</p>
                  </div>
                </div>
              );
            })}

            <div style={{ borderTop: "1px solid #111", paddingTop: "1rem", marginTop: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#555", letterSpacing: "0.1em" }}>SUBTOTAL</span>
                <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#fff" }}>
                  ${bag.reduce((sum, id) => sum + (LOOKS.find(l => l.id === id)?.price ?? 0), 0)}
                </span>
              </div>
              <button style={{
                fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em",
                color: "#000", background: "#fff", border: "none",
                padding: "1rem", cursor: "pointer", textTransform: "uppercase",
                width: "100%", minHeight: 44,
              }}>CHECKOUT</button>
            </div>
          </div>
        </div>
      )}

      {/* Back */}
      <div style={{ maxWidth: 1200, margin: "3rem auto 6rem", padding: "0 2rem" }}>
        <Link href="/work" style={{
          fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
          color: "#333", textDecoration: "none", textTransform: "uppercase",
          border: "1px solid #1a1a1a", padding: "0.8rem 1.5rem",
          display: "inline-flex", alignItems: "center", gap: "0.5rem",
          transition: "all 0.2s", minHeight: 44,
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#fff"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "#333"; e.currentTarget.style.borderColor = "#1a1a1a"; }}>
          ← BACK TO WORK
        </Link>
      </div>
    </main>
  );
}
