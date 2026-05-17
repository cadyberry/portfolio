"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useTheme, type Theme } from "../../theme";

function colors(theme: Theme) {
  if (theme === "light") return {
    text: "#111111", faint: "rgba(17,17,17,0.25)", dim: "rgba(17,17,17,0.5)",
    glass: "rgba(255,255,255,0.55)",
    glassBorder: "rgba(255,255,255,0.8)",
    glow: "rgba(232,0,61,0.1)",
    dot: "rgba(0,0,0,0.18)", dotActive: "#111",
  };
  if (theme === "mid") return {
    text: "rgba(255,232,185,0.92)", faint: "rgba(255,195,120,0.35)", dim: "rgba(255,210,140,0.6)",
    glass: "rgba(20,8,50,0.45)",
    glassBorder: "rgba(180,120,255,0.25)",
    glow: "rgba(255,170,0,0.12)",
    dot: "rgba(255,195,120,0.25)", dotActive: "#ffaa00",
  };
  return {
    text: "#ffffff", faint: "rgba(255,255,255,0.22)", dim: "rgba(255,255,255,0.5)",
    glass: "rgba(255,255,255,0.06)",
    glassBorder: "rgba(255,255,255,0.12)",
    glow: "rgba(255,0,170,0.1)",
    dot: "rgba(255,255,255,0.18)", dotActive: "#ffffff",
  };
}

function SpotifyLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#1DB954"/>
      <path d="M17.25 16.5c-.199 0-.338-.066-.488-.165-2.339-1.396-5.23-1.716-8.685-.937-.198.066-.396.132-.527.132-.396 0-.659-.297-.659-.66 0-.429.264-.66.594-.726 3.851-.891 7.11-.528 9.746 1.056.264.165.461.363.461.726-.001.397-.33.574-.442.574zm1.056-2.64c-.264 0-.429-.099-.627-.198-2.64-1.584-6.523-2.046-9.581-1.122-.231.066-.363.132-.594.132-.462 0-.825-.363-.825-.825s.231-.825.594-.924c3.52-1.056 7.87-.528 10.872 1.32.297.165.495.429.495.825-.001.495-.397.792-.834.792zm.099-2.739c-.264 0-.396-.066-.66-.198-2.97-1.782-8.002-1.947-10.938-1.056-.165.066-.396.165-.66.165-.561 0-.99-.429-.99-.99s.33-.99.726-1.122c3.388-1.023 9.086-.825 12.672 1.254.429.231.66.594.66.99-.001.561-.462.957-.81.957z" fill="white"/>
    </svg>
  );
}

function AppleMusicLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5.5" fill="url(#am-grad)"/>
      <defs>
        <linearGradient id="am-grad" x1="12" y1="0" x2="12" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FC5C7D"/>
          <stop offset="100%" stopColor="#6A3093"/>
        </linearGradient>
      </defs>
      <path d="M16.5 5.5H9.8c-.5 0-.8.3-.8.8v8.9c-.3-.1-.7-.2-1-.2-1.4 0-2.5.9-2.5 2s1.1 2 2.5 2 2.5-.9 2.5-2V9.3l5.7-1.4v5.8c-.3-.1-.7-.2-1-.2-1.4 0-2.5.9-2.5 2s1.1 2 2.5 2 2.5-.9 2.5-2V6.3c0-.4-.3-.8-.7-.8z" fill="white"/>
    </svg>
  );
}

function SoundCloudLogo({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="5.5" fill="#FF5500"/>
      <path d="M4.5 13.8c0 .9.7 1.7 1.6 1.7h10.8c1 0 1.8-.8 1.8-1.8 0-1-.7-1.7-1.6-1.8-.1-1.6-1.4-2.9-3-2.9-.5 0-1 .1-1.4.4-.4-1-1.4-1.7-2.5-1.7-1.5 0-2.7 1.2-2.7 2.7v.1c-.6.2-1 .7-1 1.3zm2.1-.4V11c0-.8.6-1.4 1.4-1.4.6 0 1.1.4 1.3.9l.2.5.4-.3c.3-.2.7-.3 1.1-.3 1.1 0 2 .9 2 2v.2l.2.1c.4.1.7.5.7.9 0 .5-.4.9-.9.9H6.1c-.5 0-.9-.4-.9-.9 0-.4.4-.8.9-.8h.5v-.2z" fill="white"/>
    </svg>
  );
}

