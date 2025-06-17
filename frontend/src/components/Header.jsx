import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  
  const isAuthenticated = false; 
  const user = {
    name: 'Usuário',
    email: 'usuario@example.com',
    avatar: 'https://via.placeholder.com/40x40?text=User', 
    isAdmin: true, 
  };

  const handleLogout = () => {
    console.log('Usuário deslogado!');
  };

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="./src/assets/logo.png" alt="Logo E-commerce" className="h-30 w-auto" />
          <span className="text-xl font-semibold text-gray-800"></span>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          
          {isAuthenticated && (
            <Link to="/meus-pedidos" className="text-gray-700 hover:text-blue-600 font-medium transition duration-150">Meus Pedidos</Link>
          )}

          {!isAuthenticated ? (
            <div className="flex space-x-3 ml-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition duration-150"
              >
                Login
              </Link>
              <Link
                to="/cadastro"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150"
              >
                Cadastre-se
              </Link>
            </div>
          ) : (
            <div className="relative group ml-4">
              <button className="flex items-center space-x-2 focus:outline-none">
                <img src={user.avatar} alt="User Avatar" className="h-9 w-9 rounded-full border-2 border-gray-300 object-cover" />
                <span className="font-medium text-gray-700">{user.name}</span>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {/* Dropdown de perfil (simulado com grupo hover) */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <Link to="/meus-pedidos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Meus Pedidos</Link>
                {user.isAdmin && (
                  <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Painel Admin</Link>
                )}
                <div className="border-t border-gray-100 my-1"></div>
                <button onClick={handleLogout} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sair</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 shadow-inner">
          <div className="flex flex-col items-center space-y-4">
            <Link to="/" className="block text-gray-700 hover:text-blue-600 font-medium transition duration-150" onClick={() => setIsMenuOpen(false)}>Início</Link>
            <Link to="/carrinho" className="block text-gray-700 hover:text-blue-600 font-medium transition duration-150" onClick={() => setIsMenuOpen(false)}>Carrinho</Link>
            {isAuthenticated && (
              <Link to="/meus-pedidos" className="block text-gray-700 hover:text-blue-600 font-medium transition duration-150" onClick={() => setIsMenuOpen(false)}>Meus Pedidos</Link>
            )}

            {!isAuthenticated ? (
              <div className="flex flex-col space-y-3 mt-4 w-full px-4">
                <Link
                  to="/login"
                  className="w-full text-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/cadastro"
                  className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-150"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cadastre-se
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 mt-4 w-full px-4">
                <div className="flex items-center space-x-2 mb-2">
                    <img src={user.avatar} alt="User Avatar" className="h-9 w-9 rounded-full border-2 border-gray-300 object-cover" />
                    <span className="font-medium text-gray-700">{user.name}</span>
                </div>
                <Link to="/meus-pedidos" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => setIsMenuOpen(false)}>Meus Pedidos</Link>
                {user.isAdmin && (
                  <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={() => setIsMenuOpen(false)}>Painel Admin</Link>
                )}
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sair</button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;