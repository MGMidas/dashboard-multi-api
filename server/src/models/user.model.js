const pool = require('../config/db');

async function createUser(email, passwordHash) {
    const [result] = await pool.query(
        'INSERT INTO users (email, password_hash) VALUES (?, ?)',
        [email, passwordHash]
    );
    return result.insertId;
}

async function findUserByEmail(email) {
    const [rows] = await pool.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
}

module.exports = { createUser, findUserByEmail };