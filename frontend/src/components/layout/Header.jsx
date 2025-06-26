import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition-colors">
          <img src="/../src/assets/logo.png" alt="" className='h-20 w-auto'/>
        </Link>
        <div className="flex space-x-4 items-center">
          <Link to="/" className="text-lg hover:text-blue-300 transition-colors">Home</Link>
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
              <Link to="/registro" className="text-lg hover:text-blue-300 transition-colors">Registro</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;