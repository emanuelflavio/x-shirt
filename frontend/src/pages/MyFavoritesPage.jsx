// frontend/src/pages/User/MyFavoritesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import favoriteService from '../services/favoriteService.js'; // Seu serviço de favoritos

const MyFavoritesPage = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]); // Lista de FavoritoResponseDTOs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionMessage, setActionMessage] = useState(''); // Mensagens de sucesso/erro para ações

  // Efeito para carregar os favoritos do usuário
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        const fetchedFavorites = await favoriteService.getFavorites();
        setFavorites(fetchedFavorites);
      } catch (err) {
        setError(err.response?.data?.message || 'Falha ao carregar seus favoritos.');
        console.error('Erro ao buscar favoritos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]); // Depende do usuário logado

  // Função para remover um item dos favoritos
  const handleRemoveFavorite = async (camisaId) => {
    if (window.confirm('Tem certeza que deseja remover este item dos seus favoritos?')) {
      setActionMessage('');
      try {
        await favoriteService.removeFavorite(camisaId);
        // Atualiza a lista removendo o item do estado
        setFavorites(favorites.filter(fav => fav.camisa.id !== camisaId));
        setActionMessage('Item removido dos favoritos com sucesso!');
      } catch (err) {
        setActionMessage(err.response?.data?.message || 'Erro ao remover item dos favoritos.');
        console.error('Erro ao remover favorito:', err);
      }
    }
  };

  // ----- Renderização Condicional com Base nos Estados -----
  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Carregando favoritos...
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
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meus Favoritos</h1>

        {actionMessage && (
          <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg text-center">{actionMessage}</div>
        )}
        {error && !actionMessage && ( // Exibe erro de carregamento se não houver mensagem de ação
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg text-center">{error}</div>
        )}

        {favorites.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <p className="text-xl mb-4">Você ainda não tem nenhum favorito.</p>
            <Link
              to="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300"
            >
              Começar a Explorar Produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {console.log(favorites)}
            {favorites.map((favItem) => (
              <div key={favItem.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link to={`/products/${favItem.shirt.id}`}>
                  <img
                    src={favItem.shirt.imageUrl || 'https://via.placeholder.com/300x200?text=Sem+Imagem'}
                    alt={favItem.shirt.name}
                    className="w-full h-48 object-cover object-center"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    <Link to={`/products/${favItem.camisa.id}`} className="hover:text-blue-600 transition-colors">
                      {favItem.camisa.name}
                    </Link>
                  </h3>
                  <p className="text-xl font-bold text-gray-800 mb-3">
                    R$ {favItem.camisa.price ? favItem.camisa.price.toFixed(2).replace('.', ',') : 'N/A'}
                  </p>
                  <button
                    onClick={() => handleRemoveFavorite(favItem.camisa.id)}
                    className="block w-full text-center bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md transition duration-300"
                  >
                    Remover dos Favoritos
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link to="/perfil" className="text-blue-600 hover:underline">Voltar ao Perfil</Link>
        </div>
      </div>
    </div>
  );
};

export default MyFavoritesPage;