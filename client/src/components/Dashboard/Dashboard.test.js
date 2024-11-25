import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Dashboard from './Dashboard';
import { GET_CATEGORIES } from '../../graphql/queries';
import { SearchContext } from '../../context/SearchContext'; // Import SearchContext
import '@testing-library/jest-dom';

jest.mock('../Category/Category', () => ({ category }) => (
  <div className="category">{category.name}</div>
));

jest.mock('../LoadingState/LoadingState', () => () => (
  <div className="loading-state">Loading...</div>
));

const mockCategories = [
  {
    id: '1',
    name: 'Museum',
    imageUrl: 'https://example.com/museum.jpg',
    deals: [
      {
        id: '10',
        name: 'Nemo',
        imageUrl: 'https://example.com/museum.jpg',
      }
    ],
  },
  {
    id: '2',
    name: 'Kids attraction',
    imageUrl: 'https://example.com/attraction.jpg',
    deals: [],
  },
];

const mockSearchContextValue = {
  searchTerm: 'Nemo',
  setSearchTerm: jest.fn(),
};

describe('Dashboard Component', () => {
  it('renders loading state initially', () => {
    render(
      <SearchContext.Provider value={mockSearchContextValue}>
        <MockedProvider mocks={[]} addTypename={false}>
          <Dashboard />
        </MockedProvider>
      </SearchContext.Provider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message on query error', async () => {
    const errorMock = {
      request: { query: GET_CATEGORIES },
      error: new Error('Failed to fetch categories'),
    };

    render(
      <SearchContext.Provider value={mockSearchContextValue}>
        <MockedProvider mocks={[errorMock]} addTypename={false}>
          <Dashboard />
        </MockedProvider>
      </SearchContext.Provider>
    );

    const errorMessage = await screen.findByText(/Failed to fetch categories, Check if the server is running!/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders categories on successful query', async () => {
    const successMock = {
      request: { query: GET_CATEGORIES },
      result: {
        data: { categories: mockCategories },
      },
    };
    const mockSearchContextValue = {
      searchTerm: '',
      setSearchTerm: jest.fn(),
    };

    render(
      <SearchContext.Provider value={mockSearchContextValue}>
        <MockedProvider mocks={[successMock]} addTypename={false}>
          <Dashboard />
        </MockedProvider>
      </SearchContext.Provider>
    );

    const categoryElements = await screen.findAllByText(/Museum/);
    expect(categoryElements).toHaveLength(1);

    expect(categoryElements[0]).toHaveTextContent('Museum');
  });
});