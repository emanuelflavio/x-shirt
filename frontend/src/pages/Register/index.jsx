import React from 'react';
import { Link } from 'react-router-dom'; // Importe o Link do React Router DOM

function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implementar lógica de registro aqui (chamar sua API de backend)
    console.log('Registro Submetido!');
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Crie Sua Conta Grátis!</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Seu nome completo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Mínimo 6 caracteres"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-700 text-sm font-semibold mb-2">Confirmar Senha</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Repita sua senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-semibold transition duration-200"
          >
            Cadastrar
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Já tem uma conta?
          <Link to="/login" className="text-blue-600 hover:underline font-semibold">Faça login aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;