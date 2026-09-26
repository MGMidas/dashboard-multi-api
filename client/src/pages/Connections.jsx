import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../services/api';

const SERVICES = [
  { key: 'github', label: 'GitHub', fieldLabel: 'Username GitHub' },
  { key: 'steam', label: 'Steam', fieldLabel: 'Steam ID' },
];

function Connections() {
  const [connections, setConnections] = useState([]);
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConnections();
  }, []);

  async function loadConnections() {
    try {
      const data = await api.getConnections();
      setConnections(data.connections);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function isConnected(service) {
    return connections.some((c) => c.service === service);
  }

  function getExternalId(service) {
    return connections.find((c) => c.service === service)?.external_id;
  }

  async function handleConnect(service) {
    setError('');
    const value = inputs[service];
    if (!value) return;

    try {
      if (service === 'github') await api.connectGithub(value);
      if (service === 'steam') await api.connectSteam(value);
      setInputs({ ...inputs, [service]: '' });
      await loadConnections();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDisconnect(service) {
    try {
      await api.disconnectService(service);
      await loadConnections();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-white">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Connexions</h1>
          <Link to="/dashboard" className="text-purple-400 hover:underline text-sm">
            ← Dashboard
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {SERVICES.map(({ key, label, fieldLabel }) => (
            <div key={key} className="bg-slate-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">{label}</span>
                {isConnected(key) && (
                  <span className="text-green-400 text-sm">✓ Connecté ({getExternalId(key)})</span>
                )}
              </div>

              {isConnected(key) ? (
                <button
                  onClick={() => handleDisconnect(key)}
                  className="w-full p-2 rounded bg-slate-700 hover:bg-red-900 text-white text-sm transition"
                >
                  Délier
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={fieldLabel}
                    value={inputs[key] || ''}
                    onChange={(e) => setInputs({ ...inputs, [key]: e.target.value })}
                    className="flex-1 p-2 rounded bg-slate-700 text-white placeholder-slate-400 outline-none text-sm"
                  />
                  <button
                    onClick={() => handleConnect(key)}
                    className="px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition"
                  >
                    Lier
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Connections;