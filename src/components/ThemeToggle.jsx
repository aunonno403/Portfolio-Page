import { useTheme } from "../hooks/useTheme";
import { IconMoon, IconSun } from "./ui/Icons";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      title={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-text"
    >
      {isDark ? <IconSun className="text-lg" /> : <IconMoon className="text-lg" />}
    </button>
  );
}
