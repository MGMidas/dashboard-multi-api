import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const linkClass = (path) =>
    `text-sm font-medium transition ${
      location.pathname === path
        ? 'text-white'
        : 'text-slate-400 hover:text-white'
    }`;

  return (
    <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="text-white font-bold text-lg tracking-tight">
          Dashboard<span className="text-purple-400">.</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/dashboard" className={linkClass('/dashboard')}>
            Tableau de bord
          </Link>
          <Link to="/connections" className={linkClass('/connections')}>
            Connexions
          </Link>
          <button
            onClick={logout}
            className="text-sm text-slate-400 hover:text-red-400 transition"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;