const SearchBar = ({ onSearch }) => {
  return (
    <div className="max-w-2xl mx-auto mb-16 relative group">
      <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-300 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="¿Qué estás buscando hoy?"
        className="w-full pl-16 pr-8 py-6 bg-white border-2 border-gray-50 rounded-[2rem] shadow-sm outline-none focus:border-blue-100 focus:ring-4 focus:ring-blue-50/50 transition-all text-lg font-medium text-gray-600 placeholder:text-gray-300"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;