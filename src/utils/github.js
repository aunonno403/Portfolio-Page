const GITHUB_USERNAME = "aunonno403";
const EXCLUDED_REPOS = new Set([
  "Portfolio-Page",
  "dotfiles",
  "config",
  "setup",
  "Lab-7",
  "Product-Landing-Page",
  "Portfolio_Page_using_Hugo",
  "Realtime-Object-Detection-Mobile-app",
  "aunonno403",
  "Leetcode-Solutions",
  "Survey-Form",
  "Tribute-Page",
]);

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

export async function fetchGitHubProjects() {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated&direction=desc&type=owner`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub request failed (${response.status})`);
    }

    const repos = await response.json();
    const filteredRepos = repos
      .filter((repo) => !repo.fork)
      .filter((repo) => !EXCLUDED_REPOS.has(repo.name))
      .sort((left, right) => new Date(right.updated_at) - new Date(left.updated_at));

    return {
      success: true,
      repos: filteredRepos,
      count: filteredRepos.length,
    };
  } catch (error) {
    console.error("GitHub API error:", error);
    return {
      success: false,
      repos: [],
      count: 0,
      error: error.message,
    };
  }
}

export { formatCount, escapeHtml };
