import axios from 'axios';

const API_URL = 'http://localhost:5000/api';  // Replace with your backend API URL

const register = (name, email, password, role) => {
  return axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
    role,
  });
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const addQuiz = async (newQuiz) => {
  try {
    const response = await axios.post(`${API_URL}/quizzes`, newQuiz, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getQuizzes = async () => {
  try {
    const response = await axios.get(`${API_URL}/quizzes`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getQuizById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/quizzes/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateQuiz = async (id, updatedQuiz) => {
  try {
    const response = await axios.put(`${API_URL}/quizzes/${id}`, updatedQuiz, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteQuiz = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/quizzes/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  register,
  login,
  logout,
  addQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
};
