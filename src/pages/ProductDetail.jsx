import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = ({ product: propProduct, onClose }) => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(propProduct || null);
  const [loading, setLoading] = useState(!propProduct);
  const [error, setError] = useState(null);

  // Sync state if propProduct changes from the parent
  useEffect(() => {
    if (propProduct) {
      setProduct(propProduct);
      setLoading(false);
      setError(null);
    }
  }, [propProduct]);

  useEffect(() => {
    // Only fetch if we don't have a propProduct but we do have an ID
    if (!propProduct && id) {
      const fetchProductDetails = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          
          if (!response.ok) {
            throw new Error('No se pudo cargar la información del producto.');
          }
          
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error(error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchProductDetails();
    }
  }, [id, propProduct]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 dark:border-t-blue-400 dark:border-b-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-2xl font-black text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-2xl font-black text-gray-400 dark:text-slate-400">
        Producto no encontrado
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {onClose ? (
        <button 
          onClick={onClose} 
          aria-label="Cerrar detalles del producto"
          className="inline-flex items-center gap-2 text-gray-400 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cerrar
        </button>
      ) : (
        <Link 
          to="/" 
          aria-label="Volver al catálogo de productos"
          className="inline-flex items-center gap-2 text-gray-400 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al catálogo
        </Link>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] dark:shadow-slate-900/30 border border-gray-100 dark:border-slate-700 overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gray-50/50 dark:bg-slate-700/30 p-12 flex justify-center items-center">
          <img 
            src={product.images && product.images.length > 0 ? product.images[0] : product.thumbnail} 
            alt={product.title} 
            className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center bg-white dark:bg-slate-800">
          <span className="text-sm font-black tracking-widest text-blue-600 dark:text-blue-400 uppercase mb-4">
            {product.category} • {product.brand}
          </span>
          
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight tracking-tighter">
            {product.title}
          </h1>
          
          <p className="text-lg text-gray-500 dark:text-slate-400 mb-10 leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="flex items-center gap-6 mb-12">
            <span className="text-5xl font-black text-gray-900 dark:text-white">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-green-600 dark:text-green-400 font-black bg-green-50 dark:bg-green-900/30 px-4 py-2 rounded-full border border-green-100 dark:border-green-900">
                -{product.discountPercentage}% OFF
              </span>
            )}
          </div>

          <button 
            onClick={() => addToCart(product)}
            aria-label={`Añadir ${product.title} a mi compra`}
            className="w-full bg-gray-900 dark:bg-blue-600 text-white text-lg font-black py-5 rounded-2xl shadow-xl shadow-gray-900/20 dark:shadow-blue-600/30 hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-blue-600/30 active:scale-[0.98] transition-all duration-300"
          >
            Añadir a mi compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;