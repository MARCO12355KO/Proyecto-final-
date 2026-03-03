// src/pages/ProductDetail.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams(); // Obtenemos el ID de la URL
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Consumimos el endpoint individual por ID
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error al cargar el detalle:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!product) return <div className="text-center mt-10">Producto no encontrado</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden mt-8 border border-gray-100 animate-fade-in">
      {/* Botón Volver */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <Link to="/" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
          ← Volver al catálogo
        </Link>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* REQUISITO D: Imagen Grande */}
        <div className="md:w-1/2 p-8 flex justify-center items-center bg-gray-50">
          <img 
            src={product.images[0] || product.thumbnail} 
            alt={product.title} 
            className="w-full h-auto max-h-96 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Detalles del Producto */}
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <span className="text-sm font-bold tracking-widest text-blue-500 uppercase mb-2">
            {product.category} | {product.brand}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
            {product.title}
          </h1>
          
          {/* REQUISITO D: Descripción Completa */}
          <p className="text-lg text-slate-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* REQUISITO D: Precio */}
          <div className="mb-8">
            <span className="text-4xl font-black text-slate-900">${product.price}</span>
            <span className="text-sm text-green-500 font-bold ml-4 bg-green-100 px-3 py-1 rounded-full">
              ¡{product.discountPercentage}% de descuento!
            </span>
          </div>

          {/* REQUISITO D: Botón Agregar al Carrito */}
          <button 
            onClick={() => addToCart(product)}
            className="w-full md:w-auto bg-blue-600 text-white text-lg font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-blue-700 hover:shadow-xl active:scale-95 transition-all"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;