// src/components/Pagination.jsx
const Pagination = ({ total, limit, skip, setSkip }) => {
  const totalPages = Math.ceil(total / limit);
  const currentPage = Math.floor(skip / limit) + 1;

  // Si no hay páginas, no mostramos el componente
  if (totalPages <= 1) return null;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSkip(skip - limit);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSkip(skip + limit);
    }
  };

  const handlePageClick = (page) => {
    setSkip((page - 1) * limit);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Primera página y ellipsis si necesario
    if (startPage > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className="px-3 py-2 rounded-lg font-semibold transition-all shadow-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 py-2 text-slate-400 dark:text-slate-600">
            ...
          </span>
        );
      }
    }

    // Páginas visibles
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-2 rounded-lg font-semibold transition-all shadow-sm ${
            i === currentPage
              ? 'bg-blue-600 dark:bg-blue-700 text-white border border-blue-600 dark:border-blue-700'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          {i}
        </button>
      );
    }

    // Última página y ellipsis si necesario
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2 py-2 text-slate-400 dark:text-slate-600">
            ...
          </span>
        );
      }
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className="px-3 py-2 rounded-lg font-semibold transition-all shadow-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12 mb-8 flex-wrap">
      {/* Botón Anterior */}
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg font-semibold transition-all shadow-sm ${
          currentPage === 1
            ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-600 cursor-not-allowed'
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
      >
        Anterior
      </button>

      {/* Números de página */}
      {renderPageNumbers()}

      {/* Botón Siguiente */}
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg font-semibold transition-all shadow-sm ${
          currentPage === totalPages
            ? 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-slate-600 cursor-not-allowed'
            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;