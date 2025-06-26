
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
    try {
      const dataToSend = { ...userData, type: 'USER' }; 

      const response = await api.post(`${AUTH_URL}/register`, dataToSend);
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