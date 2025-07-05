
import api from './api'; 

const FAVORITES_URL = '/xshirt/favorites'; 

const favoriteService = {
  
  getFavorites: async () => {
    try {
      const response = await api.get(`${FAVORITES_URL}`); // Endpoint: GET /api/favoritos/meus
      return response.data;
    } catch (error) {
      console.error('Erro ao listar favoritos:', error.response?.data || error.message);
      throw error;
    }
  },

 
  addFavorite: async (camisaId) => {
    try {
      const response = await api.post(`${FAVORITES_URL}/${camisaId}`); // Endpoint: POST /api/favoritos/adicionar/{camisaId}
      return response.data;
    } catch (error) {
      console.error(`Erro ao adicionar camisa ${camisaId} aos favoritos:`, error.response?.data || error.message);
      throw error;
    }
  },

 
  removeFavorite: async (camisaId) => {
    try {
      await api.delete(`${FAVORITES_URL}/${camisaId}`); // Endpoint: DELETE /api/favoritos/remover/{camisaId}
    } catch (error) {
      console.error(`Erro ao remover camisa ${camisaId} dos favoritos:`, error.response?.data || error.message);
      throw error;
    }
  },
};

export default favoriteService;