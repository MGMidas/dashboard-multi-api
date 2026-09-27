import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import GithubWidget from '../components/widgets/GithubWidget';
import SteamWidget from '../components/widgets/SteamWidget';

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-1">
          Bienvenue, {user?.email}
        </h1>
        <p className="text-slate-400 text-sm mb-8">
          Voici un aperçu de ton activité récente
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <GithubWidget />
          <SteamWidget />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;