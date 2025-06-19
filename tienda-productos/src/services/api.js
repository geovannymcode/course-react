import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

// Configuración base de axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 segundos
});

// Interceptor para manejo de errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en API:', error);
    return Promise.reject(error);
  }
);

// Funciones específicas de la API
export const productsAPI = {
  // Obtener todos los productos
  getAllProducts: async (limit = 30, skip = 0) => {
    try {
      const response = await api.get(`/products?limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  },

  // Buscar productos
  searchProducts: async (query) => {
    try {
      const response = await api.get(`/products/search?q=${query}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error en búsqueda: ${error.message}`);
    }
  },

  // Obtener producto por ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  },

  // Obtener categorías
  getCategories: async () => {
    try {
      const response = await api.get('/products/categories');
      return response.data;
    } catch (error) {
      throw new Error(`Error al obtener categorías: ${error.message}`);
    }
  }
};