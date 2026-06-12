import { formatCount, escapeHtml } from "../utils/github";

export function ProjectCard({ repo }) {
  const language = repo.language ? repo.language : "Mixed";
  const stars = formatCount(repo.stargazers_count ?? 0, "star");
  const forks = formatCount(repo.forks_count ?? 0, "fork");
  const updated = repo.updated_at
    ? new Date(repo.updated_at).toLocaleDateString(undefined, {
        month: "short",
        year: "numeric",
      })
    : "Recently updated";

  const topics =
    Array.isArray(repo.topics) && repo.topics.length > 0
      ? repo.topics.slice(0, 4)
      : [language.toLowerCase(), "github"];

  return (
    <article className="project-card reveal">
      <header>
        <div>
          <span className="repo-badge">{repo.fork ? "Fork" : "Project"}</span>
          <h3>{repo.name}</h3>
        </div>
        <span className="project-meta">{language}</span>
      </header>
      <p>
        {repo.description ? repo.description : "No description provided yet."}
      </p>
      <div className="project-meta">
        <span>{stars}</span>
        <span>{forks}</span>
        <span>{updated}</span>
      </div>
      <div className="project-topics">
        {topics.map((topic) => (
          <span key={topic}>{topic}</span>
        ))}
      </div>
      <div className="project-links">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
        >
          View repo
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
          >
            Live demo
          </a>
        )}
      </div>
    </article>
  );
}
