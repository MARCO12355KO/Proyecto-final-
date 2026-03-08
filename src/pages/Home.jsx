import { useEffect, useState } from 'react';
import { getProducts, searchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import ProductDetail from './ProductDetail';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const limit = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = query ? await searchProducts(query) : await getProducts(limit, skip);
      setProducts(data.products || []);
      setTotal(data.total || 0);
      setLoading(false);
    };
    fetchData();
  }, [skip, query]);

  return (
    <div className="min-h-screen pb-20 px-4 sm:px-8 bg-gray-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto pt-16">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 dark:text-white tracking-tighter mb-6">
            MARCO<span className="text-blue-600 italic">.</span>SHOP
          </h1>
          <p className="text-xl text-gray-400 dark:text-slate-400 font-medium">Diseño, tecnología y vanguardia en un solo lugar.</p>
        </header>

        <SearchBar onSearch={(q) => { setQuery(q); setSkip(0); }} />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-100 dark:border-blue-900 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.map((p) => <ProductCard key={p.id} product={p} onDetailClick={setSelectedProduct} />)}
            </div>
            {!query && <Pagination total={total} limit={limit} skip={skip} setSkip={setSkip} />}
          </>
        )}
      </div>

      {/* Modal de detalle del producto */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-[3rem] max-w-6xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-gray-400 dark:text-slate-400 hover:text-gray-600 dark:hover:text-slate-200 z-10 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;