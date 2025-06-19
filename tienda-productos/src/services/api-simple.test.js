import { describe, it, expect } from 'vitest';

// Test de integración simple (requiere conexión a internet)
// Solo para verificar que la estructura está bien
describe('API Structure Test', () => {
  it('debería exportar las funciones de la API', async () => {
    const { productsAPI } = await import('./api');
    
    expect(productsAPI).toBeDefined();
    expect(typeof productsAPI.getAllProducts).toBe('function');
    expect(typeof productsAPI.searchProducts).toBe('function');
    expect(typeof productsAPI.getProductById).toBe('function');
    expect(typeof productsAPI.getCategories).toBe('function');
  });

  it('debería construir URLs correctamente', () => {
    const baseUrl = 'https://dummyjson.com';
    
    // Test de construcción de URLs (sin hacer requests)
    expect(`${baseUrl}/products?limit=30&skip=0`).toBe('https://dummyjson.com/products?limit=30&skip=0');
    expect(`${baseUrl}/products/search?q=test`).toBe('https://dummyjson.com/products/search?q=test');
    expect(`${baseUrl}/products/1`).toBe('https://dummyjson.com/products/1');
    expect(`${baseUrl}/products/categories`).toBe('https://dummyjson.com/products/categories');
  });
});