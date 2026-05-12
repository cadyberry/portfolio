"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, type Theme } from "../theme";

const SHOP_URL = "https://unavoide.com/shop";

function palette(theme: Theme) {
  if (theme === "light") return {
    bg:         "#f8f5f0",
    text:       "#160008",
    dim:        "rgba(0,0,0,0.38)",
    border:     "rgba(0,0,0,0.08)",
    accent:     "#B80037",
    btnBg:      "#160008",
    btnText:    "#f8f5f0",
    inputBg:    "rgba(0,0,0,0.04)",
    inputBorder:"rgba(0,0,0,0.14)",
  };
  if (theme === "mid") return {
    bg:         "#0e0005",
    text:       "#FFCCDB",
    dim:        "rgba(255,204,219,0.4)",
    border:     "rgba(192,176,240,0.12)",
    accent:     "#FF5286",
    btnBg:      "#FFCCDB",
    btnText:    "#0e0005",
    inputBg:    "rgba(255,204,219,0.05)",
    inputBorder:"rgba(192,176,240,0.2)",
  };
  return {
    bg:         "#060002",
    text:       "#ffffff",
    dim:        "rgba(255,255,255,0.35)",
    border:     "rgba(255,255,255,0.07)",
    accent:     "#FF0550",
    btnBg:      "#ffffff",
    btnText:    "#060002",
    inputBg:    "rgba(255,255,255,0.04)",
    inputBorder:"rgba(255,255,255,0.12)",
  };
}

