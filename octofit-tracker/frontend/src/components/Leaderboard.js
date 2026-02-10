import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

// API Endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = API_ENDPOINTS.LEADERBOARD;
        console.log('Fetching from Leaderboard API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle both paginated (.results) and plain array responses
        const leaderboardData = Array.isArray(data) ? data : (data.results || []);
        console.log('Leaderboard fetched:', leaderboardData);
        
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalEmoji = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return '🏅';
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0">🎯 Leaderboard</h2>
        </div>
        <div className="card-body">
          {loading && (
            <div className="alert alert-info" role="alert">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Loading leaderboard...
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {!loading && !error && leaderboard.length === 0 && (
            <div className="alert alert-warning" role="alert">
              No leaderboard data available at this time.
            </div>
          )}
          
          {!loading && !error && leaderboard.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Rank</th>
                    <th>Player Name</th>
                    <th>Score</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={entry.id || entry._id}>
                      <td>
                        <span className="fs-5">{getMedalEmoji(index + 1)}</span>
                        <span className="badge bg-dark ms-2">{index + 1}</span>
                      </td>
                      <td className="fw-bold">{entry.name || entry.username}</td>
                      <td>
                        <span className="badge bg-success fs-6">{entry.score || entry.points || 0}</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">View Profile</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
