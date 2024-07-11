import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';


const AdminDashboard = () => {
  const [quizzesCount, setQuizzesCount] = useState(0);

  useEffect(() => {
    const fetchQuizzesCount = async () => {
      try {
        const response = await axios.get('/api/quizzes');
        setQuizzesCount(response.data.length);
      } catch (error) {
        console.error('Error fetching quizzes count:', error);
      }
    };

    fetchQuizzesCount();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-section">
        <h3>Quizzes Overview</h3>
        <p>Total Quizzes: {quizzesCount}</p>
      </div>
      <div className="dashboard-links">
        <Link to="/admin/quizzes">Manage Quizzes</Link>
        <Link to="/admin/scores">View Scores</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
