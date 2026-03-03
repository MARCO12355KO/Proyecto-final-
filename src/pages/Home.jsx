// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para Búsqueda y Paginación
  const [searchTerm, setSearchTerm] = useState('');
  const [skip, setSkip] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 8; // Requisito de la API

  // Cálculos dinámicos
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(totalProducts / limit);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Si hay texto, usamos el endpoint de búsqueda, si no, el normal
        const url = searchTerm 
          ? `https://dummyjson.com/products/search?q=${searchTerm}&limit=${limit}&skip=${skip}`
          : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

        const response = await fetch(url);
        const data = await response.json();
        
        setProducts(data.products);
        setTotalProducts(data.total); // Guardamos el total para calcular las páginas
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Pequeño retraso (debounce) para no saturar la API si el usuario escribe muy rápido
    const delaySearch = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, skip]); // Se vuelve a ejecutar si cambia la búsqueda o la página

  // Manejadores de eventos
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setSkip(0); // REQUISITO: Resetear paginación al buscar
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setSkip(skip + limit);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setSkip(skip - limit);
  };

  return (
    <div className="animate-fade-in">
      {/* Cabecera con Título y Buscador Separado */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800">
          Catálogo
        </h1>
        <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center text-gray-500 mt-12 text-xl">
          No se encontraron productos para "{searchTerm}"
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Paginación Separada */}
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPrevPage={handlePrevPage} 
        onNextPage={handleNextPage} 
      />
    </div>
  );
};

export default Home;