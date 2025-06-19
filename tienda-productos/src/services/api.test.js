import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('axios', () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    interceptors: {
      response: {
        use: vi.fn()
      }
    }
  };

  return {
    default: {
      create: vi.fn(() => mockAxiosInstance)
    }
  };
});

import { productsAPI } from './api';
import axios from 'axios';

describe('productsAPI', () => {
  let mockGet;

  beforeEach(() => {
    vi.clearAllMocks();
    
    // Obtener referencia al método get mockeado
    const mockInstance = axios.create();
    mockGet = mockInstance.get;
  });

  describe('getAllProducts', () => {
    it('debería obtener productos correctamente', async () => {
      const mockResponse = {
        data: {
          products: [
            { id: 1, title: 'Producto 1', price: 100 },
            { id: 2, title: 'Producto 2', price: 200 }
          ],
          total: 2
        }
      };

      mockGet.mockResolvedValue(mockResponse);

      const result = await productsAPI.getAllProducts();
      
      expect(result).toEqual(mockResponse.data);
      expect(mockGet).toHaveBeenCalledWith('/products?limit=30&skip=0');
    });

    it('debería manejar errores correctamente', async () => {
      const errorMessage = 'Network Error';
      mockGet.mockRejectedValue(new Error(errorMessage));

      await expect(productsAPI.getAllProducts()).rejects.toThrow(
        `Error al obtener productos: ${errorMessage}`
      );
    });

    it('debería usar parámetros limit y skip correctamente', async () => {
      const mockResponse = {
        data: {
          products: [],
          total: 0
        }
      };

      mockGet.mockResolvedValue(mockResponse);

      await productsAPI.getAllProducts(10, 20);
      
      expect(mockGet).toHaveBeenCalledWith('/products?limit=10&skip=20');
    });
  });

  describe('searchProducts', () => {
    it('debería buscar productos correctamente', async () => {
      const mockResponse = {
        data: {
          products: [
            { id: 1, title: 'iPhone', price: 1000 }
          ],
          total: 1
        }
      };

      mockGet.mockResolvedValue(mockResponse);

      const result = await productsAPI.searchProducts('iPhone');
      
      expect(result).toEqual(mockResponse.data);
      expect(mockGet).toHaveBeenCalledWith('/products/search?q=iPhone');
    });

    it('debería manejar errores en búsqueda', async () => {
      mockGet.mockRejectedValue(new Error('Search Error'));

      await expect(productsAPI.searchProducts('test')).rejects.toThrow(
        'Error en búsqueda: Search Error'
      );
    });
  });

  describe('getProductById', () => {
    it('debería obtener un producto por ID', async () => {
      const mockResponse = {
        data: { id: 1, title: 'Producto 1', price: 100 }
      };

      mockGet.mockResolvedValue(mockResponse);

      const result = await productsAPI.getProductById(1);
      
      expect(result).toEqual(mockResponse.data);
      expect(mockGet).toHaveBeenCalledWith('/products/1');
    });

    it('debería manejar errores al obtener producto por ID', async () => {
      mockGet.mockRejectedValue(new Error('Product not found'));

      await expect(productsAPI.getProductById(999)).rejects.toThrow(
        'Error al obtener producto: Product not found'
      );
    });
  });

  describe('getCategories', () => {
    it('debería obtener categorías', async () => {
      const mockResponse = {
        data: ['smartphones', 'laptops', 'skincare']
      };

      mockGet.mockResolvedValue(mockResponse);

      const result = await productsAPI.getCategories();
      
      expect(result).toEqual(mockResponse.data);
      expect(mockGet).toHaveBeenCalledWith('/products/categories');
    });

    it('debería manejar errores al obtener categorías', async () => {
      mockGet.mockRejectedValue(new Error('Categories error'));

      await expect(productsAPI.getCategories()).rejects.toThrow(
        'Error al obtener categorías: Categories error'
      );
    });
  });
});