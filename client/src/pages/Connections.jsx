import { useState, useEffect } from 'react';
import * as api from '../services/api';
import DashboardLayout from '../components/layout/DashboardLayout';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';

const SERVICES = [
  { key: 'github', label: 'GitHub', icon: '💻', description: 'Affiche tes repositories récents et leur activité.', fieldLabel: 'Username GitHub' },
  { key: 'steam', label: 'Steam', icon: '🎮', description: 'Affiche ta bibliothèque de jeux et ton temps de jeu.', fieldLabel: 'Steam ID' },
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

  const connectedServices = SERVICES.filter((s) => isConnected(s.key));
  const availableServices = SERVICES.filter((s) => !isConnected(s.key));

  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-sm text-[#A1A1AA]">Chargement...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#FAFAFA] tracking-tight">
          Connections
        </h1>
        <p className="text-sm text-[#A1A1AA] mt-1">
          Gère les services connectés à ton dashboard
        </p>
      </div>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 text-sm text-[#EF4444]">
          {error}
        </div>
      )}

      {connectedServices.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-medium tracking-wider text-[#A1A1AA]/70 mb-3">
            CONNECTED
          </p>
          <div className="space-y-3">
            {connectedServices.map((service) => (
              <Card key={service.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-lg">{service.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#FAFAFA]">{service.label}</span>
                      <Badge variant="success">Connected</Badge>
                    </div>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">{getExternalId(service.key)}</p>
                  </div>
                </div>
                <Button variant="danger" onClick={() => handleDisconnect(service.key)}>
                  Disconnect
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {availableServices.length > 0 && (
        <div>
          <p className="text-xs font-medium tracking-wider text-[#A1A1AA]/70 mb-3">
            AVAILABLE
          </p>
          <div className="space-y-3">
            {availableServices.map((service) => (
              <Card key={service.key}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-lg">{service.icon}</span>
                  <div>
                    <span className="text-sm font-medium text-[#FAFAFA]">{service.label}</span>
                    <p className="text-xs text-[#A1A1AA] mt-0.5">{service.description}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={service.fieldLabel}
                    value={inputs[service.key] || ''}
                    onChange={(e) => setInputs({ ...inputs, [service.key]: e.target.value })}
                    className="flex-1 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-[#FAFAFA] placeholder-[#A1A1AA] outline-none focus:border-[#8B5CF6]/50 transition-colors duration-150"
                  />
                  <Button onClick={() => handleConnect(service.key)}>
                    Connect
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Connections;