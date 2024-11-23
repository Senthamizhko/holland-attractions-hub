import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Dashboard from './Dashboard';
import { GET_CATEGORIES } from '../../graphql/queries';
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
    deals: [],
  },
  {
    id: '2',
    name: 'Kids attraction',
    imageUrl: 'https://example.com/attraction.jpg',
    deals: [],
  },
];

// const mockCategories = [
//   {
//     request: { query: GET_CATEGORIES, variables: {} },
//     result: {
//       data: {
//         categories: [
//           {
//             id: '1',
//             name: 'Museums',
//             deals: [
//               {
//                 id: '101',
//                 name: 'Art Museum Entry',
//                 description: 'Explore the finest art pieces.',
//                 detailedDescription: 'Exclusive access to special exhibits.',
//                 price: 20,
//                 imageUrl: 'https://example.com/art.jpg',
//               },
//             ],
//           },
//         ],
//       },
//     },
//   },
// ];

describe('Dashboard Component', () => {
  it('renders loading state initially', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error message on query error', async () => {
    const errorMock = {
      request: { query: GET_CATEGORIES },
      error: new Error('Failed to fetch categories'),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );

    const errorMessage = await screen.findByText(/Error: Failed to fetch categories/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders categories on successful query', async () => {
    const successMock = {
      request: { query: GET_CATEGORIES },
      result: {
        data: { categories: mockCategories },
      },
    };

    render(
      <MockedProvider mocks={[successMock]} addTypename={false}>
        <Dashboard />
      </MockedProvider>
    );

    const categoryElements = await screen.findAllByText(/Museum|Kids attraction/);
    expect(categoryElements).toHaveLength(2);

    expect(categoryElements[0]).toHaveTextContent('Museum');
    expect(categoryElements[1]).toHaveTextContent('Kids attraction');
  });
});