import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useProducts } from './useProducts';
import { productsAPI } from '../services/api';

// Mock del API
vi.mock('../services/api');

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería cargar productos al inicializar', async () => {
    const mockProducts = [
      { id: 1, title: 'Producto 1' },
      { id: 2, title: 'Producto 2' }
    ];

    vi.mocked(productsAPI.getAllProducts).mockResolvedValue({
      products: mockProducts,
      total: 2
    });

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBe(null);
  });

  it('debería manejar errores de carga', async () => {
    vi.mocked(productsAPI.getAllProducts).mockRejectedValue(
      new Error('Error de red')
    );

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBe('Error de red');
    expect(result.current.products).toEqual([]);
  });

  it('debería buscar productos correctamente', async () => {
    const mockSearchResults = [
      { id: 3, title: 'Producto buscado' }
    ];

    vi.mocked(productsAPI.searchProducts).mockResolvedValue({
      products: mockSearchResults
    });

    const { result } = renderHook(() => useProducts());

    await act(async () => {
      await result.current.searchProducts('test');
    });

    expect(result.current.products).toEqual(mockSearchResults);
  });
});