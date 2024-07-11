import React from 'react';
import './Dashboard.css'; // Import CSS file

const UserDashboard = () => {
  // Hardcoded dashboard data
  const dashboardData = {
    totalQuizzes: 20,
    totalUsers: 150,
    averageScore: 85,
    // Add more metrics as needed
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="dashboard-metrics">
        <div className="dashboard-metric">
          <h3>Total Quizzes</h3>
          <p>{dashboardData.totalQuizzes}</p>
        </div>
        <div className="dashboard-metric">
          <h3>Total Users</h3>
          <p>{dashboardData.totalUsers}</p>
        </div>
        <div className="dashboard-metric">
          <h3>Average Quiz Score</h3>
          <p>{dashboardData.averageScore}%</p>
        </div>
        {/* Add more dashboard metrics as needed */}
      </div>
    </div>
  );
};

export default UserDashboard;
