import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/logo_escura.png'; 
import FeaturedProduct1 from '../assets/logo.png';
import CategoryImage1 from '../assets/logo.png';

const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* 1. Hero Section (Seção de Destaque) */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden shadow-sm">
        <div className="container mx-auto px-4">
          <div className="md:flex md:items-center -mx-4">
            <div className="md:w-1/2 px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Encontre o Seu Estilo na X-Shirt
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Descubra nossa vasta coleção de camisetas de alta qualidade para todos os estilos e ocasiões.
              </p>
              <div className="space-x-4">
                <Link
                  to="/products" // Link para a página de listagem de produtos
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-300"
                >
                  Ver Nossas Camisetas
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 px-4 mt-8 md:mt-0">
              {/* Crie a imagem em frontend/src/assets/images/hero-image.jpg ou use um placeholder */}
              <img src={HeroImage || "https://via.placeholder.com/600x400?text=Camisetas+X-Shirt"} alt="Coleção de Camisetas em Destaque" className="rounded-lg shadow-lg w-full" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose X-Shirt? (Por Que Escolher a X-Shirt?) */}
      <section className="py-12 md:py-20 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 text-center mb-8">
            Por Que Comprar na X-Shirt?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              {/* Exemplo de ícone SVG simples, pode ser substituído por ícones Flowbite ou de outras libs */}
              <svg className="w-12 h-12 mx-auto text-blue-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">Qualidade Premium</h3>
              <p className="text-gray-600 text-sm">Nossas camisetas são feitas com materiais de alta qualidade para garantir conforto e durabilidade.</p>
            </div>
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-green-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0m5-2V9a2 2 0 00-2-2h-2a2 2 0 00-2 2v10m2-8h4m4-2a2 2 0 11-4 0m5-2V5a2 2 0 00-2-2h-2a2 2 0 00-2 2v12m2-14h4"></path></svg>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">Variedade de Estilos</h3>
              <p className="text-gray-600 text-sm">Descubra uma ampla gama de estilos, cores e estampas para cada preferência.</p>
            </div>
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto text-yellow-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <h3 className="font-semibold text-gray-800 text-lg mb-2">Entrega Rápida</h3>
              <p className="text-gray-600 text-sm">Receba suas camisetas favoritas no conforto da sua casa em tempo recorde.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Final Call to Action */}
      <section className="py-16 bg-gray-100 text-center shadow-inner">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6">
            Encontre a Camiseta Perfeita Para Você!
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Explore nossa coleção completa e vista-se com estilo e conforto.
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md text-xl transition duration-300"
          >
            Ver Todas as Camisetas
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;