import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditQuiz.css';
import authService from '../../services/authService';

const EditQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState({ title: '', description: '', timer: '', questions: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await authService.getQuizById(id);
        setQuiz(data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching quiz. Please try again.');
        console.error('Error fetching quiz:', error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index][field] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuiz({ ...quiz, questions: updatedQuestions });
  };

  const validateForm = () => {
    if (!quiz.title || !quiz.timer || quiz.questions.some(q => !q.question || q.options.some(o => !o) || !q.answer)) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setError('Please fill out all fields correctly.');
      return;
    }

    try {
      await authService.updateQuiz(id, quiz);
      navigate('/admin/quizzes');
    } catch (error) {
      setError('Error updating quiz. Please try again.');
      console.error('Error updating quiz:', error);
    }
  };

  return (
    <div className="edit-quiz-container">
      <h2>Edit Quiz</h2>
      {loading && <p>Loading quiz...</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-quiz-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={quiz.description}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Timer (in minutes):</label>
          <input
            type="number"
            value={quiz.timer}
            onChange={(e) => setQuiz({ ...quiz, timer: e.target.value })}
            required
          />
        </div>
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="form-group">
            <label>Question {qIndex + 1}:</label>
            <input
              type="text"
              value={question.question}
              onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
              required
            />
            {question.options.map((option, oIndex) => (
              <input
                key={oIndex}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                placeholder={`Option ${oIndex + 1}`}
                required
              />
            ))}
            <input
              type="text"
              value={question.answer}
              onChange={(e) => handleQuestionChange(qIndex, 'answer', e.target.value)}
              placeholder="Correct Answer"
              required
            />
          </div>
        ))}
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditQuiz;
