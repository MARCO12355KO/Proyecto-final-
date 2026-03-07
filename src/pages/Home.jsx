import { useEffect, useState } from 'react';
import { getProducts, searchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
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
    <div className="min-h-screen pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto pt-16">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-black text-gray-900 tracking-tighter mb-6">
            MARCO<span className="text-blue-600 italic">.</span>SHOP
          </h1>
          <p className="text-xl text-gray-400 font-medium">Diseño, tecnología y vanguardia en un solo lugar.</p>
        </header>

        <SearchBar onSearch={(q) => { setQuery(q); setSkip(0); }} />

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {products.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            {!query && <Pagination total={total} limit={limit} skip={skip} setSkip={setSkip} />}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;