import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';

const mockProduct = {
  id: 1,
  title: 'iPhone 15',
  price: 1200,
  discountPercentage: 10,
  thumbnail: 'https://example.com/image.jpg',
  category: 'smartphones',
  rating: 4.5,
  stock: 25
};

describe('ProductCard', () => {
  it('debería renderizar la información del producto', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('smartphones')).toBeInTheDocument();
    expect(screen.getByText('$1080.00')).toBeInTheDocument(); // precio con descuento
    expect(screen.getByText('$1200.00')).toBeInTheDocument(); // precio original
    expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
    expect(screen.getByText('25 disponibles')).toBeInTheDocument();
  });

  it('debería mostrar descuento cuando existe', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('-10%')).toBeInTheDocument();
  });

  it('debería mostrar "Sin stock" cuando stock es 0', () => {
    const productWithoutStock = { ...mockProduct, stock: 0 };
    render(<ProductCard product={productWithoutStock} />);
    
    expect(screen.getByText('Sin stock')).toBeInTheDocument();
  });
});