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

          {/* Modal del carrito */}
          {showCartModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl transform transition-all duration-300 scale-100 modal-enter">
                <button 
                  onClick={() => setShowCartModal(false)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10 hover:bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center transition-all"
                >
                  ×
                </button>
                <div className="p-6 md:p-8">
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