import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Login from './Components/Login';
import Register from './Components/Register';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminQuizzes from './Components/Admin/AdminQuizzes';
import AddQuiz from './Components/Admin/AddQuiz';
import EditQuiz from './Components/Admin/EditQuiz';
import ViewScores from './Components/Admin/ViewScores';
import UserLogin from './Components/UserLogin';
import UserDashboard from './Components/User/UserDashboard';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path='/userlogin' element={<UserLogin/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/quizzes" element={<AdminQuizzes />} />
        <Route path="/admin/quizzes/add" element={<AddQuiz />} />
        <Route path="/admin/quizzes/edit/:id" element={<EditQuiz />} />
        <Route path="/admin/scores" element={<ViewScores />} />
        <Route path='/user-dashboard' element={<UserDashboard/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
