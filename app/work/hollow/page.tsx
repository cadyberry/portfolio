"use client";
import Link from "next/link";
import { useState } from "react";

type Tab = "coffee" | "food" | "merch";

const MENU = {
  coffee: [
    { name: "SLOW DRIP", desc: "18-hour cold brew. Unfiltered.", price: 6 },
    { name: "NITRO BLACK", desc: "Nitrogen-infused. Dense. Cold.", price: 7 },
    { name: "OAT FLAT WHITE", desc: "Double shot, steamed oat, no fuss.", price: 6 },
    { name: "BUSHWICK BLEND", desc: "House espresso. Caramel dark.", price: 4 },
    { name: "COLD BREW TONIC", desc: "Cold brew on tonic. Bitter and bright.", price: 8 },
    { name: "MATCHA COLD BREW", desc: "50/50. Strange. Works.", price: 8 },
  ],
  food: [
    { name: "TOAST + MISO BUTTER", desc: "Sourdough, cultured butter, white miso.", price: 7 },
    { name: "SOFT BOILED EGG SET", desc: "Two eggs, chili crisp, black sesame toast.", price: 9 },
    { name: "GRANOLA BOWL", desc: "House granola, coconut yogurt, honey.", price: 8 },
    { name: "AVOCADO SMASH", desc: "Thick-cut sourdough, lemon, pepitas.", price: 11 },
    { name: "BANANA BREAD", desc: "Miso caramel glaze. One slice.", price: 5 },
    { name: "CHOCOLATE BARK", desc: "70% dark, pink salt, dried cherry.", price: 4 },
  ],
  merch: [
    { name: "HOLLOW TOTE", desc: "Heavy canvas. One color. Carries everything.", price: 28 },
    { name: "CAMP MUG", desc: "Speckled ceramic. 12oz. Local kiln.", price: 38 },
    { name: "COLD BREW KIT", desc: "Mason jar, filter, 250g of house blend.", price: 45 },
    { name: "HOLLOW TEE", desc: "100% cotton. Faded black. Brushed logo.", price: 42 },
    { name: "ZINE VOL. 01", desc: "Photo zine from our first year. 40 pages.", price: 14 },
    { name: "STICKER PACK", desc: "6 stickers. Analog design. Waterproof.", price: 8 },
  ],
};

const TABS: { id: Tab; label: string }[] = [
  { id: "coffee", label: "COFFEE" },
  { id: "food",   label: "FOOD"   },
  { id: "merch",  label: "MERCH"  },
];

