const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');

const {
  listConnections,
  connectGithub,
  connectSteam,
  disconnect,
} = require('../controllers/connections.controller');

router.use(authMiddleware); // toutes les routes ci-dessous nécessitent d'être connecté

router.get('/', asyncHandler(listConnections));
router.post('/github', asyncHandler(connectGithub));
router.post('/steam', asyncHandler(connectSteam));
router.delete('/:service', asyncHandler(disconnect));

module.exports = router;