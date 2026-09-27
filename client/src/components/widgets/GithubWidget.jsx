import { useState, useEffect } from 'react';
import * as api from '../../services/api';

function GithubWidget() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | error | success
  const [errorMessage, setErrorMessage] = useState('');
  const [stale, setStale] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setStatus('loading');
    try {
      const data = await api.getGithubData();
      setRepos(data.repos);
      setStale(data.stale);
      setStatus('success');
    } catch (err) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-5 w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white font-semibold">💻 GitHub</h2>
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
          {repos.map((repo) => (
            <li
              key={repo.id || repo.name}
              className="bg-slate-900/40 hover:bg-slate-900/60 rounded-lg p-3 transition ..."
            >
              <p className="text-white font-medium">
                {repo.repo_name || repo.name}
              </p>
              <p className="text-slate-400 text-xs mt-1">
                {repo.language || 'N/A'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GithubWidget;