import profileWebp from "../assets/profile.webp";
import profileWebp2x from "../assets/profile@2x.webp";
import profileJpg from "../assets/profile.jpg";
import profileJpg2x from "../assets/profile@2x.jpg";
import { SITE, SOCIALS } from "../data/site";
import { FACTS } from "../data/about";
import { Button } from "./ui/Button";
import { Container } from "./ui/Section";
import { IconArrowUpRight, SOCIAL_ICONS } from "./ui/Icons";

export function Hero({ onOpenCv }) {
  return (
    <section id="top" className="pt-32 pb-16 sm:pt-40 sm:pb-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="reveal">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              <span
                className="size-1.5 rounded-full bg-accent"
                aria-hidden="true"
              />
              {SITE.availability}
            </p>

            <h1 className="text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-[3.5rem]">
              {SITE.tagline}
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              I'm Farhan — a final-year CSE student at {SITE.university} working across
              machine learning and full-stack development. I build things that reach real
              users, not just a passing grade.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="#projects">View projects</Button>
              <Button href="#contact" variant="secondary">
                Get in touch
              </Button>
              <Button variant="ghost" onClick={onOpenCv}>
                Open CV
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
              {SOCIALS.filter((social) => social.id !== "email").map((social) => {
                const Icon = SOCIAL_ICONS[social.id];

                return (
                  <li key={social.id}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-text"
                    >
                      <Icon className="text-base" />
                      {social.label}
                      <IconArrowUpRight className="text-xs opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <aside className="reveal lg:w-[19rem]">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow-card)]">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${profileWebp} 1x, ${profileWebp2x} 2x`}
                />
                <img
                  src={profileJpg}
                  srcSet={`${profileJpg} 1x, ${profileJpg2x} 2x`}
                  width={560}
                  height={560}
                  alt={`${SITE.name}, portrait`}
                  // Lowercase: React 18 does not map the camelCase form.
                  fetchpriority="high"
                  decoding="async"
                  className="aspect-square w-full object-cover"
                />
              </picture>

              <dl className="divide-y divide-border border-t border-border text-sm">
                {FACTS.map((fact) => (
                  <div
                    key={fact.label}
                    className="flex items-baseline justify-between gap-4 px-4 py-3"
                  >
                    <dt className="shrink-0 text-muted">{fact.label}</dt>
                    <dd className="text-right font-medium">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
