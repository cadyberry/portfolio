import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import { ThemeProvider } from "./theme";

export const metadata: Metadata = {
  title: "ACADIA — Digital Designer, Brooklyn NY",
  description: "Digital designer, artist, photographer. Brooklyn, New York.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600;1,700;1,900&family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Special+Elite&display=swap" rel="stylesheet" />
        {/* Prevent theme flash before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||'light';if(t!=='dark')document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('light');}})()`}} />
      </head>
      <body>
        <div aria-hidden="true" style={{
          position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(68,0,255,0.55) 0%, transparent 20%, transparent 80%, rgba(68,0,255,0.55) 100%)",
        }} />
        <ThemeProvider>
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
