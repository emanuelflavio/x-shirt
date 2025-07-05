
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';


import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx'; 
import Header from './components/layout/Header.jsx';
import OrderConfirmationPage from './pages/OrderConfirmationPage.jsx'; 
import ProfilePage from './pages/ProfilePage.jsx'; 
import MyOrdersPage from './pages/MyOrdersPage.jsx'; 
import OrderDetailsPage from './pages/OrderDetailsPage.jsx'; 
import MyAddressesPage from './pages/MyAddressesPage.jsx';
import MyFavoritesPage from './pages/MyFavoritesPage.jsx';


// Componente para proteger rotas: só acessa se estiver logado
const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registro" element={<RegisterPage />} />
            <Route path="/products" element={<ProductListPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            
            
            <Route 
              path="/cart" 
              element={
                <PrivateRoute> 
                  <CartPage />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/checkout" 
              element={
                <PrivateRoute> 
                  <CheckoutPage />
                </PrivateRoute>
              } 
            /> 
            <Route 
              path="/order-confirmation/:id" 
              element={
                <PrivateRoute> 
                  <OrderConfirmationPage />
                </PrivateRoute>
              } 
            />

            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <ProfilePage /> 
                </PrivateRoute>
              }
            />
            <Route
              path="/perfil/pedidos"
              element={
                <PrivateRoute>
                  <MyOrdersPage /> 
                </PrivateRoute>
              }
            />
            <Route
              path="/perfil/pedidos/:id"
              element={
                <PrivateRoute>
                  <OrderDetailsPage /> 
                </PrivateRoute>
              }
            />

            <Route
              path="/perfil/enderecos" 
              element={
                <PrivateRoute>
                  <MyAddressesPage /> 
                </PrivateRoute>
              }
            />

            <Route
              path="/perfil/favoritos" 
              element={
                <PrivateRoute>
                  <MyFavoritesPage /> 
                </PrivateRoute>
              }
            />

            <Route
              path="/perfil"
              element={
                <PrivateRoute>
                  <div className="container mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold text-gray-800">Página de Perfil</h1>
                    <p className="text-gray-600 mt-2">Bem-vindo à sua área restrita!</p>
                  </div>
                </PrivateRoute>
              }
            />
          
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;