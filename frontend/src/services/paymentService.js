
import api from './api';

const paymentService = {
  
  getAvailablePaymentMethods: async () => {

    return [
      { id: '1', name: 'Cartão de Crédito', description: 'Visa, Mastercard, Elo' },
      { id: '3', name: 'PIX', description: 'Pagamento instantâneo via QR Code' },
      { id: '2', name: 'Cartão de Débito', description: 'Visa, Mastercard, Elo' },
    ];
  },

};

export default paymentService;