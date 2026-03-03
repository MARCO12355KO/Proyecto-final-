// src/components/Pagination.jsx
const Pagination = ({ currentPage, totalPages, onPrevPage, onNextPage }) => {
  // Si no hay páginas, no mostramos el componente
  if (totalPages === 0) return null;

  return (
    <div className="flex justify-center items-center gap-4 mt-12 mb-8">
      {/* Botón Anterior */}
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`px-6 py-2 rounded-lg font-semibold transition-all shadow-sm
          ${currentPage === 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-slate-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
          }`}
      >
        Anterior
      </button>

      {/* Indicador de Página Actual */}
      <span className="text-slate-600 font-medium bg-white px-4 py-2 rounded-lg border border-gray-100 shadow-sm">
        Página <strong className="text-blue-600">{currentPage}</strong> de {totalPages}
      </span>

      {/* Botón Siguiente */}
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`px-6 py-2 rounded-lg font-semibold transition-all shadow-sm
          ${currentPage === totalPages 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-slate-700 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
          }`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;