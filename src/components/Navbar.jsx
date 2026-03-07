import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount, openCart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 text-white p-2.5 rounded-2xl shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            MARCO<span className="text-blue-600">SHOP</span>
          </span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/" className="hidden md:block text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-blue-600 transition-colors">
            Catálogo
          </Link>
          
          <button 
            onClick={openCart}
            className="relative flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-2xl hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-bold hidden sm:block">Bolsa</span>
            
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[11px] font-black h-6 w-6 flex items-center justify-center rounded-full border-2 border-white shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;