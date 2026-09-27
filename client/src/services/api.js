const API_URL = 'http://localhost:3001/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || 'Une erreur est survenue');
  }

  return data;
}

export function register(email, password) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function login(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

export function getConnections() {
  return request('/connections');
}

export function connectGithub(username) {
  return request('/connections/github', {
    method: 'POST',
    body: JSON.stringify({ username }),
  });
}

export function connectSteam(steamId) {
  return request('/connections/steam', {
    method: 'POST',
    body: JSON.stringify({ steamId }),
  });
}

export function disconnectService(service) {
  return request(`/connections/${service}`, {
    method: 'DELETE',
  });
}

export function getGithubData() {
  return request('/dashboard/github');
}

export function getSteamData() {
  return request('/dashboard/steam');
}