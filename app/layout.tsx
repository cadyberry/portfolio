import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";
import UnicornBg from "./components/UnicornBg";
import { ThemeProvider } from "./theme";

export const metadata: Metadata = {
  title: "ACADIA — Digital Designer, Brooklyn NY",
  description: "Digital designer, artist, photographer. Brooklyn, New York.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap" rel="stylesheet" />
        {/* Prevent theme flash before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme');if(t&&t!=='dark')document.documentElement.classList.add(t);}catch(e){}})();` }} />
      </head>
      <body>
        <ThemeProvider>
          <UnicornBg />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
