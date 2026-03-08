// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { useCart } from './context/CartContext';
import Navbar from './components/Navbar';
import Toast from './components/Toast';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function AppContent() {
  const [showCartModal, setShowCartModal] = useState(false);
  const { lastAddedProduct } = useCart();
  const [showToast, setShowToast] = useState(false);

  // Mostrar toast cuando se añade un producto
  if (lastAddedProduct && !showToast) {
    setShowToast(true);
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 font-sans text-gray-800 dark:text-slate-100 transition-colors duration-300">
        <Navbar onCartClick={() => setShowCartModal(true)} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        {/* Toast de notificación */}
        {showToast && (
          <Toast 
            message={`👜 ${lastAddedProduct} añadido al carrito`}
            type="success"
            onClose={() => setShowToast(false)}
          />
        )}

        {/* Modal del carrito - Optimizado y limpio */}
        {showCartModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
            {/* Fondo clickeable para cerrar */}
            <div 
              className="fixed inset-0 -z-10"
              onClick={() => setShowCartModal(false)}
            />
            
            {/* Modal */}
            <div className="bg-white dark:bg-slate-800 w-full sm:max-w-2xl lg:max-w-3xl max-h-screen sm:max-h-[85vh] overflow-hidden flex flex-col rounded-t-3xl sm:rounded-2xl shadow-2xl transform transition-all duration-300">
              
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Tu Carrito</h2>
                <button 
                  onClick={() => setShowCartModal(false)}
                  className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white text-2xl sm:text-3xl font-bold transition-colors hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0"
                  aria-label="Cerrar carrito"
                >
                  ×
                </button>
              </div>
              
              {/* Contenido */}
              <div className="overflow-y-auto flex-1">
                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                  <Cart onClose={() => setShowCartModal(false)} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;