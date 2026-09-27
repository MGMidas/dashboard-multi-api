const { getConnectionsByUser } = require('../models/connection.model');
const { getLastSteamGames, saveSteamGame } = require('../models/steam.model');

const CACHE_DURATION_MS = 15 * 60 * 1000;

async function fetchRawgData(gameName) {
  try {
    const url = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&search=${encodeURIComponent(gameName)}&page_size=1`;
    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    const game = data.results?.[0];
    if (!game) return null;

    return {
      rating: game.rating,
      genre: game.genres?.[0]?.name || null,
      imageUrl: game.background_image || null,
    };
  } catch {
    // Si RAWG échoue pour un jeu, on continue sans enrichissement plutôt que de tout faire planter
    return null;
  }
}

async function getSteamData(req, res) {
  const userId = req.userId;

  // Étape 1 : Vérifier que l'utilisateur a lié Steam
  const connections = await getConnectionsByUser(userId);
  const steamConnection = connections.find((c) => c.service === 'steam');

  if (!steamConnection) {
    return res.status(400).json({ error: { message: 'Aucun compte Steam lié' } });
  }

  const steamId = steamConnection.external_id;

  // Étape 2 : Vérifier le cache
  const lastGames = await getLastSteamGames(userId);
  const mostRecentFetch = lastGames[0]?.fetched_at;
  const cacheExpired =
    !mostRecentFetch || (Date.now() - new Date(mostRecentFetch).getTime()) > CACHE_DURATION_MS;

  if (!cacheExpired) {
    return res.json({ games: lastGames, stale: false, cached: true });
  }

  // Étape 3 : Appeler l'API Steam
  try {
    const steamUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true`;
    const steamResponse = await fetch(steamUrl);

    if (!steamResponse.ok) {
      throw new Error(`Steam API a répondu avec le statut ${steamResponse.status}`);
    }

    const steamData = await steamResponse.json();
    const allGames = steamData.response?.games || [];

    // On limite à 5 jeux (ceux avec le plus de temps de jeu) pour ne pas spammer RAWG
    const topGames = allGames
      .sort((a, b) => b.playtime_forever - a.playtime_forever)
      .slice(0, 5);

    // Étape 4 : Enrichir chaque jeu avec RAWG, puis sauvegarder
    const fetchedAt = new Date();
    const enrichedGames = [];
    for (const game of topGames) {
      const rawgData = await fetchRawgData(game.name);

      const enrichedGame = {
        appid: game.appid,
        name: game.name,
        playtimeMinutes: game.playtime_forever,
        rawgRating: rawgData?.rating || null,
        rawgGenre: rawgData?.genre || null,
        rawgImageUrl: rawgData?.imageUrl || null,
      };

      await saveSteamGame(userId, enrichedGame, fetchedAt);
      enrichedGames.push(enrichedGame);
    }

    res.json({ games: enrichedGames, stale: false, cached: false });
  } catch (err) {
    // Étape 5 : stale-while-error
    if (lastGames.length > 0) {
      return res.json({ games: lastGames, stale: true, error: err.message });
    }
    throw err;
  }
}

module.exports = { getSteamData };