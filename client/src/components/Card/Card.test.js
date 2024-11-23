import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Card from './Card';

describe('Card Component', () => {
  const mockDeal = {
    id: '1',
    name: 'Amazing Deal',
    description: 'Get 50% off on your first purchase!',
    price: 99.99,
    imageUrl: 'https://example.com/deal.jpg',
  };

  const renderCard = (deal = mockDeal) => {
    return render(
      <BrowserRouter>
        <Card deal={deal} />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderCard();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders deal name correctly', () => {
    renderCard();
    expect(screen.getByText(mockDeal.name)).toBeInTheDocument();
  });

  it('renders deal description correctly', () => {
    renderCard();
    expect(screen.getByText(mockDeal.description)).toBeInTheDocument();
  });

  it('renders deal price correctly', () => {
    renderCard();
    expect(screen.getByText(`Price per person: €${mockDeal.price}`)).toBeInTheDocument();
  });

  it('renders image with correct src and alt attributes', () => {
    renderCard();
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockDeal.imageUrl);
    expect(image).toHaveAttribute('alt', mockDeal.name);
  });

  it('renders link to the detailed view page correctly', () => {
    renderCard();
    const links = screen.getAllByRole('link');
    const viewDealLink = links.find(link => link.textContent === 'View Deal');

    expect(links.length).toBeGreaterThan(0);
    expect(viewDealLink).toHaveAttribute('href', `/product/${mockDeal.id}`);
  });
});