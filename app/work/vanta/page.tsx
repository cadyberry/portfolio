"use client";

/**
 * VANTA — Brooklyn nightclub brand
 * Interactive mockup: event listings, ticket booking modal
 */

import Link from "next/link";
import { useState } from "react";

const EVENTS = [
  {
    date: "FRI MAY 09",
    artist: "FORM ERROR",
    support: "w/ PLURAL + DJ CELL",
    genre: "INDUSTRIAL / TECHNO",
    price: 20,
    status: "available",
  },
  {
    date: "SAT MAY 10",
    artist: "MARTA K.",
    support: "w/ NNNN",
    genre: "AMBIENT / NOISE",
    price: 18,
    status: "available",
  },
  {
    date: "FRI MAY 16",
    artist: "BODY RIDGE",
    support: "w/ SWAY UNIT",
    genre: "DARK ELECTRO",
    price: 22,
    status: "sold-out",
  },
  {
    date: "SAT MAY 17",
    artist: "VESSEL",
    support: "presented by SIGNAL FM",
    genre: "CLUB / EXPERIMENTAL",
    price: 25,
    status: "available",
  },
  {
    date: "FRI MAY 23",
    artist: "ACADIA",
    support: "AV PERFORMANCE",
    genre: "GENERATIVE / VISUAL",
    price: 15,
    status: "available",
  },
];

type Event = typeof EVENTS[0];

