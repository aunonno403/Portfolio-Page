import { useEffect, useState } from "react";
import { NAV_ITEMS, SITE } from "../data/site";
import { ThemeToggle } from "./ThemeToggle";
import { IconClose, IconMenu } from "./ui/Icons";

export function SiteNav({ route, activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu on Escape and whenever the route changes.
  useEffect(() => setMenuOpen(false), [route]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [menuOpen]);

  const onHome = route === "/";

  const handleClick = (event, target) => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(target);
  };

  const linkClass = (isActive) =>
    `rounded-full px-3.5 py-1.5 text-sm transition-colors ${
      isActive ? "bg-surface-2 font-medium text-text" : "text-muted hover:text-text"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || menuOpen
          ? "border-border bg-bg/85 backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-5xl items-center gap-3 px-5 py-3.5 sm:px-8"
      >
        <a
          href="/"
          onClick={(event) => handleClick(event, "/")}
          className="flex items-center gap-2.5 font-display font-semibold"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-accent text-xs text-accent-fg">
            {SITE.initials}
          </span>
          <span className="hidden text-sm sm:inline">{SITE.name}</span>
        </a>

        <div className="ml-auto hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = onHome && activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(event) => handleClick(event, `#${item.id}`)}
                aria-current={isActive ? "true" : undefined}
                className={linkClass(isActive)}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="/cv"
            onClick={(event) => handleClick(event, "/cv")}
            aria-current={route === "/cv" ? "page" : undefined}
            className={linkClass(route === "/cv")}
          >
            CV
          </a>
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-text md:hidden"
          >
            {menuOpen ? <IconClose className="text-xl" /> : <IconMenu className="text-xl" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="border-t border-border md:hidden">
          <ul className="mx-auto flex w-full max-w-5xl flex-col px-5 py-2 sm:px-8">
            {NAV_ITEMS.map((item) => {
              const isActive = onHome && activeSection === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleClick(event, `#${item.id}`)}
                    aria-current={isActive ? "true" : undefined}
                    className={`block py-3 text-sm transition-colors ${
                      isActive ? "font-medium text-accent" : "text-muted hover:text-text"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href="/cv"
                onClick={(event) => handleClick(event, "/cv")}
                aria-current={route === "/cv" ? "page" : undefined}
                className={`block py-3 text-sm transition-colors ${
                  route === "/cv" ? "font-medium text-accent" : "text-muted hover:text-text"
                }`}
              >
                CV
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
