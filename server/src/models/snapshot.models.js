const pool = require('../config/db');

async function getLastGithubSnapshots(userId, limit = 5) {
  const [rows] = await pool.query(
    'SELECT * FROM github_snapshots WHERE user_id = ? ORDER BY fetched_at DESC LIMIT ?',
    [userId, limit]
  );
  return rows;
}

async function saveGithubSnapshot(userId, repoName, commitCount, language) {
  await pool.query(
    'INSERT INTO github_snapshots (user_id, repo_name, commit_count, language) VALUES (?, ?, ?, ?)',
    [userId, repoName, commitCount, language]
  );
}

module.exports = { getLastGithubSnapshots, saveGithubSnapshot };