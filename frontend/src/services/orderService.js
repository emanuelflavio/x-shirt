
import api from './api';

const ORDER_URL = '/xshirt/order'; 

const orderService = {
 
  finalizeOrder: async (orderData) => {
    try {

      const response = await api.post(`${ORDER_URL}/finalize`, orderData);
      return response.data;
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error.response?.data || error.message);
      throw error;
    }
  },


  getOrderById: async (orderId) => {
    try {
      const response = await api.get(`${ORDER_URL}/${orderId}`); 
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar pedido ${orderId}:`, error.response?.data || error.message);
      throw error;
    }
  },

  getOrdersByUser: async () => {
    try {
      const response = await api.get(`${ORDER_URL}/my`); 
      return response.data;
    } catch (error) {
      console.error('Erro ao listar pedidos do usuário:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default orderService;