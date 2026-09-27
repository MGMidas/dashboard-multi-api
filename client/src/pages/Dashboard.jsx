import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GithubWidget from '../components/widgets/GithubWidget';
import SteamWidget from '../components/widgets/SteamWidget';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8">
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl font-bold text-white mb-2">
          Bienvenue, {user?.email}
        </h1>

        <div className="flex gap-4 mb-6">
          <Link to="/connections" className="text-purple-400 hover:underline text-sm">
            Gérer mes connexions
          </Link>
          <button
            onClick={logout}
            className="text-slate-400 hover:text-white text-sm"
          >
            Se déconnecter
          </button>
        </div>

        <GithubWidget />
        <SteamWidget />
      </div>
    </div>
  );
}

export default Dashboard;