const SONGS = [
  {
    title: "Called It",
    spotifyEmbed: "https://open.spotify.com/embed/album/2LxzeT4U9Zgwsf6cIxlTcf?utm_source=generator",
    soundcloud: "https://soundcloud.com/47c4dy/called-it",
    spotify:    "https://open.spotify.com/album/2LxzeT4U9Zgwsf6cIxlTcf",
    apple:      "https://music.apple.com/us/song/called-it/1810528222",
    lyrics: `They only see it when they called it
And my heart ain't growing softer
I see the world just to get lost
I see the world just to get lost-er
Oh, I think we lost her
Lil baby she's a goner
She's back to popping collars
So she can get these dollars`,
  },
  {
    title: "Checkers",
    spotifyEmbed: "https://open.spotify.com/embed/album/6fbaKle3RQmQTi2F548fDv?utm_source=generator",
    soundcloud: "https://soundcloud.com/47c4dy/thisonerighthere_7",
    spotify:    "https://open.spotify.com/album/6fbaKle3RQmQTi2F548fDv",
    apple:      "https://music.apple.com/us/song/checkers/1812183006",
    lyrics: `I need patience
I really need patience for you
And you know I'm not waiting
No I'm not waiting on you

And there's nobody to blame
For the way it all changed
Thought you were the whole thing
You're always switching lanes

Thought you were the whole
But you're all switching lanes
And I wish that we were strangers
Always switching lanes

We in two different places
On two different thangs
We just don't see the same
Just don't see the same

I need patience
I really need patience for you
And you know I'm not waiting on you
No I'm not waiting on you

And there's nobody to blame
For the way it all changed
Always switching lanes

Need to see some new faces
Need to rearrange this
It's getting too crazy`,
  },
  {
    title: "Rage",
    spotifyEmbed: "https://open.spotify.com/embed/album/3Vz4mfECOHTvaQReu6SMTU?utm_source=generator",
    soundcloud: "https://soundcloud.com/47c4dy/feb-24-fminor-f-bflat-1",
    spotify:    "https://open.spotify.com/album/3Vz4mfECOHTvaQReu6SMTU",
    apple:      "https://music.apple.com/us/album/rage/1811779887?i=1811779888",
    lyrics: `All alone, on my own it, all sounds the same
And you'd know I'd do anything to drown the pain
When you called I was gone now I'm out to play
And you know I get down with the rage
And you know there's things I cannot say
You know there's things that I still chase
With all I've done the feeling stays
My mind's in chains
Want my mind erased
Can't escape
You know it's all part of the game
You know why that's why you take the pain
I can feel the strain
Ask myself like what's to gain
So much that I can't explain
So much that remains unchanged
Like I'm dancing in the rain`,
  },
];

