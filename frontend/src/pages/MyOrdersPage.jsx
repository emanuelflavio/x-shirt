// frontend/src/pages/User/MyOrdersPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import orderService from '../services/orderService.js'; // Seu serviço de pedidos

const MyOrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyOrders = async () => {
      if (!user) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        // Assume que getOrdersByUser já filtra por usuário logado
        const fetchedOrders = await orderService.getOrdersByUser();
        setOrders(fetchedOrders);
      } catch (err) {
        setError(err.response?.data?.message || 'Falha ao carregar seus pedidos.');
        console.error('Erro ao buscar pedidos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Carregando seus pedidos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-red-600">
        {error}
        <p className="mt-4">
          <Link to="/perfil" className="text-blue-600 hover:underline">Voltar ao Perfil</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meus Pedidos</h1>

        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-xl text-gray-600 mb-4">Você ainda não fez nenhum pedido.</p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Começar a Comprar
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pedido #
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.DateOrder).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {order.total ? order.total.toFixed(2).replace('.', ',') : '0,00'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${order.status === 'DELIVERED' ? 'bg-green-100 text-green-800' :
                          order.status === 'CANCELED' ? 'bg-red-100 text-red-800' :
                          order.status === 'AWAITING_PAYMENT' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/perfil/pedidos/${order.id}`} className="text-indigo-600 hover:text-indigo-900">
                        Ver Detalhes
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8 text-center">
            <Link to="/perfil" className="text-blue-600 hover:underline">Voltar ao Perfil</Link>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;