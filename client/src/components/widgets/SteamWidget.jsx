import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../services/api';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import ErrorState from '../ui/ErrorState';
import Skeleton from '../ui/Skeleton';

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
      setStatus(err.message.includes('lié') ? 'empty' : 'error');
    }
  }

  function formatPlaytime(minutes) {
    return `${Math.round(minutes / 60)} h`;
  }

  const totalPlaytime = games.reduce(
    (sum, g) => sum + (g.playtime_minutes || g.playtimeMinutes || 0),
    0
  );

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">🎮</span>
          <span className="text-sm font-medium text-[#FAFAFA]">Steam</span>
          {status === 'success' && <Badge variant="success">Connected</Badge>}
        </div>
        {stale && <Badge variant="warning">Données périmées</Badge>}
      </div>

      {status === 'loading' && (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      )}

      {status === 'empty' && (
        <EmptyState
          title="Steam isn't connected"
          description="Connect your Steam account to start seeing your game library."
          actionLabel="Connect Steam"
        />
      )}

      {status === 'error' && (
        <ErrorState description={errorMessage} onRetry={loadData} />
      )}

      {status === 'success' && (
        <>
          {games.length > 0 && (
            <p className="text-xs text-[#A1A1AA] mb-3">
              {formatPlaytime(totalPlaytime)} de jeu au total
            </p>
          )}
          <ul className="space-y-1.5">
            {games.map((game) => {
              const image = game.rawg_image_url || game.rawgImageUrl;
              const name = game.game_name || game.name;
              const playtime = game.playtime_minutes || game.playtimeMinutes;
              const genre = game.rawg_genre || game.rawgGenre;
              const rating = game.rawg_rating || game.rawgRating;

              return (
                <li
                  key={game.id || game.appid}
                  className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/[0.03] transition-colors duration-150"
                >
                  {image && (
                    <img
                      src={image}
                      alt={name}
                      className="w-11 h-11 object-cover rounded-md shrink-0"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[#FAFAFA] truncate">{name}</p>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">
                      {formatPlaytime(playtime)}
                      {genre && ` · ${genre}`}
                      {rating && ` · ★ ${rating}`}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link to="/connections">
            <Button variant="ghost" className="mt-3 w-full justify-center">
              View Steam
            </Button>
          </Link>
        </>
      )}
    </Card>
  );
}

export default SteamWidget;