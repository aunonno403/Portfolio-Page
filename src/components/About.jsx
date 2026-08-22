import { BIO, FOCUS_AREAS } from "../data/about";
import { Container, Section } from "./ui/Section";

export function About() {
  return (
    <Container>
      <Section
        id="about"
        eyebrow="About"
        title="CS student. Builder. Problem solver."
      >
        <div className="reveal max-w-2xl space-y-4 text-base leading-relaxed text-muted">
          {BIO.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {FOCUS_AREAS.map((area) => (
            <article key={area.title} className="reveal bg-surface p-6">
              <h3 className="text-base font-semibold">{area.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{area.body}</p>
            </article>
          ))}
        </div>
      </Section>
    </Container>
  );
}