export default function ShopPage() {
  const { theme } = useTheme();
  const p = palette(theme);

  const [commissionsOpen, setCommissionsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent]  = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("Commission inquiry");
    const body    = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:acadiaberry@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  const inputStyle: React.CSSProperties = {
    width:        "100%",
    boxSizing:    "border-box",
    fontFamily:   "'Violet Sans', sans-serif",
    fontSize:     "0.85rem",
    padding:      "0.65rem 0.875rem",
    background:   p.inputBg,
    color:        p.text,
    border:       `1px solid ${p.inputBorder}`,
    borderRadius: "6px",
    outline:      "none",
    transition:   "border-color 0.2s",
  };

  const ITEMS = [
    { label: "prints of original digital artwork", commission: false },
    { label: "jigsaw puzzles for sale",            commission: false },
    { label: "digital downloads",                  commission: false },
    { label: "commission work",                     commission: true  },
  ];

  return (
    <main style={{
      minHeight:      "100vh",
      background:     p.bg,
      color:          p.text,
      display:        "flex",
      flexDirection:  "column",
      alignItems:     "center",
      justifyContent: "center",
      padding:        "6rem 1.5rem 4rem",
      transition:     "background 0.3s, color 0.3s",
    }}>

      <Link href="/" style={{
        position:      "fixed",
        top:           "1.4rem",
        left:          "1.4rem",
        fontSize:      "0.55rem",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color:         p.dim,
        textDecoration:"none",
        transition:    "color 0.2s",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = p.text)}
      onMouseLeave={e => (e.currentTarget.style.color = p.dim)}
      >
        ← back
      </Link>

      <div style={{ maxWidth: 480, width: "100%" }}>

        <p style={{
          fontSize:      "0.55rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color:         p.dim,
          marginBottom:  "0.6rem",
        }}>
          unavoide / shop
        </p>

        <h1 style={{
          fontSize:      "clamp(1.6rem, 6vw, 2.4rem)",
          fontWeight:    700,
          letterSpacing: "-0.02em",
          lineHeight:    1.1,
          marginBottom:  "1.8rem",
        }}>
          what's in the shop
        </h1>

        <ul style={{
          listStyle:    "none",
          padding:      0,
          margin:       "0 0 2.4rem",
          display:      "flex",
          flexDirection:"column",
          gap:          "0.75rem",
        }}>
          {ITEMS.map((item, i) => (
            <li key={i}>
              {item.commission ? (
                <button
                  onClick={() => setCommissionsOpen(o => !o)}
                  style={{
                    display:    "flex",
                    alignItems: "baseline",
                    gap:        "0.75rem",
                    background: "none",
                    border:     "none",
                    padding:    0,
                    cursor:     "pointer",
                    color:      p.text,
                    fontSize:   "clamp(0.85rem, 3vw, 1rem)",
                    lineHeight: 1.55,
                    fontFamily: "'Violet Sans', sans-serif",
                    textAlign:  "left",
                  }}
                >
                  <span style={{
                    flexShrink:  0,
                    width:       6,
                    height:      6,
                    borderRadius:"50%",
                    background:  p.accent,
                    marginTop:   "0.45em",
                    display:     "inline-block",
                  }}/>
                  {item.label}
                  <span style={{
                    fontSize:   "0.7rem",
                    color:      p.dim,
                    display:    "inline-block",
                    transform:  commissionsOpen ? "rotate(90deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    marginLeft: "0.1rem",
                  }}>
                    →
                  </span>
                </button>
              ) : (
                <div style={{
                  display:    "flex",
                  alignItems: "baseline",
                  gap:        "0.75rem",
                  fontSize:   "clamp(0.85rem, 3vw, 1rem)",
                  lineHeight: 1.55,
                  color:      p.text,
                }}>
                  <span style={{
                    flexShrink:  0,
                    width:       6,
                    height:      6,
                    borderRadius:"50%",
                    background:  p.accent,
                    marginTop:   "0.45em",
                    display:     "inline-block",
                  }}/>
                  {item.label}
                </div>
              )}

              {/* commissions form inline */}
              <AnimatePresence>
                {item.commission && commissionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ paddingTop: "1.1rem", paddingLeft: "1.5rem" }}>
                      <p style={{
                        fontSize:      "0.8rem",
                        color:         p.dim,
                        lineHeight:    1.65,
                        marginBottom:  "1rem",
                      }}>
                        prints, digital pieces, puzzles, or something else — reach out and we'll figure it out.
                      </p>
                      {sent ? (
                        <p style={{ fontSize: "0.85rem", color: p.accent }}>
                          sent. i'll get back to you soon.
                        </p>
                      ) : (
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                          <input
                            required
                            placeholder="your name"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            style={inputStyle}
                          />
                          <input
                            required
                            type="email"
                            placeholder="your email"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            style={inputStyle}
                          />
                          <textarea
                            required
                            placeholder="what are you thinking?"
                            rows={4}
                            value={form.message}
                            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                            style={{ ...inputStyle, resize: "vertical" }}
                          />
                          <div>
                            <button
                              type="submit"
                              style={{
                                padding:       "0.65rem 1.4rem",
                                background:    p.btnBg,
                                color:         p.btnText,
                                fontSize:      "0.72rem",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                border:        "none",
                                borderRadius:  "10px",
                                cursor:        "pointer",
                                fontFamily:    "'Violet Sans', sans-serif",
                                transition:    "opacity 0.2s",
                              }}
                              onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
                              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                            >
                              send →
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <div style={{ borderTop: `1px solid ${p.border}`, marginBottom: "2rem" }}/>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display:        "inline-block",
              padding:        "0.75rem 1.6rem",
              background:     p.btnBg,
              color:          p.btnText,
              fontSize:       "0.72rem",
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              textDecoration: "none",
              borderRadius:   "10px",
              transition:     "opacity 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            take me there →
          </a>

          <Link
            href="/"
            style={{
              display:        "inline-block",
              padding:        "0.75rem 1.6rem",
              background:     "transparent",
              color:          p.dim,
              fontSize:       "0.72rem",
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              textDecoration: "none",
              border:         `1px solid ${p.border}`,
              borderRadius:   "10px",
              transition:     "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = p.text;
              e.currentTarget.style.borderColor = p.text;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = p.dim;
              e.currentTarget.style.borderColor = p.border;
            }}
          >
            maybe later
          </Link>
        </div>
      </div>
    </main>
  );
}
