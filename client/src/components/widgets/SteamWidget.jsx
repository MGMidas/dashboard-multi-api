import { useState, useEffect } from 'react';
import * as api from '../../services/api';

function SteamWidget() {
  const [games, setGames] = useState([]);
  const [status, setStatus] = useState('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [stale, setStale] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setStatus('loading');
    try {
      const data = await api.getSteamData();
      setGames(data.games);
      setStale(data.stale);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  }

  function formatPlaytime(minutes) {
    const hours = Math.round(minutes / 60);
    return `${hours} h`;
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-semibold">🎮 Steam</h2>
        {stale && (
          <span className="text-yellow-400 text-xs">⚠ Données périmées</span>
        )}
      </div>

      {status === 'loading' && (
        <p className="text-slate-400 text-sm">Chargement...</p>
      )}

      {status === 'error' && (
        <p className="text-red-400 text-sm">{errorMessage}</p>
      )}

      {status === 'success' && (
        <ul className="space-y-2">
          {games.map((game) => (
            <li
              key={game.id || game.appid}
              className="bg-slate-700 rounded p-3 flex gap-3 items-center"
            >
              {(game.rawg_image_url || game.rawgImageUrl) && (
                <img
                  src={game.rawg_image_url || game.rawgImageUrl}
                  alt={game.game_name || game.name}
                  className="w-14 h-14 object-cover rounded flex-shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="text-white font-medium truncate">
                  {game.game_name || game.name}
                </p>
                <p className="text-slate-400 text-xs mt-1">
                  {formatPlaytime(game.playtime_minutes || game.playtimeMinutes)}
                  {(game.rawg_genre || game.rawgGenre) && ` · ${game.rawg_genre || game.rawgGenre}`}
                  {(game.rawg_rating || game.rawgRating) && ` · ⭐ ${game.rawg_rating || game.rawgRating}`}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SteamWidget;