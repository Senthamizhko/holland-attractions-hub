import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { CartProvider, CartContext } from '../../context/CartContext'; // Correctly importing the context and provider
import CartPage from './CartPage';
import '@testing-library/jest-dom';

const mockCartState = {
  cartItems: [
    {
      id: '1',
      name: 'Test Deal 1',
      price: 50,
      numPersons: 2,
      selectedDate: '2023-11-23',
      imageUrl: 'test-image-1.jpg',
    },
    {
      id: '2',
      name: 'Test Deal 2',
      price: 100,
      numPersons: 1,
      imageUrl: 'test-image-2.jpg',
    },
  ],
};

const mockCartDispatch = jest.fn();

const renderCartPage = (cartState = mockCartState) => {
  render(
    <CartContext.Provider value={{ cartState, cartDispatch: mockCartDispatch }}>
      <CartPage />
    </CartContext.Provider>
  );
};

describe('CartPage Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders an empty cart message when there are no items', () => {
    const emptyCartState = { cartItems: [] };
    renderCartPage(emptyCartState);

    expect(screen.getByText(/No activities in your cart/i)).toBeInTheDocument();
  });

  it('renders cart items and groups them by ID and date', () => {
    renderCartPage();
  
    const cartItems = screen.getAllByRole('listitem'); // Assuming each item is rendered as a <li>
    expect(cartItems).toHaveLength(2); // Ensure we have two items in the cart
  
    const firstItem = within(cartItems[0]);
    expect(firstItem.getByText(/Test Deal 1/i)).toBeInTheDocument();
    expect(firstItem.getByText(/Price per person: €50.00/i)).toBeInTheDocument();
    expect(firstItem.getByText(/Number of Persons: 2/i)).toBeInTheDocument();
    expect(firstItem.getByText(/Total: €100.00/i)).toBeInTheDocument();
  
    const secondItem = within(cartItems[1]);
    expect(secondItem.getByText(/Test Deal 2/i)).toBeInTheDocument();
    expect(secondItem.getByText(/Price per person: €100.00/i)).toBeInTheDocument();
    expect(secondItem.getByText(/Total: €100.00/i)).toBeInTheDocument();
  });
  it('calculates and displays the correct total price', () => {
    renderCartPage();

    const totalAmount = screen.getByText(/Total Amount: €200.00/i); // Total for both items: 100 + 100
    expect(totalAmount).toBeInTheDocument();
  });

  it('removes an item from the cart when the remove button is clicked', () => {
    renderCartPage();

    const removeButton = screen.getAllByText(/Remove/i)[0]; // Target the first remove button
    fireEvent.click(removeButton);

    expect(mockCartDispatch).toHaveBeenCalledWith({
      type: 'REMOVE_FROM_CART',
      payload: mockCartState.cartItems[0],
    });
  });
});