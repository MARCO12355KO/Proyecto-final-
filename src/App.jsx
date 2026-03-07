// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';

function App() {
  const [showCartModal, setShowCartModal] = useState(false);

  return (
    // Requisito: Estar envuelto en App.jsx
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
          <Navbar onCartClick={() => setShowCartModal(true)} />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>

          {/* Modal del carrito - Responsive */}
          {showCartModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4 animate-fadeIn">
              <div className="bg-white w-full sm:max-w-2xl lg:max-w-3xl max-h-screen sm:max-h-[85vh] overflow-y-auto relative shadow-2xl transform transition-all duration-300 scale-100 modal-enter rounded-t-3xl sm:rounded-2xl">
                {/* Header del Modal */}
                <div className="sticky top-0 bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex justify-between items-center rounded-t-3xl sm:rounded-t-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tu Carrito</h2>
                  <button 
                    onClick={() => setShowCartModal(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl sm:text-3xl font-bold transition-all hover:bg-gray-100 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0"
                    aria-label="Cerrar carrito"
                  >
                    ×
                  </button>
                </div>
                
                {/* Contenido del Modal */}
                <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                  <Cart onClose={() => setShowCartModal(false)} />
                </div>
              </div>
            </div>
          )}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;