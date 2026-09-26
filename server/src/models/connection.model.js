const pool = require('../config/db');

async function getConnectionsByUser(userId) {
  const [rows] = await pool.query(
    'SELECT service, external_id, connected_at FROM user_connections WHERE user_id = ?',
    [userId]
  );
  return rows;
}

async function upsertConnection(userId, service, externalId) {
  await pool.query(
    `INSERT INTO user_connections (user_id, service, external_id)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE external_id = ?, connected_at = CURRENT_TIMESTAMP`,
    [userId, service, externalId, externalId]
  );
}

async function deleteConnection(userId, service) {
  await pool.query(
    'DELETE FROM user_connections WHERE user_id = ? AND service = ?',
    [userId, service]
  );
}

module.exports = { getConnectionsByUser, upsertConnection, deleteConnection };