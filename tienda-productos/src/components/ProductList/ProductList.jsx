import ProductCard from '../ProductCard/ProductCard';
import styles from './ProductList.module.css';

const ProductList = ({ 
  products, 
  loading, 
  error, 
  hasMore, 
  onLoadMore 
}) => {
  if (error) {
    return (
      <div className={styles.error}>
        <h3>❌ Error al cargar productos</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (loading && products.length === 0) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <h3>🔍 No se encontraron productos</h3>
        <p>Intenta con otro término de búsqueda</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className={styles.loadMoreContainer}>
          <button
            onClick={onLoadMore}
            disabled={loading}
            className={styles.loadMoreButton}
          >
            {loading ? 'Cargando...' : 'Cargar más productos'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductList;