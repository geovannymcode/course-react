import { useState, useEffect } from 'react';
import { productsAPI } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  // Cargar productos iniciales
  const loadProducts = async (limit = 12, skip = 0) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await productsAPI.getAllProducts(limit, skip);
      
      if (skip === 0) {
        setProducts(data.products);
      } else {
        setProducts(prev => [...prev, ...data.products]);
      }
      
      setHasMore(data.products.length === limit);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Buscar productos
  const searchProducts = async (query) => {
    if (!query.trim()) {
      loadProducts();
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await productsAPI.searchProducts(query);
      setProducts(data.products);
      setHasMore(false); // No hay paginación en búsqueda
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cargar más productos (paginación)
  const loadMore = () => {
    if (!loading && hasMore) {
      loadProducts(12, products.length);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    hasMore,
    searchProducts,
    loadMore,
    refreshProducts: () => loadProducts()
  };
};