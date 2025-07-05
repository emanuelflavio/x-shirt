
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  
  const displayImageUrl = 
    product.variations && product.variations.length > 0 && 
    product.variations[0].imagesShirts && product.variations[0].imagesShirts.length > 0
      ? product.variations[0].imagesShirts[0].urlImage 
      : product.imageUrl || 'https://via.placeholder.com/300x200?text=Sem+Imagem';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/products/${product.id}`}>
        <img
          src={displayImageUrl} 
          alt={product.name}
          className="w-full h-48 object-cover object-center"
        />
      </Link>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          <Link to={`/products/${product.id}`} className="hover:text-blue-600 transition-colors">
            {product.name}
          </Link>
        </h3>
        {product.category && (
          <p className="text-sm text-gray-500 mb-2">{product.category.name}</p>
        )}
        <p className="text-xl font-bold text-gray-800 mb-3">
          R$ {product.price !== undefined && product.price !== null ? product.price.toFixed(2).replace('.', ',') : 'N/A'}
        </p>
        <Link
          to={`/products/${product.id}`}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md transition duration-300"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;