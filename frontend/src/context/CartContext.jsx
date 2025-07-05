// frontend/src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import cartService from '../services/cartService'; 
import { useAuth } from './AuthContext.jsx'; 

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(''); 
  const { user, loading: authLoading } = useAuth(); 

  useEffect(() => {
    const fetchCart = async () => {
      
      if (!authLoading && user) {
        setLoading(true);
        setError('');
        try {
          const userCart = await cartService.getCart();
          setCart(userCart);
        } catch (err) {
          console.error('Erro ao buscar o carrinho no CartContext:', err);
          setError('Não foi possível carregar o carrinho.');
          setCart({ id: null, userId: user.id, items: [], total: 0 }); 
        } finally {
          setLoading(false);
        }
      } else if (!authLoading && !user) {
        setCart({ id: null, userId: null, items: [], total: 0 });
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, authLoading]); 


  const addToCart = async (variationId, quantity) => {
    if (!user) {
      throw new Error('Usuário não autenticado para adicionar itens ao carrinho.');
    }
    try {
      const updatedCart = await cartService.addItem(variationId, quantity);
      setCart(updatedCart); 
    } catch (err) {
      console.error('Erro no addToCart:', err);
      throw err;
    }
  };

 
  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    if (!user) {
      throw new Error('Usuário não autenticado para atualizar o carrinho.');
    }
    try {
      const updatedCart = await cartService.updateItemQuantity(cartItemId, newQuantity);
      setCart(updatedCart);
    } catch (err) {
      console.error('Erro no updateCartItemQuantity:', err);
      throw err;
    }
  };

  
  const removeCartItem = async (cartItemId) => {
    if (!user) {
      throw new Error('Usuário não autenticado para remover do carrinho.');
    }
    try {
      const updatedCart = await cartService.removeItem(cartItemId);
      setCart(updatedCart);
    } catch (err) {
      console.error('Erro no removeCartItem:', err);
      throw err;
    }
  };

  const clearCurrentCart = async () => {
    if (!user) {
      throw new Error('Usuário não autenticado para limpar o carrinho.');
    }
    try {
      await cartService.clearCart();
      setCart({ id: cart.id, userId: user.id, items: [], total: 0 }); // Reseta o carrinho no frontend
    } catch (err) {
      console.error('Erro no clearCurrentCart:', err);
      throw err;
    }
  };

  if (authLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen text-lg text-gray-700">
          Carregando carrinho...
        </div>
      );
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        updateCartItemQuantity,
        removeCartItem,
        clearCurrentCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);