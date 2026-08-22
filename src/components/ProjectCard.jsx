import { FALLBACK_LANGUAGE_COLOR, LANGUAGE_COLORS } from "../data/projects";
import { IconArrowUpRight, IconClock, IconFork, IconStar } from "./ui/Icons";

function LanguageTag({ language }) {
  if (!language) return null;

  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-muted">
      <span
        className="size-2 shrink-0 rounded-full"
        style={{ backgroundColor: LANGUAGE_COLORS[language] ?? FALLBACK_LANGUAGE_COLOR }}
        aria-hidden="true"
      />
      {language}
    </span>
  );
}

function Stat({ icon: Icon, value, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-faint">
      <Icon className="text-sm" />
      <span>
        {value}
        <span className="sr-only"> {label}</span>
      </span>
    </span>
  );
}

export function ProjectCard({ project }) {
  const { featured } = project;

  return (
    <article
      className={`reveal group flex flex-col rounded-2xl border border-border bg-surface transition-all duration-200 hover:border-border-strong hover:shadow-[var(--shadow-lift)] ${
        featured ? "p-6 sm:p-7" : "p-5"
      }`}
    >
      <header className="flex items-start justify-between gap-4">
        <h3
          className={`font-semibold capitalize leading-snug ${
            featured ? "text-lg" : "text-base"
          }`}
        >
          {project.title}
        </h3>
        {project.highlight && (
          <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 text-[0.6875rem] font-medium text-accent">
            {project.highlight}
          </span>
        )}
      </header>

      {project.summary && (
        <p
          className={`mt-3 flex-1 leading-relaxed text-muted ${
            featured ? "text-sm" : "text-[0.8125rem]"
          }`}
        >
          {project.summary}
        </p>
      )}

      {project.stack.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.stack.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-surface-2 px-2 py-0.5 text-[0.6875rem] text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4">
        <LanguageTag language={project.language} />
        {project.stars > 0 && <Stat icon={IconStar} value={project.stars} label="stars" />}
        {project.forks > 0 && <Stat icon={IconFork} value={project.forks} label="forks" />}
        {project.updated && (
          <Stat icon={IconClock} value={project.updated} label="last updated" />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-medium text-text transition-colors hover:text-accent"
        >
          Source
          <IconArrowUpRight className="text-xs" />
          <span className="sr-only">for {project.title} on GitHub</span>
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Live demo
            <IconArrowUpRight className="text-xs" />
            <span className="sr-only">of {project.title}</span>
          </a>
        )}
      </div>
    </article>
  );
}
