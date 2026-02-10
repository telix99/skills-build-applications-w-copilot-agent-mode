import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="/octofitapp-small.png" alt="OctoFit Logo" />
              OctoFit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <div className="container mt-5 mb-5">
                <div className="home-hero">
                  <h1>🐙 Welcome to OctoFit Tracker</h1>
                  <p>Your complete fitness tracking and team management solution</p>
                </div>
                
                <div className="home-cards">
                  <Link to="/users" className="card text-decoration-none text-dark">
                    <div className="card-body text-center">
                      <h5 className="card-title">👥 Users</h5>
                      <p className="card-text">Manage and view all registered users</p>
                      <button className="btn btn-primary">View Users</button>
                    </div>
                  </Link>

                  <Link to="/teams" className="card text-decoration-none text-dark">
                    <div className="card-body text-center">
                      <h5 className="card-title">🏆 Teams</h5>
                      <p className="card-text">Create and manage fitness teams</p>
                      <button className="btn btn-primary">View Teams</button>
                    </div>
                  </Link>

                  <Link to="/workouts" className="card text-decoration-none text-dark">
                    <div className="card-body text-center">
                      <h5 className="card-title">💪 Workouts</h5>
                      <p className="card-text">Track and view workout routines</p>
                      <button className="btn btn-primary">View Workouts</button>
                    </div>
                  </Link>

                  <Link to="/activities" className="card text-decoration-none text-dark">
                    <div className="card-body text-center">
                      <h5 className="card-title">📊 Activities</h5>
                      <p className="card-text">Log and monitor fitness activities</p>
                      <button className="btn btn-primary">View Activities</button>
                    </div>
                  </Link>

                  <Link to="/leaderboard" className="card text-decoration-none text-dark">
                    <div className="card-body text-center">
                      <h5 className="card-title">🎯 Leaderboard</h5>
                      <p className="card-text">See top performers and rankings</p>
                      <button className="btn btn-primary">View Leaderboard</button>
                    </div>
                  </Link>
                </div>
              </div>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
