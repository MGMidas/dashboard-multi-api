require('dotenv').config();
const app = require('./src/app');
const pool = require('./src/config/db');

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connexion à la base de données réussie');
    connection.release();

    app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
  } catch (err) {
    console.error('❌ Erreur de connexion à la base de données :', err.message);
    process.exit(1);
  }
}

startServer();