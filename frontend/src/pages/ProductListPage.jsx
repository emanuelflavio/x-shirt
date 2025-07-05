
import React, { useState, useEffect } from 'react';
import productService from '../services/productService'; 
import ProductCard from '../components/product/ProductCard.jsx'; 
import { useLocation } from 'react-router-dom'; 

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [categoryId, setCategoryId] = useState(''); 
  const location = useLocation(); 

  
  const fetchProducts = async (filters = {}) => {
    setLoading(true);
    setError('');
    try {
      const data = await productService.getAllProducts(filters);
      setProducts(data);
    } catch (err) {
      setError('Falha ao carregar produtos. Tente novamente.');
      console.error('Erro ao buscar produtos na lista:', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryFromUrl = queryParams.get('category'); 
    if (categoryFromUrl && categoryFromUrl !== categoryId) { 
      setCategoryId(categoryFromUrl);
    }

    const filters = {};
    if (searchTerm) filters.name = searchTerm; 
    if (categoryId) filters.categoryName = categoryId; 

    fetchProducts(filters);
  }, [searchTerm, categoryId, location.search]); 


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">Nossas Camisetas</h1>


      {loading && (
        <div className="text-center text-lg text-gray-600">Carregando produtos...</div>
      )}
      {error && (
        <div className="text-center text-lg text-red-600">{error}</div>
      )}
      {!loading && !error && products.length === 0 && (
        <div className="text-center text-lg text-gray-600">Nenhum produto encontrado.</div>
      )}

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </div>
  );
};

export default ProductListPage;