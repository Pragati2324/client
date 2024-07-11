import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminQuizzes.css';
import authService from '../../services/authService';
const AdminQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await authService.getQuizzes();
        setQuizzes(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching quizzes. Please try again.');
        console.error('Error fetching quizzes:', error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await authService.deleteQuiz(id);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
    } catch (error) {
      setError('Error deleting quiz. Please try again.');
      console.error('Error deleting quiz:', error);
    }
  };
  return (
    <div className="quizzes-container">
      <h2>All Quizzes</h2>
      {loading && <p>Loading quizzes...</p>}
      {error && <p className="error">{error}</p>}
      <Link to="/admin/quizzes/add" className="btn-add">
        Add New Quiz
      </Link>
      <ul className="quizzes-list">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="quiz-item">
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <p>Timer: {quiz.timer} minutes</p>
            <button onClick={() => navigate(`/admin/quizzes/edit/${quiz._id}`)} className="btn-edit">
              Edit
            </button>
            <button onClick={() => handleDelete(quiz._id)} className="btn-delete">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminQuizzes;
