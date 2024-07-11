import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddQuiz.css';
import authService from '../../services/authService';

const AddQuiz = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timer, setTimer] = useState('');
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], answer: '' }]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', '', ''], answer: '' }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setQuestions(updatedQuestions);
  };

  const validateForm = () => {
    if (!title || !timer || questions.some(q => !q.question || q.options.some(o => !o) || !q.answer)) {
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
      const newQuiz = { title, description, timer, questions };
      await authService.addQuiz(newQuiz);
      navigate('/admin/quizzes');
    } catch (error) {
      setError('Error adding quiz. Please try again.');
      console.error('Error adding quiz:', error);
    }
  };

  return (
    <div className="add-quiz-container">
      <h2>Add New Quiz</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="add-quiz-form">
        <div className="form-group">
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Timer (in minutes):</label>
          <input type="number" value={timer} onChange={(e) => setTimer(e.target.value)} required />
        </div>
        {questions.map((question, qIndex) => (
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
        <button type="button" onClick={handleAddQuestion}>
          Add Another Question
        </button>
        <button type="submit">Save Quiz</button>
      </form>
    </div>
  );
};

export default AddQuiz;
