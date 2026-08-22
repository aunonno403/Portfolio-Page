import { SITE } from "../data/site";
import { TOP_SKILLS } from "../data/skills";
import { Button } from "./ui/Button";
import { Container, Section } from "./ui/Section";
import { IconArrowUpRight, IconDownload } from "./ui/Icons";

export function CvPage({ onNavigateHome }) {
  return (
    <Container>
      <Section
        id="cv"
        eyebrow="CV"
        title="Curriculum vitae."
        intro="The full document, viewable inline or downloadable as a PDF."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <article className="reveal overflow-hidden rounded-2xl border border-border bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border px-5 py-4">
              <h3 className="text-sm font-medium">{SITE.name} — CV</h3>
              <div className="flex flex-wrap gap-2">
                <Button href={SITE.cvPath} download size="sm">
                  <IconDownload className="text-sm" />
                  Download
                </Button>
                <Button href={SITE.cvPath} external variant="secondary" size="sm">
                  Open PDF
                  <IconArrowUpRight className="text-xs" />
                </Button>
              </div>
            </div>

            {/*
              Embedded PDF viewers are unusable on mobile browsers, so below `md`
              a download card is shown instead of a cramped iframe.
            */}
            <iframe
              src={`${SITE.cvPath}#view=FitH&toolbar=1&navpanes=0`}
              title={`${SITE.name} CV, PDF viewer`}
              loading="eager"
              className="hidden h-[78vh] w-full border-0 bg-surface-2 md:block"
            />

            <div className="px-6 py-12 text-center md:hidden">
              <p className="text-sm font-medium">Best viewed as a PDF on mobile</p>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted">
                Embedded viewers are cramped on small screens — open or download the file
                instead.
              </p>
              <Button href={SITE.cvPath} download className="mt-6">
                <IconDownload className="text-base" />
                Download CV
              </Button>
            </div>
          </article>

          <aside className="reveal h-fit rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-base font-semibold">{SITE.name}</h3>
            <p className="mt-1 text-sm text-accent">{SITE.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Final-year {SITE.degree} student at {SITE.university}, working across AI/ML,
              full-stack development, and competitive programming.
            </p>

            <h4 className="mt-6 mb-3 text-xs font-medium uppercase tracking-[0.14em] text-faint">
              Core skills
            </h4>
            <ul className="flex flex-wrap gap-1.5">
              {TOP_SKILLS.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[0.6875rem] text-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>

            {/* Stacked rather than label/value columns: the email is too long to
                sit beside its label in a 18rem sidebar without truncating. */}
            <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
              <div>
                <dt className="text-xs text-faint">Location</dt>
                <dd className="mt-0.5">{SITE.location}</dd>
              </div>
              <div>
                <dt className="text-xs text-faint">Email</dt>
                <dd className="mt-0.5">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="break-all text-accent hover:text-accent-hover"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
            </dl>

            <Button
              variant="secondary"
              onClick={onNavigateHome}
              className="mt-6 w-full"
              size="sm"
            >
              Back to portfolio
            </Button>
          </aside>
        </div>
      </Section>
    </Container>
  );
}
