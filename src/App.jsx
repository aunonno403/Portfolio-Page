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

      window.history.pushState({}, "", `/${nextPath}`);
      setRoute("/");
      setActiveSection(targetId);

      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      return;
    }

    const normalizedPath = normalizePath(nextPath);

    if (normalizedPath === route) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }

    window.history.pushState({}, "", normalizedPath);
    setRoute(normalizedPath);
    setActiveSection("about");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="ambient ambient-left"></div>
      <div className="ambient ambient-right"></div>
      <div className="scanlines"></div>

      <SiteNav route={route} activeSection={activeSection} onNavigate={navigateTo} />

      <main className="page-shell">
        {route === "/cv" ? (
          <CV page onNavigateHome={() => navigateTo("/")} />
        ) : (
          <>
            <Hero onOpenCv={() => navigateTo("/cv")} />
            <About />
            <Projects />
            <Skills />
            <CV preview onOpenCv={() => navigateTo("/cv")} />
            <Contact onOpenCv={() => navigateTo("/cv")} />
          </>
        )}
      </main>
    </>
  );
}
