import { useCallback, useEffect, useMemo, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { SiteNav } from "./components/SiteNav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CvPage } from "./components/CvPage";
import { NAV_ITEMS, SITE } from "./data/site";
import { useActiveSection } from "./hooks/useActiveSection";
import "./styles/globals.css";

const TITLES = {
  "/": `${SITE.name} — ${SITE.role}`,
  "/cv": `CV — ${SITE.name}`,
};

function normalizePath(pathname) {
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

export function App() {
  const [route, setRoute] = useState(() =>
    typeof window === "undefined" ? "/" : normalizePath(window.location.pathname)
  );

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);
  const activeSection = useActiveSection(sectionIds, route === "/");

  useEffect(() => {
    document.title = TITLES[route] ?? TITLES["/"];
  }, [route]);

  useEffect(() => {
    const handlePopState = () => setRoute(normalizePath(window.location.pathname));

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Honour a #section deep link on first load, once the sections have mounted.
  useEffect(() => {
    if (route !== "/" || !window.location.hash) return;

    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
    // Intentionally first-load only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigateTo = useCallback(
    (target) => {
      if (target.startsWith("#")) {
        const id = target.slice(1);

        // Section links belong to the homepage; come back to it first.
        if (route !== "/") {
          window.history.pushState({}, "", `/${target}`);
          setRoute("/");
          // Let the sections mount before scrolling to one.
          requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({ block: "start" });
          });
          return;
        }

        window.history.pushState({}, "", target);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const path = normalizePath(target);
      if (path === route) return;

      window.history.pushState({}, "", path);
      setRoute(path);
      window.scrollTo({ top: 0, behavior: "instant" });
    },
    [route]
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:text-accent-fg"
      >
        Skip to content
      </a>

      <SiteNav route={route} activeSection={activeSection} onNavigate={navigateTo} />

      <main id="main">
        {route === "/" ? (
          <>
            <Hero onOpenCv={() => navigateTo("/cv")} />
            <About />
            <Projects />
            <Skills />
            <Experience onOpenCv={() => navigateTo("/cv")} />
            <Contact onOpenCv={() => navigateTo("/cv")} />
          </>
        ) : (
          <div className="pt-20">
            <CvPage onNavigateHome={() => navigateTo("/")} />
          </div>
        )}
      </main>

      <Footer onNavigate={navigateTo} />
      <SpeedInsights />
    </>
  );
}
