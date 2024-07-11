import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewScores.css';

const ViewScores = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get('/api/scores');
        setScores(response.data);
      } catch (error) {
        console.error('Error fetching scores:', error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="scores-container">
      <h2>All Scores</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Quiz</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score._id}>
              <td>{score.user}</td>
              <td>{score.quiz}</td>
              <td>{score.score}</td>
              <td>{new Date(score.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewScores;
