import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 shadow-md hover:shadow-lg group"
      aria-label="Alternar modo oscuro/claro"
      title={isDark ? 'Modo claro' : 'Modo oscuro'}
    >
      {isDark ? (
        <svg
          className="w-6 h-6 text-yellow-400 transition-all duration-300 transform group-hover:rotate-45"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      ) : (
        <svg
          className="w-6 h-6 text-yellow-500 transition-all duration-300 transform group-hover:rotate-45"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414zm2.828-2.828l1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414a1 1 0 001.414 1.414zm0-4.242L17.464 4.464a1 1 0 00-1.414-1.414L15.464 4.464a1 1 0 001.414 1.414zM9 2a1 1 0 01-1-1V-.586a1 1 0 111.414-.586L9.828 0a1 1 0 01-1 1zm0 16a1 1 0 01-1-1v-2a1 1 0 112 0v2a1 1 0 01-1 1zm7-9a1 1 0 001-1V8a1 1 0 10-2 0v9a1 1 0 001 1z"
            clipRule="evenodd"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
