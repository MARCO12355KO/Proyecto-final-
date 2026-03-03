// src/components/SearchBar.jsx
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative w-full max-w-md">
      {/* Ícono de lupa SVG para que se vea moderno */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <input
        type="text"
        placeholder="Buscar electrodomésticos, marcas..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none shadow-sm"
      />
    </div>
  );
};

export default SearchBar;