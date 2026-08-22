import { useEffect, useState } from "react";
import { fetchGitHubProjects } from "../utils/github";
import { FEATURED_PROJECTS } from "../data/projects";
import { SITE } from "../data/site";
import { ProjectCard } from "./ProjectCard";
import { Button } from "./ui/Button";
import { Container, Section } from "./ui/Section";
import { IconArrowUpRight } from "./ui/Icons";

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="h-5 w-2/5 rounded bg-surface-3" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-full rounded bg-surface-2" />
        <div className="h-3 w-11/12 rounded bg-surface-2" />
        <div className="h-3 w-3/5 rounded bg-surface-2" />
      </div>
      <div className="mt-6 h-3 w-1/3 rounded bg-surface-2" />
    </div>
  );
}

export function Projects() {
  const [state, setState] = useState({ status: "loading", featured: [], secondary: [] });

  useEffect(() => {
    let cancelled = false;

    fetchGitHubProjects().then((result) => {
      if (cancelled) return;

      setState({
        status: result.success ? "ready" : result.rateLimited ? "rate-limited" : "error",
        featured: result.featured,
        secondary: result.secondary,
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  const failed = state.status === "error" || state.status === "rate-limited";

  return (
    <Container>
      <Section
        id="projects"
        eyebrow="Projects"
        title="Things I've built and shipped."
        intro="Selected work, with stars and activity pulled live from GitHub."
      >
        {state.status === "loading" && (
          <div
            className="grid animate-pulse gap-5 sm:grid-cols-2"
            aria-hidden="true"
          >
            {FEATURED_PROJECTS.slice(0, 4).map((project) => (
              <CardSkeleton key={project.repo} />
            ))}
          </div>
        )}

        <div className="sr-only" aria-live="polite">
          {state.status === "ready"
            ? `${state.featured.length + state.secondary.length} projects loaded.`
            : failed
              ? "Projects could not be loaded from GitHub."
              : "Loading projects."}
        </div>

        {failed && (
          <div className="reveal rounded-2xl border border-border bg-surface p-8 text-center">
            <p className="font-medium">
              {state.status === "rate-limited"
                ? "GitHub's API rate limit was reached."
                : "Couldn't reach GitHub just now."}
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              Live stars and activity are unavailable, but everything is still on my
              profile.
            </p>
            <Button href={`https://github.com/${SITE.githubUsername}`} external className="mt-6">
              Browse on GitHub
              <IconArrowUpRight className="text-sm" />
            </Button>
          </div>
        )}

        {state.status === "ready" && (
          <>
            <div className="grid gap-5 sm:grid-cols-2">
              {state.featured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {state.secondary.length > 0 && (
              <>
                <h3 className="reveal mt-16 mb-6 text-sm font-medium uppercase tracking-[0.14em] text-faint">
                  Also worth a look
                </h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {state.secondary.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </>
            )}

            <div className="reveal mt-12 flex justify-center">
              <Button
                href={`https://github.com/${SITE.githubUsername}`}
                external
                variant="secondary"
              >
                See all repositories
                <IconArrowUpRight className="text-sm" />
              </Button>
            </div>
          </>
        )}
      </Section>
    </Container>
  );
}
