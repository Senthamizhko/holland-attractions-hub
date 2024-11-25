import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';
import { SearchContext } from '../../context/SearchContext';
import '@testing-library/jest-dom';


describe('Header Component', () => {
  const mockSetSearchTerm = jest.fn();

  const renderWithContextAndRouter = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <SearchContext.Provider
        value={{
          searchTerm: '',
          setSearchTerm: mockSetSearchTerm,
        }}
      >
        {ui}
      </SearchContext.Provider>
    </MemoryRouter>
  );
};

  it('renders the header element', () => {
    renderWithContextAndRouter(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('contains a link to the home page', () => {
    renderWithContextAndRouter(<Header />);
    const homeLink = screen.getByText('Holland Attractions');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('contains a link to the cart page', () => {
    renderWithContextAndRouter(<Header />);
    const cartLink = screen.getByText('Cart');
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('handles input changes in the search bar', () => {
    renderWithContextAndRouter(<Header />);
    const searchInput = screen.getByPlaceholderText('Search categories...');

    fireEvent.change(searchInput, { target: { value: 'museums' } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('museums');
  });

});