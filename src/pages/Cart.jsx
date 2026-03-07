import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, total } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-gray-50 w-32 h-32 rounded-full flex items-center justify-center mb-8">
          <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Tu bolsa está vacía</h2>
        <p className="text-gray-500 mb-10 text-lg font-medium">Descubre productos increíbles en nuestro catálogo.</p>
        <Link to="/" className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-blue-600 transition-all shadow-lg shadow-gray-900/20">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tighter">Tu Bolsa</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="group flex items-center gap-6 bg-white p-6 rounded-[2rem] border border-gray-100 hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)] transition-all">
              <div className="w-32 h-32 bg-gray-50 rounded-[1.5rem] p-4 flex-shrink-0">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{item.brand}</p>
              </div>

              <div className="text-2xl font-black text-gray-900 px-6">
                ${item.price}
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="w-12 h-12 flex items-center justify-center text-red-400 bg-red-50 hover:bg-red-500 hover:text-white rounded-2xl transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl sticky top-28 text-white">
            <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-6 tracking-tighter">Resumen de orden</h3>
            
            <div className="space-y-4 mb-8 text-gray-400 font-medium">
              <div className="flex justify-between items-center">
                <span>Subtotal ({cart.length} items)</span>
                <span className="text-white">${total ? total.toFixed(2) : '0.00'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Envío</span>
                <span className="text-green-400 font-bold">Gratis</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-10 pt-6 border-t border-white/10">
              <span className="text-lg font-bold">Total</span>
              <span className="text-4xl font-black text-white">${total ? total.toFixed(2) : '0.00'}</span>
            </div>

            <button className="w-full bg-white text-gray-900 py-5 rounded-2xl font-black text-lg hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/30 transition-all active:scale-[0.98]">
              Pagar ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;