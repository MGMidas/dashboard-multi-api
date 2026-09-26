const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Étape 1 : Récupérer l'en-tête Authorization
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: { message: 'Aucun token fourni — en-tête Authorization manquant' }
    });
  }

  // Étape 2 : Vérifier le format "Bearer <token>"
  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({
      error: { message: 'Format du token invalide — attendu: "Bearer <token>"' }
    });
  }

  const token = parts[1];

  // Étape 3 : Vérifier et décoder le token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Étape 4 : Attacher les infos utilisateur à la requête pour les prochains middlewares/controllers
    req.userId = decoded.userId;

    // Étape 5 : Passer au middleware/controller suivant
    next();
  } catch (err) {
    // Le token peut être invalide (signature incorrecte) ou expiré
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: { message: 'Token expiré, reconnecte-toi' } });
    }
    return res.status(401).json({ error: { message: 'Token invalide' } });
  }
}

module.exports = authMiddleware;