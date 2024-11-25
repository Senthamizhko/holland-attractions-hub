import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import Category from './Category';

const mockCategory = {
  id: '1',
  name: 'Museums',
  deals: [
    {
      id: '101',
      name: 'Art Museum Entry',
      description: 'Explore the finest art pieces.',
      price: 20,
      imageUrl: 'https://example.com/art.jpg',
    },
    {
      id: '102',
      name: 'History Museum Pass',
      description: 'Dive into history.',
      price: 15,
      imageUrl: 'https://example.com/history.jpg',
    },
  ],
};

describe('Category Component', () => {
  it('renders category name correctly', () => {
    render(
      <BrowserRouter> 
        <Category category={mockCategory} />
      </BrowserRouter>
    );

    const categoryHeader = screen.getByText('Museums');
    expect(categoryHeader).toBeInTheDocument();
    expect(categoryHeader).toHaveClass('category__header');
  });

  it('renders all deals correctly', () => {
    render(
      <BrowserRouter>
        <Category category={mockCategory} />
      </BrowserRouter>
    );

    const dealCards = screen.getAllByRole('img'); 
    expect(dealCards).toHaveLength(mockCategory.deals.length);
  });

  it('handles empty deals array gracefully', () => {
    const emptyCategory = { ...mockCategory, deals: [] };
    render(
      <BrowserRouter>
        <Category category={emptyCategory} />
      </BrowserRouter>
    );

    const dealCards = screen.queryByRole('img');
    expect(dealCards).toBeNull(); 
  });
});