import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "theme";

function readInitialTheme() {
  if (typeof window === "undefined") return "dark";

  // The inline script in index.html has already applied the correct class
  // before first paint, so trust the DOM as the source of truth here.
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState(readInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage blocked — the theme still applies for this session.
    }
  }, [theme]);

  // Follow the OS only while the visitor has made no explicit choice.
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (event) => {
      try {
        if (localStorage.getItem(STORAGE_KEY)) return;
      } catch {
        return;
      }
      setTheme(event.matches ? "dark" : "light");
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggleTheme };
}
