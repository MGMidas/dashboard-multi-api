import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

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
    <div className="min-h-screen bg-[#09090B] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-[#8B5CF6] opacity-[0.07] blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-sm relative">
        <div className="text-center mb-8">
          <span className="text-lg font-semibold tracking-tight text-[#FAFAFA]">
            Midas
          </span>
        </div>

        <div className="bg-[#111114] border border-white/[0.08] rounded-xl p-6">
          <h1 className="text-lg font-semibold text-[#FAFAFA] mb-1">
            Connexion
          </h1>
          <p className="text-sm text-[#A1A1AA] mb-6">
            Accède à ton dashboard
          </p>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 px-3 py-2 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 text-sm text-[#EF4444]">
                {error}
              </div>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 mb-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-[#FAFAFA] placeholder-[#A1A1AA] outline-none focus:border-[#8B5CF6]/50 transition-colors duration-150"
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 mb-4 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-[#FAFAFA] placeholder-[#A1A1AA] outline-none focus:border-[#8B5CF6]/50 transition-colors duration-150"
              required
            />
            <Button type="submit" className="w-full justify-center">
              Se connecter
            </Button>
          </form>

          <p className="text-sm text-[#A1A1AA] mt-5 text-center">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-[#8B5CF6] hover:underline">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;