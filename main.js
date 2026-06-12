const GITHUB_USERNAME = "aunonno403";
const EXCLUDED_REPOS = new Set([
  // Portfolio and config repos (typically not meant as showcased projects)
  "Portfolio-Page",
  "dotfiles",
  "config",
  "setup",
  // Add more repository names here to hide them from the projects section.
  // Examples: "learning-repo", "archived-project", "experimental"
]);

const projectsGrid = document.getElementById("projects-grid");
const projectsStatus = document.getElementById("projects-status");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatCount(value, singular, plural = `${singular}s`) {
  return `${value} ${value === 1 ? singular : plural}`;
}

function createProjectCard(repo) {
  const card = document.createElement("article");
  card.className = "project-card reveal";

  const language = repo.language ? repo.language : "Mixed";
  const stars = formatCount(repo.stargazers_count ?? 0, "star");
  const forks = formatCount(repo.forks_count ?? 0, "fork");
  const updated = repo.updated_at ? new Date(repo.updated_at).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  }) : "Recently updated";

  const topics = Array.isArray(repo.topics) && repo.topics.length > 0
    ? repo.topics.slice(0, 4)
    : [language.toLowerCase(), "github"];

  card.innerHTML = `
    <header>
      <div>
        <span class="repo-badge">${escapeHtml(repo.fork ? "Fork" : "Project")}</span>
        <h3>${escapeHtml(repo.name)}</h3>
      </div>
      <span class="project-meta">${escapeHtml(language)}</span>
    </header>
    <p>${escapeHtml(repo.description ? repo.description : "No description provided yet.")}</p>
    <div class="project-meta">
      <span>${escapeHtml(stars)}</span>
      <span>${escapeHtml(forks)}</span>
      <span>${escapeHtml(updated)}</span>
    </div>
    <div class="project-topics">
      ${topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}
    </div>
    <div class="project-links">
      <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noreferrer">View repo</a>
      ${repo.homepage ? `<a href="${escapeHtml(repo.homepage)}" target="_blank" rel="noreferrer">Live demo</a>` : ""}
    </div>
  `;

  return card;
}

function showEmptyState(message) {
  projectsGrid.innerHTML = `
    <div class="projects-empty reveal">
      <strong>${message}</strong>
      <p>Check the GitHub username, repository filters, or API limits and reload the page.</p>
    </div>
  `;
}

async function loadProjects() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub request failed (${response.status})`);
    }

    const repos = await response.json();
    const filteredRepos = repos
      .filter((repo) => !repo.fork)
      .filter((repo) => !EXCLUDED_REPOS.has(repo.name))
      .sort((left, right) => new Date(right.updated_at) - new Date(left.updated_at));

    if (!filteredRepos.length) {
      showEmptyState("No public repositories were found.");
      projectsStatus.textContent = "No repositories available right now.";
      return;
    }

    projectsGrid.innerHTML = "";
    filteredRepos.forEach((repo) => {
      projectsGrid.appendChild(createProjectCard(repo));
    });

    projectsStatus.textContent = `${filteredRepos.length} repositories loaded from GitHub.`;
  } catch (error) {
    console.error(error);
    showEmptyState("Unable to load GitHub repositories.");
    projectsStatus.textContent = "Showing fallback state until GitHub data loads successfully.";
  }
}

loadProjects();