export default function Vanta() {
  const [modal, setModal] = useState<Event | null>(null);
  const [qty, setQty] = useState(1);
  const [booked, setBooked] = useState(false);

  const openModal = (e: Event) => { setModal(e); setQty(1); setBooked(false); };
  const closeModal = () => setModal(null);

  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem" }}>
      <Link href="/" style={{
        position: "fixed", top: "1.4rem", left: "1.4rem", zIndex: 200,
        fontSize: "0.55rem", letterSpacing: "0.18em", textTransform: "uppercase",
        color: "#333", textDecoration: "none", transition: "color 0.2s",
        display: "flex", alignItems: "center", gap: "0.3em",
      }}
      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
      onMouseLeave={e => (e.currentTarget.style.color = "#333")}
      >
        <span style={{color:"#caff3a"}}>←</span> back
      </Link>

      {/* Brand header */}
      <div style={{
        padding: "3rem 2rem 2rem",
        borderBottom: "1px solid #0f0f0f",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
        background: "linear-gradient(to bottom, rgba(255,0,170,0.04), transparent)",
      }}>
        <div>
          <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.35em", color: "#333", marginBottom: "0.5rem" }}>BUSHWICK, BROOKLYN · MEMBERS ONLY</p>
          <h1 style={{
            fontFamily: "'Arial Black', Arial, sans-serif",
            fontSize: "clamp(4rem, 12vw, 9rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: "#fff",
            margin: 0,
            lineHeight: 0.85,
          }}>VANTA</h1>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#333", letterSpacing: "0.15em", lineHeight: 2 }}>
            DOORS 10PM — 4AM<br />
            131 MELROSE ST, BK<br />
            21+ W/ ID
          </p>
        </div>
      </div>

      {/* Events */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "2rem" }}>
        <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.3em", color: "#333", marginBottom: "1.5rem" }}>UPCOMING — MAY 2025</p>

        {EVENTS.map((event, i) => (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "120px 1fr auto",
            gap: "1.5rem",
            alignItems: "center",
            padding: "1.5rem 0",
            borderTop: "1px solid #0f0f0f",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,0,170,0.02)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>

            <div>
              <p style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#555", margin: 0 }}>{event.date}</p>
            </div>

            <div>
              <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.2rem, 3vw, 1.8rem)", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1 }}>{event.artist}</h2>
              <p style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#444", margin: "0.3rem 0 0" }}>{event.support}</p>
              <span style={{
                display: "inline-block",
                marginTop: "0.4rem",
                fontFamily: "monospace",
                fontSize: "0.5rem",
                letterSpacing: "0.15em",
                color: "#333",
                border: "1px solid #1a1a1a",
                padding: "0.15rem 0.5rem",
              }}>{event.genre}</span>
            </div>

            <div style={{ textAlign: "right", flexShrink: 0 }}>
              {event.status === "sold-out" ? (
                <span style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "#333" }}>SOLD OUT</span>
              ) : (
                <button onClick={() => openModal(event)} style={{
                  fontFamily: "monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "#000",
                  background: "#fff",
                  border: "none",
                  padding: "0.6rem 1.2rem",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  textTransform: "uppercase",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = "#ff00aa"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}>
                  ${event.price} — GET IN
                </button>
              )}
            </div>
          </div>
        ))}
        <div style={{ borderTop: "1px solid #0f0f0f" }} />

        {/* Brand identity */}
        <div style={{ marginTop: "3rem", display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {["#000000", "#111111", "#ffffff", "#ff00aa"].map(c => (
              <div key={c} style={{ width: 28, height: 28, background: c, border: "1px solid #222" }} title={c} />
            ))}
          </div>
          <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#222", letterSpacing: "0.15em" }}>
            VANTA — brand identity by ACADIA, 2025
          </span>
        </div>
      </div>

      {/* Ticket modal */}
      {modal && (
        <div onClick={closeModal} style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.9)",
          zIndex: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#080808",
            border: "1px solid #1f1f1f",
            padding: "2.5rem",
            maxWidth: 420,
            width: "100%",
          }}>
            {!booked ? (
              <>
                <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#333", marginBottom: "1.5rem" }}>TICKET CHECKOUT</p>
                <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "1.8rem", fontWeight: 900, color: "#fff", margin: "0 0 0.3rem" }}>{modal.artist}</h2>
                <p style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#555", marginBottom: "2rem" }}>{modal.date} · VANTA, BUSHWICK</p>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#777" }}>GENERAL ADMISSION</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ background: "none", border: "1px solid #222", color: "#fff", width: 28, height: 28, cursor: "pointer", fontSize: "1rem" }}>−</button>
                    <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "#fff", minWidth: 16, textAlign: "center" }}>{qty}</span>
                    <button onClick={() => setQty(q => Math.min(6, q + 1))} style={{ background: "none", border: "1px solid #222", color: "#fff", width: 28, height: 28, cursor: "pointer", fontSize: "1rem" }}>+</button>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid #111", paddingTop: "1rem", marginBottom: "1.5rem", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "monospace", fontSize: "0.7rem", color: "#555" }}>TOTAL</span>
                  <span style={{ fontFamily: "monospace", fontSize: "0.9rem", color: "#fff" }}>${modal.price * qty}</span>
                </div>

                <button onClick={() => setBooked(true)} style={{
                  width: "100%",
                  padding: "1rem",
                  background: "#ff00aa",
                  border: "none",
                  color: "#000",
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  cursor: "pointer",
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.background = "#ff00aa")}>
                  CONFIRM — ${modal.price * qty}
                </button>

                <button onClick={closeModal} style={{ background: "none", border: "none", color: "#333", fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.15em", cursor: "pointer", marginTop: "1rem", width: "100%" }}>
                  CANCEL
                </button>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "1rem 0" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✦</div>
                <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "1.5rem", color: "#fff", margin: "0 0 0.5rem" }}>YOU'RE IN</h2>
                <p style={{ fontFamily: "monospace", fontSize: "0.65rem", color: "#555", lineHeight: 2 }}>
                  {qty}× {modal.artist}<br />
                  {modal.date} · VANTA
                </p>
                <button onClick={closeModal} style={{
                  marginTop: "1.5rem",
                  padding: "0.7rem 2rem",
                  background: "transparent",
                  border: "1px solid #222",
                  color: "#555",
                  fontFamily: "monospace",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  cursor: "pointer",
                }}>CLOSE</button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
