export const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

async function http(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.json()
}

export const api = {
  seedTeas() { return http('/api/seed-teas', { method: 'POST' }) },
  startJourney(payload) { return http('/api/journey', { method: 'POST', body: JSON.stringify(payload) }) },
  recordInteraction(payload) { return http('/api/interaction', { method: 'POST', body: JSON.stringify(payload) }) },
  analyze(journey_id) { return http('/api/analyze', { method: 'POST', body: JSON.stringify({ journey_id }) }) },
}
