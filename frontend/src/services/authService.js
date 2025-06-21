import { data } from 'react-router-dom';
import api from './api';

const AUTH_URL = '/xshirt/auth'; 

const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post(`${AUTH_URL}/login`, { email, password });
      return response.data; 
    } catch (error) {
      console.error('Erro no login:', error.response?.data || error.message);
      throw error; 
    }
  },

  register: async (userData) => { 
    userData.type = 'USER';
    console.log(userData)
    try {
      const response = await api.post(`${AUTH_URL}/register`, userData);
      return response.data; 
    } catch (error) {
      console.error('Erro no registro:', error.response?.data || error.message);
      throw error; 
    }
  },

  setAuthToken: (token) => {
    localStorage.setItem('jwtToken', token);
  },

  getAuthToken: () => {
    return localStorage.getItem('jwtToken');
  },

  removeAuthToken: () => {
    localStorage.removeItem('jwtToken');
  }
};

export default authService;