import { CREDENTIALS, SKILL_GROUPS } from "../data/skills";
import { Container, Section } from "./ui/Section";

function Tag({ children, tone = "core" }) {
  return (
    <li
      className={
        tone === "core"
          ? "rounded-md border border-accent/25 bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent"
          : "rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs text-muted"
      }
    >
      {children}
    </li>
  );
}

export function Skills() {
  return (
    <Container>
      <Section
        id="skills"
        eyebrow="Skills"
        title="A toolkit across AI, web, and mobile."
        intro="Split into what I reach for by default and what I've shipped with at least once — no invented percentages."
      >
        <dl className="reveal mb-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map((item) => (
            <div key={item.value} className="bg-surface px-5 py-6">
              <dt className="font-display text-xl font-semibold text-accent">
                {item.value}
              </dt>
              <dd className="mt-1.5 text-sm leading-snug text-muted">{item.label}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group) => (
            <article
              key={group.category}
              className="reveal rounded-2xl border border-border bg-surface p-6"
            >
              <h3 className="text-base font-semibold">{group.category}</h3>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.core.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
                {group.familiar.map((skill) => (
                  <Tag key={skill} tone="familiar">
                    {skill}
                  </Tag>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="reveal mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-faint">
          <span className="inline-flex items-center gap-2">
            <span
              className="size-2.5 rounded-sm border border-accent/25 bg-accent-soft"
              aria-hidden="true"
            />
            Core
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="size-2.5 rounded-sm border border-border bg-surface-2"
              aria-hidden="true"
            />
            Familiar
          </span>
        </p>
      </Section>
    </Container>
  );
}
