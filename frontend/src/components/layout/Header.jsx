
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx'; 

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const totalCartItems = cart && cart.items ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          <img src="../src/assets/logo.png" alt="" className='h-20 w-auto'/>
         </Link>

        <div className="flex space-x-4 items-center">
          <Link to="/" className="text-lg hover:text-blue-300 transition-colors">Home</Link>
          <Link to="/products" className="text-lg hover:text-blue-300 transition-colors">Produtos</Link>

          
          <Link to="/cart" className="relative text-lg hover:text-blue-300 transition-colors">
            
            <svg className="w-6 h-6 inline-block mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Carrinho
            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>

          {user ? (
            <>
              
              <Link to="/perfil" className="text-lg hover:text-blue-300 transition-colors">Olá, {user.email.split('@')[0]}</Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-lg hover:text-blue-300 transition-colors">Login</Link>
              <Link
                to="/registro"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Registro
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;