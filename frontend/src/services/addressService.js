// frontend/src/services/addressService.js
import api from './api';

const ADDRESS_URL = '/xshirt/address'; 

const addressService = {
  
  getAddresses: async () => {
    try {
      const response = await api.get(`${ADDRESS_URL}/listAll`); 
      return response.data;
    } catch (error) {
      console.error('Erro ao listar endereços:', error.response?.data || error.message);
      throw error;
    }
  },

 
  addAddress: async (addressData) => {
    try {
      const response = await api.post(ADDRESS_URL, addressData); 
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error.response?.data || error.message);
      throw error;
    }
  },


  updateAddress: async (id, addressData) => {
    try {
      const response = await api.put(`${ADDRESS_URL}/${id}`, addressData); 
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar endereço ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },


  deleteAddress: async (id) => {
    try {
      await api.delete(`${ADDRESS_URL}/${id}`);
    } catch (error) {
      console.error(`Erro ao remover endereço ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },
};

export default addressService;