"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/work",    label: "WORK"    },
  { href: "/play",    label: "PLAY"    },
  { href: "/shop",    label: "SHOP"    },
  { href: "/about",   label: "ABOUT"   },
  { href: "/contact", label: "CONTACT" },
];

export default function Nav() {
  const path = usePathname() ?? "";
  const onConcept = path.startsWith("/concept-");

  return (
    <nav style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1.2rem 2rem",
      fontFamily: "'Courier New', monospace",
    }}>
      <Link href="/" style={{
        fontSize: "0.85rem",
        fontWeight: 700,
        letterSpacing: "0.25em",
        color: "#fff",
        textDecoration: "none",
        textTransform: "uppercase",
      }}>ACADIA</Link>

      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {LINKS.map(({ href, label }) => (
          <Link key={href} href={href} style={{
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            color: path.startsWith(href) ? "#ff00aa" : "#555",
            textDecoration: "none",
            textTransform: "uppercase",
            transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={e => (e.currentTarget.style.color = path.startsWith(href) ? "#ff00aa" : "#555")}>
            {label}
          </Link>
        ))}
        <span style={{
          fontFamily: "'Arial Black', Arial, sans-serif",
          fontSize: "0.85rem",
          fontWeight: 900,
          letterSpacing: "0.02em",
          color: "#fff",
          textTransform: "uppercase",
          borderLeft: "1px solid #1a1a1a",
          paddingLeft: "2.5rem",
          marginLeft: "0",
        }}>Acadia Berry</span>
      </div>
    </nav>
  );
}
