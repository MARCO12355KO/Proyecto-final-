import { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, total, updateQuantity, clearCart } = useContext(CartContext);
  const [validationError, setValidationError] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleCheckout = () => {
    if (cart.length === 0) {
      setValidationError('❌ Tu carrito está vacío. Agrega productos antes de pagar.');
      setTimeout(() => setValidationError(''), 3000);
      return;
    }
    if (total <= 0) {
      setValidationError('❌ El total debe ser mayor a 0.');
      setTimeout(() => setValidationError(''), 3000);
      return;
    }
    setValidationError('');
    alert(`✅ Procesando pago de $${total.toFixed(2)}... (Demo)`);
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-gray-50 dark:bg-slate-700 w-32 h-32 rounded-full flex items-center justify-center mb-8">
          <svg className="w-16 h-16 text-gray-300 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter">Tu bolsa está vacía</h2>
        <p className="text-gray-500 dark:text-slate-400 mb-10 text-lg font-medium">Descubre productos increíbles en nuestro catálogo.</p>
        <button 
          onClick={onClose} 
          className="bg-gray-900 dark:bg-slate-700 text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all shadow-lg shadow-gray-900/20 dark:shadow-slate-900/40"
        >
          Volver a la tienda
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Validación Error Message */}
      {validationError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded-lg animate-bounce-in">
          <p className="text-red-700 dark:text-red-300 font-bold">{validationError}</p>
        </div>
      )}

      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tighter">Tu Bolsa</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">{cart.length} producto{cart.length !== 1 ? 's' : ''}</p>
        </div>
        <button 
          onClick={onClose} 
          className="text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="group flex flex-col sm:flex-row items-center gap-6 bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-700 hover:shadow-[0_10px_40px_rgba(0,0,0,0.04)] dark:hover:shadow-slate-900/30 transition-all">
              <div className="w-32 h-32 bg-gray-50 dark:bg-slate-700 rounded-[1.5rem] p-4 flex-shrink-0">
                <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-400 dark:text-slate-500 font-bold uppercase tracking-widest mb-3">{item.brand}</p>
                
                {/* control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-1 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors font-bold"
                  >
                    −
                  </button>
                  <span className="px-4 py-1 bg-gray-100 dark:bg-slate-700 rounded-lg font-bold text-gray-900 dark:text-white min-w-[40px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-1 bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors font-bold"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 dark:text-slate-400 ml-auto">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="text-2xl font-black text-gray-900 dark:text-white px-6">
                ${item.price}
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="w-12 h-12 flex items-center justify-center text-red-400 dark:text-red-300 bg-red-50 dark:bg-red-900/30 hover:bg-red-500 dark:hover:bg-red-500 hover:text-white transition-colors rounded-2xl"
                title="Eliminar producto"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-gray-900 dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-2xl dark:shadow-slate-900/50 sticky top-28 text-white">
            <h3 className="text-2xl font-black mb-8 border-b border-white/10 pb-6 tracking-tighter">Resumen de orden</h3>
            
            <div className="space-y-4 mb-8 text-gray-400 dark:text-slate-400 font-medium">
              <div className="flex justify-between items-center">
                <span>Subtotal ({cart.length} items)</span>
                <span className="text-white">${total ? total.toFixed(2) : '0.00'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Envío</span>
                <span className="text-green-400 dark:text-green-300 font-bold">Gratis</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-10 pt-6 border-t border-white/10">
              <span className="text-lg font-bold">Total</span>
              <span className="text-4xl font-black text-white">${total ? total.toFixed(2) : '0.00'}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-white dark:bg-slate-200 text-gray-900 dark:text-slate-900 py-5 rounded-2xl font-black text-lg hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-white hover:shadow-lg hover:shadow-blue-600/30 transition-all active:scale-[0.98]"
            >
              Pagar ahora
            </button>

            {/* lipiar */}
            {!showClearConfirm ? (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="w-full mt-4 bg-red-500/20 dark:bg-red-900/30 text-red-500 dark:text-red-300 py-3 rounded-2xl font-bold text-sm hover:bg-red-500/40 dark:hover:bg-red-900/50 transition-all"
              >
                Limpiar carrito
              </button>
            ) : (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl">
                <p className="text-red-700 dark:text-red-300 font-bold mb-3 text-sm">¿Estás seguro?</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleClearCart}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-bold text-sm transition-colors"
                  >
                    Sí, limpiar
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="flex-1 bg-gray-300 dark:bg-slate-600 text-gray-900 dark:text-white py-2 rounded-lg font-bold text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;