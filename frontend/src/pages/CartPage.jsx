
import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx'; 
import CartItemDisplay from '../components/cart/CartItemDisplay.jsx'; 

const CartPage = () => {
  const { cart, loading, error, clearCurrentCart } = useCart();
  const [isClearing, setIsClearing] = useState(false); 
  const [clearError, setClearError] = useState(''); 

  
  
  const handleClearCart = async () => {
    if (window.confirm('Tem certeza que deseja limpar todo o carrinho? Esta ação é irreversível.')) {
      setIsClearing(true); 
      setClearError(''); 
      try {
        await clearCurrentCart();
      } catch (err) {
        setClearError('Erro ao limpar o carrinho.');
        console.error('Erro ao limpar o carrinho:', err);
      } finally {
        setIsClearing(false); 
      }
    }
  };

  
  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Carregando carrinho...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-red-600">
        Erro ao carregar o carrinho: {error}
      </div>
    );
  }

  
  const isCartEmpty = !cart || !cart.cartItems || cart.cartItems.length === 0;

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Seu Carrinho de Compras</h1>

      {isCartEmpty ? (
        <div className="text-center bg-white p-10 rounded-lg shadow-md max-w-lg mx-auto">
          <p className="text-xl text-gray-700 mb-6">Seu carrinho está vazio. Adicione alguns itens incríveis!</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition duration-300 shadow-lg"
          >
            Começar a Comprar
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
        
          <div className="flex-1 bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {cart.cartItems.map((item) => (
                <CartItemDisplay key={item.id} item={item} />
              ))}
            </div>
            {clearError && <div className="text-red-500 text-sm mt-4 text-center">{clearError}</div>}
            <div className="flex justify-between items-center border-t border-gray-200 pt-4 mt-6">
              <button
                onClick={handleClearCart}
                disabled={isClearing}
                className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isClearing ? 'Limpando...' : 'Limpar Carrinho'}
              </button>
              <Link
                to="/products"
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                Continuar Comprando
              </Link>
            </div>
          </div>

          
          <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-3">Resumo do Pedido</h2>
        
            
            <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-6">
              <span>Total:</span>
              <span>R$ {cart.total ? cart.total.toFixed(2).replace('.', ',') : '0,00'}</span>
              {console.log(cart)}
            </div>
            <Link
              to="/checkout" 
              className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition duration-300 shadow-md"
            >
              Finalizar Compra
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;