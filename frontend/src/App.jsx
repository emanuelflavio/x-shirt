import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Importe o AuthProvider e useAuth

// Importe suas páginas
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'; // Página inicial
import Header from './components/layout/Header'; // Componente de cabeçalho

// Componente para proteger rotas: só acessa se estiver logado
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      {/* O AuthProvider envolve toda a sua aplicação para fornecer o contexto de autenticação */}
      <AuthProvider>
        <Header /> {/* Seu cabeçalho (componente de layout) */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          <Route path="/" element={<HomePage />} /> {/* Homepage pode ser pública */}

          {/* Exemplo de rota protegida: Página de Perfil do usuário */}
          <Route
            path="/perfil"
            element={
              <PrivateRoute>
                <div className="container mx-auto mt-8 p-4">
                  <h1 className="text-2xl font-bold">Página de Perfil</h1>
                  <p>Bem-vindo à sua área restrita!</p>
                </div>
              </PrivateRoute>
            }
          />
          {/* Adicione outras rotas protegidas aqui (ex: /carrinho, /checkout, /meus-pedidos) */}
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;