import { useProducts } from './hooks/useProducts';
import SearchBar from './components/SearchBar/SearchBar';
import ProductList from './components/ProductList/ProductList';
import './App.css';

function App() {
  const { 
    products, 
    loading, 
    error, 
    hasMore, 
    searchProducts, 
    loadMore 
  } = useProducts();

  return (
    <div className="app">
      <header className="header">
        <h1>🛒 Tienda de Productos</h1>
        <p>Descubre productos increíbles con las mejores ofertas</p>
      </header>

      <main className="main">
        

        <ProductList
          products={products}
          loading={loading}
          error={error}
          hasMore={hasMore}
          onLoadMore={loadMore}
        />
      </main>

      <footer className="footer">
        <p>Workshop React - Consumo de APIs 🚀</p>
      </footer>
    </div>
  );
}

export default App;