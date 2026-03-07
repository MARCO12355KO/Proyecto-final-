import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductDetail = ({ product: propProduct, onClose }) => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(propProduct || null);
  const [loading, setLoading] = useState(!propProduct);

  useEffect(() => {
    if (!propProduct && id) {
      const fetchProductDetails = async () => {
        try {
          setLoading(true);
          const response = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await response.json();
          setProduct(data);
        } catch (error) {
          console.error(error);
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
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center mt-20 text-2xl font-black text-gray-400">
        Producto no encontrado
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {onClose ? (
        <button onClick={onClose} className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold mb-8 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cerrar
        </button>
      ) : (
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold mb-8 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al catálogo
        </Link>
      )}

      <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gray-50/50 p-12 flex justify-center items-center">
          <img 
            src={product.images ? product.images[0] : product.thumbnail} 
            alt={product.title} 
            className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center bg-white">
          <span className="text-sm font-black tracking-widest text-blue-600 uppercase mb-4">
            {product.category} • {product.brand}
          </span>
          
          <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight tracking-tighter">
            {product.title}
          </h1>
          
          <p className="text-lg text-gray-500 mb-10 leading-relaxed font-medium">
            {product.description}
          </p>

          <div className="flex items-center gap-6 mb-12">
            <span className="text-5xl font-black text-gray-900">${product.price}</span>
            <span className="text-sm text-green-600 font-black bg-green-50 px-4 py-2 rounded-full border border-green-100">
              -{product.discountPercentage}% OFF
            </span>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-gray-900 text-white text-lg font-black py-5 rounded-2xl shadow-xl shadow-gray-900/20 hover:bg-blue-600 hover:shadow-blue-600/30 active:scale-[0.98] transition-all duration-300"
          >
            Añadir a mi compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;