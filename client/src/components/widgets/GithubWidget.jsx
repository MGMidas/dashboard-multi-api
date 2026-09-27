import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../../services/api';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import ErrorState from '../ui/ErrorState';
import Skeleton from '../ui/Skeleton';

function GithubWidget() {
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading');
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
      setStatus(err.message.includes('lié') ? 'empty' : 'error');
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className="text-lg">💻</span>
          <span className="text-sm font-medium text-[#FAFAFA]">GitHub</span>
          {status === 'success' && <Badge variant="success">Connected</Badge>}
        </div>
        {stale && <Badge variant="warning">Données périmées</Badge>}
      </div>

      {status === 'loading' && (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      )}

      {status === 'empty' && (
        <EmptyState
          title="GitHub isn't connected"
          description="Connect your GitHub account to start seeing your repositories."
          actionLabel="Connect GitHub"
        />
      )}

      {status === 'error' && (
        <ErrorState description={errorMessage} onRetry={loadData} />
      )}

      {status === 'success' && (
        <>
          <ul className="space-y-1.5">
            {repos.map((repo) => (
              <li
                key={repo.id || repo.name}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors duration-150"
              >
                <span className="text-sm text-[#FAFAFA] truncate">
                  {repo.repo_name || repo.name}
                </span>
                <span className="text-xs text-[#A1A1AA] shrink-0 ml-2">
                  {repo.language || 'N/A'}
                </span>
              </li>
            ))}
          </ul>
          <Link to="/connections">
            <Button variant="ghost" className="mt-3 w-full justify-center">
              View GitHub
            </Button>
          </Link>
        </>
      )}
    </Card>
  );
}

export default GithubWidget;