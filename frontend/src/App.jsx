import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Login from './pages/Login'; 
import Register from './pages/Register';
import Header from './components/Header';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;