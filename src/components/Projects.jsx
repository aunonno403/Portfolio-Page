import { useEffect, useState } from "react";
import { fetchGitHubProjects } from "../utils/github";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRepos() {
      const result = await fetchGitHubProjects();
      if (result.success) {
        setRepos(result.repos);
      } else {
        setError(result.error);
      }
      setLoading(false);
    }

    loadRepos();
  }, []);

  return (
    <section className="projects section-grid" id="projects">
      <div className="section-heading reveal">
        <p className="eyebrow">Projects</p>
        <h2>Live repositories from GitHub.</h2>
      </div>

      <div className="projects-toolbar reveal">
        <p id="projects-status">
          {loading
            ? "Loading repositories..."
            : error
              ? "Unable to load GitHub repositories."
              : `${repos.length} repositories loaded from GitHub.`}
        </p>
        <a
          className="button button-secondary"
          href="https://github.com/aunonno403"
          target="_blank"
          rel="noreferrer"
        >
          Open GitHub
        </a>
      </div>

      <div className="projects-grid" aria-live="polite">
        {error ? (
          <div className="projects-empty reveal">
            <strong>Unable to load GitHub repositories.</strong>
            <p>
              Check the GitHub username, repository filters, or API limits and reload the page.
            </p>
          </div>
        ) : repos.length === 0 && !loading ? (
          <div className="projects-empty reveal">
            <strong>No public repositories were found.</strong>
            <p>Check the GitHub username and reload the page.</p>
          </div>
        ) : (
          repos.map((repo) => <ProjectCard key={repo.id} repo={repo} />)
        )}
      </div>
    </section>
  );
}
