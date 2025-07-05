
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import productService from '../services/productService';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import favoriteService from '../services/favoriteService.js'; 

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addToCartMessage, setAddToCartMessage] = useState('');
  const [isFavorited, setIsFavorited] = useState(false); 
  const [favoriteActionMessage, setFavoriteActionMessage] = useState(''); 

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        if (data.variations && data.variations.length > 0) {
          const firstAvailable = data.variations.find(v => v.stock > 0) || data.variations[0];
          setSelectedVariation(firstAvailable);
        }

        
        if (user) {
          try {
            const favorites = await favoriteService.getFavorites();
            const favorited = favorites.some(fav => fav.camisa.id === data.id);
            setIsFavorited(favorited);
          } catch (favErr) {
            console.error('Erro ao verificar favoritos iniciais:', favErr);
          }
        }

      } catch (err) {
        setError('Falha ao carregar detalhes do produto.');
        console.error('Erro ao buscar detalhes do produto:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, user]);

  const handleVariationChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const variation = product.variations.find(v => v.id === selectedId);
    setSelectedVariation(variation);
    setQuantity(1);
  };

  const handleAddToCart = async () => {
    if (!user) {
      setAddToCartMessage('Você precisa estar logado para adicionar itens ao carrinho.');
      return;
    }
    if (!selectedVariation) {
      setAddToCartMessage('Por favor, selecione uma variação (tamanho/cor).');
      return;
    }
    if (quantity <= 0 || quantity > selectedVariation.stock) {
      setAddToCartMessage(`Quantidade inválida. Estoque disponível: ${selectedVariation.stock}`);
      return;
    }

    try {
      await addToCart(selectedVariation.id, quantity);
      setAddToCartMessage('Item adicionado ao carrinho com sucesso!');
      setQuantity(1);
    } catch (err) {
      setAddToCartMessage('Falha ao adicionar item ao carrinho. Tente novamente.');
      console.error('Erro ao adicionar ao carrinho:', err);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!user) {
      setFavoriteActionMessage('Você precisa estar logado para gerenciar favoritos.');
      return;
    }
    setFavoriteActionMessage('');
    try {
      if (isFavorited) {
        await favoriteService.removeFavorite(product.id);
        setIsFavorited(false);
        setFavoriteActionMessage('Produto removido dos favoritos.');
      } else {
        await favoriteService.addFavorite(product.id);
        setIsFavorited(true);
        setFavoriteActionMessage('Produto adicionado aos favoritos!');
      }
    } catch (err) {
      setFavoriteActionMessage(err.response?.data?.message || 'Erro ao gerenciar favoritos.');
      console.error('Erro ao gerenciar favoritos:', err);
    }
  };


  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Carregando detalhes do produto...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-red-600">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Produto não encontrado.
      </div>
    );
  }

  const priceToDisplay = selectedVariation?.price || product?.price;
  const displayImageUrl = selectedVariation?.imagesShirts?.[0]?.urlImage || product.imageUrl || 'https://via.placeholder.com/600x400?text=Sem+Imagem';

  return (
    <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={displayImageUrl}
            alt={product.name}
            className="w-full h-96 object-cover object-center rounded-lg shadow-sm"
          />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>
          <p className="text-3xl font-extrabold text-blue-600 mb-6">
            R$ {
                priceToDisplay !== undefined && priceToDisplay !== null
                ? priceToDisplay.toFixed(2).replace('.', ',')
                : 'N/A'
            }
          </p>

          {/* Seleção de Variações */}
          {product.variations && product.variations.length > 0 && (
            <div className="mb-6">
              <label htmlFor="variation-select" className="block text-gray-700 text-sm font-bold mb-2">
                Selecione a Variação:
              </label>
              <select
                id="variation-select"
                className="block w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                onChange={handleVariationChange}
                value={selectedVariation ? selectedVariation.id : ''}
              >
                {!selectedVariation || product.variations.filter(v => v.stock > 0).length === 0 ? (
                    <option value="">Selecione...</option>
                ) : null}
                {product.variations.map(v => (
                  <option key={v.id} value={v.id} disabled={v.stock === 0}>
                    {v.size} - {v.color} (Estoque: {v.stock})
                  </option>
                ))}
              </select>
              {selectedVariation && selectedVariation.stock === 0 && (
                <p className="text-red-500 text-sm mt-1">Variação esgotada!</p>
              )}
            </div>
          )}
          {product.variations && product.variations.length === 0 && (
              <p className="text-red-500 text-sm mt-1">Este produto não possui variações disponíveis.</p>
          )}


          {/* Quantidade e Adicionar ao Carrinho */}
          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="text-gray-700 text-sm font-bold">Quantidade:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center"
              disabled={!selectedVariation || selectedVariation.stock === 0}
            />
            <button
              onClick={handleAddToCart}
              className={`py-2 px-6 rounded-md font-semibold text-white transition duration-300
                ${!selectedVariation || selectedVariation.stock === 0 || quantity <= 0 || quantity > selectedVariation.stock
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700'
                }`}
              disabled={!selectedVariation || selectedVariation.stock === 0 || quantity <= 0 || quantity > selectedVariation.stock}
            >
              Adicionar ao Carrinho
            </button>
          </div>

          {addToCartMessage && (
            // <<< CORREÇÃO DA LINHA ABAIXO >>>
            <div className={`p-3 text-sm rounded-lg ${addToCartMessage.includes('sucesso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} role="alert">
              {addToCartMessage}
            </div>
          )}

          {/* Botão de Favoritos */}
          <div className="mt-6">
            {favoriteActionMessage && (
                <div className={`p-3 mb-3 text-sm rounded-lg ${favoriteActionMessage.includes('Erro') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`} role="alert">
                    {favoriteActionMessage}
                </div>
            )}
            <button
              onClick={handleFavoriteToggle}
              className={`py-2 px-6 rounded-md font-semibold transition duration-300 w-full flex items-center justify-center space-x-2
                ${isFavorited
                  ? 'bg-red-500 hover:bg-red-600 text-white' // Se já favoritado, botão vermelho para remover
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white' // Se não favoritado, botão amarelo para adicionar
                }`}
              disabled={!user} // Desabilita se não estiver logado
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path></svg>
              <span>{isFavorited ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</span>
            </button>
            {!user && (
                <p className="text-sm text-gray-500 mt-2 text-center">Faça login para gerenciar seus favoritos.</p>
            )}
          </div>


          <div className="mt-8 border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Avaliações de Clientes</h2>

            <p className="text-gray-500">Nenhuma avaliação ainda. Seja o primeiro a avaliar!</p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;