export default function Hollow() {
  const [tab, setTab] = useState<Tab>("coffee");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [ordered, setOrdered] = useState(false);

  const items = MENU[tab];
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [key, qty]) => {
    const [t, name] = key.split("::");
    const item = MENU[t as Tab]?.find(i => i.name === name);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const addToCart = (item: { name: string; price: number }) => {
    const key = `${tab}::${item.name}`;
    setCart(prev => ({ ...prev, [key]: (prev[key] || 0) + 1 }));
  };

  const handleOrder = () => setOrdered(true);

  if (ordered) {
    return (
      <main style={{ background: "#000", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff", padding: "2rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.4em", color: "#ff00aa", marginBottom: "1.5rem", textTransform: "uppercase" }}>ORDER PLACED</p>
        <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(2rem, 8vw, 4rem)", fontWeight: 900, letterSpacing: "-0.02em", margin: "0 0 1rem", textAlign: "center" }}>
          IT'LL BE READY.
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: "#555", marginBottom: "3rem" }}>pick up at the counter · {cartTotal} items</p>
        <button onClick={() => { setCart({}); setOrdered(false); }} style={{
          fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.2em",
          color: "#fff", background: "transparent", border: "1px solid #333",
          padding: "0.8rem 2rem", cursor: "pointer", textTransform: "uppercase",
        }}>ORDER AGAIN</button>
      </main>
    );
  }

  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem", color: "#fff" }}>

      {/* Hero */}
      <div style={{
        borderBottom: "1px solid #111",
        padding: "3rem 2rem 2.5rem",
        maxWidth: 1000, margin: "0 auto",
        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
        flexWrap: "wrap", gap: "1rem",
      }}>
        <div>
          <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.4em", color: "#333", textTransform: "uppercase", marginBottom: "0.5rem" }}>
            Brand Identity — Concept
          </p>
          <h1 style={{
            fontFamily: "'Arial Black', Arial, sans-serif",
            fontSize: "clamp(3rem, 10vw, 6rem)",
            fontWeight: 900, letterSpacing: "-0.03em",
            margin: 0, lineHeight: 0.88,
            textTransform: "uppercase",
          }}>HOLLOW</h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "#444", marginTop: "0.6rem", fontStyle: "italic" }}>
            Cold brew café · Bushwick, Brooklyn
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "#222", letterSpacing: "0.2em" }}>MON–FRI 7A–7P</p>
          <p style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "#222", letterSpacing: "0.2em" }}>SAT–SUN 8A–8P</p>
          <p style={{ fontFamily: "monospace", fontSize: "0.5rem", color: "#333", letterSpacing: "0.2em", marginTop: "0.3rem" }}>301 WILSON AVE, BK</p>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 2rem 6rem" }}>

        {/* Tab nav */}
        <div style={{ display: "flex", borderBottom: "1px solid #111", marginBottom: "2rem", gap: 0 }}>
          {TABS.map(({ id, label }) => (
            <button key={id} onClick={() => setTab(id)} style={{
              fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.25em",
              color: tab === id ? "#fff" : "#333",
              background: "transparent", border: "none",
              borderBottom: tab === id ? "1px solid #fff" : "1px solid transparent",
              padding: "1rem 1.5rem",
              cursor: "pointer", transition: "all 0.2s",
              textTransform: "uppercase",
              marginBottom: -1,
            }}>
              {label}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1px", background: "#111",
          marginBottom: "2rem",
        }}>
          {items.map(item => (
            <div key={item.name} style={{
              background: "#000", padding: "1.4rem",
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-start", gap: "1rem",
            }}>
              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: "'Arial Black', Arial, sans-serif",
                  fontSize: "0.8rem", fontWeight: 900,
                  letterSpacing: "0.04em", color: "#fff",
                  margin: "0 0 0.3rem", textTransform: "uppercase",
                }}>{item.name}</h3>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "0.72rem", color: "#444", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.6rem", flexShrink: 0 }}>
                <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#555" }}>${item.price}</span>
                <button onClick={() => addToCart(item)} style={{
                  fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.15em",
                  color: "#000", background: "#fff", border: "none",
                  padding: "0.4rem 0.8rem", cursor: "pointer",
                  textTransform: "uppercase", transition: "background 0.2s",
                  minHeight: 44, minWidth: 60,
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#ff00aa")}
                onMouseLeave={e => (e.currentTarget.style.background = "#fff")}>
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart bar */}
        {cartCount > 0 && (
          <div style={{
            position: "fixed", bottom: 0, left: 0, right: 0,
            background: "#0a0a0a", borderTop: "1px solid #1a1a1a",
            padding: "1.2rem 2rem",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            zIndex: 100,
          }}>
            <div>
              <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#555", letterSpacing: "0.15em" }}>
                {cartCount} item{cartCount !== 1 ? "s" : ""} · ${cartTotal}
              </span>
            </div>
            <button onClick={handleOrder} style={{
              fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.2em",
              color: "#000", background: "#fff", border: "none",
              padding: "0.8rem 2rem", cursor: "pointer", textTransform: "uppercase",
              minHeight: 44,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#ff00aa")}
            onMouseLeave={e => (e.currentTarget.style.background = "#fff")}>
              PLACE ORDER
            </button>
          </div>
        )}

        {/* Brand colors */}
        <div style={{ borderTop: "1px solid #111", paddingTop: "2rem", marginTop: "2rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.5rem", letterSpacing: "0.3em", color: "#333", textTransform: "uppercase", marginBottom: "1rem" }}>BRAND PALETTE</p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {[
              { hex: "#0D0D0D", name: "VOID" },
              { hex: "#F5F0E8", name: "BONE" },
              { hex: "#8B7355", name: "DRIFTWOOD" },
              { hex: "#3D2B1F", name: "BITTER" },
              { hex: "#E8DCC8", name: "CREAM" },
            ].map(c => (
              <div key={c.hex} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                <div style={{ width: 48, height: 48, background: c.hex, border: "1px solid #1a1a1a" }} />
                <span style={{ fontFamily: "monospace", fontSize: "0.42rem", color: "#333", letterSpacing: "0.1em" }}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Back */}
        <div style={{ marginTop: "3rem" }}>
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
      </div>
    </main>
  );
}
