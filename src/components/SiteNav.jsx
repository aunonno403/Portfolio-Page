const NAV_ITEMS = [
  { label: "About", href: "#about", section: "about" },
  { label: "Projects", href: "#projects", section: "projects" },
  { label: "Skills", href: "#skills", section: "skills" },
  { label: "CV", href: "/cv", section: "cv" },
  { label: "Contact", href: "#contact", section: "contact" },
];

export function SiteNav({ route, activeSection, onNavigate }) {
  return (
    <header className="site-nav-shell">
      <nav className="site-nav" aria-label="Primary">
        <button className="site-brand" type="button" onClick={() => onNavigate("/") }>
          <span className="site-brand-mark">AF</span>
          <span>
            Farhan <strong>Portfolio</strong>
          </span>
        </button>

        <div className="site-nav-links">
          {NAV_ITEMS.map((item) => {
            const isActive = route === "/cv" ? item.section === "cv" : activeSection === item.section;
            const shouldUseButton = item.href.startsWith("/") || route === "/cv";

            return shouldUseButton ? (
              <button
                key={item.section}
                type="button"
                className={`site-nav-link ${isActive ? "is-active" : ""}`}
                onClick={() => onNavigate(item.href)}
              >
                {item.label}
              </button>
            ) : (
              <a
                key={item.section}
                className={`site-nav-link ${isActive ? "is-active" : ""}`}
                href={item.href}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </nav>
    </header>
  );
}