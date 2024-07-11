import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const decodedUser = jwtDecode(JSON.parse(storedUser).token);
      setUser(decodedUser);
    }
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    const decodedUser = jwtDecode(response.token);
    setUser(decodedUser);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const register = async (name, email, password, role) => {
    await authService.register(name, email, password, role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;