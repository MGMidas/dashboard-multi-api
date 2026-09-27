const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');
const { getSteamData } = require('../controllers/steam.controller');

router.use(authMiddleware);
router.get('/steam', asyncHandler(getSteamData));

module.exports = router;