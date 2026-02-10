/**
 * API Configuration for OctoFit Tracker
 * Constructs API URLs based on environment
 */

const getApiBaseUrl = () => {
  const codespaceUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  return codespaceUrl;
};

const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  // Users endpoints - https://CODESPACE_NAME-8000.app.github.dev/api/users
  USERS: `${API_BASE_URL}/api/users/`,
  
  // Teams endpoints - https://CODESPACE_NAME-8000.app.github.dev/api/teams
  TEAMS: `${API_BASE_URL}/api/teams/`,
  
  // Activities endpoints - https://CODESPACE_NAME-8000.app.github.dev/api/activities
  ACTIVITIES: `${API_BASE_URL}/api/activities/`,
  
  // Leaderboard endpoints - https://CODESPACE_NAME-8000.app.github.dev/api/leaderboard
  LEADERBOARD: `${API_BASE_URL}/api/leaderboard/`,
  
  // Workouts endpoints - https://CODESPACE_NAME-8000.app.github.dev/api/workouts
  WORKOUTS: `${API_BASE_URL}/api/workouts/`,
};

// Codespace-specific full URLs:
// https://{CODESPACE_NAME}-8000.app.github.dev/api/users/
// https://{CODESPACE_NAME}-8000.app.github.dev/api/teams/
// https://{CODESPACE_NAME}-8000.app.github.dev/api/activities/
// https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
// https://{CODESPACE_NAME}-8000.app.github.dev/api/workouts/

export default API_ENDPOINTS;
