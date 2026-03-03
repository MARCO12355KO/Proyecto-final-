// src/pages/Cart.jsx
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, total } = useContext(CartContext);

  // Si el carrito está vacío, mostramos un mensaje amigable
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20 text-center animate-fade-in">
        <svg className="w-24 h-24 text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-8">Parece que aún no has añadido productos a tu carrito.</p>
        <Link to="/" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md">
          Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-8 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-slate-800 mb-8 border-b pb-4">Carrito de Compras</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* REQUISITO E: Lista de productos agregados */}
        <div className="lg:w-2/3 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img src={item.thumbnail} alt={item.title} className="w-24 h-24 object-contain bg-gray-50 rounded-lg p-2" />
              
              <div className="flex-1">
                <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.brand}</p>
              </div>

              <div className="text-xl font-black text-slate-900 mr-4">
                ${item.price}
              </div>

              {/* REQUISITO E: Botón Eliminar */}
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
                title="Eliminar producto"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* REQUISITO E: Cálculo del Total */}
        <div className="lg:w-1/3">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 sticky top-24">
            <h3 className="text-xl font-bold text-slate-800 mb-6">Resumen de Compra</h3>
            
            <div className="flex justify-between text-gray-600 mb-4 border-b pb-4">
              <span>Subtotal ({cart.length} productos)</span>
              <span>${total.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="text-lg font-bold text-slate-800">Total:</span>
              <span className="text-3xl font-black text-blue-600">${total.toFixed(2)}</span>
            </div>

            <button className="w-full bg-green-500 text-white py-3 rounded-xl font-bold text-lg hover:bg-green-600 hover:shadow-lg transition-all active:scale-95">
              Proceder al Pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;