import React from 'react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto mt-8 p-4 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo à X-Shirt!</h1>
      {user ? (
        <p className="text-xl text-green-600">Você está logado como: <span className="font-semibold">{user.email}</span></p>
      ) : (
        <p className="text-xl text-gray-600">Faça login ou registre-se para explorar nossas camisetas incríveis!</p>
      )}
      <div className="mt-8">
        {/* Aqui você pode adicionar cards de produtos em destaque, categorias, etc. */}
        <p className="text-lg text-gray-700">Explore nossa coleção de camisetas exclusivas.</p>
        {/* Adicione mais conteúdo aqui conforme constrói seu site */}
      </div>
    </div>
  );
};

export default HomePage;