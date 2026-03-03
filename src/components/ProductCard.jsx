// src/components/ProductCard.jsx
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100">
      {/* Contenedor de la Imagen con efecto hover */}
      <div className="relative h-56 overflow-hidden bg-gray-50 flex justify-center items-center p-4">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-800 line-clamp-1" title={product.title}>
          {product.title}
        </h3>
        <p className="text-slate-500 text-sm mt-1 mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto">
          <span className="text-2xl font-black text-blue-600">
            ${product.price}
          </span>
          
          {/* Botones */}
          <div className="flex gap-2 mt-4">
            <Link 
              to={`/product/${product.id}`}
              className="flex-1 text-center bg-slate-100 text-slate-700 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
            >
              Ver detalle
            </Link>
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-md hover:shadow-lg"
            >
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;