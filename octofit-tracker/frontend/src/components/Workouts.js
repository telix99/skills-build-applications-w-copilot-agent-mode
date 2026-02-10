import React, { useState, useEffect } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const codespaceUrl = process.env.REACT_APP_CODESPACE_NAME
          ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
          : 'http://localhost:8000';
        
        const apiUrl = `${codespaceUrl}/api/workouts/`;
        console.log('Fetching from Workouts API:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Handle both paginated (.results) and plain array responses
        const workoutsData = Array.isArray(data) ? data : (data.results || []);
        console.log('Workouts fetched:', workoutsData);
        
        setWorkouts(workoutsData);
      } catch (err) {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  const getIntensityBadge = (intensity) => {
    const intLower = intensity?.toLowerCase() || '';
    if (intLower === 'high' || intLower === 'intense') return 'bg-danger';
    if (intLower === 'medium' || intLower === 'moderate') return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="mb-0">💪 Workouts</h2>
          <button className="btn btn-success btn-sm">+ Create Workout</button>
        </div>
        <div className="card-body">
          {loading && (
            <div className="alert alert-info" role="alert">
              <div className="spinner-border spinner-border-sm me-2" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              Loading workouts...
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger" role="alert">
              <strong>Error:</strong> {error}
            </div>
          )}
          
          {!loading && !error && workouts.length === 0 && (
            <div className="alert alert-warning" role="alert">
              No workouts available. Create one to get started!
            </div>
          )}
          
          {!loading && !error && workouts.length > 0 && (
            <div className="table-responsive">
              <table className="table table-hover table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Workout ID</th>
                    <th>Workout Name</th>
                    <th>Duration</th>
                    <th>Intensity</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout) => (
                    <tr key={workout.id || workout._id}>
                      <td>
                        <span className="badge bg-secondary">{workout.id || workout._id}</span>
                      </td>
                      <td className="fw-bold">{workout.name}</td>
                      <td>
                        <span className="badge bg-info">{workout.duration || 0} mins</span>
                      </td>
                      <td>
                        <span className={`badge ${getIntensityBadge(workout.intensity)}`}>
                          {workout.intensity || 'N/A'}
                        </span>
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

export default Workouts;
