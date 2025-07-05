// frontend/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = authService.getAuthToken();
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          const userData = await authService.getProfile();
          setUser(userData); 
          
        } catch (error) {
          
          console.error('Falha ao carregar perfil do usuário a partir do token:', error);
          logout(); 
        }
        
      }
      setLoading(false);
    };

    loadUserFromToken();

    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.warn('Token expirado ou inválido. Realizando logout automático.');
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []); 
  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      if (data.token) {
        authService.setAuthToken(data.token);
        
        const userData = await authService.getProfile(); 
        setUser(userData);
        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const data = await authService.register(userData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.removeAuthToken();
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg text-gray-700">
        Carregando autenticação...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);