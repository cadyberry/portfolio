"use client";

/**
 * SIGNAL FM — Underground radio station brand
 * Interactive mockup: working radio player UI, track list, waveform, frequency dial
 */

import { useEffect, useRef, useState, useCallback } from "react";

const TRACKS = [
  { title: "VOID PROTOCOL",     artist: "NNNN",        duration: "4:12" },
  { title: "STATIC BLOOM",      artist: "MARTA K.",    duration: "5:44" },
  { title: "FREQUENCY 88.4",    artist: "DJ CELL",     duration: "3:58" },
  { title: "NIGHT SIGNAL",      artist: "PLURAL",      duration: "6:01" },
  { title: "DEEP CHANNEL",      artist: "SWAY UNIT",   duration: "4:33" },
  { title: "TRANSMISSION END",  artist: "ACADIA",      duration: "7:22" },
];

export default function SignalFM() {
  const [playing, setPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0.28);
  const [volume, setVolume] = useState(0.7);
  const [freq, setFreq] = useState(88.4);
  const waveRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const progRef = useRef(progress);
  progRef.current = progress;

  // Waveform animation
  useEffect(() => {
    const canvas = waveRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let t = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const bars = 48;
      const barW = w / bars;

      for (let i = 0; i < bars; i++) {
        const noise = playing
          ? Math.abs(Math.sin(t * 3 + i * 0.4) * Math.cos(t * 1.7 + i * 0.6)) * 0.8 + 0.1
          : Math.abs(Math.sin(i * 0.5)) * 0.15 + 0.05;

        const barH = noise * h;
        const x = i * barW + 1;
        const y = (h - barH) / 2;

        ctx.fillStyle = i < bars * progRef.current ? "#ff00aa" : "rgba(255,255,255,0.12)";
        ctx.fillRect(x, y, barW - 2, barH);
      }

      if (playing) {
        t += 0.04;
        setProgress(p => p >= 1 ? 0 : p + 0.0003);
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  const nextTrack = useCallback(() => {
    setCurrentTrack(t => (t + 1) % TRACKS.length);
    setProgress(0);
  }, []);

  const prevTrack = useCallback(() => {
    setCurrentTrack(t => (t - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  }, []);

  const track = TRACKS[currentTrack];

  return (
    <main style={{ background: "#000", minHeight: "100vh", paddingTop: "5rem" }}>

      {/* Brand header */}
      <div style={{
        borderBottom: "1px solid #111",
        padding: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: playing ? "#ff00aa" : "#333",
              boxShadow: playing ? "0 0 12px #ff00aa" : "none",
              transition: "all 0.3s",
              animation: playing ? "pulse 1s infinite" : "none",
            }} />
            <span style={{ fontFamily: "monospace", fontSize: "0.6rem", letterSpacing: "0.3em", color: playing ? "#ff00aa" : "#333" }}>
              {playing ? "ON AIR" : "OFF AIR"}
            </span>
          </div>
          <h1 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 900, letterSpacing: "0.05em", color: "#fff", margin: "0.3rem 0 0" }}>
            SIGNAL FM
          </h1>
          <p style={{ fontFamily: "monospace", fontSize: "0.6rem", color: "#444", letterSpacing: "0.2em" }}>88.4 · UNDERGROUND BROOKLYN</p>
        </div>

        {/* Frequency display */}
        <div style={{ textAlign: "right" }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "#ff00aa",
            letterSpacing: "0.05em",
            lineHeight: 1,
            textShadow: "0 0 30px rgba(255,0,170,0.4)",
          }}>{freq.toFixed(1)}</div>
          <div style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#333", letterSpacing: "0.2em" }}>FM MHz</div>
          <input type="range" min={87} max={108} step={0.1} value={freq}
            onChange={e => setFreq(parseFloat(e.target.value))}
            style={{ width: 120, marginTop: "0.5rem", accentColor: "#ff00aa" }} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", minHeight: "calc(100vh - 180px)" }}>

        {/* Player */}
        <div style={{ padding: "2rem", borderRight: "1px solid #111", display: "flex", flexDirection: "column", gap: "2rem" }}>

          {/* Now playing */}
          <div>
            <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#333", marginBottom: "0.8rem" }}>NOW PLAYING</p>
            <h2 style={{ fontFamily: "'Arial Black', Arial, sans-serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1 }}>{track.title}</h2>
            <p style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "#555", marginTop: "0.4rem" }}>{track.artist}</p>
          </div>

          {/* Waveform */}
          <div style={{ position: "relative" }}>
            <canvas ref={waveRef} width={600} height={80} style={{ width: "100%", height: 80, cursor: "pointer" }}
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect();
                setProgress((e.clientX - rect.left) / rect.width);
              }} />
          </div>

          {/* Time */}
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "monospace", fontSize: "0.6rem", color: "#333" }}>
            <span>{Math.floor(progress * 4 + 1)}:{String(Math.floor(progress * 240) % 60).padStart(2, "0")}</span>
            <span>{track.duration}</span>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2rem" }}>
            <button onClick={prevTrack} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "1.2rem", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#555")}>⏮</button>

            <button onClick={() => setPlaying(p => !p)} style={{
              width: 64, height: 64, borderRadius: "50%",
              background: playing ? "#ff00aa" : "transparent",
              border: `2px solid ${playing ? "#ff00aa" : "#333"}`,
              color: playing ? "#000" : "#fff",
              fontSize: "1.4rem",
              cursor: "pointer",
              transition: "all 0.25s",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: playing ? "0 0 30px rgba(255,0,170,0.4)" : "none",
            }}>
              {playing ? "⏸" : "▶"}
            </button>

            <button onClick={nextTrack} style={{ background: "none", border: "none", color: "#555", cursor: "pointer", fontSize: "1.2rem", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "#555")}>⏭</button>
          </div>

          {/* Volume */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#333", letterSpacing: "0.15em" }}>VOL</span>
            <input type="range" min={0} max={1} step={0.01} value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              style={{ flex: 1, accentColor: "#ff00aa" }} />
            <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#444", width: 28, textAlign: "right" }}>{Math.round(volume * 100)}</span>
          </div>

          {/* Brand identity block */}
          <div style={{ marginTop: "auto", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {[
              { label: "COLOR", value: "#FF00AA", swatch: "#ff00aa" },
              { label: "COLOR", value: "#00FFEE", swatch: "#00ffee" },
              { label: "COLOR", value: "#000000", swatch: "#000" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{ width: 16, height: 16, background: c.swatch, border: "1px solid #222" }} />
                <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#333" }}>{c.value}</span>
              </div>
            ))}
            <div style={{ marginLeft: "auto", fontFamily: "'Arial Black', Arial", fontSize: "0.55rem", color: "#222", letterSpacing: "0.1em" }}>SIGNAL FM — designed by ACADIA</div>
          </div>
        </div>

        {/* Track list */}
        <div style={{ padding: "2rem" }}>
          <p style={{ fontFamily: "monospace", fontSize: "0.55rem", letterSpacing: "0.25em", color: "#333", marginBottom: "1rem" }}>PLAYLIST</p>
          {TRACKS.map((t, i) => (
            <div key={i} onClick={() => { setCurrentTrack(i); setProgress(0); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.9rem 0",
                borderBottom: "1px solid #0f0f0f",
                cursor: "pointer",
                transition: "background 0.15s",
                borderLeft: currentTrack === i ? "2px solid #ff00aa" : "2px solid transparent",
                paddingLeft: "0.8rem",
              }}>
              <div>
                <p style={{ fontFamily: "'Courier New', monospace", fontSize: "0.75rem", color: currentTrack === i ? "#fff" : "#555", margin: 0, letterSpacing: "0.05em" }}>{t.title}</p>
                <p style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#333", margin: 0, marginTop: 2 }}>{t.artist}</p>
              </div>
              <span style={{ fontFamily: "monospace", fontSize: "0.55rem", color: "#333" }}>{t.duration}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
    </main>
  );
}
