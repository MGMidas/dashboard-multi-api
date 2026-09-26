const { getConnectionsByUser, upsertConnection, deleteConnection } = require('../models/connection.model');

async function listConnections(req, res) {
  const connections = await getConnectionsByUser(req.userId);
  res.json({ connections });
}

async function connectGithub(req, res) {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: { message: 'Username GitHub requis' } });
  }
  await upsertConnection(req.userId, 'github', username);
  res.json({ message: 'Compte GitHub lié' });
}

async function connectSteam(req, res) {
  const { steamId } = req.body;
  if (!steamId) {
    return res.status(400).json({ error: { message: 'Steam ID requis' } });
  }
  await upsertConnection(req.userId, 'steam', steamId);
  res.json({ message: 'Compte Steam lié' });
}

async function disconnect(req, res) {
  const { service } = req.params;
  await deleteConnection(req.userId, service);
  res.json({ message: `${service} délié` });
}

module.exports = { listConnections, connectGithub, connectSteam, disconnect };