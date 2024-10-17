import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CartProvider } from '../contexts/CartContext';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';

describe('ProductList Component', () => {
  const mockProducts = [
    { id: 1, name: 'Croissant', price: 5 },
    { id: 2, name: 'Baguette', price: 3 }
  ];

  it('should render products and add them to the cart', () => {
    render(
      <CartProvider>
        <ProductList products={mockProducts} />
        <Cart/>
      </CartProvider>
    );
    console.log(screen.debug());

    // Check if products are rendered
    expect(screen.getByText('Croissant - $5.00')).toBeInTheDocument();
    expect(screen.getByText('Baguette - $3.00')).toBeInTheDocument();

    // Add Croissant to the cart
    act(() => {
    fireEvent.click(screen.getByText('Add to Cart', { selector: 'button' }));
    });

    // Assuming you have a way to show the cart count somewhere (e.g., a Cart component)
    // You can add additional checks to validate if the product was added to the cart.
  });
});
