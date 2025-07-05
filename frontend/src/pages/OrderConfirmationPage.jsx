
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import orderService from '../services/orderService.js'; 
import { useAuth } from '../context/AuthContext.jsx'; 

const OrderConfirmationPage = () => {
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
          <Link to="/" className="text-blue-600 hover:underline">Voltar à Home</Link>
          {user && <span className="mx-2">|</span>}
          {user && <Link to="/perfil/pedidos" className="text-blue-600 hover:underline">Ver Meus Pedidos</Link>} {/* Rota para listagem de pedidos */}
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Pedido não encontrado ou inacessível.
        <p className="mt-4">
          <Link to="/" className="text-blue-600 hover:underline">Voltar à Home</Link>
          {user && <span className="mx-2">|</span>}
          {user && <Link to="/perfil/pedidos" className="text-blue-600 hover:underline">Ver Meus Pedidos</Link>}
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
        <svg className="w-16 h-16 mx-auto text-green-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 className="text-4xl font-bold text-green-700 mb-4">Pedido Confirmado!</h1>
        <p className="text-xl text-gray-700 mb-6">Obrigado pela sua compra.</p>
        

        <div className="text-left border-t border-b border-gray-200 py-6 mb-6">
          <p className="text-lg font-semibold text-gray-800 mb-2">Número do Pedido: <span className="font-bold text-blue-600">{order.id}</span></p>
          <p className="text-lg font-semibold text-gray-800 mb-2">Data do Pedido: <span className="font-normal text-gray-600">{new Date(order.DateOrder).toLocaleDateString('pt-BR')}</span></p> 
          <p className="text-lg font-semibold text-gray-800 mb-2">Status Atual: <span className="font-normal text-gray-600">{order.status}</span></p>
          <p className="text-lg font-bold text-gray-800 mt-4">Total: <span className="font-extrabold text-indigo-600">R$ {order.total ? order.total.toFixed(2).replace('.', ',') : '0,00'}</span></p>
        </div>

        {console.log(order)}
        {/* Detalhes dos Itens do Pedido */}
        <div className="text-left mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Itens do Pedido:</h2>
          <ul className="space-y-2 list-disc pl-5">
            {(order.orderItems || []).map(item => (
              <li key={item.id} className="text-gray-700">
                <span className="font-medium">{item.product.name ||  item.variation.color}</span> x {item.quantity} - R$ {item.priceUnitary ? item.priceUnitary.toFixed(2).replace('.', ',') : '0,00'} cada
                <span className="float-right font-semibold">R$ {item.subtotalPrice ? item.subtotalPrice.toFixed(2).replace('.', ',') : '0,00'}</span>
              </li>
            ))}
          </ul>
        </div>

       
        <div className="text-left mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Endereço de Entrega:</h2>
          <p className="text-gray-700">{formatAddress(order.address)}</p> {/* Assumindo 'order.address' */}
        </div>

        
        <div className="text-left mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Método de Pagamento: {order.payment.method}</h2>
         
        </div>

        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
          <Link
            to="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300 shadow-lg"
          >
            Continuar Comprando
          </Link>
          <Link
            to="/perfil/pedidos" 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-md transition duration-300 shadow-lg"
          >
            Ver Meus Pedidos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;