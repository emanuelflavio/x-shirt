// frontend/src/pages/User/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'; 
import userService from '../services/userService.js'; 

const ProfilePage = () => {
  const { user: authUser } = useAuth(); 
  const [userProfile, setUserProfile] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authUser) {
        setError('Usuário não autenticado.');
        setLoading(false);
        return;
      }
      setLoading(true);
      setError('');
      try {
        
        const data = await userService.getUserProfile();
        setUserProfile(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Falha ao carregar perfil do usuário.');
        console.error('Erro ao buscar perfil:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [authUser]); 

  if (loading) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Carregando perfil...
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

  if (!userProfile) {
    return (
      <div className="container mx-auto py-8 text-center text-lg text-gray-600">
        Dados do perfil não encontrados.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Meu Perfil</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Informações Básicas do Perfil */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Informações da Conta</h2>
            <div className="space-y-2 text-gray-700">
              <p><span className="font-medium">Nome:</span> {userProfile.name}</p>
              <p><span className="font-medium">Email:</span> {userProfile.email}</p>
              {/* Adicione outras informações que seu UserResponseDTO retornar */}
            </div>
            <button
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              // onClick={() => alert('Implementar edição do perfil')}
            >
              Editar Perfil
            </button>
          </div>

          {/* Navegação para Seções do Perfil */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Minha Conta</h2>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/perfil/pedidos"
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg transition duration-300"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                  Meus Pedidos
                </Link>
              </li>
              <li>
                <Link
                  to="/perfil/enderecos"
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg transition duration-300"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Meus Endereços
                </Link>
              </li>
              <li>
                <Link
                  to="/perfil/favoritos"
                  className="flex items-center text-blue-600 hover:text-blue-800 font-medium text-lg transition duration-300"
                >
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                  Meus Favoritos
                </Link>
              </li>
              {/* Adicionar link para alterar senha, etc. */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;