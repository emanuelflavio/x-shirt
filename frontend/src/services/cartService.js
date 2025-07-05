
import api from './api'; 

const CART_URL = '/xshirt/cart'; 

const cartService = {
  getCart: async () => {
    try {
      const response = await api.get(`${CART_URL}/cartUse`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar o carrinho:', error.response?.data || error.message);
      throw error;
    }
  },

 
  addItem: async (variationsId, quantity) => {
    try {
      const response = await api.post(`${CART_URL}/add`, { variationsId, quantity });
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error.response?.data || error.message);
      throw error;
    }
  },

 
  updateItemQuantity: async (cartItemId, newQuantity) => {
    try {
      const response = await api.put(`${CART_URL}/update`, { id: cartItemId, quantity: newQuantity });
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar quantidade do item no carrinho:', error.response?.data || error.message);
      throw error;
    }
  },

 
  removeItem: async (cartItemId) => {
    try {
      const response = await api.delete(`${CART_URL}/${cartItemId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error.response?.data || error.message);
      throw error;
    }
  },

 
  clearCart: async () => {
    try {
      await api.delete(`${CART_URL}/clear`);
    } catch (error) {
      console.error('Erro ao limpar o carrinho:', error.response?.data || error.message);
      throw error;
    }
  },
};

export default cartService;