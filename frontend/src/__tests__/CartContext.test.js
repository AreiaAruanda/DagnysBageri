import React from 'react';
import { render, screen, act} from '@testing-library/react';
import { CartProvider, CartContext } from '../contexts/CartContext';

// Helper function to access the context in a test
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, clearCart } = React.useContext(CartContext);
  
  // This will just render the cart for us to inspect
  return (
    <div>
      <button onClick={() => addToCart({ id: 1, name: 'Croissant', price: 5 })}>
        Add Croissant
      </button>
      <button onClick={() => removeFromCart(1)}>Remove Croissant</button>
      <button onClick={clearCart}>Clear Cart</button>
      <div data-testid="cart-size">{cart.length}</div>
    </div>
  );
};

describe('CartContext', () => {
  it('should add an item to the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Check initial state
    expect(screen.getByTestId('cart-size').textContent).toBe('0');

    // Add item to the cart
    act(() => {
      screen.getByText('Add Croissant').click();
    });
    expect(screen.getByTestId('cart-size').textContent).toBe('1');
  });

  it('should remove an item from the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Add and then remove item
    act (() => {
      screen.getByText('Add Croissant').click();
  });
    act (() => {
      screen.getByText('Remove Croissant').click();
  });
    expect(screen.getByTestId('cart-size').textContent).toBe('0');
  });

  it('should clear the cart', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    // Add item and clear the cart
    act (() => {
      screen.getByText('Add Croissant').click();
    });
    act (() => {
      screen.getByText('Clear Cart').click();
    });
    expect(screen.getByTestId('cart-size').textContent).toBe('0');
  });
});
