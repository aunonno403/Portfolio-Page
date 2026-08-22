import { SITE } from "../data/site";
import { FEATURED_PROJECTS, SECONDARY_PROJECTS } from "../data/projects";

const API_URL = `https://api.github.com/users/${SITE.githubUsername}/repos?per_page=100&sort=updated&direction=desc&type=owner`;

const CACHE_KEY = "gh:repos:v2";
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Unauthenticated GitHub allows 60 requests/hour per IP. Without caching every
 * page view — including every in-session reload — spends one, and hitting the
 * limit blanks the whole section.
 */
function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const { at, repos } = JSON.parse(raw);
    if (!Array.isArray(repos) || Date.now() - at > CACHE_TTL_MS) return null;

    return repos;
  } catch {
    // Private mode, disabled storage, or corrupt entry — just refetch.
    return null;
  }
}

function writeCache(repos) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
  } catch {
    // Quota or blocked storage; caching is an optimisation, not a requirement.
  }
}

function toDisplayDate(value) {
  if (!value) return null;

  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
}

/** Merges one curated entry with its live GitHub record. */
function mergeProject(entry, repo, featured) {
  if (!repo) return null;

  return {
    id: repo.id,
    repo: repo.name,
    title: entry.title ?? repo.name.replace(/[-_]/g, " "),
    summary: entry.summary ?? repo.description?.trim() ?? "",
    stack: entry.stack ?? [],
    highlight: entry.highlight ?? null,
    language: entry.language ?? repo.language ?? null,
    stars: repo.stargazers_count ?? 0,
    forks: repo.forks_count ?? 0,
    updated: toDisplayDate(repo.updated_at),
    url: repo.html_url,
    demo: entry.demo ?? (repo.homepage?.trim() || null),
    featured,
  };
}

async function fetchRepos() {
  const cached = readCache();
  if (cached) return cached;

  const response = await fetch(API_URL, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    if (response.status === 403 && remaining === "0") {
      throw new Error("rate-limited");
    }
    throw new Error(`GitHub request failed (${response.status})`);
  }

  const repos = await response.json();
  writeCache(repos);

  return repos;
}

export async function fetchGitHubProjects() {
  try {
    const repos = await fetchRepos();
    const byName = new Map(repos.map((repo) => [repo.name, repo]));

    const featured = FEATURED_PROJECTS.map((entry) =>
      mergeProject(entry, byName.get(entry.repo), true)
    ).filter(Boolean);

    const secondary = SECONDARY_PROJECTS.map((entry) =>
      mergeProject(entry, byName.get(entry.repo), false)
    ).filter(Boolean);

    return { success: true, featured, secondary };
  } catch (error) {
    console.error("GitHub API error:", error);

    return {
      success: false,
      featured: [],
      secondary: [],
      rateLimited: error.message === "rate-limited",
    };
  }
}
