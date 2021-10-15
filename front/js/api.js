const apiBaseURL = 'http://localhost:3000'
/**
 * Fetch l'API avec les headers nécessaires, etc
 */
export const fetchApi = async (endpoint, params = null, method = 'GET') => {
  const request = new Request(`${apiBaseURL}${endpoint}`, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: params === null ? null : JSON.stringify(params)
  })
  const response = await fetch(request)
  return await response.json()
}
