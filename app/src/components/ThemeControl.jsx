import { useEffect, useState } from "react";

export default function ThemeControl() {
  const [theme, setTheme] = useState(() => document.documentElement.dataset.themePreference || "system");
  useEffect(() => {
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    const apply = () => {
      const resolved = theme === "system" ? (system.matches ? "dark" : "light") : theme;
      document.documentElement.dataset.theme = resolved;
      document.documentElement.dataset.themePreference = theme;
      document.querySelector('meta[name="theme-color"]')?.setAttribute("content", resolved === "dark" ? "#101923" : "#fcfbf8");
    };
    apply();
    try { localStorage.setItem("niya-theme", theme); } catch { /* Storage may be disabled. */ }
    system.addEventListener("change", apply);
    return () => system.removeEventListener("change", apply);
  }, [theme]);
  return <label className="theme-control"><span className="sr-only">Color theme</span><select aria-label="Color theme" value={theme} onChange={event => setTheme(event.target.value)}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label>;
}
