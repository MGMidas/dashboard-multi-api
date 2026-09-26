const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');
const { getGithubData } = require('../controllers/github.controller');

router.use(authMiddleware);

router.get('/github', asyncHandler(getGithubData));

module.exports = router;