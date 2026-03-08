import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onDetailClick }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-[2.5rem] p-4 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-slate-900/50 transition-all duration-500 transform hover:-translate-y-3">
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-gray-50 dark:bg-slate-700 mb-6">
        <div className="absolute top-4 left-4 z-10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter text-blue-600 dark:text-blue-400">
          {product.category}
        </div>
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </div>

      <div className="px-2">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate leading-tight">
          {product.title}
        </h3>
        
        <div className="flex items-center justify-between mb-6">
          <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">
            ${product.price}
          </span>
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/30 px-2 py-1 rounded-lg">
            <span className="text-amber-500 dark:text-amber-400 text-xs font-black">★ {product.rating}</span>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => onDetailClick(product)}
            className="flex-1 py-4 rounded-2xl bg-gray-50 dark:bg-slate-700 text-gray-500 dark:text-slate-300 font-bold text-xs text-center hover:bg-gray-100 dark:hover:bg-slate-600 hover:text-gray-900 dark:hover:text-white transition-all uppercase tracking-widest"
          >
            Detalle
          </button>
          <button 
            onClick={() => addToCart(product)}
            className="flex-1 py-4 rounded-2xl bg-gray-900 dark:bg-blue-600 text-white font-bold text-xs hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200 dark:hover:shadow-blue-900/30 active:scale-95 uppercase tracking-widest"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;