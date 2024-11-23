import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

describe('Header Component', () => {
  
  it('renders the header element', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('contains a link to the home page', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    
    const homeLink = screen.getByText('Holland Attractions');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('contains a link to the cart page', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    
    const cartLink = screen.getByText('Cart');
    expect(cartLink).toBeInTheDocument();
    expect(cartLink).toHaveAttribute('href', '/cart');
  });

  it('applies the correct class names to the links', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    
    const homeLink = screen.getByText('Holland Attractions');
    expect(homeLink).toHaveClass('header__link');

    const cartLink = screen.getByText('Cart');
    expect(cartLink).toHaveClass('header__nav__link');
  });
});