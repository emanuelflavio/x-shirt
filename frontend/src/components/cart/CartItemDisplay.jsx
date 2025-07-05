
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx'; 

const CartItemDisplay = ({ item }) => {
  const { updateCartItemQuantity, removeCartItem } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState('');


  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = async (e) => {
    const newQuantity = parseInt(e.target.value);
    if (isNaN(newQuantity) || newQuantity < 0) return; 

    setQuantity(newQuantity); 
    setIsUpdating(true);
    setUpdateError('');

    try {
      if (newQuantity === 0) {
        await removeCartItem(item.id);
      } else {
        await updateCartItemQuantity(item.id, newQuantity);
      }
    } catch (err) {
      setUpdateError('Erro ao atualizar quantidade.');
      setQuantity(item.quantity);
      console.error('Erro ao atualizar quantidade do item no carrinho:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveClick = async () => {
    if (window.confirm(`Tem certeza que deseja remover "${item.product.name}" do carrinho?`)) {
      setIsUpdating(true);
      setUpdateError('');
      try {
        await removeCartItem(item.id);
      } catch (err) {
        setUpdateError('Erro ao remover item.');
        console.error('Erro ao remover item do carrinho:', err);
      } finally {
        setIsUpdating(false);
      }
    }
  };




  return (
    <div className="flex items-center border-b border-gray-200 py-4 last:border-b-0">

      {/* Detalhes do Produto e Variação */}
      <div className="flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">
          <Link to={`/products/${item.product.id}`} className="hover:text-blue-600 transition-colors">
            {item.product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-600">
          Variação: {item.variations.size} / {item.variations.color}
        </p>
        <p className="text-md font-medium text-gray-800 mt-1">
          Preço Unitário: R$ {item.product.price.toFixed(2).replace('.', ',')}
        </p>
      </div>

      {/* Quantidade e Subtotal */}
      <div className="flex items-center space-x-4 ml-auto">
        <div className="flex flex-col items-center">
          <label htmlFor={`quantity-${item.id}`} className="sr-only">Quantidade</label>
          <input
            type="number"
            id={`quantity-${item.product.id}`}
            min="0" 
            max={item.maxStock || 99} // Se seu backend retornar estoque máximo da variação
            value={quantity}
            onChange={handleQuantityChange}
            disabled={isUpdating}
            className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          {isUpdating && <span className="text-sm text-blue-500 mt-1">Atualizando...</span>}
          {updateError && <span className="text-sm text-red-500 mt-1">{updateError}</span>}
        </div>
        <p className="text-lg font-bold text-gray-900 w-28 text-right">
          R$ {item.subtotalPrice.toFixed(2).replace('.', ',')}
        </p>
        <button
          onClick={handleRemoveClick}
          disabled={isUpdating}
          className="text-red-500 hover:text-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Remover item"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItemDisplay;