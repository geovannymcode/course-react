import { useState } from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, loading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar productos..."
          className={styles.searchInput}
          disabled={loading}
        />
        
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
        
        <button
          type="submit"
          className={styles.searchButton}
          disabled={loading}
        >
          {loading ? '🔄' : '🔍'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;