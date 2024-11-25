import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import DetailedView from './DetailedView';
import { GET_CATEGORIES } from '../../graphql/queries';
import '@testing-library/jest-dom';

jest.mock('react-datepicker', () => ({ selected, onChange, placeholderText }) => (
  <input
    data-testid="datepicker"
    value={selected || ''}
    placeholder={placeholderText}
    onChange={(e) => onChange(e.target.value)}
  />
));
jest.mock('../../context/CartContext', () => ({
  useCart: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));
jest.mock('../Notification/Notification', () => ({ message, type, onClose }) => (
  <div className={`notification ${type}`}>
    {message}
    <button onClick={onClose}>Close</button>
  </div>
));

const mockCategories = [
  {
    id: '1',
    name: 'Museums',
    deals: [
      {
        id: '101',
        name: 'Art Museum Entry',
        description: 'Explore the finest art pieces.',
        detailedDescription: 'Exclusive access to special exhibits.',
        price: 20,
        expiresAt: new Date(Date.now() + 86400000).toISOString(),
        imageUrl: 'https://example.com/art.jpg',
      },
    ],
  },
];

const relatedProducts = [
  {
    id: '102',
    name: 'History Museum Entry',
    price: 15,
    expiresAt: new Date(Date.now() + 172800000).toISOString(),
    imageUrl: 'https://example.com/history.jpg',
  },
];

const mocks = [
  {
    request: { query: GET_CATEGORIES },
    result: { data: { categories: mockCategories } },
  },
];

describe('DetailedView Component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ id: '101' });
    useCart.mockReturnValue({ cartDispatch: jest.fn() });
  });

  it('renders error state on query failure', async () => {
    const errorMock = {
      request: { query: GET_CATEGORIES },
      error: new Error('Failed to fetch categories, Check if the server is running!'),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <DetailedView />
      </MockedProvider>
    );

    const errorMessage = await screen.findByText(/Failed to fetch categories, Check if the server is running!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders product details on successful query', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DetailedView />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Art Museum Entry')).toBeInTheDocument();
      expect(screen.getByText('Explore the finest art pieces.')).toBeInTheDocument();
      expect(screen.getByText('€20')).toBeInTheDocument();
    });
  });

  it('shows notification when adding to cart without selecting a date', async () => {
    const cartDispatch = jest.fn();
    useCart.mockReturnValue({ cartDispatch });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DetailedView />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText('Art Museum Entry')).toBeInTheDocument());

    fireEvent.click(screen.getByText('Add to Cart'));

    const notification = await screen.findByText('Please select a date to continue.');
    expect(notification).toBeInTheDocument();
  });

  it('adds product to cart when valid data is provided', async () => {
    const cartDispatch = jest.fn();
    useCart.mockReturnValue({ cartDispatch });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DetailedView />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText('Art Museum Entry')).toBeInTheDocument());

    fireEvent.change(screen.getByTestId('datepicker'), { target: { value: '2024-12-01' } });

    fireEvent.click(screen.getByText('Add to Cart'));

    await waitFor(() => expect(cartDispatch).toHaveBeenCalledTimes(1));
    expect(cartDispatch).toHaveBeenCalledWith({
      type: 'ADD_TO_CART',
      payload: expect.objectContaining({
        name: 'Art Museum Entry',
        numPersons: 1,
        selectedDate: '2024-12-01',
      }),
    });

    const notification = await screen.findByText('Item has been added to the cart!');
    expect(notification).toBeInTheDocument();
  });
});