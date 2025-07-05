
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import orderService from '../services/orderService.js';
import { useAuth } from '../context/AuthContext.jsx';

const OrderDetailsPage = () => {
  const { id } = useParams(); 
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!user) {
        setError('Usuário não autenticado. Por favor, faça login para ver os detalhes do pedido.');
        setLoading(false);
        return;
      }
      if (!id) {
        setError('ID do pedido não fornecido.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');
      try {
        const fetchedOrder = await orderService.getOrderById(id);
        setOrder(fetchedOrder);
      } catch (err) {
        setError(err.response?.data?.message || 'Falha ao carregar os detalhes do pedido. Verifique se o pedido existe ou pertence a você.');
        console.error('Erro ao buscar detalhes do pedido:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, user]);

  const formatAddress = (addr) => {
    if (!addr) return 'Endereço inválido';
    return `${addr.street || ''}, ${addr.number || ''} ${addr.complement ? '- ' + addr.complement : ''}, ${addr.neighborhood || ''}, ${addr.city || ''} - ${addr.state || ''}, ${addr.zipcode || ''}`;
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Carregando detalhes do pedido...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-red-600">
        {error}
        <p className="mt-4">
          <Link to="/perfil/pedidos" className="text-blue-600 hover:underline">Voltar para Meus Pedidos</Link>
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Pedido não encontrado ou inacessível.
        <p className="mt-4">
          <Link to="/perfil/pedidos" className="text-blue-600 hover:underline">Voltar para Meus Pedidos</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Detalhes do Pedido #{order.id}</h1>

        <div className="text-left border-t border-b border-gray-200 py-6 mb-6">
          <p className="text-lg font-semibold text-gray-800 mb-2">Data do Pedido: <span className="font-normal text-gray-600">{new Date(order.DateOrder).toLocaleDateString('pt-BR')}</span></p>
          <p className="text-lg font-semibold text-gray-800 mb-2">Status Atual: <span className="font-normal text-gray-600">{order.status}</span></p>
          <p className="text-lg font-bold text-gray-800 mt-4">Total: <span className="font-extrabold text-indigo-600">R$ {order.total ? order.total.toFixed(2).replace('.', ',') : '0,00'}</span></p>
        </div>

        <div className="text-left mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Itens do Pedido:</h2>
          <ul className="space-y-2 list-disc pl-5">
            {(order.orderItems || []).map(item => (
              <li key={item.id} className="text-gray-700">
                <span className="font-medium">{item.product.name || item.variationName}</span> x {item.quantity} - R$ {item.priceUnitary ? item.priceUnitary.toFixed(2).replace('.', ',') : '0,00'} cada
                <span className="float-right font-semibold">R$ {item.subtotalPrice ? item.subtotalPrice.toFixed(2).replace('.', ',') : '0,00'}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-left mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Endereço de Entrega:</h2>
          <p className="text-gray-700">{formatAddress(order.address)}</p>
        </div>

        <div className="text-left mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Método de Pagamento: {order.payment.method}</h2>
          
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <Link
            to="/perfil/pedidos"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-md transition duration-300 shadow-lg"
          >
            Voltar para Meus Pedidos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;