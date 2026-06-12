import { formatCount } from "../utils/github";

const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Kotlin: "#A97BFF",
  Java: "#b07219",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Dart: "#00B4AB",
  Mixed: "#8b8b8b",
};

export function ProjectCard({ repo }) {
  const language = repo.language ?? "Mixed";
  const langColor = LANGUAGE_COLORS[language] ?? "#8b8b8b";
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
      : [language.toLowerCase()].filter(Boolean);

  const displayName = repo.name
    ? repo.name.replace(/-/g, " ").replace(/_/g, " ")
    : "Untitled Project";

  return (
    <article
      className={`project-card reveal ${repo.fork ? "project-card--fork" : ""}`}
      data-tilt-card="true"
    >
      <header>
        <div>
          {repo.fork && <span className="repo-badge repo-badge--fork">Fork</span>}
          <h3 title={repo.name}>{displayName}</h3>
        </div>
        <span className="project-meta language-tag">
          <span
            className="language-dot"
            style={{ backgroundColor: langColor }}
            aria-hidden="true"
          />
          {language}
        </span>
      </header>

      <p className="project-description">
        {repo.description?.trim() || "No description provided yet."}
      </p>

      <div className="project-meta project-stats">
        <span title="Stars">⭐ {stars}</span>
        <span title="Forks">🍴 {forks}</span>
        <span title="Last updated">🕒 {updated}</span>
      </div>

      {topics.length > 0 && (
        <div className="project-topics">
          {topics.map((topic) => (
            <span key={topic} className="topic-tag">
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="project-links">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="project-details-toggle"
          aria-label={`View ${displayName} on GitHub`}
        >
          View on GitHub
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer"
            className="project-details-toggle"
            aria-label={`View live demo of ${displayName}`}
          >
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}