import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import "./styles/index.css";

export function App() {
  return (
    <>
      <div className="ambient ambient-left"></div>
      <div className="ambient ambient-right"></div>
      <div className="scanlines"></div>

      <main className="page-shell">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
