const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../models/user.model');

async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: { message: 'Email et mot de passe requis' } });
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({ error: { message: 'Cet email est déjà utilisé' } });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userId = await createUser(email, passwordHash);

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(201).json({ token, user: { id: userId, email } });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: { message: 'Email et mot de passe requis' } });
  }

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ error: { message: 'Identifiants invalides' } });
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    return res.status(401).json({ error: { message: 'Identifiants invalides' } });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.json({ token, user: { id: user.id, email: user.email } });
}

module.exports = { register, login };