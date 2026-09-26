const { getConnectionsByUser } = require('../models/connection.model');
const { getLastGithubSnapshots, saveGithubSnapshot } = require('../models/snapshot.models');

const CACHE_DURATION_MS = 15 * 60 * 1000;

async function getGithubData(req, res) {
  const userId = req.userId;

  const connections = await getConnectionsByUser(userId);
  const githubConnection = connections.find((c) => c.service === 'github');

  if (!githubConnection) {
    return res.status(400).json({ error: { message: 'Aucun compte GitHub lié' } });
  }

  const username = githubConnection.external_id;

  const lastSnapshots = await getLastGithubSnapshots(userId);
  const mostRecentFetch = lastSnapshots[0]?.fetched_at;
  const cacheExpired =
    !mostRecentFetch || (Date.now() - new Date(mostRecentFetch).getTime()) > CACHE_DURATION_MS;

  if (!cacheExpired) {
    return res.json({ repos: lastSnapshots, stale: false, cached: true });
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);

    if (!response.ok) {
      throw new Error(`GitHub API a répondu avec le statut ${response.status}`);
    }

    const repos = await response.json();

    for (const repo of repos) {
      await saveGithubSnapshot(userId, repo.name, null, repo.language);
    }

    res.json({
      repos: repos.map((r) => ({
        name: r.name,
        language: r.language,
        stars: r.stargazers_count,
        updated_at: r.updated_at,
        url: r.html_url,
      })),
      stale: false,
      cached: false,
    });
  } catch (err) {
    if (lastSnapshots.length > 0) {
      return res.json({ repos: lastSnapshots, stale: true, error: err.message });
    }
    throw err;
  }
}

module.exports = { getGithubData };