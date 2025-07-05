
import api from './api'; 

const PRODUCTS_URL = '/xshirt/shirt'; 

const productService = {

  getAllProducts: async (params = {}) => {
    try {
      const response = await api.get(PRODUCTS_URL, { params });
      return response.data; 
    } catch (error) {
      console.error('Erro ao buscar produtos:', error.response?.data || error.message);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const response = await api.get(`${PRODUCTS_URL}/${id}`);
      return response.data; 
    } catch (error) {
      console.error(`Erro ao buscar produto com ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

};

export default productService;