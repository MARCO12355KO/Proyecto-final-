// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* REQUISITO A: Logo y nombre de la tienda */}
        <Link to="/" className="flex items-center gap-3 hover:text-blue-400 transition-colors">
          {/* Cambia '/logo.png' por el nombre real de tu imagen en la carpeta public */}
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="h-10 w-10 object-contain bg-white rounded-full p-1"
            onError={(e) => e.target.style.display = 'none'} // Oculta la imagen si no la encuentra
          />
          <span className="text-xl md:text-2xl font-bold tracking-wider hidden sm:block">
            ELECTRODOMÉSTICOS MARCOS
          </span>
        </Link>
        
        {/* Enlaces y Contador */}
        <div className="flex gap-6 items-center text-lg font-medium">
          <Link to="/" className="hover:text-blue-400 transition-colors">
            Inicio
          </Link>
          <Link to="/cart" className="relative flex items-center hover:text-blue-400 transition-colors bg-slate-800 px-4 py-2 rounded-lg">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Carrito
            {/* REQUISITO A: Contador dinámico */}
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-md animate-bounce">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;