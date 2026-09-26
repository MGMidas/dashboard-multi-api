const rateLimit = require('express-rate-limit');

// Limite générale, pour toutes les routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes par IP sur cette fenêtre
  message: { error: { message: 'Trop de requêtes, réessaie plus tard' } },
});

// Limite stricte, spécifique aux routes sensibles (login/register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // seulement 10 tentatives de connexion/inscription par IP
  message: { error: { message: 'Trop de tentatives, réessaie dans 15 minutes' } },
});

module.exports = { generalLimiter, authLimiter };