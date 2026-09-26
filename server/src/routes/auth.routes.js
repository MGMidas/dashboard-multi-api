const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/auth.controller');
const asyncHandler = require('../middlewares/asyncHandler');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/me', authMiddleware, (req, res) => {
    res.json({ message: 'Tu es authentifié !', userId: req.userId});
});

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));

module.exports = router;