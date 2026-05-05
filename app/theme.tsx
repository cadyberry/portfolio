"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "dark" | "light" | "mid";

const ORDER: Theme[] = ["dark", "light", "mid"];

interface ThemeCtx {
  theme: Theme;
  cycle: () => void;
}

const Ctx = createContext<ThemeCtx>({ theme: "dark", cycle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved && ORDER.includes(saved)) setTheme(saved);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("light", "mid");
    if (theme !== "dark") html.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const cycle = () => setTheme(t => {
    const i = ORDER.indexOf(t);
    return ORDER[(i + 1) % ORDER.length];
  });

  return <Ctx.Provider value={{ theme, cycle }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
