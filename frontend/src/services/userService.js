// frontend/src/services/userService.js
import api from './api';

const USER_URL = '/xshirt/user'; 

const userService = {

  getUserProfile: async () => {
    try {
      const response = await api.get(`${USER_URL}/me`); // Exemplo: GET /api/users/me
      return response.data;
    } catch (error) {
      console.error('Erro ao obter perfil do usuário:', error.response?.data || error.message);
      throw error;
    }
  },

 
  updateUserProfile: async (userData) => {
    try {
      const response = await api.put(`${USER_URL}/me`, userData); // Exemplo: PUT /api/users/me
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil do usuário:', error.response?.data || error.message);
      throw error;
    }
  },


};

export default userService;