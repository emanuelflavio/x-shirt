import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Submetido!');
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen py-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Bem-vindo(a) de Volta!</h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Link to="#" className="text-sm text-blue-600 hover:underline mt-2 block text-right">Esqueceu a senha?</Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold transition duration-200"
          >
            Entrar
          </button>
        </form>
        <p className="text-center text-gray-600 text-sm mt-6">
          Não tem uma conta?
          <Link to="/cadastro" className="text-blue-600 hover:underline font-semibold">Cadastre-se aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;