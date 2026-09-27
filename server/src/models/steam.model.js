const pool = require('../config/db');

async function getLastSteamGames(userId) {
  const [rows] = await pool.query(
    'SELECT * FROM steam_games WHERE user_id = ? ORDER BY fetched_at DESC',
    [userId]
  );
  return rows;
}

async function saveSteamGame(userId, game) {
  await pool.query(
    `INSERT INTO steam_games
      (user_id, steam_appid, game_name, playtime_minutes, rawg_rating, rawg_genre, rawg_image_url)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      userId,
      game.appid,
      game.name,
      game.playtimeMinutes,
      game.rawgRating,
      game.rawgGenre,
      game.rawgImageUrl,
    ]
  );
}

module.exports = { getLastSteamGames, saveSteamGame };