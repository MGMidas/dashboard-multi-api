import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    try {
      await loginUser(email, password);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold text-white mb-6">Connexion</h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 rounded bg-slate-700 text-white placeholder-slate-400 outline-none"
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-slate-700 text-white placeholder-slate-400 outline-none"
          required
        />
        <button
          type="submit"
          className="w-full p-3 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
        >
          Se connecter
        </button>

        <p className="text-slate-400 text-sm mt-4 text-center">
          Pas encore de compte ?{' '}
          <Link to="/register" className="text-purple-400 hover:underline">
            S'inscrire
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;