export default function AudioPage() {
  const { theme } = useTheme();
  const c = colors(theme);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showLyrics, setShowLyrics] = useState(false);

  function go(next: number) {
    setDirection(next > index ? 1 : -1);
    setIndex(next);
    setShowLyrics(false);
  }

  const song = SONGS[index];

  return (
    <main style={{ background: "transparent", minHeight: "100vh", paddingTop: "5rem", color: c.text }}>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "3rem clamp(1rem, 4vw, 2rem) 8rem" }}>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/" style={{
            fontFamily: "Special Elite, monospace", fontSize: "0.5rem", letterSpacing: "0.28em",
            color: c.faint, textDecoration: "none", textTransform: "uppercase",
            display: "inline-flex", alignItems: "center",
            marginBottom: "3.5rem", transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = c.text)}
          onMouseLeave={e => (e.currentTarget.style.color = c.faint)}>
            <span style={{color:"#caff3a"}}>←</span> Index
          </Link>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            fontFamily: "Inter, sans-serif", fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
            fontWeight: 700, letterSpacing: "-0.04em", color: c.text,
            margin: "0 0 2.5rem", lineHeight: 0.95,
          }}
        >
          Music
        </motion.h1>


        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          style={{
            background: c.glass,
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: `1px solid ${c.glassBorder}`,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: `0 8px 48px ${c.glow}, inset 0 1px 0 ${c.glassBorder}`,
          }}
        >
          {/* Embed */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              >
                <iframe
                  src={song.spotifyEmbed}
                  width="100%"
                  height="352"
                  style={{ border: "none", display: "block" }}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={song.title}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls + links */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "1rem 1.4rem",
            borderTop: `1px solid ${c.glassBorder}`,
            gap: "1rem",
          }}>
            {/* Prev */}
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
              onClick={() => go((index - 1 + SONGS.length) % SONGS.length)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: c.dim, fontSize: "1.2rem", padding: "0.4rem 0.6rem",
                lineHeight: 1,
              }}
              aria-label="Previous"
            >
              ←
            </motion.button>

            {/* Dots + title */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.9rem", fontWeight: 500, color: c.text }}>
                {song.title}
              </span>
              <div style={{ display: "flex", gap: "0.4rem" }}>
                {SONGS.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => go(i)}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      width: i === index ? 18 : 6, height: 6,
                      borderRadius: 3, border: "none", cursor: "pointer", padding: 0,
                      background: i === index ? c.dotActive : c.dot,
                      transition: "width 0.3s ease, background 0.2s ease",
                    }}
                    aria-label={`Go to ${SONGS[i].title}`}
                  />
                ))}
              </div>
            </div>

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
              onClick={() => go((index + 1) % SONGS.length)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: c.dim, fontSize: "1.2rem", padding: "0.4rem 0.6rem",
                lineHeight: 1,
              }}
              aria-label="Next"
            >
              →
            </motion.button>
          </div>

          {/* Platform links */}
          <div style={{
            display: "flex", justifyContent: "center", gap: "1.2rem",
            padding: "0.8rem 1.4rem 1.2rem",
            borderTop: `1px solid ${c.glassBorder}`,
          }}>
            {[
              { href: song.soundcloud, label: "SoundCloud", logo: <SoundCloudLogo size={30} /> },
              { href: song.spotify,    label: "Spotify",    logo: <SpotifyLogo size={30} /> },
              { href: song.apple,      label: "Apple Music", logo: <AppleMusicLogo size={30} /> },
            ].map(({ href, label, logo }) => (
              <motion.a
                key={label}
                href={href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ display: "flex", opacity: 0.88, transition: "opacity 0.2s" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.88")}
                aria-label={`${song.title} on ${label}`}
              >
                {logo}
              </motion.a>
            ))}
          </div>

          {/* Lyrics */}
          {song.lyrics && (
            <>
              <div style={{ borderTop: `1px solid ${c.glassBorder}` }}>
                <button
                  onClick={() => setShowLyrics(v => !v)}
                  style={{
                    width: "100%", background: "none", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0.75rem 1.4rem",
                    fontFamily: "Special Elite, monospace", fontSize: "0.48rem",
                    letterSpacing: "0.22em", textTransform: "uppercase",
                    color: c.dim, transition: "color 0.2s",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = c.text)}
                  onMouseLeave={e => (e.currentTarget.style.color = c.dim)}
                >
                  <span>lyrics</span>
                  <span style={{ fontSize: "0.65rem", transition: "transform 0.25s", display: "inline-block", transform: showLyrics ? "rotate(180deg)" : "none" }}>↓</span>
                </button>
              </div>
              <AnimatePresence>
                {showLyrics && (
                  <motion.div
                    key="lyrics"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                    style={{ overflow: "hidden", borderTop: `1px solid ${c.glassBorder}` }}
                  >
                    <p style={{
                      fontFamily: "Inter, sans-serif", fontSize: "0.88rem", lineHeight: 1.8,
                      color: c.dim, whiteSpace: "pre-line",
                      margin: 0, padding: "1.2rem 1.4rem 1.4rem",
                    }}>
                      {song.lyrics}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </motion.div>

        {/* Song list */}
        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "2px" }}>
          {SONGS.map((s, i) => (
            <motion.button
              key={s.title}
              onClick={() => go(i)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.35 }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", gap: "1rem",
                padding: "0.6rem 0.8rem",
                borderRadius: "8px",
                backgroundColor: i === index ? c.glass : "transparent",
                backdropFilter: i === index ? "blur(12px)" : "none",
                textAlign: "left", width: "100%",
                transition: "background-color 0.2s",
              }}
            >
              <span style={{ fontFamily: "Special Elite, monospace", fontSize: "0.48rem", color: c.faint, minWidth: "1.4rem" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{
                fontFamily: "Inter, sans-serif", fontSize: "0.9rem", fontWeight: i === index ? 600 : 400,
                color: i === index ? c.text : c.dim,
                transition: "color 0.2s, font-weight 0.2s",
              }}>
                {s.title}
              </span>
            </motion.button>
          ))}
        </div>

      </div>
    </main>
  );
}
