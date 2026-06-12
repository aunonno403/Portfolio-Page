import { useEffect, useState } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { CV } from "./components/CV";
import { SiteNav } from "./components/SiteNav";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import "./styles/index.css";

function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window === "undefined") {
      return "/";
    }

    return normalizePath(window.location.pathname);
  });
  const [activeSection, setActiveSection] = useState("about");

  // Keep activeSection in sync with the current route.
  useEffect(() => {
    if (route === "/projects") setActiveSection("projects");
    else if (route === "/skills") setActiveSection("skills");
    else if (route === "/contact") setActiveSection("contact");
    else if (route === "/cv") setActiveSection("cv");
    else setActiveSection("about");
  }, [route]);


  useEffect(() => {
    const handlePopState = () => {
      setRoute(normalizePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "instant" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (route !== "/") {
      return;
    }

    const sectionElements = Array.from(document.querySelectorAll("[data-section]"));

    if (sectionElements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.getAttribute("data-section") || "about");
        }
      },
      {
        rootMargin: "-28% 0px -50% 0px",
        threshold: 0.15,
      }
    );

    sectionElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [route]);

  const navigateTo = (nextPath) => {
    if (nextPath.startsWith("#")) {
      const targetId = nextPath.slice(1);

      // Only change the URL (so your route state stays on the same page),
      // but do NOT reset scroll to top.
      window.history.pushState({}, "", `/${nextPath}`);
      setRoute("/");
      setActiveSection(targetId);

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        // Use the viewport-relative API so you don't get a "scroll to top then down" effect.
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      return;
    }

    const normalizedPath = normalizePath(nextPath);

    if (normalizedPath === route) {
      // If clicking the same route again, don't jump to top unless you intend to.
      return;
    }

    window.history.pushState({}, "", normalizedPath);
    setRoute(normalizedPath);
    setActiveSection("about");

    // Only scroll to top when navigating to a different *page* (e.g. /cv).
    // This prevents the brief up-then-fast-down behavior when going between sections.
    if (normalizedPath !== "/" && route === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (normalizedPath === "/" && route !== "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="ambient ambient-left"></div>
      <div className="ambient ambient-right"></div>
      <div className="scanlines"></div>

      <SiteNav route={route} activeSection={activeSection} onNavigate={navigateTo} />

      <main className="page-shell">
        {/* Main page: hero + about only */}
        {route === "/" && (
          <>
            <Hero onOpenCv={() => navigateTo("/cv")} />
            <About />
            {/* optional preview; remove if you want CV only on /cv */}
            <CV preview onOpenCv={() => navigateTo("/cv")} />
          </>
        )}

        {/* Separate pages (no hero/about) */}
        {route === "/projects" && <Projects />}
        {route === "/skills" && <Skills />}
        {route === "/contact" && <Contact onOpenCv={() => navigateTo("/cv")} />}
        {route === "/cv" && <CV page onNavigateHome={() => navigateTo("/")} />}
      </main>
    </>
  );
}
