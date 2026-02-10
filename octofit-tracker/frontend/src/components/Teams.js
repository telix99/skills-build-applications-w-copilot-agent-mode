import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api';

// API Endpoint: https://{CODESPACE_NAME}-8000.app.github.dev/api/teams/

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = API_ENDPOINTS.TEAMS;
        console.log('Fetching from Teams API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle both paginated (.results) and plain array responses
        const teamsData = Array.isArray(data) ? data : (data.results || []);
        console.log('Teams fetched:', teamsData);
        
        setTeams(teamsData);
      } catch (err) {
        console.error('Error fetching teams:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">🏆 Teams</h2>
          <button className="btn btn-success btn-sm">+ Create Team</button>
        </div>
        <div className="card-body">
          {loading && (
            <div className="alert alert-info" role="alert">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Loading teams...
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {!loading && !error && teams.length === 0 && (
            <div className="alert alert-warning" role="alert">
              No teams available. Create one to get started!
            </div>
          )}
          
          {!loading && !error && teams.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Team ID</th>
                    <th>Team Name</th>
                    <th>Members</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id || team._id}>
                      <td>
                        <span className="badge bg-secondary">{team.id || team._id}</span>
                      </td>
                      <td className="fw-bold">{team.name}</td>
                      <td>
                        <span className="badge bg-info">{team.members ? team.members.length : 0} members</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-primary">View</button>
                        <button className="btn btn-sm btn-warning ms-2">Edit</button>
                        <button className="btn btn-sm btn-danger ms-2">Delete</button>
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

export default Teams;
