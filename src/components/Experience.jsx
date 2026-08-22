import { EDUCATION, EXPERIENCE } from "../data/experience";
import { Container, Section } from "./ui/Section";

function Timeline({ items }) {
  return (
    <ol className="relative">
      {items.map((item, index) => (
        <li
          key={item.title}
          className={`reveal relative grid gap-x-6 gap-y-2 pl-8 sm:grid-cols-[7rem_minmax(0,1fr)] sm:pl-0 ${
            index === items.length - 1 ? "" : "pb-10"
          }`}
        >
          {/* Rail: hidden on the last item so the line stops at the final dot. */}
          {index !== items.length - 1 && (
            <span
              className="absolute left-[3px] top-3 h-full w-px bg-border sm:left-[calc(7rem-1.5rem+3px)]"
              aria-hidden="true"
            />
          )}
          <span
            className="absolute left-0 top-2 size-[7px] rounded-full bg-accent ring-4 ring-bg sm:left-[calc(7rem-1.5rem)]"
            aria-hidden="true"
          />

          <p className="font-mono text-xs text-faint sm:pt-1">{item.period}</p>

          <div>
            <h3 className="text-base font-semibold leading-snug">{item.title}</h3>
            <p className="mt-0.5 text-sm text-accent">{item.org}</p>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.body}</p>

            {item.tags.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[0.6875rem] text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Experience({ onOpenCv }) {
  return (
    <Container>
      <Section id="experience" eyebrow="Experience" title="What I've been working on.">
        <Timeline items={EXPERIENCE} />

        <h3 className="reveal mt-16 mb-8 text-sm font-medium uppercase tracking-[0.14em] text-faint">
          Education
        </h3>
        <Timeline items={EDUCATION} />

        <p className="reveal mt-12 text-sm text-muted">
          The full detail lives in my{" "}
          <button
            type="button"
            onClick={onOpenCv}
            className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-accent-hover"
          >
            curriculum vitae
          </button>
          .
        </p>
      </Section>
    </Container>
  );
}
